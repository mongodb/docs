The destination cluster must have enough disk storage to accommodate the logical 
data size being migrated and the destination oplog entries from the initial 
sync. For example, to migrate 10 GB of data, the destination cluster must have
at least 10 GB available for the data and another 10 GB for the insert oplog 
entries from the initial sync.

.. important:: 
  
   To use :ref:`embedded verification <c2c-embedded-verifier>`, you must have a 
   larger oplog on the destination. If you enable the embedded verifier and 
   reduce the size of the destination oplog, the embedded verifier might not be 
   able to keep up, causing ``mongosync`` to error.

If you need to reduce the overhead of the destination oplog entries and the 
embedded verifier is disabled, you can: 

- Use the :setting:`~replication.oplogSizeMB` setting to lower the destination 
  cluster's oplog size.

- Use to :setting:`~storage.oplogMinRetentionHours` setting to lower or remove 
  the destination cluster's minimum oplog retention period.