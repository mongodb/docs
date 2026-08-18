---
name: mercury-fix
description: "Turn a Mercury mismatch ticket into a reviewable docs edit. Reads the ticket, resolves its URL(s) field to a source file in content/, classifies the requested change into one of six known patterns, and applies the matching edit recipe. Handles heading/metadata/cross-link fixes, content relocation, and scope qualifiers automatically; scaffolds missing content; refuses factual corrections that need a product source of truth. TRIGGER when: the user names a Mercury mismatch ticket, a ticket whose summary begins 'Mercury mismatch :', or any Mercury mismatch epic; asks to fix an LLM-citation or docs-findability ticket; or says \"mercury fix\" / \"work this mismatch ticket\". SKIP: general SEO passes (use fix-seo); broken external links (use fix-404s); factual accuracy audits against product code (use docs-drift)."
model: sonnet
argument-hint: "<DOCSP-XXXXX> [additional ticket keys] [--pattern <name>]"
---

# Fix a Mercury mismatch ticket

A Mercury mismatch ticket records a case where an LLM answered a user question badly because a docs page was missing, buried, under-scoped, or stale. The ticket already contains the diagnosis and the requested change; this skill's job is to carry that request into the right source file correctly, not to re-analyze the page.

**Identify these tickets by shape, not by epic.** A summary beginning `Mercury mismatch :`, an `LLM` label, and a populated `URL(s)` field are the reliable signals. These tickets are filed in rounds under a new epic each time, so do not require a ticket to belong to any particular epic before working it.

## Do not use this skill for

| Instead of this skill | Use |
|---|---|
| Bulk SEO cleanup with no ticket behind it | `fix-seo` |
| Broken external links | `fix-404s` |
| Auditing whether docs match current product behavior | `docs-drift` |
| A ticket whose requested change is a factual correction | Nothing here — this skill refuses it; see references/outdated-incorrect.md |

## Step 1: Read the ticket

Use the `jira` skill to fetch each ticket key in `$ARGUMENTS`. It selects the right tool and handles auth.

The docs URL is almost never in the description — descriptions say "this page". It lives in a **custom field**, so the default field set is not enough. Request these fields explicitly:

| Field | ID | Why |
|---|---|---|
| `URL(s)` | `customfield_12054` | The target page(s), newline-separated. The whole job depends on this. |
| Epic Link | `customfield_10857` | Confirms ticket shape; do not gate on its value |
| `comment` | — | Comments frequently withdraw part of the request |
| `issuelinks` | — | These tickets are often clones of an earlier one; see below |

So the read is `summary,description,labels,components,status,comment,issuelinks,customfield_12054` — never `*all`, which returns 150+ mostly-null custom fields.

**Read the comments before planning.** A comment often narrows or withdraws part of the description — a request to change a page's URL, for instance, may be countermanded later in the thread. A request that a comment has withdrawn must not be implemented.

**Read the linked tickets too.** These tickets are frequently clones of an earlier ticket asking the same question against a different model, so the linked issue may hold prior discussion, an earlier fix attempt, or the reason the question came back. Fetch each key in `issuelinks` — the same field list works — and pay particular attention to a `Cloners` link.

What you are looking for: a fix that was already applied and did not work, wording the reporter rejected last time, or a different page chosen as the target. Any of those changes the plan. Summarise what the linked ticket adds in your Step 4 plan, and say so explicitly if it adds nothing, so the writer knows it was checked rather than skipped.

If the `URL(s)` field is empty, scan the description and comments for a complete `mongodb.com/docs/` URL written out explicitly. Never construct or guess a URL. If none is present, stop and ask the user which page to edit.

### Tickets that list several pages

The `URL(s)` field often holds several URLs, and the ticket may explicitly delegate the choice — "use your judgment on which of these (could be more than 1) pages need updating."

**Never silently drop a listed page.** Resolve every URL and give a per-page verdict in your Step 4 plan: edit, or skip with a reason. The user decides. Under-editing is the more likely failure here, and skipping a page because it looks already-covered is the usual cause — see the retrievability check in Step 3.

