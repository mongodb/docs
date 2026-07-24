# Ops Manager Release Notes Flow

<description>
Generate a versioned patch release entry for Ops Manager by fetching improvements and bug fixes from Aha! and Jira, writing RST entries, and prepending the assembled block to the active changelog file.
</description>

<inputs>
version: string        # Ops Manager patch version (e.g., "8.0.25")
release_date: string   # YYYY-MM-DD format
</inputs>

<rules>
1. NO DIRECT WRITING - You cannot write release note entries yourself
2. SKILLS ARE MANDATORY - Every entry must go through a skill
3. YAML IN/OUT - Format input as YAML, capture output as YAML
4. PARALLEL ENTRY PROCESSING - Spawn one subagent per item simultaneously; do not process items sequentially
5. NO INFLUENCE FROM EXISTING CONTENT - Do not let existing changelog entries influence how you write new ones. Each entry must be written fresh from source data.
6. VERIFICATION CRITERIA IS THE ONLY FILTER - After fetching, apply only the defined verification criteria to determine RST inclusion. Do not invent additional filters.
7. ACCOUNT FOR ALL ITEMS - Every fetched item must appear in either the RST output or the Flagged table. Nothing is silently dropped.
8. NO JIRA KEYS IN RST - Never include JIRA keys (CLOUDP-*, BF-*) in any RST output.
</rules>

<prerequisites>
- AHA_API_TOKEN environment variable set
- Jira MCP access (for CLOUDP issues)
- `gh` CLI authenticated (for 10gen/ops-manager repo)
- Python 3.xx with `requests` package installed
- Write access to docs-mongodb-internal repo
</prerequisites>

<instructions>

## Step 0: Setup and Validation

Validate `version` format — must match `X.Y.Z` (e.g., `8.0.25`).

Derive the following values:
- `fix_version = ops-manager-{version}` (e.g., `ops-manager-8.0.25`)
- `major_minor = {X}.{Y}` (e.g., `8.0`)
- `changelog_file = content/ops-manager/upcoming/source/release-notes/changelogs/ops-manager/changelog-onprem-v{major_minor}.rst`
- `agent_changelog_file = content/ops-manager/upcoming/source/release-notes/changelogs/mongodb-agent/changelog-mongodb-agent-onprem-v{major_minor}.rst`

## Step 0b: Load Terminology from snooty.toml

Build a compact `key=syntax` terminology file from `content/ops-manager/upcoming/snooty.toml`:

```bash
mkdir -p /tmp/om-rn && python3 -c "
with open('content/ops-manager/upcoming/snooty.toml') as f:
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
" > /tmp/om-rn/terminology.txt
```

When writing entries, replace prose text that matches a key's meaning with its syntax token. Do not read `snooty.toml` directly.

## Step 1a: Fetch Aha! Features

Run the fetch script:

```bash
mkdir -p /tmp/om-rn && \
python3 .claude/agents/ops-manager-release-notes/fetch_aha_features.py \
  --cutoff-date {release_date} \
  --output /tmp/om-rn/features.json
```

The script returns all Ops Manager features with a Release target date on
or before `{release_date}`. After fetching, classify each feature using
the verification criteria below.

<feature_verification>
- Verified (write RST entry): `risk_status = "Complete"` OR `status = "Shipped"` OR `status = "Ready to Ship"`
- Flagged (DRI table only, no RST entry): All others
</feature_verification>

DRI field: `assigned_to`

## Step 1b: Fetch Jira Issues

Use the Jira MCP to run the following query. If it returns zero results, confirm the fix_version string matches exactly what is in Jira before proceeding. Do not continue with an empty result set.

<jql>
project = CLOUDP
AND fixVersion = "{fix_version}"
AND component not in (
  "Evergreen", "Infrastructure", "Testing", "Tests"
)
AND status in (Done, Closed, "Pending Release")
AND NOT summary ~ "Ops Manager {version} Release"
AND NOT summary ~ "Bump MongoDB Agent version to"
AND NOT summary ~ "Bump Ops Manager version to"
AND NOT summary ~ "Failing Test:"
</jql>

Fields to capture per result: `key`, `issuetype` (Story / Improvement / Bug / Task), `priority`, `summary`, `description`, `Release Notes` field value, `components`.

