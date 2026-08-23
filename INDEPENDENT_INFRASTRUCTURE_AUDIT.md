# Independent Infrastructure Audit — Adnan Ai Portfolio

## Audit Scope

This document records the current application before any independent-infrastructure migration. The public design, route structure, animations, responsive behavior, public content, and private admin experience must be preserved. The current Manus deployment must remain available until an independent deployment is verified and the owner approves cutover.

## Current Application Inventory

| Area | Current implementation | Migration implication |
|---|---|---|
| Frontend | React 19, Vite, TypeScript, Tailwind 4, Wouter-style route handling | Portable UI; preserve the existing components and CSS. |
| Public routes | Homepage `/`, AI Systems gallery `/#n8n-projects` | Preserve SPA routing and hash behavior on Cloudflare. |
| Private route | Owner-only `/admin` dashboard | Replace Manus login and tRPC calls with Supabase Auth and Supabase database/storage calls. |
| Backend | Node/Express + tRPC server under `server/_core` | Manus-specific server runtime must be removed or replaced. |
| Database | Managed MySQL/TiDB-style database through Drizzle and `mysql2` | Convert the two tables and data to Supabase PostgreSQL. |
| Storage | Manus Forge-presigned S3 uploads returned as `/manus-storage/...` URLs | Copy assets to Supabase Storage and replace all existing URLs and upload handling. |
| Authentication | Manus OAuth, signed `app_session_id` cookie, owner OpenID role promotion | Replace with Supabase Auth and a Supabase profile/role policy. |
| Deployment | Manus Vite runtime, Node server build, Manus deployment/environment bindings | Rebuild for Cloudflare Pages plus Supabase; do not retain Manus runtime packages. |
| Email/contact | `mailto:` links to `Adnanuop@gmail.com` plus Instagram | No application email backend exists. Gmail forwarding is a domain/DNS configuration task, not a code migration. |

## Current Data Model

The active database contains two application tables.

| Table | Current purpose | Supabase destination |
|---|---|---|
| `users` | Manus OAuth identity, role, login metadata | Replace with `auth.users` plus a `profiles` table holding the `admin` role. Do **not** migrate Manus OpenIDs as login identities. |
| `portfolio_items` | Managed Website and AI System records, publication status, order, image references, details, and workflow fields | Migrate to a PostgreSQL `portfolio_items` table with equivalent fields and owner-only RLS policies. |

The current live portfolio manages **Websites** and **AI Systems** only. It does **not** contain a products/catalog table, categories table, or a database-backed hero/settings model. The existing hero and about configuration are static TypeScript content. Adding editable Hero or Products management in the new admin is an extension beyond today’s current feature set and should be added deliberately after the base migration is stable.

## Content and Asset Inventory

The current managed content includes two retained Website projects and the current AI System workflow patterns. Images come from two places: dynamic portfolio record image URLs in the current database, and static paths in source configuration.

The source code references nine static Manus storage assets: the hero portrait, about portrait, two legacy website-preview paths, and five workflow dashboard images. In addition, every managed database record stores an image URL and, where available, a storage key. Both groups must be copied to Supabase Storage before changing application URLs.

> The current database delete operation removes a portfolio row but does not delete the original Manus storage object. The Supabase version must deliberately delete both the database record and its Storage object so a deleted item does not return after refresh, redeploy, or migration.

## Current Admin Feature Surface

The `/admin` dashboard already supports the following for Websites and AI Systems: secure owner gating, listing all published/draft content, create, edit, delete, publish/draft, reordering, image upload, public URL, alt text, highlights, and AI-system Trigger/Process/Output/approval fields.

The independent replacement must preserve these functions exactly. It must also keep public pages read-only and show only published items.

## Manus-Specific Coupling to Remove

