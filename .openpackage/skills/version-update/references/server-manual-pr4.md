# Server Manual PR 4 Reference

Load this file before beginning PR 4. PR 4 requires DOP/Anabella review
before merge.

---

## `netlify.toml` Structure

`content/manual/netlify.toml` is organized into these `###` sections,
in order:

```
### EOL REDIRECTS
### ALIAS WILDCARD REDIRECTS
### MAJOR REDIRECTS              (per-page redirects for v4.4–v7.0)
### UPCOMING REDIRECTS
### WILDCARD REDIRECTS
### MANUAL REDIRECTS             (per-page redirects for the current `manual` version)
### <archived-version> REDIRECTS (one section per archived version, e.g. `### 8.0 REDIRECTS`)
### CATCH-ALL REDIRECTS
```

The per-archived-version sections (`### 8.0 REDIRECTS` and similar) are
**siblings** of `### MANUAL REDIRECTS`, not nested subsections — they
sit between MANUAL REDIRECTS and CATCH-ALL REDIRECTS. Each is a full
per-page redirect block (the file does **not** use a one-line
`status = 200` direct-serve catch-all for archived versions).

---

## Changes Required

1. **ALIAS WILDCARD REDIRECTS**: Update the `from` line for the
   `manual`-alias redirect to use `v{RELEASING}` (e.g.,
   `/docs/v9.0/*`). **Repoint** the existing `upcoming`-alias `from`
   from `/docs/v{RELEASING}/*` to `/docs/v{NEXT}/*` (it currently
   points the just-released version at `upcoming/`); add a new entry
   only if no `upcoming`-alias exists. Also update the two comment
   lines: `# manual has aliases […, v{RELEASING}]` and
   `# upcoming has aliases [v{NEXT}]`.

2. **MANUAL REDIRECTS → new `### v{OUTGOING} REDIRECTS` section**:
   Copy every `[[redirects]]` entry from the `### MANUAL REDIRECTS`
   block. (`### MANUAL REDIRECTS` ends where the next `###` header
   begins — the per-archived-version sections that follow are siblings,
   not children, so the boundary is unambiguous.) Paste the copied
   entries into a new `### v{OUTGOING} REDIRECTS` section placed
   immediately before `### CATCH-ALL REDIRECTS`, alongside the existing
   archived-version sections. In each copied entry, replace
   `/docs/manual/` with `/docs/v{OUTGOING}/` in both `from` and `to`.
   Add a comment at the top of the new section noting the version and
   flip date.

3. **MAJOR REDIRECTS**: No change required on the flip. (`v{OUTGOING}`
   is still actively served — it only moves into `MAJOR REDIRECTS`
   later, on full EOL.)

Get DOP/Anabella review on PR 4 before merging.
