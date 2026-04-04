# CET/Cloud Team Module

## JQL Query

```
project = DOCSP AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component in (Cloud, "Ops Manager", "Cloud Manager", "One Agent", Atlas, "BI Connector", Charts, "Kubernetes Operator", "Kubernetes Atlas", "Atlas OSB", "Style Guide", "Data Lake", FTS, mcli, "MongoDB Agent", mongomirror, Terraform, MEKO, Onboarding, OpenAPI, FedRAMP, "Atlas CLI", IDE, "Atlas DevOps Integrations", "Atlas Streams", API, "Atlas SDK", "Atlas Search", "Atlas Vector Search", "Data Federation", kafka, "Atlas Architecture Center", "Online Archive", "AI Integrations", VoyageAI) AND component not in (DevDocs) AND status = "Needs Triage" AND assignee is EMPTY ORDER BY created ASC
```

## Knowledge Sources

Fetch these sources using `glean_mcp`:
1. **Triage Wiki:** `https://wiki.corp.mongodb.com/spaces/DE/pages/88588285/How+to+Triage+Doc+Tickets` — standard triage procedures and label rules.
2. **Cloud Docs Responsibility Matrix:** `https://docs.google.com/spreadsheets/d/1I7SJPz05X7f0UpaVoSf2ZyuDb7RYm5TAOkz1WQyZly8/edit?gid=0#gid=0` — component-to-owner mappings.
3. **Captain Duty Wiki:** `https://wiki.corp.mongodb.com/spaces/DE/pages/285094160/Cloud+Kanban+Captain+Duty` — captain-rotation ticket criteria.
4. **Captain FAQ:** `https://wiki.corp.mongodb.com/spaces/DE/pages/250101234/FAQ+Captain+and+Triage+Kanban+Edition` — captain duty responsibilities.

## Rules

- **No sprint assignment.** CET uses sprints, but you must never assign a sprint to any ticket. Ignore all sprint-related instructions in the wiki.
- **Assign to individuals.** Use the responsibility matrix to identify and assign the correct individual writer for each ticket. A ticket maps clearly to a single owner when its primary content area appears in the matrix and maps to exactly one writer. If the ticket spans multiple content areas, the topic isn't listed in the matrix, or two writers could plausibly own it, flag the ticket for manual review with a note explaining why ownership couldn't be determined — do not guess.
- **Internal CLOUDP engineering tasks:** If a ticket appears to be an internal CLOUDP engineering task, evaluate whether the change is user-facing: a change is user-facing if it would result in observable differences a user could encounter (new UI, changed behavior, new API, etc.). If no user-facing change is evident from the ticket, recommend closing as "Gone Away."
- **Ops Manager release notes:** Give tickets with "Ops Manager" + "Release Notes" in the summary both the `Ops Manager` and `Cloud` components.
- **Captain rotation:** Use the Captain Duty and Captain FAQ wikis to determine which ticket types are handled by the rotating CET captain. For tickets that match captain-duty criteria, assign to the captain whose name the user provided before Step 2 — do not look up an owner in the responsibility matrix for these tickets.
- **`cet-captain` label:** Apply to any ticket estimated to take under 4 hours (e.g., a typo fix, broken link, single-field correction, or minor wording change) — not only to tickets routed to the captain. This label signals captain-queue eligibility.
- **NEVER assign Atlas Architecture Center (AAC) tickets to Kevin Meyer.** Read the ticket summary and description to identify the underlying feature or topic (e.g., Security, Data Lake, Search). Use the responsibility matrix to find the writer who owns that feature, and assign to them. If the ticket spans multiple features, assign to the owner of the feature most prominent in the description. If equally prominent, prefer the more specific content area owner over a general one.
- **Sarah Lin / IA exception:** NEVER assign any ticket to Sarah Lin. If a ticket carries an "IA" label or appears to be related to Information Architecture (e.g., navigation restructuring, TOC changes, content organization), defer to the content area owner instead. If the content area owner is unclear, flag for manual review.
- **`navigation` label:** Apply to tickets about updating or restructuring navigation elements (side nav, TOC, menu structure) when the scope is a targeted nav change rather than a broad IA initiative. For broad IA initiatives, use `IA`; for narrower nav-only work, use `navigation`. The two labels may be stacked if both apply.
