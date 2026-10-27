---
name: lucid-diagram
internal: true
description: "Create MongoDB architecture diagrams in Lucidchart via the Lucid MCP — sharded clusters, replica sets, Atlas topologies, data flows, connection architectures — using official MongoDB brand icons from the repo icon catalog (diagram-icons.csv). Use when the user asks to create, build, update, or revamp a diagram in Lucid or Lucidchart, wants a MongoDB architecture or topology diagram, or provides a Mermaid draft to render in Lucid."
---

# Lucid Diagrams

Build MongoDB architecture diagrams in Lucidchart through the Lucid MCP server, using official MongoDB brand icons from the repo icon catalog. The writer describes the diagram in a sentence; the skill produces a fully-editable diagram in Lucidchart with MongoDB icons, shapes, and connectors.

## Prerequisites

- The Lucid MCP server connected (tools named `mcp__lucid__*`). Step 1 checks for it and, when it is absent, treats the run as first-time setup.
- A Lucid license on the writer's MongoDB account, requested through Lumos, and the four brand fonts uploaded to that account. Neither gates authoring; both are handled at handover — step 12.
- The icon catalog at repo root `diagram-icons.csv` (one row per icon: name, description, aliases, asset_key, cdn_url, verified, native_size). Refreshing it is maintenance, not part of a diagram run — step 13.

## Workflow

1. Check for the Lucid MCP server before anything else. If `mcp__lucid__lucid_create_diagram_from_specification` is not available, this is first-time setup rather than a failure, so say that: the setup is short and one-time. Give the four numbered steps below in full, assuming no prior MCP experience — a writer who has never added an MCP server does not know that `claude mcp add` is a shell command rather than something typed into the chat. There is no fallback while the tools are missing: Mermaid, an ASCII sketch, or a JSON spec with nowhere to send it are not this skill's output, so do not offer one as a consolation.
   1. **In a terminal** — a new Terminal window or tab, at a shell prompt, not in this chat — run `claude mcp add --transport http lucid https://mcp.lucid.app/mcp`. To stay in the session instead, type the same command into the chat box with a leading exclamation mark, which is what sends it to the shell: `!claude mcp add --transport http lucid https://mcp.lucid.app/mcp`. Either way it prints a line confirming the server was added. Nothing is installed — the server is remote.
   2. **In this chat**, type `/mcp` and press Enter. A list of configured MCP servers appears; choose **lucid**, then choose **Authenticate**.
   3. **In the browser tab that opens**, approve **both** prompts. The first authorizes the client, the second signs in to Lucid through MongoDB SSO. Both are required, and stopping after the first leaves the server listed but unusable.
   4. **Back in this chat**, run `/mcp` once more and confirm `lucid` reads as connected, then send the diagram request again. Everything from here is automatic.
   - For an editor other than Claude Code, the same URL goes wherever that tool registers remote MCP servers, over streamable HTTP.
   - **Once the tools do resolve, stage the brand font files** in that same pass, before authoring anything, so the font upload in step 12 is a drag-and-drop rather than a download hunt. Fetch the four files to `~/Downloads` per references/catalog.md ("Brand fonts") — one public CDN request, no credentials. Skip the fetch when all four are already there, do it silently, and never narrate where the files came from.
2. Gate second: a diagram earns its place for complex processes, architecture/configuration relationships, or complex MongoDB workflows — not for simple UI workflows or content with no MongoDB interaction. If the request doesn't clear that bar, say so and offer text instead.
   - A revamp is a re-style, not a redesign. When the request is to revamp, rebrand, or redo an existing diagram, inventory the original first — every label, every component, every relationship — and carry all of it into the new diagram. Read the original image or source file and list what it holds before authoring; do not work from the page's prose or from memory of what the diagram probably showed. Dropping, merging, renaming, or approximating anything the original stated requires the writer to have asked for it. What changes is the shapes, palette, type, icons, and layout — the content is fixed. If a component has no catalog icon or no clean shape, step 7's fallbacks apply; it still appears.
