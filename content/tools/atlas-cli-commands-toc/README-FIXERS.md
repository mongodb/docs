Purpose
=======

This folder contains a set of conservative RST fixers used to normalize Atlas CLI command pages under `content/atlas-cli/upcoming` so the Snooty parser can build them reliably.

Safety and scope
----------------
- These scripts are intended to be run against the `content/atlas-cli/upcoming/source/command` directory only.
- They try to make conservative, reversible edits (blank lines, indentation, removing stray triple-backtick fences, `:language:` option indentation).
- Always commit or stash changes before running, and review the generated logs in `logs/`.

Quick run
---------
From the repository root:

```bash
cd content/tools/atlas-cli-commands-toc
./run-fixers.sh
```

Then validate the build:

```bash
cd ../../atlas-cli/upcoming
rm -rf build && snooty build . --output=build
```

Logs
----
- Each fixer run writes a timestamped log under `content/tools/atlas-cli-commands-toc/logs/`.
- Review the logs and run `git diff` to inspect changes before committing.

Reverting
--------
If a fix produces unwanted changes you can revert with git:

```bash
git checkout -- content/atlas-cli/upcoming/source/command
```

Notes & next steps
------------------
- The runner contains a set of conservative fixers; other fixers exist in the folder but are not part of the default sequence to avoid broad changes.
- If you'd like me to add a `--dry-run` mode or integrate an automatic `snooty build` step into the runner, tell me and I will add it.

Fixer scripts (consolidated README)
----------------------------------

This section documents the primary fixer scripts in this folder and how to use them safely.

Files of interest
- `consolidated-fixers.py` — single Python script that runs three phases:
	1. Dedent odd `.. literalinclude::` occurrences for a small, configurable list of atlas-api files.
	2. Wrap shell completion lines into `.. code-block:: console` blocks for shell completion pages.
	3. General conservative normalizations across the scope: inline monospace normalization, directive option indentation, and trailing-space tidy.

- `run-all-fixers.py` — orchestrator that invokes `consolidated-fixers.py` with the correct arguments. Use this as the standard entrypoint for fixer runs.

- `fix-atlas-local-tables.py` — specialized fixer for atlas-local command files that fixes list-table continuation line indentation. See [README-ATLAS-LOCAL-FIXER.md](./README-ATLAS-LOCAL-FIXER.md) for details. This fixer is integrated into the `generate-local-cli-commands.ts` generator and runs automatically when importing atlas-local commands.

Key behaviors
- Scope restriction: Both scripts are intended to operate only on `content/atlas-cli/upcoming` (or a subpath you provide via `--scope`).
- SKIP_LIST: A list of path suffixes is embedded in the scripts to prevent touching files that are managed or manually edited; any path that ends with a SKIP_LIST entry is skipped.
- Dry-run by default: Running without `--apply` will only print proposed diffs and statistics and will not write files. Use `--apply` to make in-place edits.
- No timestamped backups: When `--apply` is used the scripts overwrite files in-place (per repository policy in this workflow). Use git to revert changes if needed.

Safety checklist before running
1. Ensure your working tree is clean (commit or stash local changes):

```bash
git status --porcelain
git add -A && git commit -m "WIP: save before fixer run"  # or use stash
```

2. Review `SKIP_LIST` in `consolidated-fixers.py` if you have additional manual edits to protect.

3. Preview changes first (dry-run):

```bash
# from repository root
cd content/tools/atlas-cli-commands-toc
python3 consolidated-fixers.py --scope ../atlas-cli/upcoming/source/command
```

4. If the diff looks good, re-run with `--apply` to write changes:

```bash
python3 run-all-fixers.py --apply --scope ../atlas-cli/upcoming/source/command
```

Notes about the dedent behavior
- The dedent phase targets a short list of atlas-api files (configured in the script). It counts `.. literalinclude::` occurrences and dedents odd-numbered occurrences plus their `:language:` option by up to 3 spaces, and ensures a single blank line after `:language:`. This behavior was added to address specific upstream formatting patterns — if it causes regressions, remove the file from the dedent list or adjust the logic.

Rollbacks and auditing
- Use `git diff` to inspect changes created by the scripts.
- To undo all fixer changes in the scope:

```bash
git checkout -- content/atlas-cli/upcoming/source/command
```

Extending the fixer
- If you want a new file to be ignored, add its path suffix to the `SKIP_LIST` in `consolidated-fixers.py`.
- To target additional files for dedent, add them to the `files_to_dedent` list in `consolidated-fixers.py`.

Contact
- If you'd like me to harden or extend the fixers (add a proper test harness, unit tests, or convert to a Node-based tool with an npm script), tell me which direction you prefer and I will implement it.

