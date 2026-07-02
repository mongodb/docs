kubectl exec --context "${K8S_CTX}" -n "${MDB_NS}" mongodb-tools-pod -- \
  mongosh --quiet "${MDB_CONNECTION_STRING}" \
    --eval "use sample_mflix" \
    --eval 'db.movies.createSearchIndex("vector_auto_embed_index", "vectorSearch",
      { "fields": [ {
        "type": "autoEmbed",
        "modality": "text",
        "path": "plot",
        "model": "'"${EMBEDDING_MODEL}"'"
      } ] });'
