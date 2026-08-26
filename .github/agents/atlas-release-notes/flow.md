# Atlas Release Notes Flow

<description>
Generate release notes for Atlas by fetching features from Aha! and JIRA,
transforming them into RST entries, and assembling into the monthly changelog.
</description>

<inputs>
version: string           # Deployment version (e.g., "v20260325")
end_date: string          # YYYY-MM-DD format
</inputs>

<rules>
1. NO DIRECT WRITING - You cannot write release note entries yourself
2. SKILLS ARE MANDATORY - Every entry must go through a skill
3. YAML IN/OUT - Format input as YAML, capture output as YAML
4. PARALLEL FEATURE PROCESSING - Spawn one subagent per verified feature simultaneously; do not process features sequentially
5. NO INFLUENCE FROM EXISTING CONTENT - Do not let existing changelog entries influence how you write new ones. Each entry must be written fresh from source data.
6. APPLY ONLY THE DEFINED GATES - Two gates decide whether an entry is written: the verification criteria and the customer-impact check, both defined in Step 1a. Apply both. Do not invent any other filter.
7. ACCOUNT FOR ALL ITEMS - Every fetched item must appear in either the RST output or the Flagged table. Nothing is silently dropped.
8. NEVER GUESS A PRODUCT NAME - The name a feature carries in Aha! is often internal. Before writing, confirm what the feature is called in the published docs. If you cannot confirm it, flag the feature instead of inventing a name.
</rules>

<prerequisites>
- Access to Aha! API (for features)
- Access to JIRA MCP (for JIRA features)
- Write access to docs-mongodb-internal repo
</prerequisites>

<instructions>

## Step 0: Resolve start_date

`START_DATE` always comes from the last-run comment, never from the calendar.
The agent may be run sporadically, so anything between the last run and today
must still be picked up.

Read the last-run date from the bottom of the changelog file:

```bash
tail -n 5 content/atlas/source/includes/changelog/atlas-{YYYY}.rst \
  | grep "^\.\. last-run:" | awk '{print $2}'
```

- If a date is found, use it as `START_DATE`.
- If the comment is absent but the file exists, check the previous year's file
  (`atlas-{YYYY-1}.rst`) before falling back. Only if neither has the comment,
  use the first day of the month derived from `end_date` and tell the operator
  that the lookback is a guess.
- If the file does not exist, use the first day of the month derived from
  `end_date` (e.g., `2026-04-25` → `2026-04-01`).

<gap_check>
If the operator supplies a `start_date` directly, compare it to the last-run
date. When the supplied date is later, the difference is a gap that no run
will ever cover. Do not proceed silently:

1. Tell the operator the gap and its length.
2. Fetch the gap window separately and report what it contains.
3. Ask whether to widen the run or accept the gap.

Never narrow the window on your own initiative.
</gap_check>

## Step 0b: Load Terminology from the shared expansion map

Ensure the maintained expansion map exists for this docset, regenerating it if missing or stale:

```bash
python3 .claude/scripts/build-expansion-map.py content/atlas/snooty.toml
```

Build a compact `key=syntax` terminology file from that map (`content/atlas/.expansion-map.yml`):

```bash
mkdir -p /tmp/atlas-rn && python3 -c "
import yaml
d = yaml.safe_load(open('content/atlas/.expansion-map.yml'))
subs = {k: f'|{k}|' for k in d['substitutions']}
consts = {k: '{+' + k + '+}' for k in d['constants']}
merged = {**subs, **consts}  # constants win on collision
for k, v in sorted(merged.items()):
    print(f'{k}={v}')
" > /tmp/atlas-rn/terminology.txt
```

When writing entries, replace prose text that matches a key's meaning with its
syntax token. Do not read `snooty.toml` directly.

## Step 1a: Fetch Features from Aha!

Run the fetch script:

```bash
mkdir -p /tmp/atlas-rn && \
python .github/agents/atlas-release-notes/fetch_aha_features.py \
  --start-date {START_DATE} --end-date {END_DATE} \
  --output /tmp/atlas-rn/features.json
```

The script returns **all** Atlas features in the date range regardless of status.
After fetching, put each feature through both gates below. A feature must pass both to get an RST entry. Anything that fails either gate goes in the DRI table only.

<feature_verification>
Gate 1 — shipped status:
- Passes: `risk_status = "Complete"` OR `status = "Shipped"` OR `status = "Ready to Ship"`
- Fails: All others
</feature_verification>

