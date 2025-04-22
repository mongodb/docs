.. note::

   If you are deleting all documents in a large collection, it may be faster 
   to drop the collection and recreate it. Before dropping the collection, 
   note all indexes on the collection. You must recreate any 
   :ref:`indexes <indexes>` that existed in the original 
   collection. If the original collection was sharded, you must also 
   :ref:`shard <sharding-shard-key-creation>` the recreated collection.

   For more information on dropping a collection, see 
   :method:`db.collection.drop()`.
