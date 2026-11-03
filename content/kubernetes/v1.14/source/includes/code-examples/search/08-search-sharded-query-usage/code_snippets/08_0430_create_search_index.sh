echo "Creating search index on sample_mflix.movies..."

user_conn="${MDB_USER_CONNECTION_STRING:-${MDB_CONNECTION_STRING}}"

# shellcheck disable=SC2016
kubectl exec mongodb-tools \
  -n "${MDB_NS}" \
  --context "${K8S_CTX}" \
  -- mongosh "${user_conn}" --quiet --eval '
  const db_mflix = db.getSiblingDB("sample_mflix");

  // Check if index already exists
  const result = db_mflix.runCommand({ listSearchIndexes: "movies" });
  const existing = (result.ok && result.cursor && result.cursor.firstBatch) ? result.cursor.firstBatch : [];

  if (existing.some(idx => idx.name === "default")) {
    print("Search index '\''default'\'' already exists");
  } else {
    // Create default text search index
    db_mflix.movies.createSearchIndex({
      name: "default",
      definition: {
        mappings: {
          dynamic: true
        }
      }
    });
    print("Search index '\''default'\'' created");
  }

  print("\nNote: Search index may take a few minutes to build and sync.");
'

echo "Search index creation initiated"
