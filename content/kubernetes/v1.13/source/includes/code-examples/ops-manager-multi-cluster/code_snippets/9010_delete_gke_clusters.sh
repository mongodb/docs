yes | gcloud container clusters delete "${K8S_CLUSTER_0}" --zone="${K8S_CLUSTER_0_ZONE}" &
yes | gcloud container clusters delete "${K8S_CLUSTER_1}" --zone="${K8S_CLUSTER_1_ZONE}" &
yes | gcloud container clusters delete "${K8S_CLUSTER_2}" --zone="${K8S_CLUSTER_2_ZONE}" &
wait
