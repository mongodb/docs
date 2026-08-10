# Pattern: missing_content (automation: scaffold)

The largest bucket, and the one where inventing text does the most damage. The answer is absent and has to be written.

**Scaffold level:** build the structure and the insertion point, leave a marked placeholder for anything you cannot source, and invent no technical facts. CLAUDE.md already forbids using training data for MongoDB facts; that applies with full force here.

## What you may write

1. **Identify the insertion point** and justify it from the file's existing structure.
2. **Create the container** with correct syntax — the FAQ entry's heading, the `.. procedure::` skeleton with empty `.. step::` directives, the new section and its underline.
3. **Use concrete values the ticket itself supplies.** A "2 GB per 5 minutes" limit stated in the ticket is the reporter's own text and may be used verbatim. This is the difference between transcribing and inventing.
4. **Prefer weaving a claim into an existing paragraph** over adding a standalone one, when the section already covers the topic. A qualifying clause folded into the sentence that already describes the behavior reads better than a separate lead paragraph restating it.
5. **Mark everything you could not source**, using the ticket key so it is traceable:

```rst
.. TODO(DOCSP-XXXXX): Writer to confirm the exact retry interval.
```

6. **Report exactly which facts the writer must supply**, one line each. A reviewer should not have to diff the file to find your gaps.

## When the ticket's claim conflicts with the page

If the text you are adding contradicts something already on the page, do not reconcile it yourself — that requires product knowledge you do not have. Add the ticket's statement, then leave a `TODO` naming both claims and asking which is intended. Silently picking one is the worst outcome available.

## When the ticket asks for a whole new page

Do not create it silently. A new page needs a unique H1, a 30–60 character title, a 150–200 character meta description, a TOC entry via `unified-toc`, and possibly a redirect. Propose it, name those requirements, and stop for the writer's decision.

## Verifying rather than guessing

Where the missing fact is a product behavior declared in code — a CLI flag, a config option, an API shape, an enum, a default — `docs-drift` can establish it against the product source instead of leaving a `TODO`. It requires a per-property manifest and does not edit docs, so it is a separate task rather than something to invoke mid-edit. Mention it to the writer when the gap is that kind of fact.
