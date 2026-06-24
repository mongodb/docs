Next.js does support combining a `:version` named parameter with a `:path` in the same rule. Write one entry using both of these variables:

```json
{
    "source": "/docs/<slug>/:version/<old-path>/:path*",
    "destination": "/docs/<target-slug>/:version/<new-path>/:path*",
    "statusCode": 301
}
```

Before writing the paths, check the `<project>-redirects.json` for conflicts:
- If any file in the group already has an individual `source` entry (especially with `"force": true`), that file's existing redirect takes precedence. Write the splat anyway for the group — the more-specific entry above it will match first. Do not skip the splat because of one exception.
- If the splat itself (`"source": ".../:path*"`) already exists in the file pointing to the same destination, skip writing it.

If the directory move only partially applies (some files in the source directory were not renamed), do not use a splat — write individual entries for each renamed file only.

Use the active version list (see Step 5) to determine which versions need entries.