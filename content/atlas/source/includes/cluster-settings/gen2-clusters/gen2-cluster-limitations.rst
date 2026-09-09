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
- ``M10`` and ``M20`` clusters are generation-agnostic. You don't
  select a :term:`cluster generation` when deploying an ``M10`` and
  ``M20`` cluster.
- All nodes within a cluster must be of the same generation. You
  can't mix Gen1 and Gen2 nodes within the same cluster.
- {+gen-2-clusters-short+} support only reactive auto-scaling, not predictive
  auto-scaling. To learn more, see :ref:`Scaling a Gen2 Dedicated Cluster
  <reactive-autoscaling-gen2-cluster>`.
