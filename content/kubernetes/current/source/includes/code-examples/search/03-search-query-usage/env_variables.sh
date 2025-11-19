# The env vars here are all commented out because this snippets module
# is reusable across different MongoDB deployments and all the necessary variables
# should be already defined there.

# set it to the context name of the k8s cluster
#export K8S_CTX="<local cluster context>"
# the following namespace will be used to deploy mongodb tools pod
#export MDB_NS="mongodb"

# regular user performing restore and search queries on sample mflix database
# the user should be able to restore database using mongorestore
#export MDB_USER_PASSWORD="mdb-user-password-CHANGE-ME"

# name of MongoDB or MongoDBCommunity resource in case it's deployed in the same cluster
# user only for the connection string in MDB_CONNECTION_STRING env var below
#export MDB_RESOURCE_NAME="mdbc-rs"

# TLS-related resources used by the snippets in this module
#export MDB_TLS_CA_SECRET_NAME="${MDB_RESOURCE_NAME}-ca"
#export MDB_TLS_CA_CONFIGMAP="${MDB_RESOURCE_NAME}-ca-configmap"
#export MDB_TLS_SERVER_CERT_SECRET_NAME="${MDB_RESOURCE_NAME}-tls"
#export MDB_SEARCH_TLS_SECRET_NAME="${MDB_RESOURCE_NAME}-search-tls"

# default connection string if MongoDB database is deployed using the operator
#export MDB_CONNECTION_STRING="mongodb://mdb-user:${MDB_USER_PASSWORD}@${MDB_RESOURCE_NAME}-0.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local:27017/?replicaSet=${MDB_RESOURCE_NAME}"
# To enable TLS for the shared snippets, append driver options directly to the connection string, for example:
#export MDB_CONNECTION_STRING="mongodb://mdb-user:${MDB_USER_PASSWORD}@${MDB_RESOURCE_NAME}-0.${MDB_RESOURCE_NAME}-svc.${MDB_NS}.svc.cluster.local:27017/?replicaSet=${MDB_RESOURCE_NAME}&tls=true&tlsCAFile=%2Ftls%2Fca.crt"

