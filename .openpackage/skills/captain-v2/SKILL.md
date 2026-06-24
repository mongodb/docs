---
name: captain-v2
description: >
  Batch workflow for completing small DOCSP Jira tickets via sage-bot-beta. Selects tickets, hands them off to sage-bot-beta for implementation, polls for the resulting draft PRs, and adds staging links. Use this skill whenever the user wants to work through multiple small DOCSP Jira tickets or pick up batch work. Trigger phrases: "start tickets", "captain tickets", "do some tickets", "work on backlog", "bug tickets", "bug bash".
---

# Jira Ticket Workflow (sage-bot-beta orchestration)

This skill batches DOCSP tickets through sage-bot-beta. Captain-v2 selects tickets and adds staging links; sage-bot-beta does the research, edits, and draft PR.

**What is sage-bot-beta?** It's an internal MongoDB tool that takes a Jira ticket, spins up an AI agent in Argo (MongoDB's workflow infrastructure), and automatically opens a draft GitHub PR with the documentation changes. You trigger it by adding two labels to a Jira ticket; it typically produces a PR within 10–20 minutes.

## Prerequisites

- **`/jira` skill** — all Jira operations are delegated to it. Do not call jira-cli or mcp-atlassian directly; invoke `/jira` and describe the operation needed.
- **gh CLI** authenticated against `10gen/docs-mongodb-internal`. If not authenticated, or if `gh` CLI cannot perform a required operation, fall back to the GitHub MCP server.

---

## Phase 1: Ticket Selection

1. Ask the user how many tickets (1–10) they want to start. More is fine — each runs in its own sage-bot-beta job, so they progress in parallel.

2. Use `/jira` to search for candidate tickets:

   ```
   project=DOCSP AND status in (Backlog,"Ready for Work") AND (assignee is EMPTY OR assignee = currentUser()) AND ("Story Points Estimate" is EMPTY OR "Story Points Estimate" <= 2)
   ```

   Return the top N results ordered by most recently updated.

3. Present the top N tickets as a numbered list with key, summary, and story points.

4. Ask the user to approve the list or swap out specific tickets.

5. Remind the user to refine any ticket's description that needs more direct, specific guidance on what changes to make. The more explicit the description (exact wording, target file, intended outcome), the more efficiently sage-bot-beta can complete the work without ambiguity.

Do NOT proceed to Phase 2 until the user confirms.

---

## Phase 2: Hand off to sage-bot-beta

For each approved ticket:

1. **Assign and transition.** Use `/jira` to perform these operations on the ticket:

   - Assignee: current user — the `/jira` skill resolves this automatically; no extra lookup needed
   - Story Points Estimate: existing value, or `1` if unset
   - Transition: `In Progress` — pass this exact string. Do NOT use `"Start Progress"` or any other variant.

2. **Add labels.** Use `/jira` to add labels in two steps. Order matters — sage-bot-beta validates `repo:...` at trigger time:

   - Step 1 — add label: `repo:10gen/docs-mongodb-internal`
   - Pause 2 seconds
   - Step 2 — add label: `sage-bot-beta` (keep `repo:10gen/docs-mongodb-internal` present)

3. Tell the user which tickets were dispatched. Don't spawn anything; the bot runs in Argo.

---

## Phase 3: Wait for PRs

sage-bot-beta typically creates PRs within 10–20 minutes of being triggered. Wait 7 minutes, check once, and immediately start adding staging links to whatever PRs are ready.

### Step 3a: Tell the user they have a break

After dispatching, tell the user they have 7 minutes while sage-bot-beta runs in Argo, and suggest using the time to read through the dispatched tickets and form expectations for the fix before the PRs land.

### Step 3b: Wait and check

Run `.claude/skills/captain-v2/assets/check-prs.sh` passing each dispatched ticket key as arguments:

```bash
.claude/skills/captain-v2/assets/check-prs.sh DOCSP-AAAAA DOCSP-BBBBB ...
```

The script emits one line per ticket:

```
PR_FOUND DOCSP-AAAAA: {"number":20170,"url":"https://github.com/10gen/docs-mongodb-internal/pull/20170","createdAt":"..."}
PR_MISSING DOCSP-BBBBB
```

### Step 3c: Handle results

| Result | Action |
|--------|--------|
| `PR_FOUND` for all tickets | Collect PR URLs and proceed to Phase 4. |
| `PR_FOUND` for some, `PR_MISSING` for others | Start Phase 4 immediately for ready PRs. After Phase 4, do one final check for missing tickets. If still missing at 65 min from dispatch, treat as timeout. |
| Timeout for a ticket | Use `/jira` to show the most recent comment on that ticket — sage-bot-beta posts an error comment on failure. Surface it verbatim and move on; do not retry the label. |

Do NOT inspect PR diffs — the user reviews the draft PRs themselves.

---

## Phase 4: Staging links

For each found PR:

1. **Get the links** — invoke `/staging-preview` for PR #<PR_NUMBER> on `10gen/docs-mongodb-internal`. The skill returns a markdown list of staging URLs.

2. **Write links to the PR body** — use python3 + `gh api` to replace the `## STAGING` or `[STAGING]` section in the PR body. Do NOT use `gh pr edit` (triggers a GraphQL deprecation error).

   The `/staging-preview` skill returns a markdown list — one `- [Label](url)` item per changed page. Assign that output verbatim to the `links` variable in the script below. For example, if `/staging-preview` returned:

   ```
   - [compact (database command)](https://deploy-preview-20169--mongodb-manual.netlify.app/docs/manual/reference/command/compact/)
   ```

   then set `links` to that exact string in the script below.

   ```bash
   python3 .claude/skills/captain-v2/assets/update-staging-links.py <PR_NUMBER> '<output from /staging-preview goes here>'
   ```

   If the `## STAGING` or `[STAGING]` section is absent from the PR body, append the links at the end instead of using the regex substitution.

If the procedure fails for a given PR, note it in the final summary and continue — don't block the rest of the batch.

---

## Phase 5: Summary

For each ticket, show:
- Ticket key + summary
- PR link (or the failure comment from Jira if the bot errored out)
- Whether staging links were added

Before signing off, remind the user:

> ⚠️ **Before you review:** These PRs were written by sage-bot-beta, an AI agent — they will look polished and professional. That's exactly what makes them risky — a wrong fact, a missed scope requirement, or a subtly incorrect procedure can be hard to spot when the formatting and prose are clean. Compare each PR against the original ticket and your own expectations, not just against itself. You are responsible for everything that merges under your name.

This is the end of the workflow.

---

## Notes

- Branch naming is sage-bot-beta's responsibility — captain-v2 does not specify a branch ref in the `repo:...` label.
- Captain-v2 does not run `git` commands locally in this flow. There is no worktree, no fetch, no branch creation — sage-bot-beta handles all of it in Argo.
