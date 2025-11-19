kubectl exec -n "${MDB_NS}" --context "${K8S_CTX}" \
  mongodb-tools-pod -- /bin/bash -eu -c "$(cat <<EOF
echo "Downloading sample database archive..."
curl https://atlas-education.s3.amazonaws.com/sample_mflix.archive \
  -o /tmp/sample_mflix.archive
echo "Restoring sample database"
mongorestore \
  --archive=/tmp/sample_mflix.archive \
  --verbose=1 \
  --drop \
  --nsInclude 'sample_mflix.*' \
  --uri="${MDB_CONNECTION_STRING}"
EOF
)"
