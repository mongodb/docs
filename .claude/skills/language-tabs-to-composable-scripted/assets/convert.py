#!/usr/bin/env python3
"""
convert.py - RST composable tutorial converter.

Reads an RST file, runs the analyzer, and writes the converted file
in place.

Usage:
    python convert.py <filepath>              # dry run: prints diff to stdout
    python convert.py --apply <filepath>      # apply conversion in place

The script always runs the analyzer internally.  Pass --apply only after
reviewing the dry-run output and confirming with the user.
"""

import json
import re
import sys
from pathlib import Path

# Import the analyzer from the same directory
sys.path.insert(0, str(Path(__file__).parent))
from analyze import (
    analyze,
    LANGUAGE_IDS,
    INTERFACE_IDS,
    DEPLOYMENT_IDS,
    INTERFACE_ONLY,
)

TABID_RE = re.compile(r'^ *:tabid:\s+(.+?)\s*$')


# ── ID mapping ────────────────────────────────────────────────────────────────

def composable_selections(tabid, case):
    """Return the :selections: string for a given tab ID and case."""
    # Case A: single selection value
    if case == "A":
        return LANGUAGE_IDS.get(tabid, tabid)

    # Case B: two values (interface, language)
    if case == "B":
        if tabid in INTERFACE_ONLY or tabid in {"shell", "mongosh"}:
            iface = INTERFACE_IDS.get(tabid, tabid)
            return f"{iface}, None"
        lang = LANGUAGE_IDS.get(tabid, tabid)
        return f"driver, {lang}"

    # Case B-deployment: three values (deployment-type, interface, language)
    if case == "B-deployment":
        if tabid in DEPLOYMENT_IDS:
            dep = DEPLOYMENT_IDS[tabid]
            return f"{dep}, None, None"
        if tabid in INTERFACE_ONLY or tabid in {"shell", "mongosh"}:
            iface = INTERFACE_IDS.get(tabid, tabid)
            return f"None, {iface}, None"
        lang = LANGUAGE_IDS.get(tabid, tabid)
        return f"None, driver, {lang}"

    return tabid


# ── selected-content block builder ───────────────────────────────────────────

def build_selected_content(tab, lines, case):
    """Return a formatted .. selected-content:: block string."""
    tabid = tab["tabid"] or "unknown"
    selections = composable_selections(tabid, case)

    # Extract tab content lines (0-indexed slice)
    cs = tab["content_start"] - 1   # 0-indexed
    ce = tab["end"] - 1             # 0-indexed, inclusive
    content_lines = lines[cs:ce + 1]

    # Find the minimum indentation of non-blank content lines
    non_blank = [l for l in content_lines if l.strip()]
    if non_blank:
        min_indent = min(len(l) - len(l.lstrip(" ")) for l in non_blank)
    else:
        min_indent = 0

    # Re-indent content to 6 spaces (3 selected-content + 3 content body)
    reindented = []
    for line in content_lines:
        if line.strip():
            stripped = line[min_indent:].rstrip("\n")
            reindented.append(f"      {stripped}\n")
        else:
            reindented.append("\n")

    # Strip trailing blank lines from content
    while reindented and not reindented[-1].strip():
        reindented.pop()

    block = f"   .. selected-content::\n"
    block += f"      :selections: {selections}\n"
    block += "\n"
    block += "".join(reindented)
    block += "\n"
    return block


# ── Core conversion ───────────────────────────────────────────────────────────

