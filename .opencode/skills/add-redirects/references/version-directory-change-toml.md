Netlify does not support combining a `:version` named parameter with a `:splat` in the same rule. Write one entry per active version with the version hardcoded in the path:

```toml
[[redirects]]
from = "/docs/<slug>/v8.0/<old-dir>/*"
to = "/docs/<slug>/v8.0/<new-dir>/:splat"

[[redirects]]
from = "/docs/<slug>/v7.0/<old-dir>/*"
to = "/docs/<slug>/v7.0/<new-dir>/:splat"
```

Before writing the splat(s), check the netlify.toml for conflicts:
- If any file in the group already has an individual `from =` entry (especially with `force = true`), that file's existing redirect takes precedence. Write the splat anyway for the group — the more-specific entry above it will match first. Do not skip the splat because of one exception.
- If the splat itself (`from = ".../*"`) already exists in the file pointing to the same destination, skip writing it.
- Place the splat in the WILDCARD REDIRECTS section (or above the CATCH ALLS if no WILDCARD section exists), not in PAGE-SPECIFIC REDIRECTS.

If the directory move only partially applies (some files in the source directory were not renamed), do not use a splat — write individual entries for each renamed file only.

Use the active version list from the ALIAS REDIRECTS section (see Step 5) to determine which versions need entries.