# This script builds on top of the environment configured in the setup guides.
# It depends (uses) the following env variables defined there to work correctly.
# If you don't use the setup guide to bootstrap the environment, then define them here.
#  ${K8S_CLUSTER_0_CONTEXT_NAME}
#  ${K8S_CLUSTER_1_CONTEXT_NAME}
#  ${K8S_CLUSTER_2_CONTEXT_NAME}
#  ${MDB_NAMESPACE}
#  ${CUSTOM_DOMAIN}

export SC_RESOURCE_NAME=mdb-sh
export MONGODB_VERSION="8.0.5-ent"

export MDB_CLUSTER_0_EXTERNAL_DOMAIN="${K8S_CLUSTER_0}.${CUSTOM_DOMAIN}"
export MDB_CLUSTER_1_EXTERNAL_DOMAIN="${K8S_CLUSTER_1}.${CUSTOM_DOMAIN}"
export MDB_CLUSTER_2_EXTERNAL_DOMAIN="${K8S_CLUSTER_2}.${CUSTOM_DOMAIN}"
