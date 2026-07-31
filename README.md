# SkyCode AI Workspace

SkyCode is an AI-assisted browser workspace for generating, editing, previewing, saving, reopening, and exporting web projects.

## Run locally

```bash
npm ci
npm run db:migrate:local
npm run dev
```

Open `/workspace` for the builder or `/dashboard` for saved projects.

## Production

See [PRODUCTION_SETUP.md](./PRODUCTION_SETUP.md) for Cloudflare D1, GitHub Actions, deployment, health checks, guest sessions, and optional OpenRouter configuration.
