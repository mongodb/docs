- To ensure that the live migration's lag window stays within the bounds
  of the oplog replication lag window, do one of the following actions
  on the source {+cluster+}:

  - :ref:`Increase the minimum oplog window <set-oplog-min-window>`.
    Use this option if storage :ref:`auto-scaling <cluster-autoscaling>`
    is enabled (this is the default) on the source {+cluster+}.
  - :ref:`Increase the fixed oplog size <set-oplog-size>`. Use this option
    if you disable storage auto-scaling on the source {+cluster+}.
