- The live migration process may not be able to keep up with a source
  {+cluster+} whose write workload is greater than what can be transferred
  and applied to the destination cluster. You may need to scale up the
  destination {+cluster+} to a tier with more processing power, bandwidth,
  or disk IO.

  To maximize migration performance, use a higher instance size and disk
  configuration on the destination {+cluster+}:

  - :ref:`Scale up <scale-cluster-open-dialog>` the destination {+cluster+}
    to a tier with more processing power, bandwidth or disk IO.

  - When migrating large data sets, use M80 with 6000 IOPS disks or higher.

  - Set the minimum oplog window to 2-4 hours for the duration of the live
    migration process.

  - To learn more, see :ref:`scale-cluster-open-dialog`
    and :ref:`cluster-config-options`.
