echo "Replicating Search Secrets to the member clusters..."

replicate_secret() {
  local name="$1" dst_ctx="$2"
  kubectl --context "${K8S_CTX_0}" -n "${MDB_NS}" get secret "${name}" -o json \
    | jq 'del(.metadata.resourceVersion, .metadata.uid, .metadata.creationTimestamp, .metadata.namespace, .metadata.ownerReferences, .metadata.managedFields, .status)' \
    | kubectl --context "${dst_ctx}" -n "${MDB_NS}" apply -f -
}

for shard_name in "${MDB_EXTERNAL_SHARD_0_NAME}" "${MDB_EXTERNAL_SHARD_1_NAME}" "${MDB_EXTERNAL_SHARD_2_NAME}"; do
  replicate_secret "${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_SEARCH_RESOURCE_NAME}-search-1-${shard_name}-cert" "${K8S_CTX_1}"
done
replicate_secret "${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_SEARCH_RESOURCE_NAME}-search-lb-1-cert" "${K8S_CTX_1}"
replicate_secret "${MDB_TLS_CERT_SECRET_PREFIX}-${MDB_SEARCH_RESOURCE_NAME}-search-lb-1-client-cert" "${K8S_CTX_1}"
replicate_secret "${MDB_SEARCH_RESOURCE_NAME}-search-sync-source-password" "${K8S_CTX_1}"

echo "[ok] Search Secrets replicated to member clusters"
