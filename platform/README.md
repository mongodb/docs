# MongoDB Docs Platform Monorepo

This monorepo contains the tools and infrastructure for managing MongoDB documentation. It uses pnpm for package management and Turborepo for build orchestration.

## Prerequisites

**Each should be installed globally**

- Node.js >= 24
- pnpm >= 10.11.1
- npm >= 10.9.2

If you don't have `pnpm` installed on your machine, you can do so by using `npm`.

```bash
npm install -g pnpm@latest-10
```

## Getting Started

1. Install dependencies:
```bash
pnpm install
```

## Workspace Structure

The monorepo is organized as follows:
- `tools/`: Contains various tools and utilities
  - `ingest-mongodb-docs/`: Tool for ingesting MongoDB docs from Snooty Data API, check [README](/platform/tools/ingest-mongodb-docs/README.md) for more info
- `docs-nextjs`: Contains the Next.js server for servering MDB docs

## Available Commands

### Build Commands
- `pnpm build`: Build all packages
- `pnpm dev`: Development mode for all packages

### Linting
- `pnpm lint`: Run linting across all packages
- `pnpm lint:fix`: Fix linting issues automatically

### Testing
- `pnpm test`: Run tests across all packages

### Ingest Commands
- `pnpm ingest:pages`: Update pages using the ingest tool
- `pnpm ingest:all`: Run full ingestion process


### Filtering Tasks

You can use the `--filter` flag to run tasks for specific packages:


## Development Workflow

1. Make changes in the relevant package
2. Run tests: `pnpm test`
3. Submit a pull request

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

The monorepo uses a base Turborepo configuration in `turbo.json` that defines common tasks and their dependencies. Individual projects can extend this configuration by creating their own `turbo.json` files.

### Base Configuration

The root `turbo.json` defines the following tasks:

```json
{
  "tasks": {
    "build": {
      "cache": true,
      "dependsOn": ["^lint"]
    },
    "watch": {
      "cache": false,
      "dependsOn": ["^build"]
    },
    "lint": {
      "cache": true
    },
    "lint:fix": {
      "cache": true
    },
    "test": {
      "cache": false,
      "dependsOn": ["^lint"]
    }
  }
}
```

Key features of the base configuration:
- Build tasks depend on linting (`^lint`)
- Watch mode depends on build (`^build`)
- Caching is enabled for build, lint, and lint:fix tasks
- Test tasks depend on linting but don't use caching

### Project-Level Configuration

Individual projects can extend the base configuration by creating their own `turbo.json` files. These configurations:
- Inherit all base task definitions
- Can override specific task configurations
- Can add new project-specific tasks
- Can modify dependencies and caching behavior

Example of a project-level `turbo.json`:
```json
{
  "extends": ["//"],
  "tasks": {
    "build": {
      "outputs": ["dist/**"],
      "env": ["NODE_ENV"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

When running Turborepo commands, the configurations are merged, with project-level settings taking precedence over the base configuration.
