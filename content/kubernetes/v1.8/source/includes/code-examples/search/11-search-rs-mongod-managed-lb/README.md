# MongoDB Search with Operator-Managed RS + Managed Envoy LB

This guide walks you through deploying **MongoDB Search** against an **operator-managed MongoDB replica set** (deployed via the MongoDB Enterprise Kubernetes Operator) using the operator's **managed Envoy load balancer**.

The operator deploys a single mongot StatefulSet and a single LB Service for the replica set topology.

## Overview

### What is "Managed Envoy"?

When you set `spec.loadBalancer.managed: {}` in your MongoDBSearch resource, the operator automatically:

1. **Deploys an Envoy proxy** - A Deployment that handles L7 (application layer) load balancing
2. **Generates routing configuration** - Routes traffic to mongot pods
3. **Creates an LB Service** - A single Kubernetes Service for the RS topology
4. **Manages TLS** - Configures mTLS between mongod → Envoy → mongot
5. **Configures mongod** - Automatically sets search parameters on the replica set

You do NOT need to write Envoy configuration, deploy Envoy yourself, create proxy Services manually, or configure mongod search parameters.

### Traffic Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    Kubernetes Cluster                                        │
│                                                                             │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │           Operator-Managed MongoDB Replica Set                     │    │
│  │  ┌─────────┐  ┌─────────┐  ┌─────────┐                            │    │
│  │  │ rs-0    │  │ rs-1    │  │ rs-2    │  (mongod managed by op.)   │    │
│  │  └────┬────┘  └────┬────┘  └────┬────┘                            │    │
│  └───────┼────────────┼────────────┼────────────────────────────────┘    │
│          │            │            │                                       │
│          └────────────┼────────────┘                                       │
│                       │ TLS                                                │
│                       ▼                                                    │
│  ┌────────────────────────────────────────┐                                │
│  │    Envoy Proxy (operator-managed)      │                                │
│  │    • Listens on port 27028             │                                │
│  │    • Single LB Service                 │                                │
│  │    • mTLS to mongot backends           │                                │
│  └────────────────────┬───────────────────┘                                │
│           ┌───────────┴───────────┐                                        │
│           ▼                       ▼                                        │
│  ┌──────────────┐       ┌──────────────┐                                   │
│  │ mongot-0     │       │ mongot-1     │  (Search pods)                    │
│  │ StatefulSet  │       │ StatefulSet  │                                   │
│  └──────────────┘       └──────────────┘                                   │
└─────────────────────────────────────────────────────────────────────────────┘
```

## What You're Responsible For

| Task | Your Responsibility |
|------|---------------------|
| MongoDB replica set CR | ✅ Create the MongoDB CR (operator manages it) |
| MongoDBSearch CR | ✅ Create with `loadBalancer.managed: {}` and `mongodbResourceRef` |
| TLS certificates | ✅ Create certs for mongot and LB |
| Configure mongod search params | ❌ Operator handles this automatically |
| Envoy deployment | ❌ Operator handles this |
| Envoy configuration | ❌ Operator generates this |
| LB Service | ❌ Operator creates this |

## Prerequisites

- Kubernetes cluster with kubectl access
- Helm 3.x installed
- cert-manager installed (for TLS certificates)
- MongoDB Kubernetes Operator installed
- Ops Manager or Cloud Manager access

## Getting Started

```bash
cd docs/search/11-search-rs-mongod-managed-lb

# Edit env_variables.sh to set your Kubernetes context, namespace, and TLS settings
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

Checks that all required environment variables are set and the Kubernetes context exists. Run this first to catch configuration issues early.

```bash
./code_snippets/11_0040_validate_env.sh
```

#### Step 2: Create Kubernetes Namespace

```bash
./code_snippets/11_0045_create_namespaces.sh
```

#### Step 3: Create Image Pull Secrets

Only required if you're using private container registries. For public images, this step is automatically skipped.

```bash
./code_snippets/11_0046_create_image_pull_secrets.sh
```

#### Step 4: Add MongoDB Helm Repository

```bash
./code_snippets/11_0090_helm_add_mongodb_repo.sh
```

#### Step 5: Install the MongoDB Kubernetes Operator

