# MongoDBSearch reports phase Running as soon as mongot is ready. The source
# mongod receives searchIndexManagementHostAndPort config field only after the operator
# pushes the Ops Manager automation config and the agent restarts mongod. Poll
# the command the next snippets use, so index creation does not race that
# restart.
for _ in {1..30}; do
  result="$(kubectl exec --context "${K8S_CTX}" -n "${MDB_NS}" mongodb-tools-pod \
    -- mongosh "${MDB_CONNECTION_STRING}" --quiet --eval '
      const result = db.getSiblingDB("sample_mflix").runCommand({ listSearchIndexes: "movies" });
      print(result.ok ? "ok" : (result.errmsg || "error"));
    ' 2>&1 | tail -1 || true)"

  [[ "${result}" == "ok" ]] && break
  sleep 10
done

if [[ "${result}" != "ok" ]]; then
  echo "ERROR: The deployment does not accept search index commands yet; last response: '${result:-unknown}'" >&2
  exit 1
fi

echo "[ok] Deployment accepts search index commands"
