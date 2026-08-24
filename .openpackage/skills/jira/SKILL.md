---
name: jira
internal: true
description: "Use this skill for any Jira operation in the DOCSP project — creating, viewing, searching, updating, transitioning, commenting on, or linking tickets. Also handles follow-up ticket creation to manage scope creep. TRIGGER when: user mentions a DOCSP-XXXXX ticket number or any Jira ticket URL; user asks to view, open, check, update, transition, close, comment on, link, or search tickets; user references \"the ticket\", \"the Jira\", or \"open a ticket\". SKIP: GitHub issues; non-Jira platforms; questions unrelated to ticket operations."
---

# Jira Tool for Docs Writers

Unified Jira skill for the DOCSP project. Supports three interchangeable backends with automatic fallback between them (see Tool Selection below).

## Critical Rules

- Never modify or comment on a Jira ticket unless explicitly authorized by the user.
- Always present a plan and get confirmation before making changes.
- Field values are case-sensitive.
- Always use Jira wiki markup in descriptions and comments, never Markdown.
- When referencing a ticket key back to the user, include its title (e.g., "DOCSP-12345 — Fix broken link on X page") so it's identifiable without a lookup.
- When asked to "add" or "update" ticket content without a target specified, ask whether it goes in the description or as a comment rather than defaulting to a comment.

---

## Tool Selection & Fallback Strategy

Three tools can back this skill:

- **CLI** — the `jira` binary. Reference: [references/cli.md](references/cli.md).
- **mcp-atlassian** — a generic Jira/Confluence MCP server. Reference: [references/mcp-atlassian.md](references/mcp-atlassian.md).
- **DevProd MCP Gateway** — MongoDB's internal MCP gateway, Jira backend (tools prefixed `jira_`, distinct parameter shapes from mcp-atlassian). Reference: [references/devprod-gateway.md](references/devprod-gateway.md).

**On the first Jira operation in a session**, determine which tool to use:

1. Check auto-memory (MEMORY.md) for a stored tool preference:
   - "Jira CLI preferred" → **session-preferred = CLI** — skip the probe.
   - "mcp-atlassian preferred" → **session-preferred = mcp-atlassian** — skip the probe.
   - "DevProd Gateway preferred" → **session-preferred = DevProd Gateway** — skip the probe.
2. If no preference is stored, probe availability:
   - CLI: run `which jira && jira me` (5-second Bash timeout).
   - mcp-atlassian: check whether its tools (e.g., `jira_search`, `jira_get_issue`) are present in the session.
   - DevProd Gateway: check whether its tools (e.g., `jira_search_issues`, `jira_get_issue`) are present in the session.
3. If more than one is available, ask the user which to default to. Nudge toward the CLI when offering a recommendation — it avoids MCP tool-schema overhead and is generally more token-efficient — but let the user decide.
4. If only one is available, use it without asking.
5. Write the choice to memory (see below) so future sessions skip this probe.

**Session memory**: Once a tool is marked as session-preferred, use it for all subsequent operations without re-probing.

**Quick-fail rule**: If the session-preferred tool fails on a specific operation, immediately try one of the others that's available. Do not retry the failed tool more than once. If a fallback succeeds, switch session-preferred to it for the rest of the session (this does not overwrite the stored memory preference — ask the user before changing that permanently). If none succeed, report the error.

### Writing Tool Preference to Memory

After determining session-preferred, write a `feedback` memory entry to the project's auto-memory directory so future sessions skip the probe, plus the corresponding line to `MEMORY.md`:

| Result | Filename | name slug | Body | MEMORY.md line |
|---|---|---|---|---|
| CLI | `feedback_jira_cli_preferred.md` | `feedback-jira-cli-preferred` | "User prefers the Jira CLI. Skip probe and use CLI directly." | `- [Jira CLI preferred — skip probe](feedback_jira_cli_preferred.md) — User prefers jira CLI; skip probe, go straight to CLI` |
| mcp-atlassian | `feedback_jira_mcp_preferred.md` | `feedback-jira-mcp-preferred` | "User prefers the mcp-atlassian MCP server. Skip probe and use it directly." | `- [mcp-atlassian preferred — skip probe](feedback_jira_mcp_preferred.md) — User prefers mcp-atlassian MCP; skip probe, go straight to it` |
| DevProd Gateway | `feedback_jira_devprod_gateway_preferred.md` | `feedback-jira-devprod-gateway-preferred` | "User prefers the DevProd MCP Gateway's Jira backend. Skip probe and use it directly." | `- [DevProd Gateway preferred — skip probe](feedback_jira_devprod_gateway_preferred.md) — User prefers the DevProd MCP Gateway's Jira backend; skip probe, go straight to it` |

If an existing memory entry uses the old "Jira CLI available" / "Jira MCP preferred" naming from before the three-way split, treat it as CLI / mcp-atlassian respectively and update the filename/slug to the new naming next time you'd write to it.

---

## Ticket Lifecycle

Standard progression for a writing ticket (same across all three tools — this is Jira workflow configuration, not tool-specific):

**Needs Triage → Ready for Work → In Progress → Internal Review → External Review → Closed**

