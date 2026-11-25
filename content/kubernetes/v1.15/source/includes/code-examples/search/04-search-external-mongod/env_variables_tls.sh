export MDB_RESOURCE_NAME="mdbc-rs"
export MDB_TLS_CA_SECRET_NAME="${MDB_RESOURCE_NAME}-ca"

export MDB_TLS_CA_CONFIGMAP="${MDB_RESOURCE_NAME}-ca-configmap"
export MDB_TLS_SERVER_CERT_SECRET_NAME="${MDB_RESOURCE_NAME}-tls"

export MDB_TLS_SELF_SIGNED_ISSUER="${MDB_RESOURCE_NAME}-selfsigned-cluster-issuer"
export MDB_TLS_CA_CERT_NAME="${MDB_RESOURCE_NAME}-selfsigned-ca"
export MDB_TLS_CA_ISSUER="${MDB_RESOURCE_NAME}-cluster-issuer"

export CERT_MANAGER_NAMESPACE="cert-manager"
