---
name: grove-review
description: >
  Review a GitHub PR that adds or changes Grove tested code examples (source
  files, tests, output files, and the docs pages that reference them via
  literalinclude/io-code-block).
  Use when a writer or reviewer asks to "review this Grove PR", "check this
  code example PR", "review PR #NNNNN for Grove conventions", or wants a
  structured pass over a Grove PR before or during human review. Not for
  general code review (use /code-review) or for creating/fixing examples
  (use grove-create, grove-migrate, grove-test).
---

# Grove PR Review

Run a fixed checklist against a Grove PR: the source examples and tests
under `code-example-tests/`, the generated snippets/outputs under
`content/code-examples/tested/`, and the docs pages under `content/` that
reference them.

**Do NOT use when:**
- The user wants to create a new example → use `/grove-create`
- The user wants to migrate untested code → use `/grove-migrate`
- The user wants to add/fix a test → use `/grove-test`
- The user wants a general code-quality review unrelated to Grove
  conventions → use `/code-review`
- The user wants to run or debug the PR's tests → use `/grove-run`

This is a read-only review skill. It never edits files or comments on the
PR — it reports findings for the user to act on, one question at a time or
as a full pass, matching how the user asks.

Provenance: this checklist is derived from the
[Grove Review conventions doc](https://docs.google.com/document/d/1hHzmT_WcDHxq1aVKDEgdJ_cOi7fXf3p-a9tNkRFMvzk/edit?tab=t.0).
Do not fetch or review against that doc — the checklist below is what you
run. The link is there so a human can update the checklist when the doc
changes.

## Getting the PR

Ask for the PR (URL or number) if not already given, then fetch the diff:

```
gh pr diff <number> --repo 10gen/docs-mongodb-internal
```

For large diffs, save the output to a scratch file and `grep`/`sed` into it
rather than re-fetching — the same diff is queried repeatedly across the
checks below.

Also pull the PR's existing review history before flagging anything:

```
gh api repos/10gen/docs-mongodb-internal/pulls/<number>/comments --jq '.[] | {user: .user.login, path: .path, line: .line, body: .body}'
gh pr view <number> --repo 10gen/docs-mongodb-internal --json comments
```

A PR under review is a moving target: some of what looks non-standard is
the *result* of an earlier review round, not an oversight. Never recommend
reverting a change that a prior comment already argued for without engaging
with that argument — if you still disagree, say what the earlier round
missed. Silently re-litigating a settled point wastes the author's time and
erodes trust in the rest of the checklist.

If the user asks about a specific file or check rather than the whole PR,
answer just that question — don't run the full checklist unprompted.

## Establishing what the convention actually is

Several checks below turn on "does this match the established pattern?"
Do not answer that from the handful of adjacent examples in the same file
or directory — a local anomaly reads exactly like a convention at that
sample size, and treating it as one launders it into a standard. Count
across the whole suite before calling anything conventional:

```
grep -rn "shouldMatch" code-example-tests/<suite>/tests | wc -l
grep -rn "shouldResemble" code-example-tests/<suite>/tests | wc -l
```

When the local pattern and the suite-wide pattern disagree, say so
explicitly and treat the suite-wide count as the convention. A PR that
moves an outlier file *toward* the suite norm is an improvement, not a
deviation — don't flag it as one.

## Language reference

Use this to map file extensions and directories when scanning a diff:

| Suite | Examples dir | Tests dir | Ext | Comparison API |
|-------|-------------|-----------|-----|-----------------|
| JavaScript | `javascript/driver/examples/` | `javascript/driver/tests/` | `.js` | `Expect.that(...)` |
| Python | `python/pymongo/examples/` | `python/pymongo/tests_package/` | `.py` | `Expect.that(...)` |
| Go | `go/driver/examples/` | `go/driver/tests/` | `.go` | `compare.ExpectThat(t, ...)` |
| Java | `java/driver-sync/src/main/java/` | `java/driver-sync/src/test/java/` | `.java` | `Expect.that(...)` |
| C# | `csharp/driver/Examples/` | `csharp/driver/Tests/` | `.cs` | `Expect.That(...)` |
| Mongosh | `command-line/mongosh/examples/` | `command-line/mongosh/tests/` | `.js` | `Expect.outputFromExampleFiles([...]).withDbName(...).shouldMatch(...)` |

All dirs are under `code-example-tests/`. Generated snippets/outputs land
under `content/code-examples/tested/{language}/{driver}/{topic}/`.

**When the PR touches `command-line/mongosh/`, read
[references/mongosh.md](references/mongosh.md) before running the
checklist.** Mongosh examples are raw shell commands, not functions, which
changes or voids Checks 2, 3, 9, and 14 — applying the driver-oriented
wording to them produces false findings.

## Checklist

Work through these in order. For each, state a clear yes/no/partial verdict
plus the specific evidence (file path + line, or snippet name). Don't pad
findings that are clean — a one-line "yes, confirmed" is enough when there's
nothing to flag.

## Source Files

### 1. New source files are in the correct location

Example files must live under the language's `Examples`/`examples` root
(see table above), organized **by topic** (e.g., `Crud/Query`,
`Aggregation/Pipelines/Filter`), not by docs-page structure, and follow the
language's file-naming convention (e.g., `PascalCase.cs` for C#,
`kebab-case.js` for JS/Mongosh — check the language's CLAUDE.md under
`code-example-tests/{language}/` for the exact rule). Flag any new file
placed outside `Examples/`/`examples/`, misnamed for its language, or filed
under a topic that doesn't match its actual content.

