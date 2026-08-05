# generate-llms

Generates one `llms.txt` per documentation project under `content/`
(splitting oversized ones into `<project>-<n>-llms.txt` parts) and uploads
them to S3. TypeScript port of `audit-cli`'s `generate llms` command
(grove-platform/audit-cli#7), reworked to generate per-project.

## Generate

```bash
pnpm generate                                    # every project
pnpm generate -- --for-project manual            # one project
pnpm generate -- --no-descriptions               # omit descriptions
```

| Flag | Default | Purpose |
| --- | --- | --- |
| `--output-dir <dir>` | `llms-output` | Where to write generated files |
| `--for-project <name>` | all | Limit to one content directory |
| `--no-descriptions` | off | Omit summary blockquote + per-page descriptions |
| `--parts <n>` | auto | Force initial part count (use with `--for-project`) |
| `--oversized-section-parts <n>` | auto | Force first recursive split's sub-part count |

Run `pnpm generate -- --help` for the full list.

A project splits into `<project>-1-llms.txt`, `<project>-2-llms.txt`, etc.
once it would exceed the 50,000-character AFDocs limit. Splits snap to
`source/` directory boundaries and recurse deeper if a section is still
oversized on its own. `manual` needs a hand-tuned override to avoid
fragmenting badly - see `src/projectOverrides.ts`.

Each file's `> ...` summary blockquote comes from `llms-descriptions.json`
(package root), not any page's meta description. Schema:
`{ [contentDirectoryName]: string | string[] }` - a string applies to every
part; an array gives one description per part (a single-entry array is
reused for all parts). Missing entries fall back to
`"INSERT DESCRIPTION HERE"`.

## The master index (`llms-output/llms.txt`)

**Created and maintained entirely by hand** - it's the only file under
`llms-output/` that `pnpm generate` doesn't touch. It's what agents read
first from `https://www.mongodb.com/docs/llms.txt`, linking out to every
project's own `llms.txt`. Update it yourself whenever a project is added or
its part count changes.

`pnpm upload` (even as a dry run) warns if any generated file isn't linked
from it yet:

```bash
pnpm upload
WARNING: 1 file(s) are not linked from the master index (llms.txt) ...
  - https://www.mongodb.com/docs/manual/manual-9-llms.txt
```

This only warns, it doesn't block anything - but a file with no link there
is undiscoverable to an agent, so treat it as a required fix.

## Upload to S3

```bash
pnpm upload                        # dry run
pnpm upload -- --execute           # actually upload
pnpm upload -- --bucket docs-mongodb-org-prd --execute
```

`--execute` needs AWS credentials: copy `.env.sample` to `.env` and fill in
`AWS_S3_ACCESS_KEY_ID` / `AWS_S3_SECRET_ACCESS_KEY` (same values used in
`platform/nextjs-extension/src/s3Connection/s3connector.ts` /
`platform/docs-nextjs/.env` - reuse those, don't create new ones). Add
`AWS_SESSION_TOKEN` too only if your credentials are temporary/federated
(e.g. AWS SSO); leave it blank for a permanent IAM access key.

Each file uploads to its production path (e.g. `manual`'s part 1 ->
`docs/manual/manual-1-llms.txt`); see `src/uploadManifest.ts`. `landing` is
excluded since it would otherwise collide with the master index's own
`docs/llms.txt` key.

## Other commands

```bash
pnpm test        # run tests once
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint
```
