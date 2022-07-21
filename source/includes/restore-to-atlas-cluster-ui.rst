1. Click :guilabel:`Restore` in the :guilabel:`Actions` column
   for the snapshot you want to restore.

#. From the :guilabel:`Restore` dialog, select the target cluster to
   which you want to restore.

   .. note::

      To optimize performance and reduce the amount of time it takes to
      restore, use these tips:

      - Select a target cluster that isn't a global, multi-region, or
        multi-cloud cluster.
      - Select a target cluster that belongs to the same |service|
        project and the same cloud provider region as the snapshot.
      - Select a cluster tier with the same storage capacity as the
        capacity of the original volume used by the source cluster.
      - If the target cluster runs on |aws| with configured |iops|,
        select the configured |iops| to fall within the valid range.
      - Select a tier that hasn't been configured to use |nvme| storage.
        The tier can support |nvme| storage, but if you enable |nvme|,
        restore performance degrades.

#. Click :guilabel:`Restore`.

#. Restart your application and ensure it uses the new target cluster.