#!/usr/bin/env bash
#
# Serve the checked-in OpenAPI specs in a local Swagger UI.
#
# Usage (from the swagger/ directory):
#   cd content/magenta/upcoming/source/includes/swagger
#   ./swagger.sh           # start (default port 8080)
#   ./swagger.sh --port 9000
#   ./swagger.sh stop      # stop the container
#
# Requires Docker. Specs are mounted read-only from ./api-specs/, so any
# edits are picked up by a browser refresh.
#

set -euo pipefail

SPECS_DIR="$(pwd)/api-specs"
CONTAINER="agentic-swagger"
PORT=8080
ACTION="start"

while [[ $# -gt 0 ]]; do
  case "$1" in
    stop)        ACTION="stop"; shift ;;
    --port)      PORT="$2"; shift 2 ;;
    -h|--help)   sed -n '2,13p' "$0"; exit 0 ;;
    *)           echo "Unknown arg: $1" >&2; exit 1 ;;
  esac
done

if [[ ! "$PORT" =~ ^[0-9]+$ ]] || (( PORT < 1 || PORT > 65535 )); then
  echo "Invalid --port value: $PORT (must be 1-65535)" >&2
  exit 1
fi

if ! command -v docker &>/dev/null; then
  echo "docker is required but not installed" >&2
  exit 1
fi

if [[ "$ACTION" == "stop" ]]; then
  docker rm -f "$CONTAINER" >/dev/null 2>&1 || true
  echo "Stopped $CONTAINER."
  exit 0
fi

if [[ ! -d "$SPECS_DIR" ]]; then
  echo "No specs found at $SPECS_DIR" >&2
  exit 1
fi

# Stop any prior instance so re-runs are idempotent.
docker rm -f "$CONTAINER" >/dev/null 2>&1 || true

urls_json='[
  {"url":"/swagger/specs/api-gateway-external/openapi.yaml","name":"API Gateway (External)"},
  {"url":"/swagger/specs/api-gateway-internal/openapi.yaml","name":"API Gateway (Internal)"},
  {"url":"/swagger/specs/executor-control-plane/openapi.yaml","name":"Executor Control Plane"},
  {"url":"/swagger/specs/orchestration-engine/openapi.yaml","name":"Orchestration Engine"},
  {"url":"/swagger/specs/guardrails-server/openapi.yaml","name":"Guardrails Server"},
  {"url":"/swagger/specs/runner-aer/openapi.yaml","name":"Runner AER"},
  {"url":"/swagger/specs/runner-tool/openapi.yaml","name":"Runner Tool Pod"}
]'

docker run -d --rm \
  --name "$CONTAINER" \
  -p "${PORT}:8080" \
  -v "${SPECS_DIR}:/usr/share/nginx/html/specs:ro" \
  -e BASE_URL=/swagger \
  -e URLS="$urls_json" \
  swaggerapi/swagger-ui >/dev/null

echo "Swagger UI running at http://localhost:${PORT}/swagger/"
echo "Stop with: $0 stop"
