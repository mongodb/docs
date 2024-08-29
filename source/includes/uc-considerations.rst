- |uc| can only be run on sharded clusters.
- |uc| can only operate on sharded collections.
- |uc| can only operate on a single collection at a time.
- |uc| has a 5 minute minimum duration.
- You must rebuild Atlas Search indexes after |uc| runs.
- You cannot make topology changes, such as adding or removing shards
  or transitioning between embedded and dedicated config servers, until
  |uc| completes.
- You cannot run the following operations on the collection that
  is being unsharded while |uc| is in progress:

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

- You cannot run the following operations on the cluster while
  ``unshardCollection`` is in progress:

  - :dbcommand:`addShard`
  - :dbcommand:`removeShard`
  - :method:`db.createCollection()`
  - :dbcommand:`dropDatabase`
  - ``transitionToDedicatedConfigServer``
  - ``transitionFromDedicatedConfigServer``
