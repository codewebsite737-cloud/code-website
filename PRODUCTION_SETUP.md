# SkyCode production setup

The application is configured to create and bind a Cloudflare D1 database automatically, apply every SQL migration, deploy the Worker, and verify the production health endpoint on each push to `main`.

## Required GitHub repository secrets

Add these under **Settings → Secrets and variables → Actions**:

- `CLOUDFLARE_ACCOUNT_ID`
- `CLOUDFLARE_API_TOKEN`
- `OPENROUTER_API_KEY` (optional; Instant Builder works without it)

The Cloudflare token must be allowed to edit Workers scripts and D1 databases for the selected account.

## First deployment

1. Push or merge to `main`.
2. GitHub Actions runs type-checking, linting, production build, and tests.
3. Wrangler deploys once to automatically provision and bind `DB` when it does not exist.
4. The workflow applies the migrations in `drizzle/`.
5. Wrangler deploys the verified application again, then syncs the optional OpenRouter secret.
6. The workflow checks `/api/health`; the release fails if the database is not operational.

## Local development

```bash
npm ci
npm run db:migrate:local
npm run dev
```

The app creates a private HttpOnly guest browser session automatically. Saved projects remain associated with that browser session. Supported identity headers from ChatGPT hosting or Cloudflare Access upgrade the same API boundary to an authenticated identity.

## AI configuration

The deployed Worker uses:

- `OPENROUTER_API_KEY` as a secret
- `OPENROUTER_MODEL` from `wrangler.json`
- `AI_DAILY_LIMIT` from `wrangler.json`

Guest sessions are capped at five managed generations per day even when the configured account limit is higher.

## Release gate

A production release is considered healthy only when:

```bash
npm run typecheck
npm run lint
npm test
```

all pass and the production `/api/health` endpoint returns HTTP 200.
