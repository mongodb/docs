gcloud container clusters create "${K8S_CLUSTER_1}" \
      --zone="${K8S_CLUSTER_1_ZONE}" \
      --num-nodes="${K8S_CLUSTER_1_NUMBER_OF_NODES}" \
      --machine-type "${K8S_CLUSTER_1_MACHINE_TYPE}" \
      "${GKE_SPOT_INSTANCES_SWITCH:-""}"
