The following considerations apply to the :guilabel:`Analytics Tier` 
tab and analytic nodes:

.. important:: 

   If you select a {+cluster+} tier on the :guilabel:`Analytics Tier` 
   tab significantly below the {+cluster+} tier selected on the
   :guilabel:`Base Tier` tab, :manual:`replication lag 
   </tutorial/troubleshoot-replica-sets/#check-the-replication-lag>` 
   might result. The analytics node might fall off the :term:`oplog` 
   altogether.

- Currently, if a {+cluster+} has an analytics node with a different 
  {+cluster+} tier, compute auto-scaling isn't available for the 
  {+cluster+}. We will introduce this functionality in a future release.

- Disk size and IOPS must remain the same across all node 
  types.

- Storage size must match between the :guilabel:`Base Tier` tab and 
  :guilabel:`Analytics Tier` tab. You can set the storage size on the 
  :guilabel:`Base Tier` tab.

- If you want to select the :guilabel:`Local NVME SSD` class on the 
  :guilabel:`Base Tier` tab, the :guilabel:`Analytics Tier` tab
  must have the same tier level selected.

- If a {+cluster+} tier appears grayed out, the {+cluster+} tier isn't 
  compatible with the disk size of the {+cluster+} or the 
  :guilabel:`Local NVME SSD` class.

- A {+cluster+} tier selected on the :guilabel:`Analytics Tier` tab is
  priced the same as a {+cluster+} tier selected on the 
  :guilabel:`Base Tier` tab. However, when an 
  :guilabel:`Analytics Tier` is higher or lower than the 
  :guilabel:`Base Tier`, the price adjusts accordingly on a 
  prorated per-node basis. The pricing appears in the {+atlas-ui+} when 
  you create or edit a {+cluster+}. To learn more, see, 
  :ref:`atlas-billing`.
