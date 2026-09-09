# Sharded MongoDB Search — Query Usage

Import data, create search indexes, and run search queries against a **sharded MongoDB cluster with MongoDB Search**.

Run these scripts **after** deploying sharded search infrastructure (e.g., via [`07-search-external-sharded-mongod-managed-lb`](../07-search-external-sharded-mongod-managed-lb/) or [`09-search-sharded-mongod-managed-lb`](../09-search-sharded-mongod-managed-lb/)).

## Prerequisites

Complete one of the sharded search infrastructure guides (07 or 09) before running these scripts. The infrastructure module's `env_variables.sh` exports the required variables:

| Variable | Description |
|----------|-------------|
| `K8S_CTX` | Kubernetes context name |
| `MDB_NS` | Kubernetes namespace |
| `MDB_VERSION` | MongoDB version (e.g., `8.2.0-ent`) |
| `MDB_ADMIN_CONNECTION_STRING` | Admin connection string (for data import and sharding) |
| `MDB_USER_CONNECTION_STRING` | User connection string (for search queries) |
| `MDB_TLS_CA_CONFIGMAP` | CA certificate ConfigMap name (mounted in the tools pod) |

## Getting Started

```bash
cd docs/search/08-search-sharded-query-usage

# Environment variables should already be set from the infrastructure module (07 or 09).
# If running independently, source the appropriate env file:
# source ../07-search-external-sharded-mongod-managed-lb/env_variables.sh
# or
# source ../09-search-sharded-mongod-managed-lb/env_variables.sh
```

To run all steps automatically:

```bash
./test.sh
```

Or follow the steps below to run each snippet individually.

## Step-by-Step Execution

### Deploy a Tools Pod

#### Step 1: Run MongoDB Tools Pod

Deploy a `mongodb-tools` pod with `mongosh` and `mongorestore`, configured with TLS CA certificates for connecting to the cluster.

```bash
./code_snippets/08_0410_run_mongodb_tools_pod.sh
```

### Import Data and Shard the Collection

#### Step 2: Import Sample Data

Import the `sample_mflix` dataset and shard the `movies` collection using a hashed `_id` key.

```bash
./code_snippets/08_0420_import_sample_data.sh
```

### Create Search Indexes

#### Step 3: Create Text Search Index

Create a default text search index on the `movies` collection. Search indexes are created through `mongos` and automatically distributed to each shard's `mongot` instance through the Envoy proxy.

```bash
./code_snippets/08_0430_create_search_index.sh
```

#### Step 4: Create Vector Search Index

Create a vector search index on the `embedded_movies` collection. The `sample_mflix` dataset includes pre-computed embeddings.

```bash
./code_snippets/08_0435_create_vector_search_index.sh
```

#### Step 5: Wait for Search Indexes

Wait for all search indexes to reach READY state (up to 5 min). Polls using `listSearchIndexes` until status is READY.

```bash
./code_snippets/08_0440_wait_for_search_indexes.sh
```

### Run Search Queries

#### Step 6: Execute Text Search Query

Run a text search query against the `movies` collection through `mongos` and display results.

```bash
./code_snippets/08_0450_execute_search_query.sh
```

#### Step 7: Execute Vector Search Query

Run a vector search query against the `embedded_movies` collection. Uses a sample embedding to find similar movies.

```bash
./code_snippets/08_0455_execute_vector_search_query.sh
```
