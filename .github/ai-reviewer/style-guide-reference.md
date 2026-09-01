# MongoDB Documentation Style Guide Reference

This AI reviewer references the official MongoDB Documentation Style Guide:
https://www.mongodb.com/docs/meta/style-guide/

Source repository: https://github.com/mongodb/docs-meta/tree/master/source

## Key Areas to Review

### Writing Guidelines
- Clear, active, direct writing
- Grammatically correct content
- Concise technical content
- Use present tense
- Write to the user
- Use effective verbs
- Use positive statements
- Write for accessibility and global audience

### Style Guidelines
- Abbreviations usage
- Heading capitalization
- Contractions policy
- Text formatting standards
- Collapsible sections
- Language selectors

### Terminology Guidelines
- Accurate, consistent terminology
- Concise language
- Writing for global audience

### Markup Guidelines
- reStructuredText (RST) standards
- YAML formatting

### Screenshot and Diagram Guidelines
- When to use visual content
- How to create effective screenshots/diagrams

### Release Notes Guidelines
- Product release notes formatting

### Information Types
- Page goals identification
- Audience targeting

### Search Engine Optimization
- Documentation page optimization

## Review Focus Areas

When reviewing documentation, prioritize:

1. **Clarity**: Is the content easy to understand?
2. **Accuracy**: Is the technical information correct?
3. **Consistency**: Does it follow established patterns?
4. **Completeness**: Is anything missing?
5. **Conciseness**: Can anything be simplified?
6. **Voice**: Is it written in active voice?
7. **Audience**: Is it appropriate for the target reader?

## Nested Components Guidelines

To allow LLMs to consume content easily, avoid nesting these components:

- Callouts inside callouts
- Callouts inside tables
- Examples inside callouts (or tables)
- Procedures inside procedures

### Callouts Inside Callouts
Remove the nested callout and fold its contents into the parent callout. If the nested callout is a `seealso`, convert it to inline text (e.g., "To learn more, see...").

### Callouts Inside Tables
- **Notes**: Remove the `note` directive and convert to plain text within the table cell.
- **Important/Warning**: If the content is merely noteworthy, remove it from the callout entirely. If users must notice it:
  - Use `:gold:\`IMPORTANT:\`` for important information.
  - Use `:red:\`WARNING:\`` for warning information.

### Examples Inside Callouts or Tables
- If the example uses full sentences, remove the `example` directive and introduce inline with "For example,".
- If the example is a code block value, introduce with "For example:". Follow-up context should begin with "In the previous example,".

### Procedures Inside Procedures
Remove the nested `procedure` directive and convert inner steps to a lettered list (a., b., c.) with roman numerals (i., ii., iii.) for further nesting. Do not nest steps beyond two levels.

## API Placeholders Guidelines

When documenting API usage, use placeholder variables instead of real or example credentials.

### Placeholder Formatting
- Format placeholder variables as `camelCase` enclosed in curly braces: `{placeholderName}`
- Enclose API **requests** in a language-appropriate `code-block` (use `.. code-block:: console` for `curl`)
- Enclose API **responses** in `.. code-block:: json` with `:copyable: false`
- Add `:linenos:` to any `code-block` longer than 10 lines

### Standard Placeholders
| Information | Use |
|---|---|
| Username | `yourUserName` |
| Password | `yourPassword` |
| Public API Key | `{publicApiKey}` |
| Private API Key | `{privateApiKey}` |
| Project ID | `{projectId}` |
| Organization ID | `{orgId}` |
| Client ID | `{clientId}` |
| Client Secret | `{clientSecret}` |
| Base64-Encoded Auth | `{base64Auth}` |
| Access Token | `{accessToken}` |

### Simulated Placeholder Values (for realistic examples)
When showing "real-looking" example values in request/response samples:
- **Public API Key**: 8 lowercase ASCII-alphabetic characters (e.g., `gzungyzc`)
- **Private API Key**: 16 lowercase hex digits formatted as `4-2-2-6` (e.g., `ac930128-c6dd-ae41-fe44-d985d008e703`)
- **Project/Org ID**: 24-character lowercase hex string (e.g., `0e18fec1d223b72f626d23f1`)
- **Client ID**: `mdb_sa_id_` prefix + 24-character lowercase hex string
- **Client Secret**: `mdb_sa_sk_` prefix; API responses mask the full value
- **Access Token**: Always use `{accessToken}` — never use a real or simulated JWT string

> **⚠ Warning**: Never include real credentials, passwords, or JWT strings in code examples or screenshots. Real JWT strings trigger GitHub secret scanning alerts. Always use `{accessToken}` for access tokens.

## Reference Page Guidelines

Reference pages provide quick information to experienced users. The title is typically the name of the command, operator, or method described.

