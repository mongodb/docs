# Grove Code Examples CI Workflow

The **Grove Code Examples CI** workflow is a unified, secure, and
performant system for testing MongoDB driver code examples across
multiple programming languages.

This directory contains the centralized configuration file that drives
the entire workflow system. It currently supports testing for the following drivers:

- C# / .NET
- Go
- Java (Sync)
- JavaScript / Node.js
- Python / PyMongo
- MongoDB Shell (mongosh)

## Quick Reference

### Workflow File
Main workflow: `.github/workflows/grove-code-examples-ci.yml`

### Configuration File
Centralized config: `.github/workflows/config/grove-driver-config.json`

### Composite Action
Shared setup: `.github/actions/grove-setup-mongodb/`

### Validation Scripts

Helper scripts for local testing and validation:

```bash
# Validate driver configuration
.github/scripts/grove-validate-config.sh

# Get MongoDB tools checksums
.github/scripts/grove-get-checksums.sh

# Test workflow locally
.github/scripts/test-workflow.sh
```

---

## Configuration Overview

The Grove workflow uses a **single, centralized configuration file** (`grove-driver-config.json`) that serves as the source of truth for:

- **Driver configurations** (languages, versions, commands)
- **MongoDB settings** (port, deployment name, sample data)
- **Tool versions** (Atlas CLI, Database Tools)

### How It Works

#### Automatic Triggering
The workflow runs automatically on pull requests that modify driver code:

```yaml
on:
  pull_request:
    paths:
      - "code-example-tests/csharp/driver/**"
      - "code-example-tests/go/driver/**"
      - "code-example-tests/java/driver-sync/**"
      - "code-example-tests/javascript/driver/**"
      - "code-example-tests/python/pymongo/**"
      - "code-example-tests/command-line/mongosh/**"
      - ".github/workflows/grove-code-examples-ci.yml"
      - ".github/workflows/config/grove-driver-config.json"
```

#### Workflow Steps

1. **Detect Changes** - Identifies which drivers have changed using jq-based filtering
2. **Validate Config** - Ensures `grove-driver-config.json` is valid
3. **Build Matrix** - Creates dynamic test matrix from config
4. **Setup MongoDB** - Sets up MongoDB once for all tests (composite action)
5. **Format & Test** - Runs formatting checks and tests for each driver in parallel
6. **Upload Logs** - Collects and uploads test logs as artifacts
7. **Summary** - Reports overall status

#### Concurrency Control
```yaml
concurrency:
  group: grove-ci-${{ github.ref }}
  cancel-in-progress: true
```
Automatically cancels outdated runs when new commits are pushed.

### Config Structure

The configuration file uses a **nested structure** for clarity and organization:

```json
{
  "drivers": {
    "java": {
      "name": "Java Driver - Sync",
      "path": "code-example-tests/java/driver-sync",
      "watch_paths": ["code-example-tests/java/driver-sync/**"],
      "setup": {
        "action": "actions/setup-java@v4",
        "version": "17",
        "distribution": "zulu",
        "cache": false
      },
      "commands": {
        "install_deps": "mvn dependency:resolve",
        "format_check": "mvn spotless:check",
        "test": "mvn test"
      },
      "environment": {}
    }
  },
  "mongodb": {
    "port": "27017",
    "deployment_name": "myLocalRs1",
    "connection_string_template": "mongodb://localhost:{{port}}/?directConnection=true",
    "sample_data_url": "https://atlas-education.s3.amazonaws.com/sampledata.archive"
  },
  "tools": {
    "atlas_cli": {
      "version": "1.42.2",
      "url": "https://fastdl.mongodb.org/mongocli/mongodb-atlas-cli_1.42.2_linux_x86_64.deb"
    },
    "database_tools": {
      "version": "100.13.0",
      "url": "https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2204-x86_64-100.13.0.deb"
    }
  }
}
```

### Key Sections

#### **1. Drivers**

Each driver configuration includes:

