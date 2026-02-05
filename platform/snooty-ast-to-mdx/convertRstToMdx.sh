#!/usr/bin/env bash
set -euo pipefail

# Convert a Snooty content subfolder to MDX and place output into docs-nextjs/pages/

# --- Colored logging -------------------------------------------------------
BOLD=$'\033[1m'
RED=$'\033[31m'
GREEN=$'\033[32m'
YELLOW=$'\033[33m'
BLUE=$'\033[34m'
MAGENTA=$'\033[35m'
CYAN=$'\033[36m'
GRAY=$'\033[90m'
RESET=$'\033[0m'

log_usage() {
  printf "%b\n" "${BOLD}${MAGENTA}Usage:${RESET}"
  printf "\t${CYAN}$0 ${GREEN}-h${RESET} or ${GREEN}--help${GRAY} # shows this help message${RESET}\n\n"
  printf "\t${CYAN}$0 ${GREEN}<folder/inside/of/content>${RESET}\n"
  printf "\t${CYAN}$0 ${GRAY}# with no arguments, runs against all content folders${RESET}\n"
}

# Usage: log_step "1/3" "Message here"
log_step() {
  local idx="$1"; shift
  printf "%b\n" "${BOLD}${CYAN}[$idx]${RESET} $*"
}

log_success() { printf "%b\n" "${BOLD}${GREEN}✔${RESET} $*"; }
log_warning() { printf "%b\n" "${BOLD}${YELLOW}⚠ Warning:${RESET} $*" >&2; }
log_error() { printf "%b\n" "${BOLD}${RED}✖ Error:${RESET} $*" >&2; }

# ---------------------------------------------------------------------------
# If user requests help explicitly, show usage and exit
if [[ ${1:-} == "-h" || ${1:-} == "--help" ]]; then
  log_usage
  exit 0
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
if git -C "$SCRIPT_DIR" rev-parse --show-toplevel >/dev/null 2>&1; then
  REPO_ROOT="$(git -C "$SCRIPT_DIR" rev-parse --show-toplevel)"
else
  # Fallback: assume script is at platform/snooty-ast-to-mdx
  REPO_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"
fi

# Important paths
SNOOTY_BIN="$REPO_ROOT/platform/snooty-ast-to-mdx/snooty/snooty"
CONTENT_DIR="$REPO_ROOT/content"
CONVERTER_DIR="$REPO_ROOT/platform/snooty-ast-to-mdx"
TMP_ZIPS_DIR="$CONVERTER_DIR/.tmp_zips"
OUTPUT_DIR="$REPO_ROOT/content-mdx"

# ---------------------------------------------------------------------------
# Determine which content paths to process
# ---------------------------------------------------------------------------
# If no arguments supplied, process *all* immediate subdirectories under
# $CONTENT_DIR, equivalent to invoking the script separately for each.
declare -a INPUT_PATHS=()
if (( $# == 0 )); then
  while IFS= read -r -d '' dir; do
    INPUT_PATHS+=("$(basename "$dir")")
  done < <(find "$CONTENT_DIR" -mindepth 1 -maxdepth 1 -type d -print0)
else
  INPUT_PATHS=("$@")
fi

cleanup() {
  # Remove temporary zip workspace
  [[ -d "${TMP_ZIPS_DIR:-}" ]] && rm -rf "$TMP_ZIPS_DIR"
  # Remove downloaded Snooty binary directory
  if [[ -n "${SNOOTY_BIN:-}" ]]; then
    rm -rf "$(dirname "$SNOOTY_BIN")"
  fi

  # Log total runtime
  if [[ -n "${START_TIME:-}" ]]; then
    end_time=$(date +%s)
    elapsed=$(( end_time - START_TIME ))
    mins=$(( elapsed / 60 ))
    secs=$(( elapsed % 60 ))
    printf "%b\n" "${BOLD}${CYAN}⏱  Total runtime:${RESET} ${YELLOW}${mins}m ${secs}s${RESET}"
  fi
}
# Ensure cleanup runs on normal exit, Ctrl+C (INT), or termination (TERM)
trap cleanup EXIT INT TERM

# ---------------------------------------------------------------------------
# Version & architecture configuration
# ---------------------------------------------------------------------------
# Snooty parser version | default can be adjusted below or set in the environment:
# `SNOOTY_VERSION=v0.20.7 ./convertRstToMdx.sh atlas`.
# Check for latest version at: https://github.com/mongodb/snooty-parser/releases
SNOOTY_VERSION="${SNOOTY_VERSION:-v0.20.14}"
# Whether to show verbose output from the Snooty parser when building the AST
SNOOTY_VERBOSE="${SNOOTY_VERBOSE:-false}"

# Choose architecture via `SNOOTY_ARCH=<alias>` or adjust the default below
# Aliases:
#   arm   → darwin_arm64 (Apple Silicon)
#   x86   → darwin_x86_64 (Intel Mac)
#   linux → linux_x86_64 (Linux x86_64)
# You may also supply the full canonical value directly (darwin_arm64, darwin_x86_64, linux_x86_64).
ARCH_INPUT="${SNOOTY_ARCH:-arm}"
case "$ARCH_INPUT" in
  arm|darwin_arm64|mac|mac_arm)
    ARCH_PRETTY="Apple Silicon"
    SNOOTY_ARCH="darwin_arm64";;
  x86|darwin_x86_64|intel|mac_x86)
    ARCH_PRETTY="Intel Mac"
    SNOOTY_ARCH="darwin_x86_64";;
  linux|linux_x86_64)
    ARCH_PRETTY="Linux x86_64"
    SNOOTY_ARCH="linux_x86_64";;
  *)
    log_error "Unknown architecture alias: ${ARCH_INPUT}. Allowed: arm, x86, linux, or canonical values."
    exit 1;;
