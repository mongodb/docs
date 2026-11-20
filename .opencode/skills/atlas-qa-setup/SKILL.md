---
name: atlas-qa-setup
description: Provision a temporary Atlas test cluster for testing documentation examples. Prompts for the provisioning tool (Terraform or Atlas CLI) with a recommendation, and for the Atlas environment (QA vs Dev), then provisions and walks through index/data setup.
metadata:
  author: mongodb
  version: '1.0'
---

# Atlas Test Environment Setup

Spin up a short-lived Atlas cluster to verify documentation examples against
a live environment. Two provisioning paths are supported — Terraform
(stateful, matches TF doc examples) and Atlas CLI (fast, imperative) — and
two Atlas environments (QA and Dev). The user picks both at the start of
every run.

## Input

$ARGUMENTS

Accepts a JIRA ticket ID (e.g. `DOCSP-60721`). If not provided, derive it
from the current git branch.

## Prerequisites (one-time, per machine)

Before using this skill, the user must have:

1. **An Atlas service account** with at minimum the **Organization Project
   Creator** role in a QA org at `https://cloud-qa.mongodb.com/`. Create one
   in the Atlas QA UI under Organization → Access Manager → Service
   Accounts. Note the org ID — the QA environment hosts many orgs, and every
   command in this skill needs yours.
2. **Credentials exported in the shell profile** (e.g. `~/.zshrc`), never in
   repo or Terraform files:
   ```bash
   export TF_VAR_client_id="<service account client ID>"
   export TF_VAR_client_secret="<service account client secret>"
   export TF_VAR_org_id="<your QA org ID>"
   ```
   The Atlas CLI path maps these to its own variable names at runtime.
3. **Terraform ≥ 1.9** (for the Terraform path) and/or **Atlas CLI
   ≥ 1.47.0** (for the CLI path). Check with `terraform version` and
   `atlas --version`. Older CLI versions silently ignore the
   `MONGODB_ATLAS_CLIENT_*` env vars and fail with a misleading "this
   action requires authentication" error.
4. **A scratch workspace directory** — this skill uses
   `~/terraform-atlas-test`. It is created on first use.

If any prerequisite is missing, stop and help the user set it up before
continuing.

## Step 0 — Prompt for tool and environment (always required)

Before doing anything else, ask the user both questions in a single prompt
(for example, one AskUserQuestion call in Claude Code).

### Question 1 — Provisioning tool

Recommend a tool based on what is being tested:

| What the test verifies | Recommend |
|---|---|
| A Terraform example or module from the docs (HCL syntax, provider
behavior, module inputs/outputs) | Terraform |
| Multiple dependent resources you may need to recreate or incrementally
adjust (project + cluster + indexes + users) | Terraform |
| mongosh query output, search index behavior, aggregation results | Atlas CLI |
| UI flows, connection behavior, quick smoke tests | Atlas CLI |
| A brand-new Atlas feature not yet in the TF provider | Atlas CLI |

Derive the recommendation from the JIRA ticket and the doc file under test
when available. If the doc ships HCL, always recommend Terraform — testing
with the CLI proves nothing about the HCL.

Present two options: the recommended tool first, labeled e.g.
`Terraform (Recommended)`, with a description stating why it fits this test
case; the other tool second, with a description of when it would be the
better pick.

### Question 2 — Atlas environment

| Environment | Base URL | Org ID | Status |
|---|---|---|---|
| QA | `https://cloud-qa.mongodb.com/` | User's own QA org (see Prerequisites) | Default choice |
| Dev | `https://cloud-dev.mongodb.com/` (confirm on first use) | User's own Dev org — confirm on first use | Needs first-run confirmation |

Default to QA unless the ticket or test case targets Dev explicitly.

If the user selects Dev:
1. Confirm the base URL with the user (default guess above) before any
   command runs.
2. Ask for the Dev org ID and which credentials to use — the QA service
   account does not necessarily exist in the Dev org. Do not guess these.
3. After a successful run, offer to update this table with the confirmed
   values so Dev becomes a one-click choice next time.

In every step below, `<BASE_URL>` is the selected environment's base URL,
`<ORG_ID>` its org ID, and `<ENV>` its lowercase name (`qa` or `dev`).

