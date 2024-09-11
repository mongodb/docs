Scaling of {+clusters+} (including :ref:`auto-scaling <cluster-autoscaling>`)
that use the local |nvme| SSD storage option requires an :term:`initial sync`.
|service| |nvme| {+clusters+} auto-scale to the next higher tier when 90%
of the storage space is full. An :term:`initial sync` takes longer to
complete compared to subsequent syncs, and reduces the performance of
the :term:`primary` from which the data is read.