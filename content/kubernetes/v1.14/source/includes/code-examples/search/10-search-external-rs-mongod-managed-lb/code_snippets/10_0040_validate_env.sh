echo "Validating environment variables..."

required_vars=(
  "K8S_CTX"
  "MDB_NS"
  "MDB_EXTERNAL_CLUSTER_NAME"
  "MDB_SEARCH_RESOURCE_NAME"
  "MDB_RS_MEMBERS"
  "MDB_VERSION"
  "MDB_EXTERNAL_HOST_0"
  "MDB_EXTERNAL_HOST_1"
  "MDB_EXTERNAL_HOST_2"
  "MDB_PROXY_HOST"
  "MDB_ADMIN_USER_PASSWORD"
  "MDB_USER_PASSWORD"
  "MDB_SEARCH_SYNC_USER_PASSWORD"
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
  echo "  RS members: ${MDB_RS_MEMBERS}"
  echo "  mongot replicas: ${MDB_MONGOT_REPLICAS:-1}"
fi
