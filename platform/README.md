# MongoDB Docs Platform Monorepo

This monorepo contains the tools and infrastructure for managing MongoDB documentation. It uses [`pnpm`](https://pnpm.io) for package management and [`Turborepo`](https://turbo.build/repo) for task orchestration.

## Prerequisites

**Each should be installed globally**

- Node.js >= 24
- pnpm >= 10

If you don't have Node.js installed on your machine, you can do so by using `nvm`:
```bash
brew install nvm
nvm intall 24
```

Then, if you don't [configure automatic `nvm use` when changing directories](https://stackoverflow.com/a/77440721), you should run `nvm use` to select the proper version of Node.js before you `pnpm install`.

If you don't have `pnpm` installed on your machine, you can do so by using `npm`:
```bash
npm install -g pnpm
```

To locally develop the docs site, we rely on `netlify` to run a local blob storage as well as our dev server. To make this work, you'll need to first link the netlify project:
```bash
cd platform/docs-nextjs
pnpm dlx netlify link
```

Then select Project ID and add the Netlify Site ID/Project ID (same thing) from here:

https://app.netlify.com/projects/docs-on-nextjs/configuration/general

You'll also need that ID for the `platform/docs-nextjs/.env`, along with a personal access token, which can be generated here:

https://app.netlify.com/user/applications#personal-access-tokens

NOTE: ensure both `NETLIFY_ACCESS_TOKEN` and `NETLIFY_SITE_ID` are set in `platform/docs-nextjs/.env`

## Getting Started

Ensure proper node version, then install dependencies:
```bash
cd platform/
nvm use
pnpm i
```

Before you start the dev server for the docs, you may want to seed the blob storage with local MDX files. To do this, you should first convert a Snooty rST project to MDX:
```bash
pnpm convert:rst-to-mdx -- manual
```

Now you can seed the local blob storage with the entire `content-mdx` folder:
```bash
pnpm blobs:seed
```

**NOTE:** This may take a long time, so you might want to leave this running in a separate tab and move on to the next step.

You can now start the dev server, which will also run `blobs:watch`:
```bash
pnpm dev
```

**NOTE:** If the page (and included images/MDX files) are not yet loaded (in case `blobs:seed` is still running), you can simply save the necessary files and `blobs:watch` will update the blob storage immediately.

### Troubleshooting

In case your development setup stops working for some reason, first ensure that it's NOT an issue with your local node_modules or cached/built files. To quickly validate this, you can run the following command:
```bash
pnpm install:clean
```
This will clean out your local node_modules, cache files, build artifacts, and pnpm store. It will then re-install all dependencies. The first time you run this, you will need to ensure the script has permission to run: `chmod +x ./tools/clean-install.sh`

## Workspace Structure

The monorepo is organized as follows:
- `docs-nextjs`: Contains the Next.js server for servering MDB docs
  - Uses Remote MDX files from Netlify Blob Storage
- `snooty-ast-to-mdx`: Converts Snooty rST to MDX
- `tools/`: Contains various tools and utilities
  - `ingest-mongodb-docs/`: Tool for ingesting MongoDB docs from Snooty Data API, check [README](/platform/tools/ingest-mongodb-docs/README.md) for more info

## Available Commands

Commands should generally be run from the root of the `platform` directory:
- This allows `turborepo` to cache virtually any script or task (might require configuration if it produces arbitrary files, such as `.mdx`)
- This allows `turborepo` to orchestrate tasks throughout the monorepo, such as ensuring the blob storage updated in `dev` mode when working with the MDX content.
- This works by using `pnpm` scripts from the `platform/package.json` file, which in turn calls the appropriate `turborepo` tasks.
- `turborepo` tasks cascade throughout the various `package.json` files of the projects specified in the `pnpm-workspace.yaml` file.
  - for example: `turbo run dev` will run the `dev` script in each `package.json` in each project, as well as any other tasks specified in the `with` or `dependsOn` fields of the `dev` task within the `turbo.json` file.

### Build Commands
- `pnpm dev`: Development mode for all packages
- `pnpm build`: Build all packages
- `pnpm typecheck`: Run type checking across all packages

### Linting
- `pnpm lint`: Run linting across all packages
- `pnpm lint:fix`: Fix linting issues automatically

### Testing
- `pnpm test`: Run tests across all packages
- `pnpm test:coverage`: Generate test coverage report
- `pnpm test:update`: Update test snapshots
- `pnpm test:watch`: Watch for test changes and re-run tests

### MDX Conversion Commands
- `pnpm convert:rst-to-mdx`: Convert Snooty rST to MDX
- `pnpm convert:rst-to-mdx -- <name_of_content_folder>`: Convert Snooty rST to MDX for a specific content folder
  - For example: `pnpm convert:rst-to-mdx -- atlas` will convert the Snooty rST in the `content/atlas` folder to MDX.

### Blob Storage Commands
- `pnpm blobs:seed`: Seed the local blob storage with the MDX content
- `pnpm blobs:clear`: Clear the local blob storage
- `pnpm blobs:watch`: Watch for changes to the MDX content and update the local blob storage

### Ingest Commands
- `pnpm ingest:pages`: Update pages using the ingest tool
- `pnpm ingest:all`: Run full ingestion process

## Pull Request Templates

When creating a pull request, you can automatically populate the description with a template by adding a query parameter to the URL. For more instructions go to the [README](../README.md) in the root of the monorepo.

## Package Management

This monorepo uses pnpm workspaces for package management. The workspace configuration is defined in `pnpm-workspace.yaml`.

## Build System

Turborepo is used for build orchestration. The build configuration is defined in `turbo.json` and includes:
- Caching for faster builds
- Task dependencies

For more information about the build system, refer to the [Turborepo documentation](https://turbo.build/repo/docs).

## Turborepo Configuration

The monorepo uses a base Turborepo configuration in `turbo.json` that defines common tasks and their dependencies.
