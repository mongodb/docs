# MongoDB Documentation Ref Anchor Impact Detector

A comprehensive tool for analyzing the impact of removing ref anchors in MongoDB documentation. This tool helps prevent broken cross-references when anchors are removed or moved between files.

## 🎯 Problem Statement

Each MongoDB documentation site builds independently. When a writer removes a ref anchor from one site, they won't be notified of the impact on other MongoDB sites that use that anchor in a cross-reference. Writers are only notified after a ref removal change is published to production and affected sites are rebuilt.

## 🚀 Solution

This tool provides early detection of cross-reference impacts by:

1. **Analyzing Git Changes**: Inspects local git diffs to detect anchor changes
2. **Detecting Removed Anchors**: Identifies ref anchors (`.. _anchor-name:`) that are truly removed (not just moved)
3. **Searching Documentation Corpus**: Scans all MongoDB documentation files for `:ref:` roles that reference removed anchors
4. **Intersphinx Validation**: Uses `snooty.toml` configurations to filter valid cross-site references
5. **Impact Classification**: Distinguishes between immediate impacts (`current/`) and future impacts (`upcoming/`)
6. **Comprehensive Reporting**: Lists affected files with actionable recommendations

## ✨ Key Features

- ✅ **Safe Analysis**: Read-only tool that makes NO changes to documentation source
- 🔍 **Comprehensive Search**: Scans all `.rst` and `.txt` files across 79,000+ files in the MongoDB ecosystem
- 📚 **Smart Versioned Support**: Detects changes in `current/` but searches ALL versions for references
- 🎯 **Smart Move Detection**: Distinguishes between truly removed anchors vs. moved/renamed anchors
- 📊 **Enhanced Reporting**: Provides detailed impact reports with immediate vs. future impact classification
- 🚀 **Git Integration**: Works seamlessly with local git changes, branches, and working directory
- 📝 **Multi-line Support**: Handles ref roles that span multiple lines (common in tables, lists)
- 🔄 **Workflow-Aware**: Analyzes both `current/` and `upcoming/` changes with clear impact distinction
- 🔗 **Intersphinx-Aware**: Validates cross-site references using actual `snooty.toml` configurations
- 🏗️ **Enterprise Scale**: Handles MongoDB's complex multi-site, multi-version documentation architecture
- 🎯 **Manual Repository Support**: Special handling for `manual/manual/` structure

## Installation

Navigate to the tool directory:

```bash
cd content/tools/ref-anchor-impact-detector
```

### Requirements

- **Python 3.7+** (required)
- **Git repository** (must be run from within the docs-mongodb-internal repository)
- **toml library**: `pip install toml` (for parsing `snooty.toml` files)

## Usage

### Basic Commands

```bash
# DEFAULT: Analyze working directory changes (local development)
python detect_ref_impacts.py

# CI/CD: Compare HEAD to main (for CI/CD pipelines)
python detect_ref_impacts.py --ci
```

### Command Options

```bash
# Show all available options
python detect_ref_impacts.py --help
```

| Option | Description | Use Case |
|--------|-------------|----------|
| *(none)* | Analyze working directory changes against HEAD | **Local development** - Check uncommitted changes before committing |
| `--ci` | Compare HEAD to main | **CI/CD pipelines** - Check if branch will break references when merged |

## How It Works

### 1. Git Change Analysis

The tool analyzes git changes using local git commands:
- `git diff` to compare branches or commits
- Parses diff output to identify file changes

### 2. Ref Anchor Detection

Parses RST content to identify:

**Ref Anchor Definitions:**
```rst
.. _my-anchor-name:
```

**Ref Role Usage:**
```rst
:ref:`my-anchor-name`
:ref:`Link Text <my-anchor-name>`

# Multi-line ref roles (also supported):
:ref:`Long link text that spans
multiple lines <my-anchor-name>`

:ref:`Link text
<my-anchor-name>`
```

### 3. Versioned Repository Handling

The tool intelligently handles MongoDB's versioned documentation structure:

**Change Detection** (what anchors were removed):
- ✅ **Analyzes changes in `current/` directories** → immediate impact (breaks production now)
- ✅ **Analyzes changes in `upcoming/` directories** → future impact (breaks when upcoming → current)
- ✅ **Skips changes in historical versions** (v8.0, v7.0, etc.) since they don't create new cross-reference impacts
- ✅ **Special handling for manual repository** which uses `manual/manual/` instead of `manual/current/`

**Reference Search** (where removed anchors are used):
- ✅ **Searches ALL versions** (v8.0, v7.0, current, upcoming, etc.) since old versions still get built and published
- ✅ **Comprehensive coverage** across the entire MongoDB documentation ecosystem

