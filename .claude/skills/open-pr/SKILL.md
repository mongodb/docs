---
name: open-pr
description: "Opens a GitHub Pull Request with the standard PR template: Description, Staging Links, and JIRA ticket. Infers the ticket from the branch name and generates staging preview URLs from changed files after the PR is created."
argument-hint: "[--base <branch>] [optional notes or extra context]"
---

# Open a Pull Request

Follow these steps in order to create a well-formed PR.

## Step 0 — Parse arguments

Check `$ARGUMENTS` for a `--base <branch>` flag:

- If `--base <branch>` is present, use that branch as the PR base and treat the remainder of `$ARGUMENTS` as extra description context.
- If `--base` is not present, default the base branch to `main`.

## Step 1 — Gather context

Run these in parallel:

- `git branch --show-current` — get the current branch name
- `git log --oneline $(git merge-base HEAD origin/HEAD)..HEAD` — list commits on this branch
- `git diff --name-only $(git merge-base HEAD origin/HEAD)..HEAD` — list all changed files

## Step 1b — Check for documentation files

From the changed files list, check whether any files exist under `content/`. Set a flag `HAS_DOC_FILES` to true if at least one such file exists, false otherwise.

## Step 2 — Derive the JIRA ticket

Parse the ticket ID from the branch name. Branch names follow the pattern `DOCSP-NNNNN-<description>`. Extract the `DOCSP-NNNNN` portion.

- Ticket ID: `DOCSP-NNNNN`
- Ticket URL: `https://jira.mongodb.org/browse/DOCSP-NNNNN`

If the branch name does not contain a DOCSP ticket ID, ask the user for the ticket number before continuing.

## Step 3 — Build a PR title

Use the format: `DOCSP-NNNNN <short description of the change>` — same pattern as the branch name but human-readable. Example: `DOCSP-55497 disambiguate mergeObjects`.

## Step 4 — Write the Description section

Based on the commit messages, changed files, and any extra context provided in `$ARGUMENTS`, write a clear prose summary of what the PR does. Focus on *what changed and why*, not just listing files. Follow the tone and style of the example summary in the reference PR: concise bullet points under a short introductory sentence work well for multi-page changes.

## Step 5 — Create or identify the PR

First, check whether a PR already exists for the current branch by its exact local branch name:

```bash
gh pr list --head <current-branch> --json number,url 2>/dev/null
```

**If a PR already exists:** the list will contain one entry — capture the PR number and URL from it. Inform the user that an existing PR was found and that you will update its description. Skip to Step 6.

**If no PR exists:** create the PR as a draft with a temporary body:

```bash
gh pr create \
  --draft \
  --title "<title from Step 3>" \
  --body "Draft — updating body now..." \
  --base <base branch from Step 0>
```

Capture the PR number from the output URL (the integer at the end of the URL).

## Step 6 — Build staging preview links

If `HAS_DOC_FILES` is false, skip this step and set the staging links content to `N/A`. Continue to Step 7.

The docs builder-bot automatically posts a comment to every PR with the base staging URLs for each site that was built. Use those URLs as the source of truth rather than computing them manually.

### Step 6a — Fetch the builder-bot comment

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

Then use the Monitor tool to wait for either `BOT_COMMENT_FOUND` or `BOT_COMMENT_TIMEOUT` to appear in the output.

- If `BOT_COMMENT_FOUND`: fetch the full comments with `gh pr view <PR_NUMBER> --comments --json comments` and parse the builder-bot entry.
- If `BOT_COMMENT_TIMEOUT`: note in the PR body that staging links were not available and continue to Step 7.

Look for a comment from `docs-builder-bot` (or similar automation account) that contains lines matching the pattern:

```
| 😎 Deploy Preview | <base-url> |
```

Each such line gives you the Netlify base URL for one site (e.g. `https://deploy-preview-19378--mongodb-manual.netlify.app/docs`). Extract the URL from between the second and third pipe characters.

### Step 6b — Construct page-specific URLs for changed pages

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

### Step 6c — Construct page-specific URLs for changed `includes` files

Each `<site>/source` directory (or `<site>/<version>/source` directory for versioned docs) has an `includes` directory. Files under `includes/` are rendered on multiple pages using the `.. include::` or `.. literalinclude` directive. 

For each changed file that has `includes/` in its path, first check whether the file is a YAML extract container or a regular include file, then follow the appropriate path below.

#### YAML extract files (`.yaml`)

