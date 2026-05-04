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

- If you run one of the following operations, the operation waits until
  resharding completes before executing:

  - :dbcommand:`addShard`
  - :dbcommand:`removeShard`
  - :dbcommand:`dropDatabase` on the database hosting the collection undergoing resharding

- If the collection you're resharding uses :atlas:`{+fts+}
  </atlas-search>`, the search index becomes unavailable when the
  resharding operation completes. You need to manually rebuild the
  search index once the resharding operation completes.
