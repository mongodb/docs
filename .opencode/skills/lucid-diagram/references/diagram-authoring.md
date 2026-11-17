# Standard Import Authoring Reference

Load this file when authoring or validating the Standard Import JSON for a Lucid diagram. The authoritative source is the resource `lucid://skills/diagram-specification` (read it via `mcp__lucid__get_mcp_resource` before every creation call); this file is the working distillation.

If the run is a revamp of an existing diagram, the JSON must account for every label, component, and relationship the original carried — SKILL.md step 2 states the rule. Check the authored JSON against the inventory before validating, and treat a missing item as an error rather than a simplification.

## Document structure

Top level: `{"version": 1, "pages": [...]}`. Each page needs `id`, `title`, `shapes`, and `lines`. No containers on the page, no `collections` needed for diagram work.

## Shapes used by this workflow

- `process` — workhorse box and the default component shape: the three non-glyph spine components in section 2 of the style guide, the #00ED64 grouping label in section 2a, and ordinary boxes (clients, routers, member boxes). Takes `style` with `fill`, `stroke`, `textColor`. Corner radius is not a Standard Import property on any rectangular class, so do not look for one. The grouping label takes `fill` #00ED64 with a `stroke` of #00ED64 at width 1 — do not omit `stroke`, which leaves Lucid's black default outline in place (measured on `terminator`).
- `circle` — the emphasis shape in section 2b of the style guide, and nothing else: at most one per diagram, carrying the #00ED64 emphasis fill. It is not a component shape, a container, or a spine treatment; those are all `process`. It is the Shape Library circle, which takes `text`, so it carries its own label. Give it a square `boundingBox` (`w` equal to `h`, or it renders as an ellipse) and a `stroke` of #00ED64 at width 1 to match the fill. It is not `circleContainer`: that is a container, containers take no `text`, and a container's `containerTitle` renders above the container rather than inside it. `terminator` is not a fallback.
- `image` — brand icons. Requires `"image": {"type": "image", "url": "<cdn_url>"}` and a `stroke` (use white `#FFFFFF` 1px for borderless icons). Renders as a picture. Author the `boundingBox` at the asset's own aspect ratio, scaled so its long edge is 128–150px and using the same long-edge value on every icon in the diagram — the style guide's default sits against the 150px cap because the 28px caption floor cannot shrink to rebalance a smaller icon (style guide §6b). Never author the box square by default: Lucid fills an `image` box rather than letterboxing it, so a box that does not match the asset's ratio crops the glyph. Size it from `native_size` in `diagram-icons.csv`:

  ```
  long = 150
  w, h = native_w, native_h
  scale = long / max(w, h)
  boundingBox.w = round(w * scale); boundingBox.h = round(h * scale)
  ```

  Cloud is 240 × 171, so it imports as 150 × 107 — not 150 × 150, which crops it to a gravestone, and not 70 × 150, which crops it to a sliver (both measured Oct 2026). Verify by exporting the page as a PNG and looking at the glyph; no preflight rule covers image cropping.
- `text` — captions under icons. Does NOT accept a `style` property; format via HTML in `text` instead.
- `note` — annotation callouts (failover explanations, caveats).
- `rectangleContainer` — grouping (e.g. "Application tier", "Replica set rs0"). Supports `containerTitle: {"text": "..."}`, which Lucid renders as a dark chip on the container's top edge — leave it empty and use a #00ED64 `process` inside the container when the grouping is a zone, region, AZ, or tier (style guide §2a). Set `"assistedLayout": false` on the container shape. Children are contained by being placed inside the bounding box. Give it no fill at all — the style guide's containers are transparent, so omit `fill` rather than setting Off White, and add one only to mark emphasis. Border at stroke width 1 at every nesting level, #001E2B (#00ED64 instead when the containers are a row of category tiles rather than architecture). Nest at most three deep.

Z-order: shapes render in array order, later on top. Put containers first.

### Foundation container

The style guide's foundation layer (§6d) is a container in its own right, not a treatment on another one. Author it as an ordinary `rectangleContainer` or `rectangle` with `fill` #00ED64 and no separate border color — a stroke of #00ED64 at width 1, the same trick the grouping label uses to suppress Lucid's black default — spanning the full width of the stack above it and separated from it by the standard 88px gutter. Its text is #001E2B. It is a sibling of the stack, not a child, so it raises no containment or inner-padding findings.

