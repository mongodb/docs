# translation-evals

Evaluate LLM translations of MongoDB docs by comparing our local LLM
translation against the production (human/vendor, Smartling) translation, on
**rendered** page content.

Design: `docs/superpowers/specs/2026-10-07-translation-evals-design.md`
Plan: `docs/superpowers/plans/2026-10-07-translation-evals.md`

## Status

Scaffold only. The package, config, run-manifest storage, and CLI dispatch
land first; each of the seven stages arrives in its own PR and registers a
handler in `src/commands/index.ts`.

## The seven stages

Each stage is an independent subcommand and communicates only through a
per-run directory on disk:

```
resolve ─▶ scrape-prod ─▶ translate ─▶ serve ─▶ scrape-local ─▶ dataset ─▶ eval
```

Each stage is a package script (run from this directory). Stage scripts are
added as each stage lands:

| Stage | Command |
|---|---|
| Resolve the project's pages + transitive translatable set | `pnpm resolve --project atlas` |
| Scrape production (reference + English source) | `pnpm scrape-prod --project atlas` |
| Translate the closure locally (Grove) | `pnpm translate --project atlas` |
| Serve the translated site locally | `pnpm serve --project atlas --locale es` |
| Scrape the local site | `pnpm scrape-local --project atlas --locale es` |
| Build Braintrust rows | `pnpm dataset --project atlas` |
| Run the eval | `pnpm eval` |

## How localization works

`docs-site` has no locale routing — production locales are produced by
Smartling's CDN. So we **substitute content**: translated MDX is overlaid into
`content-mdx/<project>/` and the real `docs-site` is served at
production-identical URL paths. Local renders then differ from production only
by Smartling's rewriting, which is exactly the comparison we want.

`content-mdx/` is treated as scratch and is never committed.

## The transitive closure

A page's rendered text is the union of its own MDX, the bodies of every
`<Include>` reachable transitively, and the substitution values it references.
`resolve` computes that closure so we translate only what the eval pages need
— a 25-page set is ~4% of a project's content, not 100%.

## Environment

See `.env.example`. Note: the `braintrust` CLI does **not** load a plain
`.env`; put `BRAINTRUST_API_KEY` in `.env.braintrust` or export it.

## Development

```
pnpm test        # vitest
pnpm typecheck   # tsc --noEmit
```
