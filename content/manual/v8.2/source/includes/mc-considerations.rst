- |mc| can only be run on sharded clusters.
- |mc| can only move unsharded collections.
- |mc| can only move a single collection at a time.
- |mc| has a 5 minute minimum duration. 
- :rsconf:`writeConcernMajorityJournalDefault` must be ``true``.
- To move a collection that has a :ref:`uniqueness
  <index-type-unique>` constraint, the new index must satisfy
  the :ref:`unique index requirements <sharding-shard-key-unique>` for 
  any existing unique indexes.
- If the collection that is being moved uses {+fts+}, its search indexes become
  unavailable after ``moveCollection`` completes. You must manually rebuild
  the search indexes.
- If the collection you're moving is archived in :ref:`Atlas Online 
  Archives <manage-online-archive>`, the online archive files are marked as 
  ``Orphaned`` once the moving operation completes. You can
  :atlas:`create </online-archive/configure-online-archive/>` another
  online archive for the same
  database, collection, and fields as the orphaned archive as long as 
  there is no other archive for that same combination in the ``Active`` state.
- You cannot make topology changes, such as add or remove shard or 
  transition between embedded and dedicated config servers, until
  ``moveCollection`` completes.
- You cannot run the following operations against the collection that 
  is being moved while |mc| is in progress:

  - :dbcommand:`collMod`
  - :dbcommand:`convertToCapped`
  - :dbcommand:`createIndexes`
  - :method:`db.collection.createIndexes()`
  - :dbcommand:`drop`
  - :method:`db.collection.drop()`
  - :dbcommand:`dropIndexes`
  - :method:`db.collection.dropIndex()`
  - :dbcommand:`renameCollection`
  - :method:`db.collection.renameCollection()`

- You cannot run the following operations against the cluster while
  ``moveCollection`` is in progress:

  - :dbcommand:`addShard`
  - :dbcommand:`removeShard`
  - :method:`db.createCollection()`
  - :dbcommand:`dropDatabase`
  - :dbcommand:`transitionToDedicatedConfigServer`
  - :dbcommand:`transitionFromDedicatedConfigServer`

- Index builds that occur while |mc| is in progress might silently fail.

  - Do not create indexes while |mc| is in progress.

  - Do not call |mc| if there are ongoing index builds.

