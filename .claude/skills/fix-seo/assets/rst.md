# RST Format Instructions

## File extensions

- `.txt` — page files (full documentation pages that need SEO metadata)
- `.rst` — include files (partial content; do not add SEO metadata to these)

## `.txt` page files only

The following instructions apply to `.txt` page files only. Do not add `.. meta::` to `.rst` include files.

All `.. meta::` directives go after any `:orphan:` or `:noprevnext:` flags and before the H1 heading. If a `.. meta::` directive already exists, add new fields to it rather than creating a second one.

### Adding noindex

```rst
.. meta::
   :robots: noindex, nosnippet
```

### Writing a description

If fixing an existing description (length or invalid content), locate the existing `.. meta::` directive and edit the `:description:` value in place.

If adding a missing description:

```rst
.. meta::
   :description: <generated description>
```

Do not use YAML frontmatter for `.txt` files.

### Fixing the title

The SEO title is the H1 heading on the page. To fix a title issue, edit the H1 text directly. The H1 is the text between two `====` lines (overline and underline).

When choosing title wording, check `snooty.toml` for short-form substitutions or source constants for any product names in the title. Use the defined markup instead of the spelled-out name (e.g. `|fts|` instead of "Atlas Search", `{+mongosh+}` instead of "mongosh"). This keeps titles concise and consistent with site-wide naming conventions.

After editing the H1 text, update the overline and underline to match the visible title length exactly (one `=` per rendered character). Use the expanded, role-stripped length described in "Counting visible length" below — not the raw markup. For example, a title written as `{+mongosh+} Configuration` renders as `mongosh Configuration` (21 characters), so the overline and underline must each be 21 `=` characters.

### Counting visible length

The SEO linter counts raw source characters without expanding markup, so any title or description containing RST substitutions (`|key|`) or Snooty source constants (`{+key+}`) may report a length that differs from what readers see. Before acting on a length finding for such a value, compute the true visible length:

1. Find the `snooty.toml` nearest to the file (walk up from the file's directory until one is found).
2. Parse the `[substitutions]` and `[constants]` sections to build an expansion map.
3. Expand all `|key|` and `{+key+}` occurrences using the map.
4. Strip RST roles from the expanded values to get visible text only:
   - `:abbr:`ABBR (Full Text)`` → `ABBR`
   - `:guilabel:`text`` → `text`
   - `:binary:`~bin.command`` → `command` (strip `~bin.` or `~`)
   - `` `link text <url>`__ `` → `link text`
   - Any remaining `:role:`text`` → `text`
5. Count characters on the fully-expanded, role-stripped string.
6. If the expanded count is within the valid range, treat the finding as a false positive: skip the fix and report it to the writer instead of editing the file.
7. If the expanded count is still out of range, proceed with the fix.
