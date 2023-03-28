If you are deploying an |onprem| resource on a |multi-cluster|:

- Set the ``context`` to the name of the central cluster, such as:
  ``kubectl config set context "$MDB_CENTRAL_CLUSTER_FULL_NAME"``.

- Set the ``--namespace`` to the same :ref:`scope <mc-namespace-scope-ref>`
  that you used for your |multi-cluster|, such as: ``kubectl config --namespace "mongodb"``.

