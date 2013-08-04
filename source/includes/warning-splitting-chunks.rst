.. warning::

   Be careful when splitting data in a sharded collection to create
   new chunks. When you shard a collection that has existing data,
   MongoDB automatically creates chunks to evenly distribute the
   collection. To split data effectively in a sharded cluster you must
   consider the number of documents in a chunk and the average
   document size to create a uniform chunk size. When chunks have
   irregular sizes, shards may have an equal number of chunks but have
   very different data sizes. Avoid creating splits that lead to a
   collection with differently sized chunks.
