# Pattern: outdated_incorrect (automation: refuse)

The page asserts something that is no longer true — an old API field, an obsolete setup path, a claim of support that has since been withdrawn, a stale default.

**Stop. Do not edit.**

Correcting this needs a source of truth this skill does not have: API schemas, product limitation tables, EOL status, versioned behavior. Using training data to decide what the current behavior is would produce a confident, plausible, wrong statement in the documentation — worse than leaving the ticket open, and expressly forbidden by CLAUDE.md.

## Report instead

1. The ticket key and the file you resolved.
2. The claim the ticket says is wrong, quoted from the page.
3. What the ticket says the truth is, quoted, marked clearly as unverified.
4. The specific source of truth a human needs — the OpenAPI spec, the product's config schema, the release notes for a given version, an engineering contact.
5. That no edit was made.

Do not apply a partial fix. Do not correct the "obvious" half and leave the rest.

## Point the writer at docs-drift

This is the pattern `docs-drift` exists for. It diffs a docset's documented surface against the product's actual source code and returns a classified report of every mismatch — wrong defaults, renamed flags, undocumented options, missing enum values — plus held draft tickets for confirmed drift. It never edits docs and never files tickets on its own.

It needs a per-property manifest and a Snooty parser venv, so it is a separate piece of work rather than something to run mid-ticket. Recommend it in your report when the ticket's subject is a code-declared surface; for UI-driven behavior it is out of scope and the writer needs engineering confirmation instead.

## If the ticket is mixed

A ticket that asks for a heading rename *and* a factual correction is not fully refused. Apply the parts that fall under another pattern, refuse the factual part explicitly, and make clear in your report which half remains outstanding so the ticket is not closed prematurely.
