---
name: staging-preview
internal: true
description: "Generate staging preview links for a MongoDB docs PR. Polls for the Netlify deploy preview comments, then constructs page-specific URLs for changed .txt files, includes, YAML extracts, images, and TOC files. Use when you need to generate or refresh staging links for a pull request."
argument-hint: "<PR_NUMBER>"
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

Read every file through the PR, not the local checkout, because the PR branch may not be checked out. To read a changed file at the PR head, run:

```bash
sha=$(gh pr view <PR_NUMBER> --json headRefOid --jq .headRefOid)
gh api "repos/{owner}/{repo}/contents/<file>?ref=$sha" -H "Accept: application/vnd.github.raw"
```

Leave `{owner}/{repo}` as written. `gh api` fills it in from the current repository.

Searches for files that include a changed file (Steps 4 and 5) run against the local checkout, which is accurate unless the PR also adds or removes include directives.

## Step 2 — Fetch the deploy preview comments

The `netlify` bot posts one comment per built site. Each comment starts with a heading such as `Deploy Preview for *manual-docs* processing.` and is edited in place to `ready!` when the build finishes, which can take ten minutes. A PR can also get comments for sites it did not change.

Run the following polling loop as a background Bash process (`run_in_background: true`). It waits until at least one comment exists and none is still processing:

```bash
attempts=0
while [ $attempts -lt 40 ]; do
  heads=$(gh pr view <PR_NUMBER> --json comments \
    --jq '.comments[] | select(.author.login == "netlify") | .body | split("\n")[0]' 2>/dev/null \
    | grep "Deploy Preview for")
  if [ -n "$heads" ] && ! echo "$heads" | grep -q "processing"; then
    echo "PREVIEWS_SETTLED"
    exit 0
  fi
  attempts=$((attempts + 1))
  sleep 15
done
echo "PREVIEWS_TIMEOUT"
```

Wait for either `PREVIEWS_SETTLED` or `PREVIEWS_TIMEOUT` to appear in the background process output.

- If `PREVIEWS_SETTLED`: extract the site slug, status, and base URL from each comment:

  ```bash
  gh pr view <PR_NUMBER> --json comments --jq '.comments[] | select(.author.login == "netlify") | .body | [capture("Deploy Preview for \\*(?<site>[^*]+)\\* (?<status>[a-z]+)"), (capture("Deploy Preview \\| \\[(?<url>[^]]+)\\]") // {url: ""})] | add | "\(.site) \(.status) \(.url)"'
  ```

  Each output line looks like `manual-docs ready https://deploy-preview-25184--manual-docs.netlify.app`. Use only `ready` sites. If a site you need has any other status, such as a failed build, tell the user and skip its files.
- If `PREVIEWS_TIMEOUT`: return a note that staging links were not available and exit.

The emoji in the `😎 Deploy Preview` table row is wrapped in a `<span>` element, so do not grep for the emoji.

## Step 3 — Construct page-specific URLs for changed pages

For each changed `.txt` file under `content/`, build a full staging URL:

1. **Find the matching base URL** — The slug is usually `<project>-docs`, where `<project>` is the directory under `content/` (`manual-docs` for `content/manual`). Some slugs differ (`atlas-mdb-docs` for `content/atlas`). If no slug is `<project>-docs`, try each `ready` base URL and keep the one where the page returns HTTP 200.
2. **Find the URL prefix** — Look up `<project>` in `platform/tools/generate-llms/dir-name-to-prefix.snapshot.json`. The value is the URL prefix, such as `docs` for `manual` or `docs/languages/python/pymongo-arrow-driver` for `pymongo-arrow-driver`. If the project is not in the file, tell the user and skip the file.
3. **Extract the page path** — Take everything after `source/` in the file path, drop the `.txt` extension, and lowercase it. Netlify serves lowercase paths.
4. **Check for a version segment** — If the path is `content/<project>/<version>/source/<page-path>.txt`, insert the version directory name (such as `upcoming`, `current`, `manual`, `v8.0`) between the prefix and the page path.
5. **Assemble the URL** — `<base-url>/<prefix>/<version>/<page-path>/`, or `<base-url>/<prefix>/<page-path>/` if unversioned.
6. **Verify the URL** — Run `curl -s -o /dev/null -w '%{http_code}' <url>`. Keep URLs that return 200. If a URL returns anything else, tell the user and leave it out.

### Examples

- Base URL: `https://deploy-preview-25184--manual-docs.netlify.app`
- File: `content/manual/upcoming/source/reference/command/moveCollection.txt`
- Staging URL: `https://deploy-preview-25184--manual-docs.netlify.app/docs/upcoming/reference/command/movecollection/`

---

- Base URL: `https://deploy-preview-25170--pymongo-arrow-driver-docs.netlify.app`
- File: `content/pymongo-arrow-driver/current/source/reference/release-notes.txt`
- Staging URL: `https://deploy-preview-25170--pymongo-arrow-driver-docs.netlify.app/docs/languages/python/pymongo-arrow-driver/current/reference/release-notes/`

---

Format each link as a Markdown list item with a descriptive label:

```markdown
- [Page title](https://...)
```

Use a short, human-readable label for each link (e.g., the page heading or operator name + context). Omit non-page files (images, includes, code examples, test files, etc.) — only link to renderable documentation pages.

## Step 4 — Construct page-specific URLs for changed `includes` files

Each `<site>/source` directory (or `<site>/<version>/source` directory for versioned docs) has an `includes` directory. Files under `includes/` are rendered on multiple pages using include directives.

**Format reference:** Read `references/rst-include-patterns.md` for include directive names, virtual path formats, and the page file extension.

For each changed file that has `includes/` in its path, first check whether the file is a YAML extract container or a regular include file, then follow the appropriate path below.

### YAML extract files (`.yaml`)

YAML extract files contain multiple named blocks under `ref:` keys. They are never referenced directly — each `ref:` maps to a virtual include path (see `references/rst-include-patterns.md` for the format).

1. **Identify changed refs from the diff** — Collect two inputs and cross-reference them:
   - The line numbers of all `ref:` blocks. Read the file at the PR head (see Step 1) and pipe it through `grep -n "^ref:"`.
   - The changed hunks. Run `gh api 'repos/{owner}/{repo}/pulls/<PR_NUMBER>/files' --paginate --jq '.[] | select(.filename == "<file>") | .patch'` and parse the `@@` hunk headers. The `+<start>` value in `@@ -a,b +start,c @@` gives the new-file line number of each hunk.

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
- TOC `url:` values already begin with `/docs/`, so append the URL directly to the base URL of the docset's site, with no extra prefix. Add a trailing `/` if the URL lacks one, then verify it as in Step 3.
- If multiple hunks affect different parent sections, produce one staging link per distinct section.
- Do this even when the PR also includes content changes — include both section links and any page-specific links.
- If the hunk removes a page entry entirely (a deleted `.txt` file), note in the PR description that the page was deleted and link to its former parent section to confirm it no longer appears in navigation.

## Output

Return the complete staging links section as a Markdown list, ready to be inserted into a PR body. If no links could be generated, return `N/A`.
