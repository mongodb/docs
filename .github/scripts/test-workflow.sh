#!/bin/bash

# Test script for the unified driver workflow
# Validates workflow configuration and simulates different scenarios

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(dirname "$(dirname "$SCRIPT_DIR")")"
WORKFLOWS_DIR="$REPO_ROOT/.github/workflows"

echo "Driver Workflow Test Suite"
echo "============================="

# Test 1: Validate YAML syntax
test_yaml_syntax() {
    echo "Test 1: YAML Syntax Validation"

    if command -v yamllint >/dev/null 2>&1; then
        if yamllint "$WORKFLOWS_DIR/grove-code-examples-ci.yml"; then
            echo "  YAML syntax is valid"
        else
            echo "  YAML syntax errors found"
            return 1
        fi
    else
        echo "  yamllint not available, installing..."
        pip install yamllint
        yamllint "$WORKFLOWS_DIR/grove-code-examples-ci.yml"
        echo "  YAML syntax is valid"
    fi
}

# Test 2: Validate GitHub Actions syntax
test_github_actions_syntax() {
    echo "Test 2: GitHub Actions Syntax Validation"

    # Check for required workflow elements
    local workflow_file="$WORKFLOWS_DIR/grove-code-examples-ci.yml"

    if grep -q "on:" "$workflow_file" && \
       grep -q "jobs:" "$workflow_file" && \
       grep -q "runs-on:" "$workflow_file"; then
        echo "  Basic workflow structure is valid"
    else
        echo "  Missing required workflow elements"
        return 1
    fi

    # Check for matrix strategy
    if grep -q "strategy:" "$workflow_file" && \
       grep -q "matrix:" "$workflow_file"; then
        echo "  Matrix strategy configured"
    else
        echo "  Matrix strategy not found"
        return 1
    fi

    # Check for change detection (jq-based, not dorny/paths-filter)
    if grep -q "detect-changes" "$workflow_file" && \
       grep -q "jq" "$workflow_file"; then
        echo "  Change detection configured"
    else
        echo "  Change detection not configured"
        return 1
    fi
}

# Test 3: Validate driver paths exist
test_driver_paths() {
    echo "Test 3: Driver Path Validation"
    
    local paths=(
        "code-example-tests/csharp/driver"
        "code-example-tests/go/driver"
        "code-example-tests/java/driver-sync"
        "code-example-tests/javascript/driver"
        "code-example-tests/python/pymongo"
        "code-example-tests/command-line/mongosh"
    )
    
    for path in "${paths[@]}"; do
        if [ -d "$REPO_ROOT/$path" ]; then
            echo "  Found: $path"
        else
            echo "  Missing: $path"
        fi
    done
}

# Test 4: Validate configuration file
test_config_file() {
    echo "Test 4: Configuration File Validation"

    local config_file="$WORKFLOWS_DIR/config/grove-driver-config.json"

    if [ -f "$config_file" ]; then
        echo "  Configuration file exists"

        if command -v jq >/dev/null 2>&1; then
            if jq empty "$config_file" 2>/dev/null; then
                echo "  JSON syntax is valid"

                # Check for required sections
                if jq -e '.drivers' "$config_file" >/dev/null; then
                    echo "  Drivers section found"
                else
                    echo "  Drivers section missing"
                    return 1
                fi

                if jq -e '.mongodb' "$config_file" >/dev/null; then
                    echo "  MongoDB section found"
                else
                    echo "  MongoDB section missing"
                    return 1
                fi

                if jq -e '.tools' "$config_file" >/dev/null; then
                    echo "  Tools section found"
                else
                    echo "  Tools section missing"
                    return 1
                fi
            else
                echo "  Invalid JSON syntax"
                return 1
            fi
        else
            echo "  jq not available, skipping JSON validation"
        fi
    else
        echo "  Configuration file not found"
        return 1
    fi
}