3. Load tool schemas with ToolSearch: `mcp__lucid__lucid_create_diagram_from_specification`, `mcp__lucid__lucid_validate_diagram_specification`, `mcp__lucid__get_mcp_resource`, `mcp__lucid__search`, `mcp__lucid__fetch`, `mcp__lucid__lucid_get_document_metadata`, `mcp__lucid__lucid_export_document_as_PNG`.
4. Read the resource `lucid://skills/diagram-specification` via `mcp__lucid__get_mcp_resource`. This is a hard prerequisite for the creation tool and defines the JSON shape registry, endpoint format, and geometry rules. Read it every time; do not author from memory.
5. Author on the light canvas, White #ffffff. Do not ask which canvas and do not offer a dark one: the brand icons exist in a light form only, so decline a dark request with that reason — see references/style-guide.md §5.
6. Pick the diagram type (deployment/topology, reference architecture, data flow, process/sequence, data model, conceptual) and its layout direction, and apply the style rules below — mandatory; references/style-guide.md has the full set.
7. Select icons from the catalog on disk. A diagram run reads the catalog and never refreshes it — refreshing is maintenance with its own trigger (step 13) — and says nothing to the writer about where the assets come from.
   - Grep the catalog for the concepts in the request (e.g. `grep -i shard diagram-icons.csv`), preferring rows with `verified=viewed`. For a `name-only` row whose description is load-bearing, view the image (curl + Read) before choosing.
   - Where no row names the concept, pick the nearest icon the catalog does hold rather than leaving the component bare: Search for Vector Search, MongoDB Server for a replica set member, Cloud for a provider region. The catalog holds no row for Primary/Secondary Node, Vector Search, Compass, Shell, Atlas CLI, Triggers, or Serverless.
   - Type the label as plain text only when nothing in the catalog is reasonably close, and never reach outside the catalog for an icon.
   - A row carrying no `native_size` cannot be sized without measuring the asset. Fetch and measure that one asset (references/catalog.md, "Native dimensions"); do not refresh the whole catalog to fix one row.
8. Author the Standard Import JSON per references/diagram-authoring.md, then validate with `mcp__lucid__lucid_validate_diagram_specification`. Fix every error; warnings are advisory but fix the cheap ones (container padding, duplicate labels, label collisions). Expect a `shape-clearance` warning per icon-caption pair, which sits inside the check's 60px threshold by design; connected pairs clear it at the 88px gutter, so a clearance finding there is a real layout problem.
9. Create with `mcp__lucid__lucid_create_diagram_from_specification`, always passing `use_assisted_layout: false` — assisted layout re-flows on every added item and has scrambled manually placed shapes inside containers.
10. Verify the render before handing anything over: export the page with `mcp__lucid__lucid_export_document_as_PNG` and look at it. Two failures are silent and invisible in the creation response, and the picture is the only check for either. Do not check fonts — neither here nor at handover.
   - A cropped icon means its box disagrees with the asset's aspect ratio. Re-derive the box from `native_size` and re-create.
   - A label crossing or hanging below its box means the box was sized for fewer lines than the text renders. Shorten the text or grow the box per the sizing rule below, then re-create.
   - Once the render is clean, the next message is the handover, and it holds two things: the edit URL and the housekeeping block. Write it per step 11 before anything else occurs to you.
11. Close with the link and the housekeeping block — nothing else.
   - The edit URL goes in as literal text: `https://lucid.app/lucidchart/<documentId>/edit`. One link, and it is the editable one. Never give the view URL, with or alongside it: two links read as a decision, and there is nothing to decide.
   - Do not describe the diagram, report preflight findings or checks you ran, or explain your shape, palette, or layout choices. The only exception is a failure that left no document — then report the failure, since there is no link to give.
   - This step overrides the repo's CLAUDE.md "Definition of Done" for this one message, and CLAUDE.md carries the matching exemption. A diagram handover is not a completion summary: its change-summary and commit-confirmation bullets do not apply, so no account of which files you did and did not touch and no question about committing.
   - A request naming a docs page ("revamp the diagram on this page") does not change the handover. Author the diagram, hand over the link and the block, and stop; the image swap and the PR are a separate turn that starts when the writer replies. Do not treat the pending repo work as unfinished business to report on, and do not pre-emptively offer to make the swap — the block's third and fourth bullets are the only offers.
   - Housekeeping. The first handover of a session carries this block verbatim — all four bullets, this wording, nothing added and nothing dropped:

     ```
     Housekeeping:
     - Add the new MongoDB fonts to Lucid (if you haven't already). This must be done through the Lucid UI, which I cannot access, but I've already downloaded the required fonts for you. Click a text box in your diagram. Click the font dropdown, then click "Manage fonts." Move the font files I saved to your Downloads into Lucid. Your diagram should then pick them up automatically.
     - Move diagrams into Lucid's Technical Documentation Team space so future writers can find and update your diagram. To do so, click the hamburger icon at the top of your Lucid diagram, then click File > Move to... > Teams > Technical Documentation Team > Cloud, Drivers, Server, etc.
     - Want changes to any color, shape, font, layout, or icon? Just ask! I can edit the diagram for you or provide branding guidance.
     - Lastly, export your diagram as an SVG from the Lucid editor. Click Export > SVG  (not "SVG with transparent background"). I can then create a PR for you. Just say the word.
     ```

     On a later handover in the same session, drop only the bullets the writer has already acted on and keep the rest word for word. Never reword a retained bullet, never expand one with the folder list or the repair steps, and never append a separate offer to adjust — the third bullet is that offer.
   - Do not critique the diagram, list changes you would make, or ask the writer to choose among options. If they take the third bullet up, a local change (a fill, a stroke, a label, a font) goes through `lucid_run_script` with the `basecanvasediting` API per references/diagram-authoring.md ("Editing existing documents"), and anything structural (layout, a shape class, a different icon) is a re-author of the JSON. Every change stays inside the style rules below: decline a request that would break one, name the rule, and offer the nearest compliant alternative.
   - The detail the block omits is yours to supply when the writer takes a bullet up: when the writer sends the SVG, repair and validate it per references/diagram-authoring.md ("Repairing the SVG export") before committing it, recording the diagram source in the PR description.
   - Getting the URL: the creation response sometimes renders as a widget with no readable URL text, so never say the link is "in the card above" and never tell the writer to find the document on their Lucid home. Call `mcp__lucid__lucid_get_document_metadata` with the document id and take `editUrl` from the JSON. If the id is also unreadable, `mcp__lucid__search` with the title and `owned_by_me: true` returns it — check `lastModified`, since repeated attempts leave same-titled documents behind.
