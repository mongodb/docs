# Drivers/DBX Team Module

## JQL Query

```
project = DOCSP AND component = Drivers AND component not in (Repo-Steward-Task) AND "Story Points Estimate" is EMPTY AND "Cal RICET Score" is EMPTY AND issuetype != "Applied Content Request" AND issuetype not in (Epic, Sub-task) AND "Epic Link" is EMPTY AND status = "Needs Triage" AND assignee is EMPTY
```

## Knowledge Sources

Fetch these sources using the Atlassian MCP if available (preferred for
Confluence URLs); otherwise fall back to the Glean MCP:

1. **Triage Process Wiki:** `https://wiki.corp.mongodb.com/spaces/DE/pages/306451990/Filter+Duty+DBX+Docs` — DBX filter duty procedures and routing rules.
2. **Labels and Components Doc:** `https://wiki.corp.mongodb.com/spaces/DE/pages/314411909/Status+Labels+Components+DBX+Docs` — correct labels and components for Drivers/DBX tickets.

## Quality Markers

For each ticket, verify these six markers during triage analysis:

1. **Acceptance Criteria** — Does the ticket describe what "done" looks like?
   Acceptable: a clear done state, specific pages/sections to update, a list of
   changes, or a linked doc plan. Not acceptable: "update docs" with no further
   detail.

2. **Epic** — If the work logically belongs to an ongoing initiative or release
   epic, is it linked? Is the epic correct given the ticket scope?

3. **Fix Version** — If the work targets a specific driver or server version, is
   the fix version set?

4. **Labels and Components** — Are the correct labels and components applied per
   the rules below?

5. **Affected URLs** — Is the URL(s) field populated with the `mongodb.com/docs/`
   page(s) that will change?

6. **Claude Summary** — Can a teammate unfamiliar with the engineering change
   understand: (a) what documentation needs to be written or updated, (b) why
   the change matters to users, and (c) which pages or sections are affected?

## Research Gaps

For any quality marker that is missing or unclear, research before recommending
a change. Work through these sources in order:

1. **Linked engineering tickets** (e.g., JAVA-XXXXX, NODE-XXXXX, GODRIVER-XXXXX)
   — Use the `jira` skill to fetch each one. Extract: what changed, why it
   matters to users, which docs area is affected, and any version numbers,
   URLs, or linked PRs mentioned.

2. **Glean** — Search using the ticket summary or key terms from the engineering
   ticket. Look for internal wiki pages or design docs, existing
   `mongodb.com/docs/` URLs for the affected feature area, and prior related
   tickets or discussions. If a result looks relevant, use
   `mcp__claude_ai_Glean_via_MCP__read_document` to read the full content.

3. **Epic search** — If the Epic Link is empty, run the following JQL and look
   for an epic whose summary matches the ticket's language/driver and version.
   Prioritize epics containing a version number that also appears in the ticket
   or a linked engineering ticket. If multiple epics are plausible, list them
   with reasons. If none match, record that explicitly — do not guess.

   ```
   project = DOCSP AND issuetype = Epic AND component = Drivers
   AND status not in (Resolved, Closed)
   ```

4. **Codebase search** — If the ticket or a linked ticket references a specific
   repository path, file, or function name, search the codebase to identify the
   correct docs page or URL.

Record what was found and what remains unclear. Do not invent information —
only report what the sources actually say. If a linked ticket cannot be fetched,
note the key, record the failure, and mark the affected markers as unresolvable.

## Audit Block Format

For Drivers/DBX tickets, extend the standard triage output with the following
fields appended after Rationale:

**Work summary:** [1–2 sentence plain-English description of what the writer
needs to do, synthesized from the ticket, linked tickets, and research.]

**Linked engineering tickets:** [ENG-XXXXX](link), … / None

**Acceptance Criteria:** [current value from ticket / None]

**Epic:** [current epic name and key / None]

**Fix Version:** [current fix version / None]

If the ticket description contains no clear Claude Summary — a plain-English
explanation of what needs to be written, why it matters to users, and which
pages are affected — include a proposed description append in Recommended
changes for the user to approve before applying. Use Jira wiki markup:

```
h2. Claude Summary
[What documentation needs to be written or updated, why the change matters
to users, and which pages or sections are affected.]
```

## Rules

**Version Update Shortcut:**
If the ticket summary matches the pattern `[Drivers] New Version Released:`, it
is a version update ticket. Do not audit or research it. Instead:

1. Use the `jira` skill to apply the `Drivers` component, the appropriate
   language component (inferred from the summary using the Language Component
   Inference table below), and the `feature` label. Assign the ticket to the
   user running this skill and transition its status to **Ready for Work**.
2. Output a short note:
   > **DOCSP-XXXXX** — Version update ticket. Assigned to you. No further
   > changes needed.
