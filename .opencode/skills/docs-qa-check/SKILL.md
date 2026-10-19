---
name: docs-qa-check
description: |
  Tests whether draft feature documentation answers human-written comprehension questions, using separate answering and grading subagents. Requires a human-written Q&A file (question + expected answer pairs); it does not generate its own questions. Use when a writer wants to sanity-check a draft before it ships — "test my docs", "check if this page answers X", "run the QA check", "validate feature docs". Do NOT trigger for SEO issues (use fix-seo), broken links (fix-404s), RST build errors (local-build-check), factual drift against source code (docs-drift), or general style review.
---

# Docs QA Check

Tests whether a reader — with no outside knowledge beyond the pages a ticket touches — can correctly answer specific questions about a new feature, using only what the documentation actually says.

## When NOT to use

- The changes are entirely in `platform/` or `code-example-tests/` — nothing in those folders ever appears on a rendered `content/` page, which is all this skill evaluates.
- The writer wants a general content review, SEO check, or link check with no specific comprehension questions in mind — point them to `fix-seo`, `fix-404s`, or a plain read-through instead.

## Example interaction

See [references/example-interaction.md](references/example-interaction.md) for a complete worked run — the questions-paste flow, the confirmation step, and the report a writer sees.

## Layout

This skill reads and writes a per-repo, gitignored directory, mirroring the pattern used by `local-build-check`:

```
.claude/qa-validation/
└── DOCSP-XXXXX.yaml   # one file per ticket
```

Gitignored by default. A writer may promote a specific file to be shared with the team via a `.gitignore` exception, the same way `local-build-check` allows promoting `knowledge.md` — mention this only if a writer says they want to share a Q&A set, not on every run.

Q&A file schema:

```yaml
ticket: DOCSP-XXXXX
questions:
  - question: "What is the default value of the new setting?"
    expected_answer: "Off by default for deployments auto-upgrading from 8.3; on by default for new deployments and upgrades from 8.0."
  - question: "..."
    expected_answer: "..."
```

## Step 0: Determine ticket and page scope

