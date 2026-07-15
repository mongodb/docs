---
name: unified-toc
description: Update the unified table of contents when pages are added, removed, or moved. Use when you need to register a new page, deregister a removed page, or relocate an entry in the ToC hierarchy.
---

# Role: Unified ToC Updater

You are an assistant that keeps the MongoDB documentation unified table of contents in sync with the content directory.

**Do NOT use this skill when:**
- The change is to a page's content only, with no effect on its presence or location in the ToC
- The target file is in an EOL version directory. Before proceeding, locate the `snooty.toml` for the target version directory and check for `eol = true`. If present, stop and inform the user that EOL versions are not maintained.
- The target page is an Atlas CLI command file (under `content/atlas-cli/.../command/`). Atlas CLI command ToC entries are managed by dedicated tooling in `content/tools/atlas-cli-commands-toc/` and are maintained in `docset-data/atlas-cli-commands.ts`, `atlas-cli-k8s-commands.ts`, and `atlas-cli-local-commands.ts`. Do not modify these files.
- The change is a large-scale ToC restructure or revamp (e.g. a comprehensive coverage initiative that reorganizes the entire section hierarchy of a driver or product docset). Use this skill to add, remove, or move pages and content subtrees — it is not designed for reorganizations that restructure the hierarchy of existing content.

---

## Structure Overview

The ToC is a four-tier hierarchy. Each tier is a directory of TypeScript files:

```
toc.ts              ← Root. NEVER MODIFY.
L1-data/            ← Top-level nav sections (Development, Management, etc.)
  └─ imports from L2-data/ and sometimes docset-data/
L2-data/            ← Topic-level hierarchies per product area
  └─ imports from docset-data/ and sometimes manual-data/
docset-data/        ← Complete page trees for a single content site
manual-data/        ← Reusable fragments for the Database Manual only
```

All files live in `content/table-of-contents/`.

**Key types** (defined in `types/index.ts`):
- `InternalTocItem` — requires `contentSite` and `url`
- `ExternalTocItem` — requires `isExternal: true`
- `CollapsibleTocItem` — requires `collapsible: true` and `items`
- `GroupTocItem` — requires `group: true` and `items`; no `url`
- `SubNavTocItem` — requires `showSubNav: true`, `items`, and `url`; cannot have `versions`
- `L1TocItem` — cannot have `versions`, `collapsible`, `group`, `showSubNav`, `versionDropdown`, or `isExternal`. Do not create or modify L1TocItems.

**`contentSite` is not inherited.** Every `InternalTocItem` in an `items` array must declare its own `contentSite`. To avoid repetition when adding a block of items that all share the same content site, use the `inheritContentSite(contentSite, items)` helper exported from `types/index.ts`. Items passed through this helper may omit `contentSite` and will receive it from the parent call. The corresponding type for those items is `InheritedTocItem`. When adding to an existing file, update the import to `import { inheritContentSite, type TocItem } from '../types';` and use it inline as the `items` value: `items: inheritContentSite('content-site', [{ label: '...', url: '...' }])`.

**Symlink items vs. source-of-truth items**: A page that appears in multiple locations in the ToC has exactly one source-of-truth entry and one or more symlink entries. The source-of-truth entry uses a docs-relative URL path that starts with `/` (e.g. `/docs/atlas/triggers/overview`). A symlink entry uses a full absolute URL that starts with `https://` and carries `isExternal: true` (e.g. `{ label: 'Triggers Overview', isExternal: true, url: 'https://www.mongodb.com/docs/atlas/triggers/overview' }`). When adding a symlink, always include `isExternal: true`. When searching for symlinks to remove, look for entries with both `isExternal: true` and an `https://www.mongodb.com/docs/` URL matching the page being removed. When adding, removing, or moving entries, identify whether the target is a source-of-truth item or a symlink, and handle it accordingly (see per-operation instructions below).

**Versioning**: Some TocItems are scoped to specific product versions using the `versions` field. Use `{ includes: [...] }` or `{ excludes: [...] }` — never both.