esac

# Construct download URL for selected version/architecture
SNOOTY_ZIP_URL="https://github.com/mongodb/snooty-parser/releases/download/${SNOOTY_VERSION}/snooty-${SNOOTY_VERSION}-${SNOOTY_ARCH}.zip"

# Helper to download and install the Snooty parser binary
download_snooty() {
  log_step "0/3" "${CYAN}Downloading Snooty parser ${YELLOW}${SNOOTY_VERSION}${RESET} (${MAGENTA}${ARCH_PRETTY}${RESET})\n  ${GRAY}${SNOOTY_ZIP_URL}${RESET}\n"

  # Ensure required tools exist
  for cmd in curl unzip; do
    if ! command -v "$cmd" >/dev/null 2>&1; then
      log_error "Required command '$cmd' is not installed."
      exit 1
    fi
  done

  # Create temp locations
  mkdir -p "$TMP_ZIPS_DIR"
  local tmp_zip
  tmp_zip="$(mktemp "$TMP_ZIPS_DIR/snooty_${SNOOTY_VERSION}_XXXX.zip")"
  local tmp_dir
  tmp_dir="$(mktemp -d)"

  # Download & extract
  if ! curl -LsSf -o "$tmp_zip" "$SNOOTY_ZIP_URL"; then
    log_error "Failed to download Snooty parser zip from ${YELLOW}$SNOOTY_ZIP_URL${RESET}"
    exit 1
  fi
  unzip -q "$tmp_zip" -d "$tmp_dir"

  local extracted_root
  extracted_root="$(find "$tmp_dir" -mindepth 1 -maxdepth 1 -type d | head -n 1 || true)"
  if [[ -z "$extracted_root" ]]; then
    log_error "Could not locate extracted root directory inside archive."
    exit 1
  fi

  local snooty_dir
  snooty_dir="$(dirname "$SNOOTY_BIN")"
  rm -rf "$snooty_dir"
  mkdir -p "$snooty_dir"
  # Copy all release files into the destination directory
  cp -R "$extracted_root"/* "$snooty_dir/"

  # Ensure main executable is present and has executable permissions
  if [[ ! -f "$SNOOTY_BIN" ]]; then
    log_error "Expected 'snooty' executable not found after extraction at ${YELLOW}$SNOOTY_BIN${RESET}"
    exit 1
  fi
  chmod +x "$SNOOTY_BIN"

  # Clean up
  rm -rf "$tmp_zip" "$tmp_dir"
  log_success "${GREEN}Installed Snooty parser to ${YELLOW}$SNOOTY_BIN${RESET}"
}

# Start the timer for the script duration
START_TIME=$(date +%s)
# Install the snooty parser based on the options (SNOOTY_ARCH and SNOOTY_VERSION)
download_snooty

# Sanitize relative path (strip leading slashes or ./)
declare -a TARGET_REL_PATHS=()
for input_path in "${INPUT_PATHS[@]}"; do
  REL_INPUT_PATH="$(echo "$input_path" | sed -E 's|^/+||; s|^\./+||')"
  INPUT_DIR="$CONTENT_DIR/$REL_INPUT_PATH"

  # Validations
  if [[ ! -x "$SNOOTY_BIN" ]]; then
    log_error "Snooty parser not found or could not be installed at ${YELLOW}$SNOOTY_BIN${RESET}"
    exit 1
  fi

  if [[ ! -d "$INPUT_DIR" ]]; then
    log_error "Input directory does not exist: ${YELLOW}$INPUT_DIR${RESET}"
    exit 1
  fi

  if ! command -v pnpm >/dev/null 2>&1; then
    log_error "pnpm is not installed. Please install pnpm first."
    exit 1
  fi

  mkdir -p "$OUTPUT_DIR"
  mkdir -p "$TMP_ZIPS_DIR"

  # Determine whether the provided path is a Snooty project (has snooty.toml)
  # or a parent containing children that are Snooty projects
  if [[ -f "$INPUT_DIR/snooty.toml" ]]; then
    TARGET_REL_PATHS+=("$REL_INPUT_PATH")
  else
    # Collect immediate child directories that contain snooty.toml
    while IFS= read -r -d '' child_dir; do
      child_name="$(basename "$child_dir")"
      if [[ -f "$child_dir/snooty.toml" ]]; then
        TARGET_REL_PATHS+=("$REL_INPUT_PATH/$child_name")
      fi
    done < <(find "$INPUT_DIR" -mindepth 1 -maxdepth 1 -type d -print0)
  fi

  if (( ${#TARGET_REL_PATHS[@]} == 0 )); then
    log_warning "No ${YELLOW}snooty.toml${RESET} found at input or its immediate children: ${YELLOW}$INPUT_DIR${RESET}. Skipping."
    continue
  fi
done

if (( ${#TARGET_REL_PATHS[@]} == 0 )); then
  log_error "No ${YELLOW}snooty.toml${RESET} found in any provided or discovered input directories."
  exit 1
fi

TOTAL_PROJECTS=${#TARGET_REL_PATHS[@]}
printf "%b\n" "\n${BOLD}${BLUE}Total projects to process:${RESET} ${YELLOW}$TOTAL_PROJECTS${RESET}\n"

# Prepare converter dependencies once
pushd "$CONVERTER_DIR" >/dev/null
if [[ ! -d node_modules ]]; then
  pnpm install --filter snooty-ast-to-mdx
fi
popd >/dev/null

idx=1
for rel_path in "${TARGET_REL_PATHS[@]}"; do
  printf "%b\n" "${BOLD}${MAGENTA}→ Starting project${RESET} [${BOLD}${BLUE}${idx}/${TOTAL_PROJECTS}${RESET}] ${YELLOW}$rel_path${RESET}\n"
  abs_input="$CONTENT_DIR/$rel_path"

  # Remove existing project output directory to ensure a clean conversion
  project_output="$OUTPUT_DIR/$rel_path"
  if [[ -d "$project_output" ]]; then
    log_step "0/3" "${CYAN}Removing existing project output: ${YELLOW}$project_output${RESET}\n"
    rm -rf "$project_output"
  fi
  zip_file_name="$rel_path.zip"
  zip_path="$TMP_ZIPS_DIR/$zip_file_name"
  # Ensure nested directory exists when rel_path contains slashes
  mkdir -p "$(dirname "$zip_path")"

  log_step "1/3" "${CYAN}Building Snooty AST zip from: ${YELLOW}$abs_input${RESET}\n"
  # Conditionally hide snooty build logs
  redirect_output="> /dev/null 2>&1"
  [[ "$SNOOTY_VERBOSE" == "true" ]] && redirect_output=""
  # Run Snooty build, but gracefully handle exit code 0 (often indicates validation errors we can ignore)
  if ! eval "$SNOOTY_BIN build '$abs_input' --output '$zip_path' $redirect_output"; then
    exit_code=$?
    if [[ $exit_code -eq 0 ]]; then
      log_warning "Snooty build exited with code ${YELLOW}0${RESET}. Continuing...\n"
    else
      log_error "Snooty build failed with exit code ${YELLOW}$exit_code${RESET}. Aborting.\n"
      exit "$exit_code"
    fi
  fi

  # Determine per-project output base. If rel_path has a parent directory (e.g., atlas/v1),
  # place output under that parent (pages/atlas), so the tool can create the child (v1) within.
  project_parent="$(dirname "$rel_path")"
  if [[ "$project_parent" == "." ]]; then
    per_project_output_dir="$OUTPUT_DIR"
  else
    per_project_output_dir="$OUTPUT_DIR/$project_parent"
  fi
  mkdir -p "$per_project_output_dir"

  log_step "2/3" "${CYAN}Converting AST zip to MDX into: ${YELLOW}$per_project_output_dir${RESET} (${GRAY}$rel_path${RESET})\n"
  pushd "$CONVERTER_DIR" >/dev/null
  pnpm run --silent start "$zip_path" "$per_project_output_dir"
  popd >/dev/null

  log_step "3/3" "${CYAN}Cleaning up temporary zip: ${YELLOW}$zip_path${RESET}\n"
  rm -f "$zip_path"
  ((idx++))
done

log_success "${GREEN}Done. MDX output available at: ${YELLOW}$OUTPUT_DIR/${RESET}\n"
