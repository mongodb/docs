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

## Architecture

### Scripts

- **`generate-cli-commands.ts`** - Main script that:
  - Clones the `mongodb/mongodb-atlas-cli` repository
  - Processes 900+ Atlas CLI commands
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

- **`generate-local-cli-commands.ts`** - Atlas Local CLI plugin script that:
  - Clones the `mongodb/atlas-local-cli` repository
  - Processes Atlas Local CLI plugin commands from `docs/generated` directory
  - Applies RST syntax fixers to clean up formatting issues
  - Adds `:orphan:` directive to all files to suppress toctree warnings
  - Copies command files to both `atlas-cli/upcoming/source/command/` and `atlas/source/includes/command/`
  - Generates `atlas-cli-local-commands.ts` file for import into main ToC
  - Uses git-based approach to avoid API rate limits

### G../../table-of-contents/docset-data/atlas-cli-local-commands.ts`** - Atlas Local CLI commands file
  - Contains all atlas local plugin commands
  - Imported separately and added as sibling to atlas and atlas-api commands
  - All files include `:orphan:` directive to suppress toctree warnings
- **`generation-summary.json`** - Main script execution summary
- **`k8s-generation-summary.json`** - Kubernetes script execution summary
- **`local-generation-summary.json`** - Atlas Local CLI
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

Version directories checked: `current`, `upcoming`, `v1.38`, `v1.39`, `v1.40`, `v1.41`, `v1.42`, `v1.43`, `v1.44`, `v1.45`

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

Generator script (generate-cli-commands.ts)
-----------------------------------------

The main generator is `generate-cli-commands.ts` and is the canonical way to produce the
`atlas-cli-commands.ts` file used by the table-of-contents. Quick usage:

```bash
# from this directory
npx tsx generate-cli-commands.ts <tag-or-branch>
# example
npx tsx generate-cli-commands.ts atlascli/v1.46.2
```

Notes:
- The script clones the Atlas CLI repository and copies `.txt` command files into
  `../../atlas-cli/upcoming/source/command/` and `../../atlas/source/includes/command/`.
- The generator writes `../../table-of-contents/docset-data/atlas-cli-commands.ts`.
- Run `npm install` first if the `tsx` runner or other dependencies are missing.


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
# G

#### Atlas Local CLI Commands
```bash
# Generate Atlas Local CLI plugin commands
npx tsx generate-local-cli-commands.ts v0.0.5

# Use latest release tag
npx tsx generate-local-cli-commands.ts v0.0.5

# Use main branch for development
npx tsx generate-local-cli-commands.ts main
```enerate Kubernetes plugin commands for reference
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


**Atlas Local CLI Commands Setup**: For Atlas Local CLI commands, add them as a sibling to atlas and atlas-api:

1. **Add import statement** at the top:
   ```typescript
   import { atlasCliLocalCommands } from './atlas-cli-local-commands';
   ```

2. **Add as sibling in Commands section**:
   ```typescript
   {
     label: "Commands",
     collapsible: true,
     items: [
       ...atlasCliCommands,
       {
         label: 'atlas local',
         contentSite: 'atlas-cli',
         url: '/docs/atlas/cli/:version/command/atlas-local/',
         collapsible: true,
         items: atlasCliLocalCommands,
       },
     ]

#### Atlas Local CLI Repository
- **Repository**: `mongodb/atlas-local-cli`
- **Tag Format**: `v<version>`
- **Examples**: `v0.0.5`, `v0.0.4`, `main`
- **Available Tags**: https://github.com/mongodb/atlas-local-cli/tags
- **Atlas Local CLI**: ~11 commands from mongodb/atlas-local-cli
- **Total Commands**: ~920 commands in main output + ~11 local commands
   }
   ```
To use the generated commands in the main atlas-cli.ts file:main + K8s commands)
- **Atlas Local Output**: `../../table-of-contents/docset-data/atlas-cli-local-commands.ts` (local CLI commands)
- **Reference Files**: `../../table-of-contents/docset-data/atlas-cli-k8s-commands.ts` (for development only)
- **Command Files**: Copied to both:
  - `../../atlas-cli/upcoming/source/command/`
  - `../../atlas-cli/current
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

## Output and Statistics

### Generated Command Statistics
- **Main Atlas CLI**: ~913 commands from mongodb/mongodb-atlas-cli
- **Kubernetes Plugin**: ~7 commands from mongodb/atlas-cli-plugin-kubernetes  
- **Total Commands**: ~920 commands in final unified output (all integrated alphabetically)
- **Version Constraints**: ~12 commands with version restrictions automatically applied

### File Locations
- **Primary Output**: `../../table-of-contents/docset-data/atlas-cli-commands.ts` (contains all commands)
- **Reference Files**: `../../table-of-contents/docset-data/atlas-cli-k8s-commands.ts` (for development only)
- **Command Files**: Copied to both:
  - `../../atlas-cli/upcoming/source/command/`
  - `../../atlas/source/includes/command/`

## RST Syntax Fixing

This directory includes a Python script for fixing common reStructuredText syntax issues in generated Atlas CLI command files.

### Fix Script Usage

```bash
# Fix syntax issues in default directories (recommended)
python3 fix_rst_syntax.py

# Fix syntax issues in specific directory
python3 fix_rst_syntax.py /path/to/directory --pattern "*.txt"
```

### What It Fixes

The `fix_rst_syntax.py` script automatically corrects:

- **literalinclude Indentation**: Fixes literalinclude directives that need proper indentation within tab structures
- **Language Field Placement**: Moves `:language: shell` lines to correct positions within code blocks
- **Backtick Formatting**: Converts single backticks to double backticks for monospace text
- **Atlas CLI Patterns**: Specifically targets common issues in atlas-api-*.txt and atlas-api-*.rst files

### Default Processing

When run without arguments, the script processes:
- `../../atlas-cli/upcoming/source/command/` - Atlas CLI .txt files
- `../../atlas/source/includes/command/` - Atlas includes .rst files

This ensures both the main Atlas CLI documentation and included files maintain proper RST syntax.

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
