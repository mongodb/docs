- Only one collection can be resharded at a time.

- :rsconf:`writeConcernMajorityJournalDefault` must be ``true``.

- To reshard a collection that has a :ref:`uniqueness
  <index-type-unique>` constraint, the new shard key must satisfy
  the :ref:`unique index requirements <sharding-shard-key-unique>` for 
  any existing unique indexes.

- The following commands and corresponding shell methods are not
  supported on the collection that is being resharded while the
  resharding operation is in progress:

  - :dbcommand:`collMod`
  - :dbcommand:`convertToCapped`
  - :dbcommand:`createIndexes`
  - :method:`~db.collection.createIndex()`
  - :dbcommand:`drop`
  - :method:`~db.collection.drop()`
  - :dbcommand:`dropIndexes`
  - :method:`~db.collection.dropIndex()`
  - :dbcommand:`renameCollection`
  - :method:`~db.collection.renameCollection()`

- The following commands and methods are not supported on the cluster
  while the resharding operation is in progress:

  - :dbcommand:`addShard`
  - :dbcommand:`removeShard`
  - :method:`db.createCollection()`
  - :dbcommand:`dropDatabase`

  .. warning::

     Using any of the preceding commands during a resharding
     operation causes the resharding operation to fail.

- If the collection to be resharded uses :atlas:`Atlas Search
  </atlas-search>`, the search index will become unavailable when the
  resharding operation completes. You need to manually rebuild the
  search index once the resharding operation completes.

- You can't reshard a sharded :ref:`time series collection
  <manual-timeseries-collection>`.
