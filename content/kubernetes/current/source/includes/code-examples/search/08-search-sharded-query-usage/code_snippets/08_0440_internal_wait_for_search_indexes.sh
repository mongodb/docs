user_conn="${MDB_USER_CONNECTION_STRING:-${MDB_CONNECTION_STRING}}"
max_attempts=30
sleep_time=10

echo "Waiting for search indexes to become READY" \
  "(up to $((max_attempts * sleep_time))s)..."

indexes_ready="false"
for attempt in $(seq 1 ${max_attempts}); do
  # shellcheck disable=SC2016
  movies_status=$(\
    kubectl exec mongodb-tools \
      -n "${MDB_NS}" \
      --context "${K8S_CTX}" \
      -- mongosh "${user_conn}" --quiet --eval '
    const result = db.getSiblingDB("sample_mflix").runCommand({ listSearchIndexes: "movies" });
    if (result.ok && result.cursor && result.cursor.firstBatch && result.cursor.firstBatch.length > 0) {
      const idx = result.cursor.firstBatch.find(i => i.name === "default");
      print(idx ? (idx.status || "UNKNOWN") : "NOT_FOUND");
    } else {
      print("NOT_FOUND");
    }
  ' 2>/dev/null | tail -1)

  # shellcheck disable=SC2016
  vector_status=$(\
    kubectl exec mongodb-tools \
      -n "${MDB_NS}" \
      --context "${K8S_CTX}" \
      -- mongosh "${user_conn}" --quiet --eval '
    const result = db.getSiblingDB("sample_mflix").runCommand({ listSearchIndexes: "embedded_movies" });
    if (result.ok && result.cursor && result.cursor.firstBatch && result.cursor.firstBatch.length > 0) {
      const idx = result.cursor.firstBatch.find(i => i.name === "vector_index");
      print(idx ? (idx.status || "UNKNOWN") : "NOT_FOUND");
    } else {
      print("NOT_FOUND");
    }
  ' 2>/dev/null | tail -1)

  echo "Attempt ${attempt}/${max_attempts}:" \
    "movies='${movies_status}'" \
    "embedded_movies='${vector_status}'"

  if [[ "${movies_status}" == "READY" \
     && "${vector_status}" == "READY" ]]; then
    echo "All search indexes are READY"
    indexes_ready="true"
    break
  fi

  sleep ${sleep_time}
done

if [[ "${indexes_ready}" != "true" ]]; then
  echo "ERROR: Search indexes not ready" \
    "after $((max_attempts * sleep_time)) seconds" >&2
fi