### 2. Testable methods/functions

**Mongosh: N/A, skip this check** (see references/mongosh.md).

For all other languages: each snippet (`:snippet-start:`/`:snippet-end:`
block) should live inside a method or function that a unit test can call.
Ideally one snippet per method, so a test exercises exactly the code that
ends up in the snippet.

**Exception:** multi-stage constructs (e.g., an aggregation pipeline) may
define several snippets — one per stage — inside a single method, as long as
a test covers the whole method. Don't flag this as a violation.

Check: for each new/changed example file, find the enclosing
method/function for every `:snippet-start:` tag. Flag any snippet that
isn't inside a callable method, or where a method mixes multiple
independent (non-pipeline-stage) snippets.

### 3. Output files are in the correct location, with the correct extension

Output files should live alongside their example. That's the convention in
every suite; Java and C# additionally permit a shared `OutputFiles/`
directory. Anywhere else, flag it.

Output files carry an extension describing their actual content (`.json` for a single JSON document/array, `.txt` for
JSONL — one document per line, MongoDB's established convention for
multi-document results per each language's CLAUDE.md). **Mongosh uses `.sh`
— see references/mongosh.md; never flag it as a mismatch.**

Check: confirm each output file sits next to its example (or, in Java and
C#, in the shared `OutputFiles/` directory). Then open each new output file — if it's JSONL (one doc per
line) or pretty-printed single-document JSON, `.txt` is correct per
convention, don't flag it. Only flag an extension mismatch if it actively
misdescribes the content (e.g., a `.txt` file containing HTML, or genuine
structured JSON stored with a non-JSON, non-conventional extension).

## Unit Tests

### 4. Unit test location

Test location must mirror the example's location under the language's
`Tests`/`tests` root (see language reference table). Exact subtopic-level
mirroring is ideal; a test file bundling several examples from the same
topic into one file at the topic level (rather than one file per subtopic)
is a naming choice, not a location violation — note it, don't fail it.

### 5. Correct comparison APIs

All test suites must use the Grove comparison API for the language (see
table above) — never the platform's native assert/expect (e.g., raw NUnit
`Assert.That`, Go's `t.Errorf` without going through `compare.ExpectThat`,
plain `assert` in Python/JS).

Casing differs by language — C#/Go use PascalCase (as written here), the
Java/JS suites use camelCase, and Python uses snake_case. Match the casing
to the suite under review; don't flag a suite for not matching this file's
PascalCase. Method names throughout this check are written in C# form —
translate to the suite's actual API from the language reference table
before flagging anything.

`ShouldMatch` is the default and the overwhelming norm (roughly 8:1 in
mongosh). Server-generated timestamps and ObjectIds are *not* a reason to
abandon it — the comparison engine supports ellipsis patterns (`...`,
`ObjectId('...')`) and `WithIgnoredFields` for exactly that. Reach for
`ShouldResemble` only given non-determinism that an ellipsis can't express:
Atlas Vector/Search relevance ordering, or a result set whose shape (not
just its values) varies across environments.
"I can't personally guarantee the order" is not such a
reason — an unsorted `find()` over a static, read-only sample dataset is
deterministic in practice and the suites rely on it. Don't flag a missing
`sort()`, and don't suggest adding one to settle a theoretical worry.

Decision logic per test:

- **Predictable, stable shape → `ShouldMatch`** (exact comparison against a
  file).
  - Order significant? → must add `WithOrderedSort`. Otherwise nothing
    (default is unordered; flag a stray `WithOrderedSort`/
    `WithUnorderedSort` only if it contradicts the data).
  - Dynamic values (timestamps, ObjectIds)? → must add `WithIgnoredFields`
    or an ellipsis pattern in the output file.
- **Otherwise → `ShouldResemble` + `WithSchema`.** `WithSchema` always
  requires `Count` (non-negative) — flag any call missing it. Add
  `RequiredFields` to require field presence and `FieldValues` to check
  values; both default to ignoring.

