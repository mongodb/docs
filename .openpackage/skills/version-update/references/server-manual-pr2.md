# Server Manual PR 2 Reference

Load this file before beginning PR 2. All changes below target the
`manual/` tree (which is now a copy of `upcoming/` after PR 1) and the
`upcoming/` tree where noted.

---

## In-dev cleanup (`manual/`)

Remove `.. include:: /includes/in-dev.rst` from every page in
`manual/source/` that carries it. The `{RELEASING}` release-notes pages
and installation pages are the primary locations.

## RC label stripping (`manual/`)

Search `manual/source/release-notes/` for any release-notes titles that
include an RC label (e.g., `8.3 Release Notes (Release Candidate)`).
Remove the parenthetical so only the version number and "Release Notes"
remain.

## Minor-release banner (`upcoming/`)

The `upcoming/source/includes/minor-release.rst` include renders
"MongoDB `{+current-minor-release+}` is the latest minor release."
It must appear on **exactly** the release-notes files whose series
equals `current-minor-release`.

- **[minor]** `current-minor-release` becomes `{RELEASING}` → add the
  include to `{RELEASING}-*` release-notes files; remove it from
  `{OUTGOING}-*` files.
- **[major/LTS]** `current-minor-release` stays `{OUTGOING}` → keep it
  on `{OUTGOING}-*` files; no additions needed.
- **Both**: remove any stray include from other series.

## Release-notes index restructure (`manual/`)

`manual/source/release-notes.txt` inherited the upcoming-site shape
from the PR 1 copy. Edit it to the released-manual shape, using
`v{OUTGOING}/source/release-notes.txt` as the template:

- Delete the entire `Upcoming Stable Release` section (the heading, the
  `(*{RELEASING}-series*)` line, and the
  `- :ref:\`release-notes-{RELEASING}\`` bullet beneath it).
- Under the `Current Stable Release` heading: change
  `(*{OUTGOING}-series*)` → `(*{RELEASING}-series*)` and
  `- :ref:\`release-notes-{OUTGOING}\`` →
  `- :ref:\`release-notes-{RELEASING}\``.
- Under `Previous Stable Releases`: prepend
  `- :ref:\`release-notes-{OUTGOING}\`` as the first entry.
- In the hidden `toctree`:
  - `{RELEASING} (Upcoming) </release-notes/{RELEASING}>` →
    `{RELEASING} (Stable Release) </release-notes/{RELEASING}>`
  - `{OUTGOING} (Stable Release) </release-notes/{OUTGOING}>` →
    `{OUTGOING} </release-notes/{OUTGOING}>`

## In-dev cleanup (`upcoming/`)

The PR 1 copy leaves `{RELEASING}` release-notes pages in both
`manual/` and `upcoming/`. The `manual/` cleanup above handles the
`manual/` copies; also remove `.. include:: /includes/in-dev.rst` from
the same three pages still in `upcoming/`:

- `upcoming/source/release-notes/{RELEASING}.txt`
- `upcoming/source/release-notes/{RELEASING}-changelog.txt`
- `upcoming/source/release-notes/{RELEASING}-compatibility.txt`

Do not remove the include from `upcoming/index.txt`, installation pages,
or the new `{NEXT}` release-notes pages (those are handled in PR 3).
Sanity check: the prior-GA `{OUTGOING}-*` pages in `upcoming/` should
carry zero `in-dev` includes after this step.
