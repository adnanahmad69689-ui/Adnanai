# Adnan Ai Admin Content Model

## Purpose

The admin dashboard will let the owner manage the public **Websites** and **AI Systems** sections without changing code. The existing public visual design remains unchanged; only the content source changes from static files to database records.

## Primary Content Record

One `portfolio_items` table will support both project types through a `kind` field.

| Field | Websites use | AI Systems use |
|---|---|---|
| `kind` | `website` | `ai_system` |
| `title` | Website name | System name |
| `label` | Public status or project type | Workflow or agent type |
| `description` | Short project overview | Short system overview |
| `imageUrl` / `imageAlt` | Website screenshot | Workflow dashboard image |
| `publicUrl` | Public Vercel/live website URL | Optional safe live demo URL |
| `detailsJson` | Three concise project highlights | Optional concise feature highlights |
| `trigger` | Not used | What starts the system |
| `aiProcess` | Not used | What AI does |
| `output` | Not used | Result produced |
| `approvalRequired` | Not used | Whether a human reviews output |
| `status` | `draft` or `published` | `draft` or `published` |
| `sortOrder` | Display position within Websites | Display position within AI Systems |

## Ownership and Safety

All edit operations will be restricted to the project owner through Manus OAuth and the `admin` role. Public visitors can only read records marked `published`. Uploaded images will go to managed storage; the database stores only the asset URL and metadata.

## Initial Migration

The database will begin with these public Website records:

1. **Aqualume water website** — public Vercel link and current portfolio image.
2. **N A Metal website** — public Vercel link and current portfolio image.

The existing AI System cards will be migrated as draft-ready managed items, preserving their current visuals and public descriptions. This lets the owner review, edit, hide, or publish each card from the dashboard.

## Future Vercel Migration

The React UI and database model will remain portable. When moving to Vercel, deploy the frontend and API as a Vercel app or separate services, create a compatible MySQL/TiDB database, configure storage, and set the OAuth and environment variables there. The Manus database, authentication, storage, and environment bindings do not automatically transfer, so they must be reconnected during migration.
