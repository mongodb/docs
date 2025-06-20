# Ingest MongoDB Public Docs

This is the ingest config for public MongoDB documentation (https://www.mongodb.com/docs).

## Overview

This tool ingests MongoDB documentation from the Snooty Data API and processes it for use for the LLMs.txt project It:

- Fetches documentation pages from the Snooty API
- Converts the content to markdown format
- Stores the processed pages in the `page_with_links` collection of the chatbot database
- Maintains relationships between pages and their links

**Note**: This package was developed by the chatbot team, so the processed documentation is stored in the chatbot database rather than the DOP database.

## Environment Setup

The project requires environment variables to be configured. An example configuration is provided in the `.env-example` file. To set up:

1. Copy `.env-example` to create a new `.env` file
2. Update the values in `.env` with your specific configuration



## Building the Config

```sh
npm i
npm run build
```

## Using the Config

```sh
npm run ingest:all
```

## Release

### Staging

TODO

### Production 

TODO