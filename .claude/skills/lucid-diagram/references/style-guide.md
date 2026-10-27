# Diagram Style Guide

Load this file before authoring any diagram JSON. Every rule here is binding and self-contained — author from this file alone. The (measured) and (convention) tags record where a rule came from: a corpus audit, or a judgment call the data supports but doesn't prove. They do not make a rule optional. Follow the rule as written and leave the debate to the writer.

## 0. First ask whether a diagram is warranted

Include a diagram for complex processes, architecture/configuration relationships, or complex workflows inside a MongoDB product. Do not diagram simplistic workflows (e.g. UI steps to create a user) or content with no MongoDB interaction. A diagram that can't name a single real component is conceptual illustration — legitimate, but don't give it technical-reference sizing.

## 1. Choose the diagram type before drawing

Six types cover 100% of the corpus (measured). Pick one and never blend them — blended diagrams produced the 13-component outliers.

| Type | Use when | Layout |
|---|---|---|
| Deployment / topology | Where processes run and what contains what | Nested containment: region › AZ › host › process |
| Reference architecture | A whole solution's parts and integrations | Top-down layers, or left-to-right tiers |
| Data flow / pipeline | Data moving and being transformed | Strictly left-to-right |
| Process / sequence | Ordered steps or a request lifecycle | Left-to-right, numbered steps |
| Data model / schema | Document structure | Nested boxes or code-shaped blocks |
| Conceptual illustration | An idea with no real components | Free |

Layout directions are (convention). State the chosen type to the user before building; if a request mixes types (e.g. topology plus pipeline), propose splitting into two diagrams.

## 2. The spine (canonical components)

Four components form the recurring chain user → client/driver → MongoDB/Atlas → collection (measured). Give each exactly one shape, fill, and label everywhere:

| Component | Shape | Fill | Label |
|---|---|---|---|
| End user | Rectangle, person icon | #FAFBFC, #001E2B border | User |
| Client application | Rectangle | #FAFBFC, #001E2B border | Application |
| MongoDB / Atlas | Rectangle, leaf icon | #023430, #FAFBFC text | MongoDB Atlas |
| Collection / document | Stacked-document glyph | #FAFBFC, #001E2B border | Collection |

The spine is distinguished by shape, icon, and label — not by hue (section 5). The fills above are the light canvas, which is the only canvas in use; the dark treatment is on hold per section 5.

The three non-glyph components are rectangles, authored as Standard Import `process`. The rectangle is the default component shape throughout a diagram; the circle is reserved for the single emphasis shape in section 2b. Hold one width and one height across all three so the spine reads as siblings, and size each from its type per section 6. Never a pill, stadium, or raised card in this role.

### 2a. Grouping label

A grouping and labeling shape, distinct from the four spine components above and from the containers in section 6d. Never a circle or a pill/stadium in this role.

- Use it to name a grouping: zones, regions, availability zones, tiers. These names are always grouping labels — never plain text, and never a container's own `containerTitle`, which Lucid renders as a dark chip straddling the container's edge. When a container carries one of these names, leave its `containerTitle` empty and add the label as a child of the container: horizontally centered, clear of the top edge, and clear of the first row of content.
- Fill Spring Green #00ED64, always; the fill is what tells this apart from an ordinary component rectangle. It is not the only #00ED64 fill — the emphasis circle in section 2b and the foundation container in section 6d also carry it.
- A rectangle, sized from its type per section 6 with the interior room that section asks for.
- No visible border, which takes an explicit stroke: Lucid's shape classes carry a black default stroke that omitting `stroke` does not suppress, so declare #00ED64 at width 1 to match the fill.
- It may carry a brand icon above its label. Both stay inside the shape, and the icon still follows the size and caption rules in section 6b.

### 2b. The circle (emphasis only)

The circle is the diagram's emphasis shape. It is not a component shape, not a container, and not a spine treatment — those are all rectangles.