<customer_impact_check>
Gate 2 — customer impact. `Shipped` in Aha! means the code merged. It does not mean a customer can use the feature, and it does not mean a customer can see any difference. Read the description and answer two questions:

1. **Can a customer observe this?** If the change is an internal migration, a refactor, a build/buy evaluation, a spike, tooling, or tuning of a mechanism customers have no visibility into, it fails. Internal work of this kind is the most common thing to slip through this gate, so treat any description that never names something the customer sees or does as a failure.

2. **Can a customer reach it today?** A feature can be `Shipped` long before customers get it — sometimes close to a year. If the description hints at a future preview or GA date, or describes groundwork for something later, it fails.

When the answer to either question is unclear, the feature fails the gate. Put it in the DRI table with the reason, and let the DRI decide. A missed entry costs one cycle. A wrong entry announces a product that does not exist.
</customer_impact_check>

<dri_resolution>
Resolve the DRI in this order:

1. The linked JIRA ticket on the feature. Use its `assignee`, and `customfield_12751` for the owning team. This is the reliable source.
2. Aha! `assigned_to`, only when no ticket is linked. Mark it **unconfirmed** in the DRI table.

Aha! `assigned_to` frequently names whoever created the record rather than whoever owns the work. In one pass it named a single person for four features across three different teams, none of which were theirs. Never send a sign-off request based on that field alone without marking it unverified.

The JIRA `assignee` is not guaranteed to be a PM — it may be the implementing engineer. The intent of this flow is that DRIs are product owners, so when the assignee is not a PM, use `customfield_12751` (owning team) to route to the product owner for that team, and confirm before sending.
</dri_resolution>

## Step 1b: Fetch Features from JIRA

If the JIRA query returns zero results, verify that the fixVersion value matches
exactly what is used in JIRA (e.g., `v20260325`) before proceeding. Do not
continue with an empty result set — stop and ask the operator to confirm the
version string.

<jql>
fixVersion = "{VERSION}" AND "Documentation Changes" = Needed AND type = Story ORDER BY created DESC
</jql>

Fields: `summary`, `description`, `status`, `assignee`, `customfield_10257`, `customfield_14266`, `customfield_12751`, `components`

<field_map>
| Field | Meaning |
|-------|---------|
| `summary` | Feature title |
| `description` | Full feature description |
| `status` | Workflow status (e.g., Resolved, In Progress) |
| `assignee` | DRI — use `display_name` |
| `customfield_10257` | Documentation Changes flag — should be "Needed" for all results |
| `customfield_14266` | Doc impact notes — additional context from the engineer |
| `customfield_12751` | Team/squad name |
| `components` | Product area (e.g., Federation, Atlas Search) |
</field_map>

All JIRA stories deploy on the fixVersion release date. DRI field: `assignee`.

## Step 2: Pre-processing

Run all three commands before spawning any subagents:

**Slim the Aha! JSON** — strip HTML, truncate descriptions, drop unused fields:

```bash
python3 -c "
import json, re, html as htmllib
with open('/tmp/atlas-rn/features.json') as f:
    data = json.load(f)
def clean(text):
    if not text: return ''
    text = re.sub(r'<[^>]+>', ' ', text)
    text = htmllib.unescape(text)
    return re.sub(r'\s+', ' ', text).strip()[:500]
slim = [{'name': f['name'], 'status': f['status'],
         'risk_status': f.get('risk_status',''),
         'release_date': f['release_date'],
         'assigned_to': f['assigned_to'],
         'feature_ref': f.get('feature_ref',''),
         'description': clean(f.get('description',''))}
        for f in data['features']]
with open('/tmp/atlas-rn/features-slim.json','w') as f:
    json.dump({'features': slim, 'stats': data.get('stats',{})}, f, indent=2)
"
```

**Build the anchor index** — every anchor in the docs, excluding
auto-generated command/steps/list includes:

```bash
grep -rn "^\.\. _" content/atlas/source/ \
  | grep -iv "includes/command\|includes/steps\|includes/list" \
  > /tmp/atlas-rn/all-anchors.txt
```

Do not restrict this to page-level anchors. An earlier version kept only anchors on lines 1–10, which hid every section anchor from the subagents. The correct target for a feature is usually a section, not a page: in one pass, both anchors that turned out to be the right link were filtered out, the subagents wrote from the Aha! description alone, and one of them invented a product name as a result.

## Step 3: Process Features in Parallel

