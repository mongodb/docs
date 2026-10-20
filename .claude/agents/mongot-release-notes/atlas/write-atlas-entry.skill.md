# write-atlas-entry

## Purpose

Write the customer-facing bullet text for one item in the MongoDB Search
and Vector Search changelog for features available in Atlas
(`content/atlas/source/includes/changelog/fts-vs-{YYYY}.rst`).

This skill is invoked once per item in `verified.yaml` by Step 6 of
`flow.md`. It receives a single YAML item block and returns the bullet
text that replaces the item's `description`.

## Input

A YAML item block from `verified.yaml`. Every item in that file has
already passed the review gate in Step 5 of `flow.md`, so do not re-check
review status. Do not run this skill on items from `normalized.yaml`.

```yaml
id: "<item id>"
type: feature|fix|compatibility|deprecation|operational
title: "<short title from the release>"
description: "<engineering description from the release or PR>"
product: search|vector_search
availability: both|atlas_only|enterprise|community
rollback_risk: false
aha_maturity: ga|preview|unknown
source_url: "<GitHub release or PR URL>"
```

If `product` is `unknown`, stop and return:

```
PRODUCT_REQUIRED: <id>
```

Do not write any RST in that case.

## Output format

One line of RST prose: the bullet text only.

- Do not add the leading `- `, the heading, or the `.. _fts...:` /
  `.. _avs...:` label. `write_changelog.py` adds them.
- Do not wrap lines. `write_changelog.py` wraps at 72 characters.

## Writing rules

### Opening verb

Start with a present-tense verb that matches the item type:

| `type` | Verbs used in existing entries |
|---|---|
| `feature` | "Adds", "Supports", "Introduces", "Increases", "Makes ... generally available" |
| `fix` | "Fixes an issue where ...", "Fixes an issue that caused ...", "Fixes a bug that caused ..." |
| `compatibility`, `operational` | "Improves", "Increases", or a plain description of the changed behavior |
| `deprecation` | "Deprecates", "Removes" |

### Content

- Describe what the customer can now do, or what behavior changed. Do
  not describe the code change.
- For a fix, state the symptom the customer could observe.
- When `aha_maturity` is `preview`, write "Adds preview support for
  ...". When it is `ga` for a feature that was previously in preview,
  write "Makes support for ... generally available."
- Keep the bullet to one or two sentences.
- Follow `.github/prompts/style-guide.prompt.md`.

### Links and markup

- Link to documented features with `:ref:` targets that already exist in `content/atlas/source/`, `content/search/source/`, or `content/vector-search/source/`. The Atlas build resolves `search` and `vector-search` labels through the published `objects.inv` inventories listed in `content/atlas/snooty.toml`, so the target page must already be published. Search for the target before using it. If you cannot find one, use plain text and tell the operator.
- Use `:pipeline:` for aggregation stages, e.g.
  `` :pipeline:`$search` ``, `` :pipeline:`$vectorSearch` ``.
- Use double backticks for option names and values, e.g.
  ``` ``indexingMethod`` ```.
- Use the substitutions that existing entries use (`|fts|`, `{+avs+}`,
  `|service|`, `|voyage|`). Do not expand them.

### Rollback risk

If `rollback_risk` is `true`, do not add a `.. warning::` admonition or
rollback text to the bullet. Tell the operator that the item has
rollback risk. Step 8 of `flow.md` reports the resulting
`check-output` failure.

## Examples

These examples are existing entries in `fts-vs-2026.rst`.

Input:
```yaml
type: feature
title: "Add doubleMetaphone token filter"
product: search
aha_maturity: ga
```

Output:
```rst
Adds :ref:`doubleMetaphone <doubleMetaphone-tf-ref>` token filter.
```

Input:
```yaml
type: feature
title: "Flat index support for vector search"
product: vector_search
aha_maturity: preview
```

Output:
```rst
Adds preview support for :ref:`flat indexes <avs-vector-index-method>` in {+avs+} through the ``flat`` value for the ``indexingMethod`` option.
```

Fix pattern from earlier entries:

```rst
Fixes an issue that caused Search Nodes to crash when disk was full.
```

## Do not

- Do not include Jira keys, PR numbers, commit hashes, or internal repo
  links.
- Do not include version numbers. Atlas entries are dated, not
  versioned.
- Do not create new `:ref:` labels.
- Do not restate the title verbatim when it uses engineering wording.
