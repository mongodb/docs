If write operations occur during ``mongodump``, the backup might not
represent a single point in time. For a consistent backup, do one of
the following:

- Block writes at the application level. *Recommended for individual
  collection backups.*
- Use :manual:`Fsync Lock </reference/command/fsync/#fsync-lock>` to
  lock the deployment and pause all writes.
- For full replica set dumps, use
  :ref:`mongodump-example-consistent-backup` to capture writes during
  the dump.

For sharded clusters, see :ref:`backup-sharded-dumps`.