YAML extract files contain multiple named blocks under `ref:` keys. They are never referenced directly — each `ref:` maps to a virtual path `/includes/extracts/<ref>.rst` that pages include with `.. include::`.

1. **Identify changed refs from the diff** — Run the following two commands and cross-reference their output:
   - `grep -n "^ref:" <file>` — get the line numbers of all `ref:` blocks in the file.
   - `git diff $(git merge-base HEAD origin/HEAD)..HEAD -- <file>` — get the diff. Parse the `@@` hunk headers to find the line numbers of changed lines (the `+<start>` value in `@@ -a,b +start,c @@` gives the new-file line number of each hunk).
   
   For each changed hunk, find the largest `ref:` line number that is less than or equal to the hunk's starting line number. That is the ref block containing the change. Collect only those ref values.
2. **For each changed ref**, construct the virtual include path `/includes/extracts/<ref>.rst`.
3. **Search for `.txt` files that include each virtual path** using the same grep approach as the regular include steps below. Collect all unique `.txt` files found across all changed refs.
4. **If no `.txt` files are found for any changed ref**, alert the user and skip to the next changed file.
5. **Build staging URLs** for the collected `.txt` files following Step 6b. If many pages are found, include a representative sample (up to five) and note in the PR body that additional pages may be affected.

#### Regular include files (`.rst`, `.txt`, etc.)

Find a single page that renders the file and build a full staging URL for it:

1. **Extract the file path** — Take everything after `source` in the file path. The result should begin with `/includes/`.
2. **Search for files that include the changed file**. Use the `grep` command to search for the file path. For unversioned docs, search in the `<site>/source` directory. For versioned docs, search in the `<site>/<version>/source` directory, where `<version>` must match the version of the changed includes file. The grep command should search for the file path with the following pattern: `.. include:: <file-path>` or `.. literalinclude:: <file-path>`.
3. **If no files include the changed file**, alert the user and skip to the next changed file.
4. **Find a .txt file that includes the changed file** — From the list of files that include the changed file, find any file that ends with `.txt`. Follow the instructions in Step 6b to build the staging URL for that file.
5. **If none of the files that include the changed file are .txt files**, take that intermediate file, treat it as the new changed file, and repeat steps 1–4 to extract its path and search for files that include it. Do this until you find have a staging URL for a .txt file or reach a dead end. If you reach a dead end, alert the user and skip to the next changed file.

If you did not already, add the constructed staging URL to the list of staging links with a descriptive label:

```markdown
- [Page title](https://...)
```

### Step 6d — Handle remaining edge cases

**Images and diagrams** (`images/` or other asset directories) — Asset files are not directly renderable. Link to a parent `.txt` page that contains the image or diagram instead. Use the same grep approach as Step 6c to find a page that references the asset.

**TOC/navigation changes** (`content/table-of-contents/`) — For each changed hunk in a TOC file, find the parent section URL by scanning the diff context upward from the changed lines to the nearest ancestor `url:` field that belongs to a section node — one that has an `items:` array of child entries. That parent section URL is the staging link target — it shows that the sidebar for that section renders correctly after the change.

- Replace the `:version` placeholder in the URL with the appropriate version string (e.g., `upcoming`, `v8.0`).
- Assemble the staging URL using the Netlify base URL from the bot comment plus the versioned path.
- If multiple hunks affect different parent sections, produce one staging link per distinct section.
- Do this even when the PR also includes content changes — include both section links and any page-specific links.
- If the hunk removes a page entry entirely (a deleted `.txt` file), note in the PR description that the page was deleted and link to its former parent section to confirm it no longer appears in navigation.

## Step 7 — Assemble the final PR body

```markdown
## Description

<prose summary from Step 4>

## Staging links

<list of staging links from Step 6>

## JIRA ticket

[DOCSP-NNNNN](https://jira.mongodb.org/browse/DOCSP-NNNNN)
```

## Step 8 — Update the PR body

Use the GitHub REST API to update the body (avoid `gh pr edit`, which fails in this repo due to a Projects classic GraphQL deprecation error):

```bash
body=$(cat <<'EOF'
<final body from Step 7>
EOF
)
gh api repos/10gen/docs-mongodb-internal/pulls/<PR_NUMBER> \
  --method PATCH \
  --field body="$body" \
  --jq '.number'
```

Ask the user whether they want the PR marked as ready for review or kept as a draft. If they choose ready for review, run:

```bash
gh pr ready <PR_NUMBER>
```

## Step 9 — Report back

Output:
- The PR URL
- The PR number
- A summary of the staging links generated
