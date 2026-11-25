If you are deploying an |onprem| resource on a |multi-cluster|, run:

.. code-block:: sh

    kubectl apply \
      --context "$MDB_CENTRAL_CLUSTER_FULL_NAME" \
      --namespace "mongodb" 
       -f https://raw.githubusercontent.com/mongodb/mongodb-kubernetes/{+dl-version+}/public/samples/ops-manager/ops-manager-external.yaml
