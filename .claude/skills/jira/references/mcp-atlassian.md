# mcp-atlassian Reference

Use this reference when session-preferred = mcp-atlassian MCP.

MCP tool names are environment-specific — confirm the exact names available in the current session before relying on this reference; the names below (`jira_get_issue`, `jira_search`, etc.) match the `mcp-atlassian` server's conventions.

**Write descriptions and comments in Markdown on this backend.** This server converts `description` and `comment` text from Markdown to Jira wiki markup before storing it, so Markdown input produces correct wiki markup. Wiki syntax that is also valid Markdown gets rewritten: `*bold*` becomes italic, and `# item` becomes an `h1.` heading. Two exceptions:

- Write block quotes as `{quote}...{quote}`. Markdown `> quote` is stored as-is.
- Reword any literal asterisks, such as `2 * 3`. Otherwise they become italic markers.

Tool responses echo the text back as Markdown, so don't treat the echo as the stored value.

**JSON-string parameters:** `additional_fields` (create and update), `fields` (update and transition) are typed as **JSON strings** in this server's schema. Serialize them, as in the examples below. `components` is a comma-separated string.

---

## Creating Issues

| Field | MCP Parameter |
|---|---|
| Project \* | `project_key="DOCSP"` |
| Type \* | `issue_type` — see below |
| Summary \* | `summary` |
| Description | `description` (Markdown — see above) |
| Component | `components="Atlas,Drivers"` |
| Priority | `additional_fields`: `{"priority": {"name": "..."}}` |
| Fix Version | `additional_fields`: `{"fixVersions": [{"name": "..."}]}` |
| Story Points Estimate | `additional_fields`: `{"customfield_27258": <number>}` |
| Epic Name | `additional_fields`: `{"customfield_10858": "Name"}` — required when issue type is Epic |
| Labels | `additional_fields`: `{"labels": ["..."]}` |

\* Required

```python
jira_create_issue(
    project_key="DOCSP",
    summary="Update connection string examples for Atlas shared clusters",
    issue_type="Task",
    description="## Overview\nUpdate the connection string examples...",
    components="Atlas",
    additional_fields='{"priority": {"name": "Major - P3"}, "labels": ["feature"]}'
)
```

---

## Labels

```python
# Replaces existing labels; include all desired labels
jira_update_issue(
    issue_key="DOCSP-12345",
    fields='{"labels": ["feature", "seo"]}'
)
```

---

## Common Operations

### View a ticket

```python
jira_get_issue(issue_key="DOCSP-12345")
```

`comment_limit` defaults to 10 (max 100). On a ticket with more comments than that, raise it so older comments — often where SME feedback or a target URL lives — aren't dropped.

**Reading the URL(s) field:** DOCSP tickets carry a `URL(s)` custom field (`customfield_12054`) holding the docs page(s) the ticket is about. This server returns it wrapped as `{"value": "<urls>"}`, and when a ticket targets several pages the URLs are newline-separated within that one string rather than returned as an array. The default `fields` list (`status,priority,reporter,summary,updated,issuetype,assignee,description,created,labels`) contains no custom fields, so you must request `customfield_12054` explicitly in the comma-separated `fields` string. Avoid `*all`, which returns 150+ mostly-null custom fields:

```python
jira_get_issue(
    issue_key="DOCSP-12345",
    fields="summary,status,description,labels,components,issuelinks,customfield_12054"
)
```

Confirm the field actually came back before relying on it — an unrecognized field name may be dropped silently rather than raising an error.

If the field is null or empty, look for a complete `mongodb.com/docs/` URL written out in the description or comments. Never construct or guess a docs URL from the summary. Stop and ask the user which page to edit.

### Search tickets

```python
jira_search(
    jql="assignee = currentUser() AND status = 'In Progress' ORDER BY updated DESC",
    limit=10
)
```

`limit` maxes out at 50. Use `start_at` to page.

### Update a ticket

```python
jira_update_issue(
    issue_key="DOCSP-12345",
    fields='{"summary": "New summary", "priority": {"name": "Critical - P2"}}'
)
```

### Transition a ticket

```python
jira_get_transitions(issue_key="DOCSP-12345")   # get transition IDs first
jira_transition_issue(issue_key="DOCSP-12345", transition_id="<id>")
```

Transition IDs are scoped to the ticket's *current* status, not stable per named transition — verified: `Close` was id 111 on a ticket in Needs Triage but id 141 on a different ticket in In Progress. Always call `jira_get_transitions` fresh for the specific ticket; never reuse an ID seen on a different ticket or a different prior status.

**Story Points Estimate required on In Progress:**

```python
jira_transition_issue(
    issue_key="DOCSP-12345",
    transition_id="<in-progress-id>",
    fields='{"customfield_27258": 3}'
)
```

### Add a comment

```python
jira_add_comment(issue_key="DOCSP-12345", comment="Comment body here.")
```

To mention a user, use `[~username]` where username is their MongoDB email prefix (e.g. `[~jane.smith]`). Use this when requesting SME or stakeholder review.

### Link two tickets

```python
jira_create_issue_link(
    link_type="Related",
    inward_issue_key="DOCSP-111",
    outward_issue_key="DOCSP-222"
)
```

For `Documented`, pass the DOCSP ticket as `inward_issue_key` and the engineering ticket as `outward_issue_key`.

### Sub-tasks and epics

Create a sub-task with `issue_type="Subtask"` and `additional_fields='{"parent": "DOCSP-12345"}'`. Jira stores the type as `Sub-task`. Add an existing issue to an epic with `jira_update_issue(issue_key="DOCSP-12345", fields='{}', additional_fields='{"epicKey": "DOCSP-11111"}')`. `jira_link_to_epic` reports success without setting the Epic Link, so don't use it.

---

## Closing Issues

**Story Points, "Did you use AI?", and Resolution are required at close time.**

Get the Close transition ID, then transition with required fields:

```python
jira_get_transitions(issue_key="DOCSP-12345")

jira_transition_issue(
    issue_key="DOCSP-12345",
    transition_id="<close-id>",
    fields='{"customfield_10555": 3, "customfield_27257": {"value": "Yes"}, "resolution": {"name": "Done"}}'
)
```

For an Epic, leave `customfield_27257` out of `fields`. If you include it, the call returns an error but still closes the epic, with resolution `Done`.

If the transition fails with "This field is required", use `jira_search_fields` to identify the missing field.
