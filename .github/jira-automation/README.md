# Jira automation rules called from this repo

Some workflows hand off to **Automation for Jira** rules instead of calling the
Jira REST API directly. The workflow POSTs to an incoming webhook and the rule
creates or updates the issue.

Why: the workflow then holds no Jira credential. A leaked webhook URL can only
trigger one rule that creates one shape of ticket, whereas a leaked Jira PAT can
read and write everything its owner can, in every project.

The trade-off is that half the flow lives in the Jira UI, outside version
control. To keep that manage:

- **Rules stay dumb.** Every field a rule sets comes from the webhook payload, so
  the ticket's shape is defined in the workflow, in git.
- **Rules enable "Notify on error"**, because a webhook returns `200` as soon as
  Jira accepts the payload — long before the rule runs. Without that, a rule that
  fails leaves a green GitHub check and no ticket. Automation for Jira has no
  error branch, so the rule's own error notification is the signal; a failed POST
  is caught separately by the workflow, which exits 1.
- **Payloads are logged** in the workflow run, so a failed rule can be replayed
  by hand with `curl`.
- **This file records the contract.** If you change a payload, change the rule
  and this file in the same PR.

## Flows in the other direction do not use Automation for Jira

When **Jira** needs to call **GitHub** — firing a `repository_dispatch` to start
a workflow — an Automation for Jira rule will not work. Use a ScriptRunner
Script Listener instead.

Why: A4J's "Send web request" action holds only a static `Authorization` header.
We authenticate to GitHub as a **GitHub App**, not with a PAT, and an App's only
usable token is an installation token that expires in about an hour and has to
be minted per request. A4J cannot sign the JWT needed to mint one, so any token
pasted into a rule stops working within the hour and every dispatch afterwards
fails with `401 Bad credentials`. A listener can mint a fresh token each time.

Do not spend time trying to make an A4J rule work here — the rule fires and its
conditions pass, so the audit log looks healthy right up to the 401.

Both listeners' sources are committed in this directory. **Nothing deploys from
git.** Jira is where they execute; these files are the reviewable copy. A change
means editing the file here *and* re-pasting it into ScriptRunner in the same PR.
Watch for drift — a listener edited only in Jira leaves no diff or history
anywhere.

Keep listeners thin. Gate only on cheap, stable ticket attributes (project,
component, label, a status transition) and let the workflow's script make every
real decision, in git. Log every outcome with `log.warn`/`log.error`, including
the HTTP status and body of a failed dispatch — a listener that silently
declines to fire is otherwise indistinguishable from one that never ran.

### Shared GitHub App credentials

Both listeners authenticate as the same GitHub App and read the same three keys
from Jira's plugin-settings store:

| Key | Value |
|---|---|
| `sage.github.appId` | numeric App ID |
| `sage.github.privateKey` | PKCS#8 PEM private key |
| `sage.github.installationId` | installation on the `10gen` org |

Set them once with
[`set-github-app-creds-console.groovy`](set-github-app-creds-console.groovy) via
ScriptRunner → Script Console. Effective immediately, no Jira restart, no
filesystem access to the Jira host needed. The snippet round-trips the values and
proves the key parses and signs inside Jira's JVM before any listener runs.

The App needs **Contents: write** on this repo — that is what
`repository_dispatch` requires, and an App with only `pull_requests: write` will
403 on every dispatch. GitHub issues App keys as PKCS#1; Java parses only
PKCS#8, so convert once with
`openssl pkcs8 -topk8 -nocrypt -in app.pem -out app.pkcs8.pem`. Both listeners
catch `InvalidKeySpecException` and log that remedy.

Any Jira admin with Script Console access can read these values back. That is
accepted: such an admin can already execute arbitrary code as Jira. Rotation
means re-running the console snippet with new values.

### `sage-prep` dispatch listener

| | |
|---|---|
| Source | [`sage-prep-dispatch-listener.groovy`](sage-prep-dispatch-listener.groovy) |
| Triggers | `.github/workflows/sage-prep.yml` → `.github/scripts/sage_prep.py` |
| Project | `DOCSP` |
| Events | **Issue Created** and **Issue Updated** — select both |
| Fires | When the `slack-request` label lands on a ticket |

