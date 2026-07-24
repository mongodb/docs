---
name: fix-seo
description: "Fix SEO issues in MongoDB docs files. Generates missing titles and meta descriptions, corrects length violations, and fixes heading and image issues. Use when asked to fix SEO issues, add missing titles or meta descriptions, or clean up SEO errors. Also invoked automatically by lint-docs.sh when SEO errors are found."
argument-hint: "<file-or-directory-path>"
---

# Fix SEO Issues

This skill detects SEO issues in MongoDB documentation files and fixes what it can — generating titles, meta descriptions, and correcting mechanical errors. It applies all fixes directly and presents a summary so the writer can review changes on the PR.

---

## Step 0: Identify the target and load format instructions

Read `$ARGUMENTS`. If a file or directory path is provided, use it as the target. If `$ARGUMENTS` is empty, ask the user for the target before continuing.

Resolve the path to an absolute path from the repo root.

Read the following files so their instructions are available for the rest of the skill:

- `.github/lint-docs/README.md` — authoritative rule definitions and severities
- `.claude/skills/fix-seo/assets/rst.md` — RST-specific fix instructions

---

## Step 1: Run the SEO linter

**Skip this step** if `./lint-docs.sh` output containing 🔴 or 🟡 findings is already present in the conversation context from a preceding lint run — parse those findings into your working list and proceed directly to Step 2.

From the repo root, run the linter and always write output to a file to avoid truncation. Pass a file or directory — the linter expands directories automatically:

```bash
SEO_RESULTS=$(mktemp /tmp/seo-results-XXXXXX.txt)
./lint-docs.sh seo <file-or-directory> -o "$SEO_RESULTS"
cat "$SEO_RESULTS"
```

If the linter command fails (script error, missing file, or unrecognized path), report the error output and stop — do not attempt fixes.

If no issues are found (`✅ SEO linter passed`), report that and stop.

Parse the output into a working list. Each finding has this shape:

```
🔴 <file>:<line>
   [<rule>] <message>
   Current: <current-value>   ← present for some rules
   Fix: <suggestion>
```

Collect all findings before proceeding to Step 2.

---

## Step 2: Classify issues by fix type

Group findings by file. For each finding, cross-reference the rule name against the SEO Linter Rules table in `.github/lint-docs/README.md` (loaded in Step 0) to understand what the rule checks and its severity. Then classify it as one of:

### Content fixes — Claude generates and applies directly

**Before acting on `seo-title-length` or `seo-meta-length` findings:** the linter may count markup characters that are not visible to readers, so the reported length can be wrong. Before editing, confirm the true visible length using the length-counting guidance in the format asset file for the file's extension (loaded in Step 0). If the visible length is within range, treat the finding as a false positive and report it to the writer instead of editing the file.

| Rule | What to generate |
|------|-----------------|
| `seo-title-missing` | Title from H1 heading, adapted to 30–60 chars |
| `seo-title-length` (too long) | Shorten existing title to ≤60 chars |
| `seo-title-length` (too short) | Expand existing title to ≥30 chars |
| `seo-meta-missing` | 150–200 char description from page intro |
| `seo-meta-length` (too short) | Expand existing description to ≥150 chars |
| `seo-meta-length` (too long) | Shorten existing description to ≤200 chars |
| `structure-h1-required` | Generate an H1 from page content and add it |
| `structure-h1-single` | Identify the correct H1; demote all others to H2 |
| `structure-h2-before-h1` | Move the H2 content to after the H1 |
| `image-alt-missing` | Read the image file and generate descriptive alt text (≤125 chars) |
| `image-alt-length` | Shorten existing alt text to ≤125 chars |
| `image-png-figwidth` | Read the PNG file to extract width; add `:figwidth:` |
| `image-svg-dimensions` | Read the SVG file to extract width/height; add to directive |

### Report-only issues — surface to user before applying other fixes

| Rule | Action |
|------|--------|
| `seo-low-content` | Present options to writer and wait for instruction before making any changes |

---

## Step 3: Apply fixes

### Content fixes

For each file with content fix issues, read the file before generating anything. Do not generate content from the linter output alone.

**Fixing heading structure (`structure-h1-required`, `structure-h1-single`, `structure-h2-before-h1`):**

- `structure-h1-required`: Read the file and generate an H1 from the page content or filename. In RST, an H1 is text between two `====` lines. Place it before any H2s and after the opening metadata/directives.
- `structure-h1-single`: Identify which H1 is the correct page title (typically the first one). Demote all others: in RST, replace their `====` overline and underline with `----` underline only.
- `structure-h2-before-h1`: Move the H2 content to after the H1, preserving its heading level.

