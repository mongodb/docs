# This script builds on top of the environment configured in the setup guides.
# It depends (uses) the following env variables defined there to work correctly.
# If you don't use the setup guide to bootstrap the environment, then define them here.
#  ${OM_NAMESPACE}
#  ${S3_ENDPOINT}
#  ${S3_ACCESS_KEY}
#  ${S3_SECRET_KEY}
#  ${S3_OPLOG_BUCKET_NAME}
#  ${S3_SNAPSHOT_BUCKET_NAME}

export RUSTFS_NAMESPACE="${RUSTFS_NAMESPACE:-rustfs}"