Look up valid transition names/IDs before transitioning — see your tool's reference file.

| Status | When to use |
|---|---|
| Ready for Work | Triaged and scheduled for near-term work |
| In Progress | Writer has started work |
| Internal Review | PR is open; waiting for internal (team) review |
| External Review | Waiting for SME or stakeholder review |
| Needs Merge | PR is approved and waiting to be merged — optional |
| Blocked | Work is blocked on an external dependency |
| Closed | PR merged and work complete — see Closing Issues in your tool's reference file |

Tickets typically close directly from Internal Review or External Review. Needs Merge is available but not a standard step for any team.

When moving a ticket to Internal Review or Needs Merge, post the PR URL as a comment (see Post a PR link comment in your tool's reference file).

Before closing, confirm the PR has been merged.

The Close transition requires Story Points and "Did you use AI?" — see Closing Issues in your tool's reference file.

Before attempting the Close transition, check whether Story Points is already set. If not, ask the user for an estimate (see Story Point Estimation below) rather than attempting the transition first and reacting to the failure.

### Resolution Values

| Resolution | When to use |
|---|---|
| `Done` | Work complete — PR merged |
| `Fixed` | Bug or inaccuracy resolved |
| `Won't Do` | Ticket declined or deprioritized |
| `Duplicate` | Closed as duplicate of another ticket |

### Story Point Estimation

Estimate based on writing effort, product knowledge required, and testing effort. Use the ticket description and any work done in the session to judge the scale.

| Points | Scope |
|---|---|
| 0 | No work done: closing as Won't Do, Duplicate, or other non-completion resolution |
| 1 | Minimal: link update, typo fix, copy-paste from ticket, release notes, backport subtask |
| 2 | Light: section update, small ticket with backports |
| 3 | Moderate: new page, page refactor, small feature, moderately complex procedure |
| 5 | Heavy: multiple pages, complex procedure, medium to large feature |
| 8 | Expert: multiple pages and subpages, several complex procedures, large feature |
| 13 | Maximum: major feature with site-wide impact |

**If the estimate is 8 or 13:** Flag this to the user. An 8-point ticket should be broken into subtasks; a 13-point ticket should be an epic with child tickets. Do not silently close without surfacing this.

Ask the user for their estimate if the ticket scope is unclear.

---

## Labels

Apply labels when creating or updating a ticket. Labels are case-sensitive. Apply exactly one primary label; add zero or more additional labels alongside it. See your tool's reference file for the exact syntax to set labels.

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

---

## Component Field

Components are optional but should be set when the work's ownership is clear. If the component isn't obvious from context, ask the user which team owns the work. Use `all-docs` when the work applies to or affects all teams equally and cannot be attributed to a single team's ownership.

If the component is ambiguous and the user is unsure, omit it rather than guessing. Do not use these archived components: `snooty`, `snooty autobuilder`, `snooty-autobuilder`, `snooty-frontend`, `snooty-parser`.

---

## Creating Issues

**Issue type:**
- `Task` — general docs work (default)
- `Bug` — error, inaccuracy, or broken content
- `Story` — larger feature or initiative
- `Epic` — large initiative spanning multiple tickets; must include Epic Name

**Priority:**
- `Critical - P2` — urgent, blocking, or high-visibility
- `Major - P3` — standard work
- `Minor - P4` — low-impact or nice-to-have (default)

See your tool's reference file for field mappings and a full create example.

---

## Link Types

Common link types (same across all three tools; syntax to create a link is tool-specific, see your tool's reference file):

| Type | Direction | When to use |
|---|---|---|
| `Related` | (none) | General cross-reference between two tickets |
| `Depends` | `depends on` / `is depended on by` | This ticket is blocked on or waiting for another (often an engineering ticket in CLOUDP, JAVA, etc.) |
| `documents` | outward: `documents` / inward: `is documented by` | Use when a DOCSP ticket documents an engineering ticket. The DOCSP ticket is the outward link ("documents"); the engineering ticket is the inward link ("is documented by"). |
| `Cloners` | `clones` / `is cloned by` | This ticket was cloned from a template (common for recurring release notes tickets) |

---

## Scope Creep: Follow-up Ticket Creation

When work during a session expands beyond the current ticket's original scope, create a follow-up ticket rather than expanding the current one. This keeps tickets focused and the backlog accurate.

**When to suggest this:** The user discovers additional work while implementing the current ticket — new pages to update, related gaps, or adjacent issues that weren't in the original scope.

**Workflow:**

1. Identify the out-of-scope work clearly.
2. Ask the user to confirm it should be a separate ticket, and whether it belongs under an epic (or no epic).
3. Create a new DOCSP ticket with:
   - A summary scoped to the new work only
   - A description referencing the originating ticket (e.g., "Discovered during DOCSP-XXXXX")
   - The same component and labels as the parent ticket (unless the work clearly belongs elsewhere)
4. Link the new ticket to the original with link type `"Related"`.
5. Present the new ticket key to the user.

**Example description for a follow-up ticket:**

```
h2. Overview
Follow-up work discovered during DOCSP-12345.

h2. Scope
[Description of the additional work]
```
