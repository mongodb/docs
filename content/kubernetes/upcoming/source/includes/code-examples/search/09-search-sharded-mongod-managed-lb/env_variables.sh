# ============================================================================
# KUBERNETES CONFIGURATION
# ============================================================================

# Your Kubernetes context name (run: kubectl config get-contexts)
export K8S_CTX="<local cluster context>"

# Namespace where MongoDB Search and operator-managed cluster will be deployed
export MDB_NS="mongodb"

# ============================================================================
# CLUSTER NAMING
# ============================================================================

# Name for the operator-managed MongoDB sharded cluster and MongoDBSearch resource
# (same name for both — operator infers the reference)
export MDB_RESOURCE_NAME="mdb-sh"

# ============================================================================
# OPS MANAGER / CLOUD MANAGER
# ============================================================================

export OPS_MANAGER_PROJECT_NAME="<arbitrary project name>"
export OPS_MANAGER_API_URL="<SET API URL>"
export OPS_MANAGER_API_USER="<SET API USER>"
export OPS_MANAGER_API_KEY="<SET API KEY>"
export OPS_MANAGER_ORG_ID="<SET ORG ID>"

# ============================================================================
# MONGODB VERSION
# ============================================================================

# Minimum required MongoDB version for Search is 8.2
export MDB_VERSION="8.2.6-ent"

# ============================================================================
# USER CREDENTIALS (change these in production!)
# ============================================================================

export MDB_ADMIN_USER_PASSWORD="admin-user-password-CHANGE-ME"
export MDB_USER_PASSWORD="mdb-user-password-CHANGE-ME"
export MDB_SEARCH_SYNC_USER_PASSWORD="search-sync-user-password-CHANGE-ME"

# ============================================================================
# OPERATOR CONFIGURATION
# ============================================================================

export OPERATOR_HELM_CHART="oci://quay.io/mongodb/helm-charts/mongodb-kubernetes"
export OPERATOR_ADDITIONAL_HELM_VALUES=""

# ============================================================================
# TLS CONFIGURATION
# ============================================================================

export MDB_TLS_CERT_SECRET_PREFIX="certs"
export MDB_TLS_CA_CONFIGMAP="${MDB_RESOURCE_NAME}-ca"

export CERT_MANAGER_NAMESPACE="cert-manager"
export MDB_TLS_SELF_SIGNED_ISSUER="selfsigned-bootstrap-issuer"
export MDB_TLS_CA_CERT_NAME="my-selfsigned-ca"
export MDB_TLS_CA_SECRET_NAME="root-secret"
export MDB_TLS_CA_ISSUER="my-ca-issuer"

# ============================================================================
# SHARDED CLUSTER TOPOLOGY
# ============================================================================

export MDB_SHARD_COUNT=2
export MDB_MONGODS_PER_SHARD=1
export MDB_MONGOS_COUNT=1
export MDB_CONFIG_SERVER_COUNT=2

# Shard names (derived from operator naming convention)
export MDB_SHARD_0_NAME="${MDB_RESOURCE_NAME}-0"
export MDB_SHARD_1_NAME="${MDB_RESOURCE_NAME}-1"

# Mongos router endpoint (operator-managed)
export MDB_MONGOS_HOST="${MDB_RESOURCE_NAME}-mongos-0.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local:27017"

# ============================================================================
# SEARCH CONFIGURATION
# ============================================================================
export MDB_MONGOT_REPLICAS=2

# ============================================================================
# DERIVED VALUES (computed from topology + search config above)
# ============================================================================
# Proxy service names (operator-derived, do not change)
export MDB_PROXY_SVC_SHARD_0="${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_0_NAME}-proxy-svc"
export MDB_PROXY_SVC_SHARD_1="${MDB_RESOURCE_NAME}-search-0-${MDB_SHARD_1_NAME}-proxy-svc"

# Connection strings (built from mongos host)
export MDB_ADMIN_CONNECTION_STRING="mongodb://mdb-admin:${MDB_ADMIN_USER_PASSWORD}@${MDB_MONGOS_HOST}/?tls=true&tlsCAFile=/tls/ca-pem&authSource=admin&authMechanism=SCRAM-SHA-256"
export MDB_USER_CONNECTION_STRING="mongodb://mdb-user:${MDB_USER_PASSWORD}@${MDB_MONGOS_HOST}/?tls=true&tlsCAFile=/tls/ca-pem&authSource=admin&authMechanism=SCRAM-SHA-256"
