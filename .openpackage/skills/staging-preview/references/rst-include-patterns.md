# RST Include Patterns

Use these values when the project's documentation pages end in `.txt`.

## Page file extension

Renderable documentation pages end in `.txt`. When traversing include chains,
the terminal file you need a staging URL for will end in `.txt`.

## Include directives

Pages reference include files using two directives:

- Prose includes: `.. include:: <file-path>`
- Code includes: `.. literalinclude:: <file-path>`

When searching for pages that use a changed include file, grep for both.

## YAML extract virtual paths

YAML extract files are never referenced directly. Each `ref:` key maps to a
virtual path that pages include using `.. include::`:

```
/includes/extracts/<ref>.rst
```
