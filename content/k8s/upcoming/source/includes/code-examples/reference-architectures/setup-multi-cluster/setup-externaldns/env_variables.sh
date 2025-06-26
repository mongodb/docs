# This script builds on top of the environment configured in the setup guides.
# It depends (uses) the following env variables defined there to work correctly.
# If you don't use the setup guide to bootstrap the environment, then define them here.
#  ${K8S_CLUSTER_0}
#  ${K8S_CLUSTER_1}
#  ${K8S_CLUSTER_2}
#  ${K8S_CLUSTER_0_ZONE}
#  ${K8S_CLUSTER_1_ZONE}
#  ${K8S_CLUSTER_2_ZONE}
#  ${K8S_CLUSTER_0_CONTEXT_NAME}
#  ${K8S_CLUSTER_1_CONTEXT_NAME}
#  ${K8S_CLUSTER_2_CONTEXT_NAME}
#  ${MDB_GKE_PROJECT}

export DNS_SA_NAME="external-dns-sa"
export DNS_SA_EMAIL="${DNS_SA_NAME}@${MDB_GKE_PROJECT}.iam.gserviceaccount.com"

export CUSTOM_DOMAIN="mongodb.custom"
export DNS_ZONE="mongodb"
