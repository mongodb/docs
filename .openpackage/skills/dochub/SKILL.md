---
name: dochub
description: "Create or update a DocHub link (dochub.mongodb.org/core/<key>) so product UI and error messages point at docs through a stable vanity URL, or check whether a moved/renamed/deleted docs page has broken any DocHub link. Use when a writer or stakeholder asks to create, add, update, change, or repoint a dochub link; needs a stable link for code before docs are live; or when the dochub-drift-check hook reports that a moved page may be referenced by a dochub link. To add an in-repo redirect for a moved page, use add-redirects instead; not for casual link sharing."
---

# DocHub Links

DocHub is a soft-redirect layer at `dochub.mongodb.org/core/<key>`: it maps a stable vanity path to a real docs URL, so product UI, server logs, and error messages link through it instead of embedding a docs URL that breaks when content moves. On a move, only the DocHub target changes — no product code change or version bump.

All links live in one file, `dochub.mongodb.org/netlify.toml`, in the separate repo **`10gen/docs-subdomains`** (not this monorepo). This skill edits it via the `gh` API and opens a PR against it.

## When this skill applies

Use this skill when someone wants a **long-term stable link embedded in code, UI, or another external source** — for example:

- A stakeholder needs a `Learn more` link for a UI banner or error message.
- Docs for a feature aren't live yet at code freeze, so engineering needs a link now that will resolve later (point it at the closest parent page; repoint it when the page ships).
- An existing DocHub link must be repointed because its docs target moved.

Do **not** use this skill for:

- **A renamed, moved, or deleted `.txt` page** — that needs an in-repo redirect. Use the **add-redirects** skill instead. (DocHub is for external code links; redirects preserve old docs URLs.)
- **Casually sharing a docs link** with a teammate or stakeholder — just send the docs URL.

If the request is really a redirect, stop and hand off to add-redirects.

## Inputs

Collect before doing anything:

