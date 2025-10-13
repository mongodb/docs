#!/bin/bash

# Comprehensive validation script for grove-driver-config.json
# Validates structure, required fields, and data types

set -euo pipefail

CONFIG_FILE=".github/workflows/config/grove-driver-config.json"
ERRORS=0
WARNINGS=0

error() {
    printf "ERROR: %s\n" "$1"
    ERRORS=$((ERRORS + 1))
}

warn() {
    printf "WARN: %s\n" "$1"
    WARNINGS=$((WARNINGS + 1))
}

pass() {
    printf "PASS: %s\n" "$1"
}

info() {
    printf "INFO: %s\n" "$1"
}

echo "Grove Configuration Validator"
echo "========================================"
echo

# Check file exists
if [[ ! -f "$CONFIG_FILE" ]]; then
    error "Config file not found: $CONFIG_FILE"
    exit 1
fi
pass "Config file exists"

# Validate JSON syntax
if ! jq empty "$CONFIG_FILE" 2>/dev/null; then
    error "Invalid JSON syntax in $CONFIG_FILE"
    exit 1
fi
pass "Valid JSON syntax"

# Validate top-level structure
info "Validating top-level structure..."

if ! jq -e '.drivers' "$CONFIG_FILE" >/dev/null 2>&1; then
    error "Missing required key: 'drivers'"
else
    pass "Found 'drivers' key"
fi

if ! jq -e '.mongodb' "$CONFIG_FILE" >/dev/null 2>&1; then
    warn "Missing optional key: 'mongodb'"
else
    pass "Found 'mongodb' key"
fi

if ! jq -e '.tools' "$CONFIG_FILE" >/dev/null 2>&1; then
    warn "Missing optional key: 'tools'"
else
    pass "Found 'tools' key"
fi

if ! jq -e '.workflow' "$CONFIG_FILE" >/dev/null 2>&1; then
    warn "Missing optional key: 'workflow'"
else
    pass "Found 'workflow' key"
fi

echo

# Validate each driver
info "Validating driver configurations..."
echo

DRIVERS=$(jq -r '.drivers | keys[]' "$CONFIG_FILE")

for driver in $DRIVERS; do
    echo "Validating driver: $driver"

    # Required fields
    if ! jq -e ".drivers.$driver.path" "$CONFIG_FILE" >/dev/null 2>&1; then
        error "Driver '$driver' missing required field: 'path'"
    else
        pass "Driver '$driver' has 'path'"
    fi

    if ! jq -e ".drivers.$driver.setup" "$CONFIG_FILE" >/dev/null 2>&1; then
        error "Driver '$driver' missing required field: 'setup'"
    else
        pass "Driver '$driver' has 'setup'"
    fi

    if ! jq -e ".drivers.$driver.commands" "$CONFIG_FILE" >/dev/null 2>&1; then
        error "Driver '$driver' missing required field: 'commands'"
    else
        pass "Driver '$driver' has 'commands'"
    fi

    # Validate setup object
    if jq -e ".drivers.$driver.setup.action" "$CONFIG_FILE" >/dev/null 2>&1; then
        action=$(jq -r ".drivers.$driver.setup.action" "$CONFIG_FILE")
        if [[ "$action" =~ ^actions/setup- ]]; then
            pass "Driver '$driver' has valid setup action: '$action'"
        else
            error "Driver '$driver' has invalid setup action: '$action'"
        fi
    else
        error "Driver '$driver' missing setup.action"
    fi

    # Validate commands object
    REQUIRED_COMMANDS=("install_deps" "format_check" "test")
    for cmd in "${REQUIRED_COMMANDS[@]}"; do
        if ! jq -e ".drivers.$driver.commands.$cmd" "$CONFIG_FILE" >/dev/null 2>&1; then
            error "Driver '$driver' missing command: '$cmd'"
        else
            pass "Driver '$driver' has command: '$cmd'"
        fi
    done

    # Validate path exists
    path=$(jq -r ".drivers.$driver.path" "$CONFIG_FILE" 2>/dev/null || echo "")
    if [[ -n "$path" && -d "$path" ]]; then
        pass "Driver '$driver' path exists: '$path'"
    elif [[ -n "$path" ]]; then
        warn "Driver '$driver' path does not exist: '$path'"
    fi

    # Validate watch_paths
    if jq -e ".drivers.$driver.watch_paths" "$CONFIG_FILE" >/dev/null 2>&1; then
        watch_paths_count=$(jq ".drivers.$driver.watch_paths | length" "$CONFIG_FILE")
        if [[ "$watch_paths_count" -gt 0 ]]; then
            pass "Driver '$driver' has $watch_paths_count watch path(s)"
        else
            warn "Driver '$driver' has empty watch_paths array"
        fi
    else
        info "Driver '$driver' using default watch_paths (same as path)"
    fi

    # Validate version or version_file in setup object
    has_version=$(jq -e ".drivers.$driver.setup.version" "$CONFIG_FILE" >/dev/null 2>&1 && echo "yes" || echo "no")
    has_version_file=$(jq -e ".drivers.$driver.setup.version_file" "$CONFIG_FILE" >/dev/null 2>&1 && echo "yes" || echo "no")

    if [[ "$has_version" == "yes" || "$has_version_file" == "yes" ]]; then
        pass "Driver '$driver' has version configuration"
    else
        warn "Driver '$driver' missing both 'setup.version' and 'setup.version_file'"
    fi

    echo
