# reStructuredText Syntax Fixes Automation

This directory contains automation scripts to fix common reStructuredText syntax issues in MongoDB Atlas CLI documentation files.

## Scripts Overview

### 1. `fix_rst_syntax.py` - Advanced Python Script
- **Purpose**: Comprehensive syntax fixing with detailed pattern matching
- **Features**: 
  - Backtick corrections (`text` → ``text``)
  - Tab directive structure fixes
  - Indentation corrections in literalinclude blocks
  - URL markup enhancements
  - Colorized output with progress tracking
- **Best for**: Complex fixes, detailed processing, when you need verbose output

### 2. `fix_rst_syntax.sh` - Fast Shell Script
- **Purpose**: Quick bulk fixes using sed commands
- **Features**:
  - Fast execution with parallel processing
  - Bulk find-replace operations
  - Colorized output
  - Essential syntax fixes
- **Best for**: Quick fixes, large file batches, when speed is priority

## Usage

### Processing Atlas CLI Import Files

When importing new files from Atlas CLI documentation:

```bash
# Option 1: Use Python script for comprehensive fixes
python3 fix_rst_syntax.py content/atlas-cli/upcoming/source/command
python3 fix_rst_syntax.py content/atlas/source/includes/command

# Option 2: Use shell script for quick fixes
./fix_rst_syntax.sh content/atlas-cli/upcoming/source/command
./fix_rst_syntax.sh content/atlas/source/includes/command
```

### Processing Specific Directories

```bash
# Process only atlas-api files
python3 fix_rst_syntax.py content/atlas-cli/upcoming/source/command --pattern "atlas-api*"
./fix_rst_syntax.sh content/atlas-cli/upcoming/source/command "atlas-api*"
```

### Validation Workflow

```bash
# 1. Run fixes
python3 fix_rst_syntax.py content/atlas-cli/upcoming/source/command
python3 fix_rst_syntax.py content/atlas/source/includes/command

# 2. Review changes
git diff

# 3. Test documentation build (if available)
# cd content/atlas && make html

# 4. Commit fixes
git add .
git commit -m "Fix reStructuredText syntax issues in imported files"
```

## Common Issues Fixed

### 1. Backtick Issues
- **Problem**: Single backticks in monospace text
- **Fix**: `text` → ``text``
- **Examples**:
  - `mongos` → ``mongos``
  - `admin` → ``admin``
  - `&` → ``&``
  - `%2F` → ``%2F``

### 2. Tab Directive Issues
- **Problem**: Malformed tab structures
- **Fix**: Proper tab directive formatting with 6-space indentation
- **Examples**:
  ```
  .. tabs::
     .. tab::
        :tabid: shell
        
        .. literalinclude:: /command/atlas-api-example.sh
           :language: shell
  ```

### 3. Indentation Issues in Example Blocks
- **Problem**: Incorrect indentation in non-tab code blocks
- **Fix**: Proper 3-space indentation for literalinclude outside of tabs
- **Examples**:
  ```
  Create the file below and save it as ``payload.json``

  .. literalinclude:: /includes/examples/example.json
     :language: shell

  After creating ``payload.json``, run the command below.
  ```

### 4. Duplicate Directives
- **Problem**: Duplicate `:language:` specifications in literalinclude blocks
- **Fix**: Remove duplicate language directives
- **Examples**:
  ```
  .. literalinclude:: /path/to/file.sh
     :language: shell
     :language: shell  ← This gets removed
  ```

### 5. URL Markup Issues
- **Problem**: Unescaped URLs with special characters
- **Fix**: Proper URL escaping
- **Examples**:
  - `%2F` characters in URLs
  - Query parameters with `&`

## Script Details

### Python Script Features
- **Pattern Matching**: Advanced regex for complex syntax issues including:
  - Tab directive structure fixes with proper 6-space indentation
  - Example block indentation fixes (3-space for non-tab blocks)
  - Duplicate directive removal (e.g., duplicate `:language:` specifications)
  - Backtick conversion with comprehensive pattern matching
  - URL markup enhancement
- **File Processing**: Handles both .txt and .rst files
- **Error Handling**: Graceful handling of encoding issues
- **Progress Tracking**: Real-time feedback on processing
- **Backup Safety**: Non-destructive editing with verification

### Shell Script Features
- **Speed**: Fast sed-based operations
- **Simplicity**: Easy to modify and extend
- **Portability**: Works on macOS and Linux
- **Color Output**: Visual feedback for operations

## File Structure

```
content/
├── atlas-cli/upcoming/source/command/     # .txt files (503 files)
│   ├── atlas-api-*.txt
│   └── ...
├── atlas/source/includes/command/         # .rst files (513 files)
│   ├── atlas-api-*.rst
│   └── ...
├── fix_rst_syntax.py                      # Python automation script
├── fix_rst_syntax.sh                      # Shell automation script
└── RST_SYNTAX_FIXES_README.md            # This documentation
```

## Troubleshooting

### Common Issues

1. **Permission Denied**
   ```bash
   chmod +x fix_rst_syntax.sh
   ```

2. **Python Script Not Found**
   ```bash
   python3 --version  # Ensure Python 3 is installed
   ```

3. **File Corruption During Processing**
   - Restore from atlas-cli versions:
   ```bash
   cp content/atlas-cli/upcoming/source/command/atlas-api-example.txt \
      content/atlas/source/includes/command/atlas-api-example.rst
   ```

4. **Encoding Issues**
   - Scripts handle UTF-8 encoding automatically
   - Check file encoding if issues persist:
   ```bash
   file -i filename.rst
   ```

## Best Practices

1. **Always Review Changes**: Use `git diff` before committing
2. **Process Both Directories**: Atlas CLI and Atlas includes need fixing
3. **Test Build**: Validate syntax with documentation build if possible
4. **Backup First**: Commit clean state before running scripts
5. **Pattern Matching**: Use specific patterns for targeted fixes

## Integration with Import Workflow

Add these commands to your import process:

```bash
# After importing atlas-cli files
python3 fix_rst_syntax.py content/atlas-cli/upcoming/source/command
python3 fix_rst_syntax.py content/atlas/source/includes/command

# Review and commit
git diff
git add .
git commit -m "Import and fix atlas-cli documentation syntax"
```

## Future Enhancements

- Add support for additional file patterns
- Integrate with CI/CD pipeline
- Add validation checks for Sphinx build
- Create pre-commit hooks for automatic fixing
