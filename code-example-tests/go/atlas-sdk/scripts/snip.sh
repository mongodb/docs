#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<EOF
Usage: $(basename "$0") [flags]

This script runs both 'snip' and 'copy' commands automatically.

Flags:
  --ignore=PATTERN    Add ignore pattern (can be used multiple times)
  --rename=JSON       Add rename rule for copy command (JSON format)
  --verbose           Enable verbose output
  --interactive       Run in interactive mode (legacy)

Example:
  $(basename "$0") --ignore="tests/*.go" --rename='{"old.md":"new.md"}'
EOF
  exit 1
}

# defaults
INTERACTIVE_MODE=false
# Cache the project path
PROJECT=$(git rev-parse --show-toplevel)
INPUT_DIR="$PROJECT/code-example-tests/go/atlas-sdk" # source directory
OUTPUT_DIR=""
STATE=""
IGNORE_PATTERNS=(
  "internal_*.*" # e.g. INTERNAL_README.md
  "scripts/*"
  "tmp/*"
  ".idea/*"
  "*_test.go" # we're NOT including test files in artifact repo
  ".env"
  "*.gz"
  "*.log"
  "./logs/*" # for generated logs directory
  "configs/example-configs.json"
  # NOTE: DO NOT add pattern for ".gitignore"; we are including it in the artifact repo
)
RENAME_PATTERNS=()
VERBOSE=false

# Helper function to set output directory based on command
set_output_dir() {
  local cmd="$1"
  case "$cmd" in
    "snip")
      OUTPUT_DIR="$PROJECT/content/code-examples/tested/go/atlas-sdk/snippets"
      ;;
    "copy")
      OUTPUT_DIR="$PROJECT/content/code-examples/tested/go/atlas-sdk/project-copy"
      STATE="copy"
      ;;
    *)
      echo "Error: Invalid command '$cmd'"
      usage
      ;;
  esac
}

