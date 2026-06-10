#!/usr/bin/env bash
# build.sh — cross-compiles the comparison-kernel native binaries.
#
# Usage:
#   ./build.sh             # builds all committed platforms into bin/
#   ./build.sh --host      # also builds a binary for the current host into bin/
#
# Pure-Go (no cgo) cross-compilation produces byte-reproducible binaries for
# each target from any host that has the Go version pinned in go.mod. CI
# verifies that the committed binaries match a fresh build — see
# .github/actions/verify-comparison-kernel.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

# -trimpath:           strip file system paths from the binary
# -buildvcs=false:     don't embed VCS info (which varies by checkout state)
# -ldflags=-buildid=:  clear the build ID (otherwise content-hash–derived but unstable)
REPRODUCIBLE_FLAGS=(-trimpath -buildvcs=false -ldflags=-buildid=)

# CGO_ENABLED defaults to 1 when the target matches the build host and 0 when
# it doesn't, which changes how the Go runtime is linked even when the source
# uses no cgo. Pinning it to 0 makes every target byte-identical regardless of
# the build host — critical for CI verification across macOS contributors and
# Linux runners.
export CGO_ENABLED=0

# Committed platforms. Each language bridge picks the matching binary at
# runtime by mapping its host OS/arch onto the Go GOOS/GOARCH naming used here.
TARGETS=(
  "darwin/arm64"
  "darwin/amd64"
  "linux/amd64"
  "linux/arm64"
  "windows/amd64"
  "windows/arm64"
)

mkdir -p bin

for target in "${TARGETS[@]}"; do
  goos="${target%/*}"
  goarch="${target#*/}"
  ext=""
  if [[ "$goos" == "windows" ]]; then
    ext=".exe"
  fi
  out="bin/comparison-kernel-${goos}-${goarch}${ext}"
  echo "Building ${out} (GOOS=${goos} GOARCH=${goarch})..."
  GOOS="$goos" GOARCH="$goarch" go build "${REPRODUCIBLE_FLAGS[@]}" -o "$out" .
  echo "  → ${out}  ($(du -sh "$out" | cut -f1))"
done

if [[ "${1:-}" == "--host" ]]; then
  host_goos="$(go env GOOS)"
  host_goarch="$(go env GOARCH)"
  ext=""
  if [[ "$host_goos" == "windows" ]]; then
    ext=".exe"
  fi
  out="bin/comparison-kernel-${host_goos}-${host_goarch}${ext}"
  # Already built if the host is one of the committed targets — skip to keep
  # the output deterministic.
  if [[ ! -f "$out" ]]; then
    echo "Building host binary ${out}..."
    go build "${REPRODUCIBLE_FLAGS[@]}" -o "$out" .
    echo "  → ${out}"
  fi
fi

echo "Done."