### Standard Reference Page Structure
1. **Short description** — Brief intro summarizing contents; may link to concept or task pages.
2. **Compatibility** *(optional)* — List MongoDB editions that support the feature:
   - MongoDB Atlas (specify level: all clusters, certain clusters, or no clusters)
   - MongoDB Enterprise
   - MongoDB Community
   - Use standard includes where available (e.g., `.. include:: /includes/fact-environments-atlas-only.rst`)
3. **Access Control** *(optional)* — Privilege actions or built-in roles required; include when authentication affects behavior.
4. **Syntax** — Sample syntax with required parameters in a `code-block`.
5. **Command Fields** — `list-table` with columns: Field, Type, Necessity, Description.
6. **Behaviors** *(optional)* — Only behaviors specific to the described operator.
7. **Examples** *(optional)* — Most common use cases. Use includes for examples shared between reference and task pages.
8. **Learn More** — Links to related content.

## Information Types

Information typing categorizes content by type based on audience goals. It keeps content focused, accounts for page purpose before writing, and helps users quickly understand relevance.

### Types Used in MongoDB Documentation

- **Concept** — Explains ideas, context, or background. Audience includes users who need to understand before they act.
- **Reference** — Delivers granular details (methods, operators, database commands). Audience includes experienced users.
- **Task** — Guides users through completing a goal. Audience includes users who need step-by-step instructions.

These types are similar to DITA Document Types but do not impose strict RST structural requirements.

## Shared Include (`sharedinclude`) Guidelines

The `sharedinclude` directive sources content from the MongoDB internal `docs-shared` repository. Use it to keep content in sync across multiple documentation sets or branches.

### Setup
Set `sharedinclude_root` in `snooty.toml` to the raw GitHub URL of the shared repository branch:
```
sharedinclude_root = "https://raw.githubusercontent.com/10gen/docs-shared/main/"
```

### Syntax
```rst
.. sharedinclude:: path/to/file.rst
```
Specify the path relative to the `docs-shared` root, without a leading slash.

### Replacements
External files use `|variable-name|` placeholders. Define replacements in the sourcing file:
```rst
.. sharedinclude:: drivers/compatibility-tables/language.rst

   .. replacement:: driver-name

      PyMongo
```

### Inline vs. Block Context
- **Inline context** (placeholder adjacent to paragraph text): Replace with unformatted text, formatted text (`monospace`, bold, italic), or links. Cannot use lists, code blocks, includes, or headers.
- **Block context** (placeholder separated by line breaks): Replace with most inline or block RST elements, including titles, code blocks, anchors, and admonitions.

## Selected Terminology Reference (B Terms)

Flag the following common term issues when reviewing documentation:

| Term | Guidance |
|---|---|
| **back end** | Avoid; use a specific term like *server*, *operating system*, or *network*. If needed, hyphenate as adjective: *back-end*. |
| **backslash / slash** | Use *backslash* for `\` and *slash* for `/`. Don't use *slash mark*. |
| **back up / backup** | *Back up* (verb); *backup* (noun or adjective). |
| **backward** | Use instead of *backwards*. |
| **bad** | Avoid; use *serious* or provide a specific explanation. |
| **be sure** | Avoid; use *ensure* or *verify* depending on context. |
| **because** | Use *because* (not *since* or *as*) to express causality. |
| **before** | Use for time/order. Don't use to locate content; use *preceding* or a cross-reference instead. |
| **below** | Avoid to locate information or refer to versions. Use *following* or a specific link; use *earlier* for versions. |
| **between / among** | Use *between* for two items; *among* for three or more. |
| **billion** | Avoid in prose; express as numerals. If unavoidable, use the short-scale definition (10⁹). |
| **biweekly / bimonthly** | Avoid (ambiguous). Use *every two weeks*, *twice a month*, etc. |
| **blacklist** | Avoid. Use *access list* (noun) or *remove from an access list* (verb); use *blocked* as adjective. |
| **blackout** | Avoid. Use *scheduled outage* or *scheduled downtime*. |
| **Boolean** | Always capitalize. |
| **both** | Use only when referring to exactly two things. |
| **bottom left / bottom right** | Avoid. Use *lower left* / *lower right* for UI locations. |
| **box** | Use for UI boxes (text box, list box, etc.) within a dialog. Don't use *box* to refer to a computer. |
| **bring up** | Avoid. Use *start* or *turn on* for systems; use *open* for windows/UI elements. |
| **button / icon** | Don't use interchangeably. Use *button* for command/toolbar buttons; *icon* for graphics. Omit the word *button* when instructing users to click (e.g., "click **OK**"). |
| **by using** | See also: *using*, *with*. |