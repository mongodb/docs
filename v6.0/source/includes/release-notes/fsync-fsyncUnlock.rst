
Starting in MongoDB 7.1, the :dbcommand:`fsync` and :dbcommand:`fsyncUnlock`
commands can perform fsync operations sharded clusters.

When run on :program:`mongos` with the ``lock`` field set to ``true``, the
:dbcommand:`fsync` command flushes writes from the storage layer to disk and
locks each shard, preventing additional writes. The :dbcommand:`fsyncUnlock`
command can then be used to unlock the cluster. 

This feature enables self-managed backups of sharded clusters using
:program:`mongodump`.


