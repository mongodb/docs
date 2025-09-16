kubectl exec --context "${K8S_CTX}" -n "${MDB_NS}" mongodb-tools-pod -- \
  mongosh --quiet "${MDB_CONNECTION_STRING}" \
    --eval "use sample_mflix" \
    --eval 'db.runCommand({"listSearchIndexes": "embedded_movies"});'