| Field | Description | Example |
|-------|-------------|---------|
| `name` | Human-readable driver name | `"Java Driver - Sync"` |
| `path` | Path to driver code examples | `"code-example-tests/java/driver-sync"` |
| `watch_paths` | Paths to monitor for changes | `["code-example-tests/java/driver-sync/**"]` |
| `setup.action` | GitHub Actions setup action | `"actions/setup-java@v4"` |
| `setup.version` | Language/runtime version | `"17"` |
| `setup.cache` | Enable dependency caching | `false` or `"npm"`, `"pip"` |
| `commands.install_deps` | Dependency installation command | `"mvn dependency:resolve"` |
| `commands.format_check` | Code formatting check command | `"mvn spotless:check"` |
| `commands.test` | Test execution command | `"mvn test"` |
| `environment` | Environment variables | `{"SOLUTION_ROOT": "$(pwd)"}` |

#### **2. MongoDB**

MongoDB configuration for test environments:

| Field | Description | Example |
|-------|-------------|---------|
| `port` | MongoDB port | `"27017"` |
| `deployment_name` | Atlas CLI deployment name | `"myLocalRs1"` |
| `connection_string_template` | Connection string template | `"mongodb://localhost:{{port}}/?directConnection=true"` |
| `sample_data_url` | Sample data archive URL | `"https://atlas-education.s3.amazonaws.com/sampledata.archive"` |

#### **3. Tools**

Tool versions and download URLs:

| Tool | Version | Purpose |
|------|---------|---------|
| `atlas_cli` | 1.42.2 | MongoDB Atlas CLI for local deployments |
| `database_tools` | 100.13.0 | MongoDB database tools (mongorestore, etc.) |

### How the Workflow Uses This Config

The Grove workflow (`.github/workflows/grove-code-examples-ci.yml`) references this configuration file:

```yaml
CONFIG=.github/workflows/config/grove-driver-config.json
```

#### **Matrix Building**

The workflow uses `jq` to extract driver configurations and build a test matrix:

```yaml
# From grove-code-examples-ci.yml (lines 90-101)
raw_matrix=$(jq -c '.drivers | to_entries | map({
  language: .key,
  path: .value.path,
  watch_paths: (.value.watch_paths // [ .value.path ]),
  setup: (.value.setup.action | capture("setup-(?<s>[^@]+)").s),  # Extracts "java" from "actions/setup-java@v4"
  version: (.value.setup.version // ""),
  distribution: (.value.setup.distribution // ""),
  version_file: (.value.setup.version_file // ""),
  format_cmd: .value.commands.format_check,
  test_cmd: .value.commands.test,
  deps_cmd: .value.commands.install_deps
})' "$CONFIG")
```

#### Change Detection

The workflow filters the matrix based on changed files:

```yaml
# Only test drivers whose watch_paths match changed files
filtered=$(jq -c --argjson changed "$changed_json" '
  [ .[] | select(.watch_paths | any(. as $w | $changed | any(startswith($w | gsub("/\\*\\*$"; ""))))) ]
' <(echo "$raw_matrix"))
```

---

## Modifying the Configuration

### Adding a New Driver

To add a new driver to the Grove workflow:

1. **Add driver entry** to the `drivers` section:

```json
"ruby": {
  "name": "Ruby Driver",
  "path": "code-example-tests/ruby/driver",
  "watch_paths": ["code-example-tests/ruby/driver/**"],
  "setup": {
    "action": "actions/setup-ruby@v1",
    "version": "3.2",
    "cache": "bundler"
  },
  "commands": {
    "install_deps": "bundle install",
    "format_check": "rubocop --check",
    "test": "bundle exec rspec"
  },
  "environment": {}
}
```

2. **Update workflow triggers** (if needed) in `.github/workflows/grove-code-examples-ci.yml`:

```yaml
on:
  pull_request:
    paths:
      - "code-example-tests/ruby/driver/**"  # Add new path
```

3. **Validate configuration**:

```bash
.github/scripts/grove-validate-config.sh
```

### Updating Tool Versions

To update MongoDB tools:

1. **Get new checksums**:

```bash
.github/scripts/grove-get-checksums.sh
```

2. **Update config** with new versions and URLs:

```json
"tools": {
  "atlas_cli": {
    "version": "1.43.0",  // Update version
    "url": "https://fastdl.mongodb.org/mongocli/mongodb-atlas-cli_1.43.0_linux_x86_64.deb"
  }
}
```

