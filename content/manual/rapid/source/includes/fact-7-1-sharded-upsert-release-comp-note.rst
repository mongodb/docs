Starting in MongoDB 7.1, when using 
:method:`~db.collection.updateOne()` with ``upsert: true`` on a 
sharded collection, you **do not** need to include the full shard key 
in the :ref:`filter <update-one-filter>`.