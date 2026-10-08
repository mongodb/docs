# Debugging GitHub Actions Workflows Locally with `act`

This guide helps you debug GitHub Actions workflow failures by running them
locally in a Docker container using the [`act`](https://github.com/nektos/act)
CLI tool.

## When to Use This Guide

Use this approach when:
- A GitHub Actions workflow fails in CI but tests pass locally
- You need to reproduce a Linux-specific issue on macOS
- You want to iterate quickly on workflow changes without pushing to GitHub

## Pre-Flight Checks

Before attempting to run the workflow locally, investigate these common issues:

### 1. Understand Which Workflow File Runs

**Important**: When a PR triggers a workflow, GitHub runs the workflow file
from the `main` branch, NOT from the PR branch. The PR branch only provides
the code being tested.

This means:
- Changes to workflow files in a PR won't take effect until merged
- If you're debugging a workflow failure, check the workflow file in `main`
- The PR author's workflow changes are irrelevant until merged

### 2. Check for Branch Discrepancies

Compare the PR branch against `main` to understand what's different:

```bash
# Fetch the PR branch
git fetch origin pull/<PR_NUMBER>/head:pr-<PR_NUMBER>

# Compare specific files between branches
git diff pr-<PR_NUMBER> origin/main -- path/to/file.js

# See what commits are in the PR but not in main
git log origin/main..pr-<PR_NUMBER> --oneline
```

### 3. Check Recent Changes to Relevant Code

```bash
# See recent commits to a file
git log --oneline origin/main -- path/to/file.js | head -10

# Show content of a file from a specific branch
git show origin/main:path/to/file.js | head -50
```

## Installing `act`

### Check if `act` is Already Installed

```bash
act --version
```

### Install on macOS

```bash
brew install act
```

### Verify Docker is Running

`act` requires Docker to be running:

```bash
docker info
```

If Docker isn't running, start Docker Desktop or the Docker daemon.

## Pre-Run Setup

### 1. Check for Port Conflicts

Many workflows (especially MongoDB-related ones) use specific ports. Check if
the required port is available:

```bash
# Check if port 27017 (MongoDB default) is in use
lsof -i :27017

# Kill a process using a specific port (if needed)
kill -9 <PID>
```

Common ports to check:
- `27017` - MongoDB
- `3000` - Node.js dev servers
- `8080` - Generic web servers

### 2. Stop Local MongoDB Instances

If you have a local MongoDB instance running, stop it to avoid port conflicts:

```bash
# If running MongoDB in Docker
docker stop <container-name-or-id>

# If using Homebrew
brew services stop mongodb-community

# If using Atlas CLI local deployment
atlas deployments pause <deployment-name>

# If running mongod directly
pkill mongod
```

## Running Workflows with `act`

### Basic Usage

From the repository root, run a specific workflow:

```bash
# Run a workflow by filename
act -W .github/workflows/<workflow-file>.yml

# Run with verbose output for debugging
act -W .github/workflows/<workflow-file>.yml -v
```

### Run a Specific Job

If the workflow has multiple jobs, run just one:

```bash
act -W .github/workflows/<workflow-file>.yml -j <job-name>
```

### Choose the Right Docker Image

`act` uses Docker images to simulate GitHub's runners. The default image is
minimal. For better compatibility, use larger images:

```bash
# Use the medium image (recommended for most cases)
act -W .github/workflows/<workflow-file>.yml -P ubuntu-latest=catthehacker/ubuntu:act-latest

# Use the full image (largest, most compatible)
act -W .github/workflows/<workflow-file>.yml -P ubuntu-latest=catthehacker/ubuntu:full-latest
```

**Note**: The first run may take several minutes as Docker downloads the image
(several GB). Subsequent runs will be faster.

### Handle Secrets

If the workflow requires secrets, provide them via environment variables or a
secrets file:

```bash
# Via command line
act -W .github/workflows/<workflow-file>.yml -s MY_SECRET=value

# Via secrets file
act -W .github/workflows/<workflow-file>.yml --secret-file .secrets
```

Create a `.secrets` file (add to `.gitignore`!):
```
MY_SECRET=value
ANOTHER_SECRET=another_value
```

### Example: Running the mongosh Tests Workflow

```bash
# From the repository root
act -W .github/workflows/mongosh-examples-test-in-docker.yml \
    -P ubuntu-latest=catthehacker/ubuntu:act-latest
```

## Team Workflows Reference

The Grove team maintains the following workflows. All `test-in-docker` workflows
use port `27017` for MongoDB and load sample data.

### Test Workflows (`*-test-in-docker.yml`)

| Workflow | Code Path | Language/Runtime |
|----------|-----------|------------------|
| `mongosh-examples-test-in-docker.yml` | `code-example-tests/command-line/mongosh/` | Node.js, mongosh |
| `node-driver-examples-test-in-docker.yml` | `code-example-tests/javascript/driver/` | Node.js |
| `pymongo-driver-examples-test-in-docker.yml` | `code-example-tests/python/pymongo/` | Python |
| `go-driver-examples-test-in-docker.yml` | `code-example-tests/go/driver/` | Go |
| `java-driver-sync-examples-test-in-docker.yml` | `code-example-tests/java/driver-sync/` | Java (Zulu 21) |
| `csharp-driver-examples-test-in-docker.yml` | `code-example-tests/csharp/driver/` | .NET |

### Other Test Workflows

These workflows run tests but don't require MongoDB:

| Workflow | Code Path | Language/Runtime |
|----------|-----------|------------------|
| `openapi-tests.yml` | `code-example-tests/openapi/` | Node.js |

### Formatting Workflows (`*-check-formatting.yml`)

These workflows only check code formatting and don't require MongoDB:

| Workflow | Code Path | Tool |
|----------|-----------|------|
| `node-driver-examples-check-formatting.yml` | `code-example-tests/javascript/driver/examples/` | Prettier |
| `go-driver-examples-check-formatting.yml` | `code-example-tests/go/driver/` | gofmt |
| `java-driver-sync-examples-check-formatting.yml` | `code-example-tests/java/driver-sync/` | google-java-format |
| `csharp-driver-examples-check-formatting.yml` | `code-example-tests/csharp/driver/` | dotnet format |

### Running Other Test Workflows

The same pattern applies to all test workflows:

```bash
# Node.js Driver
act -W .github/workflows/node-driver-examples-test-in-docker.yml \
    -P ubuntu-latest=catthehacker/ubuntu:act-latest

# Python/PyMongo
act -W .github/workflows/pymongo-driver-examples-test-in-docker.yml \
    -P ubuntu-latest=catthehacker/ubuntu:act-latest

# Go Driver
act -W .github/workflows/go-driver-examples-test-in-docker.yml \
    -P ubuntu-latest=catthehacker/ubuntu:act-latest

# Java Driver (Sync)
act -W .github/workflows/java-driver-sync-examples-test-in-docker.yml \
    -P ubuntu-latest=catthehacker/ubuntu:act-latest

# C#/.NET Driver
act -W .github/workflows/csharp-driver-examples-test-in-docker.yml \
    -P ubuntu-latest=catthehacker/ubuntu:act-latest
```

## Troubleshooting

### "Port already in use" Errors

The workflow may fail if a required port is occupied:

```bash
# Find what's using the port
lsof -i :27017

# Kill the process
kill -9 <PID>
```

### Workflow Works Locally but Fails in CI

Common causes:
1. **Different Node/tool versions**: Check the workflow's version specifications
2. **Missing sample data**: Some tests require data that's loaded during CI
3. **Timing issues**: CI runners may be slower, causing timeouts
4. **Environment differences**: Check environment variables and locale settings

### Workflow Fails Locally but Works in CI

Common causes:
1. **Cached Docker layers**: Try `docker system prune` to clear caches
2. **Local file modifications**: Ensure your working directory is clean
3. **Different Docker image**: Make sure you're using an appropriate runner image

### Checking Environment Differences

Compare environments between local Docker and GitHub CI:

```bash
# Check locale settings in the Docker image
docker run --rm catthehacker/ubuntu:act-latest bash -c "locale && env | grep -i lang"

# Check Node.js version
docker run --rm catthehacker/ubuntu:act-latest node --version
```

## Interpreting Results

When comparing local `act` results with GitHub CI:

1. **Same failure**: Good! You can now iterate locally to fix the issue
2. **Different failure**: The Docker image may differ from GitHub's actual runners
3. **Local passes, CI fails**: There may be state/caching differences, or the
   GitHub runner has different characteristics

## Additional Resources

- [act GitHub Repository](https://github.com/nektos/act)
- [act Documentation](https://nektosact.com/)
- [GitHub Actions Runner Images](https://github.com/actions/runner-images)
- [catthehacker Docker Images](https://github.com/catthehacker/docker-images)