done

# Validate MongoDB configuration
if jq -e '.mongodb' "$CONFIG_FILE" >/dev/null 2>&1; then
    echo "Validating MongoDB configuration..."

    # Validate port
    if jq -e '.mongodb.port' "$CONFIG_FILE" >/dev/null 2>&1; then
        port=$(jq -r '.mongodb.port' "$CONFIG_FILE")
        if [[ "$port" =~ ^[0-9]+$ ]] && [[ "$port" -ge 1024 ]] && [[ "$port" -le 65535 ]]; then
            pass "MongoDB port is valid: $port"
        else
            error "MongoDB port is invalid: $port (must be 1024-65535)"
        fi
    fi

    # Validate connection string or connection_string_template
    if jq -e '.mongodb.connection_string_template' "$CONFIG_FILE" >/dev/null 2>&1; then
        conn_str=$(jq -r '.mongodb.connection_string_template' "$CONFIG_FILE")
        if [[ "$conn_str" =~ ^mongodb://localhost: ]] || [[ "$conn_str" =~ \{\{port\}\} ]]; then
            pass "MongoDB connection string template format is valid"
        else
            warn "MongoDB connection string template format may be invalid: $conn_str"
        fi
    elif jq -e '.mongodb.connection_string' "$CONFIG_FILE" >/dev/null 2>&1; then
        conn_str=$(jq -r '.mongodb.connection_string' "$CONFIG_FILE")
        if [[ "$conn_str" =~ ^mongodb://localhost:[0-9]+/ ]]; then
            pass "MongoDB connection string format is valid"
        else
            warn "MongoDB connection string format may be invalid: $conn_str"
        fi
    fi

    echo
fi

# Validate tools configuration
if jq -e '.tools' "$CONFIG_FILE" >/dev/null 2>&1; then
    echo "Validating tools configuration..."

    # Validate Atlas CLI
    if jq -e '.tools.atlas_cli' "$CONFIG_FILE" >/dev/null 2>&1; then
        if jq -e '.tools.atlas_cli.url' "$CONFIG_FILE" >/dev/null 2>&1; then
            url=$(jq -r '.tools.atlas_cli.url' "$CONFIG_FILE")
            if [[ "$url" =~ ^https:// ]]; then
                pass "Atlas CLI URL uses HTTPS"
            else
                error "Atlas CLI URL must use HTTPS: $url"
            fi
        fi
    fi

    # Validate Database Tools
    if jq -e '.tools.database_tools' "$CONFIG_FILE" >/dev/null 2>&1; then
        if jq -e '.tools.database_tools.url' "$CONFIG_FILE" >/dev/null 2>&1; then
            url=$(jq -r '.tools.database_tools.url' "$CONFIG_FILE")
            if [[ "$url" =~ ^https:// ]]; then
                pass "Database Tools URL uses HTTPS"
            else
                error "Database Tools URL must use HTTPS: $url"
            fi
        fi
    fi

    echo
fi

# Validate workflow configuration
if jq -e '.workflow' "$CONFIG_FILE" >/dev/null 2>&1; then
    echo "Validating workflow configuration..."

    # Validate timeouts
    if jq -e '.workflow.timeouts' "$CONFIG_FILE" >/dev/null 2>&1; then
        for timeout_key in $(jq -r '.workflow.timeouts | keys[]' "$CONFIG_FILE"); do
            timeout_val=$(jq -r ".workflow.timeouts.$timeout_key" "$CONFIG_FILE")
            if [[ "$timeout_val" =~ ^[0-9]+$ ]] && [[ "$timeout_val" -gt 0 ]]; then
                pass "Timeout '$timeout_key' is valid: ${timeout_val} minutes"
            else
                error "Timeout '$timeout_key' is invalid: $timeout_val"
            fi
        done
    fi

    echo
fi

# Summary
echo "========================================"
echo "Validation Summary"
echo "========================================"
printf "Warnings: %d\n" "$WARNINGS"
printf "Errors: %d\n" "$ERRORS"
echo

if [[ $ERRORS -eq 0 ]]; then
    echo "Configuration validation passed!"
    if [[ $WARNINGS -gt 0 ]]; then
        echo "Note: Please review warnings for potential improvements."
    fi
    exit 0
else
    echo "Configuration validation failed!"
    echo "Please fix the errors above before proceeding."
    exit 1
fi
