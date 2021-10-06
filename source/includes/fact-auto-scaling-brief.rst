Cluster tiers ``M10`` and greater support :ref:`Cluster Auto-Scaling
<cluster-autoscaling>`. Cluster tier Auto-scaling is enabled by default
when you create new clusters in the user interface. It is disabled by
defaut if you create new clusters in the API. With auto-scaling enabled,
|service| automatically scales your cluster tier, storage capacity, or
both in response to cluster usage. Auto-scaling allows your cluster to
adapt to your current workload and reduce the need to make manual
optimizations.

- :ref:`Cluster storage scaling <howitworks-scale-cluster-storage>`
  automatically increases your cluster storage capacity when 90% of disk
  capacity is used. This setting is enabled by default to help ensure that
  your cluster can always support sudden influxes of data. To opt out of
  cluster storage scaling, un-check the :guilabel:`Storage Scaling`
  checkbox in the :guilabel:`Auto-scale` section.

- :ref:`Cluster tier scaling <howitworks-scale-cluster-tier>`
  automatically scales your cluster tier up or down in response to
  various cluster metrics. To opt out of cluster tier auto-scaling,
  un-check the :guilabel:`Cluster Tier Scaling` checkbox in the
  :guilabel:`Auto-scale` section.

  To control how |service| should auto-scale your cluster, you set:

  - The maximum cluster tier to which your cluster can automatically
    scale up. By default, this setting is set to the next cluster tier
    compared to your current cluster tier.
  - The minimum cluster tier to which your cluster can scale down.
    By default, this setting is set to the current cluster tier.