```bash
./code_snippets/11_0100_install_operator.sh
```

#### Step 6: Create Ops Manager Resources

Create Ops Manager project ConfigMap and credentials Secret.

```bash
./code_snippets/11_0300_create_ops_manager_resources.sh
```

### Configure TLS

#### Step 7: Install cert-manager

Installs cert-manager for TLS certificate management. Skipped if already installed.

```bash
./code_snippets/11_0301_install_cert_manager.sh
```

#### Step 8: Configure TLS Prerequisites

Creates the cert-manager bootstrap chain needed before any certificates can be issued:

```
Self-Signed ClusterIssuer ──signs──▶ CA Certificate ──stored-in──▶ CA ClusterIssuer ──signs──▶ all other certs
```

| cert-manager Object | Env Var | Purpose |
|---------------------|---------|---------|
| Self-Signed ClusterIssuer | `MDB_TLS_SELF_SIGNED_ISSUER` | Bootstrap-only issuer; can only sign the CA's own certificate |
| CA Certificate (`isCA: true`) | `MDB_TLS_CA_CERT_NAME` / `MDB_TLS_CA_SECRET_NAME` | The root CA; stored as a Secret in the cert-manager namespace |
| CA ClusterIssuer | `MDB_TLS_CA_ISSUER` | References the CA Secret; all mongot, LB, and mongod certs are signed by this issuer |

```bash
./code_snippets/11_0302_configure_tls_prerequisites.sh
```

#### Step 9: Distribute CA Certificate for mongod

MongoDB Enterprise expects the CA in a ConfigMap (key `ca-pem`). This step extracts the CA from the cert-manager namespace and creates the ConfigMap in the target namespace.

```bash
./code_snippets/11_0302a_configure_tls_prerequisites_mongod.sh
```

#### Step 10: Distribute CA Certificate for mongot

MongoDBSearch expects the CA in a Secret (key `ca.crt`). This step extracts the CA from the cert-manager namespace and creates the Secret in the target namespace.

```bash
./code_snippets/11_0302b_configure_tls_prerequisites_mongot.sh
```

#### Step 11: Generate TLS Certificate for MongoDB RS

Generate a TLS certificate for the operator-managed MongoDB replica set.

```bash
./code_snippets/11_0304_generate_tls_certificates.sh
```

### Deploy the MongoDB Replica Set

#### Step 12: Create MongoDB Replica Set

Creates the operator-managed replica set. The operator automatically configures search parameters when MongoDBSearch is deployed later:

```yaml
apiVersion: mongodb.com/v1
kind: MongoDB
metadata:
  name: ${MDB_RESOURCE_NAME}
spec:
  type: ReplicaSet
  members: 3
```

```bash
./code_snippets/11_0310_create_mongodb_rs.sh
```

#### Step 13: Wait for Replica Set

Wait for the cluster to reach Running phase (up to 15 min).

```bash
./code_snippets/11_0315_wait_for_rs.sh
```

#### Step 14: Create MongoDB Users

Create admin, application, and search-sync-source MongoDB users.

```bash
./code_snippets/11_0316_create_mongodb_users.sh
```

### Deploy MongoDB Search with Managed Envoy LB

#### Step 15: Create mongot TLS Certificate

RS topology uses a single mongot StatefulSet (not per-shard). The certificate covers mongot pods via wildcard DNS and the LB service for SNI routing. The `certsSecretPrefix` field in the CR (`MDB_TLS_CERT_SECRET_PREFIX`) determines how the operator locates this secret — it expects a name like `{prefix}-{resource}-search-cert`.

```bash
./code_snippets/11_0316a_create_mongot_tls_certificates.sh
```

#### Step 16: Create Load Balancer TLS Certificates

The Envoy proxy terminates one mTLS session (from mongod) and initiates another (to mongot), so it needs **two** certificates:

| Certificate | Secret Name Pattern | Purpose |
|-------------|---------------------|---------|
| Server cert | `{prefix}-{name}-search-lb-0-cert` | Presented to mongod during TLS handshake |
| Client cert | `{prefix}-{name}-search-lb-0-client-cert` | Used by Envoy when connecting to mongot |

Both must be signed by the same CA that mongod and mongot trust.