Fires on the label being present at creation (the Slack integration stamps it
then), or on the transition into having the label on update. A per-issue entity
property `sage.prep.dispatched` prevents double-firing across the two events;
removing the label clears it, so remove-then-re-add is a deliberate re-request.

### `skill-review-complete` dispatch listener

| | |
|---|---|
| Source | [`skill-review-complete-listener.groovy`](skill-review-complete-listener.groovy) |
| Triggers | `.github/workflows/skill-review-complete.yml` → `.github/scripts/skill_review_complete.py` |
| Project | `DOCSP` |
| Events | **Issue Updated**, **Issue Closed**, **Generic Event** — select all three |
| Fires | On a transition into `Closed` for a Maverick-component `skill-review-*` ticket |

Select all three events because which one a Close transition emits depends on
that transition's Fire Event post-function; the changelog check in the script
makes the extras inert.

The listener gates only on component `Maverick`, a `skill-review-*` label,
and a real changelog transition into `Closed`. It deliberately does **not** check
resolution — `skill_review_complete.py` is the sole gate on
`resolution == "Done"`, so `Won't Do`, `Duplicate`, and no-resolution closes are
evaluated (and commented on, where useful) by the script. Gating on the changelog
rather than current status matters: without it, every later edit to an
already-Closed ticket would look like a fresh close.

A per-issue entity property `skill.review.dispatched` prevents a Closed ticket
dispatching twice. Transitioning **out** of `Closed` clears it — load-bearing,
because when a ticket is closed with no resolution the script asks the DRI to
reopen and re-close as `Done`, and the re-close only fires because the reopen
cleared the marker. If a re-close ever fails to fire, check this property first.

### Payload

Both listeners POST the same shape, and `issue_key` is the only field. Each
workflow's script re-fetches the ticket and re-validates from scratch.

```json
{
  "event_type": "sage-prep",
  "client_payload": { "issue_key": "DOCSP-12345" }
}
```

### Testing

Listeners cannot run locally — there is no way to execute Jira's Groovy bindings
outside Jira. Test by acting on real tickets and reading the ScriptRunner log
alongside the resulting Actions run. A successful dispatch logs `sent for
DOCSP-12345`.

For `skill-review-complete`, three cases each exercise a different branch and are
worth re-checking after any change:

| Close as | Expected |
|---|---|
| `Done`, `last_reviewed` still stale | PR opened bumping `last_reviewed`, Jira comment links it |
| `Done`, but already bumped by a manual PR | no PR; Jira comment says it was already updated |
| `Won't Do` / `Duplicate` | dispatch fires, script skips before touching any file, no PR |

---

## `EOL: create KB review ticket`

| | |
|---|---|
| Called by | `.github/workflows/eol-jira-ticket.yml` |
| Repo secret | `JIRA_EOL_WEBHOOK_URL` |
| Target project | `TSWRITING` |
| Trigger | Incoming webhook |
| Fires | Once per newly EOL'd product; the workflow POSTs separately for each |

### Payload

```json
{
  "project": "TSWRITING",
  "issuetype": "Task",
  "component": "KB Articles",
  "dedupe_key": "eol-manual-v5.0",
  "summary": "EOL: MongoDB Manual v5.0",
  "description": "Documentation version marked end-of-life — KB article may need updating.\n\n*Product:* MongoDB Manual\n*Version:* v5.0\n*Config file:* {code}content/manual/v5.0/snooty.toml{code}\n*Source:* https://github.com/10gen/docs-mongodb-internal/commit/abc123",
  "product": "MongoDB Manual",
  "version": "v5.0",
  "config_file": "content/manual/v5.0/snooty.toml",
  "source_url": "https://github.com/10gen/docs-mongodb-internal/commit/abc123"
}
```

`summary` and `description` arrive pre-rendered — the rule should not build them.
The individual fields (`product`, `version`, `config_file`, `source_url`) are
included as well so the rule can be reworked later without the workflow having to
change its payload.