- At most one circle per diagram, on the one component the diagram is actually about. Most diagrams need none, and a diagram with nothing exceptional in it is correct without one.
- It carries the diagram's single emphasis fill, Spring Green #00ED64 with Slate #001E2B text, and spends it. Section 5 holds the accounting.
- A true circle: width equals height, authored as Standard Import `circle`. An oblong bounding box renders an ellipse, which is not the shape.
- Size it from its contents rather than from its text width. Only the square inscribed in a circle is usable, about 70% of the diameter, so size the diameter from the widest label line at the 28px floor and then confirm the icon and both label lines clear the curve (convention).
- Declare a `stroke` matched to the fill, #00ED64 at width 1; omitting it leaves Lucid's black default outline in place.

## 3. Component library priority

Build from the top 15 component classes (measured): Collection/document/DB · MongoDB/mongod · User/customer · Client app/driver · MongoDB Atlas · Vector Search/embeddings · Cloud provider/region/AZ · AI agent/orchestration · Sharded cluster/shard · API/REST endpoint · Kafka/stream processing · Replica set members · Aggregation pipeline · Change streams · Atlas Search/mongot. Vector Search (107 diagrams) now outranks replica set members (57) — AI components need first-class shapes, not improvised ones. Map these to `diagram-icons.csv` rows when an icon exists; use palette-colored shapes when it doesn't.

## 4. One name per concept

Use these exact strings; drift is measured:

- "MongoDB Atlas" on first/primary use, "Atlas" in dense diagrams — never both in one diagram (108 vs 41).
- "mongod" — not "MongoDB Server", "MongoDB Node", "DB Server" (20 vs 8). Lowercase always, and in the code font, so it is also exempt from the uppercase label rule in section 6. "MONGOD" and "Mongod" are both defects.
- "Atlas Vector Search" (or "Vector Search" if space-constrained) — not "vector search", "VectorSearch" (48/5/4).
- "Atlas Search" for the feature; "mongot" only when the process itself matters — never interchangeably (16 vs 8).
- "Replica set" — not "ReplicaSet", "Replica Set" (14/10/5).
- "Application" for app code; "Driver" only when the driver is the subject — never Client/App/Client App/SDK interchangeably (5 variants).
- "User" — don't mix "User" and "Customer" in one diagram (74 vs 39).

Casing: product names verbatim as branded; descriptive labels in sentence case (convention — diverges from current practice, which skews Title Case; tokenizer matched across label boundaries in OCR, so unreliable).

## 5. Palette

The MongoDB brand refresh palette only: five primaries and six secondaries. The canvas is white #ffffff. Cap at 6 distinct colors per diagram (cap is convention; current median 5, p90 10):

| Hex | Name | Tier | Role |
|---|---|---|---|
| #ffffff | White | — | The canvas |
| #001E2B | Slate | Primary | Text, strokes, and borders |
| #023430 | Evergreen | Primary | MongoDB/Atlas component fills, with Off White text |
| #00ED64 | Spring Green | Primary | Connectors; the emphasis fill and its circle (§2b), the foundation container, and the grouping label (§2a) |
| #B1FF05 | Chartreuse | Primary | Accent; an emphasis fill in a row of sibling tiles |
| #FAFBFC | Off White | Primary | Spine component fills (§2); text on an Evergreen fill; an emphasis fill in a row of sibling tiles |
| #FF4F00 | Deep Orange | Secondary | Accent only |
| #FFAD00 | Chrome Yellow | Secondary | Lane accent — a lane's border, its label, and its own connector |
| #D959EA | Cosmic Pink / Pink | Secondary | Accent only — the two names share a hex, which two distinct names cannot; confirm with the brand team before using either |
| #765CF8 | Purple | Secondary | Lane accent — a lane's border, its label, and its own connector |
| #00C2EB | Sky | Secondary | Lane accent — a lane's border, its label, and its own connector |

