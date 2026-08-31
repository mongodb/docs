---
name: pr-coverage-check
internal: true
description: >
  Compare a docs PR against the engineering PR (and Jira) it documents, and
  produce a short list of pointers — not a full report — telling an
  engineering reviewer exactly where to look and why, to speed up tech review.
  Human supplies the PR and ticket URLs; the skill never guesses linkage. Use
  when a writer wants to check whether a docs PR adequately covers an
  engineering change before requesting eng review. Trigger phrases: "check PR
  coverage", "tech review coverage", "does my docs PR cover the eng PR",
  "coverage summary for review".
---

# pr-coverage-check

**Status: experimental first slice.** This skill exists to test one hard
question — *can the model make a trustworthy judgment about whether a docs PR
covers an engineering change?* It is pure judgment work: no scripts, no
manifest, human-in-the-loop. Expect to iterate heavily. Do not treat its
output as authoritative; treat it as a draft that a human confirms.

## What this is (and is not)

This is a **PR-vs-PR comparison for tech review**, not drift detection. It
answers "does *this* docs PR cover *this* engineering change?" — a bounded,
point-in-time question — not "are the published docs still true?" (that is the
`docs-drift` skill).

It **never** discovers the engineering PR on its own (see commitment 1 below).

It **never** edits docs or files tickets. It produces a report in the
conversation for the writer to read and correct, and — only with explicit
per-run confirmation — can append that report to the docs PR description
(see Stage 7).

## Design commitments (hold these firm)

1. **Human supplies linkage.** Always ask for the URLs. Never guess the
   counterpart by parsing a PR body or Jira.
2. **Evidence over scores.** No bare confidence percentage. Every item must
   be checkable against a specific diff line.
3. **Precision over recall.** A short high-confidence list beats a long list
   of maybes — see the inclusion test below for what qualifies.
4. **The reviewer already has the diff open.** Never restate what the docs PR
   says or list what's fine. State only where to look and why.
5. **Stay inside coverage; do not do the reviewer's job for them.** This skill
   maps eng change → docs change; it does not adjudicate whether the docs'
   technical description is *correct* (see Known limitations — this is also
   where the skill has been shown unreliable). Point at what to check; do not
   assert a verdict.
6. **The inclusion test.** Before including any item, ask: *does resolving
   this require engineering knowledge the writer structurally lacks?* If the
   writer could resolve it by re-reading their own draft, it does not belong
   — that's an editorial call, not this skill's job. Only items that clear
   this test earn a `Gap`, `Verify`, or `Confirm` tag (defined in Stage 4).

## Inputs

Ask for all of these **in a single message**, not sequential Q&A:

- **Docs PR URL** (the in-progress writer PR).
- **Engineering PR URL(s)**, if any exist.
- **Jira ticket(s)** — docs and/or engineering, if they exist.
- Optional: **one sentence** from the writer on what the change is.

If the writer's first message already contains some of these, only ask for
what's missing.

Whether an eng PR exists is not the signal for whether this skill applies —
see the four modes below.

## Procedure

### 1. Gather and determine mode

Fetch the docs PR diff and any Jira tickets. Use `gh pr diff <url>` for PRs
and the `/jira` skill for tickets. If any supplied link is inaccessible, stop
and tell the writer which one — do not proceed on a guess.

Then determine which mode applies:

- **Mode A — eng PR + eng Jira supplied.** The ideal case. Fetch the eng PR
  diff too and proceed to Stage 2 as written.
- **Mode B — no eng PR, but Jira/release notes describe the change** (e.g. a
  version bump where the eng work happened upstream). Use Jira and release
  notes as the "what changed" source in place of a diff, and lower confidence
  accordingly — you are reading a description, not code.
- **Mode C — no eng PR, no eng Jira, and the docs diff makes no verifiable
  technical claims** (pure restructuring, reformatting, following another
  page as a template). This skill does not apply. **Stop here — skip Stages
  2–4.** Say so plainly and suggest a manual check against the ticket's
  instructions instead of forcing an analysis with nothing to compare
  against.
- **Mode D — no eng PR, no eng Jira, but the docs diff changes or adds claims
  about product behavior** (e.g. a proactive quality-fix ticket that corrects
  or clarifies how something works). This still needs tech review — the
  absence of an eng PR here means nothing changed in the product, not that
  nothing needs verifying. Treat the **current product source** as the
  reference, the same way `docs-drift` does, but scoped only to the specific
  claims that changed in this docs PR — not a full-page audit. Read the
  relevant source (e.g. the driver method(s) being described) directly rather
  than inferring from the ticket alone.

State which mode you're in at the top of the report — the reviewer should
know whether "coverage" or "accuracy against current source" is what's being
checked.

### 2. Synthesize the reference to check against

**Modes A/B** — From the engineering PR diff + Jira, list the **public-contract
changes** a user would need documented: new/changed flags, options, defaults,
enum values, constraints, API shapes, behavioral changes, version metadata.

**Downweight mechanical churn** — file moves, renames, refactors, test-only
changes, formatting. These rarely need docs. Upweight anything that changes
what a user can do or must know.

**Watch for collateral changes** — in a dependency- or version-bump PR,
changes made only to keep the code building against the new version (not
because the reference change itself calls for them) are a third bucket,
distinct from both public-contract changes and mechanical churn. Do not
downweight these as churn: a collateral change is often the riskiest part
of the PR precisely because it maps to nothing in the reference, so
nothing forces a reviewer to look at it. Keep it in scope.

Be honest about inference limits: a config flag is easy to read off a diff; a
behavioral change buried in logic may not be. Where you are inferring rather
than reading a clear signal, mark the unit as **inferred** so its coverage
verdict inherits that uncertainty.

