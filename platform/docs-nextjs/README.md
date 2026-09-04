# MongoDB Docs Next.js (ISR)

This app serves shared pages that are not writer content: site search, 404, AI Assistant, Product Updates, and similar. Writer content is moving off it onto [`docs-site`](../docs-site/README.md), which statically generates pages from `content-mdx/`.

## Prerequisites

- Node 24 and pnpm 10 (see `platform/.nvmrc` and the `packageManager` field in `platform/package.json`)
- AWS SSO access and an exported `NPM_AWS_AUTH` token — private `@mdb/*` packages are pulled from AWS CodeArtifact. See [platform README](../README.md) for how to get this.

## Setup

Install from `platform/`:

```bash
cd platform
pnpm i
```

Copy `.env.sample` in this directory to `.env`. The app validates required variables at startup (including `MONGODB_URI`). Ask the Documentation Platform team for values.

You can start the dev server from `platform/` if you want to run both `docs-site` and `docs-nextjs` locally, otherwise you can `cd docs-nextjs` before running:

```bash
pnpm dev
```

That runs `netlify dev --offline`. Shared pages and remaining ISR docs routes are available through the Netlify dev proxy (port 8888).

### Local blobs

Writer pages still served here are read from Netlify Blobs at runtime. Locally, seed the sandbox after the dev server is up:

```bash
pnpm blobs:seed    # upload content-mdx/ into the local blob store
pnpm blobs:watch   # re-seed when content-mdx/ files change
pnpm blobs:clear   # empty the local blob store
```

`blobs:seed` and `blobs:clear` call the dev server at `http://localhost:8888` and fail if it is not running.

Turbo can still run lint, tests, and builds from `platform/`. Run `pnpm dev` from this directory when you need to bypass those extra checks.

### Product Updates Page

If you would like to test Aha! integration, grab the `CONTENTSTACK_WEBHOOK_TOKEN` value from Netlify env config.

## Styling conventions

Next.js supports module [css](https://nextjs.org/docs/app/getting-started/css#css-modules)/[scss](https://nextjs.org/docs/app/guides/sass) out of the box. Prefer CSS/SCSS modules for layouts and server components that do not have to hydrate on the client.

The design system is moving from [LeafyGreen](https://github.com/mongodb/leafygreen-ui) to Via (`@via-ds/components`, `@via-ds/icons`, `@via-ds/tokens`). This app still uses LeafyGreen, which is built on [Emotion](https://emotion.sh/docs/introduction); pass styles with `className`. `docs-site` is migrating first — follow that pattern when this app's LeafyGreen-to-Via work starts. Do not add new LeafyGreen usage if a Via equivalent already exists there.

## Deploy on Netlify

This application is deployed on Netlify at [Docs on Next](https://app.netlify.com/projects/docs-on-nextjs/overview). Branch and preview deploys can be managed via the UI, under [Project Configuration -> Build & Deploy](https://app.netlify.com/projects/docs-on-nextjs/configuration/deploys#content).

## Short lived scripts

TODO: delete once redirects are fully converted to Next.js

Run `pnpm migrate:redirects` to convert redirects from `netlify.toml` format into the Next.js redirect JSON files (`src/redirects/*-redirects.json`). The script:

- **Removes** catch-all entries that insert a default version slug (e.g., `/docs/drivers/node/` → `/docs/drivers/node/current/`). These are handled as soft redirects in `page.tsx` on 404 without causing loops.
- **Preserves `force: true`** on entries that explicitly had `force = true` in the original `netlify.toml`. These are the only redirects placed in `next.config.mjs` (always fire regardless of page existence).
- **Leaves all other entries unchanged** (no `force` field). These are treated as soft redirects — they only fire when no page exists at the source path, replicating Netlify's default behavior.
