- ``mongosync`` allows users to rename collections that the
  ``sharding.shardingEntries`` option includes during sync with some 
  limitations. For details, see 
  :ref:`Renaming During Sync <rename-during-sync>`.
- If you use the ``sharding.createSupportingIndexes`` option, the indexes are 
  automatically created on the destination cluster during the sync. You cannot 
  create these indexes afterwards on the source cluster.
- If you want to create an index to support shard keys manually, you 
  must create the index before ``mongosync`` starts or after the migration is 
  complete and ``mongosync`` has stopped.