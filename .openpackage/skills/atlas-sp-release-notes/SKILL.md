---
name: atlas-sp-release-notes
internal: true
description: Draft Atlas Stream Processing release notes from a DOCSP ticket by fetching the linked internal Confluence wiki page and adding a dated entry to the changelog. Use when asked to draft or create Atlas Stream Processing / ASP release notes.
allowed-tools: Read, Grep, Glob, Edit, Skill, Bash, mcp__glean__search, mcp__glean__read_document
argument-hint: "[DOCSP ticket key or Confluence URL] e.g. DOCSP-64329"
---

# Draft Atlas Stream Processing Release Notes for $ARGUMENTS

Atlas Stream Processing (ASP) is closed-source and unversioned
(continuous release), so this workflow does not follow
`release-notes-base` (which only covers products with public GitHub
releases). The source of truth here is an internal Confluence wiki
page linked from the DOCSP ticket, not a GitHub tag.

This skill is for interactive/writer sessions, where Glean can read
internal Confluence pages. It does not address Sage Bot's separate
credential gap for automated runs.

## Workflow

### 1. Resolve the source

- If `$ARGUMENTS` is a DOCSP ticket key, use the `jira` skill to view
  it. Extract:
  - The release date, from the ticket summary
    (`RELEASE NOTES - Atlas Stream Processing: <Month D, YYYY>`).
  - The Confluence URL from the description (it links the
    "User-Facing Features and Behavior Changes" section for that
    date).
- If `$ARGUMENTS` is already a Confluence URL (`wiki.corp.mongodb.com/...`),
  skip the Jira lookup and take the release date from the page title
  instead (e.g. "Sept 10 2026").
- If neither a valid ticket key nor a Confluence URL can be resolved,
  stop and ask the writer for one.

### 2. Fetch the wiki content

Use `mcp__glean__read_document` with the Confluence URL to fetch the
page content. Look specifically for the "User-Facing Features and
Behavior Changes" section — this is the only section that belongs in
the public changelog; other sections on the same page (e.g. internal
metrics, engineering-only notes) are out of scope.

If Glean returns no content, an empty page, or an access/permission
error, **stop and ask the writer** to paste the change list directly
into the ticket or chat. Do not fabricate or infer entries from the
ticket title alone — this is the exact failure mode that made
DOCSP-63395 and DOCSP-64329 unworkable for Sage Bot, and the same repo
policy against inventing technical facts applies here.

### 3. Determine the target file

Target file: `content/atlas/source/includes/changelog/atlas-sp-<YEAR>.rst`,
where `<YEAR>` is the year of the release date resolved in step 1.

If that file does not exist yet (a new year), stop and ask the writer
how to proceed rather than creating the file and wiring a new
`.. include::` into
`content/atlas/source/atlas-stream-processing/changelog.txt` silently.

### 4. Read existing formatting

Read the first ~40 lines of the target file to confirm the current
anchor, heading, and bullet conventions before drafting. Entries are
in reverse-chronological order (newest first).

### 5. Check for embargoed terms

Use Glean to fetch the Embargoed Features List
(https://wiki.corp.mongodb.com/pages/viewpage.action?pageId=560136334)
and return every embargoed feature name and its aliases.

Scan the change list fetched in step 2 for any embargoed feature name
or alias, matching case-insensitively and including aliases.

If any change matches an embargoed term, **stop before drafting**:
report the matching term and the affected changes to the writer, then
ask how to proceed.

### 6. Draft the new entry

Insert a new dated section at the top of the target file (verify the
current top entry's date is in fact older than the new one before
inserting):

```
.. _atlas-sp-YYYYMMDD:

D Month YYYY Release
--------------------

- Adds ...
```

- Anchor: `.. _atlas-sp-YYYYMMDD:` (zero-padded, e.g. `20260910`).
- Heading: `D Month YYYY Release` (e.g. `10 September 2026 Release`).
  The underline (`-`) must match the heading's raw text length exactly
  — there is no substitution in this heading, so no rendered-vs-source
  distinction applies. Confirm against the existing top entry in the
  file.
- Bullets start with a present-tense verb (Adds/Fixes/Improves/
  Updates/Removes), one change per bullet, wrapped at 72 characters
  with a 2-space continuation indent for wrapped lines, per
  `.claude/rules/rst-conventions.md`.
- If a wiki bullet references a doc page (e.g. "To learn more, see..."),
  carry over the `:ref:`, `:pipeline:`, or `:authrole:` role only after
  verifying the label exists in the codebase. Do not invent a label —
  if no matching label exists, flag the bullet to the writer instead of
  guessing or dropping the cross-reference silently.
- Preserve `{+atlas-sp+}` and other existing substitutions used
  elsewhere in the file as-is; do not introduce new substitutions.

### 7. Report and confirm

Report the file changed. Note that the content originated from an
internal wiki page and recommend the writer spot-check the drafted
entry against the live Confluence page, since automated extraction can
drop formatting or links.

Ask if the writer is ready to run `./lint-docs.sh all
content/atlas/source/includes/changelog/atlas-sp-<YEAR>.rst` and then
commit. Do not commit automatically.

## Worked example (DOCSP-63395)

DOCSP-63395 closed without an edit after Sage Bot could not read the
linked Confluence page (no credential bound for its service account);
below is what an interactive run resolves to, matching the entry
actually committed for that release.

1. **Resolve the source.** `$ARGUMENTS = DOCSP-63395`. The `jira` skill
   returns summary `RELEASE NOTES - Atlas Stream Processing: Aug 19,
   2026` and a description linking
   `https://wiki.corp.mongodb.com/spaces/ASP/pages/560370137/Aug+19+2026`.
   Release date: **19 August 2026**.
2. **Fetch the wiki content.** The page's "User-Facing Features and
   Behavior Changes" section describes Private Link support added for
   the `$externalFunction` aggregation stage.
3. **Target file.** `content/atlas/source/includes/changelog/atlas-sp-2026.rst`
   (year 2026, file already exists).
4. **Read existing formatting.** The current top entry is
   `5 August 2026 Release` — the new 19 August entry sorts above it.
5. **Embargo check.** No match against the Embargoed Features List.
6. **Draft the entry:**
   ```
   .. _atlas-sp-20260819:

   19 August 2026 Release
   ----------------------

   - Adds Private Link support for the :pipeline:`$externalFunction`
     aggregation stage. To learn more, see
     :ref:`atlas-sp-pl-aws-lambda-add`.
   ```
   The `:ref:` target was verified to exist in the codebase before
   use — it isn't invented.
7. **Report.** "Added a 19 August 2026 entry to atlas-sp-2026.rst.
   Ready to lint and commit?"

This is the entry now live at
`content/atlas/source/includes/changelog/atlas-sp-2026.rst:35-42`.
