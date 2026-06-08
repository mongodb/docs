# MongoCLI Table of Contents Generator

Generates TypeScript table of contents entries for MongoCLI commands by
fetching command documentation files from the
[mongodb/mongodb-cli](https://github.com/mongodb/mongodb-cli) GitHub
repository.

## How It Works

1. Clones `mongodb/mongodb-cli` at a specified tag.
2. Runs RST fixers on the cloned `.txt` files (completion-block wrapping
   and general syntax normalization).
3. Copies the fixed files to both version directories:
   - `content/mongocli/current/source/command/`
   - `content/mongocli/upcoming/source/command/`
4. Inventories both directories to detect per-version file availability.
5. Builds a hierarchical `TocItem[]` structure and writes it to
   `content/table-of-contents/docset-data/mongocli-commands.ts`.
6. Runs `pnpm check:fix` on the `table-of-contents` project to enforce
   consistent formatting.

The generated file exports `mongocliCommands` and is imported by
`content/table-of-contents/docset-data/mongocli.ts`.

## Prerequisites

- Node.js 18+
- Git
- Python 3 (for RST fixers)

## Installation

```bash
cd content/tools/mongocli-commands-toc
npm install
```

## Usage

```bash
# From this directory
npx tsx generate-mongocli-commands.ts <tag>

# Example
npx tsx generate-mongocli-commands.ts mongocli/v2.0.7
```

Tag format: `mongocli/v<version>` — find available tags at
https://github.com/mongodb/mongodb-cli/tags.

## Output

| File | Description |
|------|-------------|
| `content/mongocli/current/source/command/*.txt` | Command docs for current version |
| `content/mongocli/upcoming/source/command/*.txt` | Command docs for upcoming version |
| `content/table-of-contents/docset-data/mongocli-commands.ts` | Generated ToC |
| `generation-summary.json` | Run summary (tag, file counts, timestamp) |

## Version Constraints

The generator inventories both version directories after copying. If a
command file is missing from one version, it emits a `versions` constraint
on that entry (e.g., `versions: { includes: ['upcoming'] }`). Commands
present in all versions have no `versions` property.

## RST Fixers

Two Python scripts handle RST normalization:

- **`consolidated-fixers.py`** — applies two passes:
  1. General fixes: normalizes inline monospace, directive indentation,
     and trailing whitespace across all `.txt`/`.rst` files.
  2. Completion wrapping: wraps shell command lines in
     `.. code-block:: console` blocks for the four completion files
     (`mongocli-completion-bash.txt`, `-fish.txt`, `-powershell.txt`,
     `-zsh.txt`).

- **`run-all-fixers.py`** — orchestrator that invokes
  `consolidated-fixers.py` with `--scope content/mongocli/upcoming/source`.
  Run independently if you need to re-apply fixes after editing source files:

  ```bash
  python3 run-all-fixers.py --apply
  ```

## Compound Command Names

`cloud-manager` and `ops-manager` appear as hyphenated segments in
MongoCLI command filenames (e.g.,
`mongocli-cloud-manager-clusters-create.txt`). The generator treats these
as atomic path segments so the TOC hierarchy is built correctly.

## Troubleshooting

- **Tag not found**: verify the tag exists at
  https://github.com/mongodb/mongodb-cli/tags
- **Completion files not wrapped**: run `consolidated-fixers.py` with
  `--apply` and check that the four completion `.txt` files are present
  under `source/command/`
- **TypeScript errors after generation**: run `pnpm check:fix` from
  `content/table-of-contents/`
