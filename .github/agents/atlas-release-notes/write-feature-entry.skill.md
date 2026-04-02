# Skill: write-feature-entry

<description>
Transform a single feature into an RST release notes entry.
</description>

<input>
feature:
  name: string            # Feature name/title
  description: string     # Raw description from source system
  maturity: string|null   # "ga", "preview", or null
  doc_ref: string|null    # Optional: RST ref target (e.g., "atlas-vector-search")
  doc_ref_label: string|null  # Optional: Display text for ref
</input>

<output>
entry: string  # Complete RST entry starting with "- "
</output>

<terminology>
Use `/tmp/atlas-rn/terminology.txt`. Each line is `key=syntax`. Do not
re-read `snooty.toml`. When prose text matches a key's meaning, replace
it with the syntax token.
</terminology>

<instructions>

## Step 1: Select Starting Verb

Choose exactly ONE verb based on the feature type:

| Verb | Use When |
|------|----------|
| Adds | New capability, support for something, availability in new region |
| Introduces | Brand new concept, first appearance of a feature |
| Improves | Enhancement to existing functionality |
| Enables | Unlocking/allowing a previously unavailable action |
| Updates | Modification to existing behavior |
| Reduces | Decrease in cost, latency, or resource usage |
| Allows | Permitting users to do something new |
| Deprecates | Feature being phased out |
| Removes | Feature being eliminated |

## Step 2: Apply Maturity Prefix

- If `maturity: ga` → prefix with "General Availability: " or "Generally available: "
- If `maturity: preview` → prefix with "Public Preview: "
- If `maturity: null` → no prefix

## Step 3: Resolve doc_ref

If `doc_ref` is null, look up a matching anchor from the pre-built file:

1. Extract 1-3 keywords from the feature name (e.g., "snapshot distribution", "query profiler", "private endpoint")
2. Filter `/tmp/atlas-rn/all-anchors.txt` — do not re-run grep against the source tree:
   ```bash
   grep -i "{KEYWORD}" /tmp/atlas-rn/all-anchors.txt
   ```
3. From the results, select the most specific anchor that matches the documented feature — prefer page-level anchors (line 1–5 of a file) over section anchors
4. If a match is found, set `doc_ref` to the anchor name and `doc_ref_label` to a short plain-text label for the linked concept
5. If no confident match is found, leave `doc_ref` null — do not guess

## Step 4: Write the Entry

1. Start with "- " (dash space)
2. Add maturity prefix if applicable
3. Add selected verb
4. Write 1-2 sentences describing the customer benefit
5. Use present tense, active voice
6. If `doc_ref` provided, include `:ref:` link inline

## Step 5: Format Line Breaks

- Break lines at ~72 characters
- Continuation lines indent 2 spaces (align with text after "- ")

</instructions>

<rules>
- NO product area labels in parentheses
- NO internal references (JIRA, Aha!)
- NO implementation details - focus on customer benefit
- Use "you" to address the user when applicable
</rules>

<examples>

<example name="simple_feature_adds">
Input:
```yaml
feature:
  name: "SSE-KMS encryption for S3 log export"
  description: "Customers can now use their own KMS keys when exporting logs to S3"
  maturity: null
  doc_ref: "mongodb-logs-push"
  doc_ref_label: "Atlas logs to Amazon S3"
```

Output:
```yaml
entry: |
  - Adds support for SSE-KMS encryption when exporting
    :ref:`Atlas logs to Amazon S3 <mongodb-logs-push>`, allowing you to use your
    own AWS KMS keys for log encryption.
```
</example>

<example name="ga_feature">
Input:
```yaml
feature:
  name: "Lexical prefilters for Vector Search"
  description: "Lexical prefilters now GA, reduces computational load"
  maturity: ga
  doc_ref: "atlas-vector-search"
  doc_ref_label: "Atlas Vector Search"
```

Output:
```yaml
entry: |
  - General Availability: Adds support for lexical prefilters in
    :ref:`Atlas Vector Search <atlas-vector-search>`, enabling
    accelerated queries by reducing unnecessary computational load
    during query time.
```
</example>

<example name="preview_feature">
Input:
```yaml
feature:
  name: "Multi-select facets in Atlas Search"
  description: "Users can select multiple facet values to filter search results"
  maturity: preview
  doc_ref: "atlas-search"
  doc_ref_label: "Atlas Search"
```

Output:
```yaml
entry: |
  - Public Preview: Adds support for multi-select facets in
    :ref:`Atlas Search <atlas-search>`, enabling users to filter search
    results by selecting multiple facet values simultaneously.
```
</example>

<example name="introduces_new_concept">
Input:
```yaml
feature:
  name: "Index Performance Reports"
  description: "Email reports showing performance before/after index creation"
  maturity: null
  doc_ref: null
  doc_ref_label: null
```

Output:
```yaml
entry: |
  - Introduces Index Performance Reports that email users about
    performance before and after index creation, helping clarify the
    impact of indexing decisions.
```
</example>

<example name="improves_enhancement">
Input:
```yaml
feature:
  name: "Azure cluster performance improvements"
  description: "Better performance for large Azure clusters over 512GB"
  maturity: null
  doc_ref: null
  doc_ref_label: null
```

Output:
```yaml
entry: "- Improves performance of Azure clusters larger than 512 GB."
```
</example>

</examples>