- **Adding a page**: Use `includes` scoped to the versions where the page exists. Start with `includes: ['upcoming']` if it is upcoming-only; extend the array as it gets backported to other versions; remove the `versions` field entirely once it exists in all versions.
- **Removing a page from specific versions**: Use `excludes` with a Versions helper to identify the versions where the page no longer exists (e.g. `excludes: manualVersions.after('v8.0', { inclusive: true })`). This is self-maintaining — new versions are automatically excluded as they are added to the version array. Do not hardcode version strings in `excludes`.

Version arrays live in `version-arrays/` and are organized by product:
- `version-arrays/server-docs/manual.ts` — MongoDB Server (Manual)
- `version-arrays/server-docs/mongosync.ts` — MongoSync
- `version-arrays/drivers/` — one file per driver (e.g. `node-versions.ts`)
- `version-arrays/cloud-docs/` — Atlas and cloud products

Each file exports a `Versions` instance with helper methods to generate version arrays without hardcoding strings:
- `manualVersions.before('v8.0')` — all active versions before v8.0 (exclusive); pass `{ inclusive: true }` to include v8.0
- `manualVersions.after('v8.0')` — all active versions after v8.0 (exclusive); pass `{ inclusive: true }` to include v8.0

Deprecated versions are automatically excluded from all helper outputs. Do not reference deprecated versions directly in `includes` or `excludes` arrays.

Use `versionDropdown: true` on a `GroupTocItem` or `CollapsibleTocItem` to render a version selector in the navigation. Use `:version` as a placeholder in `url` values for versioned pages (e.g. `/docs/:version/release-notes`).

---

## Step 1: Identify the target file

If registering multiple pages in one invocation, complete Steps 1–2 for **all** pages before making any edits. Apply all changes first, then run the compile check once at the end.

When adding entries that have a parent/child relationship (e.g. a new `CollapsibleTocItem` and its child pages), plan and apply them as a single edit: write the parent node with the children already nested in its `items` array. Do not insert a parent node as a placeholder and fill in children in a separate edit.

Before making any change, determine which file owns the entry:

1. Search `docset-data/` for the content site (e.g. `contentSite: 'atlas-cli'`). If a file exists for the product, changes to individual pages go there.
2. If no docset-data file exists and the page is part of the Database Manual, check `manual-data/` for the relevant topic fragment.
3. If no docset-data or manual-data file covers the page, search `L2-data/` for the topic area.
4. If the change affects a top-level navigation group, look in `L1-data/`.
5. Report the identified file to the user and confirm before making changes.

---

## Step 2: Determine the correct TocItem type

| Situation | Type |
|---|---|
| Standalone page with a URL | `InternalTocItem` |
| Page with child pages | `CollapsibleTocItem` |
| Logical heading with no URL | `GroupTocItem` |
| Page that opens a drill-down sidebar | `SubNavTocItem` |
| Link outside mongodb.com/docs | `ExternalTocItem` |

**`GroupTocItem`**: Use when a set of pages belongs under a named section that has no page of its own. Unlike `CollapsibleTocItem`, it has no URL and is not collapsible — it renders as a static label in the sidebar that always shows its children. Do not create a new `GroupTocItem` without confirming the section label and placement with the user.

**`SubNavTocItem`**: Use only for products that have their own complete documentation tree (e.g., driver docs). When a user navigates to this entry, the entire sidebar switches to display that product's page hierarchy. This is a structural navigation decision — do not create a new `SubNavTocItem` without explicit user instruction.

---

## Add a page

1. Complete Steps 1–2.
2. Locate the correct position in the file (alphabetical within a group, or ordered by topic flow — match the surrounding convention). If the target section has no existing entries to follow or the convention is unclear, ask the user for placement guidance before inserting. Always report the exact position where the entry was placed (e.g. "inserted after X under Y").
3. Insert a new `TocItem` object. Required fields:
   - `label`: Display text matching the page's H1 title
   - `contentSite`: The DocSite enum value for the product (copy from adjacent entries)
   - `url`: The path relative to the content site's `source/` directory, without the extension, appended to the base URL pattern for that content site. Use adjacent entries to determine the base URL — it is not always derivable from the directory name (e.g. `content/c-driver/` uses `/docs/languages/c/c-driver/:version/`).
