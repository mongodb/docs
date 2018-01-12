.. warning::

   If you use the :dbcommand:`movePrimary` command to move un-sharded
   collections, you must either restart all :binary:`~bin.mongos` instances,
   or use the :dbcommand:`flushRouterConfig` command on all
   :binary:`~bin.mongos` instances before reading or writing any data to any 
   unsharded collections that were moved. This action ensures that the 
   :binary:`~bin.mongos` is aware of the new shard for these collections.

   If you do not update the :binary:`~bin.mongos` instances' metadata cache
   after using :dbcommand:`movePrimary`, the :binary:`~bin.mongos` may miss data
   on reads, and may not write data to the correct shard. To recover, you must 
   manually intervene.
