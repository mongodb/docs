Starting in MongoDB 7.0.3 (and 6.0.12 and 5.0.22), you can drop the 
index for a hashed shard key.

This can speed up data insertion for collections sharded with a hashed 
shard key. It can also speed up data ingestion when using 
``mongosync``.