Split results by type:
- `issuetype in (Bug)` → bug list
- Everything else → improvement list

## Step 2: Fetch Database Tools Version

**Primary:** Use `gh` CLI to read `mongotools.version` from `10gen/ops-manager` on the `v{X.Y}` branch (e.g., `v8.0`):

```bash
gh api \
  "repos/10gen/ops-manager/contents/server/conf/conf-local.properties?ref=v{major_minor}" \
  --jq '.content' | base64 -d | grep "mongotools\.version"
```

**Fallback:** Jira search:
```jql
project = CLOUDP
AND fixVersion = "{fix_version}"
AND (summary ~ "mongotools" OR summary ~ "Database Tools")
```

If neither source confirms a version, set `db_tools_version = null` and flag for writer review.

## Step 3: Fetch MongoDB Agent Version

Read the top of `{agent_changelog_file}`. Look for an entry that cross-references this Ops Manager version.

- If found, extract `agent_version` from the anchor (e.g., `mongodb-108.0.25.XXXX-1`).
- If not found, set `agent_version = null` and note it as pending — the Agent changelog entry must be added separately.

## Step 4: Pre-processing

**Slim the Aha! JSON** — strip HTML, truncate descriptions, drop unused fields:

```bash
python3 -c "
import json, re, html as htmllib
with open('/tmp/om-rn/features.json') as f:
    data = json.load(f)
def clean(text):
    if not text: return ''
    text = re.sub(r'<[^>]+>', ' ', text)
    text = htmllib.unescape(text)
    return re.sub(r'\s+', ' ', text).strip()[:500]
slim = [{'name': f['name'], 'status': f['status'],
         'risk_status': f.get('risk_status',''),
         'assigned_to': f['assigned_to'],
         'feature_ref': f.get('feature_ref',''),
         'description': clean(f.get('description',''))}
        for f in data['features']]
with open('/tmp/om-rn/features-slim.json','w') as f:
    json.dump({'features': slim, 'stats': data.get('stats',{})}, f,
              indent=2)
"
```

**Build the anchor index** — page-level anchors only (line <= 10):

```bash
grep -rn "^\.\. _" \
  content/ops-manager/upcoming/source/ \
  | grep -iv "includes/command\|includes/steps\|includes/list" \
  | awk -F: '$2+0 <= 10' \
  > /tmp/om-rn/all-anchors.txt
```

## Step 4b: Check the changes for embargoed terms

