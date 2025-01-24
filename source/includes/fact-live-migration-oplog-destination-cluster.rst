- Live migration performs embedded verification by default, which requires a
  large oplog size on the destination {+cluster+}. This prevents the
  verification process errors due to a constrained oplog size.

  - If storage auto-scaling is disabled on the destination {+cluster+},
    :ref:`increase the oplog size <set-oplog-size>` on the destination
    {+cluster+} to a high enough fixed value.

  - If storage :ref:`auto-scaling <cluster-autoscaling>` is enabled on the
    destination {+cluster+}, :ref:`set high enough minimum oplog window <set-oplog-min-window>`
    on the destination {+cluster+}.

  If you can't allocate a large enough oplog size or increase a minimum
  oplog window on the destination {+cluster+}, disable
  the :guilabel:`Verify data post-migration (recommended)` switch in the
  live migration UI and use one of the live migration verification
  methods described in |c2c-verification|.
