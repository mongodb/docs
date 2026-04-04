# Triage Skill Validation

## Goal
Backtest the `/triage` skill against real historical tickets to measure how closely its recommendations match actual human triage decisions. Run blind — apply triage logic using only ticket text content, then compare against what humans actually did.

---

## Step 0: Collect Run Parameters

Before retrieving any tickets, ask the user:

1. **How many tickets do you want to retrieve per team?** (Default: 100)
2. **What time period should the tickets cover?** (Default: last 90 days — enter as a number of days, e.g. "30" or "90")

Use the answers to set `$TICKET_COUNT` and `$DAYS` for all queries below. If the user skips a question, use the default.

Also ask: **Which teams do you want to validate?** (Default: all three — CET/Cloud, Server, Drivers/DBX). If the user specifies one or two teams, skip the others entirely.

---

## Step 1: Launch Per-Team Validation Agents

Spawn one background agent per selected team — all in parallel, in a single message. Each agent runs Steps 2–4 independently for its team and returns its per-ticket comparison table and team-level score summary. Wait for all agents to complete before proceeding to Step 5.

**Each agent receives:**
- Its team name (CET/Cloud, Server, or Drivers/DBX)
- `$TICKET_COUNT` and `$DAYS`
- The JQL query for its team (below)
- Instructions to run Steps 2–4 and return: the per-ticket comparison table, plus counts of ✅/⚠️/❌/🔶 by field (Components, Labels)

**Within each agent — retrieve tickets:**

Retrieve `$TICKET_COUNT` tickets using the team's JQL query. For each ticket, fetch **only text fields**: summary, description, comments, and the summary and description of directly linked tickets (one level only — do not follow links of linked tickets). Do not fetch triage fields (components, labels, assignee, status) yet — those are the ground truth fetched after the blind pass.

Once you have the results, use `random.sample(results, 30)` to select **30 tickets** (or all tickets if fewer than 30 were returned). This ensures a random, unbiased sample without simulating randomness manually.

**CET/Cloud:**
```
project = DOCSP AND status in (Done, Closed, "Won't Do", Resolved) AND component in (Cloud, "Ops Manager", "Cloud Manager", "One Agent", Atlas, "BI Connector", Charts, "Kubernetes Operator", "Kubernetes Atlas", "Atlas OSB", "Style Guide", "Data Lake", FTS, mcli, "MongoDB Agent", mongomirror, Terraform, MEKO, Onboarding, OpenAPI, FedRAMP, "Atlas CLI", IDE, "Atlas DevOps Integrations", "Atlas Streams", API, "Atlas SDK", "Atlas Search", "Atlas Vector Search", "Data Federation", kafka, "Atlas Architecture Center", "Online Archive", "AI Integrations", VoyageAI) AND resolutiondate >= -${DAYS}d ORDER BY resolutiondate DESC
```

**Server:**
```
project = DOCSP AND status in (Done, Closed, "Won't Do", Resolved) AND component in (Server, Manual, mongosh, TOOLS, Compass, VSCode, C2C, mongosync, Migrator, IntelliJ, "mcp-server") AND resolutiondate >= -${DAYS}d ORDER BY resolutiondate DESC
```

**Drivers/DBX:**
```
project = DOCSP AND status in (Done, Closed, "Won't Do", Resolved) AND component in (Drivers, Kafka, Spark, "Spark Connector", VSExt, Guides, CSFLE, "Field Level Encryption", C, "C++", "C#/.NET", Golang, Java, Kotlin, Laravel, Node, PHP, "Pymongo / Arrow / Django", "Ruby / Mongoid", Rust, Scala, VS) AND resolutiondate >= -${DAYS}d ORDER BY resolutiondate DESC
```

---

## Steps 2–4 (run inside each agent)

### Step 2: Read Knowledge Sources

Before forming any recommendations, read the triage skill at `.claude/skills/triage/SKILL.md` and use the `glean_mcp` tool to fetch all knowledge sources listed in the team module's Knowledge Sources section (wikis and Google Sheets). This gives you the same routing, labeling, and assignment information the skill would have during live triage.

If any knowledge source fails to load, note which source is missing. Flag any tickets whose triage depends primarily on that source in a separate "incomplete data" category and exclude them from the scorecard rather than scoring them against the skill.

### Step 3: Blind Triage Pass

For each of the 30 sampled tickets, apply the triage logic from `.claude/skills/triage/SKILL.md` — informed by the knowledge sources from Step 2 — using **only** the ticket's text content: summary, description, comments, and linked engineering tickets.

**Note on team assignment:** Team assignment is given — it's determined by which JQL query returned the ticket. The blind pass tests within-team triage accuracy (components, labels, status) only. It does not test team-routing accuracy.

