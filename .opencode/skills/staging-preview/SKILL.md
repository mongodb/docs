---
name: staging-preview
description: Generate staging preview links for a MongoDB docs PR. Polls for the builder-bot deploy preview comment, then constructs page-specific URLs for changed .txt files, includes, YAML extracts, images, and TOC files. Use when you need to generate or refresh staging links for a pull request.
argument-hint: <PR_NUMBER>
---

# Generate Staging Preview Links

This skill generates staging preview links for a MongoDB docs pull request. It is called by the open-pr and captain-v2 skills after a PR is created or identified, but can also be invoked standalone to refresh staging links on an existing PR.

## Inputs

- `PR_NUMBER` — the integer PR number

## Step 1 — Fetch changed files and check for documentation files

Run the following command to get the list of changed files for the PR:

```bash
gh pr diff <PR_NUMBER> --name-only
```

If any line in the output starts with `content/`, proceed to Step 2. Otherwise, return `N/A` as the staging links content and exit.

## Step 2 — Fetch the builder-bot comment

Run the following polling loop as a background Bash process (`run_in_background: true`):

```bash
attempts=0
while [ $attempts -lt 10 ]; do
  result=$(gh pr view <PR_NUMBER> --comments --json comments \
    --jq '.comments[].body' 2>/dev/null)
  if echo "$result" | grep -q "😎 Deploy Preview"; then
    echo "BOT_COMMENT_FOUND"
    exit 0
  fi
  attempts=$((attempts + 1))
  sleep 15
done
echo "BOT_COMMENT_TIMEOUT"
```

Watch the background process output and wait for either `BOT_COMMENT_FOUND` or `BOT_COMMENT_TIMEOUT` to appear.

- If `BOT_COMMENT_FOUND`: fetch the full comments with `gh pr view <PR_NUMBER> --comments --json comments` and parse the builder-bot entry.
- If `BOT_COMMENT_TIMEOUT`: return a note that staging links were not available and exit.

Look for a comment from `docs-builder-bot` (or similar automation account) that contains lines matching the pattern:

```
| 😎 Deploy Preview | <base-url> |
```

Each such line gives you the Netlify base URL for one site (e.g. `https://deploy-preview-19378--mongodb-manual.netlify.app/docs`). Extract the URL from between the second and third pipe characters.

## Step 3 — Construct page-specific URLs for changed pages

For each changed `.txt` file under `content/`, build a full staging URL:

1. **Find the matching base URL** — The bot comment will have one entry per built site. Match the changed file's `<site>` directory to the right base URL (the slug contains the site name, for example - `mongodb-manual` for `content/manual`).
2. **Extract the page path** — Take everything after `source/` in the file path and drop the `.txt` extension.
3. **Check for a version segment** — If the path is `content/<site>/<version>/source/<page-path>.txt`, the version segment (such as `upcoming`, `current`, `v8.0`) must be inserted between the base URL and the page path.
4. **Assemble the URL** — Append `/{version}/{page-path}/` (or just `/{page-path}/` if unversioned) to the base URL from the bot comment.

### Examples

Bot comment line:
```
😎 Deploy Preview ,https://deploy-preview-19378--mongodb-manual.netlify.app/docs
```

- File: `content/manual/upcoming/source/reference/operator/aggregation/mergeObjects.txt`
- Staging URL: `https://deploy-preview-19378--mongodb-manual.netlify.app/docs/upcoming/reference/operator/aggregation/mergeObjects/`

---

Bot comment line:
```
😎 Deploy Preview ,https://temp-pr-19378--mongodb-csharp.netlify.app/docs/drivers/csharp
```

- File: `content/csharp/current/source/fundamentals/crud/read.txt`
- Staging URL: `https://temp-pr-19378--mongodb-csharp.netlify.app/docs/drivers/csharp/current/fundamentals/crud/read/`

---

Format each link as a Markdown list item with a descriptive label:

```markdown
- [Page title](https://...)
```

Use a short, human-readable label for each link (e.g., the page heading or operator name + context). Omit non-page files (images, includes, code examples, test files, etc.) — only link to renderable documentation pages.