3. **Update checksums** in `.github/actions/grove-setup-mongodb/action.yml`

### Modifying MongoDB Settings

To change MongoDB configuration:

```json
"mongodb": {
  "port": "27018",  // Change port
  "deployment_name": "testRs",  // Change deployment name
  "connection_string_template": "mongodb://localhost:{{port}}/?directConnection=true",
  "sample_data_url": "https://your-custom-url.com/data.archive"  // Custom sample data
}
```

---

## Validation

To validate the configuration file:

```bash
# Check JSON syntax
jq empty .github/workflows/config/grove-driver-config.json

# Validate structure and required fields
.github/scripts/grove-validate-config.sh
```

The validation script checks:
- Valid JSON syntax
- Required top-level keys (`drivers`, `mongodb`, `tools`)
- Required driver fields (`path`, `setup`, `commands`)
- Valid setup types (dotnet, go, java, node, python)
- Path existence

---

## Security

### Action Pinning
All actions are pinned to specific commit SHAs in the workflow file:
```yaml
uses: actions/checkout@11bd71901bbe5b1630ceea73d27597364c9af683 # v4.2.2
```

### Checksum Verification
MongoDB tools are verified using SHA256 checksums in the composite action.

**To update checksums:**
```bash
.github/scripts/grove-get-checksums.sh
```

### Permissions
Minimal permissions in workflow:
```yaml
permissions:
  contents: read
  pull-requests: read
```

---

## Performance

### Optimizations
- **Concurrency control** - Cancels outdated runs automatically
- **Smart caching** - Caches dependencies (npm, pip, NuGet, Go modules, Maven)
- **Change detection** - Only tests changed drivers using jq-based filtering
- **Parallel execution** - All drivers test simultaneously
- **Composite action** - MongoDB setup reused across jobs

### Cache Configuration
Caching is enabled for:
- **JavaScript/Node.js**: npm cache
- **Python**: pip cache
- **C#/.NET**: NuGet packages (with lock files)
- **Go**: Go modules
- **Java**: Maven dependencies

---

## Debugging

### Viewing Test Logs

1. Go to PR "Checks" tab
2. Click on failed job
3. Download artifacts: `grove-logs-{language}`

### Common Issues

**Tests fail but pass locally:**
- Check MongoDB connection string in config
- Verify environment variables are set correctly
- Review test log artifacts for detailed errors
- Ensure MongoDB is running on correct port

**Workflow doesn't run:**
- Ensure changes are in driver `watch_paths`
- Check workflow file syntax with yamllint
- Verify GitHub Actions is enabled for repository
- Check if workflow file paths match actual changes

**Checksum errors:**
- Run: `.github/scripts/grove-get-checksums.sh`
- Update checksums in `.github/actions/grove-setup-mongodb/action.yml`
- Verify tool URLs are accessible

**Configuration validation fails:**
- Run: `.github/scripts/grove-validate-config.sh`
- Check JSON syntax with `jq empty grove-driver-config.json`
- Verify all required fields are present
- Ensure paths exist on filesystem

---

## Supported Drivers

The configuration currently supports:

| Language | Setup Action | Version | Cache | Status |
|----------|-------------|---------|-------|--------|
| **C#/.NET** | `actions/setup-dotnet@v4` | 9.0 | NuGet | Active |
| **Go** | `actions/setup-go@v5` | From go.mod | Go modules | Active |
| **Java** | `actions/setup-java@v4` | 17 (Zulu) | Maven | Active |
| **JavaScript** | `actions/setup-node@v4` | 22 | npm | Active |
| **Python** | `actions/setup-python@v5` | 3.13 | pip | Active |
| **MongoDB Shell** | `actions/setup-node@v4` | 22 | npm | Active |

---

## Maintenance

### Regular Tasks

**Quarterly:**
- Update pinned action versions in workflow file
- Review and update MongoDB tool versions
- Check for security advisories

**Monthly:**
- Check for MongoDB tool updates
- Review cache performance and hit rates
- Monitor workflow execution times