## Step 2: Resolve each URL to a source file

```bash
python3 .claude/skills/mercury-fix/scripts/resolve_url.py "<url>" ["<url>" ...]
```

Add `--json` for machine-readable output. The script exists because this mapping is not mechanical: it verifies every candidate against the filesystem, follows the repo's own redirect data for legacy and moved URLs, collapses two-segment prefixes onto hyphenated directories, skips EOL versions, and reports ambiguity rather than guessing.

| Status | Meaning | What to do |
|---|---|---|
| `RESOLVED` | Exactly one source file exists | Proceed |
| `AMBIGUOUS` | Several files match, usually across versions | Stop; ask which to edit |
| `UNRESOLVED` | No file matches | Stop; ask for the path |

Never edit a file the resolver did not confirm.

**A URL names the published page, which is often not the file to edit.** For a versioned docset the resolver reports a separate `edit_target`, defaulting to `upcoming/` per CLAUDE.md. **Always confirm the version target with the writer** — observed practice is inconsistent, with tickets against the same docset in the same period fixed both in `upcoming/` and directly in the current version directory. Present the `edit_target`, the ticket's fixVersion, and ask.

**The text to change may live in an include, not the page.** The resolver maps URLs to pages only. Once you have the page, grep the sentence or section the ticket names across the project's `source/includes/` before editing — content pulled in by `.. include::` must be changed at its source, and that file may be shared with other pages. If it is shared, say so in your plan: the edit affects every page that includes it.

**Check whether the work was already done.** Before planning an edit, run `git log --oneline -5 -- <file>` and scan for a change that already addresses the ticket. These tickets are filed in batches and overlap, so the fix may have shipped under a different key. If it looks addressed, say so and stop rather than editing.

Verify the resolver after any change to it:

```bash
python3 .claude/skills/mercury-fix/scripts/resolve_url.py --self-test
```

## Step 3: Classify the requested change

Match on the **requested action**, not the ticket title. Honor an explicit `--pattern` override.

| Pattern | Automation | Ticket says something like | Recipe |
|---|---|---|---|
| `discoverability_citations` | full | "isn't getting cited", "rename the heading", "add a meta description", "add a link to", "pull it out of the table" | references/discoverability-citations.md |
| `structure_relocation` | full | "move this to", "promote to its own heading", "this belongs on the FAQ page", "reorganize" | references/structure-relocation.md |
| `ambiguity_scope` | full | "clarify that this is for Compass", "specify which roles", "this only applies to Flex", "too broad" | references/ambiguity-scope.md |
| `unsupported_not_possible` | draft | "make clear this is not supported", "note that you cannot", "mark as EOL" | references/unsupported-not-possible.md |
| `missing_content` | scaffold | "add an FAQ", "add a section", "add a procedure", "add a note explaining the limit" | references/missing-content.md |
| `outdated_incorrect` | refuse | "this is wrong", "update to reflect", "remove the outdated field", "no longer accurate" | references/outdated-incorrect.md |

Automation levels:

- **full** — apply the edit, then report it for review.
- **draft** — apply it, but flag in the report that the writer must confirm the technical claim, because the ticket asserts a fact you cannot verify in the repo.
- **scaffold** — build the structure and insertion point, leave a marked placeholder for technical content, invent nothing.
- **refuse** — stop, report why, hand back to the writer.

**When a ticket spans two patterns, take the more restrictive automation level.** A ticket that renames a heading *and* adds a new limit is `missing_content` (scaffold), not `discoverability_citations`. If you cannot classify confidently, ask — do not default to the most permissive.

**Read only the reference file for the pattern you selected.** Each is self-contained.

### The one rule that applies to every pattern

A present concept is not a retrievable answer. These tickets exist *because* a model failed to find the answer on a page that often already contained the idea. What was missing was the answer stated in the question's own words, somewhere a retriever will reach.

So before skipping a page as already-covered, check whether the existing coverage:

- uses the question's vocabulary, not a synonym;
- carries a heading or definition term a retriever can anchor to;
- sits in body text rather than a table, a nested list, or an aside;
- answers the question directly rather than implying it.

