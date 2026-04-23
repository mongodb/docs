---
name: jira
description: Use this skill for any Jira operation in the DOCSP project — creating, viewing, searching, updating, transitioning, commenting on, or linking tickets. Also handles follow-up ticket creation to manage scope creep.
---

# Jira Tool for Docs Writers

Unified Jira skill for the DOCSP project. Supports both the `jira` CLI and
`mcp-atlassian` MCP tools with automatic fallback.

## Critical Rules

- Never modify or comment on a Jira ticket unless explicitly authorized by the
  user.
- Always present a plan and get confirmation before making changes.
- Field values are case-sensitive.
- Always use Jira wiki markup in descriptions and comments, never Markdown.

---

## Tool Selection & Fallback Strategy

**On the first Jira operation in a session**, determine which tool to use:

1. Run `which jira && jira me` (use a 5-second Bash timeout).
2. If both succeed → **session-preferred = CLI**.
3. If either fails (command not found, auth error, timeout) →
   **session-preferred = MCP**.

**Session memory**: Once a tool is marked as session-preferred, use it for all
subsequent operations without re-testing.

**Quick-fail rule**: If the session-preferred tool fails on a specific
operation, immediately try the other. Do not retry the failed tool more than
once. If the fallback succeeds, switch session-preferred to the fallback. If
both fail, report the error.

**MCP tool names** are environment-specific (e.g., `jira_create_issue`,
`jira_search`). Use whatever Jira MCP tools are available in the current
session.

---

## Configuration

- CLI binary: `jira` (`jira-cli` v1.7.0+, installed via Homebrew)
- CLI config: `~/.config/.jira/.config.yml`
- Auth: Bearer token (pre-configured)
- Default project: DOCSP

---

## CLI Gotchas

### Custom Field Names

The `--custom` flag requires **lowercase-hyphenated** display names — not the
raw field key or the Jira display name.

| Display Name | `--custom` Name | Field Key |
|---|---|---|
| Story Points | `story-points` | customfield_10555 |
| Did you use AI? | `did-you-use-ai` | customfield_27257 |

Pattern: `"Display Name"` → `display-name` (strip punctuation, lowercase,
hyphenate).

### JQL ORDER BY

Do NOT put `ORDER BY` inside the JQL string when using the CLI. Use flags:

```bash
# WRONG — will error
jira issue list -q "assignee = currentUser() ORDER BY updated DESC"

# CORRECT — default order is DESC, so --order-by updated gives newest first
jira issue list -q "assignee = currentUser()" --order-by updated
```

### Transition Names vs Status Names

`jira issue move` uses **transition names**, not status names. The CLI shows
valid transitions on error:

```bash
# WRONG — "Closed" is a status name
jira issue move DOCSP-12345 "Closed"

# CORRECT — "Close Issue" is the transition name (verify per ticket)
jira issue move DOCSP-12345 "Close Issue"
```

When uncertain, attempt the move and read the error for valid transition names.

### Description via Stdin

For multi-line descriptions, **always pipe via stdin** — not
`-b "$(cat <<'EOF'...)"`. The `-b` flag with `$()` heredocs causes the CLI to
hang silently.

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

Always pass `--no-input` for create/edit operations. Always pass `--plain` for
list operations.

---

## Ticket Lifecycle

Standard progression for a writing ticket:

**Needs Triage → Ready for Work → In Progress → Internal Review →
External Review → Closed**

Use `jira_get_transitions` (MCP) or attempt `jira issue move` and read the
error (CLI) to get valid transition names/IDs before transitioning.

| Status | When to use |
|---|---|
| Ready for Work | Triaged and scheduled for near-term work |
| In Progress | Writer has started work |
| Internal Review | PR is open; waiting for internal (team) review |
| External Review | Waiting for SME or stakeholder review |
| Needs Merge | PR is approved and waiting to be merged — optional |
| Blocked | Work is blocked on an external dependency |
| Closed | PR merged and work complete — see Closing Issues below |

Tickets typically close directly from Internal Review or External Review. Needs
Merge is available but not a standard step for any team.

