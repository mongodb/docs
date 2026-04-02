# Skill: write-bug-entry

<description>
Transform a single bug fix into an RST release notes entry.
</description>

<input>
bug:
  key: string             # JIRA key (for reference only - DO NOT include in output)
  summary: string         # Bug summary from JIRA
  description: string     # Bug description/context
  doc_ref: string|null    # Optional: RST ref target if fix relates to documented feature
  doc_ref_label: string|null  # Optional: Display text for ref
</input>

<output>
entry: string  # Complete RST entry starting with "- Fixes"
</output>

<terminology>
Use RST source constants and substitutions from `content/atlas/snooty.toml`.

- Constants: `{+constant-name+}` syntax
- Substitutions: `|substitution-name|` syntax

Read the `[constants]` and `[substitutions]` sections to find available replacements.
Always prefer substitutions over hardcoded product names for consistency.
</terminology>

<instructions>

## Step 1: Identify User Impact

From the summary and description, determine:
- What problem did users experience?
- What was the visible symptom?

Focus on user-facing impact, NOT internal implementation.

## Step 2: Write the Entry

1. Start with "- Fixes an issue where " (ALWAYS use this exact phrase)
2. Describe what went wrong from the user's perspective
3. Optionally add context about the impact
4. If `doc_ref` provided, include `:ref:` link inline where natural

## Step 3: Format Line Breaks

- Break lines at ~72 characters
- Continuation lines indent 2 spaces

</instructions>

<rules>
- NEVER include JIRA keys (CLOUDP-*, HELP-*) in output
- NEVER include internal team names or system names
- ALWAYS start with "Fixes an issue where"
- Focus on symptom, not cause
- Use past tense for what was broken ("did not display" not "does not display")
</rules>

<examples>

<example name="ui_bug">
Input:
```yaml
bug:
  key: "CLOUDP-12345"
  summary: "Cluster footer banner does not show missing payment method"
  description: "The banner should display when payment method is missing"
  doc_ref: null
  doc_ref_label: null
```

Output:
```yaml
entry: |
  - Fixes an issue where the cluster footer banner did not correctly
    display the missing payment method message, blocking cluster
    creation without clear feedback.
```
</example>

<example name="bug_with_doc_reference">
Input:
```yaml
bug:
  key: "CLOUDP-67890"
  summary: "ASP connections in failed state block deployment planning"
  description: "Failed stream processing connections prevent other deployments"
  doc_ref: "atlas-sp"
  doc_ref_label: "Atlas Stream Processing"
```

Output:
```yaml
entry: |
  - Fixes an issue where :ref:`Atlas Stream Processing <atlas-sp>`
    connections in a failed state could block deployment planning for
    other connections.
```
</example>

<example name="authentication_bug">
Input:
```yaml
bug:
  key: "CLOUDP-11111"
  summary: "MFA setup times out on Safari iOS"
  description: "Users on Safari iOS cannot complete MFA enrollment"
  doc_ref: null
  doc_ref_label: null
```

Output:
```yaml
entry: |
  - Fixes an issue where MFA setup could time out on Safari iOS,
    preventing users from completing multi-factor authentication
    enrollment.
```
</example>

<example name="integration_bug">
Input:
```yaml
bug:
  key: "CLOUDP-22222"
  summary: "Prometheus PrivateLink returns 401 for some targets"
  description: "Scraping metrics fails with 401 errors for certain targets"
  doc_ref: "third-party-integrations"
  doc_ref_label: "Prometheus integration"
```

Output:
```yaml
entry: |
  - Fixes an issue where the :ref:`Prometheus integration
    <third-party-integrations>` with AWS PrivateLink returned
    401 errors when scraping metrics for certain targets.
```
</example>

<example name="short_bug_fix">
Input:
```yaml
bug:
  key: "CLOUDP-33333"
  summary: "Search metric chart info button goes to error page"
  description: "Clicking info navigates to error instead of help"
  doc_ref: null
  doc_ref_label: null
```

Output:
```yaml
entry: |
  - Fixes an issue where clicking the info button on Search metric
    charts navigated to an error page instead of displaying help
    information.
```
</example>

</examples>

