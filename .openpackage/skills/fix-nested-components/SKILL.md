---
name: fix-nested-components
description: >-
  Fix forbidden nested RST components flagged by the nested components linter — callouts inside callouts, callouts inside list-tables, examples inside callouts, examples inside list-tables, and procedures inside procedures. Runs ./lint-docs.sh nested to detect violations, applies the canonical remediation for each, and re-lints to verify. Handles the case where the nested component is pulled in from a shared include reused elsewhere in an un-nested context (inlines the fix at the nesting site instead of editing the shared file). Does NOT handle tabs-in-tabs — use language-tabs-to-composable-scripted for that. Use when the user asks to "fix nested components", "resolve nested component errors", "fix the nested components linter findings", or when the nested linter reports callout/example/procedure nesting.
argument-hint: "[filepath...]"
---

Fix forbidden nested RST components in $ARGUMENTS.

This skill remediates the five judgment-based nested-component violations the deterministic linter detects. It does **not** touch `tabs-in-tabs` (rule 6) — that requires the `language-tabs-to-composable-scripted` skill.

Rules in scope:

| Linter rule | Fix summary |
|---|---|
| `callout-in-callout` | Merge nested callout content into the parent callout. |
| `callout-in-table` | Remove the directive; plain text or inline `:gold:`/`:red:` prefix. |
| `example-in-callout` | Remove the `example` directive; introduce with "For example,". |
| `example-in-table` | Remove the `example` directive; introduce with "For example,". |
| `procedure-in-procedure` | Convert the nested procedure to an ordered list (a., b., c.). |

The canonical remediation patterns live in `.github/ai-reviewer/nested-components-guide.md`. Read it before editing if you need more detail than the sections below.

---

## Step 1: Detect violations

If the nested linter has already run against the target file(s) in this session — for example, findings appear in a hook message or in the output of a `./lint-docs.sh nested` (or `all`) call you can see — reuse those findings and skip re-running here. Otherwise, run the linter from the repository root against the target file(s):

```bash
./lint-docs.sh nested $ARGUMENTS
```

Either way, parse the output. Each finding has a `file`, `line`, `rule`, `message`, and `suggestion`. Collect them.

If there are no findings, tell the user the file is clean and stop.

---

## Step 2: Triage tabs-in-tabs (out of scope)

Filter out any findings with rule `tabs-in-tabs`. This skill does not fix them. If any exist, list them for the user in one line each (file:line) and note that `language-tabs-to-composable-scripted` handles that pattern. Continue with the remaining findings; do not block on tabs.

If every finding was `tabs-in-tabs`, stop after reporting them — there is nothing else to do.

---

## Step 3: Read the file and locate each violation

Read each affected file in full so you understand the surrounding structure before editing. For every finding, locate the nested inner directive at the reported line and the parent container that encloses it.

Verify the nesting yourself before editing — the linter uses an indentation stack and treats only `list-table` as a table container. Confirm the inner directive is genuinely inside the parent and not a sibling.

---

## Step 3.5: Check whether the nested component comes from a shared include

This check applies to **every** in-scope rule — `callout-in-callout`, `callout-in-table`, `example-in-callout`, `example-in-table`, and `procedure-in-procedure`: in any of them, the offending nested directive (callout, example, or procedure) may live in a shared include rather than inline on the page.

Before editing, determine whether the offending inner directive is written inline at the flagged location or pulled in through an `.. include::` (or `.. sharedinclude::`) directive nested inside the parent container (callout, list-table cell, or `.. step::`). When the inner directive is an include, the callout/example/procedure markup lives in that shared file — not in the page you are editing — so you cannot simply strip it inline, and the shared file is often a valid standalone directive that the linter does not flag on its own. (A file that composes the whole nesting internally — a parent container with a nested include — is flagged independently when the linter lints it directly, so fix it there; the case that needs the handling below is a parent that sits inline on the page with only the child reached through a shared include.)

A shared include may be reused elsewhere in an **un-nested** context, where the nested directive is valid and must stay as-is. Editing the include file in place to strip or convert the directive would silently degrade every un-nested usage — that is not an acceptable fix. Treat the include file as read-only for this remediation unless you have confirmed it has exactly one usage.

Follow this decision path:

1. Resolve the include to its file. For `includes/extracts/...` paths, resolve the `ref:` in the YAML per the include-resolution rules in CLAUDE.md; for a direct `.rst` include, open that file.
2. Search the target version's `source/` directory for every reference to that include or ref (grep the include path and, for extracts, the `ref:` name). Count the usages.
3. **If the include is used only at the flagged location:** you may edit the include file directly, applying the normal per-rule remediation from Step 4. No un-nested usage exists to break.
4. **If the include is used in more than one place:** do not edit the shared file. Instead, at the flagged page, replace the `.. include::` with the remediated content inlined directly into the parent, applying the matching Step 4 pattern to the inlined copy — for `callout-in-callout` merge it into the parent callout (with the `:red:`/`:gold:` severity prefix), for `callout-in-table` place it in the parent list-table cell (with the severity prefix), for `example-in-*` introduce it with "For example,", and for `procedure-in-procedure` convert it to a lettered ordered list inside the parent `.. step::`. Leave the shared include file unchanged so its un-nested usages keep rendering the original directive. If the shared content is long enough that inlining it would create a maintenance burden, stop and ask the user whether to (a) inline it anyway or (b) create a new un-nested include variant for the nested site — do not decide this silently.

Note in your Step 6 summary whenever a fix inlined shared-include content instead of editing the include, and list the other usages you confirmed were left intact.

---

## Step 4: Apply the remediation per rule

Apply the matching pattern. Preserve all substitution markup (`{+text+}`, `|text|`), `:ref:`/`:role:` markup, and existing indentation of retained content. Wrap prose at 72 characters. Do not add information beyond what the original nested content conveyed.

When you remove a callout directive but keep its text, preserve the severity of stronger callouts by prefixing the promoted text with an inline role:

- **warning** — prefix the text with ``:red:`WARNING:` ``.
- **important** — prefix the text with ``:gold:`IMPORTANT:` ``.
- **note** or **tip** — keep as plain text (optionally lead with "Tip:").

Both `callout-in-callout` and `callout-in-table` use this convention.

### `callout-in-callout`

Remove the inner callout directive and its option lines. Promote its body to be part of the parent callout, as an additional paragraph at the parent's indentation level, applying the severity prefix above. Do not pull the inner content out into a separate top-level directive — that creates stacked admonitions, which are not allowed. Always merge into the parent.

```rst
# BEFORE
.. note::

   Connections stay open until closed.

   .. tip::

      Reuse a single client instance.

# AFTER
.. note::

   Connections stay open until closed.

   To reuse resources, reuse a single client instance.
```

```rst
# BEFORE
.. note::

   You can change the shard key after sharding a collection.

   .. warning::

      Changing the shard key can trigger significant data
      redistribution and may impact cluster performance.

# AFTER
.. note::

   You can change the shard key after sharding a collection.

   :red:`WARNING:` Changing the shard key can trigger significant
   data redistribution and may impact cluster performance.
```

### `callout-in-table`

Remove the callout directive inside the `list-table` cell and keep its content in the same cell at the cell's indentation, applying the severity prefix above.

### `example-in-callout` and `example-in-table`

Remove the `.. example::` directive. Reintroduce its content inline:

- For a full-sentence body: precede it with "For example,".
- For a code block body: introduce it with "For example:" on the preceding line, then keep the code block at the appropriate indentation.

Keep the content within the parent callout or table cell.

### `procedure-in-procedure`

Remove the nested `.. procedure::` and its `.. step::` directives. Convert each nested step into an ordered list item using letters (a., b., c.). Use lowercase roman numerals (i., ii., iii.) for a second sub-level. Do not nest more than two levels. Place the ordered list inside the parent `.. step::` that contained the nested procedure.

```rst
# BEFORE
.. step:: Configure the client

   .. procedure::

      .. step:: Set the URI

         ...

      .. step:: Set the timeout

         ...

# AFTER
.. step:: Configure the client

   a. Set the URI

      ...

   b. Set the timeout

      ...
```

If a nested procedure is too complex to flatten into a two-level ordered list without losing structure, stop and ask the user how to restructure it rather than forcing the conversion.

---

## Step 5: Re-lint to verify

Re-run the nested linter on the edited file(s):

```bash
./lint-docs.sh nested $ARGUMENTS
```

Confirm the in-scope findings are resolved (only `tabs-in-tabs`, if any, may remain). If a fix introduced a new violation, address it and re-run.

---

## Step 6: Run full lint and summarize

Run the full lint suite on the edited files to catch any regressions:

```bash
./lint-docs.sh all $ARGUMENTS
```

Review and address Vale warnings and suggestions where applicable. Surface any unresolvable errors to the user.

Then present a summary:

- Each file edited, with the rule fixed and line reference.
- Any `tabs-in-tabs` findings left for `language-tabs-to-composable-scripted`.
- Any findings you could not fix and why.

Ask the user whether they are ready to commit and push. Do not commit or push without explicit confirmation.
