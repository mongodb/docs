# Backlog Squad Classification Reference

## Purpose

This is a repeatable classification pattern for backlog cleanup. The goal is to classify backlog tickets that carry only the `Atlas` component and have no squad-specific component already assigned, making them discoverable by the squads responsible for the underlying content areas. Run this when a significant number of unrouted Atlas backlog tickets accumulate.

## Source

**Kanban board:** https://jira.mongodb.org/secure/RapidBoard.jspa?rapidView=2957&quickFilter=25708

This classification was built by analyzing all unassigned, backlog-status tickets visible on the Kanban board above. The JQL filter below is the equivalent query used to retrieve those tickets programmatically.

**JQL:**
```
project in (DOCSP, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component = Atlas AND component not in ("Ops Manager", "Cloud Manager", Cloud, "One Agent", "MongoDB Agent", Charts, "Kubernetes Operator", "Kubernetes Atlas", "Atlas OSB", MEKO, DevDocs) AND assignee is EMPTY AND status = backlog ORDER BY priority DESC
```

**How routing works (intended):**

1. **Keyword match:** For tickets with the broad `Atlas` component, the keyword list provides a secondary signal based on vocabulary patterns observed in previously triaged tickets.
2. **Human confirmation:** The skill surfaces the top 2–3 candidate squads with its reasoning; a triager confirms the final assignment.

**Notes on coverage:**

- Sections with no keywords (Billing & Payments, Clusters Security) had no matching tickets in the backlog at time of writing.
- Each squad section includes a scoped JQL for reference, but the routing signal for this task is keyword matching, not component matching.

## Maintenance

**Who updates this file:** Anyone running a `--groom-backlog` pass or collecting squad routing signals from squad leads.

**When to update:**
- A squad lead confirms new labels, components, or Assigned Teams values → add them to the squad's section and update the JQL.
- A `--groom-backlog` run surfaces a recurring keyword pattern across multiple unclassified tickets → add the keyword to the relevant squad's list after human confirmation.
- A new squad is created or an existing squad is restructured → add or update the section accordingly.

**What not to add:** Individual squad lead names (these change), raw internal Kanban filter URLs, or one-off keywords that appear in a single ticket.

---

## Special Routing Patterns

### [CLOUDP]-prefixed tickets (Jira automation spawned)

DOCSP tickets with a `[CLOUDP]` prefix in the title are typically created by Jira automation from a linked engineering ticket in the CLOUDP project. Do not classify these by keyword alone. Always assign the appropriate component first (e.g. `Billing Platform`, `Atlas`, etc.) so the ticket is visible to the right squad. Then:

