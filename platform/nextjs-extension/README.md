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

It hooks into Netlify's build lifecycle with one hook:

**`onPreBuild`**:
- Sets the environment variables the `docs-nextjs` build reads: `ENV`, `NEXT_PUBLIC_GIT_BRANCH`, `SNOOTY_DB_NAME` and `NEXT_PUBLIC_MARIAN_URL`
- Builds a unified Table of Contents and writes it to `docs-nextjs/src/context/toc-data/data.copied.ts`

Content builds (parsing, MDX conversion, search manifests, and offline documentation bundles) run in `nextjs-ssg-extension` for `docs-site`, not here.

## Architecture

Build hooks only, built with the Netlify SDK (`@netlify/sdk`). The extension has no UI surfaces, so it is enabled per site with the `NEXTJS_EXTENSION_ENABLED` env var rather than from the Netlify dashboard.

## Integration with docs-nextjs

The extension is toggled via the `NEXTJS_EXTENSION_ENABLED` env var in `docs-nextjs/netlify.toml`.

## Key Entry Points

- `src/index.ts` — extension registration and hook orchestration
- `src/contentMetadata/config.ts` — `updateConfig`, which derives the environment variables listed above
- `src/buildTOC/` — unified Table of Contents build
