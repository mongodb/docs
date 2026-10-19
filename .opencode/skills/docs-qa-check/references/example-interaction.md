# Example Interaction

A complete worked example of a `docs-qa-check` run: the questions-paste flow, the confirmation step, and the final report a writer sees.

**User:** `test my docs for DOCSP-62564 — does the page explain what happens if overload protection is disabled mid-migration?`

**Claude:** No Q&A file found for DOCSP-62564. Paste your questions and expected answers (any format) and I'll parse them into `.claude/qa-validation/DOCSP-62564.yaml`.

**User:** *(pastes 6 question/answer pairs)*

**Claude:** *(shows the parsed batch back for confirmation, then writes the file)*

Scope: 2 pages changed on this branch. Rendering, answering, grading...

| Question | Verdict | Provenance | Cited passage |
|---|---|---|---|
| What is the default value of the new setting? | Pass | attributable | "Off by default for deployments auto-upgrading from 8.3..." — `reference/parameters.txt:142` |
| What happens if overload protection is disabled mid-migration? | Not covered | — | — |
| How do you enable the setting on an existing cluster? | Partial | attributable | "...via the `overloadProtection` parameter" — `reference/parameters.txt:150` (missing the restart requirement) |

Flagged: 1 page contains a diagram (`architecture.txt`) — reduced coverage confidence for questions about it.

Ready to revise and re-run against the same Q&A file?
