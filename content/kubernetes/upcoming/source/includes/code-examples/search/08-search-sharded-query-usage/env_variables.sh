# The env vars here are all commented out because this
# snippets module is reusable across different sharded
# MongoDB Search deployments and all the necessary
# variables should be already defined there.
#
# Required env var contract:
#   MDB_ADMIN_CONNECTION_STRING
#     — for import/sharding commands (admin privileges)
#   MDB_USER_CONNECTION_STRING
#     — for search queries (regular user privileges)
#   MDB_CONNECTION_STRING
#     — fallback if the above are not set
#       (e.g., non-sharded usage)
#   K8S_CTX    — Kubernetes context
#   MDB_NS     — Kubernetes namespace
#   MDB_VERSION
#     — MongoDB version (e.g., 8.2.6-ent)
#   MDB_TLS_CA_CONFIGMAP
#     — CA certificate ConfigMap name for tools pod
#       TLS mount

# set it to the context name of the k8s cluster
#export K8S_CTX="<local cluster context>"
# the following namespace will be used to deploy
# mongodb tools pod
#export MDB_NS="mongodb"

# MongoDB version (used for tools pod image)
#export MDB_VERSION="8.2.6-ent"

# admin user connection string (for import and sharding commands)
#export MDB_ADMIN_CONNECTION_STRING="mongodb://mdb-admin:PASSWORD@HOST/?tls=true&tlsCAFile=/tls/ca-pem&authSource=admin&authMechanism=SCRAM-SHA-256"

# regular user connection string (for search queries)
#export MDB_USER_CONNECTION_STRING="mongodb://mdb-user:PASSWORD@HOST/?tls=true&tlsCAFile=/tls/ca-pem&authSource=admin&authMechanism=SCRAM-SHA-256"

# TLS CA ConfigMap mounted in the tools pod at /tls
#export MDB_TLS_CA_CONFIGMAP="ext-mdb-sh-ca"
