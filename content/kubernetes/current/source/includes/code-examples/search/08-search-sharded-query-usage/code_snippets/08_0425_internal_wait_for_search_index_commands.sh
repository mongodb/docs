# MongoDBSearch reports phase Running as soon as mongot and the managed Envoy
# are ready. The source mongos receives searchIndexManagementHostAndPort only
# after the operator pushes the Ops Manager automation config and the agent
# restarts mongos. Poll the command the next snippets use, so index creation
# does not race that restart.
user_conn="${MDB_USER_CONNECTION_STRING:-${MDB_CONNECTION_STRING}}"

for _ in {1..30}; do
  result="$(kubectl exec mongodb-tools \
    -n "${MDB_NS}" \
    --context "${K8S_CTX}" \
    -- mongosh "${user_conn}" --quiet --eval '
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
