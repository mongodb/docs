.. warning::

   If you use the :dbcommand:`movePrimary` command to move un-sharded
   collections, you must either restart all :program:`mongos` instances,
   or use the :dbcommand:`flushRouterConfig` command on all
   :program:`mongos` instances before reading or writing any data to any 
   unsharded collections that were moved. This action ensures that the 
   :program:`mongos` is aware of the new shard for these collections.

   If you do not update the :program:`mongos` instances' metadata cache
   after using :dbcommand:`movePrimary`, the :program:`mongos` may miss data
   on reads, and may not write data to the correct shard. To recover, you must 
   manually intervene.