12. Handle the two access problems that only surface once the writer opens the link. Neither is visible to you — the MCP creates the document on an unlicensed account exactly as it does on a licensed one — so raise them at handover rather than diagnosing them. The housekeeping block's first bullet is the font hand-off; the walkthrough below is for a writer who needs more than that bullet.
   - **No license.** A writer whose MongoDB account has no Lucid license opens the edit link and cannot change anything. One route, verified end to end — do not offer a free trial or any other workaround alongside it.
     1. Go to `https://lucid.app/` and sign in with the MongoDB account. An unlicensed account lands on a page directing the writer to request access through Lumos; follow it, and for the reason field use: "Requesting access for creating architecture diagrams for MongoDB docs."
     2. Back in Lumos, select the button for unlocking full access (labeled something close to **Unlock Full Access**) and complete the wizard it opens.
     3. Reload the edit link. The document is editable, and the fonts below are the only remaining step.
   - **Fonts not in the account.** Custom fonts are per-account, so a newly licensed account has none of the four and the diagram renders in a non-brand sans. Step 1 already put the files on disk, so this is four drags, once per account: open `~/Downloads` in Finder — `SohneMono-Medium.ttf`, `Sohne-Regular.ttf`, `SohneCondensed-Bold.ttf`, `MongoDBValueSerif-Regular.otf`. In the Lucid editor, open the toolbar font dropdown, choose **Manage fonts**, then **Install fonts**, and add all four. Reload the document; the labels pick up the brand faces with no re-authoring. If the files are not on disk, stage them per references/catalog.md ("Brand fonts") first.
13. Catalog refresh — maintenance, never part of a diagram run. Do it only when the writer explicitly asks for the latest icons or for the catalog to be updated, following references/catalog.md ("Checking for new icons" and "Regenerating the catalog"): it needs a per-user API key, it costs a paginated harvest, and it commits a changed `diagram-icons.csv`. Do not volunteer it and do not run it because a concept had no icon.

## Style rules (enforce every diagram)

The binding constants, stated without their reasoning. references/style-guide.md carries the measurements and failures behind them and is the authority on anything these lines leave out — load it before authoring, as step 6 requires.

### Palette and fills

- Cap 6 colors per diagram, and no hex outside these eleven: White #ffffff (the canvas), Slate #001E2B (text, strokes, borders), Evergreen #023430 (MongoDB fills, Off White text), Spring Green #00ED64 (connectors, the emphasis fill and its circle, the foundation container, the grouping label), Chartreuse #B1FF05 and Off White #FAFBFC (component fills, and either as an emphasis fill among sibling tiles); secondaries Deep Orange #FF4F00 and Cosmic Pink/Pink #D959EA accent-only, Chrome Yellow #FFAD00, Purple #765CF8, and Sky #00C2EB as lane accents.
- Surfaces carry no hue and containers carry no fill; MongoDB-owned vs customer-owned is told apart by icon and label. One solid fill per diagram, meaning emphasis, with Slate text. The Evergreen MongoDB component, the grouping label, and the foundation container stand outside that budget, and a circled component's circle and fill are one spend.

### Typography

