# Independent Migration Plan — GitHub, Supabase, Cloudflare, and Gmail

## Objective

Move the existing Adnan Ai portfolio to infrastructure controlled by the owner without changing the public design, routes, content structure, responsive behavior, or admin capabilities. The existing Manus deployment remains the fallback until the independent deployment has passed all checks and the owner explicitly authorizes cutover.

## Target Architecture

| Layer | Target | Responsibility |
|---|---|---|
| Source control | GitHub account `adnanahmad69689-ui` | Own the complete source repository and deployment history. |
| Hosting | Cloudflare Pages | Host the Vite React single-page application and serve the custom domain. |
| Database | Supabase PostgreSQL | Store `profiles` and `portfolio_items` records. |
| Authentication | Supabase Auth | Secure the owner-only `/admin` route and preserve login/logout/session behavior. |
| Storage | Supabase Storage | Store hero, about, Website, AI System, and future admin-uploaded images. |
| Authorization | Supabase RLS | Public visitors read published content only; only the owner can manage items. |
| Email | Domain email routed/forwarded to Gmail | Receive professional email without adding a website email backend. |

The portfolio will be converted to a static Cloudflare Pages application using the Supabase browser client for public reads, authenticated admin CRUD, and Storage. The current Node/Express/tRPC and Manus runtime will be removed rather than ported unchanged. Cloudflare documents use of the Supabase client in its runtime environment, while Supabase documents RLS as the authorization layer for browser-to-database access. [1] [2]

## Ordered Migration Sequence

| Step | Work | Verification gate | Manus status |
|---|---|---|---|
| 0. Freeze and inventory | Preserve a source snapshot, export current database records and asset references, and record the live site URL. | Source archive, SQL export, and asset manifest exist. | Remains live. |
| 1. GitHub repository | Connect `adnanahmad69689-ui`, create or select a private repository, push clean source without secrets, and protect the main branch as desired. | A fresh clone installs and builds. | Remains live. |
| 2. Supabase project | Create a Supabase project in a suitable region, configure Auth URL settings for preview and production domains, and store keys only in deployment settings. | Project URL and publishable/anonymous key are available; service key is never exposed to the browser. | Remains live. |
| 3. PostgreSQL and RLS | Apply PostgreSQL schema for `profiles` and `portfolio_items`; enable RLS and policies before importing production data. | Anonymous users can read only published records; a non-owner cannot write; the owner can manage content. | Remains live. |
| 4. Storage migration | Create named buckets (`hero`, `portfolio`, `workflows`, `uploads` or an equivalent simple layout), copy all current assets, and map every old `/manus-storage/` URL to a new Supabase URL/key. | Every hero, about, project, and workflow image renders from Supabase Storage. | Remains live. |
| 5. Application conversion | Replace Manus tRPC, MySQL Drizzle, Forge Storage, OAuth, preview tokens, Node server, and Manus runtime imports with Supabase client calls and Auth state. Preserve all UI and admin controls. | Local production build works with a Supabase test project. | Remains live. |
| 6. Cloudflare deployment | Connect GitHub repository to Cloudflare Pages, add preview/production environment variables, configure SPA fallback, and deploy a preview URL. | Direct visits to `/`, `/admin`, and the AI Systems route work in preview. | Remains live. |
| 7. Email/DNS preparation | Configure domain mail routing/forwarding to Gmail outside the application. Confirm the provider’s MX, SPF, DKIM, and forwarding requirements before changing DNS. | A test message reaches the chosen Gmail mailbox. | Remains live. |
| 8. Full acceptance | Test public pages, screenshots, public content reads, admin login/logout, upload, create/edit/delete, draft/publish, reorder, hard refresh, mobile, and unauthorized access. | All acceptance tests pass in the Cloudflare production candidate. | Remains live. |
| 9. Cutover | With owner approval, point the custom domain to Cloudflare Pages, validate HTTPS and live auth redirects, then monitor. | New domain serves the independent deployment successfully. | Kept as rollback during DNS stabilization. |
| 10. Retirement | Only after a stable post-cutover period and owner approval, remove remaining Manus-specific infrastructure. | Final backup and independent operation are confirmed. | Retired only by explicit approval. |

## Supabase Security Model

The migration will not expose a Supabase service-role/secret key to the browser. Supabase states that service keys bypass RLS and must remain server-side. [2] Public browser access uses only the project URL and publishable/anonymous key.

The planned policies are:

| Resource | Anonymous visitor | Signed-in non-owner | Owner admin |
|---|---|---|---|
| `portfolio_items` published rows | Read only | Read only | Read, create, update, reorder, delete |
| `portfolio_items` draft rows | No access | No access | Full access |
| `profiles` | No broad access | Read own profile only | Read own profile and use role check |
| Public image objects | Read only | Read only | Read, upload, replace, delete |

Supabase requires RLS policies to allow Storage uploads, updates, and deletion, so the new Storage rules will be tested alongside the database policies. [3]

## Data and Asset Cutover Rules

1. No current content is overwritten until it is copied and independently verified.
2. The old and new image references are kept in a migration manifest until production acceptance is complete.
3. Database deletion is paired with storage-object deletion only after confirming the stored object belongs to the deleted portfolio record.
4. Hero and About content remains static in the first independent release, exactly as it works now. Client-editable Hero management is a separately tested enhancement, not a silent redesign of the data model.
5. There is no current product/catalog database to import. If products are desired later, add a separate Supabase table and admin panel after the core portfolio migration.

## Required Owner Inputs Before External Changes

| Service | Required input/action | Why it is needed |
|---|---|---|
| GitHub | Authorize the `adnanahmad69689-ui` account and confirm the target repository name/visibility. | Push the independent source repository. |
| Supabase | Create or connect the target project and provide the project URL plus publishable/anonymous key through secure project settings. | Build and test the database, auth, and Storage integration. |
| Supabase | Complete owner email sign-up or passwordless login setup in the target project. | Establish the first verified admin identity. |
| Cloudflare | Connect the Cloudflare account/project and confirm the future domain. | Create Pages deployment, environment bindings, and DNS/cutover plan. |
| Domain email | Confirm the domain registrar/DNS owner and the Gmail destination mailbox. | Configure the correct forwarding and DNS records without disrupting existing mail. |

## Cutover Acceptance Checklist

The domain must **not** be moved and Manus must **not** be removed until all of the following pass on the independent deployment:

- [ ] Every public page and mobile layout matches the approved production design.
- [ ] Hero, About, Website, and AI System images load from Supabase Storage.
- [ ] The public site reads only published content.
- [ ] The owner can log in at `/admin`, log out, and retain a secure session.
- [ ] The admin can create, edit, publish/unpublish, reorder, upload, and permanently delete an item.
- [ ] A deleted item’s database row and intended Storage object do not return after refresh or redeployment.
- [ ] An unauthenticated visitor and a non-owner account cannot manage content.
- [ ] Direct Cloudflare requests to `/admin` and the AI Systems route work correctly.
- [ ] HTTPS, the custom domain, and the Supabase Auth redirect URL work together.
- [ ] The GitHub repository contains no secrets and the deployment environment contains all required variables.

## References

[1]: https://developers.cloudflare.com/workers/databases/third-party-integrations/supabase/ "Cloudflare Workers: Supabase integration"
[2]: https://supabase.com/docs/guides/database/postgres/row-level-security "Supabase Row Level Security"
[3]: https://supabase.com/docs/guides/storage/security/access-control "Supabase Storage Access Control"
