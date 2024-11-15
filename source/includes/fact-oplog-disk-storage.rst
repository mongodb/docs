The destination cluster must have enough disk storage to accommodate the logical 
data size being migrated and the destination oplog entries from the initial 
sync. For example, to migrate 10 GB of data, the destination cluster must have
at least 10 GB available for the data and another 10 GB for the insert oplog 
entries from the initial sync.

To reduce the overhead of the destination oplog entries, you can: 

- Use the :setting:`~replication.oplogSizeMB` setting to lower the destination 
  cluster's oplog size.

- Use to :setting:`~storage.oplogMinRetentionHours` setting to lower or remove 
  the destination cluster's minimum oplog retention period.
