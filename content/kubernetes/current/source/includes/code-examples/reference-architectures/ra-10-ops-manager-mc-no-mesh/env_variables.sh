# This script builds on top of the environment configured in the setup guides.
# It depends (uses) the following env variables defined there to work correctly.
# If you don't use the setup guide to bootstrap the environment, then define them here.
#  ${K8S_CLUSTER_0_CONTEXT_NAME}
#  ${K8S_CLUSTER_1_CONTEXT_NAME}
#  ${K8S_CLUSTER_2_CONTEXT_NAME}
#  ${OM_NAMESPACE}
#  ${CUSTOM_DOMAIN}
#  ${DNS_ZONE}

export S3_OPLOG_BUCKET_NAME=s3-oplog-store
export S3_SNAPSHOT_BUCKET_NAME=s3-snapshot-store

# If you use your own S3 storage - set the values accordingly.
# By default we install Minio to handle S3 storage and here are set the default credentials.
export S3_ENDPOINT="minio.tenant-tiny.svc.cluster.local"
export S3_ACCESS_KEY="console"
export S3_SECRET_KEY="console123"

export OPS_MANAGER_VERSION="8.0.5"
export APPDB_VERSION="8.0.5-ent"

export OPS_MANAGER_EXTERNAL_DOMAIN="opsmanager.${CUSTOM_DOMAIN}"
export APPDB_CLUSTER_0_EXTERNAL_DOMAIN="${K8S_CLUSTER_0}.${CUSTOM_DOMAIN}"
export APPDB_CLUSTER_1_EXTERNAL_DOMAIN="${K8S_CLUSTER_1}.${CUSTOM_DOMAIN}"
export APPDB_CLUSTER_2_EXTERNAL_DOMAIN="${K8S_CLUSTER_2}.${CUSTOM_DOMAIN}"

# Run-scoped names for project-global GCP load balancer resources (KUBE-268).
# Multiple CI runs share the same GCP project; with fixed global names, one run's
# pre-clean/teardown deletes a concurrent run's load balancer mid-flight.
# Derive the run-specific suffix from ${DNS_ZONE} (set in the ExternalDNS setup
# guide). For docs users there is no run suffix and the names stay unchanged.
lb_suffix="${DNS_ZONE#"mongodb"}"
export OM_FIREWALL_RULE_NAME="fw-ops-manager-hc${lb_suffix}"
export OM_HEALTHCHECK_NAME="om-healthcheck${lb_suffix}"
export OM_BACKEND_SERVICE_NAME="om-backend-service${lb_suffix}"
export OM_URL_MAP_NAME="om-url-map${lb_suffix}"
export OM_LB_PROXY_NAME="om-lb-proxy${lb_suffix}"
export OM_CERTIFICATE_NAME="om-certificate${lb_suffix}"
export OM_FORWARDING_RULE_NAME="om-forwarding-rule${lb_suffix}"

# Retry wrapper for gcloud commands to handle transient GCP API errors
# (ConnectionError, RemoteDisconnected, etc.). Functions are inherited by
# subshells, so this is available inside snippet functions run by sample_test_runner.
gcloud_retry() {
  for attempt in 1 2 3; do
    if gcloud "$@"; then return 0; fi
    if (( attempt < 3 )); then
      echo "gcloud failed (attempt ${attempt}/3), retrying in $((attempt * 5))s..." >&2
      sleep $((attempt * 5))
    fi
  done
  return 1
}