**Fixing images (`image-alt-missing`, `image-png-figwidth`, `image-svg-dimensions`):**

- `image-alt-missing`: Read the image file to understand its visual content, then add a `:alt:` option to the `.. figure::` or `.. image::` directive describing what the image shows. Keep alt text to 125 characters or fewer.
- `image-alt-length`: Shorten the existing `:alt:` value to 125 characters or fewer. Preserve the key visual information; drop redundant phrases like "Image of" or "Screenshot showing".
- `image-png-figwidth`: Read the PNG file to extract its pixel width, then add `:figwidth: <width>px` to the directive. If the extracted width exceeds 1200px, do not add `:figwidth:` automatically — report the value to the writer and ask them to confirm the intended display width, since retina/full-resolution screenshots often need to be scaled down.
- `image-svg-dimensions`: Read the SVG file (it is plain text) and find the `width` and `height` attributes or `viewBox`. Add `:figwidth:` or `:width:` to the directive.

**Low-content pages (`seo-low-content`):**

Report this finding to the writer — do not apply automated fixes. Include the page path and character count from the linter output, and present the following options:

1. **Generated page** — if the page is auto-generated, ignore it and move on.
2. **Fold into another page** — merge the content into a related page and add a redirect.
3. **Convert to a TOC group** — if the page has child pages, replace its unified TOC entry with a `GroupTocItem` (`group: true`, no `url`) so it becomes a non-navigable section label. Invoke the unified-toc skill to make this change. Delete the backing page file and add a redirect if it was previously accessible.
4. **Add more content** — expand the page to meet content requirements.
5. **Keep as-is** — add noindex using the syntax from the format asset file.

Wait for the writer to choose before making any changes.

For all title and description fixes, write changes using the instructions in the format asset file for the file's extension. Do not use "simply," "just," or "easy."

**Fixing the title:**

The H1 is the page title.

1. Extract the H1 heading text.
2. If too long (>60 chars): drop leading qualifiers ("How to", "Introduction to", "Overview of") or trim to the most specific noun phrase.
3. If too short (<30 chars): append context from the first H2 or opening paragraph. Example: "Atlas" → "Atlas Vector Search Configuration".
4. Do not include "MongoDB" unless the page is a product landing page.
5. Use AP headline-style capitalization: capitalize the first, last, and all significant words. Do not capitalize articles, coordinating conjunctions, or prepositions unless they are the first or last word. Do not capitalize literal command names or product/software names that always begin lowercase.
6. Do not restate the title as the description or vice versa.
7. After editing the title text, apply any heading-markup and length-counting requirements from the format asset file for the file's extension (loaded in Step 0), including product-name substitution conventions.

**Fixing the meta description:**

1. Check whether a description already exists in the file.
2. If a description exists and is valid (not a null/undefined placeholder), check that it is unique and between 150–200 chars. If it meets both criteria, leave it unchanged. If it is too short or too long, edit it in place — do not rewrite it from scratch.
3. If no description exists or the existing value is a null/undefined placeholder, generate one from page content:
   - Read the first body paragraph after the H1 (skip directives, headings, and blank lines to reach prose). If the opening content is code-heavy or table-heavy, scan further.
   - Draft 150–200 chars: active voice, second person, present tense. Lead with what the page helps the reader accomplish. Do not start with "This page" or repeat the title verbatim.
   - Target 160 chars — leaves a buffer on both sides of the range.

---

## Step 4: Verify

Re-run the SEO linter on the same target after all fixes:

```bash
SEO_RESULTS=$(mktemp /tmp/seo-results-XXXXXX.txt)
./lint-docs.sh seo <target> -o "$SEO_RESULTS" && cat "$SEO_RESULTS"
```

If issues remain (skipped items or new issues introduced), report them. Do not re-enter the fix loop — present the list and ask how to proceed.

---

## Step 5: Report

Report to the user in this order:

1. **Fixed**: each issue resolved, with file, rule, and the old → new value so the writer can review what changed before committing.
2. **Report-only issues**: list any issues that require manual action, with a brief note on what is needed for each.
3. **Remaining errors**: any issues still present after Step 4.

Then ask: "Ready to commit?"

---

## Example

**Linter output:**

```
🔴 source/reference/my-feature.txt:1
   [seo-meta-missing] Page is missing a meta description
```

**Before (`source/reference/my-feature.txt`):**

```rst
.. _my-feature:

==========
My Feature
==========

Use My Feature to configure your deployment.
```

**After:**

```rst
.. meta::
   :description: Use My Feature to configure your MongoDB
      deployment, set connection options, and manage settings
      from the Atlas UI.

.. _my-feature:

==========
My Feature
==========

Use My Feature to configure your deployment.
```
