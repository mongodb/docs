# Server Manual Post-Automation Steps

Load this file for Step 11 when the docset is `manual`. Surface all
steps below to the user — these are manual tasks that cannot be
automated.

---

## After All Four PRs Are Merged

### 1. Verify the deployed site

- Confirm `https://www.mongodb.com/docs/manual/` reflects the
  RELEASING version content.
- Confirm `https://www.mongodb.com/docs/upcoming/` still resolves
  to the in-development NEXT version.
- Confirm `https://www.mongodb.com/docs/v{OUTGOING}/` resolves to
  the archived version and does not redirect to `manual/`.
- Spot-check several release notes pages and installation pages to
  verify in-development banners are gone from `manual/` and present
  in `upcoming/`.

### 2. Hapley version selector update

Hapley requires coordination with DOP (Anabella) before changes go
live. Take screenshots of all changes and send them to DOP in the
`#docs-platform` Slack channel before saving.

On the Server Manual page in Hapley (hapley.corp.mongodb.com):

1. Update the **`upcoming`** entry:
   - Change **Selector Label** to `v{NEXT} (Upcoming)`.
2. Take a screenshot of the updated entry.
3. Send the screenshot to DOP (Anabella) for review. Wait for
   confirmation before saving if DOP requests changes.
4. Deploy all versions after saving.

### 3. Confirm archiving with Sarah Lin

Verify with Sarah Lin whether to retire the version that was in
`manual/` before the previous flip (one version older than OUTGOING).
If she confirms:

- In Hapley, mark that version as inactive following the sunset process.
- Confirm the inactive version still redirects correctly to `manual/`.

### 4. Lift the code freeze

Announce in the team Slack channel that the freeze is lifted and
writers may resume merging to `upcoming/`.

### 5. Announce the release

Post a brief release announcement in the relevant Slack channels
(at minimum `#docs-server`) noting the new version now live at
`/docs/manual/` and the OUTGOING version available at
`/docs/v{OUTGOING}/`.
