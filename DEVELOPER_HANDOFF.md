# SkyCode developer handoff

Last reviewed: 2026-07-28

## 1. Current production scope

SkyCode is a polished web-project MVP, not a complete Replit replacement.

Working today:

- public landing page and focused SEO pages;
- category-first AI build wizard;
- no-login Instant Builder;
- optional authenticated server Cloud AI using a protected OpenRouter key;
- editable HTML, CSS, JavaScript, and JSON;
- cross-file search, local checkpoints, preview refresh, and static export;
- authenticated project create, list, read, update, and delete;
- responsive desktop and mobile workspace;
- sandboxed `srcDoc` preview with a preview-specific CSP.

Not implemented yet:

- arbitrary Node, Python, shell, or package execution;
- actual Git hosting synchronization;
- public or team project sharing;
- immutable hosted releases for user-generated projects;
- multiplayer editing;
- secrets management for generated applications.

Any UI or marketing copy must preserve that distinction.

## 2. Architecture and ownership

```text
app/
  page.tsx                         Public landing page
  components/                     Shared marketing components
  ai-*/ online-code-editor/       Indexable SEO landing pages
  guides/ docs/ features/         Public content pages
  dashboard/                      Private project management UI
  workspace/
    page.tsx                       Workspace orchestration and editor UI
    workspace.css                  Workspace-only styles
    cloud-ai.ts                    Managed AI browser client
    project-generator.ts           Local generator and cloud-output validator
    components/
      BuildWizard.tsx              Category and prompt workflow
      WorkspaceIcons.tsx           Workspace icon primitives
  api/projects/
    route.ts                       HTTP orchestration
    policy.ts                      Pure input and request policy
    security.ts                    Durable D1 rate limiting
    store.ts                       Prepared project storage and audit batches
  api/ai/
    route.ts                       Auth, quota, and response orchestration
    policy.ts                      Prompt, category, file, and body validation
    provider.ts                    Fixed OpenRouter boundary and structured output
    runtime.ts                     Server-only configuration reader
    store.ts                       Metadata-only AI usage events
  api/shared/
    rate-limit.ts                  Pseudonymous D1 fixed-window limiter
db/
  index.ts                         D1 binding access
  schema.ts                        Drizzle schema
worker/
  index.ts                         Route-aware HTTP security headers
tests/
  rendered-html.test.mjs          Route-boundary and security regressions
```

### Landing-page change rule

For builder features, change only `app/workspace/**`, `app/api/projects/**`,
`db/**`, or `worker/**` as required. Do not touch `app/page.tsx`,
`app/components/MarketingShell.tsx`, `app/components/SeoLandingPage.tsx`, or
the marketing section of `app/globals.css` unless the task explicitly includes
public marketing.

For landing changes, do not import from `app/workspace`. The landing page must
remain usable without loading the editor, OpenRouter, or private project data.

Run the rendered route regression tests after changing either boundary.

## 3. Data flow

### Anonymous build

1. The user chooses a project category.
2. The user submits a prompt of at most 3,000 characters.
3. `project-generator.ts` creates four supported files locally.
4. The editor displays the files.
5. The preview combines them into a restricted `srcDoc` iframe.
6. Export creates a local static HTML download.

No server account or project write is required for this path.

### Optional cloud build

1. The browser checks `/api/ai` for availability.
2. The user signs in with ChatGPT before server-funded generation.
3. The browser sends only the category, prompt, and four bounded current files
   to the same-origin API.
4. The API validates Origin, Fetch Metadata, JSON, payload, prompt, category,
   and file limits.
5. D1 enforces four requests per minute plus a configurable daily quota.
6. The server calls only the fixed OpenRouter HTTPS endpoint with its
   environment-held key.
7. OpenRouter is asked for a strict four-file JSON schema. The server validates
   the result again before returning it.
8. Metadata-only usage events record provider, model, status, token counts,
   reported cost, duration, and controlled error code.
9. Provider failure falls back to Instant Builder.

The API key never enters the browser, project files, D1, logs, or an API
response. Prompts and source files are not written to the usage table.

### Project persistence

1. The platform supplies the authenticated user email to server code.
2. The API authenticates before touching D1.
3. Mutating requests pass Origin, Fetch Metadata, content-type, and body limits.
4. A hashed user identity is used for a durable fixed-window rate limit.
5. The API selects only allowlisted fields from the payload.
6. D1 prepared statements include `owner_email` in every ownership query.
7. Mutation and audit insertion run in one transactional D1 batch.

The project URL is private and owner-only. “Copy link” is not collaboration.

