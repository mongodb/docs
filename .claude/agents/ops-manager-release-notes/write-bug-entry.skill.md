# Skill: write-bug-entry

<description>
Transform a single Ops Manager bug fix into one RST release notes bullet.
</description>

<input>
bug:
  key: string                  # Jira key (reference only — NEVER emit)
  summary: string              # Bug summary from Jira
  release_notes_text: string   # Jira Release Notes field value
  doc_ref: string|null         # Optional: RST ref target if fix relates to a documented feature
  doc_ref_label: string|null   # Optional: Display text for ref
</input>

<output>
entry: string  # Complete RST entry starting with "- Fixes"
</output>

<terminology>
Use `/tmp/om-rn/terminology.txt`. Each line is `key=syntax`. Do not re-read `snooty.toml`. When prose text matches a key's meaning, replace it with the syntax token.

Key tokens for Ops Manager content:
- `onprem` → `|onprem|` (renders as "Ops Manager")
- `mdbagent` → `{+mdbagent+}` (renders as "MongoDB Agent")
- `aws` → `|aws|`
- `azure` → `|azure|`
- `gcp` → `|gcp|`
</terminology>

<instructions>

## Step 1: Identify User Impact

From the `release_notes_text` and `summary`, determine:
- What problem did users experience?
- What was the visible symptom?

Prefer the `release_notes_text` field over the summary — it is written by the engineer specifically for documentation. Use the `summary` only as fallback context.

Focus on user-facing impact, NOT internal implementation details.

## Step 2: Write the Entry

1. Start with "- Fixes an issue where " (ALWAYS this exact phrase)
2. Describe what went wrong from the user's perspective
3. Optionally add context about the impact or affected component
4. If `doc_ref` provided, include `:ref:` link inline where natural
5. Use `|onprem|` instead of "Ops Manager" in prose

## Step 3: Format Line Breaks

- Break lines at 72 characters
- Continuation lines indent 2 spaces

</instructions>

<rules>
- NEVER include Jira keys (CLOUDP-*, BF-*, HELP-*) in output
- NEVER include internal team names or system names
- ALWAYS start with "Fixes an issue where"
- Focus on symptom, not root cause
- Use past tense for what was broken ("did not display" not "does not display")
- Use `|onprem|` for "Ops Manager" in prose
</rules>

<examples>

<example name="api_error_bug">
Input:
```yaml
bug:
  key: "CLOUDP-12345"
  summary: "Backup rollback returns HTTP 500 on cluster with no backup"
  release_notes_text: >
    Ops Manager could return an internal server error (HTTP 500)
    for a backup rollback request on a cluster with no active backup
    status, such as a terminated cluster. Ops Manager now returns a
    clear JOB_NOT_FOUND response.
  doc_ref: null
  doc_ref_label: null
```

Output:
```yaml
entry: |
  - Fixes an issue where |onprem| could return an internal server
    error (HTTP 500) for a backup rollback request on a cluster
    with no active backup status, such as a terminated cluster.
    |onprem| now returns a clear ``JOB_NOT_FOUND`` response.
```
</example>

<example name="ui_validation_bug">
Input:
```yaml
bug:
  key: "CLOUDP-67890"
  summary: "UI allows setting proxy username without password"
  release_notes_text: >
    The Ops Manager UI allowed setting a proxy username without a
    password, or a password without a username, producing an
    incomplete proxy configuration.
  doc_ref: null
  doc_ref_label: null
```

Output:
```yaml
entry: |
  - Fixes an issue where the |onprem| UI allowed setting a proxy
    username without a password, or a password without a username,
    producing an incomplete proxy configuration.
```
</example>

<example name="bug_with_doc_ref">
Input:
```yaml
bug:
  key: "CLOUDP-11111"
  summary: "Agent automation fails on MongoDB 7.0 FCV mismatch"
  release_notes_text: >
    Automation could fail silently when the Feature Compatibility
    Version differed from the MongoDB binary version during an
    upgrade, leaving deployments in a partially upgraded state.
  doc_ref: "automation-agent-overview"
  doc_ref_label: "Automation Agent"
```

Output:
```yaml
entry: |
  - Fixes an issue where the :ref:`Automation Agent
    <automation-agent-overview>` could fail silently when the
    Feature Compatibility Version differed from the MongoDB binary
    version during an upgrade, leaving deployments in a partially
    upgraded state.
```
</example>

<example name="short_bug_fix">
Input:
```yaml
bug:
  key: "CLOUDP-22222"
  summary: "gen.key validation runs after migration starts"
  release_notes_text: >
    Ops Manager ran gen.key validation after database migrations
    began rather than before, which could allow an incorrect key
    to trigger unintended migrations.
  doc_ref: null
  doc_ref_label: null
```

Output:
```yaml
entry: |
  - Fixes an issue where |onprem| validated the ``gen.key`` after
    database migrations began rather than before, which could
    allow an incorrect key to trigger unintended migrations.
```
</example>

</examples>
