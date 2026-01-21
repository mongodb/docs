To optimize performance and reduce the amount of time it takes to
restore, follow these principles where applicable:

- Select a target cluster that isn't global or multi-cloud.
- Select a multi-region target cluster only if copies of the snapshot
  you plan to restore exist in every region of that cluster.
- Select a target cluster that belongs to the same cloud provider region
  as the snapshot.
- Select a cluster tier with the same storage capacity as the
  capacity of the original volume used by the source cluster.
- If the target cluster runs on |aws| with configured |iops|,
  select the configured |iops| to fall within the configured range.
- Select a target cluster that is not configured to use |nvme| storage.
  |nvme| storage degrades restore performance.
- For {+aws+} source clusters created before March 27, 2024, click the
  :guilabel:`Faster Restore` button in the cluster's `Backup
  <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fsecurity%2Fbackup%2Fclusters>`__
  details in {+atlas-ui+} to enable faster cross-project restores using
  the direct attach restore method. The target cluster must meet all
  conditions listed in this section to use this feature. 
  
  When you activate :guilabel:`Faster Restore`, |service| replaces each
  node in the source cluster one at a time during your next
  :ref:`maintenance window <configure-maintenance-window>`. If the
  maintenance window ends before all nodes are replaced, |service|
  finishes replacing the current node, then waits for the next
  maintenance window to start replacing the next node. Secondary reads
  and analytic nodes are unavailable during the rolling replacement.
  
  Faster cross-project restores are automatically enabled for {+aws+}
  clusters created after March 27, 2024, all {+gcp+} and {+azure+}
  clusters, and all clusters in |cloudgov|. If this feature is enabled
  for your cluster, the :guilabel:`Faster Restore` button doesn't
  appear.

