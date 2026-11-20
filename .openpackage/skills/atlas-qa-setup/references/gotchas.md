# Known Gotchas

Environment and tooling pitfalls for the atlas-qa-setup skill, learned from
past QA test runs. Consult when a step fails or produces surprising results.

- **`client_id`/`client_secret` are the correct provider block attributes** —
  not `service_account_id`/`service_account_secret`. The env var names
  `MONGODB_ATLAS_SERVICE_ACCOUNT_ID/SECRET` are not read automatically by the
  provider.

- **`base_url` is required** for non-production environments — in the
  Terraform provider block and in the CLI profile. Without it both tools hit
  `cloud.mongodb.com` and the SA won't be found. In the CLI profile the key
  is `ops_manager_url`, not `base_url` — setting the wrong key silently
  leaves the profile pointed at production.

- **The CLI and Terraform use different credential env vars.** Terraform reads
  `TF_VAR_client_id`/`TF_VAR_client_secret`; the CLI reads
  `MONGODB_ATLAS_CLIENT_ID`/`MONGODB_ATLAS_CLIENT_SECRET`. Map them per Step
  CLI-2 of the skill.

- **Atlas CLI < 1.47.0 ignores `MONGODB_ATLAS_CLIENT_*` env vars.** Older
  versions fail with "this action requires authentication" even when the
  variables are set, which looks like a service-account permissions problem
  but isn't. Check `atlas --version` before debugging org roles.

- **QA and Dev are separate orgs with separate service accounts.** A service
  account that works in one environment may not exist in the other. Confirm
  credentials per environment before running.

- **`dynamic: false` + text search = 0 results.** If an index uses
  `mappings_dynamic = false` but the query does a `text` search on an unmapped
  field, the query silently returns empty buckets. Verify index mappings match
  all query paths before concluding the docs are wrong.

- **Search indexes require the collection to exist.** Both tools fail if
  applied before loading sample data, and both return the same error:
  HTTP 400 `ATLAS_SEARCH_COLLECTION_NOT_FOUND` (detail e.g. "Collection
  movies was not found."). Load data, then create the indexes.

- **`mongosh` needs a database user**, not your Cloud account email. Create
  one via Atlas UI → Database Access (Terraform path) or
  `atlas dbusers create` (CLI path).

- **`atlas dbusers create` without `--password` hangs in non-interactive
  sessions.** The interactive prompt never returns when there is no TTY.
  Generate a password into a chmod-600 file, pass it with
  `--password "$(cat <file>)"`, and delete the file at teardown.

- **A fresh project has no IP access list entries.** `mongosh` fails with
  `MongoServerSelectionError` (30-second server selection timeout) until you
  add one: `atlas accessLists create --currentIp --projectId <PROJECT_ID>
  --profile <ENV>`.

- **"Active" in the UI is `STEADY` in CLI output.** When polling index
  status with `atlas clusters search indexes list`, wait for `STEADY` — and
  remember the command requires both `--db` and `--collection`.

- **Cluster provisioning takes ~7–10 min regardless of tool.** The CLI is
  faster to set up, not faster to provision.
