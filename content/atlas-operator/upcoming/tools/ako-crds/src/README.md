Populate the AKO CRD reference docs with current output from the AKO source repo.

This process clones the AKO source at a specific tagged version (as specified by the user) and processes two markdown files from the repo into RST sub-files:

| Source file (in AKO repo) | Output directory (local) |
|---|---|
| `docs/api-docs.md` | `source/includes/manual-crds/` |
| `docs/api-docs-generated.md` | `source/includes/generated-crds/` |

Each markdown file is parsed, sorted into per-CRD sections, converted to RST, and written to the corresponding output directory. The resulting `.rst` files are then embedded into the docs pages with `.. include::` directives.

## Prereqs

You'll need to gather the following variables to pass to the process command as demonstrated below.

- AKO repo url: `git@github.com:mongodb/mongodb-atlas-kubernetes.git`
- AKO release version tag: `v2.11.1` (example)

## Run the tool

The easiest way to generate both sets of docs is with the wrapper script, which only requires the version tag:

```
./generate.sh v2.12.0
```

Alternatively, you can call `main.py` directly:

```
python3 main.py --repo-url git@github.com:mongodb/mongodb-atlas-kubernetes.git --version v2.12.0 --manual-crds
```

In the above, the repo url and release version are set with the flags `--repo-url` and `--version` respectively, and the `--manual-crds` flag indicates that the target for this process are the reference entries for the CRs.

### What happens when you run it

1. The tool clones the AKO repo and checks out the specified version tag.
2. It reads `docs/api-docs.md`, processes the markdown, converts it to RST, and writes per-CRD files to `source/includes/manual-crds/`.
3. It then reads `docs/api-docs-generated.md`, runs the same pipeline, and writes per-CRD files to `source/includes/generated-crds/`.
4. Finally, it cleans up the temporary clone and stages any changed files in git.
