- |mc| can only be run on sharded clusters.
- |mc| can only move unsharded collections.
- |mc| can only move a single collection at a time.
- |mc| has a 5 minute minimum duration. 
- Atlas Search indexes need to be rebuilt after ``moveCollection`` 
  runs.
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
