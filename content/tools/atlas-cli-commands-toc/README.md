# MongoDB Atlas CLI Table of Contents Generator

This project generates TypeScript table of contents entries for MongoDB Atlas CLI commands by fetching command documentation files from the MongoDB Atlas CLI GitHub repository and Kubernetes plugin repository.

## Features

- **Git-Based Repository Access**: Clones repositories locally to bypass GitHub API rate limits
- **Dual Repository Support**: Processes both main Atlas CLI and Kubernetes plugin commands
- **Version Constraint Detection**: Automatically detects which commands exist in which versions and applies appropriate version constraints
- **Version/Tag Support**: Generates commands from specific CLI versions using tags
- **Modular Design**: Generates commands in separate files that can be imported
- **Hierarchical Structure**: Automatically creates nested command structures based on command naming
- **Auto-generation**: Fetches commands directly from MongoDB repositories
- **Type Safety**: Written in TypeScript with full type safety using proper XOR version constraint types
- **Alphabetical Integration**: Kubernetes commands are seamlessly integrated alphabetically with main CLI commands
- **File Synchronization**: Automatically copies command files to required documentation directories
- **Serverless Filtering**: Automatically filters out deprecated serverless commands and cleans references

## Architecture

### Scripts

- **`generate-cli-commands.ts`** - Main script that:
  - Clones the `mongodb/mongodb-atlas-cli` repository
  - Processes 900+ Atlas CLI commands
  - **Filters out serverless commands** (files with "serverless" or "Serverless" in name)
  - **Cleans serverless references** from remaining files (toctree entries and :ref: links)
  - Clones the `mongodb/atlas-cli-plugin-kubernetes` repository
  - Merges Kubernetes commands directly into main command hierarchy
  - Checks version availability across 10 version directories
  - Applies version constraints (includes/excludes) based on file availability
  - Copies command files to both `atlas-cli/upcoming/source/command/` and `atlas/source/includes/command/`
  - Generates final unified table of contents with all commands integrated

- **`generate-k8s-cli-commands.ts`** - Kubernetes plugin helper script that:
  - Clones the `mongodb/atlas-cli-plugin-kubernetes` repository
  - Processes Kubernetes plugin commands
  - Generates intermediate `atlas-cli-k8s-commands.ts` file for reference
  - Uses git-based approach to avoid API rate limits
  - **Note**: K8s commands are automatically merged by main script

- **`fix_rst_syntax.py`** - Python script for comprehensive reStructuredText syntax fixing:
  - Fixes single backticks to double backticks for monospace text
  - Repairs broken tab directive structures with proper 6-space indentation
  - Fixes literalinclude block indentation issues
  - Removes duplicate language directives
  - Handles completion files with tab-indented content
  - Syncs files between atlas-cli and atlas directories with proper extensions

- **`fix_rst_syntax.sh`** - Fast shell script for bulk syntax operations:
  - Uses sed commands for rapid bulk text processing
  - Handles indentation fixes and duplicate directive removal
  - Provides colorized output for easy monitoring
  - Ideal for quick fixes on large file sets

### Generated Files

- **`../../table-of-contents/docset-data/atlas-cli-commands.ts`** - Final unified command list with version constraints
  - Contains all main Atlas CLI commands AND Kubernetes commands merged together
  - No separate imports needed - all commands are integrated alphabetically
  - Includes proper version constraints for all commands
- **`../../table-of-contents/docset-data/atlas-cli-k8s-commands.ts`** - Kubernetes commands reference file
  - Generated for development reference and debugging
  - Not imported by main commands file (commands are merged directly)
- **`generation-summary.json`** - Main script execution summary
- **`k8s-generation-summary.json`** - Kubernetes script execution summary

### File Structure and Integration

The system uses a unified approach where:

1. **Main script processes both repositories** - clones and processes both main CLI and Kubernetes repositories
2. **Commands are merged alphabetically** - Kubernetes commands are integrated directly into the main command hierarchy
3. **Single unified output** - one `atlas-cli-commands.ts` file contains all commands
4. **No separate imports required** - eliminates the need for modular imports and potential duplicates
5. **Automatic deduplication** - if main CLI already includes Kubernetes commands, plugin commands are skipped

### Version Constraint System

The system automatically detects commands that don't exist in all versions and applies appropriate constraints:

- **Excludes**: Commands missing from older versions get `{"excludes":["v1.38","v1.39"]}`
- **Includes**: Commands only in specific versions get `{"includes":["v1.45","current"]}`
- **No Constraints**: Commands in all versions have no version property

## Prerequisites

Before running the scripts, you need:

1. **Node.js** (version 18 or higher)
   ```bash
   node --version  # Should be v18.x.x or higher
   ```

2. **npm** (comes with Node.js)
   ```bash
   npm --version
   ```

3. **Git** (for repository cloning)
   ```bash
   git --version
   ```

## Installation

