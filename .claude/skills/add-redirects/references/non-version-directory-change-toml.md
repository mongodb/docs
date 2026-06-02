Use this form for **unversioned projects** (e.g., `atlas`, `compass` — a single `source/` directory with no version subdirectory) when four or more renamed files share the same source and destination directory prefix. For three or fewer renames, write individual entries instead.

Variables:
- `<slug>` — the URL segment for the project (read from existing `[[redirects]]` entries in `netlify.toml`)
- `<target-slug>` — the destination project slug; same as `<slug>` for moves within a project, different for cross-project moves
- `<old-dir>` — the source directory path relative to `/docs/<slug>/` (e.g., `atlas-vector-search/tutorials`)
- `<new-dir>` — the destination directory path relative to `/docs/<target-slug>/`

```toml
[[redirects]]
from = "/docs/<slug>/<old-dir>/*"
to = "/docs/<target-slug>/<new-dir>/:splat"
```

Before writing, check the `netlify.toml` for conflicts:
- If any file in the group already has an individual `from =` entry (especially with `force = true`), that file's existing redirect takes precedence. Write the splat anyway — the more-specific entry above it matches first. Do not skip the splat because of one exception.
- If this splat already exists in the file pointing to the same destination, skip writing it.

Place the entry in the **WILDCARD REDIRECTS** section (or above the CATCH ALLS block if no WILDCARD section exists). Do not place it in PAGE-SPECIFIC REDIRECTS.

If the directory move only partially applies (some files in the source directory were not renamed), do not use a splat — write individual entries for each renamed file only.