Do not reintroduce the earlier 10px Slate base band flush with the outermost container's bottom edge, or its drawn-rectangle recipe.

## Endpoints and lines

Every connector carries one small solid arrowhead at the destination end and nothing at the source: `style: "arrow"` on `endpoint2`, `style: "none"` on `endpoint1`. The endpoint style encodes direction, so `endpoint1` and `endpoint2` are not interchangeable — author them source-first. Never `"hollowArrow"`, `"openArrow"`, or a filled dot.

The arrowhead scales with stroke width, which is the only size lever Standard Import offers — there is no arrowhead size property. Measured Sep 2026 by rendering `"arrow"` at widths 1 and 3 and cropping both heads at identical scale: the width-3 head is visibly wider and blunter. Connectors are width 2 per the style guide, so every head is larger than the ~16.5px width-1 head the length rules were measured against — by an unmeasured amount. Do not lower a connector to width 1 to shrink its head; the width is a style rule, and the lengths below are what keep the head in proportion.

A bidirectional relationship is two lines, each with its own head, offset about 7px apart on the cross axis. Never one line with `"arrow"` on both endpoints.

The line stops short of the shape, which requires free endpoints:

- Both endpoints are `positionEndpoint`, not `shapeEndpoint`: `{"type": "positionEndpoint", "style": "none", "position": {"x": px, "y": py}}`, in absolute canvas coordinates. A `shapeEndpoint` snaps to the outline and cannot be offset, so it defeats the gap.
- Offset each coordinate 4px outward from the edge the connector leaves or enters, along that connector's axis: a line leaving A's right edge starts at `x: ax + aw + 4`, and one entering B's left edge ends at `x: bx - 4`. With the style guide's 80px connector length, that puts an 88px gutter between the two shapes. Choose the cross-axis value the way a pinned relative `position` would — off-center, around 0.2 or 0.7 of the edge — so the head clears the shape's text.
- Because both offsets come out of the span, the authored length is the edge-to-edge gap minus 8px — the 88px gutter yields the intended 80px line. Check it before importing: a gap under 80px produces a connector below the style guide's 72px floor, where the arrowhead takes enough of the line that it renders as a triangle with a stub. Lucid's head is ~16.5px long at width 1 and larger at the width 2 the style guide authors, not the ~4.4px the branding deck draws, and there is no arrowhead size property, so length is the only control. The preflight does not catch this — nothing reports a short connector. Widen the layout rather than letting the line compress.
- A free endpoint is attached to nothing, which is the cost of the gap: moving or resizing a shape in the editor afterward leaves the connector behind. Re-author the JSON rather than nudging shapes by hand.
- The arrowhead raises no preflight findings of its own — it is part of the line, not a separate shape. Verified Sep 2026: a four-shape page with four gapped `"arrow"` connectors returned zero errors and no connector-related findings at all.
- The 88px gutter clears `shape-clearance`'s 60px threshold, so a clearance finding naming two connected shapes points at the layout rather than passing automatically; see the geometry rules below.

- A `shapeEndpoint`'s relative `position` (x/y each 0-1) must be present on BOTH endpoints or NEITHER — one-sided fails the import with a bare 400 that names nothing. The rule does not reach the `positionEndpoint` pairs this skill authors, where an absolute `position` is required on each endpoint.
- Every connector runs horizontal or vertical only. Never diagonal, never curved. `lineType` is always `"straight"`, with both endpoints pinned so they share one coordinate — identical `y` for a horizontal segment, identical `x` for a vertical one. `"curved"` is never used, and `"elbow"` is not used either: see the turn recipe below.
- A segment whose endpoints share an axis is the only case the geometry checks below cover. `"elbow"` lines are reported as unchecked — the report says so with its own `connector-geometry-preflight-skipped` finding — so their paths and labels have to be verified by eye. Authoring every segment straight and aligned keeps the whole page under the checks.
- Each endpoint approaches its shape perpendicular to the edge it faces (style guide §6c). Author this in the coordinates: an endpoint 4px off a left or right edge shares its `y` with the other end of that segment, so the arrival is horizontal; one 4px off a top or bottom edge shares its `x`. A single segment therefore only works when the two shapes present facing edges — a right edge to a left edge, or a bottom to a top — and at a shared cross-axis value. Anything else is a turn.
- Choose endpoint coordinates deliberately: leave and enter the sides that keep the path clear of unrelated shapes, and keep the cross-axis value off-center so a head never lands on shape text. Off-center is bounded by the perpendicular rule — the destination endpoint's cross-axis value has to stay within the span of the edge it faces, or the head arrives beside the shape rather than into it.
- Dashed metadata/control planes: `"style": "dashed"` in `stroke`; solid data paths: `"solid"`; dotted for a routing path meant to recede. Standard Import accepts only those three, so the broken (gapped) treatment for a severed or unavailable path has to be applied after creation via `basecanvasediting.editLineStyle`, whose `strokeStyle` also takes the wider-gap patterns. Label every dashed connector.
- Connectors take stroke `#00ED64` (Spring Green) at width 2, identical on every connector in the document. A dotted recede-path takes #001E2B instead, and a connector inside a lane takes that lane's accent. Stroke width is in px (the Lucid number maps 1:1 to exported px), and there are two widths in the document and no more: 2 on connectors, 1 on component outlines and containers.

