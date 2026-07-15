# MongoDB Documentation Style Guide Reference

This AI reviewer references the official MongoDB Documentation Style Guide:
https://www.mongodb.com/docs/meta/style-guide/

Source repository: https://github.com/mongodb/docs-meta/tree/master/source

## Key Areas to Review

### Writing Guidelines
- Clear, active, direct writing
- Grammatically correct content
- Concise technical content

### Style Guidelines
- Abbreviations usage
- Heading capitalization
- Contractions policy
- Text formatting standards

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