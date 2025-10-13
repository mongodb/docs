# Grove - Setup MongoDB Composite Action

This composite action sets up a local MongoDB instance using Atlas CLI and optionally loads sample data for Grove code examples. It includes comprehensive security features including checksum verification for downloaded binaries.

## Inputs

| Input | Description | Required | Default |
|-------|-------------|----------|---------|
| `port` | MongoDB port | No | `27017` |
| `deployment_name` | Atlas deployment name | No | `myLocalRs1` |
| `load_sample_data` | Whether to load sample data | No | `true` |
| `cache_key_suffix` | Additional suffix for cache key | No | `''` |
| `enforce_checksums` | Enforce strict checksum verification | No | `true` |

## Outputs

| Output | Description |
|--------|-------------|
| `connection_string` | MongoDB connection string (e.g. `mongodb://localhost:27017/?directConnection=true`) |
| `cache_hit` | Whether MongoDB setup was restored from cache (`true`/`false`) |

## Usage

### Basic Usage

```yaml
- name: Setup MongoDB
  uses: ./.github/actions/grove-setup-mongodb
  with:
    port: '27017'
    deployment_name: 'myLocalRs1'
    load_sample_data: 'true'
```

### With Custom Configuration

```yaml
- name: Setup MongoDB on custom port
  uses: ./.github/actions/grove-setup-mongodb
  with:
    port: '27018'
    deployment_name: 'myTestRs'
    load_sample_data: 'false'
    cache_key_suffix: '-custom'
```

### Development/Testing Mode (Skip Checksum Enforcement)

```yaml
- name: Setup MongoDB (dev mode)
  uses: ./.github/actions/grove-setup-mongodb
  with:
    enforce_checksums: 'false'  # Only for local testing
```

## Security Features

### 1. Checksum Verification

The action verifies SHA256 checksums for all downloaded binaries to prevent supply chain attacks.

#### How to Obtain Checksums

**For Atlas CLI:**
```bash
curl -sL https://fastdl.mongodb.org/mongocli/mongodb-atlas-cli_1.42.2_linux_x86_64.deb | sha256sum
```

**For MongoDB Database Tools:**
```bash
curl -sL https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2204-x86_64-100.13.0.deb | sha256sum
```

#### How to Update Checksums

1. **Obtain the checksums** using the commands above
2. **Edit the action file** (`.github/actions/grove-setup-mongodb/action.yml`)
3. **Replace values**:

```yaml
# Line ~58 - Replace CHANGE_ME with actual hash
ATLAS_CLI_SHA256="CHANGE_ME"
# Should become:
ATLAS_CLI_SHA256="a1b2c3d4e5f6789012345678901234567890123456789012345678901234567890"

# Line ~100 - Replace CHANGE_ME with actual hash
DB_TOOLS_SHA256="CHANGE_ME"
# Should become:
DB_TOOLS_SHA256="b2c3d4e5f6789012345678901234567890123456789012345678901234567890a1"
```

4. **Commit the changes**

#### Checksum Enforcement Modes

**Strict Mode (Default - `enforce_checksums: 'true'`):**
- Validates checksum is a valid 64-character hex string
- Verifies downloaded file matches expected checksum
- **Fails the build** if checksum is missing or incorrect
- **Use for**: Production, CI/CD pipelines

**Permissive Mode (`enforce_checksums: 'false'`):**
- Allows placeholder checksums for development
- Still validates if a real checksum is provided
- **Warns** if checksum is a placeholder
- **Use for**: Local testing, iterative development

### 2. Sample Data Verification (Optional)

The action supports optional checksum verification for sample data.

#### How to Enable Sample Data Verification

1. **Create a checksum file** in the action directory:
   ```bash
   # From repository root
   cd .github/actions/grove-setup-mongodb

   # Download and hash the sample data
   curl -sL https://atlas-education.s3.amazonaws.com/sampledata.archive | sha256sum > sampledata.sha256

   # Format should be: <hash>  sampledata.archive
   # Example: a1b2c3d4...  sampledata.archive
   ```

2. **Commit the file**:
   ```bash
   git add sampledata.sha256
   git commit -m "Add sample data checksum verification"
   ```

3. **Verification is automatic**: If `sampledata.sha256` exists, it will be used automatically

### 3. Other Security Features

- **Secure temporary directories**: Uses `mktemp -d` for all downloads
- **Cleanup traps**: Automatically removes temporary files
- **Input validation**: Validates port numbers, deployment names
- **File verification**: Checks file readability and size before use
- **Readiness checks**: Polls MongoDB port to ensure it's ready
- **Error handling**: Strict error handling with `set -euo pipefail`

