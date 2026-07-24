# MongoDB Docs on Next.js

Docs-Nextjs is a [Next.js](https://nextjs.org) application using app router features. It serves all MDB Documentation via static site generation (SSG).

## Page generation strategy

All pages under `/docs` are pre-rendered at build time using `generateStaticParams`. Content is read directly from a local `content-mdx/` directory — there is no runtime blob store dependency.

- **Single-version project** (e.g. `DOCS_PROJECT=manual/manual`): builds pages at `/docs/<branch>/<slug>/`
- **Multi-version project** (e.g. `DOCS_PROJECT=manual`): builds pages for every version found under the project directory, each using the `branch` value from its own `_site.json`

## Developing

`turborepo` is used to orchestrate tasks in this monorepo. It is recommended to run commands from the root of the `platform/` directory rather than from this directory directly.

### Building a project

First, convert the RST source to MDX (run from `platform/`):

```bash
pnpm convert:rst-to-mdx -- manual
```

Then build the Next.js app for a project. You only need to supply `DOCS_PROJECT`:

```bash
# All versions of a project
DOCS_PROJECT=manual pnpm build

# A single version
DOCS_PROJECT=manual/manual pnpm build
```

Start the production server after a successful build:

```bash
pnpm start
```

Pages are available at `http://localhost:3000/docs/<branch>/<page-slug>/`.

### Offline Build

An offline build produces a fully self-contained static snapshot that can be opened from the filesystem. See [platform README](../README.md#offline-build) for details.

### Product Updates Page

If you would like to test Aha! integration, grab the `CONTENTSTACK_WEBHOOK_TOKEN` value from Netlify env config.

### Styling Conventions

Next.js supports module [css](https://nextjs.org/docs/app/getting-started/css#css-modules)/[scss](https://nextjs.org/docs/app/guides/sass) out of the box. Prefer css/scss modules for layouts and server-side components that do not hydrate on the client.

Components are built on [LeafyGreen's UI Library](https://github.com/mongodb/leafygreen-ui), which uses the [Emotion library](https://emotion.sh/docs/introduction). Use `className` with Emotion styling.

## Building offline docs locally

Offline docs are built from the local `content-mdx/` directory — the same source the main SSG build reads from. There are no Netlify Blob credentials to configure.

Before running `pnpm build:offline`, make sure `content-mdx/` has MDX for every project referenced by the TOC file you're building (see [MDX Conversion Commands](../README.md#mdx-conversion-commands) in the platform README):

```bash
pnpm convert:rst-to-mdx -- <project>
```

Then run from the `platform/` directory:

```bash
pnpm build:offline -- --tocFile=<name> --version=<version>
```

## Deploy on Netlify

This application is deployed on Netlify at [Docs on Next](https://app.netlify.com/projects/docs-on-nextjs/overview). Branch and preview deploys can be managed via the UI under [Project Configuration -> Build & Deploy](https://app.netlify.com/projects/docs-on-nextjs/configuration/deploys#content).

## Short lived scripts

TODO: delete once redirects are fully converted to Next.js

Run `pnpm migrate:redirects` to convert redirects from `netlify.toml` format into the Next.js redirect JSON files (`src/redirects/*-redirects.json`). The script:

- **Removes** catch-all entries that insert a default version slug (e.g., `/docs/drivers/node/` → `/docs/drivers/node/current/`). These are handled as soft redirects in `page.tsx` on 404 without causing loops.
- **Preserves `force: true`** on entries that explicitly had `force = true` in the original `netlify.toml`. These are the only redirects placed in `next.config.mjs` (always fire regardless of page existence).
- **Leaves all other entries unchanged** (no `force` field). These are treated as soft redirects — they only fire when no page exists at the source path, replicating Netlify's default behavior.