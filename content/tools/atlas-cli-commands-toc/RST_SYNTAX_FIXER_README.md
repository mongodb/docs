# reStructuredText Syntax Fixer

This directory contains scripts to automatically fix common reStructuredText syntax issues in Atlas CLI documentation files.

## Quick Usage

### Option 1: Shell Script (Fast)
```bash
# Fix all files in both directories
./fix_rst_syntax.sh

# Fix files in a specific directory
./fix_rst_syntax.sh content/atlas-cli/upcoming/source/command
./fix_rst_syntax.sh content/atlas/source/includes/command
```

### Option 2: Python Script (More detailed)
```bash
# Fix all files in both directories
python3 fix_rst_syntax.py

# Fix files in a specific directory
python3 fix_rst_syntax.py content/atlas-cli/upcoming/source/command

# Dry run to see what would be fixed
python3 fix_rst_syntax.py --dry-run
```

## What Gets Fixed

### 1. Monospace Text Backticks
- `mongos` → ``mongos``
- `admin` → ``admin``
- `&` → ``&``
- `%2F` → ``%2F``
- `"flattenTeams" : true` → ``"flattenTeams" : true``

### 2. Indentation Issues
- Fixes over-indented literalinclude blocks
- Corrects "After creating payload.json" placement
- Fixes improper directive indentation

### 3. URL Markup
- Converts bare URLs to proper reStructuredText links
- Fixes profile documentation URLs
- Fixes API endpoint URLs

### 4. Completion File Formatting
- Converts tab-indented commands to proper code blocks
- Fixes shell completion examples

## When to Run

Run these scripts:
- ✅ **After importing new Atlas CLI command files**
- ✅ **Before building documentation**
- ✅ **After bulk updates to command files**
- ✅ **When Sphinx build shows syntax warnings**

## Files Processed

The scripts automatically process:
- `content/atlas-cli/upcoming/source/command/atlas-*.txt`
- `content/atlas/source/includes/command/atlas-*.rst`

## Example Workflow

```bash
# 1. Import new Atlas CLI files
./import_atlas_cli_files.sh

# 2. Fix syntax issues
./fix_rst_syntax.sh

# 3. Review changes
git diff

# 4. Test build (if available)
make html

# 5. Commit fixes
git add .
git commit -m "Fix reStructuredText syntax issues in Atlas CLI files"
```

## Troubleshooting

### Script Permissions
If you get a permission error:
```bash
chmod +x fix_rst_syntax.sh
```

### File Not Found
Make sure you're running the script from the `docs-mongodb-internal` directory:
```bash
cd /path/to/docs-mongodb-internal
./fix_rst_syntax.sh
```

### Python Dependencies
The Python script uses only standard library modules, no additional dependencies needed.

## Adding New Fixes

To add new syntax fixes, edit either script:

### Shell Script (`fix_rst_syntax.sh`)
Add new sed commands in the `fix_directory()` function:
```bash
find "$dir" -name "$pattern" -exec sed -i '' 's/old_pattern/new_pattern/g' {} \;
```

### Python Script (`fix_rst_syntax.py`)
Add new patterns in the appropriate fix function:
```python
def fix_backticks(content):
    fixes = [
        ('old_pattern', 'new_pattern'),
        # Add new fixes here
    ]
```
