user_conn="${MDB_USER_CONNECTION_STRING:-${MDB_CONNECTION_STRING}}"

kubectl exec -i mongodb-tools \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  -- mongosh --quiet "${user_conn}" <<'MONGOSH'
use sample_mflix;
db.movies.getSearchIndexes();
db.embedded_movies.getSearchIndexes();
MONGOSH