Navigate to the generator directory and install dependencies:

```bash
cd content/tools/atlas-cli-commands-toc
npm install
```

This will install:
- `tsx` - TypeScript execution engine
- `typescript` - TypeScript compiler
- `@types/node` - Node.js type definitions

## Usage

### 1. Complete Generation Workflow

For a complete documentation update with integrated commands:

```bash
# 1. Navigate to the generator directory
cd content/tools/atlas-cli-commands-toc

# 2. Install dependencies (first time only)
npm install

# 3. Generate unified Atlas CLI commands (includes Kubernetes integration)
npx tsx generate-cli-commands.ts atlascli/v1.46.2
```

**Note**: The main script automatically processes both repositories and merges all commands. Running the Kubernetes script separately is optional and only needed for debugging or development purposes.

### 2. Individual Script Usage

#### Main Atlas CLI Commands (Recommended)
```bash
# Generate unified CLI commands with integrated Kubernetes commands
npx tsx generate-cli-commands.ts atlascli/v1.46.2

# Available npm scripts
npm run generate-cli:v1.46.2
```

#### Kubernetes Plugin Commands (Development/Debug Only)
```bash
# Generate Kubernetes plugin commands for reference
npx tsx generate-k8s-cli-commands.ts

# Available npm scripts  
npm run generate-k8s
```

### 3. Version Constraint Examples

The system automatically applies version constraints based on file availability:

```typescript
// Command missing from older versions
{
  label: "autoScalingConfiguration",
  contentSite: "atlas-cli",
  url: "/docs/atlas/cli/:version/command/atlas-api-clusters-autoScalingConfiguration/",
  versions: {"excludes":["v1.38","v1.39","v1.40"]}
}

// Command available in all versions (no constraints)
{
  label: "create", 
  contentSite: "atlas-cli",
  url: "/docs/atlas/cli/:version/command/atlas-clusters-create/"
}
```

### 4. Import Setup (One-time)

To use the generated commands in the main atlas-cli.ts file:

1. **Add import statement** at the top of `content/table-of-contents/docset-data/atlas-cli.ts`:
   ```typescript
   import { atlasCliCommands } from './atlas-cli-commands';
   ```

2. **Replace the Commands section items** with the imported commands:
   ```typescript
   {
     label: "Commands",
     collapsible: true,
     items: atlasCliCommands  // Contains all CLI + Kubernetes commands integrated
   }
   ```

**Important**: Do NOT import `atlasCliK8sCommands` separately or create a separate "Kubernetes Plugin Commands" section, as this will create duplicates. All Kubernetes commands are already integrated into `atlasCliCommands`.

### 5. Development

```bash
# Type check the TypeScript code
npm run type-check

# Build to JavaScript (optional)
npm run build
```

### 6. Tag Format and Repositories

#### Atlas CLI Repository
- **Repository**: `mongodb/mongodb-atlas-cli`
- **Tag Format**: `atlascli/v<version>`
- **Examples**: `atlascli/v1.46.2`, `atlascli/v1.45.0`, `atlascli/v1.44.1`
- **Available Tags**: https://github.com/mongodb/mongodb-atlas-cli/tags

#### Kubernetes Plugin Repository  
- **Repository**: `mongodb/atlas-cli-plugin-kubernetes`
- **Branch**: Uses `main` branch
- **Commands**: Processes all `.txt` files from the repository

### 7. Serverless Command Filtering

The tool automatically filters out deprecated serverless commands during the generation process:

#### File Filtering
- **Removes files** with "serverless" or "Serverless" in the filename
- **Logs filtered files** for transparency
- Example: `atlas-serverless-list.txt` → filtered out

#### Content Cleaning
For remaining files, the tool automatically removes serverless references:

**Toctree Entries Removed:**
```rst
# These lines are automatically removed from toctree sections:
createServerlessBackupRestoreJob </command/atlas-api-cloudBackups-createServerlessBackupRestoreJob>
getServerlessAutoIndexing </command/atlas-api-performanceAdvisor-getServerlessAutoIndexing>
listServerlessBackups </command/atlas-api-cloudBackups-listServerlessBackups>
```

**Reference Links Removed:**
```rst
# These reference links are automatically removed:
* :ref:`atlas-api-cloudBackups-createServerlessBackupRestoreJob` - Restores one snapshot...
* :ref:`atlas-api-performanceAdvisor-getServerlessAutoIndexing` - Get whether the Serverless...
```

#### Testing Serverless Filtering
```bash
# Test the serverless filtering functionality
npx tsx test-serverless-filtering.ts
```

### 8. RestructuredText Syntax Fixing

After importing new command files, use these tools to fix common syntax issues:

#### Python Script (Comprehensive)
```bash
# Fix all syntax issues with detailed processing
python fix_rst_syntax.py

# The script will automatically:
# - Fix single backticks to double backticks for monospace text
# - Repair broken tab directive structures 
# - Fix literalinclude block indentation
# - Remove duplicate language directives
# - Sync files between directories with proper extensions
```