`WithOrderedSort`/`WithUnorderedSort`/`WithIgnoredFields` are
`ShouldMatch`-only — flag any test combining one with `ShouldResemble`.

**Verify a `ShouldResemble` test can actually fail.** This is the most
common real defect, and it hides well because the test looks thorough:

- `RequiredFields` is presence-only — it never inspects values.
- `FieldValues` is per-document equality, so it can't express "this array
  contains one of these values." A `$in` example cannot assert its own
  semantics through `WithSchema` at all.
- The recorded file is **not** diffed against actual output. Expected and
  actual are each validated against the schema independently and the error
  lists concatenated. A 300-line recorded file is not an assertion.

Worked case — the example is
`db.movies.find({genres: {$in: [...]}}).limit(5)`:

```js
.shouldResemble("tutorial/query-arrays/find-element-in-output.sh")
.withSchema({ count: 5, requiredFields: ["_id", "title", "genres"] });
```

`count` is guaranteed by the `.limit(5)`, the rest is key presence, and the
recorded output is inert. Narrowing the filter to a single genre still
passes. Verdict **partial** — say plainly what would have to break for the
test to fail, and recommend `ShouldMatch` against the recorded file.

Conversely, a `ShouldResemble` on a deterministic query (plain CRUD filter,
fixed aggregation over static data) is under-verification: flag it and
recommend `ShouldMatch`.

### 6. Every snippet has a test

Every `:snippet-start:` tag in the diff must be exercised by some test.
Run the existing checker rather than cross-referencing by hand:

```
node code-example-tests/validate-snippets.js --suite <suite>
```

Exit 0 means every example has an associated test; exit 1 lists the ones
that don't. Report its findings, then apply the aggregation-pipeline
exception from Check 2 — one test covering a whole method covers every
stage-snippet inside it, which the script can't know.

### 7. Output files are actually used by their test

For every new/changed output file, confirm the corresponding test's
comparison call (`ShouldMatch(...)` / `ShouldResemble(...)`) references that
exact file path. Flag any output file that exists but isn't passed to a
comparison call anywhere (dead file), and any comparison call whose file
argument doesn't resolve to a file in the repo (broken reference). Reusing
an output file that already exists on `main` is normal — a path resolving
outside the diff is not itself a finding.

## Bluehawk

### 8. Bluehawk was used and generated the expected output

For every `:snippet-start:` tag, confirm a matching
`{File}.snippet.{name}.{ext}` exists under
`content/code-examples/tested/{language}/{driver}/{topic}/`. If any output
file is meant to be shown in docs (see Checks 14/15), also confirm it was
copied to the same `tested/` subdirectory — check per language, since one
language's output files being copied doesn't guarantee another's were too.

Then confirm the *content* is correct: for each generated `.snippet.*`
file, diff it conceptually against the tagged source lines plus any
`:replace-start:`/`:replace-end:`/`:remove:`/`:remove-start:`/
`:remove-end:` transforms that apply to that range. It should match
line-for-line once those transforms are applied — no extra/missing lines,
no reformatting Bluehawk wouldn't produce. A mismatch means either the
tags are misused or the file was hand-edited/copied instead of generated.

### 9. Bluehawk logic wasn't subverted

Three failure modes, all producing a snippet whose shown behavior differs
from what was tested:

- A `:replace:`/`:remove:` rule that changes query *behavior* (stripping a
  `.Limit(n)`, an options argument, a filter clause) rather than swapping a
  display-only literal.
- An `:uncomment:` block whose revealed lines were never exercised: the
  test ran them as comments, the reader runs them as code. Confirm the
  uncommented result is valid, runnable code in its own right, and that
  nothing it does contradicts the recorded output.
- Output-affecting code left *outside* the snippet tags — no tag involved,
  just tags drawn too tightly around the operative call.

**When the diff contains a `:replace:`/`:remove:`/`:uncomment:` tag, or a
snippet has an associated output file, read
[references/bluehawk-tags.md](references/bluehawk-tags.md)** for what each
tag is legitimately for, the placement rule, and the "would running exactly
this produce exactly that output?" test.

## Generated Snippets

### 10. Correct number of snippets generated

Two related but distinct problems, don't conflate them:
- **More generated files than current `:snippet-start:` tags** (the common
  case) → a snippet was renamed or removed from source but Bluehawk never
  deletes stale output. Flag every orphan by exact path and tell the author
  to delete it manually — there is no automated cleanup.
- **Too few generated snippets vs. `:snippet-start:` tags** → usually
  caught at generation time, since a malformed tag makes Bluehawk error
  out; don't expect it in a PR that's reached review. The case that does
  get here is a snippet deleted from source while a docs page still
  references it — Check 12 catches that from the docs side.

### 11. Every snippet name matches its source tag

