# set it to the context name of the k8s cluster
export K8S_CTX="<local cluster context>"

# the following namespace will be created if not exists
export MDB_NS="mongodb"

# MongoDBCommunity resource name referenced throughout the guide
export MDB_RESOURCE_NAME="mdbc-rs"
# Number of replica set members deployed in the sample MongoDBCommunity
export MDB_MEMBERS=3

# TLS-related secret names used for MongoDBCommunity and MongoDBSearch
export MDB_TLS_CA_SECRET_NAME="${MDB_RESOURCE_NAME}-ca"
export MDB_TLS_SERVER_CERT_SECRET_NAME="${MDB_RESOURCE_NAME}-tls"
export MDB_SEARCH_TLS_SECRET_NAME="${MDB_RESOURCE_NAME}-search-tls"

export MDB_TLS_CA_CONFIGMAP="${MDB_RESOURCE_NAME}-ca-configmap"
export MDB_TLS_SELF_SIGNED_ISSUER="${MDB_RESOURCE_NAME}-selfsigned-cluster-issuer"
export MDB_TLS_CA_CERT_NAME="${MDB_RESOURCE_NAME}-selfsigned-ca"
export MDB_TLS_CA_ISSUER="${MDB_RESOURCE_NAME}-cluster-issuer"

# minimum required MongoDB version for running MongoDB Search is 8.2.0
export MDB_VERSION="8.2.0"

# root admin user for convenience, not used here at all in this guide
export MDB_ADMIN_USER_PASSWORD="admin-user-password-CHANGE-ME"
# regular user performing restore and search queries on sample mflix database
export MDB_USER_PASSWORD="mdb-user-password-CHANGE-ME"
# user for MongoDB Search to connect to the replica set to synchronise data from
export MDB_SEARCH_SYNC_USER_PASSWORD="search-sync-user-password-CHANGE-ME"

export OPERATOR_HELM_CHART="mongodb/mongodb-kubernetes"
# comma-separated key=value pairs for additional parameters passed to the helm-chart installing the operator
export OPERATOR_ADDITIONAL_HELM_VALUES=""

# TLS is mandatory; connection string must include tls=true
export MDB_CONNECTION_STRING="mongodb://mdb-user:${MDB_USER_PASSWORD}@${MDB_RESOURCE_NAME}-0.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local:27017/?replicaSet=${MDB_RESOURCE_NAME}&tls=true&tlsCAFile=/tls/ca.crt"

export CERT_MANAGER_NAMESPACE="cert-manager"