#### Shell Script (Fast Bulk Operations)
```bash
# Quick syntax fixes using sed commands
./fix_rst_syntax.sh

# Provides:
# - Rapid bulk text processing
# - Colorized output for monitoring
# - Indentation and directive fixes
```

**Note**: Run these scripts after each command import to ensure proper reStructuredText syntax. See `RST_SYNTAX_FIXER_README.md` and `RST_SYNTAX_FIXES_README.md` for detailed documentation.

## Output and Statistics

### Generated Command Statistics
- **Main Atlas CLI**: ~913 commands from mongodb/mongodb-atlas-cli
- **Kubernetes Plugin**: ~7 commands from mongodb/atlas-cli-plugin-kubernetes  
- **Total Commands**: ~920 commands in final unified output (all integrated alphabetically)
- **Version Constraints**: ~12 commands with version restrictions automatically applied

### File Locations
- **Primary Output**: `../../table-of-contents/docset-data/atlas-cli-commands.ts` (contains all commands)
- **Reference Files**: `../../table-of-contents/docset-data/atlas-cli-k8s-commands.ts` (for development only)
- **Command Files**: Copied to both directories with appropriate extensions:
  - `../../atlas-cli/upcoming/source/command/` (maintains original `.txt` extension)
  - `../../atlas/source/includes/command/` (converts to `.rst` extension for includes)
  - **Note**: Atlas kubernetes files specifically converted from `.txt` to `.rst` in atlas includes directory

## Troubleshooting

### Git and Repository Issues
- **"Git clone failed"**: Check internet connection and repository access
- **"Branch/tag not found"**: Verify tag exists at https://github.com/mongodb/mongodb-atlas-cli/tags
- **"Permission denied"**: Ensure git is installed and configured

### Node.js and Dependencies
- **"command not found: npx"**: Install Node.js from https://nodejs.org/
- **"Cannot find module 'tsx'"**: Run `npm install` in the generator directory
- **"Type errors"**: Run `npm run type-check` to see detailed TypeScript errors

### Version Constraint Issues
- **"No version constraints applied"**: Check that commands exist in different versions across `v1.38-v1.45`, `current`, `upcoming`
- **"Wrong version constraints"**: Verify file exists in expected version directories in `content/atlas-cli/`

### API and Rate Limiting (Legacy)
- **No longer applicable**: Scripts now use git cloning to avoid GitHub API rate limits
- **"API rate limit exceeded"**: Update to latest scripts that use git-based approach

## Performance Notes

- **Git Cloning**: Each run clones repositories to `/tmp` directories and cleans up automatically
- **Processing Time**: ~30-60 seconds for complete generation depending on network speed
- **Memory Usage**: Minimal - processes files individually rather than loading entire repositories into memory
- **Rate Limits**: Eliminated by using git cloning instead of GitHub API calls

## Advanced Usage

### Custom Branches
```bash
# Use a specific branch instead of tag
npx tsx generate-cli-commands.ts main

# Use development branch
npx tsx generate-cli-commands.ts feature/new-commands
```

### Debugging
```bash
# Enable verbose output (if implemented)
DEBUG=1 npx tsx generate-cli-commands.ts atlascli/v1.46.2

# Check generated file statistics
wc -l ../../table-of-contents/docset-data/atlas-cli-commands.ts
```

### Validation
```bash
# Verify TypeScript compilation
npx tsc --noEmit ../../table-of-contents/docset-data/atlas-cli-commands.ts

# Check version constraints count
grep -c "versions:" ../../table-of-contents/docset-data/atlas-cli-commands.ts
```

## Summary

This automation system provides a comprehensive solution for maintaining MongoDB Atlas CLI documentation with the following key capabilities:

### Key Benefits
- **Eliminates Manual Work**: Automatically generates and updates 900+ command entries
- **Version Accuracy**: Ensures commands only appear in versions where they actually exist
- **Type Safety**: Full TypeScript integration with proper constraint types
- **Dual Repository Support**: Seamlessly integrates main CLI and Kubernetes plugin commands
- **No Rate Limits**: Git-based approach eliminates GitHub API restrictions

### Workflow Integration
1. **Development**: When new Atlas CLI versions are released
2. **Generation**: Run scripts to fetch and process latest commands
3. **Integration**: Generated files automatically integrate with existing table of contents
4. **Deployment**: Version-constrained commands ensure accurate documentation across all CLI versions

### Maintenance
The system is designed to be low-maintenance:
- Scripts handle repository changes automatically
- Version constraints adapt to new CLI versions
- TypeScript types ensure compile-time safety
- Import-based architecture allows updates without manual file editing

This automation ensures MongoDB Atlas CLI documentation stays current, accurate, and properly versioned with minimal manual intervention.
