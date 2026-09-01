# Mongosh Suite Exceptions

Mongosh is a different shape from the driver suites. Apply these exceptions
in place of the driver-oriented wording in the checklist. The authority for
anything not covered here is
`code-example-tests/command-line/mongosh/CLAUDE.md`.

## Why it differs

Mongosh examples are raw shell commands executed as a subprocess, not
functions in a compiled or imported module. There is no class, no method
wrapper, and no connection scaffolding in the example file — the runner
supplies the database context via `.withDbName(...)`.

## Per-check exceptions

**Check 2 (testable methods): N/A — skip it.** There's no enclosing method
to find, because there are no methods. Treat every `:snippet-start:` as
inherently testable and record the check as N/A rather than pass or fail.

**Check 3 (output file extension): `.sh` is correct.** Mongosh output files
use `.sh` by convention, not `.json`/`.txt`. Never flag `.sh` as an
extension mismatch here. Output files are copied to `tested/` unmodified —
they are not run through Bluehawk, so unlike input files they never carry a
`.snippet.` infix.

**Check 9 (Bluehawk misuse): tags are normally absent entirely.** Example
files have no imports, exports, or connection strings to hide, so there's
usually nothing for `:replace:`/`:remove:` to do. Their absence is expected
and is not a gap. If a tag *is* present, apply the normal misuse check from
[bluehawk-tags.md](bluehawk-tags.md).

**Check 14 (self-contained snippets): no local-variable scaffolding.** There
are no local handles assigned outside the tag, so the usual failure mode
doesn't arise. Treat a snippet as self-contained unless it references
something undefined outside a `db.<collection>` call.

## Comparison API casing

Mongosh is a JS suite, so the API is camelCase: `shouldMatch`,
`shouldResemble`, `withSchema`, `withDbName`. The checklist writes these in
PascalCase (the C#/Go form). Don't flag camelCase here.

The full call shape:

```js
await Expect
  .outputFromExampleFiles(["topic/subtopic/example.js"])
  .withDbName(dbName)
  .shouldMatch("topic/subtopic/example-output.sh");
```

## Determinism in this suite

The mongosh suite relies on stable natural order over static, read-only
sample datasets, and does so at scale: `shouldMatch` outnumbers
`shouldResemble` roughly 8:1 (410 vs 50), and 106 of 141 `find()` examples
have no `sort()`. Do not flag a missing `sort()`, and do not suggest adding
one to satisfy a theoretical determinism worry — it puts noise into an
example whose subject is something else.

These are point-in-time counts. Re-measure if the guidance is disputed:

```
grep -rn "shouldMatch" code-example-tests/command-line/mongosh/tests | wc -l
grep -rn "shouldResemble" code-example-tests/command-line/mongosh/tests | wc -l
```
