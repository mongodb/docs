export MDB_GKE_PROJECT="scratch-kubernetes-team"
#export MDB_GKE_PROJECT={GKE project name}

export NAMESPACE="mongodb"
export OPERATOR_NAMESPACE="mongodb-operator"
export OPERATOR_HELM_CHART=../../../helm_chart

# comma-separated key=value pairs
# export OPERATOR_ADDITIONAL_HELM_VALUES=""

# Adjust the values for each Kubernetes cluster in your deployment.
# The deployment script references the following variables to get values for each cluster.
export K8S_CLUSTER_0="k8s-mdb-0"
export K8S_CLUSTER_0_ZONE="europe-central2-a"
export K8S_CLUSTER_0_NUMBER_OF_NODES=3
export K8S_CLUSTER_0_MACHINE_TYPE="e2-standard-4"
export K8S_CLUSTER_0_CONTEXT_NAME="gke_${MDB_GKE_PROJECT}_${K8S_CLUSTER_0_ZONE}_${K8S_CLUSTER_0}"

export K8S_CLUSTER_1="k8s-mdb-1"
export K8S_CLUSTER_1_ZONE="europe-central2-b"
export K8S_CLUSTER_1_NUMBER_OF_NODES=3
export K8S_CLUSTER_1_MACHINE_TYPE="e2-standard-4"
export K8S_CLUSTER_1_CONTEXT_NAME="gke_${MDB_GKE_PROJECT}_${K8S_CLUSTER_1_ZONE}_${K8S_CLUSTER_1}"

export K8S_CLUSTER_2="k8s-mdb-2"
export K8S_CLUSTER_2_ZONE="europe-central2-c"
export K8S_CLUSTER_2_NUMBER_OF_NODES=1
export K8S_CLUSTER_2_MACHINE_TYPE="e2-standard-4"
export K8S_CLUSTER_2_CONTEXT_NAME="gke_${MDB_GKE_PROJECT}_${K8S_CLUSTER_2_ZONE}_${K8S_CLUSTER_2}"

# Comment out the following line so that the script does not create preemptible nodes.
# DO NOT USE preemptible nodes in production.
export GKE_SPOT_INSTANCES_SWITCH="--preemptible"

export S3_OPLOG_BUCKET_NAME=s3-oplog-store
export S3_SNAPSHOT_BUCKET_NAME=s3-snapshot-store

# minio defaults
export S3_ENDPOINT="minio.tenant-tiny.svc.cluster.local"
export S3_ACCESS_KEY="console"
export S3_SECRET_KEY="console123"

# (Optional) Change the following setting when using the external URL.
export OPS_MANAGER_EXTERNAL_DOMAIN="om-svc.${NAMESPACE}.svc.cluster.local"

export OPS_MANAGER_VERSION="7.0.1"
export APPDB_VERSION="6.0.5-ubi8"


