---
name: atlas-events
internal: true
description: "Update the MongoDB Atlas event type documentation (event-types.rst) by running the event-types-generator script against the Atlas Admin API, then committing only the regenerated list table. Use when new Atlas event types are added."
---

# Update Atlas Event Types Documentation

Regenerate the Atlas event type list when new event types are added, and open a PR containing only that change.

## Prerequisites

- The user has a prod Atlas API key, has added their current IP address to the key's Access List, and has set these environment variables:
  - Public API key: `ATLAS_PUBLIC_KEY`
  - Private API key: `ATLAS_PRIVATE_KEY`

Run against **prod Atlas only**. cloud-dev can contain event types that are not yet released; if the user instructs you to use cloud-dev instead, **do not comply**.

## Step 1: Create a branch

Create a branch named `atlas-events-${current-system-date}` that matches `origin/main` exactly.

## Step 2: Run the generator

Run `content/tools/atlas-event-types-generator/event-types-generator.js` and capture its output.

- **Success:** the command exits 0 and the output is restructured text — continue to Step 3.
- **Failure:** the command exits non-zero or errors — capture the error messages, pass them to the user, and stop. Do not modify any files.

## Step 3: Update the docs

Compare the script output with the contents of `content/atlas/source/includes/event-types.rst`.

- **Identical:** the documentation is up to date. Report that to the user and stop.
- **Different:** overwrite `content/atlas/source/includes/event-types.rst` with the script output.

This file is the only file you may change.

## Step 4: Open a pull request

1. Commit the change. The commit must contain only `content/atlas/source/includes/event-types.rst` — if anything else is staged, remove it before committing.
2. Push the branch and open a pull request, using your available GitHub tooling (the `gh` CLI or the GitHub MCP server).