Identify the ticket from the current branch name (e.g. `DOCSP-62564-...`) or ask the writer if it can't be inferred. Determine the changed set the same way `local-build-check` scopes its diff: `git diff --name-only origin/main...HEAD -- 'content/**'` plus `git diff --name-only HEAD -- 'content/**'` plus untracked files under `content/**`, deduplicated. Split the changed set in two:

- **Pages** — renderable `.txt` sources. The page set — not a single file — is the isolation boundary for every question in this run, since pages touched by the same ticket are assumed to be part of the same feature and a real reader could reasonably cross-reference between them.
- **Source material** — every other changed file under `content/`: include files and generated snippet files under `content/code-examples/tested/`. These reach readers only through the pages that render them and are never snooty-built as pages themselves.

If nothing under `content/` changed, report that plainly (no pending `content/` changes to test) and stop — do not fabricate a run.

## Step 1: Load or create the Q&A file

Check `.claude/qa-validation/<ticket>.yaml`.

**If it exists**, read it. If the writer wants to add more questions, use the same batch-paste flow below in append mode.

**If it does not exist**, ask the writer to paste their full list of questions and expected answers, in whatever form they already have them (a "Q: ... / A: ..." block, a numbered list, notes copied from a PRD — no strict format required). Parse the entire pasted batch in one pass into the flat schema above, then show the complete parsed set back in a single message for the writer to review and correct. Only write the file after explicit confirmation of the full batch — never confirm question-by-question, and never silently reword or paraphrase the writer's `expected_answer` text, since that is the ground truth the entire grading step depends on.

## Step 2: Render the project, scope the pages, and assign citation markers

Run `snooty build <snooty-root> --output=<path>` once for the whole project (not `check.sh`'s diagnostics-only path) using `local-build-check`'s cached venv. This produces a zip of per-page BSON documents, each holding a fully resolved AST — includes expanded inline, substitutions resolved to literal text.

Then generate the changed-line map, once per run:

```
python .claude/skills/docs-qa-check/scripts/diff_lines.py --repo-root . --out diff-lines.json
```

This scopes exactly like Step 0 (merge-base diff + working tree + untracked under `content/`) and emits `{fileid: [changed post-image line numbers]}`, keyed under every spelling of each path so the AST's `fileid` resolves regardless of form. Do not hand-write this map — deriving it by hand is where provenance bugs come from.

Then find the pages that render any changed source material. A page's rendered AST references every source file it draws from — includes expand as nested roots carrying their own `fileid`, and code example snippets render through the same mechanism — so the scope cannot be derived from the diff alone. Scan the build zip for what each page actually renders:

```
python .claude/skills/docs-qa-check/scripts/extract_blocks.py <build.zip> --scan --out scan.json
```

The in-scope page set is every page whose scan entry lists any fileid present in the diff map. When a changed include or snippet renders on multiple pages, show the writer the list and let them pick which pages to include in this run's extraction; a file referenced by a single page resolves silently. This is what resolves an include-only or snippet-only edit (e.g. a tested code example regenerated without touching the page) to the pages that actually render it. If no page's scan entry matches anything in the diff map, report that no page renders the changed source material — likely unwired content or a missing page change — and stop.

Then run the extractor against the build zip, once per in-scope page. This step builds the run's citation system: it splits each page's rendered AST into reader-facing blocks and assigns each one a marker, so a subagent can cite `[P7]` and the Step 5 report can resolve that marker to a real `fileid:line`:

```
python .claude/skills/docs-qa-check/scripts/extract_blocks.py <build.zip> <page-fileid> <out.json> --diff-lines diff-lines.json --source-root content/<project>/source
```

Omit `--diff-lines` only when every in-scope page is wholly new; that flag's absence is read as the caller asserting all blocks are new. Pass `--source-root` (the project's `source/` dir) so the script can read each file's line count and give its last block a real end line — the AST records only start lines, and without this the last block is scored on its start line alone, which can wrongly mark changed prose `pre-existing` (the script warns when it happens).

The extractor emits one entry per citable block (paragraph, list item, table row, procedure step, admonition body, heading, or code block — not per-node, not per-page), recording for each:

- A sequential marker unique across the run — `P1`, `P2`, `P3`, …
- The block's flattened text.
- Its `fileid` and `position.start.line`, tracked via the nearest enclosing AST `root` node (each included file is its own nested `root` with its own `fileid`, so included content attributes to the right source).
- A heading-path breadcrumb (e.g. "Get Started > Download and Install").
- A line extent (`line` + `line_end`) and a new/pre-existing status, described below.

### How blocks are tagged new or pre-existing

Each block gets a status — `new`, `pre-existing`, or `unknown` — saying whether the current ticket wrote it; it becomes the *attributable* tag in Step 4's report. The extractor computes the status; how it derives extents and intersects them with changed lines is documented in the script.

- `new` — a changed line falls inside the block's extent.
- `pre-existing` — the file is in the diff map, but no changed line touches this block.
- `unknown` — the file is not in the diff map and the map has no completeness sentinel (the extractor warns on stderr). Never treat an `unknown` block as `new`; doing so would tag every block attributable and defeat the provenance check outright.

The sentinel that makes `pre-existing` safe is `diff_lines.py`'s `"__complete__": true` stamp: it enumerates every changed file under `content/`, so a file missing from the map is by definition unchanged.

**What the subagents receive.** The marker table (`marker → {fileid, line, heading_path, new_or_existing}`) stays skill-side — never shown to either subagent. The subagent context is just the marker-prefixed text: all in-scope pages concatenated, each block prefixed by its marker, e.g. `[P1] Get Started with the Ruby Driver`, forming the combined context for Steps 3-4.

Known limitation: the extracted context is text only — images and diagrams contribute nothing. A question whose answer lives in a figure can come back "Not covered" as a false gap, so flag any in-scope page containing a figure in the Step 5 report rather than reading such a verdict as a content gap.

**Skip gate: code-example-only page sets.** If no `new`-tagged block is prose (paragraph, list item, procedure step, admonition body, or table row — only code blocks and headings), the run has no new prose to test — but only the writer knows whether their questions can be answered from a new example, and code blocks are citable blocks like any other. Tell the writer and ask whether to run; when they ask for a recommendation, a new heading plus a code block is the clearest case to skip. A page set with any new prose runs without asking, even when most of the new content is code. Never judge whether an example is correct or runs — that belongs to Grove tests.

## Step 3: Answer each question

For each question in the Q&A file, spawn a fresh, isolated subagent. Its context is *only* the combined rendered page set from Step 2 — no other pages, no project CLAUDE.md or memory, no web search, no outside knowledge of the feature. Run one question per subagent call, not a batched call covering all questions, so that no answer's framing can leak into another's.

Instruct the subagent explicitly to answer "not covered" when the provided content does not address the question, rather than guessing or inferring from general MongoDB knowledge. It may optionally cite a marker (e.g. `P7`) it drew on; this is a cross-check, not the load-bearing citation for the report. Use the exact prompt template in [references/subagent-prompts.md](references/subagent-prompts.md).

## Step 4: Grade each answer

For each question, spawn a grading subagent with: the question, the writer's `expected_answer`, the Step 3 answer, and the full marker-annotated context — an independent grounding check, not a rubber stamp of the candidate's self-reported marker. Isolate it just like the Step 3 answerer: no web search, no file reads, no context beyond what gets inlined into its prompt. Use the exact prompt template in [references/subagent-prompts.md](references/subagent-prompts.md), which also defines the four-way verdict rubric.

Output per question:

- A verdict: **Pass**, **Fail**, **Not covered**, or **Partial**.
- Cited marker(s) plus a verbatim quote, required for every verdict except **Not covered**; a missing citation is recorded as missing, never inferred.
- Each marker resolved against Step 2's table to get `fileid:line`.
- A provenance tag — **attributable** if any cited marker is new, **not attributable** only if all are pre-existing, **unknown** if any cited marker's status is `unknown` (report the unknown in the Step 5 report rather than guessing either way).

Fill in [the grading template](references/subagent-prompts.md)'s placeholders and change nothing else. Adding your own framing — e.g. hinting that the page only addresses the question indirectly — steers the grader toward Partial and makes verdicts unreliable.

Before using a grading response, check three things:

- It contains exactly one `Verdict:` line. A grader that self-corrects mid-answer and emits two conflicting verdicts is a real, observed failure — do not take the first or the last; discard and re-run per [references/subagent-prompts.md](references/subagent-prompts.md), which defines the full malformed-response contract.
- A **Partial** is valid only when a sub-claim is genuinely absent. If its stated reason is paraphrase, an answer assembled from more than one passage, or not restating the term being defined, treat it as a grading defect and re-run, rather than reporting it as a content gap — the template forbids all three explicitly.
- **Partial** verdicts get a second, independent grading pass; disagreement is kept as both results and marked unstable rather than resolved. Other verdicts run once.

## Step 5: Report

Present one table, one row per question:

| Question | Verdict | Provenance | Cited passage |
|---|---|---|---|

"Cited passage" shows the quote plus its resolved `fileid:line` (from Step 2's marker table), not the raw marker — the writer should never need to see a `P7` token.

Follow the table with:

- Any **Pass, not attributable** rows called out separately — worth a second look, since the new content may not have been what actually answered the question.
- Any verdict with a missing citation (a non-"Not covered" verdict where the grading subagent supplied no marker) — flagged plainly rather than silently displayed as if fully grounded.
- Any unstable verdicts, with every result shown — whether they came from a disagreeing double-run or from a grader whose response had to be discarded as malformed.
- Any in-scope pages containing figures/diagrams, noting reduced coverage confidence for questions likely to depend on them.

Do not compute or present an aggregate pass rate or score — a writer triaging their own draft needs the specific gaps, not a single number. Offer to re-run against the same Q&A file once the writer has revised the draft.

## Failure modes to handle

- Snooty render fails for a page in scope — surface the render error for that file and stop for that page rather than silently dropping it from the run.
- `extract_blocks.py` warns that no `--diff-lines` entry matched a `fileid` — the diff map and the AST disagree on how the page is named. Fix the map rather than ignoring it; every block on that page reports provenance `unknown` until you do, since defaulting them to new would tag the whole page attributable.
- The writer pastes a batch that's ambiguous about which text is the question and which is the answer — ask once, in the same confirmation step, rather than guessing.
- A ticket's page set spans pages that turn out to be unrelated to each other (e.g. a stray file bundled into the same PR) — this is a known soft-assumption risk, not something to detect automatically; if a writer flags it, exclude that file from the Step 0 scope for this run.
