#!/usr/bin/env bash
set -euo pipefail

usage() {
  cat <<EOF
Usage: $(basename "$0") <command> [flags]

Commands:
  snip   Extract code examples from Bluehawk snippets
  copy   Copy sanitized project files

Example (non-interactive):
  $(basename "$0") copy --ignore="tests/*.go" --rename='{"old.md":"new.md"}'
EOF
  exit 1
}

# defaults
CMD=""
# Cache the project path
PROJECT=$(git rev-parse --show-toplevel)
INPUT_DIR="$PROJECT/code-example-tests/go/atlas-sdk" # source directory
OUTPUT_DIR=""
STATE=""
IGNORE_PATTERNS=(
  "internal_*.*" # e.g. INTERNAL_README.md
  "scripts/"
  "tmp/"
  ".idea"
  "*_test.go" # we're NOT including test files in artifact repo
  ".env"
  "*.gz"
  "*.log"
  "./logs" # for generated logs directory
  "example-configs.json"
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

# Process command-line args
if [[ $# -gt 0 ]]; then
  CMD="$1"
  shift
  set_output_dir "$CMD"

  # Process additional flags
  while [[ $# -gt 0 ]]; do
    case "$1" in
      --ignore=*)
        IGNORE_PATTERNS+=("${1#*=}")
        shift
        ;;
      --rename=*)
        if [[ "$CMD" == "copy" ]]; then
          RENAME_PATTERNS+=("${1#*=}")
        else
          echo "Warning: --rename is not supported for snip command, ignoring"
        fi
        shift
        ;;
      --state=*)
        STATE="${1#*=}"
        shift
        ;;
      --verbose)
        VERBOSE=true
        shift
        ;;
      *)
        echo "Unknown option: $1"
        usage
        ;;
    esac
  done
else
  # Interactive mode
  echo "=== Run Bluehawk ==="

  # 1) pick snip or copy
  while true; do
    read -rp "Enter command (snip/copy): " CMD
    [[ "$CMD" == "snip" || "$CMD" == "copy" ]] && break
    echo "enter 'snip' or 'copy'"
  done

  # Ask for verbose logging
  read -rp "Enable verbose output? (y/N): " verbose_response
  # Convert to lowercase using bash parameter expansion (more efficient)
  if [[ "${verbose_response,,}" == "y" ]]; then
    VERBOSE=true
  fi

  # Set output directory for interactive mode
  set_output_dir "$CMD"
fi

# Prepare ignore arguments - use printf for better performance than loop
IGNORE_ARGS=()
if [[ ${#IGNORE_PATTERNS[@]} -gt 0 ]]; then
  for pattern in "${IGNORE_PATTERNS[@]}"; do
    IGNORE_ARGS+=(--ignore="$pattern")
  done
fi

# Prepare rename arguments (only for copy)
RENAME_ARGS=()
if [[ "$CMD" == "copy" && ${#RENAME_PATTERNS[@]} -gt 0 ]]; then
  for rule in "${RENAME_PATTERNS[@]}"; do
    RENAME_ARGS+=(--rename="$rule")
  done
fi

# Check for errors first
echo "Checking for Bluehawk parsing errors..."
if ! check_output=$(bluehawk check "${IGNORE_ARGS[@]}" "$INPUT_DIR" 2>&1); then
  echo "Bluehawk check failed. Errors found:"
  # Use more efficient error extraction
  echo "$check_output" | sed -n '/bluehawk errors/,/^$/p'
  exit 1
fi

echo "Validation successful! No errors found."

# After successful bluehawk check, format the Go module to keep examples tidy
# - goimports fixes imports and grouping (using local prefix atlas-sdk/)
# - go fmt formats the code
echo "Formatting Go code (goimports, go fmt) in $INPUT_DIR ..."
(
  cd "$INPUT_DIR" || exit 1
  if ! command -v goimports >/dev/null 2>&1; then
    echo "Error: goimports is not installed. Install with: go install golang.org/x/tools/cmd/goimports@latest" >&2
    exit 1
  fi
  goimports -w -local atlas-sdk/ . && go fmt ./...
)

# Build the command - DO NOT use --quiet flag as it prevents file generation
CMD_ARGS=(bluehawk "$CMD" -o "$OUTPUT_DIR" "${IGNORE_ARGS[@]}")

# Add state argument if set
if [[ -n "$STATE" ]]; then
  CMD_ARGS+=(--state="$STATE")
fi

# Add rename arguments for copy command
if [[ "$CMD" == "copy" ]] && [[ ${#RENAME_ARGS[@]} -gt 0 ]]; then
  CMD_ARGS+=("${RENAME_ARGS[@]}")
fi

# Clean destination directory for copy command
if [[ "$CMD" == "copy" ]]; then
  echo "Cleaning destination directory: $OUTPUT_DIR"
  # More efficient directory cleanup
  rm -rf "$OUTPUT_DIR" && mkdir -p "$OUTPUT_DIR"
fi

# Add input directory
CMD_ARGS+=("$INPUT_DIR")

# Execute the command
echo "Running: ${CMD_ARGS[0]} ${CMD_ARGS[1]} [options] ${CMD_ARGS[${#CMD_ARGS[@]}-1]}"
if [[ "$VERBOSE" == true ]]; then
  exec "${CMD_ARGS[@]}"
else
  # Capture output once and process efficiently
  if output=$("${CMD_ARGS[@]}" 2>&1); then
    cmd_status=0
  else
    cmd_status=$?
  fi

  # Process output more efficiently with single pass
  {
    # Extract summary section
    if summary=$(echo "$output" | sed -n '/Processed [0-9]* files:/,/^$/p' | head -4); then
      if [[ -n "$summary" ]]; then
        echo -e "\n$summary"
      else
        echo -e "\nNo summary available"
      fi
    fi

    # Count and display written files
    written_files=$(echo "$output" | sed -n 's/^wrote text file based on.*-> /  /p')
    written_count=$(echo "$written_files" | wc -l | tr -d ' ')
    
    # Only count if there are actual files
    if [[ -n "$written_files" && "$written_files" != "  " ]]; then
      echo -e "\nSuccessfully wrote the following $written_count files:"
      echo "$written_files"
    else
      echo -e "\nSuccessfully wrote 0 files:"
      echo "  No files written"
    fi
  }

  exit $cmd_status
fi
