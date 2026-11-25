# Offline bundle selection and parallel build

## Overview

Offline docs bundles are currently built inside the Netlify site build by the `nextjs-ssg-extension`. Those builds add too much time that the site build exceeds Netlify's time limits. And we want to remove the offline builds from the build pipeline before the vercel migration.  The plan is to move the bundle builds out of Netlify and into a GitHub Actions workflow, so the site build no longer includes them.

The work has two parts:

- **A selection tool** (this package) that works out which bundles are out of date. It reuses the extension's selection logic, copied here so the extension itself stays untouched for now.
- **A GitHub Actions workflow** (`.github/workflows/offline-bundle.yml`) that builds the selected bundles in parallel and uploads them to S3.

The workflow runs on a schedule. Commits do not start it.

| When | What runs |
| --- | --- |
| Every Monday | A full rebuild of every offline bundle. It also picks up changes outside `content/`, such as platform code, that a diff would miss. |
| Tuesday to Friday | A diff run that rebuilds only the bundles affected by content or table-of-contents changes in the last 26 hours. A day with no changes finishes quickly and builds nothing. |
| Weekends | Nothing runs. Monday's full rebuild covers them. |
| On demand | Anyone can start the workflow by hand and choose a full rebuild or a diff run. |

Scheduled runs write to the prod bucket under `docs/offline/`. The only way to write to the staging bucket is a manual run with the `environment` input set to `staging`. Moving the legacy bundles, writing the bundle manifest, and deleting the offline code from the extension are separate pieces of work.

The rest of this document covers how the selection and the parallel build work.

`pnpm select` decides which offline bundles to rebuild and prints them as JSON: `{ "<toc-file>.ts": ["<version>", ...] }`. An empty array means a non-versioned bundle. It only reads git and the checkout. It writes nothing and stores no state.

`.github/workflows/offline-bundle.yml` runs it on a schedule, splits the result into shards, and builds the shards in parallel.

## Modes

| Flag | Changed files come from | Use |
| --- | --- | --- |
| `--since-hours <n>` | `git log --since="<n> hours ago" --name-only --no-renames --pretty=format:` | Tuesday to Friday diff run, and manual `changed` run |
| `--base <sha> [--head <sha>]` | `git diff --name-only --no-renames <base> <head>` | Ad hoc comparison |
| `--all` | No git history is read; every bundle is selected | Monday full rebuild, and manual forced full rebuild |
| `--matrix` | | Print a GitHub matrix instead of the plain plan |
| `--shard-size <n>` | | Bundles per shard with `--matrix` (default 4) |

## Decisions

- **No stored state.** There is no last-built SHA and no S3 object metadata to read. The plan depends only on a fixed time window of git history, so the planner needs no S3 access.
- **Window.** The diff run passes a window slightly larger than its cadence (26 hours for a 24-hour cadence) so a late start does not drop changes.
- **Missed runs.** Changes older than the window are not picked up by later diff runs. The Monday full rebuild resets any drift. Recover sooner with a manual run using `all` or a larger window.
- **Trigger.** The workflow runs only on `schedule` and `workflow_dispatch`. Commits do not start it.
- **History.** The checkout needs `fetch-depth: 0`, or enough history to cover the window.

## Schedule

| When | Mode |
| --- | --- |
| Monday | Full rebuild (`--all`) |
| Tuesday to Friday | `--since-hours 26` |
| Weekends | Nothing runs; the Monday full rebuild covers their changes |
| Manual | `changed` or `all`, plus a look-back window, environment (`prod` or `staging`), shard size and parser version |

## Which bundles rebuild

- A changed content path rebuilds every bundle whose TOC uses that site, for active versions only.
- A changed offline TOC file rebuilds only its own bundle.
- A versioned TOC file with no active versions is not built.
- `SKIP_CROSS_REFERENCE_REBUILD` in `src/offline-bundles-to-rebuild.ts` is explicit config: a `cloud-docs` change does not rebuild `atlas-cli`. An `atlas-cli` page that links to `cloud-docs` can stay stale until an `atlas-cli` change or the next full rebuild.
- Changes outside `content/` and the offline TOC files, such as `platform/docs-site/**`, `platform/snooty-ast-to-mdx/**` and `platform/versioning/**`, select nothing on their own. The Monday full rebuild picks them up.

## How the parallel build works

### From plan to matrix

A bundle is one `(tocFile, version)` pair. A versioned TOC file produces one bundle per selected version, and a non-versioned one produces a single bundle with version `main`.

For each bundle the planner works out its `contentPaths`: the directories under `content/` that must be converted from RST to MDX before it can build. They are the bundle's own project (only the bundle's version, for a versioned TOC) plus every other site its TOC links to, which are non-versioned.

`--matrix` then groups the bundles into shards and prints:

```json
{
  "include": [
    {
      "shard": 0,
      "bundles": [
        { "tocFile": "go.versioned.golang", "version": "current", "contentPaths": ["golang/current", "landing"] },
        { "tocFile": "intellij-plugin", "version": "main", "contentPaths": ["intellij"] }
      ]
    }
  ]
}
```

### Sharding