Classify all features from `features-slim.json` and JIRA using the verification
criteria. Then spawn **one subagent per verified feature simultaneously** — do
not wait for one to finish before starting the next.

<feature_verification>
- Verified (spawn subagent): `risk_status = "Complete"` OR `status = "Shipped"` OR `status = "Ready to Ship"`
- Flagged (DRI table only, no subagent): All others
</feature_verification>

Each subagent receives only what it needs for its one feature:

<subagent_inputs>
- Model: `sonnet`
- Feature data (YAML, derived as below)
- Skill: content of `.github/agents/atlas-release-notes/write-feature-entry.skill.md`
- Terminology file: `/tmp/atlas-rn/terminology.txt`
- Anchor index: `/tmp/atlas-rn/all-anchors.txt`
</subagent_inputs>

Derive the skill inputs for each feature as follows:

<field_derivation>
| Skill field | How to derive |
|-------------|---------------|
| `name` | Feature name from Aha! or JIRA `summary` |
| `description` | Feature description from Aha! or JIRA `description` + `customfield_14266` (doc notes) |
| `maturity` | Infer from feature name, checking private before public: contains "Private Preview" → `private-preview`; contains "Public Preview" or "Preview" → `public-preview`; contains "General Availability" or "GA:" → `ga`; otherwise → `null`. Never collapse "Private Preview" into `public-preview` — that announces a closed program as open. |
| `doc_ref` | If the feature name or description clearly maps to a documented Atlas feature, provide the RST ref target. Otherwise `null`. |
| `doc_ref_label` | Display text for the ref link. Required if `doc_ref` is set, otherwise `null`. |
</field_derivation>

<skill_input>
feature:
  name: "{from data}"
  description: "{from data}"
  maturity: {ga|public-preview|private-preview|null}
  doc_ref: {ref target or null}
  doc_ref_label: {display text or null}
</skill_input>

Wait for all subagents to complete, then collect their `entry` outputs.

A subagent may return `entry: null` with a `reason` — a private preview, or a product name it could not confirm. That is a valid result, not a failure. Move the feature to the Flagged table with its reason and carry on. Do not re-run the subagent to force an entry out of it.

## Step 4: Group by Month

Collect all `entry` outputs from the parallel subagents and group them by
release month:

- **Aha! features:** use the feature's `release_date` field
- **JIRA features:** use the date encoded in the `fixVersion` (e.g.,
  `v20260325` → March 2026)

Each group becomes a separate monthly section. If the run spans multiple
months, each month is assembled and written independently in Step 6.

## Step 5: Assemble RST

Invoke `assemble-release-notes.skill.md` once per month group.

## Step 6: Update Changelog

1. Check whether `content/atlas/source/includes/changelog/atlas-{YYYY}.rst` exists.
   - If the file does not exist, create it with only the new monthly section as
     content, then append `.. last-run: {END_DATE}` as the final line.
   - If the file exists, read it and continue to step 2.
2. If a section for this month already exists, append new entries after the last
   existing bullet in that section. Otherwise insert a new section at the top of
   the file (before any existing month sections).
3. Update the last-run comment at the bottom of the file:
   - If `.. last-run:` already exists on the last line, replace it.
   - Otherwise append it as a new final line.
   ```bash
   # Remove existing last-run line if present, then append updated value
   sed -i '' '/^\.\. last-run:/d' content/atlas/source/includes/changelog/atlas-{YYYY}.rst
   echo ".. last-run: {END_DATE}" >> content/atlas/source/includes/changelog/atlas-{YYYY}.rst
   ```

</instructions>

<output_format>

After generating release notes, produce:

1. **Release notes RST** - Generated content in changelog
2. **Sign-off table** - One row per published entry, carrying the full entry text
3. **Flagged features** - Everything that failed either gate, with the reason
4. **Per-DRI messages** - One ready-to-send message per stakeholder, for Slack
5. **JIRA record** - Opening and closing comments for the tracking ticket

## Sign-off table

One row per entry that will publish. This is the writer's tracking table.

| # | Entry (full text) | DRI | Source | DRI source | Status |
|---|-------------------|-----|--------|------------|--------|
| 1 | {the complete entry, not a summary} | {name} | Aha! / CLOUDP-XXXXX | ticket / Aha! unconfirmed | Pending |

Carry the **full entry text**, not the feature name and not a summary. In one pass, every DRI shown the actual prose found something to correct, and none of the DRIs shown only a list of feature names did. The errors were there in both cases; only one format surfaced them.

