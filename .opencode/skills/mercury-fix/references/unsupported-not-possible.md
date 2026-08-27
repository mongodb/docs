# Pattern: unsupported_not_possible (automation: draft)

The correct answer is "no." Negative truths get overridden by adjacent content, so they must be prominent and unambiguous.

**Draft level:** apply the edit, but the ticket is asserting a product limitation you cannot verify in the repo. Flag it in your report as requiring the writer's confirmation before merge.

## Write it as a direct negative

State the limitation, then the alternative if one exists. See ../assets/rst.md for the admonition form.

Avoid hedged phrasing. "Is not supported" and "you cannot" are retrievable; "may not be available in some configurations" is not, and invites a model to hallucinate the exception. If the limitation genuinely has exceptions, name them precisely rather than gesturing at them.

## Choosing the directive

- `.. note::` — a constraint that applies only in certain cases. The default for this pattern.
- `.. important::` — the reader must understand this to complete the task.
- `.. warning::` — only where data loss, integrity damage, or an operational outage is possible. A feature simply not existing is not a warning.

Place it as close as possible to the content it qualifies, and do not stack it against another callout.

## Prominence beats repetition

If the "no" answer is the whole point of the page's section, put it in the body text and give the section a heading that contains the negative, rather than burying a correct statement in a callout under a heading that implies the opposite. A heading reading "Configure Private Networking" with a note saying it is unavailable on this tier still reads, to a retriever, as though it is possible.

## EOL and removed features

For something that has been withdrawn rather than never supported, say so with the status and the date or version, and point at the replacement. Check whether the repo already has a standard include or extract for that product's EOL notice before writing new prose — reusing it keeps the wording consistent and is one fewer unverified claim.
