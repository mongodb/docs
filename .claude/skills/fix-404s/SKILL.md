---
name: fix-404s
description: >-
  Detect and fix broken external links (404s) in MongoDB documentation files. Runs the 404 linter, strips tracking parameters, follows redirects, and searches for live replacements. Auto-applies confirmed redirects; confirms lower-confidence fixes with the writer before applying.
argument-hint: "<file-or-directory-path>"
---

# Fix External 404 Links

This skill detects broken external links in MongoDB documentation files and guides you through resolving each one. It uses redirect detection, the Wayback Machine Availability API, and web search to find replacement URLs — and always confirms with you before applying a fix or removing a link.

**External links only.** This skill covers URLs pointing outside the MongoDB documentation site. Skip any URL whose path begins with `/docs/` on `www.mongodb.com` or `mongodb.com` (e.g. `https://www.mongodb.com/docs/manual/...`). Broken links to those URLs are internal cross-reference issues and are out of scope for this skill.

---

## Step 0: Identify the target

Read `$ARGUMENTS`. If a file or directory path is provided, use it as the target. If `$ARGUMENTS` is empty, ask the user for the target before continuing.

Resolve the path to an absolute path from the repo root.

---

## Step 1: Run the 404 linter

**Skip this step** if `./lint-docs.sh` output containing 🔴 findings is already present in the conversation context from a preceding lint run — parse those findings into your working list and proceed directly to Step 2.

Before running the linter, check whether `lychee` is installed and install it if not:

```bash
if ! command -v lychee &>/dev/null; then
  if command -v brew &>/dev/null; then
    brew install lychee
  else
    cargo install lychee
  fi
fi
```

If installation fails, stop and report the error to the user.

From the repo root, run the linter against the target, piping output through grep to write only broken-link findings to a file. The 404 linter accepts individual files but not directories — if the target is a directory, expand it first:

```bash
# Single file
./lint-docs.sh 404 <file> | grep -B2 "Status:" > /tmp/404-results.txt

# Directory — expand to all .txt files and pass them together
find <directory> -name "*.txt" | xargs ./lint-docs.sh 404 | grep -B2 "Status:" > /tmp/404-results.txt
```

If `/tmp/404-results.txt` is empty, report that no broken links were found and stop — no further steps are needed.

Otherwise, read `/tmp/404-results.txt` to parse the findings. Each finding has this shape:

```
🔴 <file>:<line>
   [404] <url>
   Status: <status-code>
```

Collect all findings into a working list before proceeding to Step 2.

---

## Step 2: Resolve each broken URL

Work through the broken URL list one at a time. Run sub-steps in order; stop as soon as you find a replacement with **medium or high** confidence. Do not stop on a low-confidence match — continue searching.

### 2a. Check the status code

- **429 (rate limited):** Wait and retry with curl:

  ```bash
  sleep 10 && curl -sI "<url>"
  ```

  If the retry returns 200 or a redirect, treat it as a working link and skip to the next URL. If it still fails, continue to Step 2b.

- **5xx:** Likely a false positive (bot detection). Ask the user to verify in a browser before resolving:

  > **Possible false positive** in `<file>` (line `<line>`):
  > `<url>` — Status: 5xx (may be bot detection, not a real 404)
  > Please open in a browser and confirm.
  >
  > 1. Confirmed broken — find a replacement
  > 2. Works fine in browser — skip (false positive)

  Option 1 → Step 2b. Option 2 → next URL.

- **404 or network error:** Continue to Step 2b.

### 2b. Fetch the URL directly

```bash
curl -sLD - "<broken-url>" -o /dev/null
```

`-L` follows redirects; `-D -` prints response headers to stdout; `-o /dev/null` discards the body.

- Final status is 2xx → record the final URL (the last `Location` header in the chain, or the original URL if there was no redirect). Confidence: **high**. Go to Step 3.
- Final status is 4xx, 5xx, or curl errors → if the URL has query parameters, strip them and retry:

  ```bash
  curl -sLD - "<url-without-query-params>" -o /dev/null
  ```

  If the stripped URL returns 2xx, record it as the replacement. Confidence: **high**. Go to Step 3. Otherwise → Step 2c.

### 2c. Check the Wayback Machine

```bash
curl -s "https://archive.org/wayback/available?url=<broken-url>" | jq '.archived_snapshots.closest'
```

- `available` is `"true"` → note the `url` and `timestamp` fields. Step 2d.
- `available` is `"false"`, null, or the field is absent → Step 2e (confidence will be lower).

### 2d. Extract the page title from the archive

```bash
curl -s "<wayback-snapshot-url>" | python3 -c "
import sys, re
html = sys.stdin.read()
title = re.search(r'<title[^>]*>(.*?)</title>', html, re.IGNORECASE | re.DOTALL)
h1 = re.search(r'<h1[^>]*>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)
print('Title:', re.sub(r'<[^>]+>', '', title.group(1)).strip() if title else 'not found')
print('H1:', re.sub(r'<[^>]+>', '', h1.group(1)).strip() if h1 else 'not found')
"
```