Mark the `DRI source` column so the writer knows which contacts are trustworthy before spending a stakeholder's attention on the wrong person.

## Flagged features

| Feature | DRI | Gate failed | Reason | Recommendation |
|---------|-----|-------------|--------|----------------|

Include features that failed the shipped-status gate, the customer-impact gate, and any subagent that returned `entry: null`. Nothing is dropped silently.

## Per-DRI messages

Draft one message per DRI, ready to send with no editing. Each message:

- names the specific entries that DRI owns, quoting the **full published text** with substitutions resolved to plain English — a stakeholder should never be shown `{+Db-Coll-Restore+}` or `|iops|`
- asks a specific question where you are genuinely unsure, rather than a generic "does this look right?"
- states that you will publish as written absent a reply, so a silent DRI does not block the pass indefinitely
- links the PR, not the staging preview — Netlify previews expire while sign-off is still open

<slack_guidance>
Tell the writer to send these on Slack rather than as JIRA comments.

Sign-off moves faster in a DM. JIRA comments notify into a queue people triage in batches, and a stakeholder who has never reviewed a release note will not know what is being asked of them or how urgent it is. In one pass the substantive corrections all came from Slack threads, and one DRI asked whether the entries were even customer-facing — a question worth answering conversationally, not through ticket comments.

Keep JIRA for the record. Post the outcome to the ticket once sign-off closes, so the decisions are durable and searchable, but gather them on Slack.
</slack_guidance>

## JIRA record

Slack threads are not durable and are not searchable by anyone who was not in them. Once sign-off closes, post the outcome to the tracking ticket so there is a record of who approved what and why anything was pulled.

Produce two blocks:

**Opening comment**, posted when sign-off starts — the sign-off table with the full entry text and the DRI for each, so anyone can see what is in flight.

**Closing comment**, posted when the review ends:

| Section | Contents |
|---------|----------|
| Published | One row per entry: entry, DRI, and what the sign-off actually was |
| Corrections applied | One row per change made during review, and why |
| Pulled | One row per entry removed, DRI, and reason |
| Attribution notes | Any DRI that turned out to be wrong, and how the real owner was found |

Record the sign-off honestly. "Approved final wording", "approved from a feature list without seeing the prose", and "corrections applied, no reply to the final check" are different things, and the difference matters if the entry is questioned later. If you publish on a non-reply, say so and say that the DRI was told you would.

<jira_formatting>
Write these blocks in Markdown, not JIRA wiki markup, and keep the structure flat:

- Use tables, not bullet lists. The Atlassian MCP corrupts bold inside list items — `**Feature**` is stored as `**Feature*`, with the closing asterisk dropped. This happens regardless of whether you send wiki markup or Markdown.
- Avoid `*bold*` and `_italic_` in any list context.
- Underscores in identifiers get escaped: `customfield_12751` renders as `customfield\_12751`. Prefer names without underscores in prose, or accept it.

Verify the rendered result after posting. If it is mangled, edit the comment rather than posting a correction underneath.
</jira_formatting>

<dri_output_template>
## DRI Sign-off Required

| DRI | Entries | DRI source | Status |
|-----|---------|------------|--------|
| {name} | {count} | ticket / Aha! unconfirmed | Pending |

### {DRI Name}

Entries owned:

- {full entry text, substitutions resolved}

Message to send:

```
Hi {name} — I'm writing the Atlas release notes for the {version} pass,
covering {start} through {end}. Here's the entry for your work:

  {full entry text, substitutions resolved}

{a specific question, if you have one}

Let me know if anything's off, otherwise I'll publish as-is.

PR: {pr url}
```
</dri_output_template>

</output_format>

<validation_checklist>
- [ ] Every feature went through write-feature-entry skill
- [ ] All entries follow skill patterns
- [ ] No JIRA keys in output RST
- [ ] RST syntax valid
- [ ] snooty.toml constants used (no hardcoded AWS, Azure, GCP, MFA, IAM, KMS)
- [ ] Count in = count out
- [ ] No feature named "Private Preview" produced a published entry
- [ ] Every entry's product name was confirmed against the published docs, not taken from Aha!
- [ ] No entry names an implementation detail absent from the feature's documentation
- [ ] Both gates applied: shipped status and customer impact
- [ ] Every DRI resolved from a linked ticket, or explicitly marked unconfirmed
- [ ] Sign-off table carries full entry text, with substitutions resolved for the stakeholder
- [ ] Outcome recorded in the tracking ticket, with each sign-off described honestly
</validation_checklist>
