#!/usr/bin/env bash
# detect-changed-tests.sh <language>
#
# Detects which test files changed in a PR for a given code-example suite and
# writes GitHub step outputs:
#
#   run_all     - "true"  → run the full suite (infra/example/config changed,
#                           or non-PR event, or no diff found)
#               - "false" → run only the changed test files
#   test_filter - filter string ready for the test runner (set when run_all=false)
#                 Format per language:
#                   javascript/mongosh  pipe-joined path regex for --testPathPattern
#                   python              space-separated dotted module names
#                   go                  space-separated ./pkg/... patterns
#                   csharp              pipe-joined FullyQualifiedName~ expressions
#                   java                comma-separated class names
#
# Usage: bash .github/scripts/detect-changed-tests.sh <language>

set -euo pipefail

LANGUAGE="${1:?Usage: $0 <language>}"

case "$LANGUAGE" in
  javascript)
    SUITE_DIR="code-example-tests/javascript/driver"
    TEST_SUBDIR="tests"
    ;;
  python)
    SUITE_DIR="code-example-tests/python/pymongo"
    TEST_SUBDIR="tests_package"
    ;;
  go)
    SUITE_DIR="code-example-tests/go/driver"
    TEST_SUBDIR="tests"
    ;;
  csharp)
    SUITE_DIR="code-example-tests/csharp/driver"
    TEST_SUBDIR="Tests"
    ;;
  java)
    SUITE_DIR="code-example-tests/java/driver-sync"
    TEST_SUBDIR="src/test/java"
    ;;
  mongosh)
    SUITE_DIR="code-example-tests/command-line/mongosh"
    TEST_SUBDIR="tests"
    ;;
  *)
    echo "Unknown language: ${LANGUAGE}" >&2
    exit 1
    ;;
esac

emit_run_all() {
  echo "run_all=true" >> "${GITHUB_OUTPUT}"
}

# Non-PR events (scheduled, manual, etc.) always run the full suite
if [[ "${GITHUB_EVENT_NAME:-pull_request}" != "pull_request" ]]; then
  echo "Event '${GITHUB_EVENT_NAME}' is not a pull_request — running full suite."
  emit_run_all
  exit 0
fi

# Ensure base branch is available for diffing
git fetch origin "${GITHUB_BASE_REF}" --depth=1 2>/dev/null || true

# List files changed in this suite
CHANGED=$(git diff --name-only "origin/${GITHUB_BASE_REF}...HEAD" -- "${SUITE_DIR}" 2>/dev/null || true)

if [[ -z "${CHANGED}" ]]; then
  echo "No changes detected in ${SUITE_DIR} — running full suite as fallback."
  emit_run_all
  exit 0
fi

echo "Changed files in ${SUITE_DIR}:"
echo "${CHANGED}"

# Any change outside the test subdirectory → run the full suite
NON_TEST=$(echo "${CHANGED}" | { grep -v "^${SUITE_DIR}/${TEST_SUBDIR}/" || true; })

if [[ -n "${NON_TEST}" ]]; then
  echo "Non-test files changed — running full suite:"
  echo "${NON_TEST}"
  emit_run_all
  exit 0
fi

# Only test files changed
CHANGED_TESTS=$(echo "${CHANGED}" | grep "^${SUITE_DIR}/${TEST_SUBDIR}/")
echo "Only test files changed — running filtered suite:"
echo "${CHANGED_TESTS}"
echo "run_all=false" >> "${GITHUB_OUTPUT}"

# If every changed test file was deleted there is nothing to run. Skip all
# expensive setup steps by emitting an empty test_filter.
EXISTING_TESTS=$(echo "${CHANGED_TESTS}" | while IFS= read -r f; do
  [[ -f "${f}" ]] && echo "${f}"
done)
if [[ -z "${EXISTING_TESTS}" ]]; then
  echo "All changed test files were deleted — skipping test run."
  echo "test_filter=" >> "${GITHUB_OUTPUT}"
  exit 0
fi

case "$LANGUAGE" in
  javascript|mongosh)
    # Jest --testPathPattern: pipe-joined partial paths (matched as regex substrings)
    FILTER=$(echo "${CHANGED_TESTS}" \
      | sed "s|^${SUITE_DIR}/||" \
      | tr '\n' '|' \
      | sed 's/|$//')
    echo "test_filter=${FILTER}" >> "${GITHUB_OUTPUT}"
    ;;
  python)
    # python -m unittest: space-separated dotted module names
    FILTER=$(echo "${CHANGED_TESTS}" \
      | sed "s|^${SUITE_DIR}/||" \
      | sed 's|/|.|g' \
      | sed 's|\.py$||' \
      | tr '\n' ' ' \
      | sed 's/ $//')
    echo "test_filter=${FILTER}" >> "${GITHUB_OUTPUT}"
    ;;
  go)
    # go test: unique ./pkg/... patterns relative to the tests directory
    FILTER=$(echo "${CHANGED_TESTS}" \
      | sed "s|^${SUITE_DIR}/${TEST_SUBDIR}/||" \
      | while IFS= read -r f; do
          d=$(dirname "${f}")
          [[ "${d}" == "." ]] && echo "./" || echo "./${d}/..."
        done \
      | sort -u \
      | tr '\n' ' ' \
      | sed 's/ $//')
    echo "test_filter=${FILTER}" >> "${GITHUB_OUTPUT}"
    ;;
  csharp)
    # dotnet test --filter: pipe-joined FullyQualifiedName~ expressions
    FILTER=$(echo "${CHANGED_TESTS}" \
      | while IFS= read -r f; do
          classname=$(basename "${f}" .cs)
          echo "FullyQualifiedName~${classname}"
        done \
      | tr '\n' '|' \
      | sed 's/|$//')
    echo "test_filter=${FILTER}" >> "${GITHUB_OUTPUT}"
    ;;
  java)
    # Maven -Dtest=: comma-separated class names
    FILTER=$(echo "${CHANGED_TESTS}" \
      | while IFS= read -r f; do
          basename "${f}" .java
        done \
      | tr '\n' ',' \
      | sed 's/,$//')
    echo "test_filter=${FILTER}" >> "${GITHUB_OUTPUT}"
    ;;
esac
