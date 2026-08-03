kubectl --context "${K8S_CTX_0}" -n "${MDB_NS}" create secret generic \
  "${MDB_SEARCH_RESOURCE_NAME}-search-sync-source-password" \
  --from-literal=password="${MDB_SEARCH_SYNC_USER_PASSWORD}" \
  --dry-run=client -o yaml \
  | kubectl --context "${K8S_CTX_0}" -n "${MDB_NS}" apply -f -
