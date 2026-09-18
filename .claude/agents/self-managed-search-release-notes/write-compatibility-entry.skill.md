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

A YAML block with the following fields:

```yaml
type: compatibility|deprecation|operational
title: "<short descriptive title>"
description: "<full description>"
source_url: "<GitHub release URL>"
source_kind: github_release
availability: both|enterprise
rollback_risk: true|false
aha_maturity: ga|preview|unknown
requires_manual_review: false
```

If `requires_manual_review` is `true`, stop and return:

```
REVIEW_REQUIRED: <title>
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
  before or after upgrading. Use imperative mood:
  "Update your configuration file to use the new structure before
  restarting mongot."
- For deprecations: name what is removed, when it was deprecated, and
  what replaces it (if applicable).
- For operational changes: describe the operator action required and
  its effect.
- Customer-facing only. No ticket IDs or commit hashes.
- Wrap at 72 characters; continuation lines indented 7 spaces.

### Rollback / reindex warning (mandatory when rollback_risk is true)

When `rollback_risk` is `true`, you MUST include a warning admonition
block immediately after the prose description and before the version
tag:

```rst
       .. warning::

          Rolling back to a prior mongot version after upgrading
          requires re-indexing all affected search indexes. Run
          ``db.collection.dropSearchIndex()`` and recreate the
          index after rollback.
```

Indent the `.. warning::` block by 7 spaces to align it inside the
list-table cell.

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

When `availability` is `enterprise`, prepend the prose with
`**Enterprise Only.** `.

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
       ``x509`` (certificate) sub-blocks. Existing configurations
       must be migrated to the new structure before restarting
       ``mongot``.

       .. warning::

          Rolling back to a prior mongot version after upgrading
          requires re-indexing all affected search indexes. Run
          ``db.collection.dropSearchIndex()`` and recreate the
          index after rollback.

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
   * - **replicaSet.readPreference field removed.** The deprecated
       ``replicaSet.readPreference`` field has been removed. Use
       ``syncSource.replicationReader.readPreference`` instead.
       *Deprecated in v1.71.0.*
     - |checkmark|
     - |checkmark|
```

## Do not

- Do not omit the rollback warning when `rollback_risk` is `true`.
  This is a hard requirement for on-disk format changes.
- Do not use passive voice to hide the operator action required
  ("the field was removed" → "the field has been removed and you
  must update your configuration").
- Do not write the `.. list-table::` directive or header rows.
- Do not add section headings.
- Do not include internal ticket IDs or PR numbers.
