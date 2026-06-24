Use this form when the same page rename or delete applies across **all active versions** of a versioned project. A single `:version` wildcard covers every version — do not also write per-version entries for the same path (that creates duplicates).

Variables:
- `<slug>` — the URL segment for the project (read from existing `[[redirects]]` entries in `netlify.toml`, not from `name` in `snooty.toml`)
- `<old-path>` — the URL path for the deleted or renamed page, relative to the version segment (e.g., `replication/replica-set-delayed-member`)
- `<new-path>` — the URL path for the destination page

```toml
[[redirects]]
from = "/docs/<slug>/:version/<old-path>/"
to = "/docs/<slug>/:version/<new-path>/"
```

Place this in the **WILDCARD REDIRECTS** section of `netlify.toml` (or above the CATCH ALLS block if no WILDCARD section exists). Do not place it in PAGE-SPECIFIC REDIRECTS.

Before writing, verify no existing wildcard already covers this old path. If one does, skip this entry.
