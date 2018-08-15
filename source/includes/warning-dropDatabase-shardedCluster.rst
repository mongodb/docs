.. warning::

   If you drop a database and create a new database with the same name, you
   must either restart all :binary:`~bin.mongos` instances, or use the
   :dbcommand:`flushRouterConfig` command on all :binary:`~bin.mongos`
   instances before reading or writing to that database. This action
   ensures that the :binary:`~bin.mongos` instances refresh their
   metadata cache, including the location of the :ref:`primary shard
   <primary-shard>` for the new database. Otherwise, the
   :binary:`~bin.mongos` may miss data on reads and may write data to a wrong shard.