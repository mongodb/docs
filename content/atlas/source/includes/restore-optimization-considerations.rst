To optimize performance and reduce the amount of time it takes to
restore, follow these principles where applicable:

- Select a target cluster that isn't global or multi-cloud.
- Select a multi-region cluster only if copies of the snapshot you plan
  to restore exist in every region of that cluster.
- Select a target cluster that belongs to the same cloud provider region
  as the snapshot.
- Select a cluster tier with the same storage capacity as the
  capacity of the original volume used by the source cluster.
- If the target cluster runs on |aws| with configured |iops|,
  select the configured |iops| to fall within the configured range.
- Select a cluster that is not configured to use |nvme| storage. |nvme|
  storage degrades restore performance.
- For target clusters with |aws| nodes created before March 27, 2024,
  enable faster cross-project restores by clicking the :guilabel:`Faster
  Restore` button in the `Backup <https://cloud.mongodb.com/go?l=https%3A%2F%2Fcloud.mongodb.com%2Fv2%2F%3Cproject%3E%23%2Fsecurity%2Fbackup%2Fclusters>`__
  details for your project in the {+atlas-ui+}. This button doesn't
  appear for :atlas:`MongoDB Atlas for Government </government>`
  clusters. 
  
  When you activate :guilabel:`Faster Restore`, |service| replaces each
  node in the target cluster one at a time during your target cluster's
  scheduled :ref:`maintenance windows <configure-maintenance-window>`.
  If a node doesn't start its replacement before a maintenance window
  ends, it will be replaced in the next window. Secondary reads and
  analytic nodes are unavailable during this change.
  
  Faster cross-project restores are automatic for clusters with {+gcp+}
  or {+azure+} nodes, or with {+aws+} nodes created after March 27,
  2024. If the :guilabel:`Faster Restore` button is missing or disabled,
  you already have faster cross-project restores enabled.

