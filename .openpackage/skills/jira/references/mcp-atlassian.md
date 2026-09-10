# mcp-atlassian Reference

Use this reference when session-preferred = mcp-atlassian MCP.

MCP tool names are environment-specific — confirm the exact names available in the current session before relying on this reference; the names below (`jira_get_issue`, `jira_search`, etc.) match the `mcp-atlassian` server's conventions.

**Description format risk:** this server's own tool schema documents `description` as expecting Markdown, but DOCSP tickets are written and stored in Jira wiki markup (confirmed across multiple existing tickets — headings as `h2.`, links as `[text|url]`, bold as `*text*`). Passing wiki markup through this server's `description` parameter may not render as expected. Verify how a wiki-markup description actually renders when created or edited through this tool before trusting it on a real ticket.

---

## Creating Issues

| Field | MCP Parameter |
|---|---|
| Project \* | `project_key="DOCSP"` |
| Type \* | `issue_type` — see below |
| Summary \* | `summary` |
| Description | `description` (Jira wiki markup) |
| Component | `components` |
| Priority | `additional_fields: {"priority": {"name": "..."}}` |
| Fix Version | `additional_fields: {"fixVersions": [{"name": "..."}]}` |
| Story Points Estimate | `additional_fields: {"customfield_27258": <number>}` |
| Epic Name | `additional_fields: {"customfield_10858": "Name"}` — required when issue type is Epic |
| Labels | `additional_fields: {"labels": ["..."]}` |

\* Required

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

## Labels

```python
# Replaces existing labels; include all desired labels
jira_update_issue(
    issue_key="DOCSP-12345",
    fields={"labels": ["feature", "seo"]}
)
```

---

## Common Operations

### View a ticket

```python
jira_get_issue(issue_key="DOCSP-12345")
```

**Reading the URL(s) field:** DOCSP tickets carry a `URL(s)` custom field (`customfield_12054`) holding the docs page(s) the ticket is about. It is a plain string, and when a ticket targets several pages the URLs are newline-separated within that one string rather than returned as an array. If this server's `fields` parameter is narrowing the response, request `customfield_12054` explicitly. This server's exact `fields` syntax is unverified here, so confirm the field actually came back before relying on it — an unrecognized field name may be dropped silently rather than raising an error.

If the field is null or empty, look for a complete `mongodb.com/docs/` URL written out in the description or comments. Never construct or guess a docs URL from the summary. Stop and ask the user which page to edit.

### Search tickets

```python
jira_search(jql="assignee = currentUser() AND status = 'In Progress'
ORDER BY updated DESC")
```

### Update a ticket

```python
jira_update_issue(
    issue_key="DOCSP-12345",
    fields={"summary": "New summary", "priority": {"name": "Critical - P2"}}
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
    fields={"customfield_27258": 3}
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
    issue_key="DOCSP-111",
    linked_issue_key="DOCSP-222",
    link_type="Related"
)
```

---

## Closing Issues

**Story Points, "Did you use AI?", and Resolution are required at close time.**

Get the Close transition ID, then transition with required fields:

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

If the transition fails with "This field is required", use `jira_search_fields` to identify the missing field.
