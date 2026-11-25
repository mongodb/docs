# This script builds on top of the environment configured in the setup guides.
# It depends (uses) the following env variables defined there to work correctly.
# If you don't use the setup guide to bootstrap the environment, then define them here.
#  ${K8S_CLUSTER_0_CONTEXT_NAME}
#  ${K8S_CLUSTER_1_CONTEXT_NAME}
#  ${K8S_CLUSTER_2_CONTEXT_NAME}
#  ${OM_NAMESPACE}

# Defaults for the test RustFS S3 storage.
# If you use your own S3 storage - override any of these.
export S3_OPLOG_BUCKET_NAME="${S3_OPLOG_BUCKET_NAME:-s3-oplog-store}"
export S3_SNAPSHOT_BUCKET_NAME="${S3_SNAPSHOT_BUCKET_NAME:-s3-snapshot-store}"
export S3_ENDPOINT="${S3_ENDPOINT:-rustfs.rustfs.svc.cluster.local}"
export S3_ACCESS_KEY="${S3_ACCESS_KEY:-rustfsadmin}"
export S3_SECRET_KEY="${S3_SECRET_KEY:-rustfsadmin123}"

export OPS_MANAGER_VERSION="8.0.5"
export APPDB_VERSION="8.0.5-ent"