4. If the page applies only to certain versions, add a `versions` field with either `includes` or `excludes`. Use the helper methods from the appropriate `version-arrays/` file (e.g. `manualVersions.before('v8.0')`) rather than hardcoding version strings.
5. If the page has child pages, use `CollapsibleTocItem` and add an `items` array.

---

## Remove a page

1. Complete Step 1.
2. Confirm the scope of the removal with the user: is the page being removed from all versions, or only from specific versions?
   - **All versions**: proceed to delete the entry (steps 3–5).
   - **Specific versions only**: update the entry's `versions` field using `excludes` with a Versions helper to identify the versions where the page no longer exists. Do not delete the entry. Do not hardcode version strings.
3. Locate the source-of-truth `TocItem` entry for the page. Search the ToC for any symlinks pointing to the same page. Inform the user of any symlinks found and confirm whether they should also be removed before proceeding.
4. Check whether the entry has an `items` array with children. If so, decide with the user whether to remove the children or re-parent them.
5. Delete the entry. If the parent is now empty (no remaining `items`):
   - If the parent has a `url`, convert it to an `InternalTocItem` by removing `collapsible: true` and the `items` array. Keep `label`, `contentSite`, and `url`.
   - If the parent has no `url` (i.e. it is a `GroupTocItem`), remove it entirely.

---

## Move a page

1. Complete Step 1 for both the source and destination locations (they may be in different files).
2. Copy the `TocItem` entry from the source location.
3. Remove it from the source.
4. Insert it at the correct position in the destination file (following the add procedure above). If the move crosses content sites, update `contentSite` and `url` to match the destination product.
5. If the move crosses files, verify that the destination file imports are correct and that no orphaned imports remain in the source file.

---

## Examples

### Add a page (new source-of-truth entry)

**User:** Add a new standalone page "Create a Scatter Plot" to Atlas Charts under Tutorials, at `/docs/charts/tutorial/scatter-plot`.

**Agent:**
1. Searches `docset-data/` — finds `docset-data/atlas-charts.ts` for `contentSite: 'charts'`. Confirms with user.
2. Determines type: standalone page → `InternalTocItem`.
3. Locates position inside the `Tutorials` `CollapsibleTocItem`, after the last existing tutorial entry.
4. Inserts:
   ```ts
   {
     label: 'Create a Scatter Plot',
     contentSite: 'charts',
     url: '/docs/charts/tutorial/scatter-plot',
   },
   ```
5. Runs `cd content/table-of-contents && pnpm tsc --noEmit` — passes.
6. Reports: added one `InternalTocItem` to `docset-data/atlas-charts.ts`, inserted after the last existing tutorial entry under Tutorials. Asks user to confirm before committing.

---

### Remove a page

**User:** Remove the "Create a Column Chart" page from Atlas Charts.

**Agent:**
1. Confirms scope with user: page is being removed from all versions.
2. Finds the entry in `docset-data/atlas-charts.ts`:
   ```ts
   {
     label: 'Create a Column Chart',
     contentSite: 'charts',
     url: '/docs/charts/tutorial/order-data/column-chart-sales-by-store',
   }
   ```
3. Searches the full ToC for `column-chart-sales-by-store`. No symlinks found — proceeds.
4. No `items` array on this entry — no children to re-parent.
5. Deletes the entry. Parent `CollapsibleTocItem` still has other items — no further changes needed.
6. Runs compile check — passes.
7. Reports: removed one entry from `docset-data/atlas-charts.ts`.

---

## After changes

- Do not modify `toc.ts`.
- Verify the TypeScript compiles: `cd content/table-of-contents && pnpm tsc --noEmit`
- Report the file(s) changed and the exact entries added, removed, or moved.
- Ask the user to confirm before committing.
