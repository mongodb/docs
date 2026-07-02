# GCP project name - this is the only parameter that is mandatory to change here
export MDB_GKE_PROJECT="${MDB_GKE_PROJECT:="### Set your GKE project name here ###"}"

# Adjust the values for each Kubernetes cluster in your deployment.
# The deployment script references the following variables to get values for each cluster.
export K8S_CLUSTER_0="k8s-mdb-0${K8S_CLUSTER_SUFFIX:-""}"
export K8S_CLUSTER_0_ZONE="europe-central2-a"
export K8S_CLUSTER_0_NUMBER_OF_NODES=3
export K8S_CLUSTER_0_MACHINE_TYPE="e2-standard-4"
export K8S_CLUSTER_0_CONTEXT_NAME="gke_${MDB_GKE_PROJECT}_${K8S_CLUSTER_0_ZONE}_${K8S_CLUSTER_0}"

export K8S_CLUSTER_1="k8s-mdb-1${K8S_CLUSTER_SUFFIX:-""}"
export K8S_CLUSTER_1_ZONE="europe-central2-b"
export K8S_CLUSTER_1_NUMBER_OF_NODES=3
export K8S_CLUSTER_1_MACHINE_TYPE="e2-standard-4"
export K8S_CLUSTER_1_CONTEXT_NAME="gke_${MDB_GKE_PROJECT}_${K8S_CLUSTER_1_ZONE}_${K8S_CLUSTER_1}"

export K8S_CLUSTER_2="k8s-mdb-2${K8S_CLUSTER_SUFFIX:-""}"
export K8S_CLUSTER_2_ZONE="europe-central2-c"
export K8S_CLUSTER_2_NUMBER_OF_NODES=1
export K8S_CLUSTER_2_MACHINE_TYPE="e2-standard-4"
export K8S_CLUSTER_2_CONTEXT_NAME="gke_${MDB_GKE_PROJECT}_${K8S_CLUSTER_2_ZONE}_${K8S_CLUSTER_2}"

# Comment out the following line so that the script does not create preemptible nodes.
# DO NOT USE preemptible nodes in production.
export GKE_SPOT_INSTANCES_SWITCH="--preemptible"