- **key** — the DocHub key (the part after `/core/`). The script normalizes it to `/core/<key>`.
- **destination URL** — the full docs URL the link should resolve to. May be a `#anchor` URL (allowed for DocHub links) and may not resolve yet (fine — that's the pre-release case).
- **DOCSP ticket** (optional) — to post the resulting link/PR back to.

The script lives at `scripts/dochub.py`; run it from the skill directory.

**Prerequisite:** `gh` must be authenticated with push access to `10gen/docs-subdomains` to open the PR in Step 3. Read-only operations (lookup, drift) work without push access.

## Step 1: Look up the key

```bash
python3 scripts/dochub.py lookup --key <key> --to <destination-url>
```

Branch on `status`:

| status | Meaning | Action |
|---|---|---|
| `absent` | Key doesn't exist | **Create** (Step 2). |
| `exists-different` | Key exists, different target | **Update** — repoint `to`. Show the current target and confirm this is intended. |
| `exists-same` | Key already points there | **No-op.** Report the existing `https://dochub.mongodb.org/core/<key>` URL and stop. |

Never add a second block for an existing key: Netlify reads only the first match top-to-bottom, so a duplicate `from` silently shadows. `apply` enforces this by editing in place.

## Step 2: Build the change and show the diff

```bash
python3 scripts/dochub.py apply --key <key> --to <destination-url>
```

`apply` writes the edited file to `/tmp/dochub-netlify.toml.new` and prints a unified diff. It automatically:

- Ensures `from` starts with `/core/`.
- For a **create**, infers the `# Category` section from the destination URL's path (e.g. `/docs/atlas/…` → Atlas, `/docs/manual/…` → Manual) and inserts the block in alphanumeric order **by `from`** within that section.
- For an **update**, changes only the `to` line in place.

If `apply` errors with "could not determine section," the URL's first path segment isn't in the section map (e.g. an off-docs URL, or a product without a section yet). Confirm the right section with the user and re-run with `--section "<exact header text>"`.

**Present the diff to the user and stop for confirmation.** Note anything worth flagging (e.g. the target is a `#anchor` or doesn't resolve yet — see `references/conventions.md` for anchor policy). Do not push until the user approves.

## Step 3: Open the PR (after approval)

The change lands in a **different repo**, so the monorepo `open-pr` skill doesn't apply (it assumes the current branch, `content/` staging links, and the monorepo). Use this clone-free contents-API flow: it pushes `/tmp/dochub-netlify.toml.new` to a branch on `10gen/docs-subdomains` and opens the PR with its body set at creation time, avoiding `gh pr edit` (which fails in these repos).

```bash
REPO=10gen/docs-subdomains
PATH_IN_REPO=dochub.mongodb.org/netlify.toml
BR="dochub-<key>"                       # short, descriptive branch name

# 1. Base commit sha, and current file sha (needed to update the file).
BASE_SHA=$(gh api repos/$REPO/git/ref/heads/main --jq .object.sha)
FILE_SHA=$(gh api "repos/$REPO/contents/$PATH_IN_REPO?ref=main" --jq .sha)

# 2. Create the branch.
gh api repos/$REPO/git/refs -f ref="refs/heads/$BR" -f sha="$BASE_SHA"

# 3. Commit the edited file onto the branch (content must be base64).
gh api repos/$REPO/contents/$PATH_IN_REPO --method PUT \
  -f message="Add dochub link: /core/<key>" \
  -f branch="$BR" \
  -f sha="$FILE_SHA" \
  -f content="$(base64 < /tmp/dochub-netlify.toml.new | tr -d '\n')"

# 4. Open the PR with its final body.
gh pr create --repo $REPO --base main --head "$BR" \
  --title "Add dochub link: /core/<key>" \
  --body "Points \`/core/<key>\` to <destination-url>. Requested for <context/ticket>."
```

For an **update**, change the title/message/body to "Update" and reference the old and new targets. For reviewer guidance, see `references/conventions.md`.

A Netlify Deploy Preview is generated on the PR. The test URL is:

```
https://deploy-preview-<PR-number>--dochub-mongodb-org.netlify.app/core/<key>
```

## Step 4: Report and share

After the PR is open, give the user:

- The **persistent link to share with stakeholders**: `https://dochub.mongodb.org/core/<key>` (resolves after the PR merges and Netlify rebuilds — and, for a pre-release target, only once the docs page is live).
- The **PR URL** and the **deploy-preview test URL**.

If a DOCSP ticket was provided, offer to post the PR + DocHub link to it via the `jira` skill.

## Flow B: check for drift after a page move

When a `.txt` page moves or is deleted, a DocHub link pointing at its old URL breaks silently — the link lives in shipped product code, so nothing on the docs side surfaces it. The **dochub-drift-check** hook (`.claude/hooks/dochub-drift-check.sh`) uses `dochub.py page-refs` (a fast, fuzzy slug match) to nudge when a moved page may be referenced; this flow does the precise confirmation.

Trigger this flow when the hook nudges, or when a writer asks to check dochub links after restructuring content.

1. **Identify the moved pages.** From the hook message, or enumerate pending changes the same way `add-redirects` Step 1 does (`git diff --name-status` for renames/deletes of `.txt` pages under `content/<project>/source/`).
2. **Derive each page's old published URL.** Use the same `snooty.toml`-based method as `add-redirects` Step 2 (project slug + version segment + path; mind the Atlas `name=cloud-docs` and Manual nesting caveats). This is per-project and not fully mechanical — do not guess a URL shape the project doesn't already use.
3. **Run the precise drift check** for each old URL:

   ```bash
   python3 scripts/dochub.py drift --old-url <old-page-url>
   ```

   It reports every dochub entry whose target equals the old page (`exact`) or sits beneath it (`prefix`), normalizing both docs domains and ignoring anchors/query. `has_anchor: true` means the target had a `#fragment` that may no longer exist on the new page — call that out.
4. **Repoint each affected link.** The new target is the page's new URL (for a rename/move) or, for a deleted page, ask the user for the replacement. Then run the Flow A **update** path (Step 1 `lookup` → Step 2 `apply`) for each key. For the second key onward, chain the output as input so changes accumulate rather than overwrite:

   ```bash
   # first key — reads from cache, writes to .new
   python3 scripts/dochub.py apply --key <key1> --to <new-url1>
   # subsequent keys — read from .new, write back to .new
   python3 scripts/dochub.py apply --key <key2> --to <new-url2> \
     --file /tmp/dochub-netlify.toml.new --out /tmp/dochub-netlify.toml.new
   ```

   Batch all affected keys into a single PR (one Step 3 run after all `apply` calls).

## Reference

See `references/conventions.md` for the sourced rules (sort key, anchors, sections, duplicates) and the source-of-truth links.
