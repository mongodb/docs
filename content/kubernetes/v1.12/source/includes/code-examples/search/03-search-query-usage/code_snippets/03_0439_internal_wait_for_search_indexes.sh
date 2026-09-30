indexes=("movies default" "embedded_movies vector_index")
[[ -n "${EMBEDDING_MODEL:-}" ]] && indexes+=("movies vector_auto_embed_index")

for collection_and_index in "${indexes[@]}"; do
  read -r collection index_name <<< "${collection_and_index}"

  for _ in {1..30}; do
    status="$(kubectl exec --context "${K8S_CTX}" -n "${MDB_NS}" mongodb-tools-pod \
      -- mongosh "${MDB_CONNECTION_STRING}" --quiet --eval "
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
