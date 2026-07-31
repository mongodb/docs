<!--
TEMPLATE: Docs Scope (agent-ready)
Companion to the Documentation Plan. This is the CONCRETE spec the Feature Planner
Agent decomposes into a task list. The Plan gives context. The Scope gives
the work.

PARSING CONTRACT
The Feature Planner Agent reads the "Content work" table row by row. One row = one candidate
task. Keep the table columns in the order given. The `content_type` column uses
MongoDB's content types and drives routing: Concept, Task, and Troubleshooting →
Feature Drafter Agent. Reference → generator path when generated from source, else
Feature Drafter Agent. The `ia_action` column records whether a page is added, updated,
moved, renamed, deprecated, or superseded so the Feature Planner Agent sequences the work
correctly. (Broken cross-references from moved/removed anchors are caught
automatically by CI. No agent action needed.)
-->

# [Feature name]: Docs Scope

## Summary

Two or three sentences describing the content changes this feature requires. The Feature Planner Agent reads this to understand the shape of the work before reading the table.

## Information architecture evaluation

Where this content lives in the existing doc set. Call out new sections, pages that move, and pages that become redundant. The writer's judgment here is the part agents are worst at. Be explicit about pages that aren't obviously related to the feature but need updating because of changed behavior or converging functionality.

```
new_pages_count: [n]
updated_pages_count: [n]
moved_or_removed_pages: [n]    # cross-ref breakage is caught automatically by CI
```

### Versioning

For a versioned product, name the single directory all drafting targets. Every task drafts into this one directory; agents never write the same change into multiple version directories.

```
target_version_dir: [e.g. content/manual/upcoming, content/golang/current]
backport_versions: [none | list of versions, e.g. v8.0, v8.2]
```

If `backport_versions` lists any versions, do not draft them separately. The writer adds the matching `backport-<project>-<version>` labels (see `.github/backport-config.yml`) to the final feature-branch-to-`main` PR before merging it, and the backport workflow cherry-picks the change into those version directories automatically. For a non-versioned product, set `target_version_dir` to the project's single `source/` directory and `backport_versions: none`.

## Content work

One row per documentation unit. This table is the task source.

- `content_type`: Concept | Task | Reference | Troubleshooting   (MongoDB content types. A tutorial is a Task)
- `ia_action`: add | update | move | rename | deprecate | supersede
- `depends_on`: ticket key(s) that must complete first, or `none` (drives parallel vs. sequential delegation)

| # | Page / file | content_type | ia_action | Summary of change | depends_on | Jira ticket | Writer |
|---|---|---|---|---|---|---|---|
| 1 | | | | | | | |
| 2 | | | | | | | |
| 3 | | | | | | | |

## Hand-written content directives

If any section needs exact wording (meticulous word choice, legal/positioning language, terminology the writer will not let an agent paraphrase), put it here verbatim and reference the row number. The Feature Planner Agent passes this through unchanged.

> **MANDATORY, row [#]:** use the following text VERBATIM. Do not paraphrase.
>
> [exact text]

## Reference generation

Reference pages come from source (an OpenAPI spec, code annotations, CLI help), not from a writer's prose. For each Reference row generated from source, name the source and the generation path:

```
- row [#]: source = [OpenAPI spec path | code annotation location | CLI help],
           generator = [existing tool name | agent]
```

Two paths:

- `generator = <tool name>`: a deterministic tool already produces this reference. The Feature Planner Agent triggers that tool, never a Feature Drafter Agent.
- `generator = agent`: no dedicated tool exists yet, so a Feature Drafter Agent generates the reference content from the named source, following the Reference prototype. Use this instead of blocking on tooling or hand-writing the reference.

Flag a row as blocked only when the source itself does not exist yet, because there is then nothing to generate from. Robust generated-reference tooling is the longer-term goal, and the `agent` path is the interim bridge — it is not a license to paraphrase a reference from memory. The content must come from the named source.

## Sign-off

Confirm the Scope is settled before execution. A formal PM sign-off (tracked in the Plan's `scope_lgtm_ticket`) is welcome when the team works that way, but it is often informal or skipped. What matters is that the writer judges the Scope ready. Once it is, the writer creates the Jira tickets, fills the ticket column above, and sets the Plan `status: approved`.
