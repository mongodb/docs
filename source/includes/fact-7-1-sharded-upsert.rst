Starting in MongoDB 7.1, if you specify ``upsert: true`` on a 
sharded collection, you **do not** need to include the full shard 
key in the :ref:`filter <update-one-filter>`.