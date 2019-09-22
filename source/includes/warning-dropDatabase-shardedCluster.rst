.. warning::

   Starting in MongoDB 4.2:
      If you drop a database and create a new database with the same name, you
      must either:
      
      - Restart all :binary:`~bin.mongos` instances and all
        :binary:`~bin.mongod` shard members (including the secondary
        members);
      
      - Use the :dbcommand:`flushRouterConfig` command on all
        :binary:`~bin.mongos` instances and all :binary:`~bin.mongod`
        shard members (including the secondary members) before reading
        or writing to that database.
      
      This ensures that the :binary:`~bin.mongos` and shard instances
      refresh their metadata cache, including the location of the
      :ref:`primary shard <primary-shard>` for the new database.
      
      Otherwise, the you may miss data on reads, and may not write data to
      the correct shard. To recover, you must manually intervene.
      
   In MongoDB 4.0 and earlier:      
      If you drop a database and create a new database with the same name, you
      must either restart all :binary:`~bin.mongos` instances, or use the
      :dbcommand:`flushRouterConfig` command on all :binary:`~bin.mongos`
      instances before reading or writing to that database. This 
      ensures that the :binary:`~bin.mongos` instances refresh their
      metadata cache, including the location of the :ref:`primary shard
      <primary-shard>` for the new database. 
      
      Otherwise, the you may miss data on reads, and may not write data to
      the correct shard. To recover, you must manually intervene.
      
