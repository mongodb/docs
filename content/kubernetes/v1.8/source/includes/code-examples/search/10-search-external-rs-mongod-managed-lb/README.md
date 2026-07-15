# MongoDB Search with External Replica Set + Managed Envoy LB

Deploy **MongoDB Search** against your **existing external MongoDB replica set** using the operator's **managed Envoy load balancer**.

## Overview

This scenario is for users who already have a MongoDB replica set running outside the operator's management (e.g. on VMs, another Kubernetes cluster, or a self-hosted deployment) and want to add on-prem Search capabilities via the MongoDB Kubernetes Operator.

**Key characteristic — Managed LB mode:** the operator automatically deploys and configures the Envoy proxy. You do **not** need to create Envoy ConfigMaps, Deployments, or Services yourself.

### Traffic Flow

```
External mongod (your cluster)
        │
        ▼
  Envoy L7 Proxy  ← operator-managed, port 27028
        │
        ▼
   mongot pods     ← operator-managed, port 27028
```

## Prerequisites

- A running **MongoDB replica set** (v8.2.0+ Enterprise) accessible from your Kubernetes cluster
- A **search-sync-source** user on the external cluster with appropriate permissions for mongot sync
- **kubectl** configured with access to your target Kubernetes cluster
- **Helm 3** installed
- **Network connectivity** from your Kubernetes cluster to the external MongoDB hosts

## Getting Started

```bash
cd docs/search/10-search-external-rs-mongod-managed-lb

# Edit env_variables.sh to set your Kubernetes context, namespace, external hosts, and TLS settings
vi env_variables.sh

# Source the environment variables
source env_variables.sh
```

To run all steps automatically:

```bash
./test.sh
```

## Step-by-Step Execution

Run these steps in order after sourcing `env_variables.sh`.

### Set Up Kubernetes and the Operator

#### Step 1: Validate Environment Variables

```bash
./code_snippets/10_0040_validate_env.sh
```

#### Step 2: Create Kubernetes Namespace

```bash
./code_snippets/10_0045_create_namespaces.sh
```

#### Step 3: Install the MongoDB Kubernetes Operator

```bash
./code_snippets/10_0100_install_operator.sh
```

### Configure TLS

#### Step 4: Install cert-manager

Required for automated TLS certificate lifecycle. Skipped if already installed.

```bash
./code_snippets/10_0301_install_cert_manager.sh
```

#### Step 5: Configure TLS Prerequisites

Creates the cert-manager bootstrap chain and distributes the CA certificate to the target namespace:

```
Self-Signed ClusterIssuer ──signs──▶ CA Certificate ──stored-in──▶ CA ClusterIssuer ──signs──▶ all other certs
```

The CA is distributed as both a ConfigMap (`ca-pem` key) and a Secret (`ca.crt` key) in the target namespace.

> **Note:** If you already have a CA and cert-manager issuer, skip this step and update `MDB_TLS_CA_ISSUER`, `MDB_TLS_CA_CONFIGMAP`, and `MDB_TLS_CA_SECRET_NAME` to reference your existing resources.

```bash
./code_snippets/10_0302_configure_tls_prerequisites.sh
```

### Deploy MongoDB Search with Managed Envoy LB

#### Step 6: Create mongot TLS Certificates

RS topology uses a single mongot StatefulSet (not per-shard). The certificate covers mongot pods via wildcard DNS and the LB service for SNI routing. The `certsSecretPrefix` field in the CR (`MDB_TLS_CERT_SECRET_PREFIX`) determines how the operator locates these secrets.

```bash
./code_snippets/10_0316a_create_mongot_tls_certificates.sh
```

#### Step 7: Create Load Balancer TLS Certificates

The managed Envoy proxy needs a **server certificate** (for incoming mongod connections) and a **client certificate** (for outgoing mongot connections). Both must be signed by the same CA.

```bash
./code_snippets/10_0316b_create_lb_tls_certificates.sh
```

#### Step 8: Create MongoDBSearch Resource

Applies the MongoDBSearch CR with `loadBalancer.managed: {}` pointing to your external replica set:

```yaml
apiVersion: mongodb.com/v1
kind: MongoDBSearch
metadata:
  name: ${MDB_SEARCH_RESOURCE_NAME}
spec:
  replicas: ${MDB_MONGOT_REPLICAS}
  source:
    username: search-sync-source
    passwordSecretRef:
      name: ${MDB_SEARCH_RESOURCE_NAME}-search-sync-source-password
      key: password
    external:
      hostAndPorts:
        - "${MDB_EXTERNAL_HOST_0}"
        - "${MDB_EXTERNAL_HOST_1}"
        - "${MDB_EXTERNAL_HOST_2}"
      tls:
        ca:
          name: ${MDB_TLS_CA_SECRET_NAME}
  security:
    tls:
      certsSecretPrefix: ${MDB_TLS_CERT_SECRET_PREFIX}
  loadBalancer:
    managed: {}
```

```bash
./code_snippets/10_0320_create_mongodb_search_resource.sh
```

#### Step 9: Wait for MongoDBSearch

Wait for the MongoDBSearch resource to reach Running phase (up to 10 min).

```bash
./code_snippets/10_0325_wait_for_search_resource.sh
```

### Verify the Deployment

#### Step 10: Verify Envoy Deployment

Checks that the operator created the expected resources:

| Resource | Name Pattern | Purpose |
|----------|-------------|---------|
| Deployment | `{name}-search-lb-0` | Envoy proxy pods |
| ConfigMap | `{name}-search-lb-0-config` | Envoy routing configuration |
| Service | `{name}-search-0-proxy-svc` | Proxy service (port 27028) |
| StatefulSet | `{name}-search` | mongot pods |
| Service | `{name}-search-svc` | Headless service for mongot pods |

```bash
./code_snippets/10_0326_verify_envoy_deployment.sh
```

#### Step 11: Show Running Pods

Shows all pods in the namespace including external MongoDB replica set pods, mongot pods, Envoy proxy pods, and operator pods.

```bash
./code_snippets/10_0330_show_running_pods.sh
```

## Troubleshooting

### MongoDBSearch stuck in Pending

```bash
kubectl describe mongodbsearch ${MDB_SEARCH_RESOURCE_NAME} -n ${MDB_NS}
kubectl logs -l app.kubernetes.io/component=mongot -n ${MDB_NS} --tail=50
```

Common causes:
- Password secret not created for `search-sync-source` user
- TLS certificates not ready (check `kubectl get certificates -n ${MDB_NS}`)
- External MongoDB not reachable from the cluster

### Envoy pods not starting

```bash
kubectl describe deployment ${MDB_SEARCH_RESOURCE_NAME}-search-lb-0 -n ${MDB_NS}
kubectl logs -l app=${MDB_SEARCH_RESOURCE_NAME}-search-lb-0 -n ${MDB_NS}
```

Common causes:
- LB TLS certificates not ready
- Resource limits too restrictive

### mongot cannot connect to external MongoDB

- Verify network connectivity: `kubectl run --rm -it nettest --image=busybox -- nc -zv <host> <port>`
- Check the `search-sync-source` user exists on the external RS with correct permissions
- Verify TLS CA is trusted by both sides

## Cleanup

```bash
kubectl delete namespace "${MDB_NS}" --context "${K8S_CTX}"
```
