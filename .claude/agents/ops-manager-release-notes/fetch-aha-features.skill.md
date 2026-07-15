# Skill: fetch-aha-features (Ops Manager)

<description>
Fetch and filter Aha! features for Ops Manager release notes scheduled on
or before a given release date. This skill wraps `fetch_aha_features.py`.
</description>

<input>
cutoff_date: string   # Release date in YYYY-MM-DD format (e.g., "2026-07-09")
output_path: string   # Path to write JSON output (e.g., /tmp/om-rn/features.json)
</input>

<output>
JSON file at output_path containing:
```json
{
  "features": [
    {
      "name": "Feature name",
      "product_area": "Ops Manager",
      "status": "Shipped",
      "release_date": "2026-07-15",
      "assigned_to": "Jane Doe",
      "jira_url": "https://jira.mongodb.org/browse/CLOUDP-12345",
      "feature_ref": "OPSMGR-123",
      "description": "Full description from Aha!",
      "risk_status": "Complete"
    }
  ],
  "stats": {
    "total": 150,
    "product_area_excluded": 140,
    "version_excluded": 5,
    "included": 5
  }
}
```
</output>

<prerequisites>
- `AHA_API_TOKEN` environment variable set
- Python 3.x with `requests` library installed
</prerequisites>

<instructions>

## Step 1: Execute the Script

```bash
mkdir -p /tmp/om-rn && \
python3 .claude/agents/ops-manager-release-notes/fetch_aha_features.py \
  --cutoff-date {CUTOFF_DATE} \
  --output {OUTPUT_PATH}
```

## Step 2: Verify Output

The script will:
1. Fetch all features from the Aha! pivot table
2. Filter by `INCLUDED_PRODUCT_AREAS` (Ops Manager product areas only)
3. Filter by date — Release target date must be on or before `{CUTOFF_DATE}`
4. Fetch full descriptions and risk_status for each passing feature
5. Write JSON to output path

## Step 3: Review Stats

Check stderr output for filtering stats:
- Total rows fetched from pivot
- Excluded by product area (non-OM areas)
- Excluded by version mismatch
- Final count included

## Step 4: Enumerate Product Areas (one-time setup)

If the included list in `fetch_aha_features.py` has never been verified, run:

```bash
python .claude/agents/ops-manager-release-notes/fetch_aha_features.py \
  --list-product-areas
```

Review the printed list with the writer or PM to confirm which values correspond to Ops Manager, then update `INCLUDED_PRODUCT_AREAS` in the script.

</instructions>

<rules>
- Script uses an include-list filter (inverse of Atlas exclude-list)
- Only features whose product area appears in `INCLUDED_PRODUCT_AREAS` pass through
- Feature's Release target date must be on or before the cutoff date
- Features with no release date are excluded
- Full descriptions are fetched via individual API calls (may be slow)
</rules>

<verification_criteria>
After fetching, classify each feature:

| Criteria | Include in RST | Flag only |
|----------|---------------|-----------|
| risk_status = "Complete" | ✅ | |
| status = "Shipped" | ✅ | |
| status = "Ready to Ship" | ✅ | |
| All others | | ⚠️ |
</verification_criteria>

<example name="fetch_8.0.25_features">
Command:
```bash
python3 .claude/agents/ops-manager-release-notes/fetch_aha_features.py \
  --cutoff-date 2026-07-09 \
  --output /tmp/om-rn/features.json
```

Output (stderr):
```
Fetching Aha! features with release date <= 2026-07-09...
Fetched page 1/5 (100 features)
Fetched page 2/5 (100 features)
Fetched page 3/5 (100 features)
Fetched page 4/5 (100 features)
Fetched page 5/5 (70 features)
Total rows fetched: 470

=== Filtering Stats ===
Total: 470
Excluded by product area: 456
Excluded by date (after 2026-07-09 or missing): 9
Included: 5

Fetching details for 5 features...
  [1/5] Fetching OPSMGR-101...
  ...

Written to /tmp/om-rn/features.json
```
</example>
