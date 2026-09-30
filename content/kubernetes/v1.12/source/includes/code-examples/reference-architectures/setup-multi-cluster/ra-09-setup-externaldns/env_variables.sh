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

suffix_short="${K8S_CLUSTER_SUFFIX}"
# Ensure suffix_short is no longer than 19 characters to make GKE identifiers fit under 30 characters
if [[ -n "${suffix_short}" && ${#suffix_short} -gt 19 ]]; then
    # Calculate positions for cutting from the middle
    prefix_len=$(((19 - 1) / 2))  # -1 for the 'x' replacement
    suffix_start=$((${#suffix_short} - prefix_len))
    # Create the truncated version with 'x' in the middle
    suffix_short="${suffix_short:0:${prefix_len}}x${suffix_short:${suffix_start}}"
fi

export DNS_SA_NAME="ext-dns-sa${suffix_short}"
export DNS_SA_EMAIL="${DNS_SA_NAME}@${MDB_GKE_PROJECT}.iam.gserviceaccount.com"

export CUSTOM_DOMAIN="mongodb.custom"
export DNS_ZONE="mongodb${suffix_short}"
