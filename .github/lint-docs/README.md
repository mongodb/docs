# Documentation Linters

Automated linters for MongoDB documentation that check SEO compliance and broken links.

## How It Works

These linters run automatically as a **pre-push hook**. When you `git push`, they check any doc files in your commits and warn about issues. They're **advisory only** — they won't block your push.

You can also run them manually on any files.

---

## Quick Start (Manual)

### SEO Linter

Checks for SEO issues: meta descriptions, titles, headings, image attributes.

```bash
# Check a file
npx tsx .github/lint-docs/seo-lint-cli.ts content/path/to/file.txt

# Check multiple files
npx tsx .github/lint-docs/seo-lint-cli.ts content/manual/source/tutorial/*.txt

# Export results to a file (for large scans)
npx tsx .github/lint-docs/seo-lint-cli.ts -o results.txt content/**/*.txt
```

### 404 Linter

Checks for broken external links.

```bash
# Check a file
npx tsx .github/lint-docs/404-lint-cli.ts content/path/to/file.txt

# Check multiple files
npx tsx .github/lint-docs/404-lint-cli.ts content/drivers/node/source/*.txt

# Export results to a file
npx tsx .github/lint-docs/404-lint-cli.ts -o broken-links.txt content/**/*.txt
```

### Wrapper Script

For convenience, use the wrapper script from anywhere in the repo:

```bash
./lint-docs.sh seo content/path/to/file.txt
./lint-docs.sh 404 content/path/to/file.txt
./lint-docs.sh all content/path/to/file.txt   # Run both
```

---

## SEO Linter Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `seo-title-missing` | Error | No title found on content page |
| `seo-title-length` | Error | Title not 30-60 characters |
| `seo-meta-missing` | Error | No meta description found |
| `seo-meta-length` | Error | Meta description not 150-200 characters |
| `structure-h1-required` | Error | No H1 heading found |
| `structure-h1-single` | Error | Multiple H1 headings |
| `structure-h2-before-h1` | Error | H2 appears before H1 |
| `image-alt-missing` | Warning | Image missing alt text |
| `image-png-figwidth` | Error | PNG missing `:figwidth:` attribute |
| `image-svg-dimensions` | Warning | SVG missing width/height |
| `nested-admonition` | Error | Nested admonition detected |
| `syntax-malformed-ref` | Error | Malformed `:ref:` with angle brackets |
| `syntax-empty-link` | Error | Empty link URL `[text]()` |
| `seo-low-content` | Warning | Page has < 100 characters |

---

## 404 Linter Details

Uses [lychee](https://github.com/lycheeverse/lychee) to check external links.

**Automatically skipped:**
- Localhost and private IPs
- Login/auth pages (Azure Portal, AWS Console, etc.)
- Example domains (`example.com`, `.local`, `.internal`)
- MongoDB internal URLs
- API endpoints requiring auth
- Microsoft/Azure docs (often block automated checkers)

**Timeout:** 30 seconds per link with 2 retries.

---

## Example Output

### SEO Linter

```
🔴 content/my-page.txt:1
   [seo-meta-missing] No meta description found (required for content pages)
   Fix: Add description via :description: directive or YAML frontmatter

🔴 content/my-page.txt:4
   [seo-title-length] Title is 20 characters (minimum 30 required)
   Current: My Short Title
   Fix: Expand title to 30-60 characters

Found 2 error(s), 0 warning(s)
```

### 404 Linter

```
🔗 Checking 3 file(s) for broken links...

🔴 content/tutorial/install.txt
   [404] https://example.com/broken-link
   Status: 404

Found 1 broken link(s)
```

---

## Supported File Types

- `.rst` (reStructuredText)
- `.txt` (treated as RST)
- `.md` (Markdown)
- `.mdx` (MDX)

---

## Requirements

- **Node.js** v18 or higher
- **lychee** (for 404 linter): `brew install lychee`

If lychee isn't installed, the 404 linter gracefully skips with a warning.

---

## FAQ

**Do I need to be at the repo root?**  
No. You can run the linters from any directory. Paths are resolved relative to your current location.

**Will this block my push?**  
No. The linters are advisory only — they warn but always allow the push.

**Can I check multiple file types at once?**  
Yes. You can mix `.rst`, `.txt`, `.md`, `.mdx` files in one command.

**The output scrolls off my terminal. How do I save it?**  
Use the `-o` flag: `npx tsx .github/lint-docs/seo-lint-cli.ts -o results.txt files...`

**A link is flagged but works in my browser. Why?**  
Some sites block automated checkers or are slow. We've excluded common culprits (Microsoft, Azure, AWS). If you find others, let us know.

---

## Files

```
.github/lint-docs/
├── README.md           # This file
├── seo-lint-cli.ts     # SEO linter CLI
├── seo-lint-rules.ts   # SEO linter rules (pure functions)
├── 404-lint-cli.ts     # 404 linter CLI (wraps lychee)
├── package.json        # Dependencies
└── tsconfig.json       # TypeScript config
```

---

## Contact

Questions or issues? Contact: **Emet Ozar**