The Close transition requires Story Points and "Did you use AI?" — see Closing
Issues.

---

## Labels

Apply labels when creating or updating a ticket. Labels are case-sensitive.

Apply exactly one primary label; add zero or more additional labels alongside
it.

| Label | Type | When to use |
|---|---|---|
| `feature` | primary | New feature documentation driven by a product change |
| `request` | primary | Stakeholder or community-submitted content request |
| `proactive` | primary | Writer-initiated improvement |
| `bug` | primary | Documentation error or inaccuracy |
| `docs-rn` | primary | Release notes ticket |
| `404` | additional | Broken link or missing page |
| `seo` | additional | Redirect or metadata work motivated by SEO |
| `IA` | additional | Information architecture initiative (navigation, TOC, reorganization) |
| `LLM` | additional | Mercury / AI chatbot content review |
| `archiving` | additional | EOL or archival work |
| `nested-components` | additional | Nested tab component fix |
| `taxonomy` | additional | Taxonomy or metadata classification work |

```bash
# CLI — replaces existing labels; include all desired labels
jira issue edit DOCSP-12345 --label feature --label seo --no-input
```

```python
# MCP — replaces existing labels; include all desired labels
jira_update_issue(
    issue_key="DOCSP-12345",
    fields={"labels": ["feature", "seo"]}
)
```

---

## Component Field

Components are optional but should be set when the work's ownership is clear.
Infer from the product, team, or content area the ticket is about. Use
`all-docs` when the work applies to or affects all teams equally and cannot be
attributed to a single team's ownership.

For the authoritative component-to-team mapping, see the triage skill
(`skills/triage/SKILL.md`, Component-to-Team Map).

If the component is ambiguous, omit it rather than guessing. Do not use these
archived components: `snooty`, `snooty autobuilder`, `snooty-autobuilder`,
`snooty-frontend`, `snooty-parser`.

---

## Creating Issues

| Field | CLI Flag | MCP Parameter | Notes |
|---|---|---|---|
| Project \* | `-p DOCSP` | `project_key="DOCSP"` | |
| Type \* | `-t Task` | `issue_type` — see below | |
| Summary \* | `-s "Title"` | `summary` | |
| Description | `-b` or stdin | `description` | Jira wiki markup |
| Component | `-C Atlas` | `components` | Infer from context; omit if unclear |
| Priority | `-y "Major - P3"` | `additional_fields: {"priority": {"name": "..."}}` | |
| Fix Version | — | `additional_fields: {"fixVersions": [{"name": "..."}]}` | Versioned driver or server work |
| Story Points Estimate | — | `additional_fields: {"customfield_27258": <number>}` | Upfront effort estimate; use the story point scale |
| Epic Name | — | `additional_fields: {"customfield_10858": "Name"}` | Required when issue type is Epic |
| Labels | `--label feature` | `additional_fields: {"labels": ["..."]}` | See Labels section |

\* Required

**Issue type:**
- `Task` — general docs work (default)
- `Bug` — error, inaccuracy, or broken content
- `Story` — larger feature or initiative
- `Epic` — large initiative spanning multiple tickets; must include Epic Name
  (`customfield_10858`)

**Priority:**
- `Critical - P2` — urgent, blocking, or high-visibility
- `Major - P3` — standard work
- `Minor - P4` — low-impact or nice-to-have (default)

**CLI example:**

```bash
cat <<'EOF' | jira issue create -p DOCSP -t Task \
  -s "Update connection string examples for Atlas shared clusters" \
  -C Atlas -y "Major - P3" --label feature --no-input --raw
h2. Overview
Update the connection string examples...
EOF
```

**MCP example:**

```python
jira_create_issue(
    project_key="DOCSP",
    summary="Update connection string examples for Atlas shared clusters",
    issue_type="Task",
    description="h2. Overview\nUpdate the connection string examples...",
    components="Atlas",
    additional_fields={
        "priority": {"name": "Major - P3"},
        "labels": ["feature"]
    }
)
```

---

## Closing Issues

