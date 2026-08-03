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

    # Only blocks with parsed tabs are conversion targets. A block with an
    # empty tabs list is almost always a content-variant `.. tabs::` block
    # whose `.. tab:: <title>` children the analyzer did not recognize as
    # language/interface tabs. Such blocks must pass through as shared
    # content — never delete them.
    convertible_blocks = [b for b in analysis["tab_blocks"] if b["tabs"]]
    passthrough_blocks = [b for b in analysis["tab_blocks"] if not b["tabs"]]
    if passthrough_blocks:
        starts = ", ".join(str(b["start"]) for b in passthrough_blocks)
        print(
            f"Note: {len(passthrough_blocks)} tab block(s) at line(s) "
            f"{starts} have no recognized language/interface tabs and pass "
            f"through as shared content (likely content-variant tabs). "
            f"Verify they are legal where they land — a bare `.. tabs::` "
            f"is not allowed at document level inside the composable.",
            file=sys.stderr,
        )

    # Build a quick lookup: line_num -> tab_block (1-indexed start)
    block_by_start = {b["start"]: b for b in convertible_blocks}

    # Set of all line numbers inside a convertible tab block
    in_tab_block: set[int] = set()
    for b in convertible_blocks:
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


# ── Selections / options validation ───────────────────────────────────────────

OPTIONS_RE = re.compile(r'^\s*:options:\s*(.+?)\s*$')
DEFAULTS_RE = re.compile(r'^\s*:defaults:\s*(.+?)\s*$')
SELECTIONS_RE = re.compile(r'^\s*:selections:\s*(.+?)\s*$')


def _count_values(raw):
    """Count comma-separated values in an options/selections/defaults line."""
    return len([v for v in raw.split(",")])


def validate_selections(new_text):
    """Check that every :defaults: and :selections: line has exactly as many
    comma-separated values as the composable's :options: line.

    Returns a list of human-readable error strings (empty if valid).  This
    enforces the invariant the skill documents but the generator can still
    violate when a page's tab attributes over-generate option slots.
    """
    lines = new_text.splitlines()
    errors = []

    # Find the composable :options: count (one composable per file).
    option_count = None
    for line in lines:
        m = OPTIONS_RE.match(line)
        if m:
            option_count = _count_values(m.group(1))
            break

    if option_count is None:
        errors.append("No :options: line found in the converted output.")
        return errors

    for idx, line in enumerate(lines, start=1):
        m = DEFAULTS_RE.match(line)
        if m:
            n = _count_values(m.group(1))
            if n != option_count:
                errors.append(
                    f"Line {idx}: :defaults: has {n} value(s) but :options: "
                    f"has {option_count}. Fix so the counts match."
                )
            if m.group(1).split(",")[0].strip() == "None":
                errors.append(
                    f"Line {idx}: first :defaults: value cannot be None."
                )
            continue
        m = SELECTIONS_RE.match(line)
        if m:
            n = _count_values(m.group(1))
            if n != option_count:
                errors.append(
                    f"Line {idx}: :selections: has {n} value(s) but :options: "
                    f"has {option_count}. Fix so the counts match."
                )
            if m.group(1).split(",")[0].strip() == "None":
                errors.append(
                    f"Line {idx}: first :selections: value cannot be None."
                )

    return errors


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

    # Enforce the :options:/:selections:/:defaults: count invariant.
    validation_errors = validate_selections(new_text)
    if validation_errors:
        print(
            "Validation errors in the converted output "
            "(:options: / :selections: / :defaults: mismatch):",
            file=sys.stderr,
        )
        for err in validation_errors:
            print(f"  - {err}", file=sys.stderr)
        if apply_mode:
            print(
                "Refusing to apply. Some pages over-generate option slots "
                "and need option dimensions collapsed by hand. Fix the header "
                "or the mapping, then re-run.",
                file=sys.stderr,
            )
            sys.exit(2)
        print(
            "Dry run only: review and correct these before running --apply.",
            file=sys.stderr,
        )

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
