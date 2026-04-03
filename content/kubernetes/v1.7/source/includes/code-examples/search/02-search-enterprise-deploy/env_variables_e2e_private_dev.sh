export K8S_CTX="kind-kind"

# patch id from evergreen patch
version_id="688de361d940720007dc0267"

search_image_repo="268558157000.dkr.ecr.eu-west-1.amazonaws.com/mongot"
search_image_hash="fbd60fb055dd500058edcb45677ea85d19421f47"

ecr="268558157000.dkr.ecr.us-east-1.amazonaws.com"
declare -a helm_values=(
"registry.imagePullSecrets=image-registries-secret"
"registry.operator=${ecr}/dev"
"registry.initOpsManager=${ecr}/dev"
"registry.initAppDb=${ecr}/dev"
"registry.initDatabase=${ecr}/dev"
"registry.agent=${ecr}/dev"
"registry.opsManager=quay.io/mongodb"
"registry.appDb=quay.io/mongodb"
"registry.database=${ecr}/dev"
"operator.version=${version_id}"
"initOpsManager.version=${version_id}"
"initAppDb.version=${version_id}"
"initDatabase.version=${version_id}"
"database.version=${version_id}"
"search.community.repo=${search_image_repo}"
"search.community.name=community"
"search.community.version=${search_image_hash}"
)

SCRIPT_PATH="${BASH_SOURCE[0]}"
SCRIPT_DIR="$(cd "$(dirname "${SCRIPT_PATH}")" && pwd)"

OPERATOR_ADDITIONAL_HELM_VALUES="$(echo -n "${helm_values[@]}" | tr ' ' ',')"
export OPERATOR_ADDITIONAL_HELM_VALUES
OPERATOR_HELM_CHART="$(realpath "${SCRIPT_DIR}/../../helm_chart")"
export OPERATOR_HELM_CHART
