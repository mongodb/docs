The oplog also affects auto-scaling differently on each edition:

- On an {+atlas-core-cluster+}, |service| delays an auto-scaling
  event until the oplog window covers the estimated scaling time. To
  keep the window from blocking scaling, :ref:`set the minimum oplog
  retention window <set-oplog-min-window>`.

- On an {+atlas-infinite-cluster+}, the :ref:`minimum oplog retention
  window <set-oplog-min-window>` doesn't affect auto-scaling. To
  learn more, see :ref:`atlas-infinite-oplog`.