Use Glean to fetch the Embargoed Features List from the internal wiki (https://wiki.corp.mongodb.com/pages/viewpage.action?pageId=560136334) and return every embargoed feature name and its aliases. The page is internal to MongoDB, so instruct the subagent to read it with Glean.

Scan the fetched items (Aha! features from `features-slim.json` and the Jira results) for any embargoed feature name or alias, matching case-insensitively and including aliases.

If any item matches an embargoed term, **stop before drafting**: report the matching term and the affected items to the writer, then ask how to proceed. Do not draft, include, or publish any release note that references an embargoed feature until the writer confirms the embargo is lifted.

If no item matches, continue to the next step.

## Step 5: Process Entries in Parallel

Classify all features from `features-slim.json` and split Jira results by type. Then spawn **one subagent per item simultaneously** — do not wait for one to finish before starting the next.

Each improvement subagent (Aha! verified feature OR Jira story/improvement/task):

<subagent_inputs_improvement>
- Model: `haiku`
- Item data (YAML)
- Skill: content of `.claude/agents/ops-manager-release-notes/write-improvement-entry.skill.md`
- Terminology file: `/tmp/om-rn/terminology.txt`
- Anchor index: `/tmp/om-rn/all-anchors.txt`
</subagent_inputs_improvement>

Each bug subagent:

<subagent_inputs_bug>
- Model: `haiku`
- Item data (YAML)
- Skill: content of `.claude/agents/ops-manager-release-notes/write-bug-entry.skill.md`
- Terminology file: `/tmp/om-rn/terminology.txt`
</subagent_inputs_bug>

Derive skill inputs for improvements:

<field_derivation_improvement>
| Skill field | How to derive |
|-------------|---------------|
| `summary` | Feature name from Aha! OR Jira `summary` |
| `release_notes_text` | Aha! description OR Jira `Release Notes` field |
| `doc_ref` | If the feature clearly maps to a documented OM page, provide the RST ref target. Otherwise `null`. |
| `maturity` | Infer from name: "General Availability" or "GA:" → `ga`; "Preview" → `preview`; otherwise `null` |
</field_derivation_improvement>

Derive skill inputs for bugs:

<field_derivation_bug>
| Skill field | How to derive |
|-------------|---------------|
| `key` | Jira key (reference only — never emitted in RST) |
| `summary` | Jira `summary` |
| `release_notes_text` | Jira `Release Notes` field |
| `doc_ref` | If fix relates to a documented OM feature, provide the RST ref target. Otherwise `null`. |
</field_derivation_bug>

Wait for all subagents to complete. Collect their `entry` outputs.

## Step 6: Synthesize Fixed Lines

The orchestrator (not subagents) synthesizes the two fixed lines for the Improvements section:

- **Agent version line** (second-to-last in Improvements):
  - If `agent_version` is resolved:
    ```
    - Updates the {+mdbagent+} to
      :ref:`{agent_version} <mongodb-{agent_version}>`.
    ```
  - If `agent_version` is null: omit line and flag for writer review.

- **Database tools line** (last in Improvements):
  - If `db_tools_version` is resolved:
    ```
    - Supports :dbtools:`MongoDB Database Tools {db_tools_version}
      </release-notes/dbtools-{db_tools_version}-changelog/>`.
    ```
  - If `db_tools_version` is null: omit line and flag for writer review.

## Step 7: Assemble RST Block

Invoke `assemble-release-entry.skill.md` with:

```yaml
version: "{version}"
release_date: "{release_date}"
improvement_entries:
  - <all collected improvement entries>
  - <agent version line if resolved>
  - <db tools line if resolved>
bug_entries:
  - <all collected bug entries>
```

## Step 8: Prepend to Changelog

1. Read `{changelog_file}`.
2. Find the first occurrence of `.. _opsmgr-server-` (the previous release anchor) at the start of a line.
3. Insert the new RST block immediately before that line, followed by a blank line.
4. Write the file back.

If `agent_version` was resolved and the entry does not yet exist at the top of `{agent_changelog_file}`, prepend this stub:

```rst
.. _mongodb-{agent_version}:

MongoDB Agent {agent_version}
-----------------------------

:ref:`Released with Ops Manager {version} on {release_date}
<opsmgr-server-{version}>`.

```

</instructions>

<output_format>

After generating and writing the release notes, produce:

1. **Written RST block** — the complete entry as written to disk.

2. **All items — DRI confirmation required**

### Aha! Features

#### Verified ✅
| Feature | Status | Risk Status | DRI | Entry Summary |
|---------|--------|-------------|-----|---------------|

#### Flagged ⚠️
| Feature | Status | Risk Status | DRI | Recommendation |
|---------|--------|-------------|-----|----------------|

### Jira Issues

| Jira Key | Type | Summary | DRI | Entry Summary |
|----------|------|---------|-----|---------------|

---

3. **Complete DRI list (for Jira ticket)**

> Note: The block below uses Jira wiki markup. Paste it directly into a Jira ticket comment.

h3. DRI Sign-off Required

||DRI||Items||Source||Status||
|{name}|{items}|Aha!/Jira|Pending|

h4. Items by DRI

* *{DRI Name}*
** {Feature} (Aha!)
** {Summary} (Jira: CLOUDP-XXXXX)

4. **Warnings** — explicit notices if:
   - MongoDB Agent version could not be confirmed
   - Database Tools version could not be confirmed
   - Jira query returned zero results

</output_format>

<validation_checklist>
- [ ] Every improvement went through write-improvement-entry skill
- [ ] Every bug went through write-bug-entry skill
- [ ] No Jira keys in output RST
- [ ] Agent version line is second-to-last in Improvements
- [ ] DB tools line is last in Improvements
- [ ] Bug Fixes section omitted if no qualifying bugs
- [ ] All lines wrapped at 72 characters
- [ ] RST anchor matches `.. _opsmgr-server-{version}:`
- [ ] snooty.toml constants used where applicable
- [ ] Count in = count out (all items accounted for)
</validation_checklist>