- The number of shards is `ceil(bundles / shard-size)`, and bundle `i` goes to shard `i % shards`. This is round-robin.
- Bundles are listed by TOC file and then version. Round-robin spreads the versions of one heavy TOC file (for example the many `atlas-cli` or `docs` versions) across different shards instead of putting them all in one.
- With the default shard size of 4, a full rebuild of 133 bundles makes 34 shards.
- An empty plan prints `{ "include": [] }`. The build job is skipped when the plan has zero bundles.

### How the workflow uses it

1. The **plan** job runs `pnpm select ... --matrix` and exposes the JSON as a job output, along with the bundle and shard counts.
2. The **build** job declares `strategy.matrix: ${{ fromJSON(needs.plan.outputs.matrix) }}`. GitHub starts one job per entry in `include`, and `matrix.bundles` is that shard's bundle list.
3. Each shard job passes its list to its shell steps as JSON (`BUNDLES_JSON`) and reads it with `jq`.
4. Inside a shard job:
   - The job converts the union of the shard's `contentPaths` once, so a site shared by several bundles in the shard (for example `landing`) is converted a single time.
   - It builds the prefix map once.
   - It then builds, tars and uploads the bundles one at a time. `out/` is cleared before each build.
5. The **summary** job runs last and reports the plan and the build result.

### Limits and failure behavior

- **Concurrency.** `max-parallel: 10` caps how many shard jobs run at once. 34 shards therefore run in about four waves. The concurrent-job cap for the org is unverified, and a wide matrix can starve other workflows.
- **Matrix size.** GitHub allows at most 256 jobs per matrix. A full rebuild at the default shard size uses 34. A smaller shard size means more jobs and more repeated setup.
- **Fixed cost per shard.** Every shard job installs dependencies and converts its content paths. The PoC measured about 1.7 minutes of fixed setup per job, so larger shards amortize that cost and smaller shards finish sooner. Shard size is a dispatch input for tuning once real timings exist.
- **Disk.** A standard runner has about 14 GB free, and the `development` bundles (about 1,758 pages each) filled it in testing, which killed the runner. Each build job first deletes preinstalled tools the workflow doesn't use (dotnet, Android SDK, GHC, CodeQL, boost), and logs `df -h` after setup and after each bundle so the real footprint is visible. If that is not enough, the next step is a larger GitHub-hosted runner with more disk.
- **Cache.** Each shard job restores `.next/cache` and the pnpm store. The snooty parser is not cached: `convertRstToMdx.sh` downloads it fresh on every call, so the job calls it once with all of its content paths.
- **`fail-fast: false`.** One failed shard does not cancel the others.
- **Upload as you go.** Each bundle is uploaded as soon as it is built, so a failed or timed-out shard leaves its finished bundles in place. A failed bundle is never tarred or uploaded, and does not stop the rest of its shard. The shard job fails at the end if any bundle failed.
- **Recovery.** With no stored state, unfinished bundles stay stale until a later diff window or the Monday full rebuild picks them up. Failed shards can also be re-run from the Actions UI.
- **Timeout.** Each shard job has `timeout-minutes: 180`. GitHub's limit is 6 hours per job.
- **Runtime estimate.** A full rebuild is at least about 9 runner-hours of builds in total, based on about 4 minutes per bundle. This is unmeasured. The first full run gives the real number.

## Default values

Manual runs offer these inputs. Scheduled runs have no inputs, so they use the same defaults, except that the mode comes from the cron entry.

| Setting | Default | Notes |
| --- | --- | --- |
| `mode` | `changed` | Scheduled runs pick `all` on Monday and `changed` Tuesday to Friday |
| `since_hours` | `26` | Look-back window for `changed` |
| `environment` | `prod` | The only other option is `staging`. Scheduled runs always use the default |
| `shard_size` | `4` | Bundles per shard |
| `snooty_version` | `v0.20.20` | snooty-parser release tag |

The environment sets the bucket. The S3 prefix is not an input.

| Environment | Bucket | Prefix |
| --- | --- | --- |
| `prod` | `docs-mongodb-org-dotcomprd` | `docs/offline/` |
| `staging` | `docs-mongodb-org-dotcomstg` | `docs/offline/` |

Fixed settings in the workflow file:

| Setting | Value |
| --- | --- |
| Schedule | `0 6 * * 1` (Monday) and `0 6 * * 2-5` (Tuesday to Friday), in UTC |
| Runner | `ubuntu-24.04` |
| `max-parallel` | `10` shard jobs at once |
| `fail-fast` | `false` |
| Plan job timeout | 20 minutes |
| Build job timeout | 180 minutes per shard |
| Concurrency group | `offline-bundles`, one run at a time, new runs wait instead of cancelling |
| S3 region | `us-east-2` |
| Node and pnpm | Node from `platform/.nvmrc`, pnpm `10.27.0` |

## Credentials and buckets

The workflow uses the repository's static AWS secrets: `AWS_ACCESS_KEY_OFFLINE_DOCS_BUNDLES` and `AWS_SECRET_OFFLINE_DOCS_BUNDLES` for S3, and `NPM_AWS_KEY` and `NPM_AWS_SECRET` for CodeArtifact. The plan job installs only this package and its workspace dependencies, so it needs no CodeArtifact login.

Scheduled runs write to the prod bucket. A manual run with `environment` set to `staging` writes to the staging bucket instead. Both buckets use the same secrets and the same `docs/offline/` prefix.

## Not covered

Legacy bundles, the bundle manifest, a per-bundle filter, and OIDC for AWS.
