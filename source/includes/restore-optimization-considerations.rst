To optimize performance and reduce the amount of time it takes to
restore, follow these principles where applicable:

- Select a target cluster that isn't a global, multi-region, or
  multi-cloud cluster.
- Select a target cluster that belongs to the same |service|
  project and the same cloud provider region as the snapshot.
- Select a cluster tier with the same storage capacity as the
  capacity of the original volume used by the source cluster.
- If the target cluster runs on |aws| with configured |iops|,
  select the configured |iops| to fall within the configured range.
- Select a cluster that is not configured to use |nvme| storage. |nvme|
  storage degrades restore performance.
