kubectl exec --context "${K8S_CTX}" -n "${MDB_NS}" mongodb-tools-pod -- \
  mongosh --quiet "${MDB_CONNECTION_STRING}" --eval '
    db.getSiblingDB("sample_mflix").movies.getSearchIndexes()
      .forEach(index => print(index.name, index.status));
  '
