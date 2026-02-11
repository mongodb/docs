kubectl kustomize "github.com/minio/operator/resources/?timeout=120&ref=v5.0.12" | \
  kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" apply -f -

kubectl kustomize "github.com/minio/operator/examples/kustomization/tenant-tiny?timeout=120&ref=v5.0.12" | \
  kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" apply -f -

# add two buckets to the tenant config
kubectl --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "tenant-tiny" patch tenant/myminio \
  --type='json' \
  -p="[{\"op\": \"add\", \"path\": \"/spec/buckets\", \"value\": [{\"name\": \"${S3_OPLOG_BUCKET_NAME}\"}, {\"name\": \"${S3_SNAPSHOT_BUCKET_NAME}\"}]}]"