1. **Follow the link** — open the linked CLOUDP ticket (visible in the issue's links panel).
2. **Trace to the epic** — find the parent epic of the CLOUDP ticket.
3. **Check the epic** for a docs owner field and `"Documentation Changes" = Needed`.

**If the epic has a docs owner:**
- Assign the DOCSP ticket to that person.
- Add a comment noting it was spawned by automation and may duplicate an existing DOCSP ticket for the same epic. Ask the assignee to close in favor of the existing ticket if one exists.

**If the epic has `"Documentation Changes" = Needed` not set but DOCSP tickets are clearly being generated from its children:**
- Do not assign to a person.
- Add a comment flagging this for the triager: note that multiple DOCSP tickets are being generated from this engineering epic without a docs owner, and suggest raising it at the next Cloud docs team planning meeting to claim ownership.

> **Example:** DOCSP-60882 and DOCSP-60881 were spawned from CLOUDP children of a Billing Platform epic with `"Documentation Changes" = Needed` not set. The correct action was to add the `Billing Platform` component and flag for planning meeting assignment.

---

## Architecture Center (AAC)

**Components:** `Atlas Architecture Center`

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component = "Atlas Architecture Center" AND assignee is EMPTY AND status = backlog ORDER BY priority DESC
```

- Terraform reference architecture
- operational troubleshooting
- rate limiting (Gov)
- resilient app example
- org/project hierarchy automation

## Atlas - AI Integrations

**Components:** `AI Integrations`

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component = "AI Integrations" AND assignee is EMPTY AND status = backlog ORDER BY priority DESC
```

- RAG
- local RAG
- AI agents
- LangChain
- LlamaIndex
- LangGraph
- GraphRAG

## Atlas - Alerts & Metrics (Customer Observability)

**Components:** `Alerts`, `Alert Management`

**Assigned Teams:** `Alerts Platform`, `InTel I`, `InTel II`, `InTel III`, `InTel IV`

**Labels:** `metrics`, `docs-security`

> **Routing note:** Add the `Alerts` or `Alert Management` component, or set **Assigned Teams** to the appropriate InTel value. Also add the `metrics` label. Use `docs-security` for security-adjacent observability tickets (e.g., audit logging, encryption at rest, field-level security alerts). The title prefix `[Alerts & Metrics]` applied during the 2026-06 backlog cleanup run predates the discovery of these components — prefer components and Assigned Teams going forward.

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND ("Assigned Teams" in ("Alerts Platform", "InTel I", "InTel II", "InTel III", "InTel IV") OR component in (Alerts, "Alert Management")) ORDER BY priority DESC
```

- alerting
- Prometheus integration
- query latency graphs
- maintenance windows
- connection thresholds
- cloud backup alerts
- metric names mapping

## Atlas - Backup

**Components:** `Backup`, `Cloud Provider Snapshots`

**Assigned Teams:** `Backup`, `Backup - Atlas`, `Backup - DS`, `Backup - Triage`

> **Routing note:** Add the `Backup` or `Cloud Provider Snapshots` component, or set **Assigned Teams** to the most appropriate value. Use `Backup - Triage` when the sub-team is unclear.

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND (component in (Backup, "Cloud Provider Snapshots") OR "Assigned Teams" in (Backup, "Backup - Atlas", "Backup - DS", "Backup - Triage")) ORDER BY priority DESC
```

- queryable backups
- backup snapshot
- manual restore
- point-in-time restore
- continuous cloud backup
- snapshot export to S3
- on-demand snapshots
- backup alerts
- backup daemon hardware requirements

## Atlas - Billing & Payments (Core Services)

**Components:** `Billing`, `Billing Platform`, `Billing Services`, `Payments`

**Assigned Teams:** `Billing Platform`, `Payments`

> **Routing note:** Add the most specific component available. Set **Assigned Teams** to `Billing Platform` or `Payments` depending on the ticket topic.

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND (component in (Billing, "Billing Platform", "Billing Services", Payments) OR "Assigned Teams" in ("Billing Platform", Payments)) ORDER BY priority DESC
```

## Atlas - Clusters (Platform and Automation; Durability, Availability, Performance)

**Components:** *(none — `Atlas` component is too broad to use as a signal)*

**Assigned Teams:** `Clusters Public Docs Atlas`, `Atlas Clusters Workload Management`, `Atlas Clusters Platform I`, `Atlas Clusters Platform II`, `Atlas Clusters Platform Triage`

> **Routing note:** Set **Assigned Teams** to the most appropriate sub-team — but only if the field is currently empty. Do not overwrite an existing team assignment. Use `Atlas Clusters Platform Triage` when the sub-team is unclear.

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND ("Assigned Teams" in ("Clusters Public Docs Atlas", "Atlas Clusters Workload Management", "Atlas Clusters Platform I", "Atlas Clusters Platform II", "Atlas Clusters Platform Triage") OR text ~ "mongotune" OR text ~ "sharding advisor" OR text ~ "performance advisor" OR text ~ "Query Profiler" OR text ~ "sharding insights" OR text ~ "mongodump" OR text ~ "schema advisor") ORDER BY priority DESC
```

- auto-scaling
- cluster upgrade
- multi-cloud distribution
- mongotune
- time series collections
- development workflow best practices
- schema advisor
- mongodump
- Query Profiler
- bulk operations
- connection troubleshooting
- sharding advisor
- sharding insights
- performance advisor
- high availability
- resource policies
- Suggested Indexes API

## Atlas - Clusters Security

**Components:** *(none)*

**Assigned Teams:** `Atlas Clusters Security Triage`, `Atlas Clusters Security Encryption & Compliance`

> **Routing note:** Set **Assigned Teams** to `Atlas Clusters Security Encryption & Compliance` for KMS, encryption at rest, and compliance topics. Use `Atlas Clusters Security Triage` when the sub-team is unclear. Security-adjacent keywords not matched here are also covered under Atlas - Clusters (above) and Atlas - Identity & Access Management.

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND "Assigned Teams" in ("Atlas Clusters Security Triage", "Atlas Clusters Security Encryption & Compliance") ORDER BY priority DESC
```

## Atlas - Data Federation / Online Archive

**Components:** `Data Federation`, `Online Archive`, `Data Lake`

**Assigned Teams:** `ADF Platforms`, `ADF Query Processing`, `ADF Service Architecture`, `Atlas Data Federation`, `Atlas Online Archive`, `Atlas Online Archive II`

> **Routing note:** Add the appropriate component. Set **Assigned Teams** if the sub-team is known.

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND (component in ("Data Federation", "Online Archive", "Data Lake") OR "Assigned Teams" in ("ADF Platforms", "ADF Query Processing", "ADF Service Architecture", "Atlas Data Federation", "Atlas Online Archive", "Atlas Online Archive II")) ORDER BY priority DESC
```

- escape special characters in field names
- AWS integration
- AWS IAM role creation
- aggregation pipelines ($out, $lookup, $collStats, $merge, $sql, $queryHistory)
- query with MQL
- run queries tutorial
- check query status
- cancel a query
- view query history
- download query logs
- set query limits
- partition attributes
- configure encryption
- settings reference
- change deployment region
- update namespace catalog
- manage private endpoints
- add/rename/drop collections or views
- online archive cost
- configure archive rules
- online archive

## Atlas - Identity & Access Management

**Components:** *(none)*

**Assigned Teams:** `IAM`, `IAM Authorization`, `IAM General`, `IAM Identity Security`, `IAM II`, `IAM III`, `IAM Triage`, `IAM Workload Identity`

> **Routing note:** Set the **Assigned Team** field to the most appropriate sub-team based on the ticket topic:
> - `IAM Workload Identity` — workload federation, OIDC Managed Identity
> - `IAM Identity Security` — OIDC (Okta, Ping Identity, Entra ID), federated authentication, MFA
> - `IAM Authorization` — X.509, role-based access, database user limits
> - `IAM General` — fine-grained authentication, general IAM topics
> - `IAM Triage` — unrouted IAM tickets; use when sub-team is unclear
> - `IAM II` / `IAM III` — sub-team variants; follow squad guidance on which to use

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND "Assigned Teams" in (IAM, "IAM Authorization", "IAM General", "IAM Identity Security", "IAM II", "IAM III", "IAM Triage", "IAM Workload Identity") ORDER BY priority DESC
```

- workload federation
- GCP IDP
- service accounts
- OIDC workload (Managed Identity)
- OIDC (Okta, Ping Identity, Entra ID)
- federated authentication
- MFA
- role-based access
- X.509 authorization

## Atlas - Live Migration

**Components:** `MongoMirror`

**Squad JQL:**
```
project in (DOCSP, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component in (MongoMirror) AND assignee is EMPTY AND status = backlog ORDER BY priority DESC
```

- live migration
- live migrate (pull) a cluster into Atlas
- legacy migration

## Atlas - Search / Vector Search

**Components:** `Atlas Search`, `FTS`, `Atlas Vector Search`

**Assigned Teams:** `Search`, `Search Triage`, `Search AI`, `Search Web Platform`, `Search Query`, `Search Query Triage`, `Search Systems Triage`, `Search Systems`

> **Routing note:** Add the appropriate component. Set **Assigned Teams** if the sub-team is known; use `Search Triage` when unclear.

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND (component in ("Atlas Search", FTS, "Atlas Vector Search") OR "Assigned Teams" in (Search, "Search Triage", "Search AI", "Search Web Platform", "Search Query", "Search Query Triage", "Search Systems Triage", "Search Systems")) ORDER BY priority DESC
```

- manage indexes
- search tutorial
- partial match
- synonyms
- facet tutorial
- cross-collection tutorials
- autocomplete
- token filters
- wildcard operator
- string operators
- embedded documents type
- sort
- quick start tutorial
- vector search stage
- Grove unit testing
- vector search type
- vector quantization
- hybrid search
- create embeddings
- automated embedding
- auto scaling (automated embedding)

## Atlas - Streams / Kafka Connector

**Components:** `Atlas Streams`, `kafka`

**Assigned Teams:** `Atlas Streams`, `Kafka Connector`

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND (component in ("Atlas Streams", kafka) OR "Assigned Teams" in ("Atlas Streams", "Kafka Connector")) ORDER BY priority DESC
```

- OLAP integration
- $hoppingWindow
- $source
- $tumblingWindow
- $emit
- $lookup
- visual pipeline builder
- array source
- changestream
- correlated subqueries
- AWS sinks (S3, Kinesis, Lambda)
- test connection
- Kafka Connector
- Kafka post processor
- Kafka custom class
- Kafka SSL configuration
- Kafka logging
- Kafka startup mode
- Kafka write model strategy
- Kafka AWS IAM
- Kafka topic properties
- Kafka JSON formatter

## Atlas CLI

**Components:** `Atlas CLI`, `mcli`

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component in ("Atlas CLI", mcli) AND assignee is EMPTY AND status = backlog ORDER BY priority DESC
```

- cluster upgrade
- connectionStrings describe
- VSCode troubleshooting
- Docker local deployment
- programmatic user
- backups restores start

## Atlas for Government

**Components:** `FedRAMP`

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component = FedRAMP AND assignee is EMPTY AND status = backlog ORDER BY priority DESC
```

- Atlas for Gov commercial customers
- rate limiting

## Atlas SQL / BI Connector

**Components:** `Atlas SQL`, `BI Connector`, `BI-Connector`

**Assigned Teams:** `Atlas SQL`, `SQL Engines`

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND (component in ("Atlas SQL", "BI Connector", "BI-Connector") OR "Assigned Teams" in ("Atlas SQL", "SQL Engines")) ORDER BY priority DESC
```

- Connect from Looker
- mongosqld reference
- legacy information cleanup
- VPC query execution
- Atlas SQL vs BI Connector differences

## Content Maintenance

**Components:** `Style Guide`, `Onboarding`

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component in ("Style Guide", Onboarding) AND assignee is EMPTY AND status = backlog ORDER BY priority DESC
```

*As of 2026-05-13, no tickets in the backlog clearly map to this squad. The closest matches in the filter are Style Guide tickets:*

- style guide glossary entries
- style guide word list
- accessibility guidelines
- update pages that import Markdown
- update redirects page

## Mongo CLI

**Components:** `MongoCLI`

**Assigned Teams:** `Mongosh`

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND (component = MongoCLI OR "Assigned Teams" = Mongosh) AND assignee is EMPTY AND status = backlog ORDER BY priority DESC
```

*As of 2026-05-13, no tickets in the backlog fall into this category.*

## Terraform

**Components:** `Terraform`, `terraform-change`, `Terraform Provider`

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND component in (Terraform, terraform-change, "Terraform Provider") AND assignee is EMPTY AND status = backlog ORDER BY priority DESC
```

- organization creation
- linked organizations
- X.509 certificate
- Terraform projects module
- Terraform organizations module
- GCP Cloud Provider module
- Landing Zone (GCP, AWS)
- dev/test example
- reference architecture
- cluster and backup policies
- Azure deployment
- database users and Vault

## Voyage

**Components:** `VoyageAI`, `Voyage AI Team`

**Assigned Teams:** `Voyage AI`

**Squad JQL:**
```
project in (Documentation, "Documentation Internal") AND issuetype != Epic AND (resolutiondate > -7d OR resolutiondate is EMPTY) AND (component in (VoyageAI, "Voyage AI Team") OR "Assigned Teams" in ("Voyage AI") OR text ~ "Voyage AI" OR text ~ "voyage-4-nano") ORDER BY priority DESC
```

- Voyage AI integration
- voyage-4-nano default model
- local models in Atlas Vector Search
- composables for Voyage/Atlas