3. Ask: **Ready to move to the next ticket?** then stop.

**No RICET Involvement:**
Do not assign story points, add tickets to sprints, or reference RICET meetings in any recommendation.

**Component Application Priority (highest to lowest):**
When multiple component rules could apply to the same ticket, follow this order:

1. **Batch 404 / meta description exception** — if summary contains "Fix 404s", "404s", "Meta Description", "Short Meta", "Long Meta", or "Fix 404", apply `Drivers` + `Maintenance`. Stop. Do not apply language-specific components.
2. **Maintenance rule** — if the ticket is an archiving, EOL, or infrastructure ticket (keywords: "archive", "EOL", "internal 404", "404 alerts"), apply `Drivers` + the language-specific component (from the inference table below) + `Maintenance`. The `archiving` label is auto-applied by the system — do not apply the `IA` label.
3. **Language Component Inference** — for all other tickets, apply `Drivers` + the language-specific component from the table below.

**Language Component Inference:**
Inspect the ticket **summary** for language keywords (do not rely on existing labels — they may not be set yet at triage). Apply the corresponding language-specific component from the table below and always also add the base `Drivers` component. If multiple languages appear in the summary, apply all matching components. If no keyword matches in the summary, scan the description and any linked ticket text for language signals (repository names such as `pymongo-driver` or `node-driver`, file path components, or package/framework names). If a language can be confidently inferred from the description, apply the corresponding component. If still ambiguous, apply only the base `Drivers` component and flag the ticket for manual review with a note explaining that no language could be inferred.

| Keyword(s) in ticket                                     | Component to add         |
| -------------------------------------------------------- | ------------------------ |
| Rust                                                     | Rust                     |
| Go, Golang                                               | Golang                   |
| Java, Java RS                                            | Java                     |
| Kotlin                                                   | Kotlin                   |
| Node                                                     | Node                     |
| PHP, PHP Lib                                             | PHP                      |
| Pymongo, Arrow, Django                                   | Pymongo / Arrow / Django |
| Ruby, Mongoid                                            | Ruby / Mongoid           |
| Scala                                                    | Scala                    |
| C, C driver                                              | C                        |
| C#, .NET                                                 | C#/.NET                  |
| C++                                                      | C++                      |
| VS, analyzer                                             | VS                       |
| EF                                                       | EF                       |
| Laravel                                                  | Laravel                  |
| Magenta                                                  | Magenta                  |
| Repo Steward, repo steward, cross-drivers, atlas connect | Repo-Steward-Task        |

**`grove-testing` label:**
Apply to tickets that use the Grove testing framework to add unit tests to driver documentation files. These tickets typically have summaries like "Use Grove testing framework to add unit testing to the files at path: …". Apply alongside `proactive` as the primary label.

**"Complete Immediately" Category:**
Flag the following ticket types as immediately actionable and recommend
same-session resolution. Set their status to **Ready for Work**:

- Typo fixes
- Driver version or compatibility table updates
- PHP ORM (Laravel) version or compatibility table updates
- Terminology checks

For these tickets, append the following line after the output block:

> **This looks like a quick fix — assign to you as part of the edits?**

If the user confirms, assign the ticket to the user running this skill and
transition its status to **Ready for Work**. If the user declines, treat the
ticket as a standard triage ticket and continue with the normal audit and
write-back process.

## Applying Changes

When applying approved changes, follow the parent skill's write-back steps and
extend them with the following Drivers/DBX-specific rules:

**`actionable` label:** Add `actionable` to every triaged ticket regardless of
its current labels or state.

**URL(s) field:** The affected URL field ID is `customfield_12054`. For multiple
URLs, separate them with a newline in the value. The CLI may print a warning
that this field is not configured — this is harmless; the field will still be
set correctly.

**Fix version:** Before setting, confirm the exact version string with the user.
Version strings must match a name already defined in Jira (e.g., `mongoid-9.1`,
`node-7.2.1`). Do not guess — an invalid name will return a 400 error.

**Epic link:** Link to the epic only if the user has confirmed the match.

**Description append:** Append new content rather than replacing the existing
description, unless it is empty or unusable. Use Jira wiki markup for all
description updates.

## End-of-Session Summary

After all tickets have been processed, output a three-section summary:

**1. Tickets assigned to you this session** (version updates and quick fixes):
- [DOCSP-XXXXX](https://jira.mongodb.org/browse/DOCSP-XXXXX) — [Summary]

If none were assigned, say so.

**2. Other triaged tickets** — include a follow-up note only if open items
remain (fix version to confirm, epic to link, URL not inferred):
- [DOCSP-XXXXX](https://jira.mongodb.org/browse/DOCSP-XXXXX) — [Summary] _(follow-up: [brief note])_

**3. Triage complete** — one-line confirmation that all N tickets have been
processed.
