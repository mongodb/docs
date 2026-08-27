# Pattern: discoverability_citations (automation: full)

The answer is on the page but a retriever will not surface it. Apply the edit, then report it for review.

RST snippets for each fix are in ../assets/rst.md.

## Rename a heading

Match the heading to the words users ask with. Watch the underline length — see ../assets/rst.md for the source-constant case, where the underline matches the rendered length rather than the raw markup.

Do not apply bold or italic in headings. Monospace is allowed only when the heading contains an inline code element; when a ticket asks for a term in "plaintext, not monospace," remove the double backticks.

Renaming a heading changes its anchor. Check for inbound links to the old fragment before you commit:

```bash
grep -rn "<page-name>/#<old-anchor>" content/
```

Nothing in-repo usually points at a section fragment, but external and cached links will break silently. Note it in your report rather than trying to fix it.

## Lift a buried note out of a table

Tables and nested structures hide content from retrievers.

**Move it, do not duplicate it.** Delete the sentence from the table cell in the same edit. Leaving both copies is the most common way this fix goes wrong.

**Keep it in the same Hx section, in a semantically appropriate spot.** Immediately above or below the originating structure is usually right, since that keeps the statement next to the content it qualifies; which of the two depends on whether it reads as a lead-in or a caveat. Moving it to a different section technically satisfies the ticket but separates the statement from its context.

**Prefer `.. note::` when the ticket says "note or callout."** The reporter's phrasing is usually a real preference, and a lone paragraph at the head of a section reads as introductory rather than as a qualification. Never leave an admonition inside the table.

## Add a cross-link from a commonly cited page

Structure the reference with the reason first and the link second. See ../assets/rst.md.

Before adding a `:ref:`, confirm the label resolves *from this docset*. A label that exists elsewhere in the repo still fails if its docset's `objects.inv` is not in this project's `intersphinx` list in `snooty.toml`. Run `local-build-check` after adding refs.

## Revise a title or meta description

Titles are 30–60 characters; meta descriptions 150–200 and unique. Run `./lint-docs.sh seo <file>` afterward, or hand this off to `fix-seo`, which is purpose-built for it.

## Mark up procedure steps explicitly

When a ticket says a model could not follow the steps, the usual cause is steps written as prose or a bullet list. Convert to `.. procedure::` with one `.. step::` per action, preserving any substeps as ordered sub-lists.
