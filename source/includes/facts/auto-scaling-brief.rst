|govcloud| clusters support :ref:`Cluster Auto-Scaling
<cluster-autoscaling>`. When auto-scaling is enabled, |service|
automatically scales your cluster tier, storage capacity, or both in
response to cluster usage. Consider enabling auto-scaling to allow your
cluster to adapt to your current workload and reduce the need to make
manual optimizations.

- :ref:`Cluster storage scaling <howitworks-scale-cluster-storage>`
  automatically increases your cluster storage capacity when 90% of disk
  capacity is used. This setting is on by default to help ensure that
  your cluster can always support sudden influxes of data.

- :ref:`Cluster tier scaling <howitworks-scale-cluster-tier>`
  automatically scales your cluster tier up or down in response to
  various cluster metrics. You must manually opt-in to cluster tier
  scaling.
  
  When you enable cluster tier scaling, you set:
    
  - A maximum cluster tier to which your cluster can automatically
    scale up, and
  - *(Optional)* A minimum tier to which your cluster can scale down.
