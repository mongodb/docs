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
