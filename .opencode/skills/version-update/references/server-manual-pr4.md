# Server Manual PR 4 Reference

Load this file before beginning PR 4. PR 4 requires DOP review before
merge.

---

## Redirect file

Server Manual's redirects are managed in
`platform/docs-site/src/redirects/manual-redirects.json`, not
`netlify.toml` — `content/manual/netlify.toml` still exists on disk but
is no longer edited (see the preamble of `nextjs-redirects-updates.md`).

Apply the **Server Manual** section of `references/nextjs-redirects-updates.md`
for this PR:

1. Bump the released-version alias entry's `source` version number in
   place (`stable` and `current` are static and don't change).
2. Add **no** entry for the version that just stopped being current —
   it serves directly from its own archived directory.
3. Per-page redirects for the newly archived version are `add-redirects`
   territory, not version-update's — do not generate that block here.
4. If a version ages fully out of support this release, add its 301
   entry redirecting to `/docs/manual/:path*`.

Get DOP review on PR 4 before merging, exactly as with the prior
`netlify.toml` process.
