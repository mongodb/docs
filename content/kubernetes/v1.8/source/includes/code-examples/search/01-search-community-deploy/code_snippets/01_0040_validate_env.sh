required=(
  K8S_CTX
  MDB_NS
  MDB_RESOURCE_NAME
  MDB_VERSION
  MDB_MEMBERS
  CERT_MANAGER_NAMESPACE
  MDB_TLS_CA_SECRET_NAME
  MDB_TLS_SERVER_CERT_SECRET_NAME
  MDB_SEARCH_TLS_SECRET_NAME
  MDB_ADMIN_USER_PASSWORD
  MDB_SEARCH_SYNC_USER_PASSWORD
  MDB_USER_PASSWORD
  OPERATOR_HELM_CHART
)

missing_req=()
for v in "${required[@]}"; do [[ -n "${!v:-}" ]] || missing_req+=("${v}"); done

if (( ${#missing_req[@]} )); then
  echo "ERROR: Missing required environment variables:" >&2
  for m in "${missing_req[@]}"; do echo "  - ${m}" >&2; done
else
  echo "All required environment variables present."
fi
