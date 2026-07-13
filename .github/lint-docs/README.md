# Documentation Linters

Automated linters for MongoDB documentation that check SEO compliance, broken links, redirect issues, and findability (taxonomy facets, keyword hints, docs URL shape).

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
| **Findability Linter** | Pre-push hook + PR | No (advisory; exits 1 only on facet **errors**) |
| **Redirect Linter** | PR (when redirect files change) | **Yes** |

SEO, 404, and findability linters run on every push and PR as warnings. The redirect linter runs only when redirect files change and **will block the PR** if circular redirects are found.

You can also run all linters manually on any files.

---

## Quick Start (Manual)

### SEO Linter

Checks for SEO issues: meta descriptions, titles, headings, image attributes.

```bash
# Check a file
npx tsx .github/lint-docs/seo-lint-cli.ts content/path/to/file.txt

# Check a directory (expands to all .txt, .rst, .md, .mdx files recursively)
npx tsx .github/lint-docs/seo-lint-cli.ts content/manual/source/

# Export results to a file (for large scans)
npx tsx .github/lint-docs/seo-lint-cli.ts -o results.txt content/manual/source/
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

### Findability Linter

Checks taxonomy `.. facet::` names and values (against `facet-allowlist.json`), optional `synonyms.csv` overlap for `.. meta::` keywords, redundant keywords vs title, `mongodb.com` URLs missing a trailing slash, and missing `code example` in keywords when language-tagged code blocks exist.

```bash
npx tsx .github/lint-docs/findability-lint-cli.ts content/path/to/file.txt

# Optional: path to docs-search-transport resources/synonyms.csv
npx tsx .github/lint-docs/findability-lint-cli.ts --synonyms /path/to/synonyms.csv content/path/to/file.txt

pnpm --dir .github/lint-docs run findability-selftest
```

### Wrapper Script

For convenience, use the wrapper script from anywhere:

```bash
./lint-docs.sh seo content/path/to/file.txt
./lint-docs.sh 404 content/path/to/file.txt
./lint-docs.sh findability content/path/to/file.txt
./lint-docs.sh redirects content/atlas/netlify.toml
./lint-docs.sh all content/path/to/file.txt   # Run SEO + 404 + findability
./lint-docs.sh help                           # Show all commands
```

---

## Findability Linter Rules

| Rule | Severity | Description |
|------|----------|-------------|
| `facet-unknown-name` | Warning | `:name:` is not one of the known facet keys in `facet-allowlist.json` |
| `facet-invalid-genre` | Error | `genre` value not `reference` or `tutorial` |
| `facet-invalid-programming-language` | Error | `programming_language` value not in allowlist |
| `facet-invalid-target-product` | Error | `target_product` value not in allowlist (synced from `snooty-parser/taxonomy.toml`) |
| `facet-invalid-sub-product` | Error | `sub_product` value not in allowlist (synced from `snooty-parser/taxonomy.toml`) |
| `keyword-in-synonyms-file` | Warning | A keyword phrase matches the synonyms list (`--synonyms` only) |
| `keyword-echoes-title` | Warning | Keyword duplicates a significant title/H1 token |
| `docs-url-missing-trailing-slash` | Warning | `mongodb.com` URL path should end with `/` before `?` or `#` |
| `code-example-keyword-missing` | Warning | Language-tagged code blocks but no `code example` in `:keywords:` |

Allowlists for facets live in `facet-allowlist.json`. To update when taxonomy changes:

- **`target_product` and `sub_product`**: copy values from `snooty/taxonomy.toml` in `mongodb/snooty-parser`.
- **`programming_language`**: update from `rstspec.toml` in the same repo when new languages are added to the `programming_language` field.
- **`genre`**: fixed values (`reference`, `tutorial`); only change if Snooty adds new genres.

Open a PR to `docs-mongodb-internal` with the updated `facet-allowlist.json` after any taxonomy change.

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
| `image-alt-length` | Warning | Alt text exceeds 125 characters |
| `image-png-figwidth` | Error | PNG missing `:figwidth:` attribute |
| `image-svg-dimensions` | Warning | SVG missing `:figwidth:` or `:width:` |
| `seo-low-content` | Warning | Page has < 100 words |

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
   [seo-title-length] Title is 10 characters (at least 30 required)
   Current: My Short Title
   Fix: Expand title to at least 30 characters

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

### Findability Linter

```
🔴 content/my-page.txt:4
   [facet-invalid-genre] Invalid genre value "novel"
   Current: novel
   Fix: Use one of: reference, tutorial

🟡 content/my-page.txt:10
   [keyword-echoes-title] Keyword "install" already appears as a significant token in the title — may be redundant for search weighting
   Current: install
   Fix: Drop the keyword if it duplicates the title/H1 (per taxonomy guidance)

🟡 content/my-page.txt:15
   [docs-url-missing-trailing-slash] MongoDB URL should use a trailing slash before query or fragment (canonical SEO): https://docs.mongodb.com/manual/operators
   Current: https://docs.mongodb.com/manual/operators
   Fix: Add / before ? or #, or at end of path (e.g. .../manual/operators/)

Found 1 error(s), 2 warning(s)
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
| `code-example-tests/` | Skipped by pre-push hook; never triggers CI (not under `content/`) |
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
├── lint-docs.sh                # Wrapper script (seo/404/findability/redirects)
├── setup-docs.sh               # One-time setup script
└── .github/lint-docs/
    ├── README.md                       # This file
    ├── seo-lint-cli.ts                 # SEO linter CLI
    ├── seo-lint-rules.ts               # SEO linter rules (pure functions)
    ├── 404-lint-cli.ts                 # 404 linter CLI (wraps lychee)
    ├── redirect-lint-cli.ts            # Redirect linter CLI
    ├── redirect-lint-rules.ts          # Redirect linter rules (cycle detection)
    ├── findability-lint-cli.ts         # Findability linter CLI
    ├── findability-lint-rules.ts       # Findability linter rules (pure functions)
    ├── findability-lint-selftest.ts    # Findability linter regression tests
    ├── facet-allowlist.json            # Approved facet names and values
    ├── package.json                    # Dependencies
    └── tsconfig.json                   # TypeScript config
```

---

## Contact

Questions or issues? Contact: **Emet Ozar**
