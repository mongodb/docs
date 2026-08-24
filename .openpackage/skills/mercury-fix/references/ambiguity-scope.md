# Pattern: ambiguity_scope (automation: full)

The statement is true for one product, role, or tier, and the page does not say which. A model reading it over-generalizes. These are the smallest diffs in the corpus — usually a single qualifying clause.

Apply the edit, then report it for review. The writer must still confirm the scope claim itself is correct, so call it out even though the edit is applied.

## What to add

- **Name the product explicitly.** "In {+compass+}, click ..." rather than "Click ...".
- **Name the entity being acted on.** Organization vs project. Cluster vs deployment.
- **Name the deployment tier** when behavior differs — Flex vs Dedicated.
- **Name the API surface.** Atlas Admin API vs cluster data access. These are routinely conflated and are a frequent source of wrong answers.
- **Name the version or FCV** when the behavior is version-gated.

Use the substitution already defined in the project's `snooty.toml` rather than typing a product name literally.

## Where to put it

Prefer the **first sentence of the section or procedure introduction**, not a trailing caveat. A qualifier a model reads after the instructions does not stop it from having already generalized. If the page is a procedure, the scope belongs in the lead-in paragraph above step 1.

For a page that covers two products at once, a qualifier may not be enough — if the ticket implies the page should be split, that is `structure_relocation` and needs the writer's decision first.

## Do not forget alt text

When a ticket mentions a screenshot or UI image, update the image's alt text too. Alt text is frequently the only place the product name is missing, and it is what a model reads in place of the image. `./lint-docs.sh seo` checks alt text exists but cannot tell you it names the wrong product.