`description` is **Jira wiki markup**, not Markdown (`*bold*`, `{code}...{code}`).

### Rule configuration

**Trigger:** Incoming webhook. Copy the generated URL into the repo secret
`JIRA_EOL_WEBHOOK_URL`. Set "Issues provided in the request" to **No issues from
the webhook** — this rule creates an issue rather than acting on existing ones.

**Then — Lookup issues** (duplicate guard, must come before the create):

```
project = TSWRITING AND labels = "{{webhookData.dedupe_key}}" AND statusCategory != Done
```

**If — Compare two values:** `{{lookupIssues.size}}` **equals** `0`

**Action — Create issue:**

| Field | Value |
|---|---|
| Project | `{{webhookData.project}}` (or hard-code `TSWRITING`) |
| Issue type | `{{webhookData.issuetype}}` (or hard-code `Task`) |
| Summary | `{{webhookData.summary}}` |
| Description | `{{webhookData.description}}` |
| Components | `{{webhookData.component}}` |
| **Labels** | **`{{webhookData.dedupe_key}}`** |

> The Labels field is what makes the guard work. Without it nothing ever carries
> the key, the lookup always returns 0, the condition always passes, and the
> duplicate guard is a silent no-op.

`dedupe_key` is stable per product+version (`eol-manual-v5.0`), derived from
snooty.toml's `name` rather than its `title` because `name` is the machine
identifier and less likely to be reworded. It guards two cases: a manual re-run
over the same commit, and a retry that lands after Jira already accepted the
first POST. Matching on a label rather than `summary ~` avoids fuzzy text
matching on reworded titles.

The guard is scoped to `statusCategory != Done`, so closing a ticket deliberately
re-arms it — an EOL that comes round again on a later version gets a fresh ticket.

**Rule details → Notify on error: enabled.** This is required, not optional — it
is the only failure signal GitHub cannot give you. Automation for Jira has no
error branch, so there is no way to route a rule failure to Slack; the rule's
built-in error notification is it.

There is deliberately **no success notification**. The failure paths are covered:
a failed POST turns the GitHub job red, and a rule that errors sends the error
notification. The one gap neither covers is a rule that is accepted but never
executes (trigger misconfigured, rule disabled, actor without permission in
TSWRITING) — that produces no error and no ticket. That is a setup-time risk
rather than an ongoing one; the `send_test_payload` run below is what rules it out.

**Check the rule's actor** (Rule details → Actor) can create issues in TSWRITING.
An actor without that permission is exactly the silent-failure case above.

### Testing

Run the workflow manually with **`send_test_payload` = true**. Detection is
skipped and one synthetic product is sent:

```
project      TSWRITING
issuetype    Task
component    KB Articles
summary      EOL: TEST — ignore, webhook test v0.0
dedupe_key   eol-test-product-v0.0
config_file  content/TEST/snooty.toml
```

That creates a real TSWRITING ticket titled `EOL: TEST — ignore, webhook test v0.0`.

**This also tests the duplicate guard, smart values included** — run it twice:

| Run | Expected |
|---|---|
| 1st | Ticket created, labelled `eol-test-product-v0.0` |
| 2nd, ticket still open | **No** second ticket. Rule audit log shows the condition failed |
| 3rd, after closing the ticket | Ticket created again (guard is scoped to `statusCategory != Done`) |

If the 2nd run creates a duplicate, the Labels field on Create issue is missing or
the JQL doesn't match — check the audit log for what `{{webhookData.dedupe_key}}`
resolved to. Close the test tickets when you're done.

To replay a failed payload by hand, copy the `POST payload:` line from the run
log:

```sh
curl -sS -X POST -H 'Content-Type: application/json' \
  -d '<payload from the run log>' \
  "$JIRA_EOL_WEBHOOK_URL"
```

### If the rule ever needs to change the ticket's shape

Prefer changing the workflow payload, not the rule. Keeping the rule a
pass-through is what stops this from becoming two sources of truth.
