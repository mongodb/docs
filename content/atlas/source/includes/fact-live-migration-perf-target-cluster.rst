- The destination {+cluster+} in |service| must match or exceed the source
  deployment in terms of RAM, CPU, and storage. Provision a destination
  {+cluster+} of an adequate size so that it can accommodate both the
  migration process and the expected workload, or :ref:`scale up <scale-cluster-open-dialog>`
  the destination {+cluster+} to a tier with more processing power, bandwidth or disk IO.

- To maximize migration performance, use at least an M40 {+cluster+} for the
  destination {+cluster+}. When migrating large data sets, use an M80 
  {+cluster+} with 6000 IOPS disks or higher.

  You can also choose to temporarily increase the destination |service|
  {+cluster+}'s size for the duration of the migration process.

  After you migrate your application's workload to a {+cluster+} in |service|,
  :ref:`contact support <request-support>` for assistance with further
  performance tuning and sizing of your destination {+cluster+} to minimize costs.

- To avoid unexpected sizing changes, disable auto-scaling on the destination
  {+cluster+}. To learn more, see :ref:`manage-clusters`.

- To prevent unbounded oplog collection growth, and to ensure that
  the live migration's lag window stays within the bounds of the oplog
  replication lag window, :ref:`set an oplog size to a large enough fixed value <set-fixed-oplog-size>`
  for the duration of the live migration process.

  To learn more, see:

  - :ref:`Scale a Cluster <scale-cluster-open-dialog>`
  - :ref:`cluster-config-options`
  - |mongosync-oplog-sizing| in the |mongosync| documentation.

  If you are observing performance issues even after you've followed these
  recommendations, :ref:`contact support <request-support>`.