**Do not use the following fields when forming your recommendation** — treat them as if the ticket just arrived in Needs Triage with nothing set:
- Component(s)
- Label(s)
- Status

For each ticket, produce a blind recommendation covering all applicable fields:

| Field | Applies to |
|---|---|
| Component(s) | All teams |
| Label(s) | All teams |
| Status | All teams (Backlog, Ready for Work, or closure) |

You do not need to present the blind recommendations separately — go directly to Step 3.5, then to the comparison tables in Step 4.

### Step 3.5: Fetch Ground Truth

For each sampled ticket, fetch the triage fields that were actually set: **components, labels, and status**. These are the ground truth you'll compare against in Step 4.

### Step 4: Per-Ticket Comparison

For each ticket, compare your blind recommendation against the actual human triage decision. Score each field as:
- **✅ Match** — recommendation exactly matches what the human set
- **⚠️ Partial** — recommendation partially overlaps (e.g., skill suggested 2 components, human set 3; or skill suggested a superset)
- **❌ Miss** — recommendation does not match
- **🔶 Divergent** — the human decision doesn't match any skill-defined rule (e.g., a custom label, an ad-hoc component combination, or an assignment to someone not in the responsibility matrix). These are neither skill failures nor skill successes — they represent coverage gaps or human overrides and are tracked separately.

**Component(s) scoring note:** Exclude any component that was present on the ticket at creation time (set by the reporter, not by triage) from both sides of the comparison. `Maintenance` is the one known pre-set component. If creation-time components cannot be determined from the data, note this as a limitation.

**Label(s) scoring note:** The following labels are applied automatically or outside of triage and should be excluded from both sides of the label comparison: `actionable`, `archiving`, `AAC_reviewed`, `sme-request`, `top250`, `docs-release-note-work`. Do not count their presence or absence as a match or miss. If the human set `maintenance` as a label, treat it as human error and score 🔶 Divergent rather than ❌ Miss — `maintenance` is a Jira component, not a valid label.

**No-label exemption:** If the human set zero triage labels (after excluding the auto-applied labels above) AND the ticket's final status is Done, Closed, Fixed, or Won't Do, score the skill's label recommendation as ✅ Match. Closing without labeling is documented practice for bot-generated release tickets and expedited-close engineering tickets; the skill should not be penalized for correct label predictions that humans chose not to apply.

**Language component on maintenance/404 tickets:** If a ticket summary contains a `[Language]` prefix (e.g., `[Python]`, `[Node]`, `[Go]`) AND also contains "Internal 404", "External 404", "Fix 404", "Fix 404s", "Meta Description", "Short Meta", or "Long Meta", AND the human applied `Drivers` + `Maintenance` without the language-specific component — count the skill's recommendation as ✅ Match even if the skill included the language component. Humans consistently omit the language component on batch maintenance tickets; this is a human test protocol inconsistency, not a skill error.

**Status scoring note:** If the skill recommends closure and the ticket's final status is "Won't Do" or "Closed," score status as ✅ Match and include it in the overall accuracy. For all other tickets, the skill recommends `Backlog` or `Ready for Work` — these will never match a final resolved state, so exclude status from the overall accuracy calculation for those tickets.

Present the results as three tables (one per team):

**Table columns:** Ticket ID | Summary (truncated) | Field | Skill Said | Human Did | Score (✅/⚠️/❌/🔶)

Group rows by ticket, with one row per scored field.

---

## Step 5: Assemble Scorecard

Once all agents have completed, collect their per-ticket tables and score counts. Present each team's per-ticket table in full, then compile the summary scorecard across all teams.

**Accuracy formula:** `Accuracy % = (Match count + 0.5 × Partial count) / Total scored`. Calculate per-field across all teams, then per-team across all fields.

**Per-field accuracy (all teams combined):**

| Field | Total Scored | ✅ Match | ⚠️ Partial | ❌ Miss | 🔶 Divergent | Accuracy % |
|---|---|---|---|---|---|---|
| Component(s) | | | | | | |
| Label(s) | | | | | | |
| **Overall (excl. non-closure Status)** | | | | | | |

**Per-team accuracy:**

| Team | ✅ Match | ⚠️ Partial | ❌ Miss | 🔶 Divergent | Accuracy % |
|---|---|---|---|---|---|
| CET/Cloud | | | | | |
| Server | | | | | |
| Drivers/DBX | | | | | |

**Patterns and observations:**
After completing the scorecard, note any systematic patterns — fields or ticket types where the skill consistently matched or missed. For example:
- Fields where the skill performed well or poorly
- Ticket types that were consistently misrouted
- Cases where the human decision appears inconsistent with the triage rules (potential false negatives in the ground truth)
- Any rules in the skill that appear to be missing, ambiguous, or incorrect based on what you observed