Do not proceed until the user answers both questions. Then follow only the
matching tool path:

- Terraform → Steps TF-1 through TF-6
- Atlas CLI → Steps CLI-1 through CLI-6

Step 7 (test-case-specific setup) and the teardown section apply to both.

---

# Terraform path

## Step TF-1 — Add workspace and confirm environment

1. Confirm the ticket ID: derive from `git branch --show-current` if not
   passed as an argument.
2. Ensure the agent can read and write `~/terraform-atlas-test` (in Claude
   Code, add it as a workspace directory if it is not already present).
3. Run:
   ```bash
   ls ~/terraform-atlas-test/
   cat ~/terraform-atlas-test/versions.tf
   ```
   Confirm the directory exists and that `versions.tf` already contains the
   shared provider block (see Step TF-2). If not, create it.

## Step TF-2 — Ensure shared provider config exists

Ensure `versions.tf` and `variables.tf` exist with the required provider
block and variable declarations. The exact file contents are in
[references/terraform-config.md](references/terraform-config.md) — do not
overwrite existing files that already match. If an existing `versions.tf`
hardcodes the QA `base_url`, leave it for QA runs; migrate to the variable
form only when a Dev run is requested, and show the user the diff first.

For Dev runs, override at the command line (never edit credentials into
files):

```bash
export TF_VAR_atlas_base_url="<BASE_URL>"
export TF_VAR_org_id="<ORG_ID>"
```

Credentials are never written to `.tf` files. The QA environment hosts many
orgs — do not hardcode an org ID as a default anywhere.

## Step TF-3 — Create ticket-specific Terraform file

Create `~/terraform-atlas-test/<ticket-id-lowercase>.tf` (e.g.
`docsp-60721.tf`) from the template in
[references/terraform-config.md](references/terraform-config.md). Replace the
`<TICKET>` and `<TICKET_SNAKE>` placeholders, and name all resources after
the ticket to avoid conflicts with other active test files in the same
directory (add a `-dev` suffix to resource names when targeting Dev).

Add `mongodbatlas_search_index` resources or other resources as required by
the specific test case. See Step 7 for guidance on what to include.

## Step TF-4 — Verify credentials are loaded

Check that the Atlas credentials are available in the shell:

```bash
echo "client_id length: ${#TF_VAR_client_id}"
echo "client_secret length: ${#TF_VAR_client_secret}"
```

If either length is 0, the credentials are not exported. Ask the user to set
them per the Prerequisites section, then re-check before proceeding.

The service account must have at minimum the **Organization Project Creator**
role in the target org (`<ORG_ID>`) at `<BASE_URL>`. For Dev, confirm with
the user which service account applies — do not assume the QA one exists
there.

## Step TF-5 — Run terraform plan

```bash
cd ~/terraform-atlas-test && terraform init && terraform plan
```

Review the plan output:
- Confirm only ticket-specific resources are being created (project, cluster,
  indexes).
- Flag any unexpected destroys or changes to resources from other tickets.
- If the plan fails with `error initializing provider: oauth2:
  "invalid_client"`: the credentials are wrong or the service account doesn't
  exist in the target org. Ask the user to verify in the Atlas UI for that
  environment.
- If either `TF_VAR_` length was 0 in Step TF-4, do not proceed — fix
  credentials first.

Do not proceed to apply until the plan shows only additions for this ticket's
resources.

## Step TF-6 — Run terraform apply

```bash
cd ~/terraform-atlas-test && terraform apply -auto-approve
```

Expected outcomes:
- Atlas project and cluster are created (~7–10 min for M10).
- Search indexes may fail with `ATLAS_SEARCH_COLLECTION_NOT_FOUND` if the
  collection doesn't exist yet — this is expected. Load sample data first
  (cluster → Browse Collections → Load Sample Dataset in the Atlas UI), then
  re-run `terraform apply`.
- After apply completes, run:
  ```bash
  terraform output <TICKET_SNAKE>_connection_string
  ```
  to get the `mongosh` connection string.

