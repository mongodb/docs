# Documentation Linters

Automated linters for MongoDB documentation that check SEO compliance, broken links, and redirect issues.

## First-Time Setup

Clone the repo and run the setup script:

```bash
git clone git@github.com:10gen/docs-mongodb-internal.git
cd docs-mongodb-internal
./setup-docs.sh
```

This installs Node.js, pnpm, lychee, and all linter dependencies. Re-run anytime to update.

> **Already cloned?** Just run `./setup-docs.sh` from the repo root.  
> **Prefer HTTPS clone?** `DOCS_SETUP_HTTPS=1 ./setup-docs.sh`  
> **`curl | bash` won't work** — this is a private repo. Clone first, or pass a GitHub token: `curl -fsSL -H "Authorization: Bearer <TOKEN>" "https://raw.githubusercontent.com/10gen/docs-mongodb-internal/main/setup-docs.sh" | bash`  
> **`pnpm-lock.yaml`** is committed for reproducible installs. npm users can ignore it.

---

## How It Works

| Linter | Trigger | Blocking? |
|--------|---------|-----------|
| **SEO Linter** | Pre-push hook + PR | No (advisory) |
| **404 Linter** | Pre-push hook + PR | No (advisory) |
| **Redirect Linter** | PR (when redirect files change) | **Yes** |

SEO and 404 linters run on every push and PR as warnings. The redirect linter runs only when redirect files change and **will block the PR** if circular redirects are found.

You can also run all linters manually on any files.

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

### Redirect Linter

Checks for circular redirects in `netlify.toml` files.

```bash
# Check a netlify.toml file
npx tsx .github/lint-docs/redirect-lint-cli.ts content/atlas/netlify.toml

# Check all redirect files
npx tsx .github/lint-docs/redirect-lint-cli.ts content/*/netlify.toml
```

### Wrapper Script

For convenience, use the wrapper script from anywhere:

```bash
./lint-docs.sh seo content/path/to/file.txt
./lint-docs.sh 404 content/path/to/file.txt
./lint-docs.sh redirects content/atlas/netlify.toml
./lint-docs.sh all content/path/to/file.txt   # Run SEO + 404
./lint-docs.sh help                           # Show all commands
```

---

## SEO Linter Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `seo-title-missing` | Error | No title found on content page |
| `seo-title-length` | Error | Title not 15-60 characters |
| `seo-meta-missing` | Error | No meta description found |
| `seo-meta-length` | Error | Meta description not 150-200 characters |
| `structure-h1-required` | Error | No H1 heading found |
| `structure-h1-single` | Error | Multiple H1 headings |
| `structure-h2-before-h1` | Error | H2 appears before H1 |
| `image-alt-missing` | Warning | Image missing alt text |
| `image-png-figwidth` | Error | PNG missing `:figwidth:` attribute |
| `image-svg-dimensions` | Warning | SVG missing `:figwidth:` or `:width:` |
| `nested-component` | Error | Nested container component (callouts, tabs, tables) |
| `syntax-malformed-ref` | Error | Malformed `:ref:` with angle brackets |
| `syntax-empty-link` | Error | Empty link URL `[text]()` |
| `seo-low-content` | Warning | Page has < 100 characters |

---

## Redirect Linter Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `self-redirect` | Error | Page redirects to itself |
| `circular-redirect` | Error | Redirect chain loops back (A → B → C → A) |

**Supported formats:**
- `netlify.toml` - Standard Netlify redirect blocks

**Skipped:**
- Rewrites with `status = 200` (these are proxies, not redirects)

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
   [seo-title-length] Title is 10 characters (at least 15 required)
   Current: My Short Title
   Fix: Expand title to at least 15 characters

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

### Redirect Linter

```
🔴 content/kotlin/netlify.toml:111
   [self-redirect] Page redirects to itself
   Chain: /docs/drivers/kotlin/coroutine/:version/crud/query-document → /docs/drivers/kotlin/coroutine/:version/crud/query-document

🔴 content/test/netlify.toml:1
   [circular-redirect] Circular redirect detected
   Chain: /docs/a → /docs/b → /docs/c → /docs/a

Checked 2 file(s), found 2 issue(s) in 2 file(s).
```

---

## Supported File Types

- `.rst` (reStructuredText)
- `.txt` (treated as RST)
- `.md` (Markdown)
- `.mdx` (MDX)

## Paths excluded from linters

These are not treated as site content:

| Path | Behavior |
|------|-----------|
| `content/table-of-contents/` | Skipped by pre-push hook and CI changed-file step |
| `.github/agents/**` | Agent skills and flows (internal tooling). **Pre-push** skips SEO + 404 for these paths. **SEO linter** returns no issues if run manually — avoids meta/H1/nested-component noise |

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
docs-mongodb-internal/
├── lint-docs.sh                # Wrapper script (seo/404/redirects)
├── setup-docs.sh               # One-time setup script
└── .github/lint-docs/
    ├── README.md               # This file
    ├── seo-lint-cli.ts         # SEO linter CLI
    ├── seo-lint-rules.ts       # SEO linter rules (pure functions)
    ├── 404-lint-cli.ts         # 404 linter CLI (wraps lychee)
    ├── redirect-lint-cli.ts    # Redirect linter CLI
    ├── redirect-lint-rules.ts  # Redirect linter rules (cycle detection)
    ├── package.json            # Dependencies
    └── tsconfig.json           # TypeScript config
```

---

## Contact

Questions or issues? Contact: **Emet Ozar**