**As Needed:**
- Update checksums when tool versions change
- Add new drivers as needed
- Adjust timeouts if jobs fail
- Update dependency versions

### Helper Scripts

```bash
# Validate configuration
.github/scripts/grove-validate-config.sh

# Get MongoDB tools checksums
.github/scripts/grove-get-checksums.sh

# Test workflow syntax and structure
.github/scripts/test-workflow.sh
```

---

## Workflow Diagram

```
PR Created/Updated
       ↓
Detect Changes (jq-based filtering)
       ↓
Validate Config
       ↓
Build Dynamic Matrix
       ↓
Setup MongoDB (composite action)
       ↓
┌──────────────────────────┐
│  Format & Test (parallel) │
│  ├─ C#/.NET              │
│  ├─ Go                   │
│  ├─ Java                 │
│  ├─ JavaScript           │
│  ├─ Python               │
│  └─ MongoDB Shell        │
└──────────────────────────┘
       ↓
Upload Test Logs (artifacts)
       ↓
CI Summary & Status
```

---

## Related Documentation

### Core Files
- **Workflow**: `.github/workflows/grove-code-examples-ci.yml` - Main workflow file
- **Configuration**: `.github/workflows/config/grove-driver-config.json` - This config file
- **Setup Action**: `.github/actions/grove-setup-mongodb/` - MongoDB setup composite action

### Scripts
- **Validation**: `.github/scripts/grove-validate-config.sh` - Validate configuration
- **Checksums**: `.github/scripts/grove-get-checksums.sh` - Get tool checksums
- **Testing**: `.github/scripts/test-workflow.sh` - Test workflow syntax

### Additional Documentation
- **Setup Action README**: `.github/actions/grove-setup-mongodb/README.md`
- **YAML Lint Config**: `.yamllint` - YAML linting rules

---

## Best Practices

### **Configuration Management**

1. **Always validate** after making changes:
   ```bash
   .github/scripts/grove-validate-config.sh
   ```

2. **Test locally** before committing:
   - Ensure paths exist
   - Verify commands work in the target directory
   - Check that setup actions are pinned to specific versions

3. **Update checksums** when changing tool versions:
   ```bash
   .github/scripts/grove-get-checksums.sh
   ```

4. **Keep versions current** but stable:
   - Use LTS versions for production
   - Test version updates in a separate branch
   - Document breaking changes

### **Security Considerations**

1. **Pin action versions** to commit SHAs in the workflow (not in config)
2. **Verify checksums** for all downloaded tools
3. **Validate paths** to prevent directory traversal
4. **Limit permissions** in workflow jobs

---

## Summary

The **Grove Code Examples CI** workflow provides a unified, secure, and performant system for testing MongoDB driver code examples.

### Key Features
- **Centralized Configuration** - Single JSON file for all drivers
- **Dynamic Matrix** - Automatically builds test matrix from config
- **Smart Change Detection** - Only tests changed drivers
- **Parallel Execution** - All drivers test simultaneously
- **Dependency Caching** - Fast builds with cached dependencies
- **Security First** - Pinned actions, checksum verification, minimal permissions
- **Easy Maintenance** - Validation scripts and clear documentation

### Configuration File
- **Location**: `.github/workflows/config/grove-driver-config.json`
- **Purpose**: Centralized configuration for all drivers, MongoDB, and tools
- **Structure**: Nested JSON with clear separation of concerns
- **Usage**: Referenced by `.github/workflows/grove-code-examples-ci.yml`
- **Validation**: Use `.github/scripts/grove-validate-config.sh`

### Status
**Active and Production-Ready**

All 6 drivers configured with caching enabled and comprehensive testing.

---

## Next Steps

### For New Users
1. Review this README to understand the workflow
2. Examine `grove-driver-config.json` to see driver configurations
3. Run `.github/scripts/grove-validate-config.sh` to validate
4. Create a test PR to see the workflow in action

### For Maintainers
1. Keep tool versions up to date
2. Monitor workflow performance and cache hit rates
3. Update checksums when tool versions change
4. Add new drivers as needed following the examples

### For Contributors
1. Validate configuration changes before committing
2. Test locally when possible
3. Review workflow logs for any issues
4. Update documentation when adding features
