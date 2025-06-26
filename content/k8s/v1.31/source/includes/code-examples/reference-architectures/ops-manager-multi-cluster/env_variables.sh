# This script builds on top of the environment configured in the setup guides.
# It depends (uses) the following env variables defined there to work correctly.
# If you don't use the setup guide to bootstrap the environment, then define them here.
#  ${K8S_CLUSTER_0_CONTEXT_NAME}
#  ${K8S_CLUSTER_1_CONTEXT_NAME}
#  ${K8S_CLUSTER_2_CONTEXT_NAME}
#  ${OM_NAMESPACE}

export S3_OPLOG_BUCKET_NAME=s3-oplog-store
export S3_SNAPSHOT_BUCKET_NAME=s3-snapshot-store

# If you use your own S3 storage - set the values accordingly.
# By default we install Minio to handle S3 storage and here are set the default credentials.
export S3_ENDPOINT="minio.tenant-tiny.svc.cluster.local"
export S3_ACCESS_KEY="console"
export S3_SECRET_KEY="console123"

# (Optional) Change the following setting when using the external URL.
# This env variable is used in OpenSSL configuration to generate
# server certificates for Ops Manager Application.
export OPS_MANAGER_EXTERNAL_DOMAIN="om-svc.${OM_NAMESPACE}.svc.cluster.local"

export OPS_MANAGER_VERSION="8.0.0"
export APPDB_VERSION="8.0.3"
