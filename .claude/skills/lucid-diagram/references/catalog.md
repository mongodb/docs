# Icon Catalog Reference

Load this file when selecting icons for a diagram, regenerating `diagram-icons.csv`, or staging the brand fonts ("Brand fonts" at the end).

## Catalog format

Repo root `diagram-icons.csv`, UTF-8, one row per icon:

| Column | Meaning |
|---|---|
| `name` | Canonical asset name from Brandfolder (unique across the catalog) |
| `description` | What the icon depicts and when to use it |
| `aliases` | Lowercase search terms |
| `asset_key` | Brandfolder asset key (the `#!asset/<KEY>` segment of an asset card link) |
| `cdn_url` | Direct publicly-fetchable PNG URL |
| `native_size` | The PNG's own pixel dimensions as `WxH`. Shape the `image` boundingBox from this, never square by default — see "Native dimensions" below |
| `verified` | `viewed` = an agent visually confirmed the image matches the description; `name-only` = description inferred from the asset name |

Every count and coverage claim below describes the last harvest, not Brandfolder today. The design team adds icons on its own schedule, so read the gap list as a snapshot rather than as current; closing it is the refresh in "Checking for new icons", which runs on request only. Counts and CDN health last confirmed against the committed CSV 2026-10-20: 67 rows, 20 of them `viewed`, every `cdn_url` returning HTTP 200, and every `native_size` measured from the returned bytes.

## Native dimensions

Lucid fills an `image` block's bounding box rather than letterboxing it, so a box whose shape disagrees with the asset's crops the glyph — which is why the catalog carries each asset's real dimensions and why the style guide's icon rule (§6b) is a ratio rule. Scale the native dimensions so the long edge lands on the diagram's icon size and derive the short edge; `diagram-authoring.md` has the formula and a worked box.

The catalog is mostly non-square, so this is the common case rather than an exception. Measured across all 67 rows 2026-10-20: 19 square, 48 not. The 52 icons run 0.72:1 (Audit, Arrow-up) to 2.33:1 (Atlas Infinite), with a 240px-wide family clustered between 1.0 and 1.5 — Cloud at 240 × 171 is the one that first surfaced the crop, rendering as a gravestone in a square box. The 15 logomarks are further out: the leaf is portrait at 0.47:1 (530 × 1136, or 133 × 284 for the Evergreen and Spring Green cuts), the Atlas product logo is 2.54:1, and the full MongoDB logo is 3.92:1, which at a 150px long edge is only 38px tall.

Measure any asset whose row predates this column or that a writer supplies as a bare Brandfolder link:

```bash
python3 -c "
import urllib.request, struct, sys
d = urllib.request.urlopen(sys.argv[1], timeout=30).read()
print('%dx%d' % struct.unpack('>II', d[16:24]))
" 'https://cdn.bfldr.com/2URK6TO/as/<asset_key>/x?auto=webp&format=png'
```

The CDN serves PNG for this URL pattern, so the dimensions sit in the IHDR header at bytes 16–24 and no image library is needed.

Selection rules:

- Grep `name`, `description`, and `aliases` for the concepts in the request. As of the last harvest the catalog holds 67 rows drawn from the post-refresh collection: 52 icons and 15 logomarks. Icon coverage is data and infrastructure (MongoDB Server, Sharding, Search Nodes, Relational Database, Document Model, Schema, Index, Cloud), workloads (Aggregation Pipeline, Query, Search, Stream Processing, Time Series, Transaction, Session, Data Analytics, AI), operations (Ops Manager, Automation, Audit, Settings, Tools, Scheduled Work, Secure by Default, Lock), actors (User, Users), and generic UI glyphs (Check, Cancel, Arrow-left, Arrow-up, Home, Hidden, Visable, Selection). Logomarks are the MongoDB leaf, MongoDB full logo, and MongoDB Atlas product logo, each in Slate, Evergreen, Spring Green, Chartreuse, and Off White.
- Names are unique, so there are no variant rows to disambiguate by description.
- The refresh narrowed the icon set, and at the last harvest many product and feature concepts had no icon: Primary Node, Secondary Node, Vector Search, Full Text Search, SQL Interface, Data API, GraphQL, Query API, Compass, Shell, Atlas CLI, Drivers, Triggers, Backup, Serverless, Change Streams, Global Clusters, and Multicloud. This list is the part of the catalog that goes stale first — the design team is filling these in, so a refresh (SKILL.md step 13) may have closed a gap, but do not run one mid-diagram to find out. Where the catalog on disk holds no row for a concept, choose the nearest icon the catalog does hold rather than leaving the component bare: Search for Vector Search or Full Text Search, MongoDB Server for a primary or secondary node, Cloud for Multicloud or a provider region, Scheduled Work for Triggers. The caption carries the precision the glyph lacks, and the style guide's caption rule means the two are always read together, so a near icon with an exact label beats no icon. Keep the substitution inside the catalog — never reach outside it — and fall back to a plain-text label only when nothing in the catalog is reasonably close.
- When a row is `name-only` and the description is load-bearing, view the icon and update the row to `verified=viewed` with a description of what the image actually shows; commit the correction to the catalog's PR/branch. At the last harvest, 20 of the 67 rows were already `viewed`.

