# E2E Test Environment - Development Configuration
#
# This file is used when testing with development builds from Evergreen.
# Copy and modify for local development testing.

export K8S_CTX="<your kubernetes context here>"

# Evergreen patch ID - update this with your patch ID
version_id="<evergreen-patch-id>"

# Search image configuration
search_image_repo="268558157000.dkr.ecr.eu-west-1.amazonaws.com/mongot"
search_image_hash="<mongot-image-hash>"

# ECR registry
ecr="268558157000.dkr.ecr.us-east-1.amazonaws.com"

declare -a helm_values=(
  "registry.imagePullSecrets=image-registries-secret"
  "registry.operator=${ecr}/dev"
  "registry.initOpsManager=${ecr}/dev"
  "registry.initDatabase=${ecr}/dev"
  "registry.agent=${ecr}/dev"
  "registry.opsManager=quay.io/mongodb"
  "registry.appDb=quay.io/mongodb"
  "registry.database=${ecr}/dev"
  "operator.version=${version_id}"
  "initOpsManager.version=${version_id}"
  "initDatabase.version=${version_id}"
  "database.version=${version_id}"
  "search.community.repo=${search_image_repo}"
  "search.community.name=community"
  "search.community.version=${search_image_hash}"
)

SCRIPT_PATH="${BASH_SOURCE[0]}"
SCRIPT_DIR="$(cd "$(dirname "${SCRIPT_PATH}")" && pwd)"

OPERATOR_ADDITIONAL_HELM_VALUES="$(IFS=','; echo "${helm_values[*]}")"
export OPERATOR_ADDITIONAL_HELM_VALUES
export OPERATOR_HELM_CHART="${SCRIPT_DIR}/../../../helm_chart"
