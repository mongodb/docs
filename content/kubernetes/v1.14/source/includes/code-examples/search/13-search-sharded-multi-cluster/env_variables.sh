# Kubernetes contexts for the two member clusters. Cluster 0 is also the
# central cluster where the operator and MongoDBSearch resource run.
export K8S_CTX_0="<central/member-0 cluster context>"
export K8S_CTX_1="<member-1 cluster context>"
export MDB_NS="mongodb"

# Existing external sharded cluster and the MongoDBSearch resource to create.
export MDB_EXTERNAL_CLUSTER_NAME="mdb-mc-sh"
export MDB_SEARCH_RESOURCE_NAME="ext-sh"

# Existing shard replica-set names. Change these defaults when your deployment
# uses different names.
export MDB_EXTERNAL_SHARD_0_NAME="${MDB_EXTERNAL_CLUSTER_NAME}-0"
export MDB_EXTERNAL_SHARD_1_NAME="${MDB_EXTERNAL_CLUSTER_NAME}-1"
export MDB_EXTERNAL_SHARD_2_NAME="${MDB_EXTERNAL_CLUSTER_NAME}-2"

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
export MDB_PROXY_HOST_SHARD_0="${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_0_NAME}-proxy-svc.${MDB_NS}.svc.cluster.local:${ENVOY_PROXY_PORT}"
export MDB_PROXY_HOST_SHARD_1="${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_1_NAME}-proxy-svc.${MDB_NS}.svc.cluster.local:${ENVOY_PROXY_PORT}"
export MDB_PROXY_HOST_SHARD_2="${MDB_SEARCH_RESOURCE_NAME}-search-0-${MDB_EXTERNAL_SHARD_2_NAME}-proxy-svc.${MDB_NS}.svc.cluster.local:${ENVOY_PROXY_PORT}"

# Existing mongos and shard endpoints reachable from the Kubernetes clusters.
export MDB_EXTERNAL_MONGOS_HOST_0="<cluster-0 mongos host:27017>"
export MDB_EXTERNAL_MONGOS_HOST_1="<cluster-1 mongos host:27017>"
export MDB_EXTERNAL_SHARD_0_HOST_CL0="<cluster-0 shard-0 host:27017>"
export MDB_EXTERNAL_SHARD_0_HOST_CL1="<cluster-1 shard-0 host:27017>"
export MDB_EXTERNAL_SHARD_1_HOST_CL0="<cluster-0 shard-1 host:27017>"
export MDB_EXTERNAL_SHARD_1_HOST_CL1="<cluster-1 shard-1 host:27017>"
export MDB_EXTERNAL_SHARD_2_HOST_CL0="<cluster-0 shard-2 host:27017>"
export MDB_EXTERNAL_SHARD_2_HOST_CL1="<cluster-1 shard-2 host:27017>"

# Optional sample query flow. The admin connection must be able to restore and
# shard sample_mflix; the user connection must be able to manage Search indexes
# and run queries in that database.
export MDB_ADMIN_CONNECTION_STRING="<MongoDB admin connection string>"
export MDB_USER_CONNECTION_STRING="<MongoDB user connection string>"