## Checking for new icons

Maintenance only, on an explicit request for the latest icons or an updated catalog (SKILL.md step 13) — a diagram run reads the catalog on disk and never refreshes it. There is no cheap "has anything changed?" endpoint — the collection response is the only listing, so the check is the same harvest as a regeneration and costs the same handful of paginated calls. Treat it as a refresh that usually changes nothing rather than as a probe:

1. Harvest and filter by section exactly as in "Regenerating the catalog" steps 1–3.
2. Diff the harvested asset names against the CSV's `name` column. A name present in Brandfolder and absent from the CSV is a new icon; a name absent from Brandfolder is a withdrawn one, which also wants removing because its `cdn_url` may still resolve (see the reissued-keys trap below).
3. Add each new icon as a row with `verified=name-only` and a description inferred from the name, then commit the updated catalog on the diagram's branch. Promote a row to `viewed` only when its description is load-bearing for the diagram you are building, per the selection rules above.
4. Verify the new rows' `cdn_url` values return HTTP 200 before using them in an `image` block, and fill each row's `native_size` from the returned bytes using the snippet above. A row with no `native_size` cannot be sized without a fetch at authoring time, which is the step that gets skipped.

When the API key is absent or the harvest fails, say so in one line and leave the catalog on disk as it stands.

## CDN URL pattern

`https://cdn.bfldr.com/2URK6TO/as/<asset_key>/x?auto=webp&format=png`

- The org ID `2URK6TO` is MongoDB's Brandfolder and is constant across assets.
- The trailing filename segment is ignored by the CDN (any string works); omitting it entirely 404s. Use `/x` for stability.
- These URLs are public and higher-resolution (720px) than Lucid-hosted copies. Reference them directly in `image` blocks; do not re-host unless a diagram must outlive Brandfolder.

Writers can also supply individual asset card links (`https://brandfolder.com/mongodb/...#!asset/<KEY>`); construct the `cdn_url` from the key.

## Regenerating the catalog

Requires a Brandfolder API key with read access at `~/.brandfolder_api_key`. The key is per-user rather than shared: each writer creates their own from the Integrations tab at `https://brandfolder.com/profile#integrations`, and it inherits that user's permissions. Never print, echo, or commit the key, and never pass it as a command-line argument — argv is a log surface. Write a curl config once (`umask 077`, then derive a `header = "Authorization: <key>"` line from the key file into a mode-600 file) and pass it with `curl -K <configfile>`.

1. Harvest: `GET https://brandfolder.com/api/v4/collections/39qng5nxtrc3hn6ppg8g2s/assets?include=attachments,section&per=32&page=N`. The collection is "All Branded Assets" in MongoDB's brandfolder (`b3p82p88mg8x3385b4j3v`); after the 2026-09 refresh it holds 272 assets across 9 pages. Paginate via `meta.next_page`; collect `data` (assets) and `included` (attachments and sections).
2. Asset entries give `id` (the asset key), `attributes.name`, a `relationships.section` pointer, and attachment IDs; attachments give `extension` and signed/expiring storage URLs. Ignore the signed URLs and build `cdn_url` from the asset key using the pattern above — the signed URLs expire, the CDN pattern does not.
3. Filter by section, not by name pattern: keep `2p8hn8wxx5zfsr7rx6mbs2t` (Icons), `49t3pb5zv434fzm9943p7h` (Product Logos), and `8cqxvwbs4m6ww8p38xnt4mpt` (Logos - Digital). Every other section is marketing collateral, templates, photography, badges, spot illustrations, or headshots. Filter client-side from the collection response — `GET /sections/<key>/assets` returns 403 to a read-scoped key.
4. Write the CSV sorted by name, case-insensitively, with columns in the order shown above, preserving any `verified=viewed` corrections from the previous catalog rather than regressing them to `name-only`. Case-insensitive is what the committed file uses — an ASCII sort moves `AI` above `Achievement` and churns the diff for nothing.
5. Verify every `cdn_url` returns HTTP 200 before committing, and record each asset's `native_size` from the same response. A reissued or withdrawn asset key produces a 404 that is invisible until a diagram renders with a broken image block, and a stale `native_size` is invisible until one renders cropped.