**Mode D** — There is no diff to read. Instead, list the specific behavioral
claims the docs PR changed or added (e.g. "how `Next()`, `TryNext()`, and
tailable cursors relate"), then read the actual product source for each one
directly. The reference here is *current source behavior*, not a delta — do
not skip reading the source just because nothing "changed" in engineering's
world.

### 3. Synthesize "what the docs PR changed"

From the docs PR diff, list what the writer added or changed, by section. This
is the subject of the report — the reviewer is reading *this* PR, not the eng
PR (Modes A/B) or the source (Mode D). That context is background, not the
headline.

**If the docs PR adds or changes code examples**, check whether matching
Grove tests exist and pass (e.g. new/changed files under
`code-example-tests/<language>/.../tests/`). This is mechanical, not a
judgment call — surface it as a one-line testing status in the report so the
reviewer knows whether the examples are CI-verified or need manual checking.

### 4. Map and classify

Map each docs change to the eng change unit(s) it addresses. Most of this
mapping is invisible in the output — it either checks out (say nothing, it
folds into the confidence line) or it clears the inclusion test above and
earns exactly one tag:

- **Gap** — a fact only visible in the eng diff (not the ticket, not
  inferable from the docs alone) that the docs do not mention at all. Purely
  about presence/absence; state it, do not ask permission — the reviewer
  decides whether it matters. Example: a diff adds a deprecation warning the
  docs never reference. Once something clears the inclusion test as a Gap,
  keep it as a `[Gap]` line rather than softening it into a "no action
  expected" or "not a concern" note — whether it matters is the reviewer's
  call, per design commitment 5.
- **Verify** — the docs make a specific claim about behavior you're not fully
  certain is accurate. Point at the claim and cite the specific thing you
  read that it turns on: a diff line, a line in a file you opened, or a
  passage in release notes/docs. General recollection of how a framework or
  library usually behaves is weaker evidence than something read for this
  PR — if that's the only basis for an item, say so in the item itself
  rather than stating it with the same confidence as a claim you confirmed
  by reading code. Where confirming a claim depends on knowing what else
  relies on the changed code, read that dependency directly rather than
  inferring it from the diff alone. See Known limitations for why this
  skill's own accuracy judgments still need a human check regardless.
- **Confirm** — a completeness question only engineering can answer (e.g. "is
  this capability actually finished/user-facing this release?") — not a
  writer's own editorial call about whether to explain more.

If nothing clears the inclusion test, say so plainly — an empty gap/verify/
confirm list is a valid, useful result, not a failure to find something.

### 5. Report

Output is a pointer list, not a report — orient, then point. See
[references/report-template.md](references/report-template.md) for the exact
format, the confidence rubric, a worked example, and output constraints.

### 6. Confirm with the writer

After the pointer list, ask the writer to resolve each **[Confirm]** item.
Present three explicit options, not just confirm-or-correct: **confirm** it
as written, **correct** it, or **ignore** it (drop it from the report
entirely because the writer has determined it doesn't need eng input, e.g.
a version bump they already know is intentional). If the writer ignores an
item, remove it from the report before Stage 7; do not carry dismissed
items into the published version. Their answers are the iteration signal
for this skill; note recurring correction or ignore patterns so the flow
can be sharpened over time.

**Do not ask the writer to resolve `Verify` items.** Those are for the
*engineering reviewer* during tech review; routing them back to the writer
first risks a pre-biased answer (design commitment 5).

### 7. Offer to publish

After the writer has responded to the `[Confirm]` items, always ask a
yes/no question: *"Want me to append this report to the docs PR
description so the engineering reviewer sees it?"* Do not publish without
an explicit yes on that run — this is a shared, visible artifact, so
confirmation is required every time, not just once per PR.

If the writer says yes:

1. Fetch the current PR description with
   `gh pr view <url> --json body -q .body`.
2. Search it for the marker `<!-- pr-coverage-check:report -->`. The
   markers must bracket the *entire* report block, including the
   `## Tech Reviewer Suggestions` heading line, not just the body below it,
   so the replace step in a rerun can't drift and leave a duplicate heading
   behind:
   ```
   <!-- pr-coverage-check:report -->
   ## Tech Reviewer Suggestions
   ...full report body...
   <!-- /pr-coverage-check:report -->
   ```
   - **Marker found:** replace everything from the opening marker to the
     closing marker, inclusive, with the new markers + report. This is
     what makes reruns safe — a second publish on the same PR updates the
     existing report in place instead of stacking a duplicate below it.
   - **No marker:** append the marker-wrapped report to the end of the
     existing description.
3. Write the result back with `gh pr edit <url> --body-file <tmp-file>`
   (use a temp file, not `--body`, so formatting/newlines survive
   shell-quoting).
4. Confirm to the writer that the description was updated and share the PR
   URL.

If the writer says no, stop here — the report already exists in the
conversation, which satisfies this skill's job.

## Known limitations (state these to the writer)

- Strongest on surface API/config/flag/enum changes; weakest on behavioral
  changes buried in logic — which are also the ones docs most often miss.
- Depends on Jira/PR quality. Thin tickets and terse diffs yield lower
  confidence, and the report says so rather than inventing certainty.
- No confidence *number* by design in this slice — only low/med/high with a
  stated reason.
- **This skill's own accuracy judgments are not reliably reproducible** — see
  the Verify tag repro case in Stage 4.
- **Default Jira fetches only see a fixed field set** (summary, description,
  status, assignee, reporter, labels, dates) — custom URL-type fields are not
  visible via a plain fetch. Ask the writer to paste any such link explicitly.
