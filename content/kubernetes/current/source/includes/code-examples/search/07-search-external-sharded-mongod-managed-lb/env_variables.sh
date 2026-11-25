

# ======================================================================
# KUBERNETES CONFIGURATION
# ======================================================================

# Your Kubernetes context name
# (run: kubectl config get-contexts)
export K8S_CTX="<local cluster context>"

# Namespace for MongoDB Search and the
# external cluster
export MDB_NS="mongodb"

# ======================================================================
# CLUSTER NAMING
# ======================================================================

# MongoDB Search resource name
export MDB_SEARCH_RESOURCE_NAME="ext-sh"

# ======================================================================
# OPS MANAGER / CLOUD MANAGER
# ======================================================================

export OPS_MANAGER_PROJECT_NAME="<arbitrary project name>"
export OPS_MANAGER_API_URL="<SET API URL>"
export OPS_MANAGER_API_USER="<SET API USER>"
export OPS_MANAGER_API_KEY="<SET API KEY>"
export OPS_MANAGER_ORG_ID="<SET ORG ID>"

# ======================================================================
# MONGODB VERSION
# ======================================================================

# Minimum required MongoDB version for Search is 8.3
export MDB_VERSION="8.3.13-ent"

# ======================================================================
# USER CREDENTIALS (change these in production!)
# ======================================================================

export MDB_ADMIN_USER_PASSWORD="admin-user-password-CHANGE-ME"
export MDB_USER_PASSWORD="mdb-user-password-CHANGE-ME"
export MDB_SEARCH_SYNC_USER_PASSWORD="search-sync-user-password-CHANGE-ME"

# ======================================================================
# OPERATOR CONFIGURATION
# ======================================================================

HELM_REPO="oci://quay.io/mongodb/helm-charts"
export OPERATOR_HELM_CHART="${HELM_REPO}/mongodb-kubernetes"
export OPERATOR_ADDITIONAL_HELM_VALUES=""

# ======================================================================
# TLS CONFIGURATION
# ======================================================================

export MDB_TLS_CERT_SECRET_PREFIX="certs"
export MDB_TLS_CA_CONFIGMAP="mongodb-ca"

export CERT_MANAGER_NAMESPACE="cert-manager"
export MDB_TLS_SELF_SIGNED_ISSUER="selfsigned-bootstrap-issuer"
export MDB_TLS_CA_CERT_NAME="my-selfsigned-ca"
export MDB_TLS_CA_SECRET_NAME="root-secret"
export MDB_TLS_CA_ISSUER="my-ca-issuer"

# ======================================================================
# EXTERNAL CLUSTER TOPOLOGY
# ======================================================================

# -- Shard 0 --
export MDB_EXTERNAL_SHARD_0_NAME="<shard-0-name>"
export MDB_EXTERNAL_SHARD_0_HOST="<shard-0-host>:27017"

# -- Shard 1 --
export MDB_EXTERNAL_SHARD_1_NAME="<shard-1-name>"
export MDB_EXTERNAL_SHARD_1_HOST="<shard-1-host>:27017"

# -- Mongos router --
export MDB_EXTERNAL_MONGOS_HOST="<mongos-host>:27017"

# ======================================================================
# SEARCH CONFIGURATION
# ======================================================================
export MDB_MONGOT_REPLICAS=2

# Port where Envoy listens for mongod connections (operator default)
export ENVOY_PROXY_PORT="27028"

# DNS domain your mongod and mongos hosts use to reach Envoy. Replace with
# your own domain whose names point at the Envoy proxy Services (or a load
# balancer in front of them). Envoy routes by TLS SNI on these names.
export MDB_SEARCH_EXTERNAL_DOMAIN="search.example.com"
# Per-shard hostname; the operator replaces {shardName} with each shard name
export MDB_SEARCH_EXTERNAL_HOSTNAME="{shardName}.${MDB_SEARCH_EXTERNAL_DOMAIN}"
# Shard-agnostic hostname for mongos
export MDB_SEARCH_ROUTER_HOSTNAME="router.${MDB_SEARCH_EXTERNAL_DOMAIN}"

# ======================================================================
# DERIVED VALUES (computed from topology + search config)
# ======================================================================
# Proxy service names (operator-derived, do not change). Your external
# hostnames must resolve to these Services.
SEARCH_PFX="${MDB_SEARCH_RESOURCE_NAME}-search-0"
export MDB_PROXY_SVC_SHARD_0="${SEARCH_PFX}-${MDB_EXTERNAL_SHARD_0_NAME}-proxy-svc"
export MDB_PROXY_SVC_SHARD_1="${SEARCH_PFX}-${MDB_EXTERNAL_SHARD_1_NAME}-proxy-svc"
export MDB_PROXY_SVC_ROUTER="${SEARCH_PFX}-proxy-svc"

# mongotHost / searchIndexManagementHostAndPort values for each shard's
# mongod and for mongos
export MDB_PROXY_HOST_SHARD_0="${MDB_EXTERNAL_SHARD_0_NAME}.${MDB_SEARCH_EXTERNAL_DOMAIN}:${ENVOY_PROXY_PORT}"
export MDB_PROXY_HOST_SHARD_1="${MDB_EXTERNAL_SHARD_1_NAME}.${MDB_SEARCH_EXTERNAL_DOMAIN}:${ENVOY_PROXY_PORT}"
export MDB_PROXY_HOST_ROUTER="${MDB_SEARCH_ROUTER_HOSTNAME}:${ENVOY_PROXY_PORT}"

# Connection strings (built from mongos host)
MDB_TLS_OPTS="tls=true&tlsCAFile=/tls/ca-pem"
MDB_AUTH_OPTS="authSource=admin&authMechanism=SCRAM-SHA-256"
MDB_CONN_OPTS="?${MDB_TLS_OPTS}&${MDB_AUTH_OPTS}"

export MDB_ADMIN_CONNECTION_STRING="mongodb://mdb-admin:${MDB_ADMIN_USER_PASSWORD}@${MDB_EXTERNAL_MONGOS_HOST}/${MDB_CONN_OPTS}"
export MDB_USER_CONNECTION_STRING="mongodb://mdb-user:${MDB_USER_PASSWORD}@${MDB_EXTERNAL_MONGOS_HOST}/${MDB_CONN_OPTS}"