Raw API attachment URLs are signed GCS links with an `Expires` parameter and are useless long-term; the CDN pattern is the only durable form.

Two traps when a brand refresh lands:

- **Asset keys are reissued.** The 2026-09 refresh replaced every key, so a pre-refresh catalog shares zero `asset_key` values with the new collection even where icon names are unchanged. Match on `name` when carrying `verified=viewed` descriptions across a refresh; never assume a key survived. Retired keys often still resolve on the CDN, which makes a stale catalog look healthy.
- **Brandfolder share links are not collections.** A `https://brandfolder.com/s/<digest>` link is a share manifest with an expiry, and no API endpoint lists its assets. Resolve it instead: the share page HTML carries the manifest key in a `div.j-resource[data-type="share_manifest"]`, and `GET /api/v4/share_manifests/<key>` returns its name and its context collection under `relationships.contextable`. Harvest that collection and section, which outlive the link.

## Brand fonts

The four brand fonts are a Brandfolder asset like any icon, so staging them needs no browser. Uploading them into Lucid does: Lucid's font manager is editor-only, with no REST endpoint and no MCP tool, and custom fonts are a Team/Enterprise feature. Split the work along that line — the agent fetches the files in SKILL.md step 1, and step 12 walks the writer through the upload.

They ship as one ZIP, not four assets: `MongoDB Brand Refresh Fonts`, asset key `pkj5jv2mbxmff5hb9ng796gj`, ~416 KB, in the same All Branded Assets collection the icons come from. The share link writers are given (`https://brandfolder.com/s/b4srtknm27whpm2fxftfjqqs`) is a share manifest that redirects to that collection, so do not try to list it — see the trap above. The CDN pattern serves the ZIP unauthenticated, so this needs no Brandfolder key even though the key-based harvest is how you find the asset again if the key changes:

```
cd ~/Downloads \
  && curl -sfL -o fonts.zip "https://cdn.bfldr.com/2URK6TO/as/pkj5jv2mbxmff5hb9ng796gj/x" \
  && unzip -qjo fonts.zip "*.ttf" "*.otf" -x "__MACOSX/*" && rm fonts.zip \
  && ls SohneMono-Medium.ttf Sohne-Regular.ttf SohneCondensed-Bold.ttf MongoDBValueSerif-Regular.otf
```

`~/Downloads` is the destination because SKILL.md step 11's handover block tells the writer the files are there; do not stage them anywhere else.

Both `unzip` flags earn their place. `-j` flattens the archive's own `MongoDB Brand Refresh Fonts/` directory so the paths handed to the writer are predictable, and the `"*.ttf" "*.otf"` filter with `-x "__MACOSX/*"` drops the archive's AppleDouble entries and a bundled `Typography Useage Example.png` (the misspelling is upstream). The AppleDouble files matter: they are named `._SohneMono-Medium.ttf` and so on, and a writer dragging everything in the folder onto the font list would hand Lucid four resource forks alongside the four fonts. A correct run adds exactly four files to `~/Downloads` and nothing else.

The authored `font-family` values are not the filenames. Lucid indexes an uploaded file under its typographic family (`name` table ID 16) where it has one and its plain family (ID 1) where it does not, which is where the weight word goes missing — measured from these four files, Oct 2026:

| File | ID 1 family | ID 16 typographic | Authored `font-family` |
|---|---|---|---|
| `SohneMono-Medium.ttf` | Sohne Mono Medium | Sohne Mono | `Sohne Mono` |
| `Sohne-Regular.ttf` | Sohne | — | `Sohne` |
| `SohneCondensed-Bold.ttf` | Sohne Condensed Bold | Sohne Condensed | `Sohne Condensed` |
| `MongoDBValueSerif-Regular.otf` | MongoDB Value Serif | — | `MongoDB Value Serif` |

Three are TTF and the serif is OTF; Lucid accepts TTF, TTC, and OTF alike, so the mixed extensions are not a problem, but a step that promises "the .ttf files" misses one. Style guide §6 is the authority on which role takes which value.

Asset keys are reissued on a brand refresh exactly as icon keys are, and a stale font key 404s where a stale icon key often still resolves — the `-f` in the `curl` above makes it fail loudly rather than writing a broken ZIP. Recover the current key by name: harvest the collection per "Regenerating the catalog" step 1 and look for the asset named `MongoDB Brand Refresh Fonts`, whose attachment is the ZIP. Do not block a diagram on a failed font fetch; the fonts may already be in the account, and step 10 is what detects a fallback either way.
