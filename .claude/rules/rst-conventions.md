---
description: RST formatting conventions for documentation source files
globs: ["content/**/*.txt", "content/**/*.rst"]
---

# RST Conventions

## Headings

Header underlines must exactly match the heading length:

```rst
========
Header 1
========

Header 2
--------

Header 3
~~~~~~~~
```

## Procedures

- Use the ``.. procedure::`` directive for any procedure with more than one
  step. Do not use bullet lists for sequential steps.
- Write each step as a complete imperative sentence.
- Use ordered sub-lists (a, b, c then i, ii, iii) for nested steps within a
  ``.. step::`` directive. Do not nest more than two levels.
- If a procedure has only one step, write it as a regular paragraph without
  numbering.

## RST Formatting

- Do not remove RST directives or custom formatting.
- Leave substitution references like ``{+avs+}``, ``|fts|``, and
  ``|service|`` unchanged.
- Use the correct RST role for each element type:
  - UI elements (buttons, menus, labels): ``:guilabel:``
  - Keyboard keys and combinations: ``:kbd:``
  - Inline code, commands, and user-typed text: monospace (double backticks)
  - Glossary terms: ``:term:``
- Do not apply bold or italic emphasis in headings. Exception: a heading that
  contains an inline code element may use monospace.
- Do not use color to distinguish text.
- For platform code (``platform/`` directory only), use
  ``.. code-block:: [language]`` for inline code examples. Never use the
  bare double-colon ``::`` shorthand.

## Admonitions

- Use admonitions sparingly to preserve their visual impact.
- Use the correct directive for the type of information:
  - ``.. tip::`` — helpful but non-essential information, shortcuts, or
    alternative approaches.
  - ``.. note::`` — supplemental information or information that applies
    only in certain cases.
  - ``.. important::`` — essential points the user must understand to
    complete a task or understand a topic.
  - ``.. warning::`` — situations where users could lose data, compromise
    data integrity, or disrupt operations.
- Do not stack multiple callouts directly after one another. Group
  supplemental information into a dedicated section instead, or combine
  callouts of the same type into a single callout with separate paragraphs
  or an unordered list.
- Place each callout as close as possible to the information it clarifies.
- Do not use callouts inside tables, code blocks, or other nested elements.
- Do not use callouts for links only. Callouts should contain long-form text.
- The following directives are deprecated. Do not use them in new content:
  ``.. admonition::``, ``.. caution::``, ``.. danger::``, ``.. example::``,
  ``.. see::``, ``.. see also::``, ``.. topic::``

## Images

- Do not use plus signs (``+``) in image file names. Image files whose
  names contain a ``+`` return 404 and render as broken on the docs site.
  Name new image files without a ``+`` (use hyphens instead). When you
  encounter an existing image whose name contains a ``+``, flag it to the
  user rather than renaming it silently, since renaming requires updating
  every ``.. image::`` or ``.. figure::`` directive that references it.

## Cross-References

- Do not use the ``:doc:`` role. It is deprecated. Use ``:ref:`` with a
  descriptive label instead. Before adding a ``:ref:``, verify the label
  exists in the codebase. Do not invent labels. If no suitable label
  exists, flag it to the user rather than creating one.
- Use descriptive, context-rich names for ``:ref:`` labels so they are
  intelligible across the entire documentation set.
  - Prefer: ``replica-set-secondary-only-node``
  - Avoid: ``secondary-only-node``
- When referencing functions, operators, methods, commands, or settings,
  reference only the first occurrence in each section, not every instance.
- Structure cross-references with the reason first and the link second.
  - Prefer: "To learn how to deploy a sharded cluster, see
    :ref:\`deploy-...\`"
  - Avoid: "See :ref:\`deploy-...\` to learn how to deploy a sharded
    cluster."

## Glossary

- Glossary terms live inside a single ``.. glossary::`` directive, which
  is an RST definition list, not a series of standalone sections. Each
  term and its indented definition is one list item.
- Never add a manual ``.. _label:`` anchor target to a glossary term.
  The ``.. glossary::`` directive auto-generates an anchor for every
  term already. Inserting a manual target between entries breaks the
  definition list's contiguity and can cascade into build errors across
  every page that references glossary terms.
- Always cross-reference a glossary term with ``:term:``, for example
  :term:\`ISODate\` or :term:\`display text \<ISODate\>\`. Never
  use ``:ref:`` for a glossary term.
