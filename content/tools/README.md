# MongoDB Documentation Tools

This directory contains automation tools for maintaining MongoDB documentation. Each subdirectory contains specialized tooling for different aspects of the documentation pipeline.

## Available Tools

### 📋 Atlas CLI Commands TOC Generator (`atlas-cli-commands-toc/`)

**Purpose**: Automatically generates table of contents entries for MongoDB Atlas CLI commands

**Key Features**:
- Fetches commands from `mongodb/mongodb-atlas-cli` and `mongodb/atlas-cli-plugin-kubernetes` repositories
- Git-based processing to avoid API rate limits
- Automatic version constraint detection across CLI versions
- Unified output with 900+ commands properly versioned
- TypeScript type safety with XOR constraint types

**Usage**:
```bash
cd atlas-cli-commands-toc
npm install
npx tsx generate-k8s-cli-commands.ts
npx tsx generate-cli-commands.ts atlascli/v1.46.2
```

**Output**: 
- `../../table-of-contents/docset-data/atlas-cli-commands.ts`
- Copies command files to required documentation directories


For questions about tool development or maintenance, consult the documentation team or check existing tool implementations for patterns and best practices.
