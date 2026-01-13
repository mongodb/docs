# Table of Contents API Build

This directory contains the API build functionality for managing MongoDB documentation table of contents deployments via Netlify.

## Overview

The `pnpm run api:build` command triggers a build deployment for the MongoDB VSCode documentation site. It sets up environment variables, creates a build hook, triggers the build, and then cleans up the hook.

## Prerequisites

Before running the API build, ensure you have:

1. **Node.js** installed (version 16 or higher)
2. **pnpm** package manager
3. **Netlify Access Token** - You'll need to set up your environment variables

### Environment Setup

Create a `.env` file in the `content/table-of-contents/` directory with your Netlify access token:

```bash
NETLIFY_ACCESS_TOKEN=your_netlify_access_token_here
```

To get your Netlify access token:
1. Go to [Netlify User Settings](https://app.netlify.com/user/settings/tokens)
2. Create a new personal access token
3. Copy the token and add it to your `.env` file

## Installation

Install the required dependencies:

```bash
pnpm install
```

## Usage

### Basic Command

```bash
pnpm run api:build --branch <branch-name>
```

### Branch Option

The `--branch` (or `-b`) option is **required** and specifies which branch to use for the build deployment.

**Examples:**

```bash
# Deploy from main branch
pnpm run api:build --branch main

# Deploy from a feature branch
pnpm run api:build --branch feat/new-feature

# Using the short alias
pnpm run api:build -b main
```

### Manual vs Automated Execution

**Manual Execution**: This service can be run manually using the commands listed above. This allows you to trigger builds on-demand when needed.

**Normal Behavior**: In typical operation, this service is automatically executed by GitHub Actions in response to:
- **Pull Request Events**: When PRs are opened, or updated
- **Push Events**: When code is pushed to monitored branches

The automated system uses the same build process and configuration as manual execution, but is managed through GitHub Actions workflows.

### What Happens When You Run the Command

1. **Environment Variable Setup**: The script sets up three environment variables for your specified branch:
   - `FRONTEND_VERSION`: Set to "feat/unified-nav"
   - `GATSBY_USE_UNIFIED_TOC`: Set to "true"
   - `POPULATE_METADATA_ENABLED`: Set to "true"

2. **Build Hook Creation**: Creates a temporary build hook for the MongoDB VSCode site with your specified branch

3. **Build Trigger**: Automatically triggers a build using the created webhook

4. **Cleanup**: Removes the temporary build hook to keep configurations clean

### Output

When successful, you'll see output similar to:

```
branch branch_name
Added feat/unified-nav to branch_name in FRONTEND_VERSION env var
Added true to branch_name in GATSBY_USE_UNIFIED_TOC env var
Added true to branch_name in POPULATE_METADATA_ENABLED_STAGING_ZW env var
Created site build hook:
        - tile: MONGODB_VSCODE_CUSTOM_BUILD_HOOK_[BRANCH_NAME]
        - branch: branch_name
        - createdAt: 2025-07-29T23:34:41.432Z
      
Calling MONGODB_VSCODE_CUSTOM_BUILD_HOOK_[BRANCH_NAME] webhook to trigger a build on branch_name
```

### Error Handling

If something goes wrong, the script will display error information to help you troubleshoot:

## Troubleshooting

### Common Issues

1. **Missing Netlify Token**: Ensure your `.env` file contains the correct `NETLIFY_ACCESS_TOKEN`

2. **Invalid Branch Name**: Make sure the branch name you specify actually exists in the repository

3. **Build Failures**: Check the Netlify dashboard for build logs if the deployment fails

### Getting Help

To see all available options and help:

```bash
pnpm run api:build --help
```

This will display:
- All available command options
- Descriptions for each option

## Development

For development purposes, you can also run the API in watch mode:

```bash
pnpm run api:dev
```

This will watch for file changes and automatically restart the development server.

## Tests

This project includes comprehensive testing, linting, and formatting to ensure code quality and reliability.

### Test Framework

The project uses **Jest** as the testing framework with **ts-jest** for TypeScript support. Tests are located in the `tests/` directory and follow the naming convention `*.test.ts`.

### Running Tests Locally

#### Run All Tests
```bash
pnpm test
```

#### Run Tests in Watch Mode
```bash
pnpm run test:watch
```

This will automatically re-run tests when files change, making it ideal for development.

### Linting and Formatting

The project uses **Biome** for both linting and code formatting, providing fast and consistent code quality checks.

#### Linting Commands
```bash
# Check for linting issues
pnpm run lint

# Fix linting issues automatically
pnpm run lint:fix
```

#### Formatting Commands
```bash
# Check code formatting
pnpm run format

# Fix formatting issues automatically
pnpm run format:fix
```

#### Combined Check
```bash
# Run both linting and formatting checks
pnpm run check

# Fix both linting and formatting issues
pnpm run check:fix
```

### Test Coverage

The test suite includes:

- **Structure Validation**: Ensures the table of contents data has the correct structure and required properties
- **Content Validation**: Verifies that expected sections and content sites are present
- **Nested Structure Testing**: Validates the hierarchical structure of navigation items
- **URL Validation**: Checks that all URLs follow the expected format
- **Output File Testing**: Confirms that the generated `toc.json` file is created correctly

### Automated Testing

Tests are automatically triggered in the following scenarios:

#### Pull Requests & Push Events
- Tests run on **all pull requests** targeting the `main`
- Only runs when files in the `content/table-of-contents/` directory are modified


#### CI/CD Pipeline Steps
1. **Install Dependencies**: Installs pnpm packages using Node.js 24
2. **Lint & Format Check**: Runs `pnpm run lint && pnpm run format` to ensure code quality
3. **Test Execution**: Runs `pnpm run test` to execute the full test suite

### Configuration Files

- **GitHub Actions**: `.github/workflows/toc-test.yml` - Defines the CI/CD pipeline for all things relating to testing.

## Git Hooks

This project uses a pre-commit hook to automatically run `pnpm check:fix` on any changes to files in `content/table-of-contents/`. This ensures code quality before commits.

### How It Works

1. When you run `pnpm install` in this directory, the `prepare` script configures git to use the `.husky/` folder for hooks
2. The pre-commit hook only runs when files in `content/table-of-contents/` are staged
3. It will automatically fix any linting/formatting issues and re-stage the fixed files
