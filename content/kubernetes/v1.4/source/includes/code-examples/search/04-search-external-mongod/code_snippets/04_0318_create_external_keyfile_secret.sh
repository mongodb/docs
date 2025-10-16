kubectl --context "${K8S_CTX}" --namespace "${MDB_NS}" \
  create secret generic "${MDB_EXTERNAL_KEYFILE_SECRET_NAME}" \
  --from-literal=keyfile="${MDB_EXTERNAL_KEYFILE_CONTENT}"