## Caching Strategy

The action caches MongoDB tools and sample data to improve performance:

### Cache Key Structure
```
mongodb-tools-{OS}-v1{suffix}
```

### Cached Items
- `/tmp/mongodb-tools/` - Atlas CLI and MongoDB Database Tools binaries
- `/tmp/sampledata.archive` - Sample data archive (if loaded)

### Cache Behavior
- **Cache hit**: Restores tools from cache, skips downloads
- **Cache miss**: Downloads and installs tools, saves to cache
- **Restore keys**: Falls back to previous cache versions if exact match not found

### Cache Invalidation
To invalidate the cache, increment the version number in the cache key:
```yaml
# In action.yml, line ~43
key: mongodb-tools-${{ runner.os }}-v2${{ inputs.cache_key_suffix }}
#                                      ^ increment this
```

## MongoDB Readiness Check

The action includes a readiness check to ensure MongoDB is fully started before proceeding:

```bash
# Polls for up to 20 seconds
for i in {1..20}; do
  if nc -z localhost "$PORT" 2>/dev/null; then
    echo "MongoDB is listening on port $PORT"
    break
  fi
  sleep 1
done
```

This prevents race conditions where tests might start before MongoDB is ready.

## Troubleshooting

### Checksum Verification Failures

**Error**: `ERROR: Atlas CLI checksum mismatch`

**Causes**:
1. Placeholder checksum not replaced
2. Downloaded file corrupted
3. Incorrect checksum value

**Solutions**:
1. Obtain the correct checksum (see "How to Obtain Checksums" above)
2. Update the checksum in `action.yml`
3. For development, temporarily set `enforce_checksums: 'false'`

### MongoDB Not Ready

**Error**: `ERROR: MongoDB not ready on port 27017`

**Causes**:
1. Port already in use
2. MongoDB failed to start
3. Insufficient system resources

**Solutions**:
1. Check if another process is using the port
2. Review MongoDB logs
3. Increase timeout in readiness check (line ~196)

### Cache Issues

**Problem**: Cache not being used

**Solutions**:
1. Check cache key matches between jobs
2. Verify cache size is under GitHub's 10GB limit
3. Check if cache was evicted (7-day retention)

### Sample Data Loading Failures

**Error**: `ERROR: Sample data file is not readable or empty`

**Causes**:
1. Download failed
2. Network issues
3. File corrupted

**Solutions**:
1. Check network connectivity
2. Verify sample data URL is accessible
3. Clear cache and retry

## Maintenance

### Updating MongoDB Tools Versions

1. **Update URLs** in `action.yml`:
   ```yaml
   ATLAS_CLI_URL="https://fastdl.mongodb.org/mongocli/mongodb-atlas-cli_{NEW_VERSION}_linux_x86_64.deb"
   DB_TOOLS_URL="https://fastdl.mongodb.org/tools/db/mongodb-database-tools-ubuntu2204-x86_64-{NEW_VERSION}.deb"
   ```

2. **Obtain new checksums**:
   ```bash
   curl -sL {NEW_URL} | sha256sum
   ```

3. **Update checksums** in `action.yml`

4. **Increment cache version** to invalidate old caches

5. **Test thoroughly** before merging

### Security Updates

- **Quarterly**: Review and update pinned action versions
- **Monthly**: Check for MongoDB tool updates
- **As needed**: Update checksums when tool versions change

## Best Practices

1.  **Always use checksum verification in production**
2. **Keep checksums up to date** when updating tool versions
3. **Use cache key suffixes** to isolate different test scenarios
4. **Monitor cache hit rates** to optimize performance
5. **Document any checksum updates** in commit messages
6  **Never disable checksum enforcement in production**
7. **Always test checksum updates** before merging

## Example Workflows

### Production Workflow
```yaml
- name: Setup MongoDB (Production)
  uses: ./.github/actions/grove-setup-mongodb
  with:
    port: '27017'
    deployment_name: 'prodRs'
    load_sample_data: 'true'
    enforce_checksums: 'true'  # Strict security
```

### Development Workflow
```yaml
- name: Setup MongoDB (Development)
  uses: ./.github/actions/grove-setup-mongodb
  with:
    port: '27017'
    deployment_name: 'devRs'
    load_sample_data: 'false'  # Faster for dev
    enforce_checksums: 'false'  # Allow placeholder checksums
```

## Contributing

When contributing changes to this action:

1. Update checksums if changing tool versions
2. Test with both `enforce_checksums: true` and `false`
3. Update this README with any new features
4. Add security considerations for new features
5. Test cache behavior thoroughly
