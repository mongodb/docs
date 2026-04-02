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
6. VERIFICATION CRITERIA IS THE ONLY FILTER - After fetching, apply only the defined verification criteria to determine RST inclusion. Do not invent additional filters.
7. ACCOUNT FOR ALL ITEMS - Every fetched item must appear in either the RST output or the Flagged table. Nothing is silently dropped.
</rules>

<prerequisites>
- Access to Aha! API (for features)
- Access to JIRA MCP (for JIRA features)
- Write access to docs-mongodb-internal repo
</prerequisites>

<instructions>

## Step 0: Resolve start_date

Read the last-run date from the bottom of the changelog file:

```bash
tail -n 5 content/atlas/source/includes/changelog/atlas-{YYYY}.rst \
  | grep "^\.\. last-run:" | awk '{print $2}'
```

- If a date is found, use it as `START_DATE`.
- If the file does not exist or the comment is absent, use the first day of the
  month derived from `end_date` (e.g., `2026-04-25` → `2026-04-01`).

## Step 0b: Load Terminology from snooty.toml

Build a compact `key=syntax` terminology file from `content/atlas/snooty.toml`:

```bash
mkdir -p /tmp/atlas-rn && python3 -c "
with open('content/atlas/snooty.toml') as f:
    content = f.read()
subs, consts, current = {}, {}, None
for line in content.splitlines():
    s = line.strip()
    if s == '[substitutions]': current = 'sub'
    elif s == '[constants]': current = 'const'
    elif s.startswith('['): current = None
    elif current and '=' in s and not s.startswith('#'):
        key = s.partition('=')[0].strip()
        if current == 'sub': subs[key] = f'|{key}|'
        else: consts[key] = '{+' + key + '+}'
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
After fetching, classify each feature using the verification criteria below.
Verified features become RST entries. Flagged features appear in the DRI table only.

<feature_verification>
- Verified (write RST entry): `risk_status = "Complete"` OR `status = "Shipped"` OR `status = "Ready to Ship"`
- Flagged (DRI table only, no RST entry): All others
</feature_verification>

DRI field: `assigned_to`

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

**Build the anchor index** — page-level anchors only (line ≤ 10), excluding
auto-generated command/steps/list includes:

```bash
grep -rn "^\.\. _" content/atlas/source/ \
  | grep -iv "includes/command\|includes/steps\|includes/list" \
  | awk -F: '$2+0 <= 10' \
  > /tmp/atlas-rn/all-anchors.txt
```

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
- Model: `haiku`
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
| `maturity` | Infer from feature name: contains "General Availability" or "GA:" → `ga`; contains "Preview" → `preview`; otherwise → `null` |
| `doc_ref` | If the feature name or description clearly maps to a documented Atlas feature, provide the RST ref target. Otherwise `null`. |
| `doc_ref_label` | Display text for the ref link. Required if `doc_ref` is set, otherwise `null`. |
</field_derivation>

<skill_input>
feature:
  name: "{from data}"
  description: "{from data}"
  maturity: {ga|preview|null}
  doc_ref: {ref target or null}
  doc_ref_label: {display text or null}
</skill_input>

Wait for all subagents to complete, then collect their `entry` outputs.

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
2. **All features with DRIs** - List ALL features (Aha! + JIRA) for SME confirmation
3. **Flagged features** - Aha! features not meeting verification criteria + Glean findings
4. **Complete DRI list for JIRA** - Formatted for copy/paste into tracking ticket

<dri_output_template>
## All Features - DRI Confirmation Required

### Aha! Features

#### Verified ✅
| Feature | Release Date | Status | DRI | Entry Summary |
|---------|--------------|--------|-----|---------------|

#### Flagged ⚠️
| Feature | Release Date | Status | Risk Status | DRI | Recommendation |
|---------|--------------|--------|-------------|-----|----------------|

### JIRA Features (Documentation Changes = Needed)

| JIRA Key | Feature | DRI | Assigned Team | Entry Summary |
|----------|---------|-----|---------------|---------------|

---

## Complete DRI List (for JIRA ticket)

> Note: The block below uses JIRA wiki markup. Paste it directly into a JIRA
> ticket comment — it will not render correctly in GitHub, Slack, or Markdown.

h3. DRI Sign-off Required

||DRI||Features||Source||Status||
|{name}|{features}|Aha!/JIRA|Pending|

h4. Features by DRI

* *{DRI Name}*
** {Feature} (Aha!)
** {Feature} (JIRA: CLOUDP-XXXXX)

cc: [~accountid:{id}]
</dri_output_template>

</output_format>

<validation_checklist>
- [ ] Every feature went through write-feature-entry skill
- [ ] All entries follow skill patterns
- [ ] No JIRA keys in output RST
- [ ] RST syntax valid
- [ ] snooty.toml constants used (no hardcoded AWS, Azure, GCP, MFA, IAM, KMS)
- [ ] Count in = count out
</validation_checklist>