def convert(filepath, analysis):
    """Return (original_text, new_text) for the converted file."""
    path = Path(filepath)
    original = path.read_text()
    lines = original.splitlines(keepends=True)

    case = analysis["case"]
    scope_start = analysis["composable_scope"]["start"]   # 1-indexed
    scope_end = analysis["composable_scope"]["end"]       # 1-indexed
    header = analysis["proposed_header"]
    lines_to_remove = set(analysis.get("lines_to_remove", []))   # 1-indexed

    # Build a quick lookup: line_num -> tab_block (1-indexed start)
    block_by_start = {b["start"]: b for b in analysis["tab_blocks"]}

    # Set of all line numbers inside any tab block
    in_tab_block: set[int] = set()
    for b in analysis["tab_blocks"]:
        for ln in range(b["start"], b["end"] + 1):
            in_tab_block.add(ln)

    output = []
    header_emitted = False
    i = 0

    while i < len(lines):
        ln = i + 1   # 1-indexed

        # ── Remove flagged lines ─────────────────────────────────────────────
        if ln in lines_to_remove:
            i += 1
            continue

        # ── Emit composable header before scope start ────────────────────────
        if ln == scope_start and not header_emitted:
            header_emitted = True
            output.append(f"{header}\n\n")

        # ── Tab directive block start → emit selected-content blocks ─────────
        if ln in block_by_start:
            block = block_by_start[ln]
            for tab in block["tabs"]:
                output.append(build_selected_content(tab, lines, case))
            i = block["end"]   # skip to last line of block (0-indexed)
            continue

        # ── Inside a tab block but not the start → skip ──────────────────────
        if ln in in_tab_block:
            i += 1
            continue

        # ── Inside composable scope (shared content) → indent 3 spaces ───────
        if scope_start <= ln <= scope_end:
            line = lines[i]
            if line.strip():
                output.append("   " + line)
            else:
                output.append(line)   # blank lines need no indentation
        else:
            output.append(lines[i])

        i += 1

    return original, "".join(output)


# ── Dry-run diff ──────────────────────────────────────────────────────────────

def show_diff(filepath, original, new_text):
    """Print a unified diff of the conversion to stdout."""
    import difflib
    orig_lines = original.splitlines(keepends=True)
    new_lines = new_text.splitlines(keepends=True)
    diff = difflib.unified_diff(
        orig_lines,
        new_lines,
        fromfile=f"a/{filepath}",
        tofile=f"b/{filepath}",
        n=3,
    )
    sys.stdout.writelines(diff)


# ── Entry point ───────────────────────────────────────────────────────────────

def main():
    args = sys.argv[1:]
    apply_mode = False

    if "--apply" in args:
        apply_mode = True
        args = [a for a in args if a != "--apply"]

    if not args:
        print(
            "Usage: python convert.py [--apply] <filepath>",
            file=sys.stderr,
        )
        sys.exit(1)

    filepath = args[0]
    path = Path(filepath)
    if not path.exists():
        print(f"Error: file not found: {filepath}", file=sys.stderr)
        sys.exit(1)

    # Run analysis
    analysis = analyze(filepath)

    if analysis.get("stop_reason"):
        print(f"Cannot convert: {analysis['stop_reason']}", file=sys.stderr)
        sys.exit(1)

    if analysis.get("error"):
        print(f"Error: {analysis['error']}", file=sys.stderr)
        sys.exit(1)

    # Warn about substantial tabs that should be extracted first
    if analysis.get("substantial_tabs"):
        print(
            "Warning: the following tabs have substantial inline content "
            "and should be extracted to includes files before conversion:",
            file=sys.stderr,
        )
        for tid in analysis["substantial_tabs"]:
            print(f"  - {tid}", file=sys.stderr)
        if not apply_mode:
            print(
                "Run the skill to confirm extraction paths before "
                "running --apply.",
                file=sys.stderr,
            )

    original, new_text = convert(filepath, analysis)

    if apply_mode:
        path.write_text(new_text)
        print(f"Converted: {filepath}")
        changed_blocks = len(analysis["tab_blocks"])
        removed = len(analysis.get("lines_to_remove", []))
        print(
            f"  {changed_blocks} tab block(s) converted to "
            f"selected-content blocks"
        )
        if removed:
            print(f"  {removed} redundant line(s) removed")
    else:
        show_diff(filepath, original, new_text)


if __name__ == "__main__":
    main()
