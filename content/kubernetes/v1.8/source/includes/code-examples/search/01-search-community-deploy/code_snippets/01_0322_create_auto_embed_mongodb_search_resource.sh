# create a Kubernetes secret that would have embedding model's API Keys
kubectl create secret generic "${AUTO_EMBEDDING_API_KEY_SECRET_NAME}" \
  --from-literal=query-key="${AUTO_EMBEDDING_API_QUERY_KEY}" \
  --from-literal=indexing-key="${AUTO_EMBEDDING_API_INDEXING_KEY}" --context "${K8S_CTX}" -n "${MDB_NS}"

# create MongoDBSearch resource, enabling the auto embedding using the API Keys provided above
kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: mongodb.com/v1
kind: MongoDBSearch
metadata:
  name: ${MDB_RESOURCE_NAME}
spec:
  security:
    tls:
      certificateKeySecretRef:
        name: ${MDB_SEARCH_TLS_SECRET_NAME}
  resourceRequirements:
    limits:
      cpu: "3"
      memory: 5Gi
    requests:
      cpu: "2"
      memory: 3Gi
  autoEmbedding:
    providerEndpoint: ${PROVIDER_ENDPOINT}
    embeddingModelAPIKeySecret:
      name: ${AUTO_EMBEDDING_API_KEY_SECRET_NAME}
EOF
