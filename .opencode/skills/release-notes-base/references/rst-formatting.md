# RST Formatting: Release Notes

Use these rules when `{RELEASE_NOTES_FILE}` ends in `.txt`.

## Heading template

Build the heading from `{PRODUCT_SUBSTITUTION}` and `{VERSION}`, followed by the release date line. For example, the Compass 1.53.2 heading is 16 characters, so it takes a 16-character underline:

```
|compass| 1.53.2
----------------

*Released October 27, 2026*
```

The heading underline (`-`) must exactly match the heading length:

- If the heading uses a pipe substitution (e.g., `|compass|`), match the
  underline to the length of the **raw RST source text**, not the rendered
  word. Check existing headings in the file to confirm.
- If the heading uses a source constant (e.g., `{+mongosh+}`), match the
  underline to the length of the **rendered text**.

See the "Headings" section of `.claude/rules/rst-conventions.md` for why the
two differ.

## Line length

Wrap all content at 72 characters. Break long list items with a 2-space
continuation indent.
