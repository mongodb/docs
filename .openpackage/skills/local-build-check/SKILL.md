---
name: local-build-check
description: >
  Run local docs build checks on pending content/ changes before opening a PR.
  Catches broken directives, bad refs, missing includes, invalid substitutions,
  and indentation errors using the Snooty RST parser. Applies unambiguous
  fixes from a learned per-repo knowledge base, surfaces ambiguous ones, and
  appends new errors to a local log. Use when the user is about to commit or
  open a PR and the pending changes include: edits to .txt or .rst files,
  changes to YAML extract files in source/includes/, any file renamed/moved/
  deleted in content/ (could break :ref:, literalinclude, or include paths),
  or snooty.toml changes. Also use when the user asks to "check the build",
  "test before PR", "lint the build", or wants to validate edits work. Do NOT
  trigger for image-only changes, code-example file edits that don't touch RST,
  or non-RST config files with no path impact.
---

# Local Build Check

Catch and fix docs build errors **before** Netlify does using the Snooty RST
parser.

## When NOT to use

- Changes are entirely in `code-example-tests/` → use Grove skills instead.
- Changes are entirely in `platform/` → stop immediately and tell the user
  **verbatim**: "The local build check covers `content/` only. For `platform/`
  changes, run `pnpm typecheck` and/or `pnpm lint` in the `platform/`
  directory instead." Do not invoke the skill.
- The user just wants a content review, not a build check.

## Example interaction

**User:** `check the build before I open a PR`

**Claude:** 1 file changed. Waiting for build...

*(build completes; introduced: 1 error, pre-existing: 2 warnings)*

> **Introduced error** `content/atlas/source/security/set-up-unified-aws-access.txt:47`:
> `Unknown directive type "seelso"` — renaming to `.. seealso::`.

*(applies Edit, re-runs — 0 introduced errors)*

> Files fixed: `content/atlas/source/security/set-up-unified-aws-access.txt`
> Pre-existing warnings (not blocking): 2.
> Ready to commit?

## Layout

This skill writes to and reads from a per-repo, gitignored directory:

```
.claude/build-errors/
├── knowledge.md     # distilled "pattern → fix recipe" entries (consult first)
└── log.jsonl        # append-only raw error log (one JSON object per line)
```

Both files are gitignored by default. To **promote** the team's collective
knowledge so other writers benefit, the user can add an exception:

```
# .gitignore
.claude/build-errors/
!.claude/build-errors/knowledge.md
```

Then `git add .claude/build-errors/knowledge.md`. Mention this option to the
user only when a new high-confidence pattern has just been added — not on
every run.

## Step 1: Start the build and consult the knowledge base

**First**, run the venv check alone — this takes ~5ms and must happen before
the background build starts so the result is accurate:

```bash
[[ -d "${HOME}/.cache/docs-mongodb-internal/local-build-check/.venv" ]] && echo "cached" || echo "first-run"
```

If this returns `first-run`, immediately tell the user:

> First run — Snooty is installing (uv, venv, snooty-parser clone). This
> will take 1–3 minutes. Subsequent runs are faster: seconds for small
> projects, ~45s for large ones like Atlas (~4,700 files).

**Then**, in the same response turn, fire these three tool calls in parallel —
the build starts immediately, nothing else blocks it:

**Bash tool (`run_in_background: true`):**

```bash
bash .claude/skills/local-build-check/scripts/check.sh
```

Use `bash` explicitly — do not rely on the execute bit. The script
self-verifies the environment (uv, Snooty venv), detects changed projects
via its own git diff, and exits with "No pending `content/` changes —
nothing to build-check." if there is nothing to check.

**Read tool:** `.claude/build-errors/knowledge.md` (if it exists).

**Bash tool (foreground, fast):**

```bash
{ git diff --name-only origin/main...HEAD -- 'content/**'; \
  git diff --name-only HEAD -- 'content/**'; \
  git ls-files --others --exclude-standard 'content/**'; } | sort -u
```

This gives you the changed file list for knowledge base matching.

Once these three calls return, check the knowledge base: if any entry's
`Match files` glob overlaps with the changed paths, output a heads-up to the
user:

