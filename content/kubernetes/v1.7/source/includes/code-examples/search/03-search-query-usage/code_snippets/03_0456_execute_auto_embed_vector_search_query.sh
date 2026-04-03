mdb_script=$(cat <<'EOF'
use sample_mflix;
db.movies.aggregate([
   {
     "$vectorSearch": {
       "index": "vector_auto_embed_index",
       "path": "plot",
       "query": "spy thriller",
       "numCandidates": 150,
       "limit": 10
     }
   },
   {
     "$project": {
       "_id": 0,
       "plot": 1,
       "title": 1,
       "score": { "$meta": "vectorSearchScore" }
     }
   }
 ]);
EOF
)

kubectl exec --context "${K8S_CTX}" -n "${MDB_NS}" \
  mongodb-tools-pod -- /bin/bash -eu -c "$(cat <<EOF
echo '${mdb_script}' > /tmp/mdb_script.js
mongosh --quiet "${MDB_CONNECTION_STRING}" < /tmp/mdb_script.js
EOF
)"