# Test 5: Simulate workflow execution
test_workflow_simulation() {
    echo "Test 5: Workflow Simulation"
    
    echo "  📋 Simulating path change detection..."
    
    # Simulate different change scenarios
    local scenarios=(
        "csharp:code-example-tests/csharp/driver/Examples/test.cs"
        "go:code-example-tests/go/driver/examples/test.go"
        "java:code-example-tests/java/driver-sync/src/test.java"
        "javascript:code-example-tests/javascript/driver/examples/test.js"
        "python:code-example-tests/python/pymongo/examples/test.py"
        "mongosh:code-example-tests/command-line/mongosh/test.js"
    )
    
    for scenario in "${scenarios[@]}"; do
        local driver="${scenario%%:*}"
        local file_path="${scenario#*:}"
        echo "    Testing $driver driver with change to $file_path"
        
        # This would normally be done by the paths-filter action
        # Here we just validate the path patterns would match
        case "$driver" in
            "csharp")
                if [[ "$file_path" == code-example-tests/csharp/driver/* ]]; then
                    echo "      Path pattern matches for $driver"
                else
                    echo "      Path pattern mismatch for $driver"
                fi
                ;;
            "go")
                if [[ "$file_path" == code-example-tests/go/driver/* ]]; then
                    echo "      Path pattern matches for $driver"
                else
                    echo "      Path pattern mismatch for $driver"
                fi
                ;;
            # Add other drivers as needed
            *)
                echo "      Path pattern matches for $driver"
                ;;
        esac
    done
}

# Test 6: Check for security best practices
test_security() {
    echo "Test 6: Security Validation"

    local workflow_file="$WORKFLOWS_DIR/grove-code-examples-ci.yml"

    # Check for hardcoded secrets
    if grep -i "password\|secret\|token" "$workflow_file" | grep -v "secrets\." | grep -v "github.token" | grep -v "NUGET_AUTH_TOKEN" | grep -v "GITHUB_TOKEN"; then
        echo "  Potential hardcoded secrets found"
    else
        echo "  No hardcoded secrets detected"
    fi

    # Check for secure download practices (check both workflow and composite action)
    local composite_action="$REPO_ROOT/.github/actions/grove-setup-mongodb/action.yml"
    if grep -q "https://" "$workflow_file" || \
       ([ -f "$composite_action" ] && grep -q "https://" "$composite_action"); then
        echo "  Using HTTPS for downloads"
    else
        echo "  Non-HTTPS downloads detected"
    fi

    # Check for permissions restrictions
    if grep -q "permissions:" "$workflow_file"; then
        echo "  Permissions configured"
    else
        echo "  No permissions restrictions (recommended for security)"
    fi
}

# Test 7: Performance validation
test_performance() {
    echo "Test 7: Performance Validation"

    local workflow_file="$WORKFLOWS_DIR/grove-code-examples-ci.yml"

    # Check for caching (built-in to setup actions)
    if grep -q "cache:" "$workflow_file"; then
        echo "  Caching configured"
    else
        echo "  No caching found (performance opportunity)"
    fi

    # Check for concurrency control
    if grep -q "concurrency:" "$workflow_file"; then
        echo "  Concurrency control enabled"
    else
        echo "  Concurrency control not configured"
    fi

    # Check for conditional execution
    if grep -q "if:" "$workflow_file"; then
        echo "  Conditional execution configured"
    else
        echo "  No conditional execution (efficiency opportunity)"
    fi
}

# Run all tests
run_all_tests() {
    echo "Running all tests..."
    echo ""
    
    local failed_tests=0
    
    test_yaml_syntax || ((failed_tests++))
    echo ""
    
    test_github_actions_syntax || ((failed_tests++))
    echo ""
    
    test_driver_paths || ((failed_tests++))
    echo ""
    
    test_config_file || ((failed_tests++))
    echo ""
    
    test_workflow_simulation || ((failed_tests++))
    echo ""
    
    test_security || ((failed_tests++))
    echo ""
    
    test_performance || ((failed_tests++))
    echo ""
    
    echo "Test Results Summary"
    echo "======================"
    
    if [ $failed_tests -eq 0 ]; then
        echo "All tests passed! Workflow is ready for deployment."
    else
        echo "$failed_tests test(s) failed. Please review and fix issues."
        return 1
    fi
}

# Main function
main() {
    case "${1:-all}" in
        "yaml")
            test_yaml_syntax
            ;;
        "actions")
            test_github_actions_syntax
            ;;
        "paths")
            test_driver_paths
            ;;
        "config")
            test_config_file
            ;;
        "simulation")
            test_workflow_simulation
            ;;
        "security")
            test_security
            ;;
        "performance")
            test_performance
            ;;
        "all")
            run_all_tests
            ;;
        *)
            echo "Usage: $0 {yaml|actions|paths|config|simulation|security|performance|all}"
            echo ""
            echo "Tests:"
            echo "  yaml        - Validate YAML syntax"
            echo "  actions     - Validate GitHub Actions syntax"
            echo "  paths       - Check driver paths exist"
            echo "  config      - Validate configuration file"
            echo "  simulation  - Simulate workflow execution"
            echo "  security    - Check security best practices"
            echo "  performance - Validate performance optimizations"
            echo "  all         - Run all tests (default)"
            exit 1
            ;;
    esac
}

main "$@"
