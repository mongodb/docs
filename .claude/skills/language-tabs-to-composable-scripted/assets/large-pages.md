# Large Pages and Structural Edge Cases (fallback)

The script handles pages with any number of tab blocks. Follow the standard
Steps 1–14 for pages of any size. Use the manual approach below only for
structural edge cases where the script cannot produce correct output:

- The page needs a custom ID mapping that differs from the standard
  `TABID_MAP` (for example, interleaved tab sets with incompatible ID schemes).
- The page requires multiple independent composable blocks.

If you need the manual approach, write a page-specific Python script.

## Custom script structure

Key elements:

```python
TABID_MAP = {
    # tabid → (interface_or_None, language_or_None)
    # Case B example:
    "atlas-ui": ("atlas-ui", "None"),
    "shell":    ("mongosh",  "None"),  # check snooty.toml: mongosh vs shell
    "compass":  ("compass",  "None"),
    "csharp":   ("driver",   "csharp"),
    "go":       ("driver",   "go"),
    # ... etc.
}
REMOVE_1IDX = {<set of 1-indexed line numbers to remove>}
COMPOSABLE_AFTER_1IDX = <line after which to insert the composable header>
COMPOSABLE_HEADER_LINES = [
    # Case B (interface + language):
    ".. composable-tutorial::\n",
    "   :options: interface, language\n",
    "   :defaults: driver, nodejs\n",
    "\n",
]
```

**Tab detection:** Detect `.. tab::` blocks with `r"^   \.\. tab::.*$"` (3-space
indent, inside a `.. tabs-drivers::` block). Content-variant `.. tabs::` blocks
at deeper nesting (9+ space indent) will not match and pass through as shared
content unchanged.

**State machine:** Track `in_tabs_drivers` (True when inside a
`.. tabs-drivers::` block; reset when a non-blank line at 0-indent appears).
Collect tab content lines and emit them as `.. selected-content::` blocks.

**Shared content indentation:** All lines inside the composable scope that are
not part of a tab block get 3-space indent added.

Always validate with a unified diff before writing the file. Check that tab
counts match, no content is duplicated, and trailing sections are inside the
composable. After the script produces output, follow Steps 13 and 14 exactly as
for script-driven conversions.
