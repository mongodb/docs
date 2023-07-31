.. warning::

   If you shard a collection that already has an |fts| index, you might
   experience a brief period of query downtime when the collection
   begins to appear on a shard. Also, if you add a shard for an already
   sharded collection that contains an |fts| index, your search queries
   against that collection will fail until the initial sync process
   completes on the added shards. To learn more, see :ref:`initial sync process 
   <troubleshoot-initial-sync>`. 
