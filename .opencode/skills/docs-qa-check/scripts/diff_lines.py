#!/usr/bin/env python3
"""Emit the {fileid: [changed line numbers]} map that extract_blocks.py wants.

Usage:
    diff_lines.py --repo-root <path> [--base origin/main] [--out diff-lines.json]

Scopes exactly like Step 0: committed changes against the merge base, plus
uncommitted working-tree changes, plus untracked files under content/. Line
numbers are POST-image (they index the file as it exists now), which is the
side extract_blocks.py compares against, since the AST was built from the
current tree.

An untracked or added file has every line reported as changed, so every block
on it scores `new`.

Keys are emitted under several spellings of each path — full repo path, the
source-relative path, and the bare stem — because the AST's `fileid` does not
match the git path. extract_blocks.py normalizes on lookup too; this just
means neither side has to guess which form the other used.
"""
import argparse
import json
import os
import re
import subprocess
import sys

HUNK = re.compile(r"^@@ -\d+(?:,\d+)? \+(\d+)(?:,(\d+))? @@")


def run(args, cwd):
    return subprocess.run(
        args, cwd=cwd, capture_output=True, text=True, check=False
    ).stdout


def post_image_lines(diff_text):
    """Changed line numbers on the + side, per file."""
    out = {}
    path = None
    new_line = 0
    for line in diff_text.splitlines():
        if line.startswith("+++ b/"):
            path = line[6:].strip()
            out.setdefault(path, set())
            continue
        if line.startswith("+++ ") or line.startswith("--- "):
            continue
        m = HUNK.match(line)
        if m:
            new_line = int(m.group(1))
            continue
        if path is None:
            continue
        if line.startswith("+"):
            out[path].add(new_line)
            new_line += 1
        elif line.startswith("-"):
            # Deleted lines occupy no post-image line; the surrounding
            # context blocks still get credited via their own + lines.
            pass
        elif line.startswith(" "):
            new_line += 1
    return out


def key_forms(path):
    """Every spelling of a path the AST might use as a fileid."""
    forms = {path}
    if "/source/" in path:
        forms.add(path.split("/source/", 1)[1])
    forms.add(path.rsplit("/", 1)[-1])
    for f in list(forms):
        for ext in (".txt", ".rst"):
            if f.endswith(ext):
                forms.add(f[: -len(ext)])
    return forms


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--repo-root", required=True)
    ap.add_argument("--base", default="origin/main")
    ap.add_argument("--out", default="-")
    args = ap.parse_args()
    root = args.repo_root

    merge_base = run(["git", "merge-base", args.base, "HEAD"], root).strip()

    diffs = []
    if merge_base:
        diffs.append(run(
            ["git", "diff", "-U0", f"{merge_base}...HEAD", "--", "content/"],
            root))
    diffs.append(run(["git", "diff", "-U0", "HEAD", "--", "content/"], root))

    changed = {}
    for d in diffs:
        for path, lines in post_image_lines(d).items():
            changed.setdefault(path, set()).update(lines)

    # Untracked files: every line is new. Pages and includes (.txt/.rst) plus
    # generated snippet files under code-examples/tested/ — the latter are the
    # source material pages splice in via .. input::/.. literalinclude::.
    untracked = run(
        ["git", "ls-files", "--others", "--exclude-standard", "--", "content/"],
        root).split()
    for path in untracked:
        if not path.endswith((".txt", ".rst")) and "code-examples/tested/" not in path:
            continue
        full = os.path.join(root, path)
        if not os.path.isfile(full):
            continue
        with open(full, encoding="utf-8", errors="replace") as fh:
            n = sum(1 for _ in fh)
        changed.setdefault(path, set()).update(range(1, n + 1))

    out = {}
    for path, lines in changed.items():
        # Committed changes to any file under content/ belong in the map —
        # snippet files included — since page ASTs splice their content in.
        if not path.endswith((".txt", ".rst")) and "code-examples/tested/" not in path:
            continue
        for key in key_forms(path):
            out.setdefault(key, set()).update(lines)

    payload = {k: sorted(v) for k, v in sorted(out.items())}
    # Mark the map authoritative. Because this script enumerates every
    # changed file under content/, a file's ABSENCE is itself information:
    # it means unchanged. extract_blocks.py reads this sentinel and scores
    # unlisted files pre-existing instead of unknown. A hand-written map
    # carries no sentinel and unlisted files stay unknown, which is the
    # safe reading when nobody has vouched for completeness.
    payload["__complete__"] = True
    text = json.dumps(payload, indent=1)
    if args.out == "-":
        print(text)
    else:
        open(args.out, "w").write(text)
        n_files = len({k for k in payload if "/" in k})
        print(f"{n_files} changed file(s) -> {args.out}", file=sys.stderr)


if __name__ == "__main__":
    main()
