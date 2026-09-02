# CDN Log Parser

Reads CloudFront CDN access logs for `www.mongodb.com` from the
`dop-cdn-logs` S3 bucket (`us-east-1`), classifies `/docs` traffic as AI
vs. human, and writes daily analytics reports to MongoDB. Runs as a
Kubernetes CronJob on Kanopy; can also be run locally against a date range.

## What it does

For a given day (`--start-date=YYYY-MM-DD`) the parser:

1. Loads AI agent patterns from the `agent_patterns` collection in MongoDB
   (user-agent and referrer regexes). This is required — the job throws if
   no enabled patterns are found.
2. Lists `.gz` log files under `s3://dop-cdn-logs/www.mongodb.com/` whose
   S3 `LastModified` falls in the 24-hour window starting at `--start-date`.
3. Streams and gunzips each file, parses the tab-separated CloudFront
   fields, and keeps only `/docs` requests with a `200` status.
4. Produces two reports and upserts them by `date`:
   - **`daily_reports`** — page views split into total / AI / human, plus
     AI referrals and per-agent page breakdowns (`parsePageViews`).
   - **`md_daily_reports`** — the same idea restricted to `.md` requests
     (the llms.txt / markdown-for-AI traffic), with an `unknown` bucket for
     non-browser, non-AI agents (`parseMdRequests`).

Files are processed in batches with explicit garbage collection between
batches, which is why the job runs with
`--max-old-space-size=32768 --expose-gc`.

## Collections (database `cdn_analytics`)

| Collection | Written by | Notes |
| --- | --- | --- |
| `agent_patterns` | maintained by hand | Source of truth for AI UA/referrer regexes. Only docs with `enabled: true` are loaded. |
| `daily_reports` | every run | One document per day, keyed by `date`. |
| `md_daily_reports` | every run (since DOP-6935) | One document per day, keyed by `date`. |

The database name comes from `MONGODB_DATABASE` (default `cdn_analytics`)
and the page-view collection from `MONGODB_COLLECTION` (default
`daily_reports`).

## Running locally

### 1. Install dependencies
```bash
pnpm install
```

### 2. Configure credentials

Copy `env.example` to `.env` and fill in:

```
# AWS — needs read access to the dop-cdn-logs bucket
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1

# MongoDB — needs read access to agent_patterns and write access to the
# daily report collections
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/?retryWrites=true&w=majority
MONGODB_DATABASE=cdn_analytics
```

AWS credentials can also come from the default credential chain (AWS CLI
profile or IAM role) if the env vars are not set. In production the pod
uses an IRSA role instead of static keys (see Deployment).

### 3. Run

```bash
# Both reports for a specific day
pnpm start -- --start-date=2026-07-26

# Only the .md report
pnpm start:md -- --start-date=2026-07-26
```

Without `--start-date` the parser defaults to today at midnight UTC.

### Backfilling missed dates

`backfill.sh` runs the parser once per day across a date range (one fresh
Node process per day to bound memory) and is resumable — it records each
finished date in `.backfill-log` and skips dates already there:

```bash
# Inclusive range
./backfill.sh 2026-04-06 2026-07-27

# Start date through yesterday
./backfill.sh 2026-04-06
```

On macOS, wrap it in `caffeinate -i ./backfill.sh …` to prevent idle sleep
during a long run (keep the lid open — `caffeinate` does not stop clamshell
sleep). Requires a working `.env`.

## Deployment

CI/CD is defined in the repo-root [`.drone.yml`](../../../.drone.yml) in the
`production-build` and `production-deploy` pipelines. A `paths:` filter
scopes both pipelines to `platform/tools/cdnLogParser/**` and `.drone.yml`,
so only changes to this tool trigger a rebuild/redeploy.

Flow on a push to `main`:

1. **`production-build`** — `plugins/kaniko-ecr` builds the image from this
   directory's `Dockerfile` and pushes it to ECR
   `795250896452.dkr.ecr.us-east-1.amazonaws.com/docs/docs-mongodb-internal`,
   tagged `git-<sha>` and `latest`.
2. **`production-deploy`** (depends on the build) — `drone-helm` runs
   `helm upgrade` of the `mongodb/cronjobs` chart into the `docs` namespace
   on the Kanopy **prod** cluster (`api.prod.corp.mongodb.com`), pinning
   `image.tag=git-<sha>` and using [`cronjobs.yml`](./cronjobs.yml) as the
   Helm values file. A `notify-slack` step reports success/failure.

[`cronjobs.yml`](./cronjobs.yml) defines the CronJob itself:

- Name: `ai-analytics-cdn-data-cronjob`, namespace `docs`.
- Schedule: `0 8 * * *` (8:00am `America/New_York`) — processes the
  **previous** day's logs.
