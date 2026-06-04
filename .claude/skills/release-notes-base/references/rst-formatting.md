# RST Formatting: Release Notes

Use these rules when `{RELEASE_NOTES_FILE}` ends in `.txt`.

## Heading template

```
{PRODUCT_SUBSTITUTION}X.Y.Z
-----------

*Released Month D, YYYY*
```

The heading underline (`-`) must exactly match the heading length:

- If the heading uses a substitution constant (e.g., `|compass|`), match the
  underline to the length of the **raw RST source text**, not the rendered
  word. Check existing headings in the file to confirm.
- If the heading uses a source constant (e.g., `{+mongosh+}`), match the
  underline to the length of the **rendered text**.

## Line length

Wrap all content at 72 characters. Break long list items with a 2-space
continuation indent.
