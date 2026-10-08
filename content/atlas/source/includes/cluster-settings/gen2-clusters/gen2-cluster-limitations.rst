Before using {+gen-2-clusters-short+}, consider the following
limitations. You can also
:ref:`Compare Gen1 and Gen2 Clusters <compare-cluster-generations>`.

- {+gen-2-clusters-short+} are available only on |aws| and |gcp|.
  {+gen-2-clusters+} are not available on |azure|.
- Multi-cloud support is not available for {+gen-2-clusters+}.
- Not all cloud provider regions support {+gen-2-clusters+}. To learn more,
  see:

  - :ref:`AWS Gen2 Supported Regions <aws-reference-gen2-regions>`
  - :ref:`GCP Gen2 Supported Regions <gcp-reference-gen2-regions>`

- Cross-region support is available only if all regions in which you
  deploy your cluster support Gen2 clusters on your chosen cloud provider.
- On {+atlas-core-cluster+}s and {+atlas-infinite-cluster+}s, ``M10``
  and ``M20`` clusters are generation-agnostic. You don't select a
  :term:`cluster generation` when you deploy an ``M10`` or ``M20``
  cluster.
- All nodes within a cluster must be of the same generation. You
  can't mix Gen1 and Gen2 nodes within the same cluster.
- When you update a cluster with the :oas-atlas-op:`Update One Cluster
  in One Project </updateGroupCluster>` endpoint, specify an
  ``instanceSize`` that matches the cluster's intended generation. For
  example, ``M200`` is Gen1, while ``M200_GEN_2`` is Gen2. If you
  specify a Gen1 value for an existing Gen2 cluster, you might
  unintentionally change the cluster's generation. To keep the cluster
  on Gen2, specify the corresponding ``_GEN_2`` instance size, such as
  ``M200_GEN_2``.
- {+gen-2-clusters-short+} support only reactive auto-scaling, not predictive
  auto-scaling. To learn more, see :ref:`Scaling a Gen2 Dedicated Cluster
  <reactive-autoscaling-gen2-cluster>`.
