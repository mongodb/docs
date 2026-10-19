# Held draft ticket — NOT filed automatically

This is a proposed DOCSP ticket for one **Confirmed** security-scan finding. It is held for human review. A docs engineer reviews it, edits as needed, and only then files it via the `/jira` skill. The skill never creates Jira tickets on its own.

---

- **Issue type:** Bug
- **Component:** {{component}}
- **Suggested priority:** {{suggested_priority}}   <!-- High→Critical-P2, Medium→Major-P3, Low→Minor-P4 -->
- **Labels:** `bug`
- **Affected files:** {{finding.docs_files}}

## Summary (Jira)

`{{docset}} docs: {{finding.title}}`

## Description (Jira wiki markup)

```
h2. Problem

The {{docset}} documentation contains a security issue.

*Category:* {{finding.category}}
*Guideline:* {{finding.guideline}}

*Docs say:* {{finding.docs_say}}
(see {{finding.docs_location}})

*Evidence:* {{finding.evidence}}

h2. Recommended change

{{finding.action}}

h2. Affected files

* {{finding.docs_files}}

----
_Drafted by the docs-security-scan skill from a {{run_date}} scan of {{docs.path}} (version {{resolved_version}}). Classification: Confirmed. Verify before filing._
```
