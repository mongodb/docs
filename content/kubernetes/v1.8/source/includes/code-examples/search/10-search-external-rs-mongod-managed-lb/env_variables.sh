# ============================================================================
# KUBERNETES CONFIGURATION
# ============================================================================

# Your Kubernetes context name (run: kubectl config get-contexts)
export K8S_CTX="<local cluster context>"

# Namespace where MongoDB Search will be deployed
export MDB_NS="mongodb"

# ============================================================================
# CLUSTER NAMING
# ============================================================================

# Name for the external MongoDB replica set
export MDB_EXTERNAL_CLUSTER_NAME="ext-mdb-rs"

# MongoDB Search resource name (different from MDB name since it's "external")
export MDB_SEARCH_RESOURCE_NAME="ext-rs"

# ============================================================================
# REPLICA SET CONFIGURATION
# ============================================================================

# Number of replica set members
export MDB_RS_MEMBERS=3

# Number of mongot replicas (for high availability)
# The operator deploys this many mongot pods, all fronted by Envoy
export MDB_MONGOT_REPLICAS=2

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

export MDB_TLS_ENABLED="true"
export MDB_TLS_CERT_SECRET_PREFIX="certs"
export MDB_TLS_CA_CONFIGMAP="${MDB_EXTERNAL_CLUSTER_NAME}-ca"

export CERT_MANAGER_NAMESPACE="cert-manager"
export MDB_TLS_SELF_SIGNED_ISSUER="selfsigned-bootstrap-issuer"
export MDB_TLS_CA_CERT_NAME="my-selfsigned-ca"
export MDB_TLS_CA_SECRET_NAME="root-secret"
export MDB_TLS_CA_ISSUER="my-ca-issuer"

# ============================================================================
# EXTERNAL CLUSTER RESOURCE NAMES
# ============================================================================
# These names identify the components of the external MongoDB replica set.
# Default values match the Kubernetes operator naming convention.
# Override them when pointing at a real external cluster.

# External RS member host:port entries
export MDB_EXTERNAL_HOST_0="${MDB_EXTERNAL_CLUSTER_NAME}-0.${MDB_EXTERNAL_CLUSTER_NAME}-svc.${MDB_NS}.svc.cluster.local:27017"
export MDB_EXTERNAL_HOST_1="${MDB_EXTERNAL_CLUSTER_NAME}-1.${MDB_EXTERNAL_CLUSTER_NAME}-svc.${MDB_NS}.svc.cluster.local:27017"
export MDB_EXTERNAL_HOST_2="${MDB_EXTERNAL_CLUSTER_NAME}-2.${MDB_EXTERNAL_CLUSTER_NAME}-svc.${MDB_NS}.svc.cluster.local:27017"

# ============================================================================
# ENVOY PROXY CONFIGURATION (Managed by Operator)
# ============================================================================

# Port where Envoy listens for mongod connections (operator default)
export ENVOY_PROXY_PORT="27028"

# Managed LB proxy host -- stable proxy service for the RS topology
export MDB_PROXY_HOST="${MDB_SEARCH_RESOURCE_NAME}-search-0-proxy-svc.${MDB_NS}.svc.cluster.local:${ENVOY_PROXY_PORT}"

# NOTE: Unlike unmanaged mode, you do NOT need to specify:
# - ENVOY_IMAGE (operator uses its default)
# - Envoy ConfigMap or Deployment YAML
# - Proxy Services
# The operator handles all of this automatically!

# ============================================================================
# CONNECTION STRING
# ============================================================================

# Connection string for the replica set with TLS
export MDB_CONNECTION_STRING="mongodb://mdb-user:${MDB_USER_PASSWORD}@${MDB_EXTERNAL_HOST_0},${MDB_EXTERNAL_HOST_1},${MDB_EXTERNAL_HOST_2}/?replicaSet=${MDB_EXTERNAL_CLUSTER_NAME}&tls=true&tlsCAFile=/tls/ca-pem"
