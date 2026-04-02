# Skill: fetch-aha-features

<description>
Fetch and filter Aha! features for Atlas release notes within a date range.
This skill wraps the `fetch_aha_features.py` script.
</description>

<input>
start_date: string    # YYYY-MM-DD format
end_date: string      # YYYY-MM-DD format
output_path: string   # Path to write JSON output (e.g., /tmp/atlas-rn/features.json)
</input>

<output>
JSON file at output_path containing:
```json
{
  "features": [
    {
      "name": "Feature name",
      "product_area": "Atlas Clusters",
      "status": "Shipped",
      "release_date": "2026-03-04",
      "assigned_to": "John Doe",
      "jira_url": "https://jira.mongodb.org/browse/CLOUDP-12345",
      "feature_ref": "ATLDEDICAT-286",
      "description": "Full description from Aha!",
      "risk_status": "Complete"
    }
  ],
  "stats": {
    "total": 150,
    "date_excluded": 120,
    "product_area_excluded": 10,
    "included": 20
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
python .github/agents/atlas-release-notes/fetch_aha_features.py \
  --start-date {START_DATE} \
  --end-date {END_DATE} \
  --output {OUTPUT_PATH}
```

## Step 2: Verify Output

The script will:
1. Fetch all features from the Aha! pivot table
2. Filter by date range (release_date between start and end)
3. Exclude features from non-Atlas product areas
4. Fetch full descriptions and risk_status for each feature
5. Write JSON to output path

## Step 3: Review Stats

Check stderr output for filtering stats:
- Total features fetched
- Excluded by date range
- Excluded by product area
- Final count included

</instructions>

<rules>
- Script excludes these product areas automatically:
  - Drivers/Client Libraries
  - MongoDB University
  - Documentation
  - Backups (Ops/Cloud Manager)
- Features are filtered by `release_date` field from Aha!
- Full descriptions are fetched via individual API calls (may take time)
</rules>

<verification_criteria>
After fetching, verify each feature's readiness:

| Criteria | Ready to Include | Flag for Review |
|----------|------------------|-----------------|
| risk_status = "Complete" | ✅ | |
| status = "Shipped" | ✅ | |
| status = "Ready to Ship" | ✅ | |
| All others | | ⚠️ |
</verification_criteria>

<example name="fetch_march_features">
Command:
```bash
python .github/agents/atlas-release-notes/fetch_aha_features.py \
  --start-date 2026-02-25 \
  --end-date 2026-03-05 \
  --output /tmp/atlas-rn/features.json
```

Output (stderr):
```
Fetching Aha! features for 2026-02-25 to 2026-03-05...
Fetched page 1/3 (50 features)
Fetched page 2/3 (50 features)
Fetched page 3/3 (42 features)
Total features fetched: 142

=== Filtering Stats ===
Total: 142
Excluded by date: 115
Excluded by product area: 7
Included: 20

Fetching details for 20 features...
  [1/20] Fetching ATLDEDICAT-286...
  ...

Written to /tmp/atlas-rn/features.json
```
</example>

