# Atlas Event Types Generator

**Purpose**: Automatically generates and updates the Atlas event types documentation by fetching the latest event types from the MongoDB Atlas Admin API.

## Overview

This tool maintains the comprehensive list of Atlas event types in `content/atlas/source/includes/event-types.rst` by:

1. Calling the MongoDB Atlas Admin API `/api/atlas/v2/eventTypes` endpoint
2. Retrieving all available event types (1000+ events across multiple API pages)
3. Alphabetizing events for consistent documentation structure
4. Applying terminology corrections for user-facing consistency
5. Generating a restructured text table with event types, descriptions, and alertable status

## Prerequisites

### 1. MongoDB Atlas API Key

You must create an API key in **production Atlas** (not cloud-dev) with appropriate permissions:

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to **Access Manager** → **API Keys**
3. Create a new API key with **Organization Member** permissions
4. Add your current IP address to the API key's **Access List**

### 2. Environment Variables

Set the following environment variables:

```bash
export ATLAS_PUBLIC_KEY="your_public_key_here"
export ATLAS_PRIVATE_KEY="your_private_key_here"
```

## Installation

```bash
cd content/tools/atlas-event-types-generator
npm install
```

## Usage

### Basic Usage

```bash
node event-types-generator.js
```

This outputs the complete restructured text table to stdout.

### Update Documentation

To update the documentation file directly:

```bash
node event-types-generator.js > ../../atlas/source/includes/event-types.rst
```



## Features

### Terminology Corrections

The script automatically applies terminology corrections to maintain consistency with user-facing documentation:

- **Stream Processing Instance** → **Stream Processing Workspace**

This ensures the API remains the source of truth while the documentation uses approved terminology.

### Comprehensive Coverage

- Fetches **all** event types (currently 1000+) across multiple API pages
- Handles pagination automatically (500 events per page)
- Includes event type, description, and alertable status for each event

### Consistent Output Format

Generates properly formatted reStructuredText with:
- Alphabetically sorted event types
- Consistent anchor links (`atlas_event_<eventtype>`)
- Proper table formatting for Sphinx documentation
- "yes"/"no" values for alertable status

## API Details

### Endpoint
```
GET https://cloud.mongodb.com/api/atlas/v2/eventTypes
```

### Authentication
- Uses HTTP Digest Authentication
- Requires valid Atlas API key with appropriate permissions

### Headers
```
Accept: application/vnd.atlas.2023-01-01+json
```

### Pagination
- `itemsPerPage=500` (maximum allowed)
- `pageNum=1,2,3...` for subsequent pages
- Currently requires 2+ pages to fetch all events

## Output Format

The generated reStructuredText follows this pattern:

```rst
.. list-table::
   :header-rows: 1
   :widths: 40 35 10

   * - Event Type
     - Description
     - Alertable? 

   * - ``EVENT_TYPE_NAME``
     - .. _atlas_event_event_type_name:

       Event description here
     - yes/no
```



## Files

- `event-types-generator.js` - Main script
- `package.json` - Node.js dependencies
- `README.md` - This documentation
- Output: `../../atlas/source/includes/event-types.rst`
