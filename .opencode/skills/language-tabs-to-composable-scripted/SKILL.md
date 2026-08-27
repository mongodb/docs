---
name: language-tabs-to-composable-scripted
internal: true
description: 'Converts RST pages using language tabs to composable tutorial format. Script-first: uses analyze.py and convert.py for automation, with manual fallback steps for large pages and edge cases. Canonical reference — consolidates language-tabs-to-composable (monolithic) and language-tabs-to-composable-modular into one skill.'
argument-hint: '[filepath]'
---

Convert the RST page at $ARGUMENTS from language tabs to composable tutorial format.

Scripts are in `.claude/skills/language-tabs-to-composable-scripted/assets/`. Run all script commands from the repository root.

---

## Step 1: Run the analyzer

```bash
python .claude/skills/language-tabs-to-composable-scripted/assets/analyze.py \
  $ARGUMENTS
```

The script outputs JSON to stdout. Capture and parse the result.

---

## Step 2: Gate on stop reason

If `stop_reason` in the JSON is non-null, surface it to the user and stop. Do not attempt conversion. Common stop reasons:

- **File already converted** — has a `.. composable-tutorial::` directive
- **No tab directives** — nothing to convert
- **Unknown tab IDs** — update the mapping tables in analyze.py
- **Old YAML-format tabs** — convert to `.. tab::` / `:tabid:` RST format first
- **Ambiguous tab structure** — ask the user which case applies

---

## Step 3: Present the analysis

Format the JSON as a human-readable summary:

- **Case:** A (language-only) or B (interface + language), with a brief description
- **Tab blocks:** count and type of each directive
- **Tab IDs:** all tabids and their mapped composable IDs
- **Proposed composable header:**
  ```rst
  <proposed_header from JSON>
  ```
- **Composable scope:** line range from JSON (start → end)
- **Lines to remove:** line numbers and content
- **Substantial tabs** (would need extraction to includes): list tabids if any
- **Includes inside scope:** list `.. include::` directives found in scope

---

## Step 4: Tab ID mapping reference

Use this table to verify the analyzer's mappings. If a tabid is not in analyze.py's LANGUAGE_IDS or INTERFACE_IDS tables, update the script before continuing.

### Language IDs (Case A; and Case B for driver tabs)

| Tab `:tabid:` | Composable ID |
|---|---|
| python | python |
| nodejs, node, javascript, typescript | nodejs |
| java-sync, java | java-sync |
| java-async | java-async |
| csharp, dotnet | csharp |
| go | go |
| kotlin | kotlin |
| kotlin-coroutine | kotlin-coroutine |
| motor | motor |
| php | php |
| ruby | ruby |
| scala | scala |
| c | c |
| cpp | cpp |
| rust | rust |
| swift | swift |
| swift-sync | swift-sync |
| swift-async | swift-async |

### Interface IDs (Case B)

| Tab `:tabid:` (or section type) | Composable ID |
|---|---|
| shell, mongosh | shell or mongosh (project-dependent — verify in snooty.toml) |
| compass | compass |
| atlas-ui, ui, Atlas UI section | atlas-ui |
| atlas-cli, cli | atlas-cli |
| admin-api, api | atlas-admin-api |
| driver, drivers | driver |

