# Held draft ticket — NOT filed automatically

This is a proposed DOCSP ticket for one **Confirmed** drift finding. It is
held for human review. A docs engineer reviews it, edits as needed, and only
then files it via the `/jira` skill. The skill never creates Jira tickets on
its own.

---

- **Issue type:** Bug
- **Component:** {{component}}
- **Suggested priority:** {{suggested_priority}}   <!-- High→Critical-P2, Medium→Major-P3, Low→Minor-P4 -->
- **Labels:** `bug`
- **Affected files:** {{finding.docs_files}}
- **Source evidence:** `{{finding.source_symbol}}` — `{{finding.source_file}}:{{finding.source_line}}` @ {{source.ref}}

## Summary (Jira)

`{{property}} docs: {{finding.title}}`

## Description (Jira wiki markup)

```
h2. Problem

The {{property}} documentation does not match the source.

*Docs say:* {{finding.docs_say}}
(see {{finding.docs_location}})

*Source says:* {{finding.source_say}}
({{finding.source_symbol}} in {{finding.source_file}}:{{finding.source_line}})

h2. Recommended change

{{finding.action}}

h2. Affected files

* {{finding.docs_files}}

----
_Drafted by the docs-drift skill from a {{run_date}} accuracy run against
{{source.repo}}@{{source.ref}}. Classification: Confirmed. Verify before filing._
```
