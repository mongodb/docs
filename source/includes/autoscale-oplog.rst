|service| manages the {+cluster+}'s :manual:`oplog size </core/replica-set-oplog/#oplog-size>`
and its entries differently, depending on whether :ref:`storage auto-scaling <howitworks-scale-cluster-storage>`
is enabled for the {+cluster+}.

- |service| enables {+cluster+} storage auto-scaling by default. If you
  choose to use storage auto-scaling, |service| manages the oplog entries
  based on the :manual:`minimum oplog retention window (oplogMinRetentionHours) </core/replica-set-oplog/#minimum-oplog-retention-period>`
  setting. The oplog entries are time-stamped. The oplog window is the
  time difference between the newest and the oldest timestamps in the oplog.

  By default, |service| sets the minimum oplog retention window to 24 hours.
  This means that, unless you set the minimum oplog retention window to
  a particular custom value, the |mongod| for the |service| {+cluster+} retains all
  oplog entries for at least 24 hours and until the oplog reaches the maximum
  size that MongoDB best practices permit. 

  You can :ref:`set the minimum oplog retention window <set-oplog-min-window>`
  to a particular value in the |service| UI. For storage auto-scaling to
  complete successfully, |service| requires the :manual:`minimum oplog retention window (oplogMinRetentionHours)
  </core/replica-set-oplog/#minimum-oplog-retention-period>` up to (60 seconds) * (GB of disk space configured).

  If the {+cluster+}'s storage capacity decreases, |service|
  automatically scales the oplog size down to ensure it fits in the
  decreased storage size.

- You can opt out of {+cluster+} storage auto-scaling by un-checking the
  :guilabel:`Storage Scaling` checkbox in the :guilabel:`Auto-scale`
  section. If you opt out of storage auto-scaling, |service| manages
  the oplog size as follows:

  - If you don't specify the oplog size in the UI, |service| sets the oplog
    size to:
    
    - 5% of the disk size when you create a {+cluster+}, for
      :guilabel:`General` and :guilabel:`Low-CPU` {+clusters+}
    - 10% of the disk size for {+clusters+} with :ref:`NVMe storage <nvme-storage>`.

    |service| automatically changes the oplog size if you change the storage size.

  - You may choose to scale up the oplog size when you scale up the
    {+cluster+}'s storage. In this case, manually :ref:`set the oplog size <set-oplog-size>`
    to a particular value when you create a {+cluster+}. As you increase
    the {+cluster+}'s storage, |service| scales the oplog size as follows:

    - For :guilabel:`General` and :guilabel:`Low-CPU` {+clusters+}, the
      oplog size scales up to remain at 5% of the storage capacity, not to
      exceed a certain maximum determined according to MongoDB best practices.

    - For {+clusters+} with NVMe storage, the oplog size scales up to
      remain at 10% of the storage capacity, not to exceed a certain
      maximum determined according to MongoDB best practices.

  - If you scale down the {+cluster+}'s storage, |service| uses the previous oplog-to-disk
    ratio to scale down the oplog proportionately. For example, if you scale 
    from 100 GB to 50 GB with an oplog of 25 GB (ratio of 0.25), the new oplog size 
    would also have a ratio of 0.25, which would make it 12.5 GB. The only exception is if 
    the new oplog size is less than 5% of the storage capacity (or less than 10% for NVMe storage). In that case, |service| uses the higher value for the oplog size, which would be 5% of the storage capacity (10% for NVMe storage). 
