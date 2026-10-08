# Netlify Redirect Patterns for Atlas CLI Version Releases

Load this file when updating `content/atlas-cli/netlify.toml` for a major or minor Atlas CLI release (Step 6 of the atlas-cli-release skill). Replace `<former-version>` with the former current version (for example, `v1.49`).

## ALIAS REDIRECTS Section

Find the redirect pointing to the current URL under `### ALIAS REDIRECTS` and change the version number in the `from` line to the new version.

## First CATCH ALLS Section

Find the two intermediary redirects for `current` and add two new intermediary redirects for the former current version:

```toml
[[redirects]]
from = "/docs/atlas/cli/<former-version>/*"
to = "/docs/atlas/cli/intermediary/<former-version>/:splat"

[[redirects]]
from = "/docs/atlas/cli/intermediary/<former-version>/*"
to = "/docs/atlas/cli/<former-version>"
```

## Second CATCH ALLS Section

Under `### CATCH ALLS (add slug to paths without slug)`, find the redirect for the current version and add a redirect for the former current version immediately below:

```toml
[[redirects]]
from = "/docs/atlas/cli/<former-version>/*"
to = "/docs/atlas/cli/<former-version>/:splat"
status = 200
```
