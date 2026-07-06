# DocHub netlify.toml conventions

Rules the skill enforces, with sources. Where sources conflict, the resolution is noted.

## File

- Path: `dochub.mongodb.org/netlify.toml` in `10gen/docs-subdomains` (INTERNAL).
- ~900 `[[redirects]]` blocks grouped under ~30 `# Category` section headers (Atlas, Atlas Search, Atlas Vector Search, Cloud Manager, Charts, Manual, Ops Manager, Drivers, MCP Server, …).

## `from`

- Must start with `/core/` to preserve legacy DocHub syntax (repo README, wiki).
- **No duplicate `from` values.** Netlify resolves redirects top-to-bottom and reads only the first match, so a duplicate silently shadows. Update an existing key in place; never append a second block for it. (repo README)

## Ordering — by `from` (not `to`)

Within each section, entries are ordered alphanumerically **by `from`**.

Sources conflict: the file's top comment and the wiki 2.0 page say `from`; the repo README says `to`. Resolved empirically — a per-section sortedness check on the live file scored 0.92–1.00 for `from` and only ~0.50–0.62 for `to`. The README is stale. The skill sorts by `from`.

Do **not** re-sort the file. Sections are only ~0.95–0.99 clean, so a global sort produces a large, review-hostile diff. Insert the new entry into its correct slot only. Splat/wildcard `from` values stay at the bottom of a section.

Follow-up: correct the README line `to` → `from` (small PR against `10gen/docs-subdomains`).

## Anchors

Anchors (`#fragment`) in a DocHub `to` are **allowed and common** (~250 of ~900 entries use them; the wiki's own DocHub-update example uses one). The "no anchors" rule in the wiki applies to **in-repo redirects, not DocHub links**.

Soft preference (docs-platform): a stable landing page is more durable than an anchor that can change. Flag, don't block.

## Section inference

`section-for` maps a destination URL's first path segment (after an optional leading `docs/`) to a section header. Verified against the live file: Atlas Search docs live under `/docs/search/…`, Vector Search under `/docs/vector-search/…`, everything else under its own product segment. When a segment isn't in the map, the script returns empty and the caller confirms the section with the user.

## Reviewers

Any **docs platform or docs team member** may review a DocHub PR (repo README, wiki). Post in `#ask-docs-platform` if no reviewer is named.

## Sources

- Repo README: `10gen/docs-subdomains` → `dochub.mongodb.org/README.md`
- Wiki: L&L FAQ: DocHub URLs 2.0 — https://wiki.corp.mongodb.com/spaces/DE/pages/239738437
- Live file: `10gen/docs-subdomains` → `dochub.mongodb.org/netlify.toml`
