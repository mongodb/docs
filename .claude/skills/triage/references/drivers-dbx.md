# Drivers/DBX Team Module

## JQL Query

```
project = DOCSP AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component in (Drivers, Kafka, Spark, "Spark Connector", VSExt, Guides, CSFLE, "Field Level Encryption", C, "C++", "C#/.NET", EF, Golang, Java, Kotlin, Laravel, Node, PHP, "Pymongo / Arrow / Django", "Ruby / Mongoid", Rust, Scala, VS, Magenta) AND status = "Needs Triage" AND assignee is EMPTY ORDER BY created ASC
```

## Knowledge Sources

Fetch these sources using `glean_mcp`:
1. **Triage Process Wiki:** `https://wiki.corp.mongodb.com/spaces/DE/pages/306451990/Filter+Duty+DBX+Docs` — DBX filter duty procedures and routing rules.
2. **Labels and Components Doc:** `https://wiki.corp.mongodb.com/spaces/DE/pages/314411909/Status+Labels+Components+DBX+Docs` — correct labels and components for Drivers/DBX tickets.

## Rules

**No RICET Involvement:**
Do not assign story points, add tickets to sprints, or reference RICET meetings in any recommendation.

**Component Application Priority (highest to lowest):**
When multiple component rules could apply to the same ticket, follow this order:
1. **Release Ticket rule** — if summary matches `[Drivers] New Version Released:`, apply only `Drivers`. Stop. Do not apply language-specific or Maintenance components.
2. **Batch 404 / meta description exception** — if summary contains "Fix 404s", "404s", "Meta Description", "Short Meta", "Long Meta", or "Fix 404", apply `Drivers` + `Maintenance`. Stop. Do not apply language-specific components.
3. **Maintenance rule** — if the ticket is an archiving, EOL, or infrastructure ticket (keywords: "archive", "EOL", "internal 404", "404 alerts"), apply `Drivers` + the language-specific component (from the inference table below) + `Maintenance`.
4. **Language Component Inference** — for all other tickets, apply `Drivers` + the language-specific component from the table below.

**Language Component Inference:**
Inspect the ticket **summary** for language keywords (do not rely on existing labels — they may not be set yet at triage). Apply the corresponding language-specific component from the table below and always also add the base `Drivers` component. If multiple languages appear in the summary, apply all matching components. If no keyword matches in the summary, scan the description and any linked ticket text for language signals (repository names such as `pymongo-driver` or `node-driver`, file path components, or package/framework names). If a language can be confidently inferred from the description, apply the corresponding component. If still ambiguous, apply only the base `Drivers` component and flag the ticket for manual review with a note explaining that no language could be inferred.

| Keyword(s) in ticket | Component to add |
|---|---|
| Rust | Rust |
| Go, Golang | Golang |
| Java, Java RS | Java |
| Kotlin | Kotlin |
| Node | Node |
| PHP, PHP Lib | PHP |
| Pymongo, Arrow, Django | Pymongo / Arrow / Django |
| Ruby, Mongoid | Ruby / Mongoid |
| Scala | Scala |
| C, C driver | C |
| C#, .NET | C#/.NET |
| C++ | C++ |
| VS, analyzer | VS |
| EF | EF |
| Laravel | Laravel |
| Magenta | Magenta |
| Repo Steward, repo steward, cross-drivers, atlas connect | Repo-Steward-Task |

**Maintenance Component:**
For archiving, EOL version cleanup, and infrastructure tickets — recognizable by keywords like "archive", "EOL", "internal 404", or "404 alerts" in the summary — apply the `Maintenance` component in addition to the language-specific component and base `Drivers` component. The `archiving` label is auto-applied to these tickets by the system — do not apply the `IA` label.

**Release Ticket Labeling:**
Give "New Version Released" tickets (summary contains "[Drivers] New Version Released:") the `feature` label. Apply only the base `Drivers` component; do not apply language-specific components.

**`grove-testing` label:**
Apply to tickets that use the Grove testing framework to add unit tests to driver documentation files. These tickets typically have summaries like "Use Grove testing framework to add unit testing to the files at path: …". Apply alongside `proactive` as the primary label.

**"Complete Immediately" Category:**
Flag the following ticket types as immediately actionable and recommend same-session resolution. Set their status to **Ready for Work**:
- Typo fixes
- Driver version or compatibility table updates
- PHP ORM (Laravel) version or compatibility table updates
- Terminology checks
