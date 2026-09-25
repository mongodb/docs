.. Shared by cluster-autoscaling-compute-core.txt and
.. cluster-autoscaling-compute-infinite.txt. Anything changed here
.. publishes on both edition pages. Edition-specific text belongs on
.. the pages, not here.

The following statements describe how predictive auto-scaling works:

- |service| attempts to scale up your cluster instance size **before** the forecasted load arrives.

- When |service| scales your cluster predictively based on forecasted metrics,
  it can scale up by at most two tiers at a time.

- Predictive auto-scaling applies only to compute, not storage.

- Predictive auto-scaling respects existing auto-scaling minimum and maximum instance sizes.

- In cases when |service| can't use predictive auto-scaling to scale up the cluster,
  it falls back to using reactive auto-scaling.

- Predictive auto-scaling only supports upscaling. There is no predictive down-scaling.
  |service| uses reactive auto-scaling to automatically scale down the cluster
  when the workload decreases.

- If predictive up-scaling is scheduled to happen within the next 1 hour,
  |service| skips reactive down-scaling.
