Starting in MongoDB 8.0, if you specify ``upsert: true`` on a 
sharded collection, you **do not** need to include the full shard 
key in the :ref:`filter <update-one-filter>`.