**For Non-Versioned Repositories** (atlas, compass, etc.):
- ✅ **Analyzes all changes** (since they don't have version directories)
- ✅ **Searches entire repository** for references

### 4. Impact Analysis

The tool intelligently distinguishes between:
- **Truly Removed**: Anchors deleted without being re-added elsewhere → **⚠️ FLAGGED**
- **Moved/Renamed**: Anchors that appear in different locations → **✅ NOT FLAGGED**

**Smart Move Detection**:
- ✅ **Same impact category**: `atlas/file1.txt` → `atlas/file2.txt` (no warning)
- 🔗 **Cross-repository with intersphinx**: `manual/file.txt` → `atlas/file.txt` (validated against `snooty.toml` configs)
- ⚠️ **Cross-repository without intersphinx**: `manual/file.txt` → `compass/file.txt` (warning if compass can't reference manual)
- ⚠️ **Cross-category**: `current/file.txt` → `upcoming/file.txt` (immediate impact warning)
- ⚠️ **Truly removed**: Anchor deleted entirely (immediate/future impact warning)

**Why This Approach Works**:
- **Problem**: Removing anchors breaks references across the entire MongoDB ecosystem
- **Solution**: Detect changes in both `current/` and `upcoming/`, search everywhere for impacts
- **Immediate Impact**: Remove anchor from `current/` → breaks references NOW
- **Future Impact**: Remove anchor from `upcoming/` → breaks references when upcoming → current

**Cross-Category Move Logic**:
- Moving `current/` → `upcoming/` = **immediate impact** (references break now, even though anchor exists in upcoming)
- Moving `upcoming/` → `current/` = **no immediate impact** (references work immediately)
- This matches the real-world behavior of intersphinx cross-references

**Intersphinx Validation**:
- **Parses `snooty.toml` files** to understand which sites can reference which other sites
- **Filters false positives** from cross-site moves where target site has proper intersphinx configuration
- **Example**: `manual` → `atlas` move is safe if referencing sites have `atlas` in their `snooty.toml`
- **Prevents over-reporting** of cross-site reference issues

**Simplified Edge Cases**:
- **No conditional content detection** (`.. cond::`, `.. only::` no longer used)
- **No include file warnings** (handled by Snooty build process)
- **Conservative approach** for unknown cases (includes references for manual review)

**Special Repository Structures**:
- **Manual Repository**: Uses `manual/manual/` as current version (not `manual/current/`)
- **Other Repositories**: Use standard `repo/current/` structure
- **Workflow Commands**: Tool automatically handles both structures correctly

### 4. Corpus Search

Searches all documentation files for references to removed anchors:
- Scans `content/**/*.rst` files
- Scans `content/**/*.txt` files
- Reports exact file locations of cross-references

## Output Examples

### No Impact Found

```
✅ No ref anchors were removed in this pull request.
```

### Impact Detected

```
🔍 Cross-Reference Impact Analysis
========================================

🚨 IMMEDIATE IMPACT (affects production now)
Analyzed 1 anchor(s) removed from current/published versions:

📍 Anchor: 'old-command-reference' (IMMEDIATE)
   🚨 Found 8 file(s) with references:
      - content/atlas/source/cli-reference.txt
      - content/manual/manual/source/reference/commands.txt
      - content/manual/v8.0/source/reference/commands.txt
      - content/manual/v7.0/source/reference/commands.txt
      - content/node/current/source/quick-start.rst
      - content/ops-manager/current/source/tutorial/install.txt
      - content/atlas-operator/current/source/ak8so-quick-start.txt
      - content/drivers/source/quick-start.rst

⏳ FUTURE IMPACT (affects production when upcoming → current)
Analyzed 1 anchor(s) removed from upcoming/ versions:

📍 Anchor: 'upcoming-feature' (FUTURE)
   ⏳ Found 3 file(s) with references:
      - content/manual/v8.0/source/new-features.txt
      - content/atlas/source/roadmap.txt
      - content/node/current/source/changelog.rst

========================================
📊 SUMMARY
========================================
🚨 IMMEDIATE: 8 file(s) will break on merge
⏳ FUTURE: 3 file(s) will break when upcoming → current

💡 RECOMMENDATIONS:
   • Review immediate impacts before merging
   • Plan for future impacts during version promotion
   • Consider updating affected files or adding redirects
```

## File Structure

```
content/tools/ref-anchor-impact-detector/
├── README.md                           # This documentation
├── detect_ref_impacts.py               # Main command-line interface
└── local_git_detector.py               # Core analysis engine
```

## Technical Details

### Supported File Types

- `.rst` files (reStructuredText)
- `.txt` files (common in MongoDB documentation)

### Regex Patterns

**Ref Anchor Pattern:**
```python
r'^\s*\.\.\s+_([^:\s]+):\s*$'
```

**Ref Role Pattern:**
```python
r':ref:`([^`<]+?)(?:\s*<([^>]+?)>)?`'  # with re.DOTALL for multi-line support
```

## 🔧 Architecture

### Tool Components

- **`detect_ref_impacts.py`**: Main command-line interface
- **`local_git_detector.py`**: Core analysis engine with all functionality
- **Intersphinx parsing**: Reads `snooty.toml` files to understand cross-site dependencies
- **Git integration**: Uses local git commands to analyze changes

### Key Algorithms

1. **Change Detection**: Parses git diffs to identify removed ref anchors
2. **Smart Move Detection**: Distinguishes truly removed vs. moved anchors
3. **Corpus Search**: Regex-based search across 79,000+ documentation files
4. **Intersphinx Filtering**: Validates cross-site references using actual configurations
5. **Impact Classification**: Categorizes immediate vs. future impacts

## 🚀 Performance

- **Scan Speed**: Analyzes 79,000+ files in 30-60 seconds
- **Memory Usage**: ~100-200MB RAM for full corpus analysis
- **Accuracy**: Minimizes false positives through smart detection logic
- **Scalability**: Handles MongoDB's complex multi-site, multi-version architecture

## 🤝 Contributing

This tool is designed to be:
- **Safe**: Read-only operations, no modifications to source files
- **Comprehensive**: Covers all MongoDB documentation sites and versions
- **Accurate**: Minimizes false positives through smart detection logic
- **Maintainable**: Clear code structure with comprehensive error handling

For questions or improvements, please reach out to the MongoDB documentation team.
