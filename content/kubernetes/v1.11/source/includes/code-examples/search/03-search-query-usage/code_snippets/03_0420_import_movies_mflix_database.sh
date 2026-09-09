echo "Downloading sample database archive..."
kubectl exec -n "${MDB_NS}" --context "${K8S_CTX}" mongodb-tools-pod -- \
  curl -fSL https://atlas-education.s3.amazonaws.com/sample_mflix.archive \
  -o /tmp/sample_mflix.archive

echo "Restoring sample database..."
kubectl exec -n "${MDB_NS}" --context "${K8S_CTX}" mongodb-tools-pod -- \
  mongorestore \
    --archive=/tmp/sample_mflix.archive \
    --verbose=1 \
    --drop \
    --nsInclude 'sample_mflix.*' \
    --uri="${MDB_CONNECTION_STRING}"
