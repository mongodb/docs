echo "Executing text search query..."
echo ""

user_conn="${MDB_USER_CONNECTION_STRING:-${MDB_CONNECTION_STRING}}"

kubectl exec -i mongodb-tools \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  -- mongosh --quiet "${user_conn}" <<'MONGOSH'
use sample_mflix;
db.movies.aggregate([
  {
    $search: {
      "compound": {
        "must": [ {
          "text": {
            "query": "baseball",
            "path": "plot"
          }
        }],
        "mustNot": [ {
          "text": {
            "query": ["Comedy", "Romance"],
            "path": "genres"
          }
        } ]
      },
      "sort": {
        "released": -1
      }
    }
  },
  {
    $limit: 3
  },
  {
    $project: {
      "_id": 0,
      "title": 1,
      "plot": 1,
      "genres": 1,
      "released": 1
    }
  }
]);
MONGOSH

echo ""
echo "Search query executed successfully"