> **Heads-up from knowledge base:** The following known pattern applies to
> your changed files: `<pattern name>` — `<Common cause one-liner>`. I'll
> flag it if the build surfaces it.

Do not preemptively edit files based on the knowledge base — only apply
a fix *after* the build actually surfaces the matching error.

Output a one-line status: "N files changed. Waiting for build..."

Then **go completely silent** — no tool calls, no reads, no commands — until the
background-task notification arrives. There is nothing useful to check
mid-build: `check.sh` deletes `/tmp/lbc-latest.log` at startup, so that
file does not exist while the build runs. Any read attempt returns "file
not found." Wait for the notification.

When the background-task notification arrives, read its output:

- If it printed "No pending `content/` changes — nothing to build-check",
  report that phrase verbatim and stop. Do not present any build result table.
- Otherwise, read `/tmp/lbc-latest.log` (the symlink `check.sh` wrote at
  the very end of the run) to get the full structured output for Step 2.
  Do not search for the timestamped path — the symlink is always current.

**If the symlink does not exist yet:** `snooty build` internally spawns
worker subprocesses that may outlive the main snooty process. check.sh
writes the symlink only after all diagnostics are parsed, so the symlink's
existence — not any snooty process being alive — is the correct completion
signal. If `/tmp/lbc-latest.log` is absent after the notification, read it
directly without polling for snooty processes. If it still does not appear
within ~10s, re-check once with a foreground Bash read of the path; do not
start a `pgrep` polling loop.

This runs the Snooty RST parser against each changed project. It sets up a
Python venv (using `uv`; installs itself if missing), runs `snooty build` with
`DIAGNOSTICS_FORMAT=JSON`, and parses the output for `ERROR` and `WARNING`
diagnostics. A non-zero error count sets `OVERALL_RC=1`. The venv and
`snooty-parser` clone are cached outside the repo at the path shown in the
venv check above. To pick up a newer Snooty version, pass `--refresh-snooty`.

Snooty catches:

| Error type | Example message |
|---|---|
| Broken directive | `Unknown directive type "seelso"` |
| Bad include path | `Include file not found` |
| Unknown ref | `Unknown target name: "foo"` |
| Duplicate label | `Duplicate explicit target name` |
| Invalid substitution | `Undefined substitution referenced` |
| Indentation error | `Unexpected indentation` |
| Malformed role | `Unknown interpreted text role` |

The script writes structured output to `/tmp/local-build-check-<timestamp>.log`
and prints the path on exit. JSON diagnostics from Snooty are written to a
separate `/tmp/snooty-diagnostics-<project>-<timestamp>.log`. Read both files
to extract errors.

## Step 2: Parse errors and propose fixes

The **current diff** for classification purposes is the working-tree diff
only: files returned by `git diff --name-only HEAD -- 'content/**'` and
`git ls-files --others --exclude-standard 'content/**'`. Files that were
committed to the branch in earlier commits — but are not modified in the
current working tree — are **not** part of the current diff, regardless of
whether they exist on `origin/main`.

- **Introduced** (`INTRO` lines) — diagnostics in files that are part of
  the current working-tree diff, **plus** "Target not found" errors in any
  file whose referenced label was added, modified, or removed in the current
  diff (a label changed in one file causes downstream reference failures in
  unchanged files). Only introduced **ERRORs** set `rc=1` and block.
  Introduced WARNINGs are surfaced for the user's attention but do not fail
  the check.
- **Pre-existing** (`PRE` lines) — diagnostics in files that are NOT part
  of the current working-tree diff and are not traceable to a label touched
  by the current diff. This includes errors in files committed earlier on
  this branch. List them in the summary as "pre-existing (not blocking)"
  with counts only — no file details, no fix options, no questions. Move on
  immediately. Do not offer to fix pre-existing errors unless the user
  explicitly asks in a follow-up.

### Handling "Page not included in any toctree" warnings

This warning fires when a page isn't reachable from any ``.. toctree::``
directive and isn't marked ``:orphan:``. It should always be **fixed**, not
ignored — an unattached page won't appear in the site navigation for offline docs.

There are two causes:

**A — New page not wired in (INTRO warning on the new file itself):**
The diff added a page that isn't yet in any toctree.

