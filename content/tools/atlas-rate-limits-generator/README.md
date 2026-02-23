# Atlas Rate Limits Generator

**Purpose**: Automatically generates documentation table for Atlas API rate limits by fetching from the MongoDB Atlas Admin API.

## Overview

This tool fetches rate limit information from the Atlas API and generates a reStructuredText table with:
- Rate limit name
- Maximum requests allowed
- Time period for the limit
- Resource type

## Prerequisites

### 1. MongoDB Atlas API Key or Service Account

You must create credentials in **production Atlas** with appropriate permissions:

**Service Account (Recommended):**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to **Access Manager** → **Service Accounts**
3. Create a new service account with read permissions for rate limits

**API Key (Alternative):**
1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to **Access Manager** → **API Keys**
3. Create a new API key with **Organization Member** permissions
4. Add your current IP address to the API key's **Access List**

### 2. Environment Variables

**For Service Account:**
```bash
export ATLAS_CLIENT_ID="your_client_id_here"
export ATLAS_CLIENT_SECRET="your_client_secret_here"
```

**For API Key:**
```bash
export ATLAS_PUBLIC_KEY="your_public_key_here"
export ATLAS_PRIVATE_KEY="your_private_key_here"
```

**Optional - API Version:**
```bash
export ATLAS_API_VERSION="preview"  # Default is "preview" for rate limits API
```

## Installation

```bash
cd content/tools/atlas-rate-limits-generator
npm install
```

## Usage

### Basic Usage

```bash
node rate-limits-generator.js
```

This outputs the complete restructured text table to stdout.

### Save to File

```bash
node rate-limits-generator.js > rate-limits.rst
```

## Output Format

The script generates a reStructuredText table like:

```rst
.. list-table::
   :header-rows: 1
   :widths: 30 20 20 30

   * - Name
     - Limit
     - Period
     - Resource Type

   * - Example Rate Limit
     - 100
     - 1 minute
     - API
```

## Troubleshooting

### API Not Available (404)

If you see a 404 error, the rate limits API may not be available in production yet. The script will display:

```
ERROR: Rate limits API endpoint not found (404).
This API may not be available in production yet.
```

### Authentication Errors

If you see 401/403 errors:
- Verify your credentials are correct
- Check that service account/API key has proper permissions
- For API keys, ensure your IP is whitelisted

## Notes

- The rate limits API uses the `preview` version by default
- Output is sorted alphabetically by rate limit name
- Status messages are sent to stderr, table output to stdout