```bash
./code_snippets/11_0316b_create_lb_tls_certificates.sh
```

#### Step 17: Create MongoDBSearch Resource

Applies the MongoDBSearch CR with `loadBalancer.managed: {}` and `mongodbResourceRef` pointing to the MongoDB CR. Unlike the external scenario, no `source.username`, `source.passwordSecretRef`, or `source.external` block is needed — the operator infers everything from the referenced MongoDB CR:

```yaml
apiVersion: mongodb.com/v1
kind: MongoDBSearch
metadata:
  name: ${MDB_RESOURCE_NAME}
spec:
  replicas: ${MDB_MONGOT_REPLICAS}
  source:
    mongodbResourceRef:
      name: ${MDB_RESOURCE_NAME}
  security:
    tls:
      certsSecretPrefix: ${MDB_TLS_CERT_SECRET_PREFIX}
  loadBalancer:
    managed: {}
```

```bash
./code_snippets/11_0320_create_mongodb_search_resource.sh
```

#### Step 18: Wait for MongoDBSearch

Wait for the MongoDBSearch resource to reach Running phase (up to 10 min).

```bash
./code_snippets/11_0325_wait_for_search_resource.sh
```

### Verify the Deployment

#### Step 19: Verify Envoy Deployment

Checks that the operator created the expected resources:

| Resource | Name Pattern | Purpose |
|----------|--------------|---------|
| ConfigMap | `{name}-search-lb-0-config` | Envoy bootstrap configuration |
| Deployment | `{name}-search-lb-0` | Envoy proxy pods |
| Service | `{name}-search-0-proxy-svc` | Proxy service for mongod traffic (port 27028) |
| StatefulSet | `{name}-search` | mongot pods |
| Service (headless) | `{name}-search-svc` | Stable DNS for mongot pods |

```bash
./code_snippets/11_0326_verify_envoy_deployment.sh
```

#### Step 20: Show Running Pods

Shows all pods in the namespace including MongoDB replica set pods, mongot pods, Envoy proxy pods, and operator pods.

```bash
./code_snippets/11_0330_show_running_pods.sh
```

### Next: Import Data and Run Search Queries

Proceed to [`03-search-query-usage`](../03-search-query-usage/) to import data, create search indexes, and run search queries.

### Cleanup (Manual Only)

> **WARNING:** This deletes the namespace and all resources including the MongoDB replica set, MongoDB Search resources, Envoy proxy, and all data.

```bash
./code_snippets/11_9010_delete_namespace.sh
```

## Troubleshooting

### Envoy Pod Not Starting

**Check:**
```bash
kubectl describe deployment ${MDB_RESOURCE_NAME}-search-lb-0 -n ${MDB_NS}
kubectl logs -l app=${MDB_RESOURCE_NAME}-search-lb-0 -n ${MDB_NS}
```

**Common causes:**
- TLS certificate secrets not found - ensure certificates are created first
- ConfigMap not ready - check if `${MDB_RESOURCE_NAME}-search-lb-0-config` exists
- Image pull issues - check image pull secrets

### Search Index Creation Fails

**Check:**
```bash
kubectl get pods -n ${MDB_NS} | grep search
kubectl logs ${MDB_RESOURCE_NAME}-search-0 -n ${MDB_NS}
```

**Common causes:**
- mongot cannot connect to MongoDB (check source credentials)
- TLS CA mismatch between mongod and mongot
- mongot pods not ready yet

### MongoDBSearch Stuck in Pending

**Check:**
```bash
kubectl describe mongodbsearch ${MDB_RESOURCE_NAME} -n ${MDB_NS}
kubectl get events -n ${MDB_NS} --field-selector involvedObject.name=${MDB_RESOURCE_NAME}
```

**Common causes:**
- Referenced MongoDB CR not in Running phase
- TLS certificate secrets missing
- Operator version too old (needs search support)

## Glossary

| Term | Definition |
|------|------------|
| **SNI** | Server Name Indication - TLS extension allowing hostname-based routing |
| **mTLS** | Mutual TLS - Both client and server authenticate via certificates |
| **mongot** | MongoDB Search server that indexes and serves search queries |
| **Envoy** | High-performance L7 proxy used for traffic routing |