Before closing, confirm the PR has been merged. Tickets typically close from
Internal Review or External Review — Needs Merge is not a required step.

**Story Points, "Did you use AI?", and Resolution are required at close time.**

The `resolution` field is screen-controlled — it can only be set during the
Close transition, not via a separate edit. Omitting it leaves the ticket in an
unresolved state even after it reaches Closed status, so it will continue to
appear in `resolution = Unresolved` filters.

**CLI approach** — set the fields first, then transition:

```bash
jira issue edit DOCSP-12345 \
  --custom "story-points=3" \
  --custom "did-you-use-ai=Yes" \
  --no-input
jira issue move DOCSP-12345 "Close Issue"
```

**MCP approach** — get the Close transition ID, then transition with required
fields:

```python
jira_get_transitions(issue_key="DOCSP-12345")

jira_transition_issue(
    issue_key="DOCSP-12345",
    transition_id="<close-id>",
    fields={
        "customfield_10555": 3,
        "customfield_27257": {"value": "Yes"},
        "resolution": {"name": "Done"}
    }
)
```

If the MCP transition fails with "This field is required", use
`jira_search_fields` to identify the missing field.

### Resolution Values

| Resolution | When to use |
|---|---|
| `Done` | Work complete — PR merged |
| `Fixed` | Bug or inaccuracy resolved |
| `Won't Do` | Ticket declined or deprioritized |
| `Duplicate` | Closed as duplicate of another ticket |

### Story Point Estimation

Estimate based on writing effort, product knowledge required, and testing
effort. Use the ticket description and any work done in the session to judge
the scale.

| Points | Scope |
|---|---|
| 0 | No work done: closing as Won't Do, Duplicate, or other non-completion resolution |
| 1 | Minimal: link update, typo fix, copy-paste from ticket, release notes, backport subtask |
| 2 | Light: section update, small ticket with backports |
| 3 | Moderate: new page, page refactor, small feature, moderately complex procedure |
| 5 | Heavy: multiple pages, complex procedure, medium to large feature |
| 8 | Expert: multiple pages and subpages, several complex procedures, large feature |
| 13 | Maximum: major feature with site-wide impact |

**If the estimate is 8 or 13:** Flag this to the user. An 8-point ticket should
be broken into subtasks; a 13-point ticket should be an epic with child tickets.
Do not silently close without surfacing this.

Ask the user for their estimate if the ticket scope is unclear.

---

## Common Operations

### View a ticket

```bash
# CLI
jira issue view DOCSP-12345 --plain
jira issue view DOCSP-12345 --raw     # full JSON for parsing fields
```

```python
# MCP
jira_get_issue(issue_key="DOCSP-12345")
```

### Check PR / branch status

Use Jira development info to find the PR number linked to a ticket when you
don't already have it:

```bash
# CLI
jira issue view DOCSP-12345 --raw
```

```python
# MCP
jira_get_issue_development_info(issue_key="DOCSP-12345")
```

Once you have the PR number, use the `gh` CLI or GitHub MCP for detailed
status — reviewers, check runs, merge details:

```bash
gh pr view 12345
gh pr checks 12345
```

### Search tickets

```bash
# CLI
jira issue list --plain \
  -q "assignee = currentUser() AND status = 'In Progress'" \
  --order-by updated --paginate "0:10"
```

```python
# MCP
jira_search(jql="assignee = currentUser() AND status = 'In Progress'
ORDER BY updated DESC")
```

### Update a ticket

```bash
# CLI
jira issue edit DOCSP-12345 -s "New summary" --no-input
jira issue edit DOCSP-12345 -y "Critical - P2" --no-input
jira issue edit DOCSP-12345 -a "jane.smith@mongodb.com" --no-input
```

```python
# MCP
jira_update_issue(
    issue_key="DOCSP-12345",
    fields={"summary": "New summary", "priority": {"name": "Critical - P2"}}
)
```

### Transition a ticket

```bash
# CLI — attempt and read error for valid transition names
jira issue move DOCSP-12345 "Start Progress"
```

