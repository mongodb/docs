# Code Copier Workflows

This directory contains workflow configurations for automatically copying code examples to destination repositories.

The copier app is owned by the Dev Docs team. 

## Adding a New Workflow

To add a new workflow, create a new DOCSP Jira ticket with the component set to `DevDocs`.

## How It Works

1. **You merge a PR** to ``main`` in this repository
2. **Copier is notified** of the merge via webhook
3. **Copier checks the filepaths** from the PR. If any filepaths match a defined workflow:
    - **Files are copied** to the one or more destination repositories
    - The copier does nothing

You can optionally define *how* the copy is managed. Based on the workflow configuration: 
- The copier creates a PR in the destination repository (**default**). You can set your own process for handling that PR, which may involve manual testing or review.
- The copier commits directly to the destination repository **without a PR**. You may prefer this option if you want a fully automated workflow with no review at the destination repo. 

Source Code: [Code Example Tooling Repository](https://github.com/mongodb/code-example-tooling)

## Basic Workflow Structure

```yaml
workflows:
  - name: "my-workflow"
    destination:
      repo: "mongodb/destination-repo"
      branch: "main"
    transformations:
      - move:
          from: "source/path"
          to: "destination/path"
```

Note: Patterns and paths are matched against the full repository path

## Common Transformation Types

### Move Directory

Copy all files from one directory to another:

```yaml
transformations:
  - move:
      from: "examples/go"
      to: "code/go"
```

### Copy Single File

Copy a specific file:

```yaml
transformations:
  - copy:
      from: "README.md"
      to: "docs/README.md"
```

### Match with Wildcards

Use glob patterns for flexible matching:

```yaml
transformations:
  - glob:
      pattern: "examples/**/*.go"
      transform: "code/${relative_path}"
```

## Customizing PR Details

Add custom PR titles and descriptions:

```yaml
workflows:
  - name: "my-workflow"
    destination:
      repo: "mongodb/destination-repo"
      branch: "main"
    transformations:
      - move: { from: "src", to: "dest" }
    commit_strategy:
      type: "pull_request"
      pr_title: "Update examples from ${source_repo}"
      pr_body: |
        Automated update from source repository.
        
        Source PR: #${pr_number}
        Commit: ${commit_sha}
      auto_merge: false
```

## Available Variables

Use these variables in PR titles, bodies, and commit messages:

- `${source_repo}` - Source repository name
- `${source_branch}` - Source branch name
- `${pr_number}` - Source PR number
- `${commit_sha}` - Source commit SHA
- `${file_count}` - Number of files changed

Use these in path transformations:

- `${relative_path}` - Path relative to the matched pattern
- `${path}` - Full source file path
- `${filename}` - Just the filename
- `${dir}` - Directory path
- `${ext}` - File extension

## Excluding Files

Prevent certain files from being copied:

```yaml
workflows:
  - name: "my-workflow"
    destination:
      repo: "mongodb/destination-repo"
      branch: "main"
    transformations:
      - move: { from: "src", to: "dest" }
    exclude:
      - "**/.env"
      - "**/node_modules/**"
      - "**/*.test.js"
```

## Example: Complete Workflow

```yaml
# .copier/config.yaml

defaults: 
  commit_strategy:
    type: "pull_request"
    auto_merge: false
  exclude:
    - "**/.env"
    - "**/node_modules/**"

workflows:
# Defaults apply unless overridden
  - name: "go-examples"
    destination:
      repo: "mongodb/go-examples-repo"
      branch: "main"
    transformations:
      - move:
          from: "examples/go"
          to: "code"
    commit_strategy:
      pr_title: "Update Go examples from ${source_repo}"
      pr_body: |
        Automated update of Go code examples.
        
        **Source**: ${source_repo} (PR #${pr_number})
        **Commit**: ${commit_sha}
        **Files**: ${file_count} changed
    deprecation_check:
      enabled: true
      file: "deprecated_examples.json"
```