- Four authored font values, verbatim, in ASCII, unquoted, and without the weight word: `Sohne Mono` for all diagram text (labels, captions, strong text, code, eyebrows), `Sohne` for a label's second line, `MongoDB Value Serif` for a subheadline, `Sohne Condensed` for a headline. `Sohne Mono Medium` and `Söhne` fall back silently. Never `<b>` or `<i>`. `Sohne Medium` is not installed.
- A family that is not uploaded to the account does not fall back for its own run — it drops the **whole text block** to Inter, so one unresolved `Sohne` on a second line costs the first line's `Sohne Mono` as well (measured Oct 2026). Until all four are uploaded, author every run `Sohne Mono` and accept Mono second lines; re-add `Sohne` to those runs once the upload in step 12 is done.
- All label and caption text is uppercase, connector labels and notes included, uppercased in the text itself rather than by CSS transform. Two exceptions: literal code keeps its real casing, and a label's second line is sentence case. Shorten before you uppercase.
- `mongod` is always lowercase and always in the code font `Sohne Mono`, with no exceptions — "MONGOD" is a defect wherever it appears, label, caption, connector label, or note. Where it sits in a second line, which is otherwise `Sohne`, author it as its own run. Same for `mongos`, `mongosh`, and any other literal process or command name.
- Author sizes in px, never below 28px, and never rewrite a px value as pt (Lucid converts at pt ≈ px × 0.45, so a compliant 28px reads about 13pt in the editor and `28pt` is 2.2× too large).
- Size every box from its text on both axes at authoring time; Lucid never grows a shape to fit a label. Width floor is `0.5 × font-size × characters + 40px` measured on the longest line — 14px per character at the 28px floor, 16px at 32px — and height floor is 68px per rendered line. Count rendered lines rather than authored runs: a box given one line's height whose text wraps to two puts the second line outside the box, which is the overrun to look for in the step 10 PNG. Shorten the text first, then widen the box, which carries no size ceiling.
- Two lines maximum, the second never larger than the first, authored as separate `<p>` runs so each carries its own `font-family`; a `<br>` inside one run puts both lines on one family. Separate runs isolate the family, not the fallback — an unresolved family on either run takes both lines to Inter.

### Shapes