- Surfaces carry no hue, and containers carry no fill at all: a container is transparent, taking the canvas color, and is marked by its border alone. Components keep the fills in section 2. MongoDB-owned, customer-owned, and MongoDB-adjacent surfaces are told apart by icon and label — the refresh palette has no light tints, so inventing a hue for the distinction would break the encode-meaning rule below.
- A solid fill means emphasis, so spend it once. One filled shape per diagram — Spring Green #00ED64, or Chartreuse #B1FF05 or Off White #FAFBFC where a row of sibling tiles needs telling apart — carrying Slate #001E2B text. Siblings stay unfilled; the filled-against-outlined contrast is what marks the focus. The emphasis circle in section 2b is that one filled shape when a diagram uses it, so a diagram has either a circled component or a filled rectangle, never both. Three fills stand outside the budget: the Evergreen #023430 MongoDB/Atlas component, the grouping label (section 2a), and the foundation container (section 6d).
- One canvas: Light, which is White #ffffff. Author every diagram against it and do not offer the writer a choice. The dark canvas is equally sanctioned as branding but is ON HOLD here: the icons in `diagram-icons.csv` exist in a light-canvas form only and are raster `image` blocks that cannot be recolored (section 6b), so a dark diagram would carry icons fighting their own background. Decline a dark request with that reason until a dark icon set ships.
- Any hex outside the eleven above is not a brand color and does not appear in a diagram. Recognizable non-brand hexes to watch for in existing diagrams: #00684A, #F9EBFF, #E3FCF7, #3A414A, #E9FF99, #00D2FF, #006EFF, #A6FFEC, #595959, #5E5E5E, #F3F3F3. Sky is #00C2EB, not #00D2FF.
- Spring Green is the connector color, plus the sanctioned fills above. Chartreuse and the six secondaries remain accents — Purple, Sky, and Chrome Yellow as lane accents, where a lane's border, its label, and its own connector share one hue — and none of them is a body-text color. The sanctioned large fills do not count against the accent budget.
- Never encode meaning in color alone — pair with a label or shape. Distinguish connector semantics with solid vs dashed plus labels, not hue.
- External logos: knock-out black-and-white only, never full color — including the vendor's own brand hexes (#326CE5 Kubernetes, #4285F4 Google), which never appear in a diagram at all. Size all logos in a diagram identically on the long edge, each keeping its own aspect ratio per section 6b. Never recolor MongoDB's own logo.
- Container fills come from the palette; do not invent container colors.

## 6. Typography

- Never outline text. Only 5% of corpus SVGs retain live `<text>` (measured); flattened labels are unsearchable, untranslatable, and invisible to screen readers. Lucid Standard Import text stays live in the document, but its SVG export appears to outline every label unconditionally, so this rule is currently unmet on anything the skill ships. Do not report an export as carrying live text without grepping it for `<text>`, and lean on the figure's `:alt:` for the accessibility description in the meantime.
- Fonts by role:

| Role | Font | Notes |
|---|---|---|
| Eyebrow | Söhne Mono Medium | Small kicker above a headline; usually absent from a diagram |
| Headline | Söhne Condensed Bold | Uppercase by default; sentence case selectively when the headline runs 6+ words. Usually absent from a diagram — headlines live in the surrounding page or slide, not on the canvas |
| Subheadline | Söhne Medium, or MongoDB Value Serif Medium | Two sanctioned options; pick one and hold it across the diagram |
| Body copy, labels, captions | Söhne Mono Medium | Always all caps. Writer decision Sep 2026, replacing the refresh's Söhne Regular in this role |
| Second line of a label (subtext) | Söhne Regular | Sentence case, not caps — the only role that is neither Mono nor uppercase. The descriptor line under a label's name, not the name itself. Writer decision Sep 2026 |
| Strong text in a label | Söhne Mono Medium | Same family as the label, and already Medium, so no weight change. Never `<b>`: the family ships one face, so Lucid synthesizes a fake bold |
| All-caps text and code | Söhne Mono Medium | Always all caps; the only exception is literal code |

- Söhne is MongoDB's primary typeface. Do not substitute Euclid Circular A (that is the product-UI font), Lexend Deca or Noto Serif JP or Source Code Pro (the retired pre-refresh fonts), or a generic system sans for Söhne.
- Authored font names are neither the brand's names nor the font filenames. The role names above are the brand's; the authored value is the name Lucid indexed the uploaded file under, which drops the umlaut (Söhne is `Sohne`) and takes the file's *typographic* family (`name` table ID 16) where it has one, the plain family (ID 1) where it does not. Appending a weight matches nothing and falls back silently rather than erroring (measured). Use these four values verbatim, and append a weight to none of them:

