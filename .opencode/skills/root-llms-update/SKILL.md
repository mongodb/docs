---
name: root-llms-update
internal: true
description: Check whether the root llms.txt (llms-output/llms.txt, served at mongodb.com/docs/llms.txt) is behind what is published, and update it. Use when a new docset lands, when a project is re-split into a different number of parts, or when asked to check/update the root llms.txt or the llms index.
---

# Update the root llms.txt

The root llms.txt is the file AI agents read first to discover every other `llms.txt` MongoDB publishes. It lives at `platform/tools/generate-llms/llms-output/llms.txt` and is served at `https://www.mongodb.com/docs/llms.txt`.

Per-project files republish themselves on every prod/stg deploy. This file does not: it is hand-maintained, and updating it needs editorial judgement. A weekly GitHub Action (`.github/workflows/root-llms-drift.yml`) does this automatically, so use this skill when you do not want to wait for it — most often the day a new docset ships.

## When this skill applies

- A new content directory has shipped and its `llms.txt` is not linked yet.
- A project was re-split, so its `(Part N of M)` labels are wrong or parts are missing.
- A project was removed and its link now 404s.
- Someone asks whether the root llms.txt needs updating.

Do **not** use this skill to change per-project `llms.txt` files. Those are generated: use `pnpm publish-project` in `platform/tools/generate-llms`.

## Step 1: Find the drift

From `platform/tools/generate-llms`:

```bash
pnpm check-root-llms
```

This is read-only and needs no credentials. It generates every project (about 7 seconds), asks the docs site over HTTP which of those files it actually serves, and compares that against the links in the root file.

It reports five things:

- **Published but not linked** — a new project, or new parts after a re-split. These must be added.
- **Linked but not published** — the file is gone and the link 404s. These must be removed.
- **Part counts that disagree** — `(Part N of M)` no longer matches reality. Relabel every part of that project.
- **Landing pages linked but no longer present** — the curated root index links to a landing page that was removed. These links must be removed.
- **Landing pages not linked** — informational only. `content/landing`'s pages are listed directly in the root file, but that section is a curated subset, so an unlinked landing page is usually a deliberate choice. Do not add these unless the writer asks.

If it exits non-zero naming content directories with no URL prefix, the committed prefix-map snapshot is out of date and no drift can be trusted. Tell the user to refresh it (`pnpm build:prefix-map` in `platform/docs-site`, which needs `MONGODB_URI`, then copy `src/generated/dir-name-to-prefix.json` over `platform/tools/generate-llms/dir-name-to-prefix.snapshot.json`) and stop.

If it reports nothing, stop and tell the user the file is up to date.

## Step 2: Make the edit

Open `llms-output/llms.txt` and resolve exactly what the report listed.

- Put each new link in the `## Browse by area` subsection that matches what it documents. Match the label style of the entries already in that subsection.
- For a re-split project, rewrite every `(Part N of M)` for that project and make each label describe the sections that part actually covers. Read the part files themselves to see what is in them rather than guessing.
- Remove dead links outright.
- Do not reorganize, reword, or reorder anything the report did not mention.
- Do not add entries to `## Start here by task`. That section is editorial. If you think something belongs there, say so to the user and let them decide.
- If a new project has no blurb in `llms-descriptions.json`, add one in the style of its neighbours.

## Step 3: Verify

Re-run `pnpm check-root-llms`. It must report no drift. If it still reports something, the edit is incomplete — fix it rather than explaining the leftover.

Then confirm nothing unrelated changed:

```bash
git diff --stat
```

Only `llms-output/llms.txt` (and `llms-descriptions.json` if you added a blurb) should appear.

## Step 4: Open a PR

The root llms.txt publishes on merge: the landing site's next prd/preprd deploy uploads it to `docs/llms.txt`. Nothing publishes from an unmerged branch, so the PR is the whole delivery.

Summarize in the PR description what was added, removed, and relabelled, and why each new link went where it did.
