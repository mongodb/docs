# Netlify Extension

This extension is created using the [Netlify SDK](https://sdk.netlify.com/get-started/introduction/). It is a boilerplate for creating a new extension.

## Scripts

These are some common scripts you will use when developing your extension. If you want to know what else is possible, [check out the documentation](https://developers.netlify.com/sdk/netlify-sdk-utility-tools-reference/).

### Build

This builds the extension into a `.ntli` folder. This is the folder that Netlify uses to run the extension.

```bash
npm run build
```

## What It Does

It hooks into Netlify's build lifecycle with two hooks:

**`onPreBuild`** — the heavy lifter:
- Discovers all `snooty.toml` files in `content/`
- Runs the Snooty parser (RST → AST → MDX)
- Persists parsed pages/metadata/assets to MongoDB Atlas
- Builds a unified Table of Contents
- Uploads MDX to Netlify Blob Storage (where `docs-nextjs` reads it at runtime)

**`onSuccess`** — post-build work:
- Generates/uploads search manifests to S3 + Atlas
- Handles offline documentation bundles
- Posts GitHub PR comments with build status + preview URLs

## Architecture

| Layer | Tech |
|---|---|
| Build hooks | Netlify SDK (`@netlify/sdk`) |
| API | tRPC (type-safe RPC between UI and backend) |
| UI | React + Vite, rendered as Netlify dashboard surfaces |
| Storage | MongoDB Atlas (content), Netlify Blobs (MDX), S3 (search) |
| GitHub | Octokit (PR comments, change detection) |

## Integration with docs-nextjs

The extension writes MDX to Netlify Blob Storage. `docs-nextjs` reads it at runtime via ISR/SSG. The extension is toggled via the `NEXTJS_EXTENSION_ENABLED` env var in `docs-nextjs/netlify.toml`.

## Key Entry Points

- `src/index.ts` — extension registration and hook orchestration
- `src/server/router.ts` — tRPC procedures
- `src/ui/App.tsx` — React configuration UI
- `src/parse/`, `src/persistence/`, `src/buildTOC/`, `src/searchManifests/` — pipeline modules