- Spine components, one shape/fill/label each: User (#FAFBFC, #001E2B border), Application (#FAFBFC, #001E2B border), MongoDB Atlas (#023430, #FAFBFC text), Collection (#FAFBFC, #001E2B border).
- The rectangle is the default component shape. The three non-glyph spine components are Standard Import type `process`, holding one width and one height across all three. No pill approximations, no offset shadow rectangle behind a component.
- Grouping label: a rectangle, always Spring Green #00ED64 with a matching #00ED64 stroke, since omitting `stroke` leaves Lucid's black default outline. Use it for every grouping — zones, regions, AZs, tiers — never plain text, never a container's own `containerTitle`, never `terminator`.
- The circle is the emphasis shape and nothing else: at most one per diagram, carrying the single #00ED64 emphasis fill with Slate text, and most diagrams need none. Standard Import type `circle` with a square bounding box, since an oblong box renders an ellipse; size the diameter from the contents, because only the inscribed square is usable, about 70% of the diameter. Not `circleContainer`, which takes no text.
- Canonical naming: "MongoDB Atlas" first use then "Atlas"; `mongod`; "Atlas Vector Search"; "Atlas Search"; "Replica set"; "Application" (not Client/App/SDK); "User" (not Customer). One name per concept per diagram.

### Icons and labels

- Icons always get captions, authored with their **long edge** at 128–150px against the 150px cap, the same long-edge value on every icon in the diagram, and never an external icon — on a missing concept, follow step 7. No spot illustrations. A diagram whose icons will not fit at 128px has too many components; split it.
- Shape each icon's box to the asset's own aspect ratio from the catalog's `native_size`: scale the native dimensions so the long edge hits that value, then derive the short edge. Lucid fills an `image` box rather than letterboxing it, so a mismatched box crops the glyph, and only 19 of 67 assets are square. No preflight rule catches the crop; the PNG look in step 10 is the only check. Equalizing the short edges is the crop.
- Label text is #001E2B, except on an Evergreen fill, where it is #FAFBFC. Connector labels a few words at most — long explanations go in a note shape — and a labeled connector gets a run sized from its label rather than the 88px gutter (style guide §6 has the formula).
- Text never overlaps a shape edge or a connector, and a small overlap is as much a defect as a large one. Cut the text to the 3-word / 20-character target first, then grow the shape, which carries no size ceiling. Where the run is genuinely long and the space narrow, set the text sideways — a separate text block rotated 90°, beside the connector rather than on it. Never shrink type below the 28px floor.

### Connectors

- Solid = data path, dashed = control plane/metadata (always labeled, so always a longer run), dotted = a routing path that should recede, broken = severed path. Spring Green #00ED64 at stroke width 2, except a dotted recede-path, which takes Slate #001E2B, and a connector inside a lane, which takes that lane's accent. Never hue alone.
- One small solid arrowhead at the destination and nothing at the source: `style: "arrow"` on `endpoint2`, `"none"` on `endpoint1`. The head has no size property and scales only with stroke width, so connector length is the only lever on its proportion. A bidirectional relationship is two one-way connectors about 7px apart, each with its own head — never one double-headed line, and never a filled-dot terminator.
- Connectors never touch a component, and their length sets the gutter: terminate at a `positionEndpoint` 4px off the shape edge, not a `shapeEndpoint`, and make the run 80px, since 4 + 80 + 4 is the 88px gutter. Never shorter than 72px. The cost is that a free endpoint tracks nothing, so later moves in the editor leave the line behind.
- Connectors are orthogonal without exception: every segment horizontal or vertical, `lineType: "straight"` with both pinned endpoints sharing one coordinate. Never `"curved"`, never `"elbow"`. Place shapes on shared rows and columns so paths stay on-axis.
- A connector meets its destination perpendicular to that border — horizontal into a left or right edge, vertical into a top or bottom edge. A line running alongside a border and stopping against it is a defect. Pair facing edges so the whole connector is one perpendicular segment.
- Where the path must turn, author two straight segments meeting at a shared corner coordinate: the riser with `"none"` at both ends, the approach carrying the single `"arrow"`. One `"elbow"` line hands the corner to Lucid's router, measured arriving on the wrong axis, and the preflight skips elbow paths so nothing reports it. Recipe in references/diagram-authoring.md.
- Stroke weight is two values and no more: 2px on connectors, 1px on component outlines and containers, each held constant. Lucid's stroke number equals exported px 1:1, so never author a weight in pt.

### Containers and canvas

- Containers: transparent, 1px #001E2B border at every nesting level (#00ED64 instead when the containers are a row of category tiles rather than architecture), up to three levels deep, generous interior white space, resize freely but never recolor. A dotted border marks a logical boundary rather than a physical container. Use a container, not a line style, for network grouping.
- A foundation layer is its own container: a full-width solid Spring Green #00ED64 rectangle with Slate text, below the stack it supports with the standard gutter between them. Not a thin base band flush with a container's bottom edge.
- Gutters come from the connector: 88px minimum where a connector runs, more where it carries a label, about 12px between siblings with nothing between them, and the same value on both axes.
- Canvas: White #ffffff, the only canvas until a dark icon set ships; left-to-right and top-to-bottom flow; aspect ratio 1.3–2.0 (default 16:9, hard cap 3:1), intrinsic width 1200–1600px, ≤8 component classes (propose overview + detail diagrams past that), ~15 labeled shapes max.

## Hard gotchas (not covered by the style rules above)

- Do NOT use `lucid_create_diagram_from_mermaid`. It returns HTTP 500 from Lucid's side even on trivial input. Always build Standard Import JSON, even when the user supplies Mermaid — translate the Mermaid instead of passing it through.
- Duplicate labels on mirrored connectors (two connectors from the same source with the same text) read as garbled in Lucid's preflight. Label one and leave the twin unlabeled, or stagger label positions.
- A `shapeEndpoint`'s relative `position` goes on BOTH endpoints or NEITHER; one-sided fails the import with a bare 400. Every `positionEndpoint` needs its own absolute `position`.
- Icons are `image` blocks: pictures, not vector shapes. They cannot be recolored to match a theme. Brand icon URLs come from the catalog; never guess a URL.

## Routing

- Diagram types, when to diagram, spine canonicals, naming, palette, icon/label brand rules, and canvas budget: references/style-guide.md — load before authoring
- Catalog columns, icon selection rules, measuring an asset's native size, staging the brand fonts, and the catalog refresh that step 13 runs: references/catalog.md
- Standard Import JSON authoring details (shape types, endpoint styles, text formatting, container and label geometry rules) and a validated worked example: references/diagram-authoring.md

Do not use this skill for sequence diagrams or ERDs where a dedicated Lucid tool exists (`lucid_create_sequence_diagram`, `lucid_create_erd`) unless the user wants the brand-icon treatment; do not use it to edit documents after creation except via `lucid_run_script` with the `basecanvasediting` API.
