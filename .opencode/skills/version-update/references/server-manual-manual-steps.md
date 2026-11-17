# Server Manual Post-Automation Steps

Load this file for Step 11 when the docset is `manual`. Surface all steps below to the user — these are manual tasks that cannot be automated.

---

## After All Four PRs Are Merged

### 1. Verify the deployed site

- Confirm `https://www.mongodb.com/docs/manual/` reflects the RELEASING version content.
- Confirm `https://www.mongodb.com/docs/upcoming/` still resolves to the in-development NEXT version.
- Confirm `https://www.mongodb.com/docs/v{OUTGOING}/` resolves to the archived version and does not redirect to `manual/`.
- Spot-check several release notes pages and installation pages to verify in-development banners are gone from `manual/` and present in `upcoming/`.

### 2. Verify the version selector

The version selector is driven by `platform/versioning/projects/docs.ts`, which is edited in PR 3 — see the **Server Manual** section of `versioning-catalog-updates.md`. Confirm the dropdown shows:

- `{NEXT} (Upcoming)` for `upcoming/`
- `{RELEASING} (Current)` for `manual/`
- the OUTGOING version in the correct release group

Check this on the PR's staging preview, which builds from the branch's own versioning data, so a wrong label is caught before merge rather than on the live site. Re-confirm on the deployed site afterward.

### 3. Confirm archiving with Sarah Lin

Verify with Sarah Lin whether to retire the version that was in `manual/` before the previous flip (one version older than OUTGOING). If she confirms:

- In `platform/versioning/projects/docs.ts`, set `active: false` on that version's entry and add `eol: "download"`.
- Confirm the inactive version still redirects correctly to `manual/`.

That catalog edit is the version-selector half of retiring a version, and it is as far as this skill goes. The rest of the EOL work is out of scope — hand it off to [Addressing EOL Docs Versions](https://wiki.corp.mongodb.com/spaces/DOC/pages/499161146/Addressing+EOL+Docs+Versions) rather than attempting it here. Do not use the catalog's `noIndexing` property for EOL; that property is for `upcoming`.

### 4. Lift the code freeze

Announce in the team Slack channel that the freeze is lifted and writers may resume merging to `upcoming/`.

### 5. Announce the release

Post a brief release announcement in the relevant Slack channels (at minimum `#docs-server`) noting the new version now live at `/docs/manual/` and the OUTGOING version available at `/docs/v{OUTGOING}/`.
