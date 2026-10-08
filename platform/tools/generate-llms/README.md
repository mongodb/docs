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

## The root llms.txt (`llms-output/llms.txt`)

**Created and maintained entirely by hand** - it's the only file under
`llms-output/` that `pnpm generate` doesn't touch. It's what agents read
first from `https://www.mongodb.com/docs/llms.txt`, linking out to every
project's own `llms.txt`. Update it yourself whenever a project is added or
its part count changes.

`pnpm upload` (even as a dry run) warns if any generated file isn't linked
from it yet:

```bash
pnpm upload
WARNING: 1 file(s) are not linked from the root llms.txt (llms.txt) ...
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

The bucket is `$S3_OFFLINE_BUCKET`, which must be set; override with `--bucket`.

`--execute` needs AWS credentials: copy `.env.sample` to `.env` and fill in
`AWS_S3_ACCESS_KEY_ID` / `AWS_S3_SECRET_ACCESS_KEY` (same values used in
`platform/nextjs-extension/src/s3Connection/s3connector.ts` /
`platform/docs-nextjs/.env` - reuse those, don't create new ones). Add
`AWS_SESSION_TOKEN` too only if your credentials are temporary/federated
(e.g. AWS SSO); leave it blank for a permanent IAM access key.

Each file uploads to its production path (e.g. `manual`'s part 1 ->
`docs/manual/manual-1-llms.txt`); see `src/uploadManifest.ts`. `landing` is
excluded since it would otherwise collide with the root llms.txt's own
`docs/llms.txt` key.

## Publish one project (what deploys run)

`pnpm publish-project` generates and uploads a single project's llms.txt
file(s) in one step, and never uploads the root llms.txt:

```bash
pnpm publish-project -- --for-project atlas              # dry run
pnpm publish-project -- --for-project atlas --execute
DOCS_PROJECT=pymongo-driver/current pnpm publish-project # project from DOCS_PROJECT
```

This is what the Netlify SSG extension runs in `onSuccess` on `dotcomprd`
and `dotcomstg` deploys (see
`platform/nextjs-ssg-extension/src/llms-txt/index.ts`), so per-project
files stay current without anyone running the CLI. Each site builds one
content tree, named by `DOCS_PROJECT`, and only that project is generated
and uploaded.

Generated files go to `llms-build-output/<project>/` (gitignored) rather
than `llms-output/`, so a publish never dirties the committed copies. The
bucket is `$S3_OFFLINE_BUCKET` (the variable Netlify already sets for
offline docs), which must be set; override with `--bucket`.

The root llms.txt is deliberately excluded from this path: it is
hand-maintained in git and published only from a merged change. If the
published files aren't linked from it, you get the same warning described
above, and the fix belongs in a separate PR against
`llms-output/llms.txt`.

Run it by hand for a dry run, or to republish one project without waiting
for a deploy.

## Check whether the root llms.txt is stale

```bash
pnpm check-root-llms                       # text report
pnpm --silent check-root-llms -- --json    # machine-readable (--silent keeps pnpm's banner out of the JSON)
pnpm check-root-llms -- --fail-on-drift    # exit 1 on drift, for CI
```

Read-only, and needs no credentials. Generates every project (~7s), asks the
docs site over HTTP which of those files it actually serves, and compares that
against the links in `llms-output/llms.txt`, reporting:

- files that are published but not linked (a new project, or new parts
  after a re-split)
- links whose file is no longer published
- `(Part N of M)` labels that disagree with how many parts exist
- pages in `content/landing` that aren't linked

Only a definitive 404 marks a file as unpublished; a timeout or 5xx leaves it
treated as published, so a network blip can't cause a live link to be dropped.

Generating needs `dir-name-to-prefix.json`, which a local build writes from the
docsets database. When that file isn't present (CI, or a fresh clone), the
check falls back to the committed `dir-name-to-prefix.snapshot.json`. A content
directory missing from the snapshot can't be generated, and its live link would
then look dead, so the check names the unmapped directories and exits without
reporting drift. Refresh the snapshot with `pnpm build:prefix-map` in
`platform/docs-site` (needs `MONGODB_URI`), then copy
`src/generated/dir-name-to-prefix.json` over it.

Landing's pages live directly in the root llms.txt rather than in a
per-project file, and that section is a curated subset, so unlinked
landing pages are reported as *candidates* and don't by themselves count
as drift. Everything else does.

## Publish the root llms.txt

```bash
pnpm publish-root                # dry run
pnpm publish-root -- --execute   # upload llms-output/llms.txt to docs/llms.txt
```

Uploads only the root file, nothing else. The landing site's deploy runs
this automatically when a merge changed `llms-output/llms.txt` (see
`platform/nextjs-ssg-extension/src/llms-txt/index.ts`), so the root file
publishes as the result of a merged git change - whether that change came
from the weekly drift-check PR or from someone editing it by hand.

## Other commands

```bash
pnpm test        # run tests once
pnpm typecheck   # tsc --noEmit
pnpm lint        # eslint
```
