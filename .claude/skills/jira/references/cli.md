# Jira CLI Reference

Use this reference when session-preferred = CLI.

- CLI binary: `jira` (`jira-cli` v1.7.0+, installed via Homebrew)
- CLI config: `~/.config/.jira/.config.yml`
- Auth: Bearer token (pre-configured)
- Default project: DOCSP

---

## Gotchas

### Custom Field Names

The `--custom` flag requires **lowercase-hyphenated** display names — not the raw field key or the Jira display name.

| Display Name | `--custom` Name | Field Key |
|---|---|---|
| Story Points | `story-points` | customfield_10555 |
| Story Points Estimate | `story-points-estimate` | customfield_27258 |
| Did you use AI? | `did-you-use-ai?` | customfield_27257 |

Pattern: `"Display Name"` → `display-name` — lowercase and replace spaces with hyphens, but **do not strip punctuation**. jira-cli preserves characters like `?`, so "Did you use AI?" becomes `did-you-use-ai?` (trailing `?` included), not `did-you-use-ai`. Passing the wrong slug triggers an `Invalid custom fields used in the command` warning and the field is silently ignored (the command still exits 0).

A correct slug can fail the same silent way for a different reason: if the field isn't declared in the user's local `~/.config/.jira/.config.yml`, jira-cli drops it with the same soft warning and exit 0 — confirmed live (DOCSP-62732). After setting any custom field with `--custom`, re-read the issue and confirm the value landed before treating the write as successful:

```bash
jira issue edit DOCSP-12345 --custom "story-points-estimate=3" --no-input
jira issue view DOCSP-12345 --raw | jq '.fields.customfield_27258'   # confirm it landed
```

If the value is missing or null, the field isn't declared in the local config — tell the user to add it there, or fall back to MCP/DevProd Gateway for that field, since both discover field keys dynamically rather than depending on a local config file.

### JQL ORDER BY

Do NOT put `ORDER BY` inside the JQL string when using the CLI. Use flags:

```bash
# WRONG — will error
jira issue list -q "assignee = currentUser() ORDER BY updated DESC"

# CORRECT — default order is DESC, so --order-by updated gives newest first
jira issue list -q "assignee = currentUser()" --order-by updated
```

### Transition Names vs Status Names

`jira issue move` uses **transition names**, not status names. The CLI shows valid transitions on error:

```bash
# WRONG — "Closed" is a status name
jira issue move DOCSP-12345 "Closed"

# CORRECT — "Close" is the transition name (verify per ticket)
jira issue move DOCSP-12345 "Close"
```

When uncertain, attempt the move and read the error for valid transition names.

Transition IDs (visible via the MCP tools' `get_transitions` calls, not surfaced by this CLI command) are scoped to the ticket's *current* status, not stable per named transition — e.g., `Close` was id 111 on a ticket in Needs Triage but id 141 on a different ticket in In Progress. The CLI's `move` command takes the transition name directly so this doesn't affect CLI usage, but don't assume an ID seen on one ticket applies to another.

### Description via Stdin

For multi-line descriptions, **always pipe via stdin** — not `-b "$(cat <<'EOF'...)"`. The `-b` flag with `$()` heredocs causes the CLI to hang silently.

```bash
# WRONG — hangs silently
jira issue create -p DOCSP -t Task -s "Title" -b "$(cat <<'EOF'
description here
EOF
)" --no-input

# CORRECT
cat <<'EOF' | jira issue create -p DOCSP -t Task -s "Title" --no-input --raw
h2. Overview
description here
EOF
```

The `-b` flag works fine for short single-line descriptions.

### Non-Interactive Mode

Always pass `--no-input` for create/edit operations. Always pass `--plain` for list operations.

---

## Creating Issues

| Field | CLI Flag |
|---|---|
| Project \* | `-p DOCSP` |
| Type \* | `-t Task` |
| Summary \* | `-s "Title"` |
| Description | `-b` or stdin |
| Component | `-C Atlas` |
| Priority | `-y "Major - P3"` |
| Labels | `--label feature` |

\* Required

```bash
cat <<'EOF' | jira issue create -p DOCSP -t Task \
  -s "Update connection string examples for Atlas shared clusters" \
  -C Atlas -y "Major - P3" --label feature --no-input --raw
h2. Overview
Update the connection string examples...
EOF
```

Fix Version, Story Points Estimate, and Epic Name have no dedicated flag — set them with `--custom` (see Gotchas above).

---

## Labels

```bash
# Replaces existing labels; include all desired labels
jira issue edit DOCSP-12345 --label feature --label seo --no-input
```

---

## Common Operations

### View a ticket

```bash
jira issue view DOCSP-12345 --plain
jira issue view DOCSP-12345 --raw     # full JSON for parsing fields
```

### Search tickets

```bash
jira issue list --plain \
  -q "assignee = currentUser() AND status = 'In Progress'" \
  --order-by updated --paginate "0:10"
```

### Update a ticket

```bash
jira issue edit DOCSP-12345 -s "New summary" --no-input
jira issue edit DOCSP-12345 -y "Critical - P2" --no-input
jira issue edit DOCSP-12345 -a "jane.smith@mongodb.com" --no-input
```

### Transition a ticket

```bash
# Attempt and read error for valid transition names
jira issue move DOCSP-12345 "In Progress"
```

**Story Points Estimate required on In Progress:**

```bash
jira issue edit DOCSP-12345 --custom "story-points-estimate=3" --no-input
jira issue move DOCSP-12345 "In Progress"
```

### Add a comment

```bash
jira issue comment add DOCSP-12345 "Comment body here."

# Multi-line
jira issue comment add DOCSP-12345 $'Line one\n\nLine two'
```

To mention a user, use `[~username]` where username is their MongoDB email prefix (e.g. `[~jane.smith]`). Use this when requesting SME or stakeholder review.

### Post a PR link comment

When moving a ticket to Internal Review or Needs Merge, post the PR URL as a comment:

```bash
jira issue comment add DOCSP-12345 \
  "PR: https://github.com/10gen/docs-mongodb-internal/pull/12345"
```

### Link two tickets

```bash
jira issue link DOCSP-111 DOCSP-222 "Related"
```

### Other operations

```bash
jira me                                    # current user
jira open DOCSP-12345                      # open in browser
jira issue clone DOCSP-12345               # clone an issue
jira issue watch DOCSP-12345 $(jira me)    # watch an issue
```

Use `--plain` for list output, `--raw` for full JSON (pipe through `jq` for parsing), `--csv`, `--no-truncate`, `--no-headers`, and `--columns X,Y,Z` as needed.

---

## Closing Issues

**Story Points, "Did you use AI?", and Resolution are required at close time.**

Set the fields first, then transition:

```bash
jira issue edit DOCSP-12345 \
  --custom "story-points=3" \
  --custom "did-you-use-ai?=Yes" \
  --no-input
jira issue move DOCSP-12345 "Close" -R "Done"
```

The `resolution` field is screen-controlled — it can only be set during the Close transition, not via a separate edit. **Always pass `-R`/`--resolution` on the Close move** (see Resolution Values in SKILL.md for which value to use). Verified: running `jira issue move DOCSP-12345 "Close"` without `-R` exits 0 and moves the ticket to Closed, but leaves `resolution` unset (`Unresolved`) — and once the ticket is Closed, `"Close"` is no longer a valid transition, so there's no way to fix the resolution afterward without first reopening the ticket. Don't skip the flag and assume you can set resolution as a follow-up edit.