For each generated file, confirm the `{name}` in
`{File}.snippet.{name}.{ext}` exactly matches the identifier after
`:snippet-start:` in the source (same spelling, same kebab-case). A
mismatch here usually means a tag was renamed in source without
regenerating, or the wrong snippet was copied into a docs page — flag it
even if the file otherwise looks correct, since a reviewer skimming
filenames would be misled.

### 12. Every snippet is actually used on a page (no orphan snippets)

Distinct from Check 10's *file-existence* orphans: a snippet can be
correctly generated and still never be referenced by any
`literalinclude`/`io-code-block` in `content/`. Search the docs pages
touched by (or logically related to) this PR for each snippet's generated
path. Flag any snippet with no docs reference — either the author forgot
to wire it up, or the snippet shouldn't have been created.

### 13. Snippet is still valid after `:replace:`/`:remove:`

Where Check 9 flags *behavioral* subversion, this check is about *syntax*.
If a rule fired in this snippet's range, read the generated file as a
reader would and confirm it's still syntactically valid, standalone code —
not just "close enough." See references/bluehawk-tags.md.

### 14. Snippet completeness (self-contained)

A snippet must be usable on its own: every variable/helper it references
must either be defined inside the tagged block, or be something a docs
reader would obviously already have (e.g., a client/collection handle held
as an instance field or module-level variable and used directly, matching
the established stub/base-example pattern for that language — check for an
`ExampleStub`-style file or equivalent shared setup under the language's
`Examples`/`examples` root, plus a couple of existing examples in the same
topic, before judging what's idiomatic).

Flag it when a snippet references a **local variable** assigned just
outside the tag (e.g., a collection handle re-assigned to a local one line
above `:snippet-start:`) purely to keep plumbing out of the snippet — that
produces a generated snippet that uses an undefined name. Point to the
established fix for that language: either move the assignment inside the
tags (per the stub pattern), or reference the pre-existing field/variable
directly instead of re-assigning it to a local (per existing examples in
the same topic/file).

Note: client/connection creation living *outside* the snippet is the
existing, accepted pattern — but only when that setup is itself snippeted
onto the same page, so a reader can see where `client`/`collection` comes
from. If nothing on the page defines it, the name is dangling: report it
as a page-level gap (the setup snippet is missing) rather than a defect in
the snippet under review.

## Documentation Pages

### 15. `literalinclude` points to `code-examples/tested`, with `:category:`

Every docs page that displays one of these snippets should use
`literalinclude` pointing at the `content/code-examples/tested/...` path,
not a legacy hand-maintained example file. Flag any page in the diff that
still points at an old non-`tested/` source file.

It must also define `:category:` — almost always `:category: usage
example`. Flag a `literalinclude` missing `:category:` entirely, or using
a value other than `usage example` without a clear reason.

### 16. `io-code-block` for output, both paths in `tested/`, input has `:category:`

When an output file exists for a snippet, the docs page should show both
input and output via `io-code-block`, with **both** the input and output
paths pointing into `content/code-examples/tested/...`. Flag pages that use
a bare `literalinclude` (input only) when a corresponding output file
exists — the output isn't surfaced to readers even though it was tested. If
Check 8 already found the output file wasn't copied to `tested/`, note that
this blocks adding `io-code-block` until that's fixed.

Before flagging, check whether *any* sibling snippet on the same page
surfaces its output. If none do, this is page-wide convention rather than
something the PR introduced — report it as a question for the author about
the page as a whole, not as a defect in the diff under review.

The **input** side of the `io-code-block` needs `:category:` (same rule as
Check 15 — almost always `usage example`). The **output** side does not
take a `:category:` — don't flag its absence there.

### 17. `:language:` matches extension

Every code reference (`literalinclude` or `io-code-block` input) must carry
`:language:` matching the file extension (`csharp` for `.cs`, `go` for
`.go`, etc.). Flag any code reference missing it or where it doesn't match
the actual file extension.

### 18. No leftover hard-coded `:code-block:` elements

Scan all `.txt`/`.rst` files touched by the PR for `.. code-block::` in the
languages being Grovified, plus any hard-coded output blocks. A page being
"Grovified" should have no inline runnable examples left in that language.

**Exception:** a `code-block` showing pure syntax (method signature with
placeholder tokens like `<field>`, `<value>`, a SQL comparison statement,
or a MongoDB query-filter shape used for conceptual comparison, not as a
runnable driver example) is allowed. When in doubt, note it as "possibly
intentional — confirm with the author" rather than a hard fail.

## Reporting

Default to the same interaction style used for the checklist above: answer
one check at a time as the user asks, citing file paths and line numbers.
If asked to run the "full checklist" at once, produce one short verdict
per numbered item (yes / no / partial + evidence), then a short summary of
open items to send back to the author. Don't re-explain a check that
already came back clean in more than one sentence.
