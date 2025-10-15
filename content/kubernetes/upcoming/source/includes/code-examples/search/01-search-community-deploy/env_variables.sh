# set it to the context name of the k8s cluster
export K8S_CTX="<local cluster context>"

# the following namespace will be created if not exists
export MDB_NS="mongodb"

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

export MDB_CONNECTION_STRING="mongodb://mdb-user:${MDB_USER_PASSWORD}@mdbc-rs-0.mdbc-rs-svc.${MDB_NS}.svc.cluster.local:27017/?replicaSet=mdbc-rs"