```python
# MCP
jira_get_transitions(issue_key="DOCSP-12345")   # get transition IDs first
jira_transition_issue(issue_key="DOCSP-12345", transition_id="<id>")
```

**Story Points Estimate required on In Progress:** The In Progress transition
screen requires `customfield_27258` (Story Points Estimate). Set it before or
during the transition:

```bash
# CLI — set before transitioning
jira issue edit DOCSP-12345 --custom "story-points-estimate=3" --no-input
jira issue move DOCSP-12345 "Start Progress"
```

```python
# MCP — pass with transition
jira_transition_issue(
    issue_key="DOCSP-12345",
    transition_id="<in-progress-id>",
    fields={"customfield_27258": 3}
)
```

### Add a comment

```bash
# CLI
jira issue comment add DOCSP-12345 "Comment body here."

# Multi-line
jira issue comment add DOCSP-12345 $'Line one\n\nLine two'
```

```python
# MCP
jira_add_comment(issue_key="DOCSP-12345", comment="Comment body here.")
```

To mention a user, use `[~username]` where username is their MongoDB email
prefix (e.g. `[~jane.smith]`). Use this when requesting SME or stakeholder
review.

### Post a PR link comment

When moving a ticket to Internal Review or Needs Merge, post the PR URL as a
comment:

```bash
# CLI
jira issue comment add DOCSP-12345 \
  "PR: https://github.com/10gen/docs-mongodb-internal/pull/12345"
```

```python
# MCP
jira_add_comment(
    issue_key="DOCSP-12345",
    comment="PR: https://github.com/10gen/docs-mongodb-internal/pull/12345"
)
```

### Link two tickets

```bash
# CLI
jira issue link DOCSP-111 DOCSP-222 "Related"
```

```python
# MCP
jira_create_issue_link(
    issue_key="DOCSP-111",
    linked_issue_key="DOCSP-222",
    link_type="Related"
)
```

**Link types in common use:**

| Type | Direction | When to use |
|---|---|---|
| `Related` | — | General cross-reference between two tickets |
| `Depends` | `depends on` / `is depended on by` | This ticket is blocked on or waiting for another (often an engineering ticket in CLOUDP, JAVA, etc.) |
| `documents` | outward: `documents` / inward: `is documented by` | Use when a DOCSP ticket documents an engineering ticket. The DOCSP ticket is the outward link ("documents"); the engineering ticket is the inward link ("is documented by"). |
| `Cloners` | `clones` / `is cloned by` | This ticket was cloned from a template (common for recurring release notes tickets) |

### Other CLI operations

```bash
jira me                                    # current user
jira open DOCSP-12345                      # open in browser
jira issue clone DOCSP-12345               # clone an issue
jira issue watch DOCSP-12345 $(jira me)    # watch an issue
```

---

Use `--plain` for list output, `--raw` for full JSON (pipe through `jq` for
parsing), `--csv`, `--no-truncate`, `--no-headers`, and `--columns X,Y,Z` as
needed.

---

## Scope Creep: Follow-up Ticket Creation

When work during a session expands beyond the current ticket's original scope,
create a follow-up ticket rather than expanding the current one. This keeps
tickets focused and the backlog accurate.

**When to suggest this:** The user discovers additional work while implementing
the current ticket — new pages to update, related gaps, or adjacent issues that
weren't in the original scope.

**Workflow:**

1. Identify the out-of-scope work clearly.
2. Ask the user to confirm it should be a separate ticket.
3. Create a new DOCSP ticket with:
   - A summary scoped to the new work only
   - A description referencing the originating ticket (e.g., "Discovered during
     DOCSP-XXXXX")
   - The same component and labels as the parent ticket (unless the work clearly
     belongs elsewhere)
4. Link the new ticket to the original with link type `"Related"`.
5. Present the new ticket key to the user.

**Example description for a follow-up ticket:**

```
h2. Overview
Follow-up work discovered during DOCSP-12345.

h2. Scope
[Description of the additional work]
```

---

Use Jira wiki markup in all descriptions and comments (e.g. `h2.`, `*bold*`,
`{{code}}`, `[label|url]`, `[~username]`) — not Markdown.
