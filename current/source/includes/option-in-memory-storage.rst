.. versionadded:: 3.4
   You can set the :guilabel:`engine` option to ``inMemory`` to use an
   in-memory storage engine per member in your deployment. 

   If a member using an in-memory storage engine fails or is shut down,
   it loses *all* of its data. When that member is restarted, it needs
   to :ref:`resychronize all of the data <replica-set-initial-sync>`
   from another member. You can use an in-memory storage engine for
   multiple members of a replica set or shard. 

   For more information, see :manual:`In-Memory Storage Engine 
   </core/inmemory>` in the MongoDB manual.
   