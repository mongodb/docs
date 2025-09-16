#!/bin/bash

kubectl exec --context "${K8S_CLUSTER_0_CONTEXT_NAME}" -n "${MDB_NAMESPACE}" mongodb-tools-pod -- \
  mongosh --quiet "mongodb://mdb-user:${MDB_USER_PASSWORD}@mdbc-rs-0.mdbc-rs-svc.${MDB_NAMESPACE}.svc.cluster.local:27017/?replicaSet=mdbc-rs" \
    --eval "use sample_mflix" \
    --eval 'db.runCommand({"listSearchIndexes": "movies"});'