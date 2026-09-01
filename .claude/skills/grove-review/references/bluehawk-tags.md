# Bluehawk Tag Misuse

Detail for Check 9. Read this when the diff contains a `:replace-start:`,
`:replace-end:`, `:remove:`, `:remove-start:`, `:remove-end:`,
`:uncomment-start:`, or `:uncomment-end:` tag, or when a generated snippet
doesn't match its tagged source line-for-line.

## What each tag is for

`:replace-start:`/`:replace-end:` swaps a real-but-uninteresting value for a
docs-friendly placeholder: a real collection or database name for a
documented one, a real connection string for a placeholder.

`:remove:`/`:remove-start:`/`:remove-end:` drops genuinely test-only
scaffolding — setup and teardown noise that doesn't change the meaning of
what's left.

## The misuse to flag

A `:replace:` or `:remove:` rule that changes query **behavior** rather than
swapping a display-only literal: stripping a `.Limit(n)`, an options
argument, or a filter clause.

This subverts the point of testing the snippet. The test passes against the
tested (unmodified) behavior, but the code a reader actually sees behaves
differently and won't reproduce the shown output file. The reader gets code
that cannot produce the output printed directly beneath it, and nothing in
CI will ever catch that.

## `:uncomment:`

`:uncomment-start:`/`:uncomment-end:` reveals commented-out lines in the
generated snippet — typically connection setup a reader must supply but a
test must not run. In active use in the Go and Python suites.

It is the only tag that puts *never-executed* code in front of a reader.
`:replace:` and `:remove:` alter tested code on its way out; `:uncomment:`
ships lines CI processed as comments. Nothing downstream tests them.

Flag when:
- The revealed lines aren't valid, runnable code once uncommented (a
  half-commented block, a reference to a name the snippet doesn't define).
- The revealed code would change the output — it can't, since the test
  never ran it, so the recorded output file reflects the commented state.
- The block reveals more than setup: real query logic hidden behind a
  comment is untested logic in the docs.

## Placement

The `:replace-start:`/`:replace-end:` block should sit at the very top of
the file, before imports or the package declaration, so it's easy to find
and applies uniformly to every match in the file. Flag a replace block
buried mid-file.

## The same defect without any tag

The identical shown-vs-tested divergence happens with no `:replace:` or
`:remove:` involved, just by drawing `:snippet-start:`/`:snippet-end:` too
tightly. A `.limit(5)`, `.sort(...)`, projection, or options argument that
sits outside the tags still shapes the recorded output file.

For each snippet with an associated output file, read the generated snippet
alone and ask: **would running exactly this produce exactly that output?**
If not, the tags need to move to include the operative code.

This is the mirror image of Check 14. That one catches names the snippet
uses but doesn't define; this one catches behavior the snippet omits but the
output depends on.

## Syntactic validity after a transform (Check 13)

Where the above is about *behavioral* subversion, Check 13 is about
*syntax*. If a `:replace:` or `:remove:` rule fired anywhere in a snippet's
range, read the generated file as a reader would and confirm it's still
syntactically valid, standalone code — not just "close enough." A botched
replace or remove can leave a dangling comma, an unclosed block, or a
reference to something that was removed.