### Turns: two segments, never an `elbow` line

A connector that changes direction is two `"straight"` lines meeting at a shared corner coordinate, not one `"elbow"` line. An `"elbow"` line between two free coordinates gives up control of the corner sequence: the router picks it, and the final leg can arrive on a different axis than the edge it faces, which renders as a line running alongside the border instead of into it — the parallel-arrival defect in style guide §6c. Two segments put the arrival axis in the coordinates, where it cannot be re-routed.

- The riser leaves the source: one endpoint 4px off the edge it exits, the other at the corner. Both endpoints `style: "none"` — this leg carries no head.
- The approach enters the destination: one endpoint at the same corner coordinate, the other 4px off the destination edge. `style: "none"` at the corner, `style: "arrow"` at the destination. The head goes on this leg only, so the pair still reads as one connector with one head.
- The corner coordinate is identical in both lines. Author it once and reuse the number; a corner that disagrees by a pixel renders as a visible break.
- The 80px length rule and 72px floor apply to the approach leg, which is where the head sits and where head-to-line proportion is judged. The riser only has to reach the corner.
- Give each line its own `id`. Both import as ordinary lines and both come under the geometry checks, so a turn costs nothing in coverage — the fan-out verified below returned zero findings.

Verified Oct 2026 — one source fanning out to three stacked destinations, two of the branches turning, all three arriving horizontally into left edges, zero preflight findings:

```json
"lines": [
  {"id": "upRiser", "lineType": "straight",
   "endpoint1": {"type": "positionEndpoint", "style": "none", "position": {"x": 200, "y": 396}},
   "endpoint2": {"type": "positionEndpoint", "style": "none", "position": {"x": 200, "y": 154}},
   "stroke": {"color": "#00ED64", "width": 2, "style": "solid"}},
  {"id": "upApproach", "lineType": "straight",
   "endpoint1": {"type": "positionEndpoint", "style": "none", "position": {"x": 200, "y": 154}},
   "endpoint2": {"type": "positionEndpoint", "style": "arrow", "position": {"x": 496, "y": 154}},
   "stroke": {"color": "#00ED64", "width": 2, "style": "solid"}}
]
```

The source spans x 0–280 and y 400–580; the destination spans x 500–780 and y 100–280. The riser exits the source's top edge at `y: 396` (4px clear) at `x: 200`, which is inside the source's x-span, and climbs to the corner at `y: 154`. The approach runs from that corner to `x: 496`, 4px off the destination's left edge, at the destination's `y: 154` — 0.3 of its 100–280 span, off-center so the head clears the shape text. A straight branch to a destination on the source's own row needs no turn and stays one segment.

## Text formatting

The `text` property accepts inline HTML. In JSON, escape quotes as `\"`:

- Styled caption: `"<p style=\"font-family:Sohne Mono;font-size:28px;text-align:center\">SHARD 1</p>"`
- Two-line label — two `<p>` runs, not one with a `<br>`, because the second line is a different family and casing (style guide §6): `"<p style=\"font-family:Sohne Mono;font-size:32px;text-align:center\">PRIMARY</p><p style=\"font-family:Sohne;font-size:28px;text-align:center\">Accepts all writes</p>"`. A `<br>` inside one styled `<p>` applies that `<p>`'s `font-family` to both lines, which silently puts the descriptor in uppercase Mono — the defect this split exists to prevent. `<br>` is still correct for a single-family wrap, which a compliant label does not have.
- `mongod` stays lowercase in the authored string and stays in `Sohne Mono` (style guide §4 and §6). On line one that is the family already, so it is only a casing decision: `"<p style=\"font-family:Sohne Mono;font-size:32px;text-align:center\">mongod</p>"`, never `MONGOD`. On a second line, where the run is `Sohne`, split the token into its own run so it keeps Mono: `"<p style=\"font-family:Sohne;font-size:28px;text-align:center\">Runs on each </p><p style=\"font-family:Sohne Mono;font-size:28px;text-align:center\">mongod</p>"`. Same for `mongos` and `mongosh`.
- Other text-bearing fields (containerTitle, table cells, card fields) take plain text only, so they cannot carry a second line at all — a container title is one uppercase Mono line by construction.
- Declare `font-family` unquoted, in ASCII, and without the weight word; Lucid's default is not a brand font. Lucid stores the CSS value verbatim rather than parsing it as a family list, and matches it literally against the name it indexed the uploaded file under, so there are three independent ways to miss: apostrophes (`font-family:'Sohne Mono'` stores the apostrophes too), the umlaut (`font-family:Söhne` stores `Söhne`, but the embedded name is ASCII), and the weight word (`font-family:Sohne Mono Medium` is the file's plain family name, but Lucid indexed its typographic family, `Sohne Mono`). Each one falls back silently, and the fallback is block-level rather than run-level: the unmatched name takes every run in that text block to Inter, so a miss on a second line also loses the first line's Mono (measured Oct 2026). The two-line and `mongod`-split patterns above therefore hold only while `Sohne` is uploaded alongside `Sohne Mono`; where it is not, author both runs `Sohne Mono` and restore `Sohne` after the upload. Unquoted carries multi-word names: `font-family:Sohne Mono` stores as `Sohne Mono` (measured). Diagram text is `Sohne Mono`, uppercased in the text itself, with one exception: a label's second line is `Sohne` in sentence case. `Sohne Condensed` and `MongoDB Value Serif` cover headlines and serif subheadlines. Never `<i>`, and never `<b>`: each family ships one face and already carries its weight, so bold is synthesized. Two lines is the label maximum.
- `px` and `pt` are both accepted and are not interchangeable. Lucid stores pt and converts at pt ≈ px × 0.45, so `font-size:28px` is stored as about `13` and clears the style guide's 12pt floor, while `font-size:14px` stores as `6` and does not. Author 28px as the minimum and 32px for the next step up; do not "correct" a px value to pt, which is 2.2× larger. `lucid_copy_document_style` reports sizes in pt, so never copy its numbers into a `px` declaration.
- Do not verify typography after creation. `lucid_export_document_as_PNG` discards `fontFamily` outright and renders every font in the same fallback sans (measured), so the PNG check in SKILL.md step 10 covers icon crops and label overruns only.

## Worked example

A complete compliant page, validated Oct 2026 with zero errors and exactly one expected warning. Copy the geometry and the text strings; read the shape property tables above for anything this does not cover.

Request: "an application querying a sharded Atlas cluster."

Layout decisions, in the order they were made. Three components on one row, left to right. Both rectangles take one width and one height so the spine reads as siblings; 280 × 180 holds a 32px name plus a 28px second line with room to spare. The icon is 150px at the cap on its long edge, with its short edge derived from the asset: Sharding is natively 240 × 208, so the box is 150 × 130. Its caption is centered under it and widened to 160 because the style guide's label estimate puts `SHARDING` at 14 × 8 + 40 = 152px. Every gap that carries a connector is 88px, which is 4 + 80 + 4. Every connector is one aligned straight segment, because all three components sit on one row — nothing here turns.

