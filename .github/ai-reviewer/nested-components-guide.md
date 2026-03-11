# Nested Components Guidelines

**Nested components are NOT allowed in MongoDB documentation.**

A nested component is when one RST directive is placed inside another directive of similar type. These create rendering issues and accessibility problems.

## Types of Nested Components to Flag

### 1. Admonitions Inside Admonitions
**Not allowed.** Remove the nested admonition and make its contents part of the parent admonition.

```rst
# BAD - nested note inside tip
.. tip::

   This is a tip.

   .. note::

      This is a nested note.  <!-- NOT ALLOWED -->
```

### 2. Admonitions Inside Tables
**Not allowed.** Remove the nested admonition directive and make the content plain text.

- For **Notes**: Remove directive, make content plain text
- For **Important**: Use `:gold:`IMPORTANT:`` prefix instead of directive
- For **Warning**: Use `:red:`WARNING:`` prefix instead of directive

### 3. Examples Inside Admonitions
**Not allowed.** Remove the nested example and:
- For full sentences: precede with "For example,"
- For code blocks: introduce with "For example:"

### 4. Examples Inside Tables
**Not allowed.** Same fix as examples inside admonitions.

### 5. Procedures Inside Procedures
**Not allowed.** Remove nested procedure and convert to ordered list using a., b., c. (and i., ii., iii. for sub-levels).

### 6. Tables Inside Tables
**Not allowed.** Flag tables nested inside other tables. These create rendering and accessibility issues. Suggest restructuring the content using:
- Separate tables
- Definition lists
- Nested bullet points
- Breaking into multiple sections

## What to Flag

When reviewing, flag any of these patterns:
- `.. note::` or `.. tip::` or `.. warning::` inside another admonition
- `.. example::` inside admonitions or tables
- `.. procedure::` or numbered steps inside other procedures
- Any directive nested inside a table cell
- Tables inside tables (list-table or grid table inside another table)

## How to Suggest Fixes

1. Identify the nested component type
2. Suggest removing the inner directive
3. Recommend making the content:
   - Plain text (for notes in tables)
   - Part of parent admonition (for nested admonitions)
   - Introduced with "For example," (for examples)
   - An ordered list with a., b., c. (for nested procedures)
