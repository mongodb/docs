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

### 🔔 Atlas Event Types Generator (`atlas-event-types-generator/`)

**Purpose**: Automatically generates and updates Atlas event types documentation from the MongoDB Atlas Admin API

**Key Features**:
- Fetches all 1000+ event types from production Atlas API
- Handles pagination automatically (multiple API calls)
- Applies terminology corrections (e.g., "Stream Processing Instance" → "Stream Processing Workspace")
- Generates properly formatted reStructuredText with anchors
- Alphabetically sorted output for consistency
- Adds timestamp to track last update
- Supports both Service Account OAuth and API Key authentication

**Prerequisites**:
- MongoDB Atlas credentials (Service Account preferred or API Key)
- Environment variables: `ATLAS_CLIENT_ID` and `ATLAS_CLIENT_SECRET` OR `ATLAS_PUBLIC_KEY` and `ATLAS_PRIVATE_KEY`
- For API keys: IP address added to API key access list

**Usage**:
```bash
cd atlas-event-types-generator
npm install
node event-types-generator.js
```

**Output**:
- `../../atlas/source/includes/event-types.rst` - Complete event types documentation with timestamp

### 🚦 Atlas Rate Limits Generator (`atlas-rate-limits-generator/`)

**Purpose**: Automatically generates Atlas API rate limits documentation from the MongoDB Atlas Admin API

**Key Features**:
- Fetches rate limit information for all Atlas API endpoint sets
- Lists all endpoints in each rate limit group with HTTP methods and paths
- Shows capacity, refill rate, refill interval, and scope for each endpoint set
- Generates properly formatted reStructuredText table
- Alphabetically sorted by endpoint set name
- Adds timestamp to track last update
- Supports both Service Account OAuth and API Key authentication

**Prerequisites**:
- MongoDB Atlas credentials (Service Account preferred or API Key)
- Environment variables: `ATLAS_CLIENT_ID` and `ATLAS_CLIENT_SECRET` OR `ATLAS_PUBLIC_KEY` and `ATLAS_PRIVATE_KEY`
- For API keys: IP address added to API key access list

**Usage**:
```bash
cd atlas-rate-limits-generator
npm install
node rate-limits-generator.js
```

**Output**:
- `../../atlas/source/includes/api-rate-limits.rst` - Complete rate limits documentation with timestamp


For questions about tool development or maintenance, consult the documentation team or check existing tool implementations for patterns and best practices.
