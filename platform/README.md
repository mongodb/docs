# MongoDB Docs Platform Monorepo

This monorepo contains the tools and infrastructure for managing MongoDB documentation. It uses [`pnpm`](https://pnpm.io) for package management and [`Turborepo`](https://turbo.build/repo) for task orchestration.

## Prerequisites

**Each should be installed globally**

- Node.js >= 24
- pnpm >= 10

If you don't have Node.js installed, use `nvm`:
```bash
brew install nvm
nvm install 24
```

If you don't have `pnpm`, install it via `npm`:
```bash
npm install -g pnpm
```

## Getting Started

Ensure the correct Node version, then install dependencies:
```bash
cd platform/
nvm use
pnpm i
```

Convert a Snooty rST project to MDX (required before building):
```bash
pnpm convert:rst-to-mdx -- manual
```

Build the app for a project. Pages are statically generated from the local `content-mdx/` directory:
```bash
# All versions of a project
DOCS_PROJECT=manual pnpm build

# A single version
DOCS_PROJECT=manual/manual pnpm build
```

Then start the server:
```bash
cd docs-nextjs && pnpm start
```

Pages are served at `http://localhost:3000/docs/<branch>/<page-slug>/`.

### Troubleshooting

If your development setup stops working, clean and reinstall all dependencies:
```bash
pnpm install:clean
```
The first time you run this, ensure the script has permission: `chmod +x ./tools/clean-install.sh`

## Workspace Structure

- `docs-nextjs/`: Next.js server for serving MDB docs — reads MDX content from the local `content-mdx/` directory
- `snooty-ast-to-mdx/`: Converts Snooty rST to MDX
- `tools/`: Various tools and utilities

## Available Commands

Commands should generally be run from the root of the `platform/` directory so that Turborepo can cache tasks and orchestrate dependencies.

### Build Commands

- `pnpm build`: Build the Next.js app for a specific project (set `DOCS_PROJECT` env var)

### Offline Build

An offline build produces a fully self-contained static snapshot of a docs site that can be opened directly from the filesystem (e.g. via `file://` or distributed as a zip).

Run from the `platform/docs-nextjs` directory:

```bash
pnpm build:offline -- --tocFile=<name> --version=<version>
```

- `--tocFile`: name of a TOC file (without `.ts`) from `src/context/table-of-contents/offline-docs/`
- `--version`: version string to build (e.g. `current`, `v1.12`). Use `main` for unversioned sites.

**Examples:**

```bash
# Unversioned site
pnpm build:offline -- --tocFile=ai-models --version=main

# Versioned site
pnpm build:offline -- --tocFile=kafka-connector.versioned.kafka-connector --version=current
```

Output is written to `platform/docs-nextjs/out/`.

### Linting
- `pnpm lint`: Run linting across all packages
- `pnpm lint:fix`: Fix linting issues automatically

### Testing
- `pnpm test`: Run tests across all packages
- `pnpm test:coverage`: Generate test coverage report
- `pnpm test:update`: Update test snapshots
- `pnpm test:watch`: Watch for test changes and re-run

### MDX Conversion Commands
- `pnpm convert:rst-to-mdx`: Convert all Snooty rST projects to MDX
- `pnpm convert:rst-to-mdx -- <name>`: Convert a specific project (e.g. `pnpm convert:rst-to-mdx -- atlas`)

### MDX Validation Commands
- `pnpm validate:mdx-parse`: Validate all generated MDX files in `content-mdx/`
- `pnpm validate:mdx-parse -- <name>`: Validate a specific project (e.g. `pnpm validate:mdx-parse -- django-mongodb`)

### Type Checking
- `pnpm typecheck`: Run type checking across all packages

## Pull Request Templates

When creating a pull request, you can automatically populate the description with a template by adding a query parameter to the URL. For more instructions, see the [README](../README.md) in the root of the monorepo.

## Package Management

This monorepo uses pnpm workspaces for package management. The workspace configuration is defined in `pnpm-workspace.yaml`.

## Build System

Turborepo is used for build orchestration, defined in `turbo.json`. It provides caching and task dependency management across packages.

For more information, refer to the [Turborepo documentation](https://turbo.build/repo/docs).
