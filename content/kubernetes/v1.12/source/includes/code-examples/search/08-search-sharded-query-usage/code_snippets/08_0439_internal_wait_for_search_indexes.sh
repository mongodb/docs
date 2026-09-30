user_conn="${MDB_USER_CONNECTION_STRING:-${MDB_CONNECTION_STRING}}"

for collection_and_index in "movies default" "embedded_movies vector_index"; do
  read -r collection index_name <<< "${collection_and_index}"

  for _ in {1..30}; do
    status="$(kubectl exec mongodb-tools \
      -n "${MDB_NS}" \
      --context "${K8S_CTX}" \
      -- mongosh "${user_conn}" --quiet --eval "
        const indexes = db.getSiblingDB('sample_mflix').${collection}.getSearchIndexes();
        print(indexes.find(index => index.name === '${index_name}')?.status);
      " | tail -1 || true)"

    [[ "${status}" == "READY" ]] && break
    sleep 10
  done

  if [[ "${status}" != "READY" ]]; then
    echo "ERROR: Search index '${index_name}' for collection '${collection}' did not reach READY; last observed status: '${status:-unknown}'" >&2
    exit 1
  fi
done
