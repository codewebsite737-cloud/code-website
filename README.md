# SkyCode AI Workspace

SkyCode is a browser-based coding workspace for generating, editing,
previewing, saving, and exporting small web projects. It has two deliberately
separate product surfaces:

- the public, indexable marketing and SEO pages;
- the private, noindex project workspace and dashboard.

The current MVP supports editable HTML, CSS, JavaScript, and `package.json`
files. It is not yet a general Node, Python, package-installation, or
multi-tenant execution service.

## Product modes

### Instant Builder

The Instant Builder runs deterministic generation logic in the browser. It
requires no account, provider key, or payment. Its output is always reviewable
in the editor.

### Server Cloud AI

Cloud AI is optional and server-managed. Authenticated requests go through
`/api/ai`; the OpenRouter key stays in a hosted server environment variable and
never enters browser JavaScript, project files, D1, logs, or API responses.
The route enforces input limits, per-minute and daily quotas, a bounded retry,
timeouts, strict structured output, response-size limits, metadata-only usage
events, and a local Instant Builder fallback.

The route is safely disabled until `OPENROUTER_API_KEY` is configured. It uses
`poolside/laguna-s-2.1:free` by default with two zero-cost coding fallbacks and
supports `OPENROUTER_MODEL` and `AI_DAILY_LIMIT` overrides.

## Route boundaries

| Surface | Source | CSS | Search policy |
| --- | --- | --- | --- |
| Landing and SEO | `app/page.tsx`, `app/components`, SEO route folders | `app/globals.css` | index |
| Workspace | `app/workspace` | `app/workspace/workspace.css` | noindex |
| Projects dashboard | `app/dashboard` | dashboard section in `app/globals.css` | noindex |
| Project API | `app/api/projects` | none | noindex |
| Managed AI API | `app/api/ai` | none | noindex |

Builder work should stay under `app/workspace`. Marketing work should not
import workspace modules or workspace CSS. The rendered-route regression tests
enforce the most important parts of this boundary.

## Backend

Durable project operations use ChatGPT identity headers supplied by the hosting
platform and Cloudflare D1:

- ownership is checked server-side on every read, update, and delete;
- writes require same-origin browser signals and JSON;
- payload, file, name, path, template, project-count, and request-rate limits
  are enforced;
- all SQL values use prepared bindings;
- successful create, update, and delete operations write a bounded audit event
  in the same D1 batch as the project mutation.

Managed AI operations additionally require ChatGPT sign-in, apply separate
minute and daily D1 quotas, call only the fixed OpenRouter endpoint, validate a
strict four-file response, and record provider/model/status/token/cost metadata
without storing prompts or source files.

Database schema is in `db/schema.ts`. Generated migrations are committed under
`drizzle/`.

## Commands

```bash
npm run dev
npm run lint
npm test
npm run db:generate
```

Use `npm run db:generate` after schema changes and inspect the generated SQL
before deployment. Do not edit an existing applied migration.

## Developer handoff

Read [DEVELOPER_HANDOFF.md](./DEVELOPER_HANDOFF.md) before changing route
boundaries, authentication, preview isolation, cloud AI, or the database.
