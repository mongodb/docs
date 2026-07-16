# Django MongoDB Backend

**Add for:** major, minor, and patch releases

| Variable | Value |
|---|---|
| `GITHUB_REPO` | `mongodb/django-mongodb-backend` |
| `RELEASE_NOTES_FILE` | `content/django-mongodb/upcoming/source/reference/release-notes.txt` |
| `CHANGELOG_LINK` | `mongodb/django-mongodb-backend/blob/main/docs/releases/{MAJOR_VERSION.x}.rst` — do not link to the changelog |
| `UPGRADE_REF` | n/a — no upgrade guide |

## Fetching the release notes (Step 1 override)

Django MongoDB Backend does not publish GitHub Releases. Instead, fetch the changelog from the link provided in the `CHANGELOG_LINK` variable.

The changelog link points to the release notes for the major version (X.Y) in the driver repository. Within the changelog, look for the section header that corresponds to the new version.

- Section name: `Version {VERSION}` (not `What's New in {VERSION}`)
- Breaking changes: no upgrade guide. Use the **Django MongoDB Backend:
  Breaking Changes Admonition** template from `references/docs-templates.md`
  immediately following the `Version {VERSION}` header.
