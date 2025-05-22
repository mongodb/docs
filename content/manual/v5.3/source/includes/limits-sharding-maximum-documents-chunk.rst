By default, MongoDB cannot move a chunk if the number of documents in
the chunk is greater than 1.3 times the result of dividing the
configured :ref:`chunk size<sharding-chunk-size>` by the average
document size. :method:`db.collection.stats()` includes the
``avgObjSize`` field, which represents the average document size in the
collection.

.. include:: /includes/extracts/4.4-changes-migrate-jumbo-chunks.rst