| Dependency | Current location | Independent replacement |
|---|---|---|
| Manus OAuth portal and callback | `client/src/const.ts`, `server/_core/oauth.ts`, `server/_core/sdk.ts` | Supabase Auth sign-in/out and auth state listener. |
| Manus session/JWT behavior | `server/_core/sdk.ts`, `client/src/_core/hooks/useAuth.ts`, `client/src/components/AppProviders.tsx` | Supabase session management; no Manus preview-token fallback. |
| Forge storage | `server/storage.ts`, `/manus-storage/*` proxy, database `imageUrl` values | Supabase Storage public URLs or signed URLs, with authenticated upload/delete rules. |
| MySQL Drizzle dialect | `drizzle/schema.ts`, `server/db.ts`, `mysql2` | Supabase PostgreSQL schema and either the Supabase client or PostgreSQL Drizzle dialect. |
| Manus server runtime | `server/_core/*`, `vite-plugin-manus-runtime`, Node server scripts | Cloudflare Pages static build plus Supabase client, or an explicitly designed Cloudflare Worker for any remaining server-only logic. |
| Manus environment variables | `VITE_APP_ID`, `OAUTH_SERVER_URL`, `OWNER_OPEN_ID`, `BUILT_IN_FORGE_*`, Manus analytics/runtime values | Supabase project URL, Supabase anon key, and any carefully scoped Cloudflare variables. |
| Manus deployment remote | Current internal artifact remote | GitHub repository owned by `adnanahmad69689-ui`, then Cloudflare project connected to that repository. |

## Recommended Target Architecture

The cleanest target is a **static Vite React application on Cloudflare Pages** using the **Supabase browser client** for public reads, admin CRUD, Auth, and Storage. This removes the current Node/Express/tRPC runtime rather than attempting to run a Manus-derived Express server on Pages.

Supabase Row Level Security should allow anonymous users to read only published portfolio content. Authenticated users should have no write access by default; a `profiles` record for the owner’s Supabase user ID grants the `admin` role. Storage policies should allow public reads for approved public portfolio images and owner-only uploads/deletes. Where storage removal needs elevated authority, use a narrowly scoped Supabase Edge Function or a Cloudflare Worker rather than exposing a Supabase service-role key to the browser.

## Migration Risks and Safeguards

| Risk | Safeguard |
|---|---|
| MySQL-to-PostgreSQL type and migration differences | Use a reviewed PostgreSQL SQL migration and import script; verify row counts and rendered content before cutover. |
| Lost images or broken public URLs | Export every current URL/key, copy files to named Supabase buckets, store the new URL/key, then validate each public card. |
| Admin lockout | Create and verify the owner Supabase Auth account before disabling or replacing any existing admin path. |
| Accidental public writes | Apply Supabase RLS policies before importing production data and test anonymous access separately. |
| Cloudflare SPA route failures | Configure Pages SPA fallback so direct `/admin` visits resolve to the app entry point. |
| Exposed secrets | Keep only the Supabase anonymous key in the browser build; store any service-role key only in a server-side Edge Function or Worker secret. |
| Premature Manus shutdown | Do not change the public domain, delete assets, or disable the Manus site until the independent preview passes functional tests and the owner approves cutover. |

## What Must Be Migrated

The independent migration must move the React UI and current CSS; the Website and AI System data; the hero, about, workflow, and project images; the admin CRUD behavior; publish/draft/reorder rules; Supabase Auth owner access; database and storage security policies; public routing; GitHub repository history/source; and Cloudflare deployment configuration.

The current project has no product/catalog backend or server-side contact form to migrate. Professional Gmail forwarding requires domain DNS/mail configuration outside the website codebase.

## Migration Status — August 2026

The Supabase PostgreSQL schema, Row Level Security policies, public storage buckets, the retained Website/AI System content records, and approved portfolio assets have been created and copied into the selected Supabase project. The Supabase-backed public pages and private email-link gate render successfully in the independent development build. The application now includes a Cloudflare Pages static-build command, SPA fallback rules, a Pages project configuration, and a non-secret environment template.

Cloudflare account inspection showed no existing Pages project. Creating the new `adnan-ai-portfolio` Pages project was attempted only after this read-only check, but Cloudflare returned API error `10000` (authentication error). The current Cloudflare connector is enabled but does not yet have Pages write authorization, so a user-approved Cloudflare reauthorization or API token with **Account → Pages → Edit** permission is required before an independent Cloudflare preview can be published.
