The following considerations apply to the :guilabel:`Analytics Tier` 
tab and analytic nodes:

.. important:: 

   If you select a {+cluster+} tier on the :guilabel:`Analytics Tier` 
   tab significantly below the {+cluster+} tier selected on the
   :guilabel:`Base Tier` tab, :manual:`replication lag 
   </tutorial/troubleshoot-replica-sets/#check-the-replication-lag>` 
   might result. The analytics node might fall off the :term:`oplog` 
   altogether.

- On {+atlas-core-cluster+}s, if you select a :guilabel:`General`
  {+cluster+} tier on the :guilabel:`Analytics Tier` tab and a
  :guilabel:`Low-CPU` {+cluster+} tier on the :guilabel:`Base Tier`
  tab, disk auto-scaling isn't supported for the {+cluster+}. Disk
  auto-scaling also isn't supported if you select a
  :guilabel:`General` {+cluster+} tier on the :guilabel:`Base Tier`
  tab and a :guilabel:`Low-CPU` {+cluster+} tier on the
  :guilabel:`Analytics Tier` tab.

- On {+atlas-core-cluster+}s, disk size and IOPS must remain the same
  across all node types.

- On {+atlas-core-cluster+}s, storage size must match between the
  :guilabel:`Base Tier` tab and :guilabel:`Analytics Tier` tab. You
  can set the storage size on the :guilabel:`Base Tier` tab.
  {+service+} expands the storage of an {+atlas-infinite-cluster+} as
  your data grows, so you don't set a storage size.

- On {+atlas-core-cluster+}s, if you want to select the
  :guilabel:`Local NVME SSD` class on the :guilabel:`Base Tier` tab,
  the :guilabel:`Analytics Tier` tab must have the same tier level
  selected. {+atlas-infinite-cluster+}s don't support locally attached
  |nvme| |ssd| storage in public preview.

- On {+atlas-core-cluster+}s, if a {+cluster+} tier appears grayed
  out, the {+cluster+} tier isn't compatible with the disk size of the
  {+cluster+} or the :guilabel:`Local NVME SSD` class.

- A {+cluster+} tier selected on the :guilabel:`Analytics Tier` tab is
  priced the same as a {+cluster+} tier selected on the 
  :guilabel:`Base Tier` tab. However, when an 
  :guilabel:`Analytics Tier` is higher or lower than the 
  :guilabel:`Base Tier`, the price adjusts accordingly on a 
  prorated per-node basis. The pricing appears in the {+atlas-ui+} when 
  you create or edit a {+cluster+}. To learn more, see, 
  :ref:`atlas-billing`.
