# Report template

Output is a pointer list, not a report — orient, then point:

```
## Tech Review Pointers — <docs file(s)/section(s) touched>
Mode: <A: eng PR+Jira / B: no eng PR, Jira+release notes / D: no eng PR, checked against current source>

The docs PR <adds/updates/removes> <what the writer did, plain language>
(<eng ticket ref, or "no eng ticket"> — <one-clause synthesis of the change>).

Confidence: <low/med/high>. <Plain statement grounded in content of what
checks out — not an invented count, e.g. "Defaults, timeline, and removal
version all match the eng change.">
Testing: <one clause, only if code examples changed — e.g. "New Grove test
added (path)." or "No Grove tests found for the new examples.">
- <optional second fact, ≤1 line, only if it needs the reviewer's action —
  e.g. "Confirm it's green in CI" or a specific mismatch to check. Omit
  entirely if the first line is the whole story.>

- [Gap] <what's missing, ≤1 line> — <why it's only visible in the diff/source>.
- [Verify] <the claim, ≤1 line> — <where to check it, ≤1 line>.
- [Confirm] <the completeness question, ≤1 line>?
```

## Confidence rubric

- **High** — every public-contract change unit maps directly to a diff line
  with no inference required.
- **Medium** — one or more units required inference, or the source is Mode B
  (Jira/release notes, not a diff).
- **Low** — heavy inference throughout, or the ticket/diff is too thin to
  check units against.

## Worked example (illustrative, not a real ticket)

```
## Tech Review Pointers — read-preference.txt
Mode: A: eng PR+Jira

The docs PR adds a note that `maxStalenessSeconds` now rejects values under
90 (DOCSP-9999 — driver adds a hard-floor validation).

Confidence: high. The 90-second floor and the error name match the eng diff.
Testing: New Grove test added (code-example-tests/node/.../tests/read-pref.test.js).

- [Gap] Docs don't mention the new `InvalidStalenessError` thrown below the
  floor — only visible in driver.go:412, not in the ticket.
- [Verify] Docs say the floor "applies to secondaries only" — check
  driver.go:398, which reads as applying cluster-wide.
```

## Constraints

Apply on top of the design commitments in SKILL.md — commitment 2's "evidence
over scores" and commitment 3's "precision over recall" already govern this
section, not restated here.

- **Lead with the writer's action, not the eng ticket.** "The docs PR adds a
  note describing X" — not "Eng ticket Y adds X."
- **One line per item, two absolute max (Gap/Verify/Confirm).** If it takes
  more than that to state, it has not cleared the inclusion test yet —
  sharpen it or drop it. The Testing note may take one extra bullet line for
  a specific action item, but no more.
- **Nothing after the last bullet.** No summary of what's empty ("no Gap/
  Confirm items because..."), no restating why items cleared the inclusion
  test, no closing question to the writer. If a bullet category is empty,
  simply omit it — do not explain the absence. The report ends at the last
  bullet line, full stop.
- **Total list ≤5 items.** If more clear the inclusion test, that itself is a
  signal the change may be too large or too loosely scoped for a single pass.
- **Skip "docs changes with no eng counterpart" entirely** unless one asserts
  new behavior not backed by the eng change.