**Important:** In Case B, `shell`/`mongosh` is an interface, not a language. It maps to `selections: shell, None` (or `mongosh, None` depending on the project's snooty.toml). In Case A (pure language-only pages), `shell`/`mongosh` is a language and maps to the `language-no-dependencies` ID `shell`.

**Atlas vs. Manual:** The Atlas Search snooty.toml uses `mongosh` as the interface ID for the shell. The database Manual uses `shell`. Always verify the actual ID in snooty.toml before applying.

### Deployment type IDs

| Tab `:tabid:` | Composable ID |
|---|---|
| atlas, cloud | atlas |
| local | local |
| self, self-managed, on-prem | self |

---

## Step 5: Check snooty.toml

Find the `snooty.toml` for the project (search upward from the target file's directory). Verify every composable ID in the proposed header is defined in `[[composables]]` sections:

- **Case A:** confirm `language-no-dependencies` exists and every needed language ID is in its `options`.
- **Case B:** confirm both `interface` and `language` composables exist. If only `interface-atlas-only` is defined, stop and ask the user.

Stop and report any missing IDs before proceeding.

---

## Step 6: Review and expand the composable scope

The analyzer's `composable_scope` covers only the first tab block to the last tab block. Before applying, check whether the scope needs to expand.

**Check: sections before the first tab block**

Read the file between the page top and the first tab block. If there are H2 or H3 section headings at document level before the first tab block, expand the scope start to include those headings — a document-level H2 outside the composable conflicts with any H2 inside it and triggers a "Section Hierarchy Must Be Linear" error. On multi-section pages, move the scope start to before the first H2 that introduces language-differentiated content.

**Check: sections after the last tab block**

Any RST section headings at document level after the composable block will not render correctly. All trailing content — including "Learn More", "Additional Resources", and "See Also" sections — must be inside the composable as shared content.

Expand the scope end to include all trailing sections.

---

## Step 7: Identify special elements

Before running the converter, scan for these elements and note any required manual handling:

**Standalone interface sections:** Is there a section outside the tab blocks that presents content for a specific interface (e.g., an "Atlas UI" procedure section at the bottom of the page)? If so, that section must be pulled into the composable as a `.. selected-content::` block with the appropriate interface selection. Remove the standalone section heading and move its content inside the composable.

**Content-variant tabs:** Does the file contain `.. tabs::` blocks with tabids that are NOT language or interface IDs (e.g., edgeGram/nGram/rightEdgeGram, "Visual Editor"/"JSON Editor", tokenization strategies)? These are content-variant tabs, not language-selection tabs. Do NOT convert them to `.. selected-content::` blocks.

A `.. tabs::` directive is only legal inside the composable if it is nested inside a `.. selected-content::` block. Choose a remediation based on where the content-variant tab sits:

- **Already inside a `.. selected-content::` block** → leave it as-is; it passes through unchanged.
- **At document level inside the composable scope** (not nested in a `.. selected-content::` block) → the composable cannot contain a bare `.. tabs::`. Remediate one of two ways, matching the page's existing patterns:
  - **Flatten to sequential sections** — replace each tab with an H3/H4 section heading and its content. Preferred when the variants are short and reading them in sequence is acceptable.
  - **Convert to a `.. collapsible::` block** — one collapsible per variant. Preferred when the variants are long and the reader only needs one at a time.

Confirm the chosen remediation with the user before applying. Do NOT use `.. rubric::`.

**Substitution definitions:** Lines like `.. |arrow| unicode:: U+27A4` or `.. |name| replace:: text` must remain at document level, OUTSIDE the composable block. If the analyzer's scope includes a substitution definition, plan to move it to just before the composable start.

**Lines to remove entirely (no replacement):**

- `.. tabs-selector::` (any variant)
- `.. include:: /includes/tutorials/language-id.rst`
- `.. include:: /includes/select-your-language.rst`
- `.. include:: /includes/language-selector-instructions.rst`
- `.. include:: /includes/language-or-shell-selector-instructions.rst`
- Deprecated `.. see::` / `.. see also::` blocks used only to show "Complete Code" driver tab links
- Decorative `----------` separator lines that were used as visual dividers around the old tabs-selector UI (typically found immediately before and after the `.. tabs-selector::` line)

---

## Step 8: Check includes for nested tabs

The analyzer lists include *directives* in `includes_in_scope` but does NOT read include file *contents*. You must open each referenced include yourself — nested tabs inside an include will otherwise slip through and produce illegal `.. tabs::` directives inside the composable.

For each entry in `includes_in_scope`, read the referenced include file and check whether it contains `.. tabs::`, `.. tabs-drivers::`, or `.. tabs-selector::` directives.

**If nested language/interface selection tabs are found:** First, check whether the include file is shared with other pages:

```bash
grep -r "<include-filename>" content/<project>/source/
```

- **Include is used only by this page** → inline its content directly as `.. selected-content::` blocks (see below). The original include file is not modified — other pages (if any) are unaffected because no other pages reference it.
- **Include is shared with other pages** → do NOT modify the original include file or inline it directly. Instead, create a page-specific copy of the include under the page's own includes directory, convert the tabs in that copy, and update the `.. include::` directive in the target file to point to the new copy. Confirm the path with the user before creating the file.

When inlining (include is used only by this page), convert as follows:

- Preamble prose or shared content → 3-space indent as shared content before the `.. selected-content::` blocks
- Each tab → one `.. selected-content::` block with the appropriate `:selections:` value
- Tab content (originally at 6-space indent inside `.. tab::`) maps to 6-space indent inside `.. selected-content::`
- Two `.. tabs-drivers::` blocks in the include → two sets of `.. selected-content::` blocks; place any shared content between them at 3-space indent

Confirm with the user before inlining or creating page-specific copies. After inlining, remove the original `.. include::` directive.

**If the include contains only content-variant tabs** (e.g., edgeGram vs nGram tokenization examples) that are already inside a `.. selected-content::` block, keep the include as-is.

---

## Step 9: Handle substantial inline content

If `substantial_tabs` is non-empty, those tabs contain multi-section inline content that should be extracted to includes files before the conversion runs.

Propose extraction paths following naming patterns in the project's `source/includes/` directory:

> The following tabs have substantial inline content. I propose extracting each to an includes file:
>
> - `<tabid>` → `/includes/<dir>/<tabid>-<topic>.rst`
>
> Does this look right, or would you like different paths?

Do not extract without explicit user confirmation. After the user confirms paths:

1. For each tab to extract, read its content from the source file.
2. Write the tab content to the confirmed include file path. The content should start at column 0 (no leading indent — the `.. include::` directive that references it will be indented by the caller).
3. In the source file, replace the extracted tab content with an `.. include::` directive at the same indent level the tab content occupied (typically 6-space indent inside a `.. tab::` block).
4. Re-run the analyzer on the updated file before proceeding.

---

## Step 10: Confirm with the user

Before running the converter, show a comprehensive summary of all planned changes:

1. **Lines to remove** (content and line numbers)
2. **Composable scope** (adjusted start and end lines after Step 6)
3. **Composable header** that will be inserted
4. **Special elements** identified in Step 7 (standalone sections to pull in, substitution definitions to move, content-variant tabs to preserve as-is)
5. **Includes** to be inlined (Step 8)
6. **Includes** to be extracted (Step 9)

Ask for explicit confirmation before proceeding.

---

## Step 11: Run the dry run

After user confirms, show the diff first:

```bash
python .claude/skills/language-tabs-to-composable-scripted/assets/convert.py \
  $ARGUMENTS
```

Default mode outputs a unified diff without modifying the file. Share key diff sections with the user and ask whether to apply.

The converter validates the generated `:options:`, `:defaults:`, and `:selections:` lines: every `:defaults:` and `:selections:` line must have the same number of comma-separated values as `:options:`, and the first value cannot be `None`. In dry-run mode, validation errors print to stderr as warnings. In `--apply` mode, the script refuses to write the file (exit code 2) until the counts match. If you see these errors, the page likely over-generates option slots (one per tab attribute) and needs option dimensions collapsed by hand — see "Known script limitations."

---

## Step 12: Apply the conversion

After the user approves the diff:

```bash
python .claude/skills/language-tabs-to-composable-scripted/assets/convert.py \
  --apply $ARGUMENTS
```

The script modifies the file in place and prints a summary.

---

## Step 13: Post-conversion manual fixes

After applying, read the converted file and make any manual fixes the script cannot handle automatically:

**Scope expansion:** If the scope was expanded in Step 6 (sections before the first tab block or after the last tab block), apply those changes by hand. Add 3-space indent to the newly-in-scope content.

**Substitution definitions:** If any `.. |name|` definition ended up inside the composable block (the script may have indented it), move it back to document level, just before the `.. composable-tutorial::` line.

**Standalone sections:** If Step 7 identified standalone interface sections to pull into the composable, do that now. Remove the standalone section heading and move its content inside the composable as a `.. selected-content::` block with the appropriate `:selections:` value.

**Heading conflicts:** Check for section headings inside the composable that conflict with document-level headings outside the composable at the same heading level. The fix:

1. Add 3-space indent to every line of the conflicting document-level section (heading, underline, prose, and any directives inside it).
2. Remove it from its document-level position.
3. Insert the indented block at the top of the composable (before any `.. selected-content::` blocks).

Do not use `.. rubric::` — it is not supported in Snooty.

**Trailing content:** Confirm that nothing remains at document level after the composable block. Any trailing content (headings, paragraphs) must be inside the composable as shared content at 3-space indent.

**Indentation breakage from the 3-space shift:** The converter adds 3-space indent to every shared-content line inside the composable scope. This reliably breaks a few RST structures that need hand-correction:

- **`list-table` columns** — column markers (`* -`) and their continuation lines can fall out of alignment, causing "Expected N columns, saw 1" or "Unexpected indentation" errors. Re-align every row so cells share a consistent indent.
- **Bullet and definition-list continuations** — wrapped continuation lines (for example, a `:ref:` that spilled to a second line) must stay aligned with the text of their list item, not the marker.
- **Nested code-blocks** — a `.. code-block::` nested under a bullet or step can end up indented too deep; verify its body is indented exactly 3 spaces past the directive.
- **Directives left at a stray indent** — a passed-through directive (for example, a content-variant `.. tabs::`) may keep an old indent that no longer matches its new context.

After fixing, run the local build check to confirm the parser accepts the re-indented blocks.

**Extra blank lines:** Collapse sequences of more than two consecutive blank lines.

**Procedure steps:** If the page has `.. procedure::` blocks that mix shared and language-specific steps, split them:

- Steps identical across all languages → shared content inside the composable, outside any `.. selected-content::` block
- Steps that differ by language → inside per-language `.. selected-content::` blocks

---

## Step 14: Verify the output

Read the edited file and confirm:

- All redundant selector lines are gone.
- The `.. composable-tutorial::` block is present with correct `:options:` and `:defaults:`.
- Every original tab (and any pulled-in standalone section) has a corresponding `.. selected-content::` block.
- The number of `:selections:` values matches the number of `:options:` values for every block.
- Content outside the composable scope is intact and byte-for-byte identical to the original.
- No content was invented or omitted.
- No RST section headings appear at document level after the composable.
- No substitution definitions appear inside the composable.
- No old-format include files were orphaned. If the conversion replaced or inlined nested tabs from an include, grep for the old include path and delete any include that is no longer referenced by any page.
- No filenames have a doubled extension (for example, `...atlas-api.rst.rst`) introduced during extraction.

Report the final summary of changes to the user.

---

## Large pages and structural edge cases

The script handles pages of any size — follow Steps 1–14. For rare structural edge cases the script cannot handle (custom ID mappings, multiple independent composable blocks), write a page-specific script following [assets/large-pages.md](assets/large-pages.md).

---

## Known script limitations

- **Old YAML-format tabs** (`tabs:` / `- id:` syntax) are not supported by analyze.py. Convert to `.. tab::` / `:tabid:` format first.
- **Option over-generation and dead states** — the analyzer proposes one option slot per tab attribute, which on multi-attribute pages can exceed the composable's options or create unresolvable "dead state" `:selections:`. The converter's count validation (Step 11) blocks `--apply` when this happens. Fix by collapsing redundant dimensions into one combined ID (for example, `v7-rpm`, `v7-tar`) and rewriting the affected `:selections:` lines, then re-run.
- **Titled `.. tab::` children are not parsed as language tabs** — the analyzer only recognizes argument-less `.. tab::` children (with a separate `:tabid:`). A `.. tabs::` block whose children use the title-argument form (`.. tab:: Some Title`) — typical of content-variant tabs like `movies Collection` or `Ascending Sort` — is reported with an empty `tabs` list. The converter does NOT delete these blocks: it passes them through as shared content and prints a note listing their line numbers. Because a bare `.. tabs::` is illegal at document level inside a composable, you must still remediate each one by hand (flatten to sections or `.. collapsible::`; see Step 7). Never `--apply` blindly on a page with pass-through blocks without checking those locations.
- **Case B default** — when a Case B page has only interface tabs (no driver language tabs), `analyze.py` proposes `:defaults: driver, nodejs`. That is wrong. Correct it in Step 5 to `:defaults: <first-interface-id>, None` (e.g., `:defaults: atlas-ui, None`).
- **Interface ID for shell** — the script maps `shell` tabids to `shell` regardless of project. Atlas uses `mongosh`. Step 5 (snooty.toml check) will surface this; correct the `:selections:` values after applying.
- **Scope boundaries** — the script's `composable_scope` covers only the first to last tab block. Expand manually (Step 6).
- **Substitution definitions** — the script may indent these into the composable. Move to document level (Step 13).
- **Heading conflicts** — not resolved automatically. Fix by hand (Step 13).
- **Extra blank lines** — may appear after removing selector lines. Collapse sequences > 2 blank lines (Step 13).

---

## Rules and constraints

- One `.. composable-tutorial::` per file.
- Maximum 4 options in `:options:`.
- The number of `:selections:` values must equal the number of `:options:` values. Use `None` for inapplicable slots.
- In Case B, language entries require `driver` in the interface slot. Non-driver interfaces use `None` in the language slot.
- The first `:selections:` value cannot be `None`.
- Composable option order: deployment-type → interface → language.
- Do not invent composable IDs. Use only IDs confirmed in snooty.toml.
- Do not modify content beyond what the script produces and the manual fixes listed in Step 13.
- Do not backport the conversion unless the user explicitly asks.
- **Never strip trailing whitespace.** Preserve every trailing space exactly as it appears in the original. Only change lines that are structurally part of the conversion.
- Never use `.. rubric::` — it is not supported in Snooty.

The following are enforced by the steps above; a violation breaks the build:

- No document-level section headings conflict with headings inside the composable, and none appear after the composable block (Steps 6, 13).
- Substitution definitions stay at document level (Steps 7, 13).
- Include files inside the composable contain no `.. tabs::`, `.. tabs-drivers::`, or `.. tabs-selector::` selection directives (Step 8).
