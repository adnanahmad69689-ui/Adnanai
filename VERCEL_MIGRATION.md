# Moving the Adnan Ai Portfolio to Vercel

## Migration Position

The portfolio is designed so that the **public React UI**, **Drizzle database schema**, and **content model** can move to Vercel. The migration is not a one-click copy because the current deployment uses Manus-managed authentication, database access, file storage, and server runtime helpers. Those managed integrations need Vercel-compatible replacements when the move happens.

> Keep the current Manus deployment live until the Vercel preview has passed the acceptance checklist. This avoids any interruption to the public portfolio or the private admin dashboard.

| Component | Portable today | Action required on Vercel |
|---|---|---|
| React/Vite portfolio UI | Yes | Deploy the `client` application and preserve SPA rewrites for `/admin`. |
| Portfolio database schema | Yes | Create a MySQL/TiDB-compatible database, set `DATABASE_URL`, and run the Drizzle migration. |
| Websites and AI Systems data | Yes | Copy the `portfolio_items` rows into the destination database. |
| Uploaded workflow and website images | Yes, by reference | Copy existing assets to an S3-compatible bucket or Vercel Blob, then update `imageUrl` and `imageKey` values. |
| Manus OAuth | No | Replace the OAuth callback and session handling with an authentication provider configured for the Vercel domain. |
| Manus storage helper | No | Replace `server/storage.ts` with an S3-compatible or Vercel Blob upload implementation. |
| tRPC procedures | Yes, with routing work | Expose the router from Vercel Functions or move to a Vite full-stack adapter that supports Vercel Functions. |

## Suggested Vercel Architecture

Use Vercel for the React/Vite frontend and server functions, a managed MySQL or TiDB-compatible database for Drizzle, an S3-compatible object store or Vercel Blob for screenshots, and an OAuth provider suitable for the owner-only dashboard. Vercel Functions scale with request traffic and can be placed near the chosen database region, so choose the database region first and set the function region to match where possible. [1]

The existing public queries and portfolio item schema can stay conceptually the same. The migration work should focus on adapting the runtime boundary, not rebuilding the dashboard UI or the database model.

## Step-by-Step Cutover

| Step | Work | Acceptance condition |
|---|---|---|
| 1. Create a Vercel project | Import the portfolio repository and retain the existing Node and Vite build dependencies. | A Vercel preview build completes. |
| 2. Add SPA routing | Add a `vercel.json` rewrite so `/admin` resolves to the Vite entry point instead of returning a 404. Vercel documents this requirement for Vite SPAs. [2] | Opening `/admin` shows the login gate. |
| 3. Provision data storage | Create a MySQL/TiDB-compatible database and add `DATABASE_URL` in Vercel Project Settings. Run the existing Drizzle schema migration against it. | The `users` and `portfolio_items` tables exist. |
| 4. Migrate records and media | Export the current managed portfolio records, upload referenced images to the destination object store, then update each record’s stored URL/key. | The preview shows the two Websites and all published AI Systems. |
| 5. Replace platform-bound services | Swap Manus OAuth and storage helpers for the chosen Vercel-compatible auth and storage implementations. Keep the same server-side owner-role guard around all admin mutations. | Owner sign-in works and unauthenticated users cannot call management procedures. |
| 6. Configure Vercel functions | Place the API/OAuth endpoints in Vercel Functions or adopt a Vite adapter that emits Vercel-compatible functions. Vercel Functions support request-driven server code and database/API access. [1] | `/api/trpc` and the OAuth callback operate in Preview. |
| 7. Set environments and secrets | Add values separately for Preview and Production; Vercel applies environment-variable changes only to new deployments. [3] | Preview and Production use the correct database, OAuth callback, and storage settings. |
| 8. Perform acceptance testing | Test admin sign-in, Website and AI System create/edit/reorder/draft/publish/delete, image upload, and public reflection. | All checklist items pass in Preview. |
| 9. Move the domain | Point the chosen domain to Vercel only after Preview acceptance. Keep the Manus deployment available for rollback during DNS propagation. | The production Vercel site and `/admin` both work on the custom domain. |

## Environment Variables to Recreate

Never copy Manus-provided secrets directly into source files. Add the Vercel replacements through the Vercel Project Settings and scope them to Preview and Production. Vercel stores environment variables outside source code and makes changes effective on later deployments. [3]

| Variable category | Example name | Purpose |
|---|---|---|
| Database | `DATABASE_URL` | MySQL/TiDB connection string used by Drizzle. |
| Session security | `JWT_SECRET` or auth-provider secret | Signs or validates owner session state. |
| OAuth | `OAUTH_CLIENT_ID`, `OAUTH_CLIENT_SECRET`, `OAUTH_CALLBACK_URL` | Enables owner login and the Vercel-domain callback. |
| Storage | `S3_BUCKET`, `S3_REGION`, `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY` | Stores and serves admin-uploaded screenshots. |
| Public URLs | `VITE_APP_URL` | Gives the client the correct production origin when required. |

Only variables intentionally safe for the browser should use the Vite `VITE_` prefix. Server credentials must remain server-side. Vercel’s Vite integration makes `VITE_`-prefixed build variables available to the frontend build. [2]

## `vercel.json` SPA Rewrite

The portfolio currently uses client-side routing for `/admin`. Include this rewrite when the Vite application is deployed as an SPA:

```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

API routes must be configured before this catch-all rewrite so that `/api/trpc` and the OAuth callback remain server endpoints rather than being served the frontend HTML.

## Pre-DNS Acceptance Checklist

Before moving a custom domain, confirm the following in a Vercel Preview deployment.

- [ ] The public homepage renders the existing Website and AI System records.
- [ ] The `/admin` route loads on a direct browser visit.
- [ ] Only the configured owner can sign in and manage content.
- [ ] Website and AI System draft/publish status updates are reflected correctly in public queries.
- [ ] Uploaded images render from the replacement object store.
- [ ] The database uses SSL and has a tested backup plan.
- [ ] No secrets are present in the client bundle or committed files.

## References

[1]: https://vercel.com/docs/functions "Vercel Functions documentation"
[2]: https://vercel.com/docs/frameworks/frontend/vite "Vite on Vercel documentation"
[3]: https://vercel.com/docs/environment-variables "Vercel environment variables documentation"