**Post-apply checklist:**
- [ ] Load sample dataset via Atlas UI if the test requires it
- [ ] Create a database user via Atlas UI → Database Access
  (username/password; your Cloud account email won't work for `mongosh`)
- [ ] Wait for all search indexes to reach Active status

---

# Atlas CLI path

Use this path for fast, imperative provisioning when the test does not verify
Terraform HCL. Resources are named after the ticket, same as the Terraform
path, so teardown by name is unambiguous.

## Step CLI-1 — Confirm environment and profile

1. Confirm the ticket ID: derive from `git branch --show-current` if not
   passed as an argument.
2. Verify the CLI is installed:
   ```bash
   atlas --version
   ```
3. Ensure an `<ENV>` profile pointing at the right base URL exists:
   ```bash
   atlas config describe <ENV>
   ```
   If it does not exist or `ops_manager_url` is missing:
   ```bash
   atlas config set ops_manager_url <BASE_URL> --profile <ENV>
   ```
   Note: the CLI stores the URL as `ops_manager_url`, not `base_url` — a
   profile created with the wrong key silently hits production.
   Every subsequent command in this path passes `--profile <ENV>`.

## Step CLI-2 — Verify credentials

The Atlas CLI reads service account credentials from
`MONGODB_ATLAS_CLIENT_ID` and `MONGODB_ATLAS_CLIENT_SECRET`. The Prerequisites
exports use the `TF_VAR_` names, so map them:

```bash
export MONGODB_ATLAS_CLIENT_ID="$TF_VAR_client_id"
export MONGODB_ATLAS_CLIENT_SECRET="$TF_VAR_client_secret"
```

For Dev, confirm with the user which credential variables apply — do not
assume the QA service account exists in the Dev org.

Verify auth works before creating anything:

```bash
atlas projects list --profile <ENV> -o json
```

If this returns "this action requires authentication", check
`atlas --version` first: CLI versions older than 1.47.0 ignore the
`MONGODB_ATLAS_CLIENT_*` env vars entirely, so the command runs
unauthenticated. Upgrade the CLI and retry before investigating
permissions.

If the CLI is current and auth still fails, the service account lacks
access to the target org (`<ORG_ID>`) — it needs at minimum
**Organization Project Creator**. Ask the user to verify in the Atlas UI
for that environment.

## Step CLI-3 — Create the project and cluster

Replace `<TICKET>` with the lowercase ticket ID (e.g. `docsp-60721`). If
running against Dev, name resources `<TICKET>-dev-test` /
`<TICKET>-dev-cluster` to distinguish them from QA resources.

```bash
atlas projects create <TICKET>-test \
  --orgId <ORG_ID> \
  --profile <ENV> -o json
```

Record the returned project ID as `<PROJECT_ID>`, then:

```bash
atlas clusters create <TICKET>-cluster \
  --projectId <PROJECT_ID> \
  --provider AWS --region US_EAST_1 \
  --tier M10 --members 3 \
  --profile <ENV>
```

Cluster creation takes ~7–10 min (same as Terraform — that is Atlas, not the
tool). Optionally watch for readiness:

```bash
atlas clusters watch <TICKET>-cluster --projectId <PROJECT_ID> --profile <ENV>
```

Get the connection string:

```bash
atlas clusters connectionStrings describe <TICKET>-cluster \
  --projectId <PROJECT_ID> --profile <ENV>
```

## Step CLI-4 — Access list, sample data, and database user

A fresh project has no IP access list entries, so `mongosh` cannot connect
until you add one. Add your current IP first:

```bash
atlas accessLists create --currentIp \
  --projectId <PROJECT_ID> --profile <ENV>
```

Sample data (no UI needed):

```bash
atlas clusters sampleData load <TICKET>-cluster \
  --projectId <PROJECT_ID> --profile <ENV>
```

Database user for `mongosh` (your Cloud account email won't work). Do not
omit `--password` — the interactive prompt hangs in non-interactive
sessions. Instead, generate a password into a permission-locked file and
pass it through (the file is deleted at teardown):

```bash
openssl rand -base64 18 > ~/terraform-atlas-test/.<TICKET>-dbpass
chmod 600 ~/terraform-atlas-test/.<TICKET>-dbpass

atlas dbusers create atlasAdmin \
  --username <TICKET>-user \
  --password "$(cat ~/terraform-atlas-test/.<TICKET>-dbpass)" \
  --projectId <PROJECT_ID> --profile <ENV>
```

## Step CLI-5 — Create search indexes (if the test needs them)

Write each index definition to a JSON file named after the ticket and index,
e.g. `~/terraform-atlas-test/<TICKET>-<index>.json`. Format:

```json
{
  "collectionName": "<COLLECTION>",
  "database": "<DATABASE>",
  "name": "<INDEX_NAME>",
  "mappings": { "dynamic": true }
}
```

Then create the index:

```bash
atlas clusters search indexes create \
  --clusterName <TICKET>-cluster \
  --projectId <PROJECT_ID> \
  --file ~/terraform-atlas-test/<TICKET>-<index>.json \
  --profile <ENV>
```

The CLI may print "you're using an old search index definition" — the
warning is benign and creation still succeeds.

The same chicken-and-egg rule as Terraform applies: the collection must
exist first. Load sample data (Step CLI-4) before creating indexes. Both
tools return the same error when you get the order wrong: HTTP 400
`ATLAS_SEARCH_COLLECTION_NOT_FOUND`.

Wait for indexes to reach Active status before running queries. The CLI
equivalent of the UI's "Active" is `STEADY` in the JSON output, and the
list command requires both `--db` and `--collection`:

```bash
atlas clusters search indexes list \
  --clusterName <TICKET>-cluster \
  --projectId <PROJECT_ID> \
  --db <DATABASE> --collection <COLLECTION> \
  --profile <ENV>
```

## Step CLI-6 — Record what was created

Unlike Terraform, the CLI keeps no state file. Post a summary the user can
tear down from later:

- Environment (`<ENV>`) and base URL
- Project name and ID
- Cluster name
- Database username
- Index definition file paths

---

# Shared steps

## Step 7 — Test-case-specific setup

After the cluster is ready, provide the user with:

1. **The exact mongosh queries** from the documentation source file, with
   explicit `index:` names matching the index names created above.
2. **What to look for** — expected output, field names, counts, and any known
   issues flagged during the ticket.
3. **A comparison table** between the docs' expected output and the actual
   output once the user pastes results back.

Pull the queries directly from the source `.txt` file identified in the JIRA
ticket. Do not fabricate query syntax — read the file.

---

## Teardown

### Terraform

List the ticket's resources from state — do not assume which resources the
test created:

```bash
cd ~/terraform-atlas-test && terraform state list | grep -i <TICKET>
```

Then destroy exactly those resources with one `-target=` per resource address
(include the same `TF_VAR_` environment overrides used at apply time if
targeting Dev):

```bash
cd ~/terraform-atlas-test && \
  terraform destroy \
    -target=<each address from the state list, e.g. mongodbatlas_advanced_cluster.<TICKET_SNAKE>> \
    -target=module.atlas_project_<TICKET_SNAKE> \
    -auto-approve
```

Review the destroy plan before confirming: it must remove only this ticket's
resources and leave other tickets' resources untouched.

Then delete the ticket's `.tf` file:

```bash
rm ~/terraform-atlas-test/<ticket-id>.tf
```

### Atlas CLI

Deletion is imperative and order matters — cluster first, project second.
Project deletion fails while the cluster still exists. Use the same `--profile
<ENV>` used at creation time.

```bash
atlas clusters delete <TICKET>-cluster \
  --projectId <PROJECT_ID> --profile <ENV> --force

atlas clusters watch <TICKET>-cluster \
  --projectId <PROJECT_ID> --profile <ENV>   # optional: wait for deletion

atlas projects delete <PROJECT_ID> --profile <ENV> --force
```

Then delete the ticket's JSON index files and database password file from
`~/terraform-atlas-test/`:

```bash
rm ~/terraform-atlas-test/<TICKET>-*.json ~/terraform-atlas-test/.<TICKET>-dbpass
```

There is no state file to catch stragglers. Before finishing, confirm the
project is gone:

```bash
atlas projects list --profile <ENV> -o json | grep -i <TICKET>
```

---

## Known Gotchas

Environment and tooling pitfalls live in
[references/gotchas.md](references/gotchas.md). Consult it when a step fails,
and append new pitfalls as you discover them.
