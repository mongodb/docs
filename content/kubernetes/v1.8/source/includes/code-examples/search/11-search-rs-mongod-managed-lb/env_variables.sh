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

# Name for the operator-managed MongoDB replica set and MongoDBSearch resource
# (same name for both -- operator infers the reference)
export MDB_RESOURCE_NAME="mdb-rs"

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
# REPLICA SET TOPOLOGY
# ============================================================================

export MDB_RS_MEMBERS=3

# ============================================================================
# SEARCH CONFIGURATION
# ============================================================================
export MDB_MONGOT_REPLICAS=2

# ============================================================================
# DERIVED VALUES (computed from topology + search config above)
# ============================================================================

# Envoy proxy port (operator default)
ENVOY_PROXY_PORT="27028"

# Proxy service name (operator-derived, do not change)
export MDB_PROXY_HOST="${MDB_RESOURCE_NAME}-search-0-proxy-svc.${MDB_NS}.svc.cluster.local:${ENVOY_PROXY_PORT}"

# RS member hosts (operator naming convention)
export MDB_RS_HOST_0="${MDB_RESOURCE_NAME}-0.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local:27017"
export MDB_RS_HOST_1="${MDB_RESOURCE_NAME}-1.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local:27017"
export MDB_RS_HOST_2="${MDB_RESOURCE_NAME}-2.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local:27017"

# Connection strings (built from RS member hosts)
export MDB_ADMIN_CONNECTION_STRING="mongodb://mdb-admin:${MDB_ADMIN_USER_PASSWORD}@${MDB_RS_HOST_0},${MDB_RS_HOST_1},${MDB_RS_HOST_2}/?replicaSet=${MDB_RESOURCE_NAME}&tls=true&tlsCAFile=/tls/ca-pem&authSource=admin&authMechanism=SCRAM-SHA-256"
export MDB_USER_CONNECTION_STRING="mongodb://mdb-user:${MDB_USER_PASSWORD}@${MDB_RS_HOST_0},${MDB_RS_HOST_1},${MDB_RS_HOST_2}/?replicaSet=${MDB_RESOURCE_NAME}&tls=true&tlsCAFile=/tls/ca-pem&authSource=admin&authMechanism=SCRAM-SHA-256"
