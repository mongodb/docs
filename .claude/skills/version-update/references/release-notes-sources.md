# Release Notes Sources

Load this file when release notes are required for a version update and
you need to check whether the docset has a known GitHub source to fetch
from automatically. This file covers Kafka, AKO, MCK, and product
docsets. Driver and framework docsets are handled by the
`drivers-release-notes` skill.

## Repo Mapping

### Connectors

| Docset | GitHub repo | Tag format | Example tag |
|--------|-------------|------------|-------------|
| `kafka-connector` | `mongodb/mongo-kafka` | `r{version}` | `r2.1.0` |

### Product docsets

| Docset | GitHub repo | Tag format | Example tag | Fetch behavior |
|--------|-------------|------------|-------------|----------------|
| `atlas-operator` | `mongodb/mongodb-atlas-kubernetes` | `v{version}` | `v2.14.1` | Link-only (see below) |
| `kubernetes` | `mongodb/mongodb-kubernetes` | `{version}` | `1.8.0` | Link-only (see below) |

**AKO and MCK (link-only pattern)**: These docsets do not embed release
body content. Instead, confirm the tag exists, then insert a single line
linking to the GitHub release following the existing pattern in the
changelog file. See the existing entries in
`upcoming/source/ak8so-changelog.txt` (AKO) or
`upcoming/source/release-notes.txt` (MCK) for the exact format.

**No GitHub release content — notes authored by writer**: Atlas CLI,
MongoCLI, Mongosync, Server Manual, AAC. The GitHub releases for Atlas
CLI (`mongodb/mongodb-atlas-cli`, tags `atlascli/v{version}`) and
MongoCLI (same repo, tags `mongocli/v{version}`) exist but their
release bodies only link back to the docs — no content to fetch. Set
the reminder flag and surface it in Step 11 for all of these.

## How to Fetch Release Notes

Use the `gh` CLI to fetch the release body for a given tag:

```bash
gh release view <tag> --repo <repo> --json body --jq '.body'
```

For example, for Kafka Connector version `2.1.0`:

```bash
gh release view r2.1.0 --repo mongodb/mongo-kafka --json body --jq '.body'
```

To confirm a tag exists without fetching the full body (AKO, MCK):

```bash
gh release view <tag> --repo <repo> --json tagName --jq '.tagName'
```

If the command returns an error or an empty body, the release either
does not exist or has no notes — fall back to the manual reminder path.

## Check the Fetched Content for Embargoed Terms

Before drafting any entry from a fetched release body, check it for embargoed terms.

Use Glean to fetch the Embargoed Features List from the internal wiki (https://wiki.corp.mongodb.com/pages/viewpage.action?pageId=560136334) and return every embargoed feature name and its aliases. The page is internal to MongoDB, so instruct the subagent to read it with Glean.

Scan the fetched release body for any embargoed feature name or alias, matching case-insensitively and including aliases.

If any content matches an embargoed term, **stop before drafting**: report the matching term and the affected content to the writer, then ask how to proceed. Do not draft, include, or publish any release note that references an embargoed feature until the writer confirms the embargo is lifted.

If no content matches, continue to formatting.

## Formatting the Output

Release body content from GitHub is in Markdown. When inserting into an
RST file:

1. Read the existing release notes file in full to confirm heading
   style, section labels, punctuation conventions, and line-wrap
   conventions before drafting.
2. Convert the fetched content to RST following those conventions.
   Common patterns:
   - Markdown `##` headings → RST section underlines
   - Markdown `**bold**` → RST ``**bold**`` or inline code as
     appropriate
   - Markdown backtick code → RST double-backtick monospace
   - Markdown bullet lists → RST unordered lists with `-`
3. Insert the new entry in version-sorted order (newest first). Check
   existing headings to confirm the correct insertion point.
4. Wrap all lines at 72 characters.
5. After inserting, report what was added and note any content that
   needed manual judgment during conversion.
