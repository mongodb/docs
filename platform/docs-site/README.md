# MongoDB Docs on Next.js

Next.js app that serves MongoDB documentation via static pages. Pages are pre-rendered at build time from a local
`content-mdx/` directory.

- **Single-version project** (e.g. `DOCS_PROJECT=pymongo-driver/current`): builds pages at `/docs/<prefix>/<branch>/<slug>/`
- **Multi-version project** (e.g. `DOCS_PROJECT=pymongo-driver`): builds pages for every version under that project directory, using the `branch` value from each version's `_site.json`

Most projects also get a URL prefix before the branch (e.g.
`languages/python` for `pymongo-driver`). This prefix comes from a
database, not from the project name. `pnpm dev` and `pnpm build`
auto-generate it into `src/generated/dir-name-to-prefix.json` (via the
`build:prefix-map` script, run automatically as a turbo task
dependency) and `next.config.mjs` reads it as the Next.js `basePath`.
You can't guess it from the dir name; check that generated file.

## Prerequisites

- Node 24 and pnpm 10 (see `platform/.nvmrc` and the `packageManager` field in `platform/package.json`)
- AWS SSO access and an exported `NPM_AWS_AUTH` token — private `@mdb/*` packages are pulled from AWS CodeArtifact. See [platform README](../README.md) for how to get this.

## Setup

Run everything from `platform/`, not from this directory.

```bash
cd platform
pnpm i
```

`content-mdx/` is empty on a fresh clone. Generate MDX for a project before you can view it:

```bash
pnpm convert:rst-to-mdx -- pymongo-driver
```

Then start the dev server:

```bash
pnpm dev
```

This launches an interactive picker over whatever projects exist in
`content-mdx/`. Pick one, and it sets `DOCS_PROJECT` and runs the
Next.js dev server for you. Pages are available at
`http://localhost:3000/docs/<prefix>/<branch>/<page-slug>/`
(no `<prefix>` for projects that don't have one). For example, the
`pymongo-driver` `current` version's root page is at
`http://localhost:3000/docs/languages/python/pymongo-driver/current/`.

If you add a new project to `content-mdx/`, you need to re-run
`pnpm dev` to pick it up — the picker only lists projects that exist
at the time it starts.

## Environment variables

`.env.sample` in this directory has real values to copy into `.env`.

The app throws at startup without `MONGODB_URI`. Ask the Documentation
Platform team for a value.

`DOCS_PROJECT`, `NEXT_PUBLIC_DOCS_BASE_PATH`, and
`NEXT_PUBLIC_DOCS_PREFIXES` are set for you by `pnpm dev` or
`next.config.mjs` — don't set these by hand.

## Building a project

This is the same build production runs. Use it to test a production
build locally before shipping. Unlike `pnpm dev`, which renders pages
on request, `pnpm build` statically pre-renders every page at build
time.

Convert RST to MDX (from `platform/`):

```bash
pnpm convert:rst-to-mdx -- pymongo-driver
```

Build the app. You only need `DOCS_PROJECT`:

```bash
# All versions of a project
DOCS_PROJECT=pymongo-driver pnpm build

# A single version
DOCS_PROJECT=pymongo-driver/current pnpm build
```

Start the production server:

```bash
pnpm start
```

Pages are available at `http://localhost:3000/docs/<prefix>/<branch>/<page-slug>/`.

## Offline build

Produces a fully self-contained static snapshot you can open from the
filesystem. Built from the same `content-mdx/` directory as the SSG
build — no extra credentials needed. See [platform README](../README.md#offline-build)
for details.

Make sure `content-mdx/` has MDX for every project referenced by the
TOC file you're building (see [MDX Conversion Commands](../README.md#mdx-conversion-commands)):

```bash
pnpm convert:rst-to-mdx -- <project>
```

Then, from `platform/`:

```bash
pnpm build:offline -- --tocFile=<name> --version=<version>
```

## Styling conventions

Prefer CSS/SCSS modules ([docs](https://nextjs.org/docs/app/getting-started/css#css-modules)) for layouts and server components that don't hydrate on the client.

Components are built on [LeafyGreen](https://github.com/mongodb/leafygreen-ui), which uses [Emotion](https://emotion.sh/docs/introduction). Use `className` with Emotion styling.

## Deploy

Each content project deploys to its own Netlify site, not a single shared one. Site names generally follow the project — for example, `ops-manager` deploys at [ops-manager-docs](https://app.netlify.com/projects/ops-manager-docs/overview). Check the Netlify dashboard for a project's exact site name.

## Redirect migration script

TODO: delete once redirects are fully converted to Next.js.

`pnpm migrate:redirects` converts redirects from `netlify.toml` format
into Next.js redirect JSON files (`src/redirects/*-redirects.json`):

- **Removes** catch-all entries that insert a default version slug (e.g., `/docs/drivers/node/` → `/docs/drivers/node/current/`). These are handled as soft redirects in `page.tsx` on 404 without causing loops.
- **Preserves `force: true`** on entries that explicitly had `force = true` in the original `netlify.toml`. These are the only redirects placed in `next.config.mjs` (always fire regardless of page existence).
- **Leaves all other entries unchanged** (no `force` field). These are treated as soft redirects — they only fire when no page exists at the source path, replicating Netlify's default behavior.