| Role | Authored value | Why not the obvious name |
|---|---|---|
| Labels, captions, strong text, eyebrow, code | `Sohne Mono` | `SohneMono-Medium.ttf` carries typographic family `Sohne Mono`; `Sohne Mono Medium` is ID 1 and does not resolve |
| Headline | `Sohne Condensed` | `SohneCondensed-Bold.ttf` carries typographic family `Sohne Condensed`; `Sohne Condensed Bold` is ID 1 and does not resolve |
| Subheadline (serif option) | `MongoDB Value Serif` | No ID 16 in the file, so the plain family name is the authorable one |
| Second line of a label (subtext) | `Sohne` | One of the two files with no ID 16, so the plain family name is the authorable one |

- The weight is baked into the family. Each family ships one face, so the editor's font dropdown offers no Medium or Bold beside the four names — that is the font resolving correctly, not a missing upload. `Sohne Mono` *is* the Medium file and `Sohne Condensed` *is* the Bold file, so neither takes `<b>`; `Sohne` is the Regular file, so a second line cannot be bolded either.

- Every diagram label and caption is uppercase, connector labels and note shapes included. Uppercase the text itself rather than relying on a CSS transform. Two exceptions, and only two: literal code, so a `mongod` or a field name keeps its real casing; and a label's second line, per the bullet below. Shorten before you uppercase — caps run wider, so "Application service and control plane" becomes "SERVICE & CONTROL", not a third line.
- `mongod` is lowercase in every label, every time, and set in the code font `Sohne Mono`, which is the label family anyway, so the only thing that changes is the casing. It is the literal-code exception that gets swept up when a label is uppercased wholesale: "MONGOD" is a defect, as is "Mongod". A label's second line is `Sohne Regular`, so a `mongod` appearing there needs its own run to hold `Sohne Mono`. The rule extends to other literal process and command names, `mongos` and `mongosh` among them.
- A label's second line is Söhne Regular in sentence case, and it is the diagram's only mixed-case text and only non-Mono family. The name on line one stays uppercase `Sohne Mono`; the descriptor under it is authored `Sohne` in sentence case — "Accepts all writes", not "ACCEPTS ALL WRITES" and not "Accepts All Writes". Author the two lines as separate runs so each carries its own `font-family`; a `<br>` inside one styled `<p>` puts both lines on one family. The 28px floor applies to the second line too, and it is never larger than the first (writer decision).
- A font has to be in the Lucid account before any of this holds. Lucid falls back to Inter in silence when the authored name matches no uploaded file, producing a diagram that satisfies this section on paper and none of it on screen. The files are staged to `~/Downloads` by SKILL.md step 1 (catalog reference, "Brand fonts"); the upload walkthrough is step 12, and no step of this skill verifies the rendered fonts.
- The fallback is block-level, not run-level (measured Oct 2026). An unresolved family does not degrade only the run that declares it — the whole text block goes to Inter, so declaring `Sohne` on a second line while only `Sohne Mono` is uploaded loses the first line's Mono too, and the separate-runs rule in the bullet above buys no isolation against it. Where an account holds `Sohne Mono` alone, the interim authoring is every run `Sohne Mono`, which makes second-line descriptors Mono rather than Söhne Regular: a known, visible compromise, and the only one that keeps the rest of this section standing. Restore `Sohne` on those runs once all four families are uploaded.
- Söhne Medium is not installed, and it costs one role: the sans subheadline. The account holds those four families and no others. Do not author `Sohne Medium`, which falls back silently; use `MongoDB Value Serif`, which is installed and sanctioned, or ask the brand team for the Medium file.
- Never italicize and never synthetically bold — use the shipped weight or variant.
- Minimum type size is 12pt rendered, which is 28px authored (measured). Treat 28px as the smallest size any diagram uses; every size in this section is px. The editor's font-size field reads pt, so a compliant 28px caption reads about `13` there, and a caption reading `6` is genuinely undersized rather than a unit artifact. Never rewrite a px value as pt — `28pt` is 2.2× the intended size.
- No text inside PNGs at all.
- Labels: concise; two lines maximum — an uppercase Söhne Mono Medium name plus one short descriptor line in Söhne Regular and sentence case. Three or more lines is a defect. Shortening is the first remedy whenever text does not fit: cut the words rather than stretching a shape around a label that should have been trimmed, and never recolor label text away from its role (#001E2B, or #FAFBFC on an Evergreen fill). Target roughly 3 words or 20 characters for a secondary label, counting characters as uppercase, which sets wider than the mixed case the target was written for.
- Label size steps: three only — title label (names a container), secondary label, smaller label. Hold each step constant across the diagram. The smaller step is the 28px floor, so the scale runs 36 / 32 / 28px rather than descending below it; a diagram needing smaller text needs fewer words, not a fourth step.
- Size the shape to the type, not the type to the shape, and size both axes. Height floor is roughly 68px per rendered line — a floor rather than a target — and width floor is `0.5 × font-size × characters + 40px` on the longest line, which is 14px per character at the 28px floor and 16px at 32px. Shapes and containers carry no size ceiling — only the section 7 canvas width and shape-count budget constrain them — so growing a cramped component is always available. Growing the type after a layout is settled is a re-layout, not a patch.
- Lines are counted as rendered, not as authored. A box narrower than the width floor wraps its line, and a box given one line's height whose text wraps to two renders the second line outside the box: this is the single most common label defect, and it looks like a caption floating free below its own shape. A two-line label needs about 136px of height. Width and height are one decision — fixing the height of a box that is simply too narrow leaves an unwanted wrap, so check the width first and shorten the text before growing either.
- Text never overlaps a shape edge or a connector. A label running past its box, a caption colliding with the icon above it, a container title crossing its own border, and a connector label sitting on the line it names are all defects, and a small overlap is as much a defect as a large one. Two remedies, in this order. Cut the text to the target in the bullet above. Then grow the shape: a label already at its minimum that still touches its box means the box is undersized. Where neither is available because the run is genuinely long and the space genuinely narrow — a region or zone name down the side of a tall container, a label on a vertical connector — set the text sideways instead: a separate text block rotated 90°, beside the connector rather than across it. Two things are never remedies: shrinking the type below the 28px floor, and letting a label straddle its connector. Offset a connector label clear of the path, on whichever side has the room.
- Connector labels: a few words at most, uppercase like every other label ("SQL", "OPLOG + HEARTBEATS (2 S)"). Long sentences on connectors are a defect — move explanation into a note shape.
- A labeled connector does not fit the standard gutter, so lay its run out from the label. The 88px gutter in section 7 is the minimum for an unlabeled connector, not a width a label can share: the preflight sizes a connector label at 7px × characters + 20px and wants 20px of clearance from both shapes, so the run has to be at least that width + 32px — roughly 220px for "OPLOG + HEARTBEATS (2 S)", and about two characters at 88px (measured Oct 2026: `label-placement` fired at an 88px gutter carrying a 5-character label). The gutter gives way, not the label: size the run from the formula and place the shapes to suit. Where the layout has no room for the longer run, move the text into a note shape and leave the connector bare — never compress the run to 88px with a label on it.

## 6b. Icons (brand rules)

- Every icon gets a caption — "icons are not logos" (brand rule). Our icon + text-caption pattern is mandatory, not optional.
- Icon size cap: 0.96in maximum — about 150px in Lucid's 160-DPI coordinates, or 92px at 96 DPI if you are sizing for a web export. The cap governs the icon's **long edge**, not both edges.
- The icon box carries the asset's own aspect ratio. Lucid fills an `image` box rather than letterboxing it, so a box shaped differently from the asset crops the glyph instead of padding it — the Cloud icon is 240 × 171, and in a 150 × 150 box it loses both sides and reads as a gravestone (measured Oct 2026). Scale the asset's native dimensions so its long edge lands on the diagram's icon size and derive the short edge from the ratio: Cloud at 150 becomes 150 × 107. Constraining the wrong edge crops just as badly — the same icon in a 70 × 150 box renders as a tall sliver. Native dimensions are the `native_size` column of `diagram-icons.csv`; measure any asset the column does not cover (catalog reference, "Native dimensions").
- Only 19 of the catalog's 67 assets are square, so a square box is wrong for most of it. The icon rows run 0.72:1 to 2.33:1 and the logomarks are more extreme still — the leaf is portrait at 0.47:1, the Atlas logo 2.54:1, the full MongoDB logo 3.92:1 — which is why this is a ratio rule rather than a per-asset exception.
- Default icon size is 128–150px on the long edge, at or just under the cap, because the 12pt type floor in section 6 leaves no room below: the caption cannot shrink to rebalance a small icon, so the icon has to carry the ratio (convention).
- Caption-to-icon ratio: a 28px caption should read as roughly a fifth of the icon's height, which is what 150px gives on a square or near-square glyph. Below about 112px the caption starts to compete with the glyph, and by 80px it is a third of it. A wide asset reaches the cap on its width and so sits shorter than 150px; judge the ratio against the rendered height and shorten the caption rather than overriding the cap to buy height. If icons will not fit at 128px, the diagram has too many components: split it per section 7.
- Scale down, never up, and scale every icon in the diagram together: every icon shares one long-edge value, and their short edges differ because their ratios do. Forcing identical boxes to make the short edges match is the crop defect above. Never use size to encode importance, and never drop to roughly 0.5–0.7in for a dense diagram, where the caption dominates the glyph.
- No external icons, ever — even popular ones like the AWS bucket icon cause brand inconsistency. Where the catalog holds no icon for a concept, take the nearest one it does hold and let the caption name the thing exactly: a near glyph with a precise label is better than a component with nothing above it. Only when nothing in the catalog is reasonably close does the label go in as plain text, and never improvise a shape in an icon's place.
- No spot illustrations in diagrams — they break visual hierarchy (they're for slide decks).
- Numbering badges (Zero–Nine) and node badges (Primary/Secondary/Compute node) exist in the icon family for numbered steps and member roles.

## 6c. Connections

Four treatments, and only four. Copy the library's connector styles rather than inventing a new one:

| Treatment | Meaning |
|---|---|
| Solid | Data path — the default |
| Dashed | Control plane or metadata path; always carries a label, so lay out a longer run for it per section 6 |
| Dotted | Orchestration or routing path that should recede behind the components it links |
| Broken (visibly interrupted, with a gap) | A severed or unavailable path |

Any of the four can carry an inline label of 1–2 words, or a small inline icon, on the longer run section 6 requires for a label.

- Connectors are 2px, twice the weight of a component outline or a container border. This is the one place stroke weight varies, and it varies by role rather than by nesting or importance. Writer decision Sep 2026 — connectors at 1px read as too faint against the components.
- Color: Spring Green #00ED64. Two exceptions. A dotted recede-path takes Slate #001E2B instead, so it stays legible while sitting back. And a connector inside a lane-differentiated flow inherits its lane's accent, so the path and the lane read as one thing.
- One small solid arrowhead at the destination end and nothing at the source end. Never a filled-dot terminator, and never the drawn-circle workaround that produces one.
- The head's size is not the deck's, and the only lever on it is stroke width. Standard Import exposes no arrowhead size property, so the deck's ~4.4px head cannot be reproduced at any width: Lucid's `"arrow"` at stroke width 1 renders at **~16.5px axial and ~10.5px across** (measured), roughly 4× the deck. At the 2px connector the head is larger still by an unmeasured amount — do not treat a doubled 33px as a figure. The length rules below are calibrated against the width-1 head.
- A bidirectional relationship is two separate one-way connectors side by side, about 7px apart centre to centre, each with its own head pointing the opposite way. Never one line with a head at both ends.
- A connector never touches a component. Every connector stops 4px short of the shape at both ends so the head floats clear of the outline instead of landing on it, and a head that touches or overlaps an outline is a defect. The 4px gap is measured from the deck and is independent of head size — do not scale it up with the head.
- A connector meets the shape it points at perpendicular to that shape's border, never parallel to it: into a left or right edge it arrives horizontal, into a top or bottom edge vertical. A line that runs alongside the border and terminates against it is a defect. This is a constraint on layout before it is one on the line: put source and destination on a shared row or column so the whole connector is one perpendicular segment. Where the layout genuinely turns, do not hand the corner to Lucid's elbow router, which picks the corner sequence itself and has been measured arriving on the wrong axis — author the turn as two straight segments meeting at a shared corner point, which fixes the arrival axis in the coordinates. The recipe is in references/diagram-authoring.md.
- A connector is never shorter than 72px. Below that the head takes enough of the line that the connector reads as a triangle with a stub. The floor is a constant and a writer decision, not head arithmetic.
- Never author the deck's 20px connector length: with Lucid's head, a 20px connector is 81–93% head (measured). Author 80px as the standard length, above the floor with room to absorb a rounding error.
- Connector length sets the gutter, not the reverse: 4 + 80 + 4 makes the 88px gutter in section 7.
- Orthogonal is absolute: every connector segment is horizontal or vertical. A diagonal connector is a defect, not a shortcut, and so is a curve. Where source and destination don't share a row or column, turn the path at a right angle rather than cutting across. In Standard Import every segment is a `lineType: "straight"` line with both endpoints pinned on a shared axis, and a turn is two of them; see references/diagram-authoring.md.
- Lay out for orthogonality first. When a connector needs three or more elbows to stay on-axis, the shapes are in the wrong places — move them onto a shared row or column instead of accepting the zigzag.
- Avoid stretching a broken connector — changing its length distorts the gap rhythm.
- Standard Import exposes only three stroke styles (`solid`, `dashed`, `dotted`), so the broken treatment cannot be set at creation time. Apply it afterward with `basecanvasediting.editLineStyle` (see references/diagram-authoring.md, "Editing existing documents"), which also accepts the wider-gap patterns (`dashed24`, `dashed32`, `dashed44`, `longdash`, `dashlongdash`, `dashdot`). Which of those matches the approved library is still unsampled.
- Use a container, not a line treatment, to show network or trust grouping.
- Stroke weight takes two values and no more: 2px on connectors, 1px on component outlines and containers. Hold each constant — one width for every connector, one for every outline and border at every nesting level. Never vary weight by nesting or importance: the outer boundary is marked by the foundation container in section 6d, not by a heavier border.
- Lucid's stroke-width number maps 1:1 to exported px, verified against the approved shapes SVG, so a stroke width of 2 renders as 2px. Never author a weight in pt: the legacy Diagram Guidelines page's "minimum line width 2pt" is about 4.4px and describes nothing in the approved shapes, whose connectors are 1px.

## 6d. Containers

- Transparent by default. A container is marked by its border, not by a fill. There is no secondary-container tint, and an Off White fill is not a fallback for one. Fill a container only to mark emphasis, under the one-fill rule in section 5.
- Containers are optional. Use one only when large sections of interaction need separation; a diagram with no container is valid.
- Border 1px at every nesting level, Slate #001E2B. Never 2px on the outermost container. Spring Green #00ED64 borders are the exception, for containers that are a row of category tiles rather than architecture (convention).
- A dotted border marks a logical boundary rather than a physical container — a trust zone, a stage grouping, a scope line.
- Nest up to three levels: a dotted boundary, a solid container inside it, and components inside that. Past three, the diagram wants splitting per section 7.
- A foundation layer is its own container, not a treatment on another one: a full-width solid Spring Green #00ED64 rectangle with no separate border, sitting below the stack it supports and separated from it by the standard gutter, carrying Slate #001E2B text. Use it for the thing everything else rests on — the platform, the database, the substrate. Never a 10px Slate base band.
- Interior white space is generous: containers are substantially larger than their content, with the label clear of the top edge and the content clear of all four sides. Do not size a container to its content.
- Resizing is permitted. Recoloring is not.
- The emphasis circle (section 2b) is a component shape rather than a container, so none of the rules in this section apply to it. The same goes for the grouping label in section 2a, which is a filled rectangle placed inside a container.

## 7. Canvas, layout, and complexity budget

- Flow left-to-right and top-to-bottom, matching reading order. Align edges on a shared grid and keep gutters between sibling nodes uniform.
- Gutters are derived from the connector, not chosen freely. A gutter that carries a connector is 88px — an 80px connector plus its two 4px end gaps — and it is the same value horizontally and vertically. A gutter between siblings with nothing running between them tightens to about 12px (measured). The 88px figure deliberately overrides the deck's 28px, for the arrowhead reason in section 6c, and it clears Lucid's 60px preflight clearance threshold, which the earlier 48px gutter did not.
- 88px is a minimum, and a labeled connector exceeds it per section 6. Uniformity therefore holds within a kind rather than across the diagram: one gutter value for the unlabeled runs, one for the labeled ones. Never compress a connector, labeled or not, to fit a gutter chosen first — re-lay out the shapes instead.
- Uniformity rule: within one diagram, icon long edge, each of the two stroke weights, each label size step, and logo long edge are each held constant; the connector-versus-shape weight step in section 6c is the one sanctioned difference. Icon and logo short edges are not held constant — they follow each asset's own ratio per section 6b, and equalizing them crops the glyph.
- If a diagram exceeds one comfortable screen of reading, split it into two diagrams rather than shrinking icons and labels toward illegibility.
- Aspect ratio: default 16:9; stay within 1.3–2.0; hard cap 3:1; avoid portrait (measured median 1.78). Compute the ratio from the bounding box of all shapes before creating, and re-layout if out of bounds.
- Intrinsic width: 1200–1600px (measured median today is 960px).
- Complexity cap: 8 component classes (current p90; mean 3.9, median 4, measured). Past 8, propose an overview diagram plus detail diagrams instead of one dense figure. Max ~15 labeled shapes per diagram (convention).

## 8. File format and delivery

- SVG for anything with text or lines; PNG only for genuine raster content; never .jpg or .webp for a diagram.
- Filenames: kebab-case, descriptive, no version numbers or dates — e.g. `sharded-cluster-zone-sharding.svg`. Keep filenames identical across version directories.
- Record the authoring tool and source file in the PR description. Known gap: the Lucid MCP exports PNG only (`lucid_export_document_as_PNG`); for docs publishing the writer exports SVG from the Lucid editor manually — the skill should hand off with the document link and note this step.
- SVG export settings: choose Export → SVG, NOT "SVG with transparent background", so the White #ffffff canvas ships with the diagram. Crop with a small margin in that same color. A baked-in canvas is what keeps a diagram legible when the surrounding page is in dark mode.
- A Lucid SVG export is not publishable as it comes out. Lucid writes each embedded icon's CDN URL as the element's `id` and points a `<use xlink:href="#...">` at it, which is invalid XML twice over — an `id` may not contain `:`, `/`, or `?`, and the query string's bare `&` is not a legal entity. SVG is parsed strictly rather than recovered like HTML, so a browser rejects the whole file and the figure does not render at all. Repair every export before committing, and gate on well-formedness by parsing rather than by looking: the repair snippet and the two validation commands are in references/diagram-authoring.md ("Repairing the SVG export").
- Diagrams published in content/ additionally follow the publishing markup and alt-text rules in the repo diagram style guide (`.. figure::` with mandatory relationship-describing `:alt:`, `:lightbox:` when 6+ components or 1200px width). Alt text runs 40–125 characters: the guide's upper bound is 150, but the repo's SEO linter warns above 125 (`image-alt-length`), so 125 is the operative ceiling. `:figwidth:` takes 600px, 750px, or 1200px per the audit guide; an internal draft prefers percentages for SVG, so name that choice to the writer when publishing rather than deciding it.
