#!/usr/bin/env python3
"""Fixer for atlas-local command RST list-table formatting issues.

This fixer addresses a specific formatting issue in atlas-local command files where
continuation lines in list-table descriptions are not properly indented, causing them
to appear outside the table cell structure.

Usage:
  fix-atlas-local-tables.py [--apply] [--scope PATH]

Behavior:
  - Scans atlas-local*.txt files in the specified scope
  - Identifies continuation lines after list-table descriptions that are not indented
  - Properly indents those lines to be part of the table cell (5 spaces to align with description content)
  - Runs in dry-run mode by default; use --apply to write changes

Examples of fixed patterns:
  - "The default is false." appearing after a description
  - "If not provided, ..." appearing after a description
  - "The folder must exist..." appearing after a description
  - Other continuation sentences that should be part of the previous cell
  
Note: Continuation lines are indented with 7 spaces to align with the text content
after the cell marker (     - text), not just with the cell marker itself.
"""

from pathlib import Path
import argparse
import sys
import re
import difflib


def fix_list_table_continuations(path: Path, apply: bool) -> int:
    """Fix improperly indented continuation lines in list-tables.
    
    Args:
        path: Path to the RST file to fix
        apply: If True, write changes to file; if False, only show diff
        
    Returns:
        1 if changes were made/proposed, 0 otherwise
    """
    text = path.read_text(encoding='utf-8')
    lines = text.splitlines()
    out = []
    changed = False
    i = 0
    
    # Track whether we're in a list-table
    in_list_table = False
    
    while i < len(lines):
        line = lines[i]
        
        # Detect start of list-table
        if re.match(r'^\.\. list-table::', line.strip()):
            in_list_table = True
            out.append(line)
            i += 1
            continue
        
        # Exit list-table only when we hit a non-indented directive, section header, or toctree
        if in_list_table and line.strip() and not line.startswith(' ') and not line.startswith('\t'):
            # Only exit on actual directives, section markers, or references
            if (re.match(r'^\.\. ', line) or 
                re.match(r'^={3,}', line) or 
                re.match(r'^-{3,}', line) or
                re.match(r'^\.\. _[a-z]', line)):
                in_list_table = False
        
        # If we're in a list-table, look for lines that need fixing
        if in_list_table:
            # Check if current line starts with NO indentation (column 0) and has content
            # These are the lines that belong to the previous table cell but aren't indented
            starts_at_column_zero = line and len(line) > 0 and line[0] not in (' ', '\t')
            
            is_unindented_content = (
                starts_at_column_zero and  # Truly unindented (starts at column 0)
                line.strip() and  # Has content
                not re.match(r'^\.\. ', line) and  # Not a directive
                not re.match(r'^={3,}', line) and  # Not section underline
                not re.match(r'^-{3,}', line) and  # Not section underline  
                not re.match(r'^\.\. _', line)  # Not a reference target
            )
            
            # Look back to confirm we're in table content
            look_back = min(10, len(out))
            recent_lines = out[-look_back:] if look_back > 0 else []
            has_recent_table_content = any(
                re.match(r'^   \* - ', ln) or re.match(r'^     - ', ln)
                for ln in recent_lines
            )
            
            # Look ahead to see if we eventually reach a table row or another unindented continuation
            # This handles cases where multiple continuation lines appear consecutively
            eventually_table_row = False
            j = i + 1
            while j < len(lines):
                next_line = lines[j]
                if next_line.strip() == '':
                    j += 1
                    continue
                # If we hit a table row, this is table content
                if re.match(r'^   \* - ', next_line):
                    eventually_table_row = True
                    break
                # If we hit another unindented line that looks like a continuation, keep going
                if (next_line and len(next_line) > 0 and next_line[0] not in (' ', '\t') and
                    next_line.strip() and
                    not re.match(r'^\.\. ', next_line)):
                    j += 1
                    continue
                # If we hit properly indented content, keep going
                if re.match(r'^     ', next_line):
                    j += 1
                    continue
                # Otherwise, stop looking
                break
            
            # If this line is unindented content, appears in a table context,
            # and is followed (eventually) by a table row, it needs indenting
            if is_unindented_content and has_recent_table_content and eventually_table_row:
                # Indent the line to be part of the previous cell (7 spaces to align with content)
                indented_line = '       ' + line.strip()
                out.append(indented_line)
                changed = True
                i += 1
                continue
        
        out.append(line)
        i += 1
    
    if not changed:
        print(f'No changes needed for {path}')
        return 0
    
    old = text
    new = '\n'.join(out)
    if not new.endswith('\n'):
        new += '\n'
    
    diff = ''.join(
        difflib.unified_diff(
            old.splitlines(keepends=True),
            new.splitlines(keepends=True),
            fromfile=str(path),
            tofile=str(path) + '.fixed'
        )
    )
    
    print(f'--- Proposed changes for {path}')
    print(diff)
    
    if apply:
        path.write_text(new, encoding='utf-8')
        print(f'✓ Wrote {path}')
        return 1
    else:
        print(f'  (dry-run; use --apply to write changes)')
    
    return 1


def main():
    parser = argparse.ArgumentParser(
        description='Fix list-table continuation line indentation in atlas-local command files'
    )
    parser.add_argument('--apply', action='store_true',
                       help='Write changes to files (default is dry-run)')
    parser.add_argument('--scope', type=str, default=None,
                       help='Directory to scan (default: content/atlas-cli/upcoming/source/command)')
    args = parser.parse_args()
    
    # Determine scope
    script_dir = Path(__file__).parent
    if args.scope:
        scope = Path(args.scope)
    else:
        # Default to upcoming/source/command directory
        repo_root = script_dir.resolve().parents[2]
        scope = repo_root / 'content' / 'atlas-cli' / 'upcoming' / 'source' / 'command'
    
    if not scope.exists():
        print(f'ERROR: Scope directory not found: {scope}', file=sys.stderr)
        sys.exit(2)
    
    # Find all atlas-local*.txt and atlas-local*.rst files
    txt_files = list(scope.glob('atlas-local*.txt'))
    rst_files = list(scope.glob('atlas-local*.rst'))
    files = sorted(txt_files + rst_files)
    
    if not files:
        print(f'No atlas-local*.txt or atlas-local*.rst files found in {scope}')
        sys.exit(0)
    
    print(f'{"=" * 70}')
    print(f'Atlas Local Commands Table Fixer')
    print(f'{"=" * 70}')
    print(f'Scope: {scope}')
    print(f'Mode: {"APPLY (will modify files)" if args.apply else "DRY-RUN (preview only)"}')
    print(f'Files to process: {len(files)}')
    print(f'{"=" * 70}\n')
    
    changes_proposed = 0
    files_changed = 0
    
    for file_path in files:
        result = fix_list_table_continuations(file_path, args.apply)
        if result > 0:
            changes_proposed += result
            files_changed += 1
        print()  # Blank line between files
    
    print(f'{"=" * 70}')
    print(f'Summary:')
    print(f'  Files scanned: {len(files)}')
    print(f'  Files with changes: {files_changed}')
    print(f'  Total changes: {changes_proposed}')
    if not args.apply and changes_proposed > 0:
        print(f'\n  To apply these changes, run with --apply flag')
    print(f'{"=" * 70}')
    
    sys.exit(0)


if __name__ == '__main__':
    main()