```json
{
  "version": 1,
  "pages": [{
    "id": "page1",
    "title": "Sharded cluster access",
    "shapes": [
      {"id": "app", "type": "process",
       "boundingBox": {"x": 0, "y": 0, "w": 280, "h": 180},
       "style": {"fill": {"type": "color", "color": "#FAFBFC"},
                 "stroke": {"color": "#001E2B", "width": 1, "style": "solid"},
                 "textColor": "#001E2B"},
       "text": "<p style=\"font-family:Sohne Mono;font-size:32px;text-align:center\">APPLICATION</p>"},
      {"id": "atlas", "type": "process",
       "boundingBox": {"x": 368, "y": 0, "w": 280, "h": 180},
       "style": {"fill": {"type": "color", "color": "#023430"},
                 "stroke": {"color": "#001E2B", "width": 1, "style": "solid"},
                 "textColor": "#FAFBFC"},
       "text": "<p style=\"font-family:Sohne Mono;font-size:32px;text-align:center\">MONGODB ATLAS</p><p style=\"font-family:Sohne;font-size:28px;text-align:center\">Managed cluster</p>"},
      {"id": "shardIcon", "type": "image",
       "boundingBox": {"x": 736, "y": 15, "w": 150, "h": 130},
       "image": {"type": "image", "url": "https://cdn.bfldr.com/2URK6TO/as/v3w8sf756xjx6x84gxjp94/x?auto=webp&format=png"},
       "stroke": {"color": "#FFFFFF", "width": 1, "style": "solid"}},
      {"id": "shardCaption", "type": "text",
       "boundingBox": {"x": 731, "y": 153, "w": 160, "h": 56},
       "text": "<p style=\"font-family:Sohne Mono;font-size:28px;text-align:center\">SHARDING</p>"}
    ],
    "lines": [
      {"id": "appToAtlas", "lineType": "straight",
       "endpoint1": {"type": "positionEndpoint", "style": "none", "position": {"x": 284, "y": 54}},
       "endpoint2": {"type": "positionEndpoint", "style": "arrow", "position": {"x": 364, "y": 54}},
       "stroke": {"color": "#00ED64", "width": 2, "style": "solid"}},
      {"id": "atlasToShard", "lineType": "straight",
       "endpoint1": {"type": "positionEndpoint", "style": "none", "position": {"x": 652, "y": 60}},
       "endpoint2": {"type": "positionEndpoint", "style": "arrow", "position": {"x": 732, "y": 60}},
       "stroke": {"color": "#00ED64", "width": 2, "style": "solid"}}
    ]
  }]
}
```

Why each number is what it is:

- `app` right edge is 280, `atlas` left edge is 368, so the endpoints sit at 284 and 364 and the line is 80px. Both endpoints share `y`, which is what makes `lineType: "straight"` a single orthogonal segment and brings the line under the geometry checks below.
- The shared `y` is off-center in both shapes — 54 of 180 is 0.3, and 60 against the icon's 15–145 span is 0.35 — so neither head lands on shape text. Both values stay inside the span of the edge they face, so each approach is perpendicular.
- `shardCaption` sits 8px under the icon, whose bottom edge is 145 rather than 165 because the box is 130 tall. That 8px gap is the one finding the page returns, and it is correct: `shape-clearance` on `shardIcon`/`shardCaption`, which is the icon-caption exemption. Nothing else fires.
- Neither connector carries a label, which is not a stylistic choice at this gutter: a 5-character label on this 80px line failed `label-placement` against both shapes (measured Oct 2026). A dashed control-plane path, which must be labeled, needs the longer run the geometry rules below size for it.
- The page is 891 × 209 — the caption is the widest and lowest element at x 731–891 and y 153–209 — about 4.3:1, outside the style guide's §7 ratio band. Three components in one row cannot be anything else; a real diagram has more rows. Copy the numbers, not the proportion.

## Geometry rules (enforced by the validate tool)

Run `lucid_validate_diagram_specification` on every draft. Only structural findings block import — missing fields, bad enum values, duplicate ids, unresolvable endpoints, malformed colors. Layout findings are advisory no matter what severity they carry: a `shape-clearance` finding is labeled an error but still imports. Fix the ones that describe a real defect and account for the ones this skill's rules make unavoidable:

- Pairwise shape clearance: 60px minimum between non-container shapes — Lucid's own rule, stated in the Collision check bullet of `lucid://skills/diagram-specification`, exposed through no JSON parameter and only advisory. One exemption is structural to this skill and will be reported every time: icon-caption pairs, which sit far closer than 60px by design. Connected pairs are not exempt, since the 88px gutter clears the threshold, so a clearance finding on two connected shapes points at a layout problem. Confirm each finding is an icon-caption pair before accepting it, and never satisfy the check by widening a gutter past 88px.
- Container inner padding: 80px on every side. Nothing in this skill's rules trips it, so treat any finding here as a real defect.
- Label width estimate: `0.5 × font-size × characters + 40px` on the longest line, so 14px × characters + 40px at the 28px floor and 16px at 32px. Each rendered line needs about 68px of box height. Treat the width figure as a floor on `w`, not a guide: a narrower box wraps the line, and the wrap then falls outside an `h` sized for one line — the overrun the step 10 PNG is looking for. Size `h` from the wrapped line count, and where that count is above two, cut the text instead (style guide §6 caps a label at two lines). A connector label is estimated differently and is the tighter constraint: the preflight sizes it at 7px × characters + 20px and requires 20px of clearance from every shape, so a labeled connector needs a length of at least that width + 32px. The 88px gutter therefore carries no usable connector label (measured — a 5-character label collided with both shapes); give a connector that must be labeled a longer run, or move the text into a `note`. Shorten labels rather than shrinking font — 28px is the floor, so shrinking is not available ("oplog replication + heartbeats (every 2 s)" → "OPLOG + HEARTBEATS (2 S)").
- Text may not overlap a shape edge or a connector (style guide §6). Size every `boundingBox` from that width estimate rather than checking it afterward. The preflight's label checks are straight-line-only, which is the whole reason this skill authors every segment straight — a page built that way gets its labels checked. Fix a collision by shortening the text, then by growing the box: `boundingBox` `w`/`h` at authoring time, or `basecanvasediting.resizeBlock` after creation. Sideways text is a separate text block, not a property of the shape it sits beside, positioned alongside the connector or down the container edge. Neither the Standard Import shape tables nor the `basecanvasediting` API exposes rotation, so a sideways label is a manual rotation the writer makes in the Lucid editor. Never rotate a component to fit its own label.
- Duplicate labels on connectors sharing an endpoint or running parallel read as garbled: label one twin and leave the other unlabeled, or stagger positions.
- Straight-line paths are checked center-to-center; route lines around icons by pinning endpoints on the far side, or reposition shapes so related elements are adjacent. A two-segment turn is checked as two straight paths, so each leg is covered. A `connector-geometry-preflight-skipped` finding means an `elbow` or `curved` line slipped onto the page and got no path or label check at all — treat it as a defect to re-author as straight segments, not as a note to inspect by hand.
- Connector path clearance does not fire on a connector's own terminators — the arrowhead is part of the line, not a separate shape — so a finding here names a genuine crossing. Route around it.

## Creation call

`lucid_create_diagram_from_specification` with `product: "lucidchart"`, a title, and `use_assisted_layout: false` — always false for these diagrams; assisted layout re-flows on every subsequent item addition and has destroyed manual layouts. The response carries `editUrl`, `viewUrl`, and an `input_preflight` report — only `editUrl` is ever handed to the writer (SKILL.md step 11); re-check the JSON against any structural finding, and triage the layout ones against the expected-findings list above.

Do not assume those URLs arrive as readable text. Observed Sep 2026: both `lucid_create_diagram_from_specification` and `search` came back as rendered widgets on two consecutive attempts, and the writer's client displayed no card at all — so the diagram existed with no way to reach it. When the response text has no URL in it, recover one rather than describing where it might be: `lucid_get_document_metadata` on the document id returns `editUrl` and `viewUrl` as plain JSON (verified Sep 2026), and `search` with the title and `owned_by_me: true` returns `id` and `url` if the id is also unreadable. The edit form is derivable from the id alone — `https://lucid.app/lucidchart/<documentId>/edit` — so there is no case where the URL is genuinely unavailable.

The `input_preflight` report and the triage above are working material, not output. Act on the findings; do not relay them to the writer. SKILL.md step 11 defines the closing message, and it is the edit URL plus the verbatim housekeeping block and nothing else — no summary of the diagram, no style rationale, no account of what was and was not touched, no question about committing. That holds even when the request named a docs page and the image swap is still outstanding. This restatement is deliberate: step 11 is read at the start of a run and needed at the end of one.

## Repairing the SVG export

A Lucid SVG export does not parse as XML, so a browser renders nothing at all. Repair it before it is committed; this applies to every export carrying a brand icon, which is every diagram this skill produces. Full diagnosis in style guide §8.

