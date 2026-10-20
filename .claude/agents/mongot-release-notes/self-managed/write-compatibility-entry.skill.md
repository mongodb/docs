# write-compatibility-entry

## Purpose

Write a single RST list-table row for a compatibility note, breaking
change, rollback warning, or deprecation in the self-managed Search
(mongot) release notes include file.

This skill covers items with `type: compatibility`, `type: deprecation`,
or `type: operational`. It is invoked by the `flow.md` orchestrator
whenever the normalizer detects on-disk format changes, reindex
requirements, breaking configuration changes, or removals.

## Input

The orchestrator passes `version` (the current release, e.g. `1.71.0`)
and a YAML item block from `verified.yaml`. Every item in that file has
already passed the review gate in Step 3 of `flow.md`, so do not re-check
review status. Ignore `requires_manual_review`, `review_reasons`, and
`review_decision` if present; they record the review, not the item's
current state. The item has the following fields:

```yaml
type: compatibility|deprecation|operational
title: "<short descriptive title>"
description: "<full description>"
source_url: "<GitHub release URL>"
source_kind: github_release
availability: both|enterprise
rollback_risk: true|false
aha_maturity: ga|preview|unknown
```

## Output format

A single RST list-table row with three cells:

1. **Description cell** — bold title, prose, rollback/reindex warning
   (when applicable), version tag.
2. **Community Edition cell** — `|checkmark|` or empty.
3. **Enterprise Advanced cell** — `|checkmark|` or empty.

```rst
   * - **{BOLD_TITLE}** {PROSE_DESCRIPTION}
       {ROLLBACK_WARNING_IF_REQUIRED}
       {VERSION_TAG}
     - |checkmark|
     - |checkmark|
```

## Writing rules

### Title

- Noun phrase describing the change, not an action verb.
- Maximum 80 characters.
- Include the affected component or config key when it helps orient
  the operator (e.g., `**syncSource.replicaSet.x509 authentication
  restructured.**`).

### Prose description

- One to four sentences.
- For breaking config changes: describe what the operator must do
  before or after upgrading. Use active voice and imperative mood:
  "Update your configuration file to use the new structure before
  restarting mongot."
- For deprecations: name what is removed, when it was deprecated, and
  what replaces it (if applicable).
- For operational changes: describe the operator action required and
  its effect.
- Customer-facing only. No ticket IDs or commit hashes.
- Wrap at 72 characters; continuation lines indented 7 spaces.

### Rollback / reindex warning (mandatory when rollback_risk is true)

When `rollback_risk` is `true`, you MUST add this warning block after
the prose and before the version tag, indented 7 spaces, with a blank
line before and after it:

```rst
       .. warning::

          Rolling back to a prior mongot version after upgrading
          requires re-indexing affected search indexes.
```

Use this exact text. Do not add commands or other recovery steps.

### Version tag

- `type: compatibility` or `type: operational`: use
  `*Introduced in v{VERSION}.*`
- `type: deprecation`: use `*Deprecated in v{VERSION}.*`
- Place on its own line after the warning block (or after prose if
  no warning).

### Availability cells

| `availability` value | Community cell | Enterprise cell |
|---|---|---|
| `both` | `\|checkmark\|` | `\|checkmark\|` |
| `enterprise` | *(blank)* | `\|checkmark\|` |
| `community` | `\|checkmark\|` | *(blank)* |

When `availability` is `enterprise`, start the prose, after the bold
title, with `**Enterprise Only.** `.

## Example output — breaking config change with rollback risk

Input:
```yaml
type: compatibility
title: "Authentication restructured into scramAuth and x509 blocks"
description: "The sync-source authentication config now uses explicit scramAuth and x509 sub-blocks. Existing configurations must be migrated to the new structure before restarting mongot."
availability: both
rollback_risk: true
```

Output:
```rst
   * - **Authentication restructured into** ``scramAuth`` **and**
       ``x509`` **blocks.** The sync-source authentication config
       now uses explicit ``scramAuth`` (username/password) and
       ``x509`` (certificate) sub-blocks. Update your configuration
       file to use the new structure before restarting ``mongot``.

       .. warning::

          Rolling back to a prior mongot version after upgrading
          requires re-indexing affected search indexes.

       *Introduced in v1.71.0.*
     - |checkmark|
     - |checkmark|
```

## Example output — deprecation, no rollback risk

Input:
```yaml
type: deprecation
title: "replicaSet.readPreference field removed"
description: "The deprecated replicaSet.readPreference field has been removed. Use syncSource.replicationReader.readPreference instead."
availability: both
rollback_risk: false
```

Output:
```rst
   * - **replicaSet.readPreference field removed.** ``mongot`` no
       longer accepts the deprecated ``replicaSet.readPreference``
       field. Use ``syncSource.replicationReader.readPreference``
       instead.
       *Deprecated in v1.71.0.*
     - |checkmark|
     - |checkmark|
```

## Do not

- Do not omit the rollback warning when `rollback_risk` is `true`.
  This is a hard requirement for on-disk format changes.
- Do not use passive voice to hide the operator action required
  ("the field was removed" → "``mongot`` no longer accepts the field.
  Update your configuration to use ...").
- Do not write the `.. list-table::` directive or header rows.
- Do not add section headings.
- Do not include internal ticket IDs or PR numbers.