If any of those fails, the page still needs the edit. When you do skip, say so explicitly with the reason.

## Step 4: Confirm the plan before editing

Present, for every ticket and every listed page:

- ticket key and a one-line summary of the requested change
- resolved file, and the `edit_target` if it differs
- pattern and automation level
- the specific edit intended, or the reason for skipping
- shared includes the edit would touch
- anything a comment withdrew, and anything you will refuse or scaffold

**STOP HERE. Wait for confirmation.** Do not edit, and do not create a branch, before confirming — a branch made early picks up unrelated working-tree changes.

## Step 5: Apply the edits

**One ticket per branch and per commit**, so the PRs stay independently reviewable. **You create the branch, not the subagent** — name it `DOCSP-XXXXX-short-description` before delegating. A subagent must never create, rename, or switch branches; its worktree arrives on a branch named after the agent, and that is expected.

For more than one ticket, delegate each to its own subagent with **worktree isolation**, running them in parallel. Sonnet is sufficient for these edits. Hand each subagent only what it needs for its own ticket:

- the ticket key and the requested change
- the resolved `edit_target`, and the confirmed version target
- the chosen pattern, its reference file, and **its automation level with a one-line reason** — a delegate reading only the reference file cannot see the Step 3 rule that a mixed ticket drops to the stricter level, so "scaffold, because the heading rename comes with a new technical claim" has to be stated, not implied
- the confirmed plan for that ticket alone

This keeps each agent's context clean and stops one ticket's page content from bleeding into another's edit. Collect their reports and present them together in Step 7.

Follow the repo's own rules rather than restating them here — read `.claude/rules/rst-conventions.md`, and CLAUDE.md for wrapping, substitutions, source constants, and nested components. Two things those do not cover:

- **Heading underlines and source constants.** The underline must match the *rendered* length, not the raw markup: `{+mongosh+} Configuration` renders as 21 characters, so the underline is 21 characters. See `.claude/skills/fix-seo/assets/rst.md` for how to count visible length.
- **Cross-docset refs.** A `:ref:` label that exists somewhere in the repo may still fail to resolve, because the target lives in a different docset whose `objects.inv` is not in this project's `intersphinx` list in `snooty.toml`. Check that list before adding a ref to another product's docs.

Anything you cannot verify in the repo or in the ticket text becomes a `.. TODO(DOCSP-XXXXX):` comment and a line in your report.

## Step 6: Verify

```bash
./lint-docs.sh all <edited-file>
```

That runs SEO, 404, findability, nested-components, and Vale. **It does not validate `:ref:` targets.** For that, invoke the `local-build-check` skill, which runs the real Snooty parser and reports unknown targets, duplicate labels, and undefined substitutions — required whenever your edit adds or changes a `:ref:`, a label, an include path, or moves a page.

Fix what they report. Surface anything unresolvable rather than working around it.

If the edit added, moved, renamed, or deleted a page, invoke `unified-toc` immediately, and `add-redirects` before any push.

## Step 7: Report

Per ticket:

1. Ticket key, pattern, automation level.
2. File path and a summary of the change; note any shared include touched.
3. Lint and build-check results.
4. **Writer must confirm** — every technical claim taken from the ticket rather than verified, every `TODO`, every scope assertion.
5. **Not done** — anything refused or skipped, and why.

Then ask whether to commit. Do not commit or push without explicit confirmation, and do not open a PR unless asked — when asked, use `open-pr`.

## Known limits

- `outdated_incorrect` is out of scope by design. It is a small but steady share of these tickets, and they will always come back for a human. `docs-drift` is the route to verifying those facts against product source.
- The resolver cannot resolve a URL whose page is generated rather than authored, such as the Atlas API spec pages under `reference/api-resources-spec/`. It reports these as unresolved and names the directory.
- The recipes were derived from previously completed tickets of this type. Each new round is new content, so expect at least one pattern to need adjusting after the first few real runs; report anything the recipes handled badly to the skill's DRI.
