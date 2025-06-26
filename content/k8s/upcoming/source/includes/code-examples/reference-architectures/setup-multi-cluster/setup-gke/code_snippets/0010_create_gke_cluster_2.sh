gcloud container clusters create "${K8S_CLUSTER_2}" \
      --zone="${K8S_CLUSTER_2_ZONE}" \
      --num-nodes="${K8S_CLUSTER_2_NUMBER_OF_NODES}" \
      --machine-type "${K8S_CLUSTER_2_MACHINE_TYPE}" \
      --tags=mongodb \
      "${GKE_SPOT_INSTANCES_SWITCH:-""}"
