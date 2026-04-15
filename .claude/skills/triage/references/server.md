# Server Team Module

## JQL Query

```
project = DOCSP AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component in (Server, Manual, mongosh, TOOLS, Compass, VSCode, C2C, mongosync, Migrator, IntelliJ, "mcp-server") AND status = "Needs Triage" AND assignee is EMPTY ORDER BY created ASC
```

## Knowledge Sources

Fetch these sources using `glean_mcp`:
1. **Triage Wiki:** `https://wiki.corp.mongodb.com/spaces/DE/pages/202005288/How+to+Triage+Server+Docs+Tickets` — Server triage procedures, priority matrix, and routing rules.
2. **Server Docs Responsibility Matrix:** `https://docs.google.com/spreadsheets/d/1-aok3bEEytjZ7AgshNKHVLQ652vu6-Vb0TvhNKDsUxI/edit?gid=1316732514#gid=1316732514` — component and label mappings by content area.

## Rules

**Close Criteria:**
Check the Priority field (P1–P5). Treat P1/P2 as critical/high — escalate immediately. Treat P4/P5 as low priority — flag for closure. Find the full priority matrix in the Server triage wiki.

Flag the following tickets for closure:
- P4/P5 tickets
- Proactive requests that do not affect the top 250 pages by siteRank. If siteRank data is not available from the knowledge sources, skip this criterion and note the gap in your recommendation.

**No individual assignment.** Never populate the Assignee field for Server tickets. Instead, apply the component and/or label indicated in the responsibility matrix. *(Exceptions: backport tickets whose original is closed — assign to the original author; release notes and CVE tickets — assign to the Quick Wins person identified during triage. See Backport Handling and Release Notes / CVE Tickets below.)*

**Issue Type Correction:**
The Server team only uses Task and Epic issue types. If a ticket arrives as Bug or any other type, change the issue type to Task.

**mongosync Component Correction:**
If a ticket has the `mongosync` component but not `C2C`, add the `C2C` component. C2C is the canonical Jira component for the mongosync area.

**`CSFLEQE` label:** Apply to any ticket related to Client-Side Field Level Encryption (CSFLE) or Queryable Encryption (QE). This routes the ticket into the CSFLE/QE area backlog.

**`quick-win` label:** Apply to tickets estimated to take under 4 hours — typically typo fixes, single factual corrections, broken link fixes (404s), or minor wording changes.

**`all-squads` label:** Apply when the ticket does not clearly belong to a single squad — specifically: release notes and changelog finalization tickets (apply alongside `docs-rn`), and tickets that genuinely span multiple squads with no single content owner. Do NOT apply to CVE or Critical Advisory tickets, tickets that map to a specific squad label, or any ticket where a squad/area label clearly fits.

**Squad/area modifier labels:** After applying the primary label (`feature`, `bug`, `request`, etc.), apply the squad/area label that matches the ticket's content area. Use the table below. Apply only the most specific matching label — do not stack multiple squad labels unless the ticket genuinely covers multiple areas.

**"Simplify X Pages" tickets:** Tickets with summaries like "Simplify the X pages" or "Simplify X documentation" that involve content maintenance across multiple pages in a defined area are good candidates for BOTH a squad/area label AND `all-squads`. Apply the most specific matching squad label (e.g. `query`, `sharding`) AND `all-squads` when the scope spans multiple pages that touch the work of multiple writers or squads.

| Label | Content area |
|---|---|
| `query` | Query, aggregation, change streams, indexes, explain, `$lookup`, CBR, pipeline expressions |
| `sharding` | Sharding, cluster scalability, config servers, `reshardCollection`, balancer |
| `replication` | Replication, replica sets, failover |
| `security` | Security features, roles, authentication, TLS/PKI **content** (not CVE process tickets) |
| `CSFLEQE` | CSFLE and Queryable Encryption |
| `time-series` | Time series collections |
| `platform` | Storage internals, durable transactions, storage execution |
| `install` | Installation procedures |
| `upgrade` | Upgrade procedures, FCV, binary downgrade |
| `catalog-routing` | Catalog and routing internals |
| `networking-observability` | Networking, observability, workload scheduling |
| `Search-On-Prem` | Atlas Search / Vector Search on-prem deployments |
| `all-squads` | Cross-cutting work with no single squad owner (fallback only — see rule above) |

**Backport Handling:**
If a ticket is a Server backport ticket:
1. Locate the original DOCSP ticket by checking (in order): the ticket's "backports" link field, any DOCSP-XXXXX reference in the description, or the ticket title for a matching original summary.
2. If the original ticket is still open: close the new backport ticket and leave a note indicating it will be handled on the original ticket.
3. If the original ticket is closed: link the backport ticket to the original using the "backports" link type, and assign to the original author.

**Downstream Change Summary:**
When a ticket includes a "Downstream Change Summary" table, treat it as the primary input for routing and drafting recommendations. Do not flag these tickets as incomplete due to missing standard description fields.

**Atlas Search / Vector Search Exception:**
See cross-team routing rules in `SKILL.md`. Any ticket related to Atlas Search or Vector Search goes to the CET/Cloud team regardless of engineering origin.

**Release Notes Tickets:**
Apply `docs-rn` + `all-squads`, set status to **Ready for Work**, and ask the user: "Who is this week's Quick Wins person for Server? (Please provide their MongoDB email address, e.g. asmith@mongodb.com)" Then assign the ticket to that person.

**Status:** Move tickets from **Needs Triage** to either **Ready for Work** or **Backlog**.

  - Set **Ready for Work** when the ticket shows at least one of these signals: 
    - P1/P2 priority
    - tied to an active release
    - quick fix (< 4 hours) assigned to the current captain or quick-wins queue
  - Set **Backlog** by default for all other tickets including:
    - feature requests
    - proactive improvements
    - anything without a clear signal it will be worked on in the next two weeks.

Ask the user to confirm the proposed ticket status and provide a rationale for
why the proposed status was chosen.

**CVE / Critical Advisory Tickets:**
Apply the `cve` label. If the ticket requires release note updates, also apply `docs-rn`. Do NOT apply `all-squads` or `security` — CVE tickets are process tickets, not content-area tickets. If the ticket is a Critical Advisory with no documentation work required, recommend closing it.

**Requester Comments:**
Start from the shared template in `assets/comment-templates.md`, then add the following for Server tickets:
- If a ticket was filed by a MongoDB employee, thank the filer by name.
- If closing a ticket, clearly explain the close reason.
- Set expectations on timelines: Quick Wins vs. Ready for Work.