# Function to run a single command
run_command() {
  local cmd="$1"
  echo "=== Running $cmd command ==="

  set_output_dir "$cmd"

  # Create output directory if it doesn't exist
  echo "Creating output directory: $OUTPUT_DIR"
  mkdir -p "$OUTPUT_DIR"

  # Prepare ignore arguments
  IGNORE_ARGS=()
  if [[ ${#IGNORE_PATTERNS[@]} -gt 0 ]]; then
    for pattern in "${IGNORE_PATTERNS[@]}"; do
      IGNORE_ARGS+=(--ignore="$pattern")
    done
  fi

  # Prepare rename arguments (only for copy)
  RENAME_ARGS=()
  if [[ "$cmd" == "copy" && ${#RENAME_PATTERNS[@]} -gt 0 ]]; then
    for rule in "${RENAME_PATTERNS[@]}"; do
      RENAME_ARGS+=(--rename="$rule")
    done
  fi

  # Build the command
  CMD_ARGS=(bluehawk "$cmd" -o "$OUTPUT_DIR" "${IGNORE_ARGS[@]}")

  # Add state argument if set
  if [[ -n "$STATE" ]]; then
    CMD_ARGS+=(--state="$STATE")
  fi

  # Add rename arguments for copy command
  if [[ "$cmd" == "copy" ]] && [[ ${#RENAME_ARGS[@]} -gt 0 ]]; then
    CMD_ARGS+=("${RENAME_ARGS[@]}")
  fi

  # Clean destination directory for copy command
  if [[ "$cmd" == "copy" ]]; then
    echo "Cleaning destination directory: $OUTPUT_DIR"
    rm -rf "$OUTPUT_DIR" && mkdir -p "$OUTPUT_DIR"
  fi

  # Add input directory
  CMD_ARGS+=("$INPUT_DIR")

  # Execute the command
  echo "Running: ${CMD_ARGS[0]} ${CMD_ARGS[1]} [options] ${CMD_ARGS[${#CMD_ARGS[@]}-1]}"
  if [[ "$VERBOSE" == true ]]; then
    "${CMD_ARGS[@]}"
  else
    # Capture output once and process efficiently
    if output=$("${CMD_ARGS[@]}" 2>&1); then
      cmd_status=0
    else
      cmd_status=$?
    fi

    # Process output more efficiently with single pass
    {
      # Show any error messages first
      if echo "$output" | grep -q "bluehawk errors\|failed to write"; then
        echo -e "\nWarnings/Errors encountered:"
        echo "$output" | grep -E "(bluehawk errors|failed to write|error:)" || true
        echo
      fi

      # Extract summary section
      if summary=$(echo "$output" | sed -n '/Processed [0-9]* files:/,/^$/p' | head -4); then
        if [[ -n "$summary" ]]; then
          echo "$summary"
        else
          echo "No summary available"
        fi
      fi

      # Count and display written files
      written_files=$(echo "$output" | sed -n 's/^wrote text file based on.*-> /  /p' | sed "s|$OUTPUT_DIR/|  |g")
      written_count=$(echo "$written_files" | wc -l | tr -d ' ')

      # Only count if there are actual files
      if [[ -n "$written_files" && "$written_files" != "  " ]]; then
        echo -e "\nSuccessfully wrote the following $written_count files:"
        echo "$written_files"
      else
        echo -e "\nSuccessfully wrote 0 files"
        # Don't treat 0 files as an error for snip command - it might be expected
        if [[ "$cmd" == "snip" ]]; then
          echo "  (This may be normal if no snippets are defined)"
          cmd_status=0
        fi
      fi
    }

    if [[ $cmd_status -ne 0 ]]; then
      echo "Error: $cmd command failed with status $cmd_status"
      exit $cmd_status
    fi
  fi

  echo "=== Completed $cmd command ==="
  echo
}

# Process command-line args
while [[ $# -gt 0 ]]; do
  case "$1" in
    --ignore=*)
      IGNORE_PATTERNS+=("${1#*=}")
      shift
      ;;
    --rename=*)
      RENAME_PATTERNS+=("${1#*=}")
      shift
      ;;
    --verbose)
      VERBOSE=true
      shift
      ;;
    --interactive)
      INTERACTIVE_MODE=true
      shift
      ;;
    --help|-h)
      usage
      ;;
    *)
      echo "Unknown option: $1"
      usage
      ;;
  esac
done

# Interactive mode (legacy)
if [[ "$INTERACTIVE_MODE" == true ]]; then
  echo "=== Run Bluehawk (Interactive Mode) ==="

  # 1) pick snip or copy
  while true; do
    read -rp "Enter command (snip/copy): " CMD
    [[ "$CMD" == "snip" || "$CMD" == "copy" ]] && break
    echo "enter 'snip' or 'copy'"
  done

  # Ask for verbose logging
  read -rp "Enable verbose output? (y/N): " verbose_response
  # Convert to lowercase using portable method
  if [[ "$(echo "$verbose_response" | tr '[:upper:]' '[:lower:]')" == "y" ]]; then
    VERBOSE=true
  fi

  run_command "$CMD"
  exit 0
fi

# Default mode: run both commands automatically
echo "=== Running Bluehawk snip and copy commands ==="

# Check for errors first - fail on any parsing errors
echo "Checking for Bluehawk parsing errors..."
TEMP_IGNORE_ARGS=()
if [[ ${#IGNORE_PATTERNS[@]} -gt 0 ]]; then
  for pattern in "${IGNORE_PATTERNS[@]}"; do
    TEMP_IGNORE_ARGS+=(--ignore="$pattern")
  done
fi

# Run check and fail if there are any errors
if ! check_output=$(bluehawk check "${TEMP_IGNORE_ARGS[@]}" "$INPUT_DIR" 2>&1); then
  echo "Bluehawk validation failed! Parsing errors found:"
  echo "$check_output"
  echo
  echo "Please fix these parsing errors before continuing."
  echo "Common issues:"
  echo "  - Special characters in markdown files that break the lexer"
  echo "  - Malformed Bluehawk markup syntax"
  echo "  - Files that should be ignored but aren't in the ignore patterns"
  exit 1
fi

echo "Validation successful! No parsing errors found."

# After check, format the Go module to keep examples tidy
echo "Formatting Go code (goimports, go fmt) in $INPUT_DIR ..."
(
  cd "$INPUT_DIR" || exit 1
  if ! command -v goimports >/dev/null 2>&1; then
    echo "Error: goimports is not installed. Install with: go install golang.org/x/tools/cmd/goimports@latest" >&2
    exit 1
  fi
  goimports -w -local atlas-sdk/ . && go fmt ./...
)

# Run both commands
run_command "snip"
run_command "copy"

echo "=== All commands completed successfully ==="