- S3 access: the `cdn-log-parser-service-account` IRSA role
  (`cdnLogParserServiceRole`, AWS account `216656347858`) — **not** static
  keys.
- MongoDB access: `MONGODB_URI` from the Kubernetes secret
  `cdn-log-parser` (referenced as a `globalEnvSecrets` value).

### Slack deploy notifications

The `notify-slack` step POSTs to the Drone secret
`cdn_log_parser_slack_webhook_url`. That secret is a **Slack Workflow
Builder** webhook (Workflow Builder → "From a webhook" trigger) with a
single `text` variable and a "Send a message" step targeting the alert
channel. The step sends `{"text": "..."}`, so the workflow variable must be
named `text`. To recreate it: build the workflow, publish it, copy the web
request URL, and store it as the Drone repo secret
`cdn_log_parser_slack_webhook_url`. If the secret is unset the step is a
harmless no-op (empty URL).

## Operations and debugging

Access to the `docs` namespace on the Kanopy prod cluster is required. See
the [Docs Platform Kanopy Tutorial](https://wiki.corp.mongodb.com/spaces/DE/pages/137216159/Docs+Platform+Kanopy+Tutorial)
for kubeconfig setup (`kanopy-oidc kube setup prod` + `kanopy-oidc kube
login`, on VPN). All commands below assume context
`api.prod.corp.mongodb.com` and namespace `docs`.

### Is the job running?

```bash
kubectl get cronjob ai-analytics-cdn-data-cronjob -n docs -o wide
kubectl get pods -n docs | grep ai-analytics-cdn-data
```

Check `SUSPEND` (should be `False`), `LAST SCHEDULE`, and the most recent
pod's `STATUS`. **Important:** a pod status of `Completed` means exit 0,
**not** that data was written — always confirm with the logs and with the
MongoDB report dates below.

### Read the logs of the last run

```bash
kubectl logs <pod-name> -n docs          # e.g. ai-analytics-cdn-data-cronjob-<id>-<hash>
```

A healthy run logs, in order: `✅ Connected to MongoDB`, `✅ Loaded N AI
agent patterns`, `Files from … (24-hour period): <count>`, per-batch
progress, and `Inserted`/`Updated report for <date>` for each collection.

### Trigger a manual run

```bash
kubectl create job --from=cronjob/ai-analytics-cdn-data-cronjob \
  cdn-manual-test -n docs
kubectl logs -f job/cdn-manual-test -n docs
# clean up when done
kubectl delete job cdn-manual-test -n docs
```

### Verify data is actually landing

Query the latest report dates directly. If the newest `date` is not
yesterday, the job is failing even if pods show `Completed`:

```js
db.daily_reports.find({}, { date: 1 }).sort({ date: -1 }).limit(3)
db.md_daily_reports.find({}, { date: 1 }).sort({ date: -1 }).limit(3)
```

### Inspect / update the MongoDB secret

The pod's MongoDB credential lives in the `cdn-log-parser` Kubernetes
secret. Using the Kanopy `ksec` Helm plugin:

```bash
helm plugin install https://github.com/kanopy-platform/ksec   # once
helm ksec get cdn-log-parser -n docs
helm ksec set cdn-log-parser -n docs MONGODB_URI='mongodb+srv://<user>:<pass>@<cluster>/?retryWrites=true&w=majority'
```

### Common failure modes

- **`MongoServerError: Authentication failed.` (code 18)** — the
  `MONGODB_URI` credential in the `cdn-log-parser` secret is expired or
  wrong (for example, an Atlas user password rotation). Update the secret,
  then trigger a manual run. This is what silently broke the job from
  April–July 2026, because at the time the process exited 0 on this error.
  It now exits non-zero, so the pod reports `Error`.
- **`No agent patterns found in database.`** — the `agent_patterns`
  collection has no `enabled: true` documents, or the pod is pointed at the
  wrong database.
- **`Files from … (24-hour period): 0` / `No files found`** — no `.gz`
  objects landed in the S3 window. Check that CloudFront is still
  delivering to `s3://dop-cdn-logs/www.mongodb.com/` and that the IRSA role
  still has `s3:ListBucket`/`s3:GetObject`.

## AWS permissions required

- `s3:ListBucket` on `dop-cdn-logs`
- `s3:GetObject` on `dop-cdn-logs/www.mongodb.com/*`

## File structure

- `parseLogs.ts` — the `LogParser` class and CLI entrypoint (`main`).
- `Dockerfile` — production image (Node 20 Alpine + pnpm).
- `cronjobs.yml` — Helm values that define the Kubernetes CronJob.
- `package.json` — dependencies and `start` / `start:md` / `build` scripts.
- `env.example` — template for local `.env`.
- `backfill.sh` — resumable helper to reprocess a range of past dates.
