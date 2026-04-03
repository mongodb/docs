gcloud container clusters create "${K8S_CLUSTER_0}" \
      --zone="${K8S_CLUSTER_0_ZONE}" \
      --num-nodes="${K8S_CLUSTER_0_NUMBER_OF_NODES}" \
      --machine-type "${K8S_CLUSTER_0_MACHINE_TYPE}" \
      --tags=mongodb \
      "${GKE_SPOT_INSTANCES_SWITCH:-""}"
