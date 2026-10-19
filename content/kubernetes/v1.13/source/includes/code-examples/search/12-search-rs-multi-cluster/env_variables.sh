# Kubernetes contexts for the two member clusters. Cluster 0 is also the
# central cluster where the operator and MongoDBSearch resource run.
export K8S_CTX_0="<central/member-0 cluster context>"
export K8S_CTX_1="<member-1 cluster context>"
export MDB_NS="mongodb"

# Existing external replica set and the MongoDBSearch resource to create.
export MDB_EXTERNAL_CLUSTER_NAME="mdb-mc-rs"
export MDB_SEARCH_RESOURCE_NAME="ext-rs"

# MongoDB version used by the optional query tools pod.
export MDB_VERSION="8.2.6-ent"

# Existing search-sync-source user password.
export MDB_SEARCH_SYNC_USER_PASSWORD="<search-sync-source password>"

# Operator installation.
export OPERATOR_HELM_CHART="oci://quay.io/mongodb/helm-charts/mongodb-kubernetes"
export OPERATOR_ADDITIONAL_HELM_VALUES=""

# Existing TLS resources. Keep the issuer and CA ConfigMap aligned with the
# source deployment's trusted CA.
export CERT_MANAGER_NAMESPACE="cert-manager"
export MDB_TLS_CERT_SECRET_PREFIX="certs"
export MDB_TLS_CA_CONFIGMAP="${MDB_EXTERNAL_CLUSTER_NAME}-ca"
export MDB_TLS_CA_ISSUER="my-ca-issuer"

# MongoDB Search configuration.
export MDB_MONGOT_REPLICAS_PER_CLUSTER=1
# Managed Envoy port (operator default; do not change).
export ENVOY_PROXY_PORT="27028"
export MDB_PROXY_HOST_0="${MDB_SEARCH_RESOURCE_NAME}-search-0-proxy-svc.${MDB_NS}.svc.cluster.local:${ENVOY_PROXY_PORT}"

# Existing replica-set member endpoints reachable from the Kubernetes clusters.
export MDB_EXTERNAL_HOST_0_0="<cluster-0 member-0 host:27017>"
export MDB_EXTERNAL_HOST_0_1="<cluster-0 member-1 host:27017>"
export MDB_EXTERNAL_HOST_1_0="<cluster-1 member-0 host:27017>"
export MDB_EXTERNAL_HOST_1_1="<cluster-1 member-1 host:27017>"

# Optional sample query flow. The user must be able to restore data and manage
# Search indexes in sample_mflix.
export MDB_CONNECTION_STRING="<MongoDB connection string>"