Lucid writes each embedded icon's Brandfolder CDN URL as the element `id` and references it from a `<use xlink:href="#<same URL>">`. An XML `id` may not contain `:`, `/`, or `?`, and the URL's bare `&` is not a legal entity. Rewrite each one to a plain slug, which fixes both problems together since the ampersands live only inside those URLs:

```python
import re
p = 'diagram.svg'
d = open(p).read()
for url in set(re.findall(r'id="(https://cdn\.bfldr\.com/[^"]+)"', d)):
    slug = 'icon-' + re.sub(r'[^a-z0-9]+', '-', url.split('/as/')[1].split('/')[0].lower())
    d = d.replace(f'id="{url}"', f'id="{slug}"').replace(f'xlink:href="#{url}"', f'xlink:href="#{slug}"')
open(p, 'w').write(d)
```

Then gate on well-formedness rather than eyeballing the render:

```bash
python3 -c "import xml.etree.ElementTree as ET; ET.parse('diagram.svg')" && echo "parses"
rsvg-convert -o /tmp/check.png diagram.svg   # renders a genuinely sound file
```

Also confirm every `xlink:href="#..."` resolves to an `id` present in the file — a dangling reference drops that icon silently instead of failing the parse. The icon bitmaps themselves are embedded base64 and need no attention.

Expect the export to carry outlined paths rather than live `<text>` elements, which is why the label text is not searchable or selectable in the committed file and why the directive's `:alt:` carries the accessibility description.

The snippet slugs each icon by its Brandfolder asset key, so the ids come out as `icon-r4gwbjwkbnrwwsmzkj8x7n` rather than `icon-mongodb-server`. That is valid and sufficient — the id only has to be a legal XML name that its `<use>` matches. Substitute the catalog's readable name by hand if you want the file more legible; nothing depends on it. Verified Oct 2026 against the original broken export: parses, no dangling references, all three base64 images intact, renders through `rsvg-convert`.

Checking the canvas hex and the text treatment does not substitute for this: a file passing both shipped to staging and rendered nothing.

## Editing existing documents

The Lucid MCP exposes no item-level edit tools. Edit through `lucid_run_script` against the document id, calling `skills.basecanvasediting.<method>(...)`. Call `lucid_load_script_documentation` with `name: "basecanvasediting"` first and follow the method reference it returns. Start each edit with an unfiltered `read()`, then `inspect(ids)` in a separate read-only script, and never guess an item id.

- Move, resize, retext: `moveBlock`, `resizeBlock`, `setText`. `setText` replaces plain text only and drops the font styling, so re-check the brand font after any retext. Moving a container moves its contents, so finalize containers before positioning what sits inside them.
- Restyle: `editBlockStyle` for fill and outline, `editLineStyle` for connectors. `strokeStyle` takes the full Lucid set, including the wider-gap patterns the broken treatment needs.
- Connect: `createLine`. Give each endpoint `{kind: "position", x, y}` coordinates offset 4px from the shape edge rather than `{kind: "block", ...}`, because a block endpoint attaches the line to the outline, which is exactly the gap this skill requires. Do not call `rerouteLines` on these connectors, since it reroutes around blocks and discards the hand-placed geometry.
- Delete: `deleteItem`. Deleting items is unrecoverable via the API.

`shape` on `createLine` and `editLineStyle` takes only `"elbow"`, `"curve"`, or `"diagonal"`, with no straight option. Pass `"elbow"` and give the endpoints coordinates that share an axis, which is the same discipline the Standard Import rules above impose. A turn is two `createLine` calls meeting at a shared corner, with the arrow on the second only. Never `"curve"`, and never `"diagonal"` on endpoints that do not share an axis. Set `shape` explicitly on every added line, since omitting it lets the canvas choose.

Endpoint caps go in `style` as `endpoint1` / `endpoint2` (or as `style` on each endpoint object), using human-readable, case-sensitive names rather than Standard Import's camelCase: `"Arrow"`, not `"arrow"`. Set `endpoint2: "Arrow"` and `endpoint1: "None"`, and take any other cap from the type list in the loaded documentation rather than guessing at a spelling. Pass `lineWidth: 2` and `lineColor: "#00ED64"`, because the canvas defaults are neither.

Run `validateCanvas` after the mutations, in the same script. It always reports `disconnectedEndpoint` and `orphanedBlock` for the deliberately gapped position-endpoint connectors. Those findings are expected, so do not repair them.
