MongoDB cannot move a chunk if the number of documents in the chunk exceeds
either 250000 documents or 1.3 times the result of dividing the configured
:ref:`chunk size<sharding-chunk-size>` by the average document size. 
:method:`db.collection.stats()` includes the ``avgObjSize`` field, 
which represents the average document size in the collection.