## 4. Security controls implemented

### Browser and HTTP

- route-specific Content Security Policy;
- browser connections restricted to same-origin; only the server contacts
  OpenRouter;
- `frame-ancestors 'none'` and `X-Frame-Options: DENY`;
- HSTS, `nosniff`, restrictive referrer and permissions policies;
- private routes marked `no-store` and `noindex`;
- no third-party script, font, or analytics dependency;
- sandboxed preview without `allow-same-origin`, forms, network, popups, or
  parent access;
- preview CSP blocks network, frames, workers, objects, media, and form actions.

### API and storage

- server-authoritative identity and ownership;
- exact-origin and `Sec-Fetch-Site` checks on writes;
- JSON-only mutations;
- 500 KB request maximum;
- 60-file and 180 KB-per-file maximums;
- normalized 80-character project names;
- canonical relative file paths;
- UUID validation;
- template allowlist;
- 100-project safety quota per user;
- method-specific per-user rate limits;
- parameterized D1 statements;
- atomic mutation/audit batches;
- audit events contain no source files or AI prompts;
- audit retention is 180 days.

### Cloud AI

- server-only OpenRouter key in a hosted environment variable;
- ChatGPT authentication before provider-funded requests;
- per-user minute and daily D1 quotas;
- fixed provider URL with no user-controlled egress destination;
- 45-second total deadline and one bounded retry for transient statuses;
- response-size cap;
- strict JSON schema plus application-level four-file validation;
- metadata-only 90-day usage retention;
- automatic local fallback.

## 5. Known residual risks

No responsible developer should promise “100% secure.” The current scope has
strong defensive controls, but production assurance still requires:

- an external threat-model review and penetration test;
- dependency and secret scanning in CI;
- alerting on 5xx, rate-limit, authentication, and audit anomalies;
- provider-key rotation and spend alerts;
- backup restore drills and documented recovery objectives;
- a privacy/data-retention policy and user deletion/export workflow;
- CSP nonces or hashes to remove outer-page `'unsafe-inline'`;
- accessibility testing with keyboard and screen-reader users;
- abuse controls at the hosting edge in addition to application rate limits.

The iframe safely supports the current restricted browser preview. Never enable
arbitrary server-side code, package installation, or outbound network access in
this Worker. Those features need a separate disposable sandbox service with
CPU, memory, process, disk, duration, output, and egress limits.

## 6. Priority roadmap

### P0 — required before calling this a complete coding platform

1. Immutable user-project publishing with build validation and rollback.
2. A real share model: private, invited collaborator, and public-read roles.
3. Server-side execution service for non-browser runtimes.
4. CI gates for typecheck, lint, tests, migration verification, dependency
   scanning, and artifact provenance.
5. Monitoring, alerting, backup verification, and incident runbooks.

### P1 — required for a strong commercial product

1. Full project filesystem and framework-aware builds.
2. Git provider synchronization and recoverable version history.
3. Organization, team, and role administration.
4. Secrets vault and scoped integration credentials.
5. End-to-end, accessibility, and multi-browser automation.
6. Legal pages, privacy controls, account export, and deletion.

### P2 — differentiation

1. Owner Mode for nontechnical users and Builder Mode for developers.
2. Safe change-impact preview before AI edits.
3. Requirement-to-code-to-test evidence map.
4. Production health, error, performance, and release dashboards.

## 7. SEO reality

The public routes include metadata, canonicals, structured data, sitemap,
robots rules, focused search-intent pages, and internal links. Workspace and
dashboard routes are intentionally excluded from indexing.

No developer or agency can guarantee permanent first position in Google.
Ranking also depends on search intent, competition, content quality, authority,
links, real-user performance, and algorithm changes. The next SEO work should
use verified Search Console data, Core Web Vitals, content gaps, and ethical
authority building—not guaranteed-rank claims or link schemes.

## 8. Safe change checklist

Before merge or deployment:

1. Confirm whether the task is marketing, workspace, API, or shared platform.
2. Keep the change inside the matching route boundary.
3. Do not log prompts, files, provider keys, auth codes, or full request bodies.
4. Generate and inspect a new migration after schema changes.
5. Typecheck, lint, and run rendered-route tests.
6. Verify landing and workspace on desktop and mobile.
7. Verify CSP, `noindex`, caching, and unauthenticated behavior.
8. Verify create, reload, update, delete, export, Cloud AI auth, quota, and
   fallback.
9. Review the diff for unrelated landing-page changes.
10. Deploy an immutable version and keep the previous version available for
    rollback.
