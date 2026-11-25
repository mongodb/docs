kubectl --context "${K8S_CTX}" -n "${MDB_NS}" create configmap om-project \
  --from-literal=projectName="${OPS_MANAGER_PROJECT_NAME}" --from-literal=baseUrl="${OPS_MANAGER_API_URL}" \
  --from-literal=orgId="${OPS_MANAGER_ORG_ID:-}"

kubectl --context "${K8S_CTX}" -n "${MDB_NS}" create secret generic om-credentials \
  --from-literal=publicKey="${OPS_MANAGER_API_USER}" \
  --from-literal=privateKey="${OPS_MANAGER_API_KEY}"
