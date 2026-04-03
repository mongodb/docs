echo "Importing sample_mflix dataset..."

admin_conn="${MDB_ADMIN_CONNECTION_STRING:-${MDB_CONNECTION_STRING}}"

echo "Downloading sample_mflix archive (~50MB)..."
kubectl exec mongodb-tools -n "${MDB_NS}" --context "${K8S_CTX}" -- \
  curl -sL 'https://atlas-education.s3.amazonaws.com/sample_mflix.archive' \
    -o /tmp/sample_mflix.archive
echo "  Download complete"

echo "Restoring database..."
kubectl exec mongodb-tools -n "${MDB_NS}" --context "${K8S_CTX}" -- \
  mongorestore --archive=/tmp/sample_mflix.archive \
    --uri="${admin_conn}" \
    --nsInclude='sample_mflix.*' \
    --drop \
    --numParallelCollections=1 \
    --numInsertionWorkersPerCollection=1
echo "  Database restored"

kubectl exec mongodb-tools -n "${MDB_NS}" --context "${K8S_CTX}" -- \
  rm -f /tmp/sample_mflix.archive

echo "Configuring sharding..."

kubectl exec mongodb-tools -n "${MDB_NS}" --context "${K8S_CTX}" -- \
  mongosh "${admin_conn}" --quiet --eval 'sh.enableSharding("sample_mflix")'
echo "  Enabled sharding on sample_mflix database"

kubectl exec mongodb-tools -n "${MDB_NS}" --context "${K8S_CTX}" -- \
  mongosh "${admin_conn}" --quiet --eval \
    'db.getSiblingDB("sample_mflix").movies.createIndex({ _id: "hashed" })'
echo "  Created hashed index on movies._id"

kubectl exec mongodb-tools -n "${MDB_NS}" --context "${K8S_CTX}" -- \
  mongosh "${admin_conn}" --quiet --eval \
    'sh.shardCollection("sample_mflix.movies", { _id: "hashed" })'
echo "  Sharded sample_mflix.movies collection"

echo ""
echo "Sample data imported and sharded"
