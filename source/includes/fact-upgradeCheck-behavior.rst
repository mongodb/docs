|method| performs collection scans and has an impact on performance. To
mitigate the performance impact:

- For sharded clusters, configure to read from secondaries and run the
  command on the :program:`mongos`.

- For replica sets, run the command on the secondary members.

|method| can miss new data during the check when run on a live system with
active write operations.

For index validation, |method| only supports the check of version ``1``
indexes and skips the check of version ``0`` indexes.
