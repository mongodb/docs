# CLAUDE.md — `platform/`

Ground rules for AI coding agents working in `platform/`. These supplement the repo-root `CLAUDE.md`, whose critical instructions, git, and PR rules also apply.

For setup, environment variables, and staging details, see `platform/README.md` and each package's README.

## Critical instructions
- Never open a PR without explicit instruction from the user.
- Never update Jira ticket status without explicit user permission.

## Setup

- Node.js 24 (`platform/.nvmrc`) and pnpm 10.
- Private `@mdb/*` packages install from AWS CodeArtifact, so `pnpm i` needs `NPM_AWS_AUTH` set in the shell. If an install fails with an auth error, ask the user to refresh the token rather than working around it.

## Workspace

pnpm workspace (`pnpm-workspace.yaml`) orchestrated by Turborepo (`turbo.json`):

- `docs-site/`: Next.js SSG app for writer content. Reads MDX from `content-mdx/` at the repo root.
- `docs-nextjs/`: Next.js ISR app for shared pages (site search, 404, AI Assistant, Product Updates). Writer content is migrating off it onto `docs-site`.
- `snooty-ast-to-mdx/`: Converts Snooty rST to MDX.
- `nextjs-extension/` and `nextjs-ssg-extension/`: Netlify build extensions used in CI.
- `versioning/`: Source of truth for which docs sites and versions exist. Add a version here, not in a database.
- `packages/`: Shared config (for example `@platform/eslint-config`).
- `tools/`: Standalone utilities (llms.txt generation, translation, MDX-to-Markdown, CDN log parsing).

## Commands

Run commands from `platform/` so Turborepo can cache and order tasks.

## Generated Files

Do not hand-edit generated output. Change the generator and regenerate instead.

- `content-mdx/` at the repo root is produced by `pnpm convert:rst-to-mdx`.
- `docs-site/src/generated/` and `docs-site/src/context/toc-data/data.copied.ts` are build outputs.

Only run `pnpm test:update` when a snapshot change is intended, and call out updated snapshots in your summary.

## Pull requests

Do not push to the shared `preprd` staging branch unless the user explicitly asks.

When opening a PR for changes in `platform/`, always use the platform
template:

```bash
gh pr create --template platform.md
```

The template lives at `.github/PULL_REQUEST_TEMPLATE/platform.md`.

## Comments

Do not add comments by default.

Add one only when it explains non-obvious intent, a tricky tradeoff, or a
"why" the code itself can't convey — never to restate what the code already
says. Keep it short and specific. If a comment doesn't clearly earn its
place, omit it.

The goal is signal-dense PRs that are easy to review, not padding.