1. Collect every introduced file with this warning.
2. **Find the correct parent toctree file.** Walk up the file hierarchy
   from the new page until you find the nearest RST file that contains a
   ``.. toctree::`` directive covering that subdirectory. Add the new
   page's filename (without extension) to that directive.
3. Re-run the build check to confirm the warning is gone.

**B — Existing pages detached by a malformed toctree entry:**
The diff modified a file that contains a ``.. toctree::`` directive.
A malformed entry (wrong path, missing title prefix, stray leading space)
can silently drop pages from the tree, causing "not included" warnings on
those pages even though they haven't changed. The script automatically
promotes these to INTRO when any changed file contains a toctree directive,
so they appear as INTRO warnings in the log — not PRE. Treat them like any
other introduced warning:

1. Read the changed file's toctree entries.
2. Check each entry for malformed syntax: missing title prefix, incorrect
   path, stray indent, or bare filename without path.
3. Fix any malformed entries, then re-run to confirm the warnings clear.

**EOL version handling:** Running the build and surfacing diagnostics is
read-only and safe for any version, including EOL (pre-7.0) directories.
If the changed files are in an EOL version directory, run the check and
report all diagnostics as you normally would — but **do not apply any
fixes**. Surface the errors to the user and stop, noting that edits to EOL
versions are not permitted.

For each **introduced** error:

1. **Match against knowledge.md.** If a recipe matches and the fix is
   deterministic (e.g., "rename directive `..exmaple::` to `..example::`"),
   apply it via Edit and mark `pattern_id` in the log.
2. **Otherwise, classify.** If the fix is unambiguous from the error
   message alone (e.g., "Unknown target name: foo" with exactly one nearby
   typo of `foo`), propose the edit, apply it, and surface what changed.
3. **If ambiguous, stop and ask.** Do not proceed on unconfirmed details.
   Present **exactly** the top three most likely options — no more. Do not
   append implicit suggestions or partial fixes after the numbered list.

Cap the auto-fix loop at **two iterations** of (apply → re-run failing
stage). If errors remain after two passes, stop and surface them all.

## Step 3: Update the log

Append one JSON object per error to `.claude/build-errors/log.jsonl`:

```json
{"ts":"2026-05-01T14:32:00Z","stage":"snooty","project":"atlas","file":"content/atlas/source/foo.txt","line":42,"severity":"ERROR","message":"Unknown directive type \"exmaple\"","pattern_id":"misspelled-directive","fix_applied":"renamed to example","outcome":"resolved"}
```

Use `outcome: "resolved" | "surfaced" | "skipped"`.

If a *new* pattern was solved successfully — meaning no entry in the
knowledge.md you read in Step 1 matched this error — ask the user whether
to add a new entry to `knowledge.md`. Before asking, verify the error
message does not match any existing `Match regex` in knowledge.md; if it
does, increment `Times applied successfully` on the matching entry instead
of proposing a duplicate. Use this template for new entries:

```markdown
## Pattern: <short name>

- **Match regex:** `<regex against error message>`
- **Match files:** `<glob, e.g. content/**/*.txt>`
- **Common cause:** <one sentence>
- **Fix recipe:** <imperative steps>
- **First seen:** <YYYY-MM-DD>
- **Times applied successfully:** 1
```

If the user agrees, append to `knowledge.md` and increment the counter on
subsequent successful applications.

## Step 4: Summary

If the script exited with "no pending content/ changes," report that phrase
verbatim — do not say "0 errors found" or present any build result table.

Otherwise report to the user, in this order:

1. **Errors found / fixed / remaining**, with counts.
2. **Files touched** by auto-applied fixes (paths, one per line).
3. **New knowledge entries** added (if any), with a one-line offer to
   promote `knowledge.md` for the team if it isn't already.
4. **Next step prompt**: "Ready to commit?" — wait for explicit
   instruction (per CLAUDE.md Definition of Done).

Do **not** run `./lint-docs.sh` here — this skill validates the build, not
SEO/findability. The user runs lint separately when ready to commit.

## Failure modes to handle

- **Auto-fix loop hits the cap** → list every remaining error grouped by
  file, do not retry.
