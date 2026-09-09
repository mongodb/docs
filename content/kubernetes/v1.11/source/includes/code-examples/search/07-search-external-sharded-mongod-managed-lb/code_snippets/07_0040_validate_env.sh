echo "Validating environment variables..."

required_vars=(
  "K8S_CTX"
  "MDB_NS"
  "MDB_EXTERNAL_CLUSTER_NAME"
  "MDB_SEARCH_RESOURCE_NAME"
  "MDB_VERSION"
  "MDB_ADMIN_USER_PASSWORD"
  "MDB_USER_PASSWORD"
  "MDB_SEARCH_SYNC_USER_PASSWORD"
  "MDB_EXTERNAL_DOMAIN"
  "MDB_EXTERNAL_SHARD_0_NAME"
  "MDB_EXTERNAL_SHARD_0_HOST"
  "MDB_EXTERNAL_SHARD_1_NAME"
  "MDB_EXTERNAL_SHARD_1_HOST"
  "MDB_EXTERNAL_MONGOS_HOST"
  "MDB_MONGOT_REPLICAS"
  "MDB_PROXY_SVC_SHARD_0"
  "MDB_PROXY_SVC_SHARD_1"
  "MDB_PROXY_HOST_SHARD_0"
  "MDB_PROXY_HOST_SHARD_1"
  "MDB_ADMIN_CONNECTION_STRING"
  "MDB_USER_CONNECTION_STRING"
)

missing_vars=()
for var in "${required_vars[@]}"; do
  [[ -n "${!var:-}" ]] && [[ "${!var}" != "<"* ]] || missing_vars+=("${var}")
done

if (( ${#missing_vars[@]} )); then
  echo "ERROR: Missing required environment variables:" >&2
  for m in "${missing_vars[@]}"; do echo "  - ${m}" >&2; done
  echo "Please edit env_variables.sh and set these values before proceeding." >&2
elif ! kubectl config get-contexts "${K8S_CTX}" &>/dev/null; then
  echo "ERROR: Kubernetes context '${K8S_CTX}' does not exist." >&2
  kubectl config get-contexts -o name
else
  echo "[ok] All required environment variables are set"
  echo "  Kubernetes context: ${K8S_CTX}"
  echo "  Namespace: ${MDB_NS}"
  echo "  External cluster name: ${MDB_EXTERNAL_CLUSTER_NAME}"
  echo "  Search resource name: ${MDB_SEARCH_RESOURCE_NAME}"
  echo "  Shard 0: ${MDB_EXTERNAL_SHARD_0_NAME} (${MDB_EXTERNAL_SHARD_0_HOST})"
  echo "  Shard 1: ${MDB_EXTERNAL_SHARD_1_NAME} (${MDB_EXTERNAL_SHARD_1_HOST})"
  echo "  Mongos: ${MDB_EXTERNAL_MONGOS_HOST}"
  echo "  Proxy shard 0: ${MDB_PROXY_HOST_SHARD_0}"
  echo "  Proxy shard 1: ${MDB_PROXY_HOST_SHARD_1}"
  echo "  Mongot replicas: ${MDB_MONGOT_REPLICAS}"
fi
