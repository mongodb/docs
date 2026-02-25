# Atlas Local Commands Table Fixer

## Overview

`fix-atlas-local-tables.py` is a specialized RST fixer that addresses list-table formatting issues in atlas-local command documentation files. It fixes continuation lines that appear between table cells and table rows, ensuring they are properly indented as part of their respective table cells.

## Problem Description

In some atlas-local command files, continuation sentences or details that should be part of a table cell's description are incorrectly placed at column 0 (no indentation). This breaks the RST table structure and causes parsing issues.

### Example of the Problem

```rst
   * - --bindIpAll
     - 
     - false
     - Flag that indicates whether the LOCAL deployment port binding should happen for all IPs or only for the localhost interface 127.0.0.1.

The default is false.
   * - --connectWith
```

In the example above, "The default is false." should be indented to be part of the previous description cell, but it's at column 0.

### Example After Fix

```rst
   * - --bindIpAll
     - 
     - false
     - Flag that indicates whether the LOCAL deployment port binding should happen for all IPs or only for the localhost interface 127.0.0.1.

       The default is false.
   * - --connectWith
```

Now "The default is false." is properly indented (7 spaces) to align with the description content above it.

## Usage

### Dry-Run Mode (Preview Only)

Preview changes without modifying files:

```bash
cd content/tools/atlas-cli-commands-toc
python3 fix-atlas-local-tables.py
```

Or specify a custom scope:

```bash
python3 fix-atlas-local-tables.py --scope /path/to/command/directory
```

### Apply Changes

To write changes to files:

```bash
python3 fix-atlas-local-tables.py --apply
```

Or with custom scope:

```bash
python3 fix-atlas-local-tables.py --apply --scope /path/to/command/directory
```

## Scope

By default, the fixer targets:
- **Directory**: `content/atlas-cli/upcoming/source/command`
- **Files**: All `atlas-local*.txt` and `atlas-local*.rst` files

The fixer can also be run on:
- `content/atlas-cli/current/source/command` (versioned documentation)
- `content/atlas/source/includes/command` (shared atlas includes)

## What It Fixes

The fixer identifies and corrects:

1. **Unindented continuation lines** - Lines that:
   - Start at column 0 (no indentation)
   - Appear within a list-table structure
   - Are positioned between table cell content and the next table row
   - Should be part of the previous cell's description

2. **Common patterns** include:
   - "The default is false."
   - "If not provided, ..."
   - "The folder must exist and be a directory."
   - "Expected format: ..."
   - "The port must be between..."
   - "This will prevent..."

## How It Works

1. **Table Detection**: Identifies `.. list-table::` directives
2. **Context Tracking**: Maintains awareness of whether processing is within a list-table
3. **Line Analysis**: For each line in a table:
   - Checks if it starts at column 0
   - Verifies recent lines contain table cell content
   - Looks ahead to confirm the next non-blank line is a table row
4. **Indentation Fix**: Adds 7 spaces of indentation to align with table cell content
5. **Table Exit**: Only exits table context when encountering:
   - Another directive (starting with `.. `)
   - Section underlines (`===` or `---`)
   - Reference targets (`.. _`)

## Safety Features

- **Dry-run by default**: Won't modify files unless `--apply` is specified
- **Unified diff output**: Shows exactly what will change
- **Pattern recognition**: Only fixes lines that match expected continuation patterns
- **Context awareness**: Requires confirmation that the line is within a table and before a row

## Output

The fixer provides:
- Summary of files scanned
- Count of files with changes
- Detailed unified diffs for each modified file
- Clear indication of applied changes (with `--apply`)

### Example Output

```
======================================================================
Atlas Local Commands Table Fixer
======================================================================
Scope: /Users/.../content/atlas-cli/upcoming/source/command
Mode: APPLY (will modify files)
Files to process: 14
======================================================================

...

--- Proposed changes for .../atlas-local-setup.txt
...
✓ Wrote .../atlas-local-setup.txt

======================================================================
Summary:
  Files scanned: 14
  Files with changes: 2
  Total changes: 2
======================================================================
```

## Limitations

- Only processes `.txt` and `.rst` files matching the pattern `atlas-local*`
- Designed specifically for atlas-local command documentation
- Assumes RST list-table structure follows standard conventions

## Rollback

To undo changes applied by this fixer:

```bash
# For atlas-cli upcoming
git checkout -- content/atlas-cli/upcoming/source/command/atlas-local*.txt

# For atlas-cli current
git checkout -- content/atlas-cli/current/source/command/atlas-local*.txt

# For atlas includes
git checkout -- content/atlas/source/includes/command/atlas-local*.rst
```

## Integration with Other Fixers

This fixer is independent of the consolidated fixers (`consolidated-fixers.py`) and addresses a specific issue found in atlas-local command files. It can be run before or after other fixers without conflicts.

## Maintenance

When extending or modifying this fixer:

1. **Test in dry-run mode first** on sample files
2. **Verify diffs carefully** before applying changes
3. **Check edge cases** like:
   - Multiple consecutive unindented lines
   - Blank lines between description and continuation
   - Tables with nested content
4. **Update patterns** if new continuation line formats are discovered

## Examples of Fixed Files

Files that have been successfully fixed with this tool:

- `atlas-local-setup.txt` - Fixed 9 continuation lines
- `atlas-local-search-indexes-create.txt` - Fixed 1 continuation line

## Contact

For questions or issues with this fixer, refer to the broader fixers documentation in [README-FIXERS.md](./README-FIXERS.md).
