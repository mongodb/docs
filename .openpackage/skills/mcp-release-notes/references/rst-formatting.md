# RST Formatting: MCP Release Notes

Use these rules when `{RELEASE_NOTES_FILE}` ends in `.txt`. These override
the shared rules in `release-notes-base/references/rst-formatting.md`.

## Heading

Bare version number (e.g., `1.9.0`), underlined with `-----`. Do not prefix
with `v` or use a substitution constant.

## Changelog link

Place the inline RST hyperlink on its own line, immediately after the last
bullet and before the next version heading:

```
`Full release notes available on GitHub
<https://github.com/mongodb-js/mongodb-mcp-server/releases/tag/v{VERSION}>`__.
```