Prefer H1 over `<title>` tag. Use the result in Step 2e. If curl times out or returns nothing, use URL path keywords instead.

### 2e. Search for the current live URL

Before searching, note:

1. **Page type** — wiki, cookbook, man page, API reference, blog post? The replacement must match. A wiki page is not equivalent to a man page on the same topic.
2. **URL fragment** — if the original has `#anchor`, the replacement must have an equivalent confirmed section. Do not propose a URL without a verified anchor.

Search in this order; stop at the first confident match:

1. `site:<original-domain> "<title keywords>"` — same domain, page moved
2. `"<project name>" "<section name>" documentation` — project's canonical source (GitHub, GitLab, Launchpad, successor domain)
3. `"<title>" <topic keywords>` — broad search

For each candidate: fetch to confirm it loads. If original had `#fragment`, verify the equivalent anchor exists in the fetched page before proposing.

Assign confidence using this scale:
- **high** — URL fetched directly and confirmed live (redirect or 200)
- **medium** — archive confirmed; live replacement matches page type and has a verified anchor
- **low** — no archive, type mismatch, or anchor unconfirmed

No match at medium or high confidence → unresolved → Step 3.

---

## Step 3: Present findings and confirm each fix

### High confidence — auto-apply

If the replacement has **high** confidence (a confirmed redirect or 200 from Step 2b), apply it immediately without asking. Report what was done:

> **Auto-fixed** in `<file>` (line `<line>`):
> `<broken-url>` → `<replacement-url>` *(redirect confirmed)*

Then move on to the next URL.

### Medium or low confidence — confirm first

After resolving a URL (or exhausting the resolution sequence), read the sentence containing the link to determine its role before presenting options:

- **Supplementary reference** — the link is a "learn more," a version release note, or a "see also." The surrounding text stands on its own without the link. Recommend removing it.
- **Essential reference** — the URL is the actionable destination itself (a download, a script, an API method the reader must access). Removing the link leaves the instruction incomplete. Present all options without a recommendation and flag that a working replacement should be found.

Never propose a `web.archive.org` URL as a replacement. The archive is only used in Steps 2c and 2d to extract page title and content for searching — the goal is always a current live URL.

Always include the literal URL in the **Proposed fix** line. Never describe a URL without providing it (e.g., do not write "a match was found" — write the full URL so the user can inspect it).

Present the finding to the user before making any change. Use this format:

> **Broken link** in `<file>` (line `<line>`):
> `<broken-url>`
>
> **Proposed fix:** Replace with `<replacement-url>` *(confidence: medium / low)*
> **Source:** archive-assisted search / web search only
>
> Options:
> 1. Apply this replacement
> 2. Enter a different URL manually
> 3. Remove the link (rewrite surrounding text as plain prose)
> 4. Skip for now

If the URL is **unresolved** (no replacement found), present:

> **Broken link** in `<file>` (line `<line>`):
> `<broken-url>`
>
> No replacement URL found. How would you like to handle this?
>
> Options:
> 1. Enter a replacement URL manually
> 2. Remove the link (rewrite surrounding text as plain prose)
> 3. Skip for now

Wait for the user's response before proceeding.

---

## Step 4: Apply the fix

Apply the fix chosen by the user.

### Locating the URL in the RST file

Use the line number from the linter output to locate the URL. External URLs in docs source appear in several forms — identify which applies and edit accordingly. Read the relevant asset file for the exact syntax:

**Inline hyperlink** (`assets/inline-hyperlink.rst`):
Replace only the URL inside the angle brackets. Preserve the link text and trailing underscore.

**Standalone hyperlink target** (`assets/standalone-hyperlink-target.rst`):
Replace only the URL. Preserve the label name and directive syntax.

**Bare URL in prose** (`assets/bare-url.rst`):
Replace the bare URL in place.

**Multi-line URL** (line-wrapped in the source file):
The linter normalizes multi-line URLs before checking, so the line number points to the start of the URL. Read the surrounding lines to reconstruct and replace the full URL.

### Removing a link

When the user chooses to remove the link:

1. Read the full sentence containing the link.
2. Rewrite the sentence as plain prose without a hyperlink. Preserve the meaning — do not simply delete the sentence.
3. If the link was a standalone `.. _label: url` target with no prose context, remove the target line entirely and check for any `:ref:` to that label in the same file; update or remove those too.

Do not leave orphaned RST link targets or unused named references.

---

## Step 5: Verify

After all fixes are applied, re-run the 404 linter on the same target:

```bash
./lint-docs.sh 404 <target>
```

If any broken links remain (from skipped items or new issues), report them to the user. Do not re-enter the resolution loop automatically — present the remaining list and ask how to proceed.

---
