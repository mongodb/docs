# Skill: write-improvement-entry

<description>
Transform a single Ops Manager improvement — from an Aha! feature or a Jira story/improvement/task — into one RST release notes bullet.
</description>

<input>
improvement:
  summary: string             # Feature title or Jira summary
  release_notes_text: string  # Aha! description or Jira Release Notes field value
  doc_ref: string|null        # Optional: RST ref target
  doc_ref_label: string|null  # Optional: Display text for ref link
  maturity: string|null       # "ga", "preview", or null
</input>

<output>
entry: string  # Complete RST entry starting with "- "
</output>

<terminology>
Use `/tmp/om-rn/terminology.txt`. Each line is `key=syntax`. Do not re-read `snooty.toml`. When prose text matches a key's meaning, replace it with the syntax token.

Key tokens for Ops Manager content:
- `onprem` → `|onprem|` (renders as "Ops Manager")
- `mdbagent` → `{+mdbagent+}` (renders as "MongoDB Agent")
- `aws` → `|aws|`
- `azure` → `|azure|`
- `gcp` → `|gcp|`
- `bic-short` → `|bic-short|` (renders as "BI Connector")
</terminology>

<instructions>

## Step 1: Select Starting Verb

Choose exactly ONE verb based on the improvement type:

| Verb | Use When |
|------|----------|
| Adds | New capability, new support, availability in new platform |
| Introduces | Brand new concept, first appearance of a feature |
| Improves | Enhancement to existing functionality |
| Enables | Unlocking a previously unavailable action |
| Updates | Modification to existing behavior or version bump |
| Reduces | Decrease in latency, resource usage, or operational burden |
| Allows | Permitting users to do something new |
| Deprecates | Feature being phased out |
| Removes | Feature being eliminated |
| Clarifies | UI or documentation wording correction |
| Raises | Minimum version or threshold change |

## Step 2: Apply Maturity Prefix

- If `maturity: ga` → prefix entry with "General Availability: "
- If `maturity: preview` → append " (Public Preview)" at end of first sentence, before any `:ref:` link context
- If `maturity: null` → no prefix

## Step 3: Resolve doc_ref

If `doc_ref` is null, check whether the feature maps to a documented Ops Manager page by filtering the pre-built anchor index:

```bash
grep -i "{KEYWORD}" /tmp/om-rn/all-anchors.txt
```

Prefer page-level anchors (line 1–5 of the file). If no confident match exists, leave `doc_ref` null — do not guess.

## Step 4: Write the Entry

1. Start with "- " (dash space)
2. Add maturity prefix if applicable
3. Add the selected verb
4. Write 1–2 sentences describing the user benefit
5. Use present tense, active voice
6. Use `|onprem|` instead of "Ops Manager" in prose
7. If `doc_ref` provided, include `:ref:` link inline

## Step 5: Format Line Breaks

- Break lines at 72 characters
- Continuation lines indent 2 spaces (align with text after "- ")

</instructions>

<rules>
- NO Jira keys (CLOUDP-*, BF-*) in output
- NO internal team names or system identifiers
- NO product area labels in parentheses
- Focus on user-visible behavior and benefit
- Use `|onprem|` for "Ops Manager" in RST prose
- Use `{+mdbagent+}` for "MongoDB Agent"
</rules>

<examples>

<example name="simple_improvement">
Input:
```yaml
improvement:
  summary: "Add support for RHEL 9 on ppc64le"
  release_notes_text: >
    Ops Manager UI now supports MongoDB deployments on RHEL 9
    (ppc64le architecture).
  doc_ref: null
  doc_ref_label: null
  maturity: null
```

Output:
```yaml
entry: |
  - Adds support for MongoDB on RHEL 9 (``ppc64le``) in the
    |onprem| UI.
```
</example>

<example name="improvement_with_doc_ref">
Input:
```yaml
improvement:
  summary: "OAuth 2.0 client credentials for webhook alerts"
  release_notes_text: >
    Ops Manager now supports OAuth 2.0 client credentials
    authentication for webhook alert notifications. Ops Manager
    automatically fetches, attaches, and refreshes short-lived
    bearer tokens for webhook deliveries.
  doc_ref: "webhook-alert-notification"
  doc_ref_label: "webhook alert notifications"
  maturity: null
```

Output:
```yaml
entry: |
  - Adds OAuth 2.0 client credentials authentication for
    :ref:`webhook alert notifications
    <webhook-alert-notification>`. |onprem| automatically
    fetches, attaches, and refreshes short-lived bearer tokens
    for webhook deliveries.
```
</example>

<example name="ga_feature">
Input:
```yaml
improvement:
  summary: "Search Nodes GA in Ops Manager"
  release_notes_text: >
    Search Nodes support is now generally available in Ops Manager,
    enabling dedicated search infrastructure for Atlas Search workloads.
  doc_ref: "om-search-nodes"
  doc_ref_label: "Search Nodes"
  maturity: ga
```

Output:
```yaml
entry: |
  - General Availability: Adds :ref:`Search Nodes <om-search-nodes>`
    support in |onprem|, enabling dedicated search infrastructure
    for Atlas Search workloads.
```
</example>

<example name="clarification_improvement">
Input:
```yaml
improvement:
  summary: "Clarify write concern description in UI"
  release_notes_text: >
    The write concern description in the Ops Manager UI has been
    updated to clarify that the default write concern applies only
    to replica sets and sharded clusters.
  doc_ref: null
  doc_ref_label: null
  maturity: null
```

Output:
```yaml
entry: |
  - Clarifies the write concern description in the |onprem| UI
    to note that the default write concern applies only to replica
    sets and sharded clusters.
```
</example>

<example name="raises_minimum_version">
Input:
```yaml
improvement:
  summary: "Raise minimum supported MongoDB Agent version to 107.0.16"
  release_notes_text: >
    Raises the minimum supported MongoDB Agent version to
    107.0.16.8756 to prevent patch failures caused by missing S3
    artifacts.
  doc_ref: null
  doc_ref_label: null
  maturity: null
```

Output:
```yaml
entry: |
  - Raises the oldest supported {+mdbagent+} version to
    107.0.16.8756 to prevent patch failures caused by missing
    S3 artifacts.
```
</example>

</examples>