## Step 4 — Construct page-specific URLs for changed `includes` files

Each `<site>/source` directory (or `<site>/<version>/source` directory for versioned docs) has an `includes` directory. Files under `includes/` are rendered on multiple pages using include directives.

**Format reference:** Read `references/rst-include-patterns.md` for include directive names, virtual path formats, and the page file extension. If this project uses `.mdx` pages instead of `.txt`, read `references/mdx-include-patterns.md` instead.

For each changed file that has `includes/` in its path, first check whether the file is a YAML extract container or a regular include file, then follow the appropriate path below.

### YAML extract files (`.yaml`)

YAML extract files contain multiple named blocks under `ref:` keys. They are never referenced directly — each `ref:` maps to a virtual include path (see `references/rst-include-patterns.md` for the format).

1. **Identify changed refs from the diff** — Run the following two commands and cross-reference their output:
   - `grep -n "^ref:" <file>` — get the line numbers of all `ref:` blocks in the file.
   - `git diff $(git merge-base HEAD origin/HEAD)..HEAD -- <file>` — get the diff. Parse the `@@` hunk headers to find the line numbers of changed lines (the `+<start>` value in `@@ -a,b +start,c @@` gives the new-file line number of each hunk).

   For each changed hunk, find the largest `ref:` line number that is less than or equal to the hunk's starting line number. That is the ref block containing the change. Collect only those ref values.
2. **For each changed ref**, construct the virtual include path using the format from the format reference file.
3. **Search for page files that include each virtual path** using the same grep approach as the regular include steps below. Collect all unique page files found across all changed refs.
4. **If no page files are found for any changed ref**, alert the user and skip to the next changed file.
5. **Build staging URLs** for the collected page files following Step 3. If many pages are found, include a representative sample (up to five) and note in the PR body that additional pages may be affected.

### Regular include files

Find a single page that renders the file and build a full staging URL for it:

1. **Extract the file path** — Take everything after `source` in the file path. The result should begin with `/includes/`.
2. **Search for files that include the changed file**. Use the `grep` command to search for the file path using the include directive patterns from the format reference file. For unversioned docs, search in the `<site>/source` directory. For versioned docs, search in the `<site>/<version>/source` directory, where `<version>` must match the version of the changed includes file.
3. **If no files include the changed file**, alert the user and skip to the next changed file.
4. **Find a page file that includes the changed file** — From the list of files that include the changed file, find any page file (see the format reference file for the extension). Follow the instructions in Step 3 to build the staging URL for that file.
5. **If none of the files that include the changed file are page files**, take that intermediate file, treat it as the new changed file, and repeat steps 1–4 to extract its path and search for files that include it. Do this until you have a staging URL for a page file or reach a dead end. If you reach a dead end, alert the user and skip to the next changed file.

If you did not already, add the constructed staging URL to the list of staging links with a descriptive label:

```markdown
- [Page title](https://...)
```

## Step 5 — Handle remaining edge cases

**Images and diagrams** (`images/` or other asset directories) — Asset files are not directly renderable. Link to a parent `.txt` page that contains the image or diagram instead. Use the same grep approach as Step 4 to find a page that references the asset.

**TOC/navigation changes** (`content/table-of-contents/`) — For each changed hunk in a TOC file, find the parent section URL by scanning the diff context upward from the changed lines to the nearest ancestor `url:` field that belongs to a section node — one that has an `items:` array of child entries. That parent section URL is the staging link target — it shows that the sidebar for that section renders correctly after the change.

- Replace the `:version` placeholder in the URL with the appropriate version string (e.g., `upcoming`, `v8.0`).
- Assemble the staging URL using the Netlify base URL from the bot comment plus the versioned path.
- If multiple hunks affect different parent sections, produce one staging link per distinct section.
- Do this even when the PR also includes content changes — include both section links and any page-specific links.
- If the hunk removes a page entry entirely (a deleted `.txt` file), note in the PR description that the page was deleted and link to its former parent section to confirm it no longer appears in navigation.

## Output

Return the complete staging links section as a Markdown list, ready to be inserted into a PR body. If no links could be generated, return `N/A`.
