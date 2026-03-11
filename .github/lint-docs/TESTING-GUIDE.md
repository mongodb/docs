# 🧪 Testing the SEO & 404 Linters

This guide helps you test the new documentation linters before they're officially released.

## One-Time Setup

### 1. Switch to the test branch

```bash
cd ~/docs-mongodb-internal
git fetch origin
git checkout add-ai-doc-reviewer
```

### 2. Install linter dependencies

```bash
cd .github/lint-docs
npm install
cd ../..
```

### 3. Install lychee (for 404 linter only)

```bash
brew install lychee
```

> **Note:** If you don't have Homebrew, see [brew.sh](https://brew.sh) or skip the 404 linter for now.

---

## Running the Linters

You can run the linters from **any directory** in the repo - no need to be at the root!

### Option 1: Using the wrapper script (easiest)

```bash
# From anywhere in the repo:
./lint-docs.sh seo content/path/to/your-file.txt
./lint-docs.sh 404 content/path/to/your-file.txt
./lint-docs.sh all content/path/to/your-file.txt   # Run both
```

### Option 2: Direct command

#### SEO Linter

Checks for SEO issues like missing meta descriptions, title length, image attributes, etc.

```bash
# Check a single file
npx tsx .github/lint-docs/seo-lint-cli.ts content/path/to/your-file.txt

# Check multiple files
npx tsx .github/lint-docs/seo-lint-cli.ts content/manual/current/source/tutorial/*.txt

# Check files you're working on (relative paths work too!)
npx tsx .github/lint-docs/seo-lint-cli.ts my-new-page.txt
```

#### 404 Linter

Checks for broken external links in your documentation.

```bash
# Check a single file
npx tsx .github/lint-docs/404-lint-cli.ts content/path/to/your-file.txt

# Check multiple files  
npx tsx .github/lint-docs/404-lint-cli.ts content/drivers/node/current/source/*.txt
```

### Option 3: Export results to a file

When checking many files, results may scroll off the terminal. Use `-o` to save results:

```bash
# SEO linter - export to file
npx tsx .github/lint-docs/seo-lint-cli.ts -o seo-results.txt content/**/*.txt

# 404 linter - export to file
npx tsx .github/lint-docs/404-lint-cli.ts -o broken-links.txt content/**/*.txt

# Results appear in terminal AND are saved to the file
```

---

## Example Output

### SEO Linter Output

```
🔴 content/my-page.txt:1
   [seo-meta-missing] No meta description found (required for content pages)
   Fix: Add description via :description: directive or YAML frontmatter

🔴 content/my-page.txt:4
   [seo-title-length] Title is 20 characters (minimum 30 required)
   Current: My Short Title
   Fix: Expand title to 30-60 characters

🟡 content/my-page.txt:1
   [seo-low-content] Low content page (83 characters)
   Fix: Add more content or add noindex directive

Found 2 error(s), 1 warning(s)
```

### 404 Linter Output

```
🔗 Checking 3 file(s) for broken links...

🔴 content/tutorial/install.txt
   [404] https://example.com/broken-link
   Status: 404

Found 1 broken link(s)
```

---

## What the SEO Linter Checks

| Rule | Severity | Description |
|------|----------|-------------|
| `seo-title-missing` | Error | No title found |
| `seo-title-length` | Error | Title not 30-60 characters |
| `seo-meta-missing` | Error | No meta description |
| `seo-meta-length` | Error | Meta description not 150-200 characters |
| `structure-h1-required` | Error | No H1 heading |
| `image-alt-missing` | Warning | Image missing alt text |
| `image-png-figwidth` | Error | PNG missing `:figwidth:` |
| `seo-low-content` | Warning | Page has < 100 characters |

---

## Requirements

- **Node.js** v18 or higher
- **lychee** (for 404 linter only): `brew install lychee`

---

## FAQ

**Do I need to be at the repo root?**  
No! You can run the linters from any directory in the repo. File paths are resolved relative to your current location.

**Will this block my commits or pushes?**  
No - the linters are **advisory only**. They show warnings but always allow the push to proceed.

**Can I mix file types?**  
Yes! `.rst`, `.txt`, `.md`, `.mdx` can all be checked together in one command.

**Does it show line numbers?**  
Yes! Output format is `filename:line` so you can jump directly to the issue.

**I see `.github/lint-docs/` being staged - is that expected?**  
The folder itself should be committed (it's the linter code). But `node_modules/` inside it is gitignored. If you see unexpected changes, run `git status` to check what's actually staged.

---

## Updating to Latest Version

If you already have the branch, pull the latest:

```bash
git checkout add-ai-doc-reviewer
git pull
```

---

## Feedback

After testing, please share your feedback:
- Did the linters catch real issues?
- Were there false positives?
- Was the output clear and actionable?
- Any suggestions for improvement?

Contact: Emet Ozar
