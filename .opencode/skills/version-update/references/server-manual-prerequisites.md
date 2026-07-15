# Server Manual Prerequisites

Load this file when the docset is `manual`. Confirm all prerequisites
below with the user before making any changes.

Authoritative process reference: [Version Flip Process](https://wiki.corp.mongodb.com/pages/viewpage.action?pageId=427469440)

The Server Manual version flip is a **four-PR process** that renames
directories, strips in-development markers, updates version constants
and backport config, and rewrites Netlify redirects. Each PR must be
reviewed and merged before the next begins.

---

## Version Information

The flip requires four version values. Two can be read from snooty.toml;
two have no automated source and must be supplied by the user.

**Prompt the user for NEXT before reading any files.**

| Variable | Source | Example |
|----------|--------|---------|
| `RELEASING` | Auto-read: `version` in `upcoming/snooty.toml` | `8.3` |
| `OUTGOING` | Auto-read: `version` in `manual/snooty.toml` | `8.2` |
| `NEXT` | **User-supplied** — no automated source | `8.4` |

After the user supplies NEXT, read
`content/manual/upcoming/snooty.toml` and `content/manual/manual/snooty.toml`
to confirm RELEASING and OUTGOING. Surface all three values together and
ask the user to confirm before proceeding.

---

## Release Type

Before proceeding, identify whether this is a **minor** or **major/LTS**
flip. Prompt the user if not clear from the version numbers (e.g., 8.3 →
8.4 is minor; 8.x → 9.0 is major/LTS). Record the result as `FLIP_TYPE`
(either `minor` or `major_lts`).

Steps and constants below are annotated **[minor]** and **[major/LTS]**
where behavior differs.

---

## Prerequisites Checklist

Stop and confirm that all of the following are true before proceeding:

### Team coordination
- [ ] Code freeze has been announced in the team Slack channel at least
  three days before the flip date. Writers should not merge new content
  to `upcoming/` during the flip.
- [ ] Engineering has confirmed the GA date for the RELEASING version.
- [ ] DOP/Anabella is aware of and available to review PR 4
  (the `netlify.toml` redirect changes). PR 4 must not be merged without
  DOP review.

### Content readiness
- [ ] Release notes for RELEASING are complete in
  `upcoming/source/release-notes/{RELEASING}.txt` and its companion
  files (`{RELEASING}-compatibility.txt`, `{RELEASING}-changelog.txt`).
  Release notes for the Server Manual are authored by the writer — there
  is no GitHub source to fetch automatically.
- [ ] All content PRs targeting the RELEASING version have been merged
  to `main`. No open PRs should be targeting files that will be renamed
  in PR 1.

---

## Four-PR Structure

The flip proceeds across four PRs in this order:

| PR | Scope | DOP review required? |
|----|-------|----------------------|
| PR 1 | Directory operations — rename `manual/` to `v{OUTGOING}/`, then copy `upcoming/` to `manual/` | No |
| PR 2 | Content cleanup — strip in-dev and RC markers from `manual/`; update `minor-release.rst` includes in `upcoming/`; restructure `manual/source/release-notes.txt`. See `server-manual-pr2.md`. | No |
| PR 3 | Config and upcoming updates — `.backportrc.json`, `upcoming/snooty.toml` constants, ToC files, `{NEXT}` release-notes stubs, `in-dev.rst` includes. See `server-manual-pr3.md`. | No |
| PR 4 | Redirect updates in `netlify.toml` — alias redirects, archived version catch-alls, new `v{OUTGOING}` redirect block. See `server-manual-pr4.md`. | **Yes — Anabella must review before merge** |

Before beginning each PR, read the corresponding reference file for
execution details.

**PR 1 — directory operations**: Run the following two commands to
archive `manual/` and promote `upcoming/`:

```bash
mv content/manual/manual content/manual/v{OUTGOING}
cp -rP content/manual/upcoming content/manual/manual
```

`mv` is atomic and avoids a destructive `rm -rf`. `cp -rP` copies
symlinks as-is without following them, which is required because
`content/manual/manual/source/tested` is a broken symlink.

Confirm the four-PR scope with the user before proceeding to Step 2.
