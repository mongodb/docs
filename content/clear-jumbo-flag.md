+++
title = "Clear jumbo Flag"

tags = [
"mongodb",
"administration",
"sharding",
"advanced" ]
+++

# Clear ``jumbo`` Flag

If MongoDB cannot split a chunk that exceeds the [specified chunk
size](https://docs.mongodb.com/manual/core/sharding-data-partitioning/#sharding-chunk-size) or contains a number of documents that
exceeds the ``max``, MongoDB labels the chunk as [jumbo](https://docs.mongodb.com/manual/core/sharding-data-partitioning/#jumbo-chunks).

If the chunk size no longer hits the limits, MongoDB clears the
``jumbo`` flag for the chunk when the [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) reloads or
rewrites the chunk metadata.

In cases where you need to clear the flag manually, the following
procedures outline the steps to manually clear the ``jumbo`` flag.


## Procedures

<span id="preferred-method-clear-jumbo"></span>


### Divisible Chunks

The preferred way to clear the ``jumbo`` flag from a chunk is to
attempt to split the chunk. If the chunk is divisible, MongoDB removes
the flag upon successful split of the chunk.


#### Step 1: Connect to ``mongos``.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos).


#### Step 2: Find the ``jumbo`` Chunk.

Run [``sh.status(true)``](https://docs.mongodb.com/manual/reference/method/sh.status/#sh.status) to find the chunk labeled
``jumbo``.

```javascript

sh.status(true)

```

For example, the following output from sh.status(true) shows that
chunk with shard key range ``{ "x" : 2 } -->> { "x" : 4 }`` is
``jumbo``.

```

--- Sharding Status ---
  sharding version: {
     ...
  }
  shards:
     ...
  databases:
     ...
        test.foo
           shard key: { "x" : 1 }
        chunks:
             shard-b  2
             shard-a  2
        { "x" : { "$minKey" : 1 } } -->> { "x" : 1 } on : shard-b Timestamp(2, 0)
        { "x" : 1 } -->> { "x" : 2 } on : shard-a Timestamp(3, 1)
        { "x" : 2 } -->> { "x" : 4 } on : shard-a Timestamp(2, 2) jumbo
        { "x" : 4 } -->> { "x" : { "$maxKey" : 1 } } on : shard-b Timestamp(3, 0)

```


#### Step 3: Split the ``jumbo`` Chunk.

Use either [``sh.splitAt()``](https://docs.mongodb.com/manual/reference/method/sh.splitAt/#sh.splitAt) or [``sh.splitFind()``](https://docs.mongodb.com/manual/reference/method/sh.splitFind/#sh.splitFind) to
split the ``jumbo`` chunk.

```javascript

sh.splitAt( "test.foo", { x: 3 })

```

MongoDB removes the ``jumbo`` flag upon successful split of the
chunk.


### Indivisible Chunks

In some instances, MongoDB cannot split the no-longer ``jumbo`` chunk,
such as a chunk with a range of single shard key value, and the
preferred method to clear the flag is not applicable. In such cases,
you can clear the flag using the following steps.

Important: Only use this method if the [preferred method](#preferred-method-clear-jumbo) is *not* applicable.Before modifying the [config database](https://docs.mongodb.com/manual/reference/config-database), *always* back up the config database.

If you clear the ``jumbo`` flag for a chunk that still exceeds the
chunk size and/or the document number limit, MongoDB will re-label the
chunk as ``jumbo`` when MongoDB tries to move the chunk.


#### Step 1: Stop the balancer.

Disable the cluster balancer process temporarily, following the steps
outlined in [Disable the Balancer](https://docs.mongodb.com/manual/tutorial/manage-sharded-cluster-balancer/#sharding-balancing-disable-temporarily).


#### Step 2: Create a backup of ``config`` database.

Use [``mongodump``](https://docs.mongodb.com/manual/reference/program/mongodump/#bin.mongodump) against a config server to create a backup
of the ``config`` database. For example:

```

mongodump --db config --port <config server port> --out <output file>

```


#### Step 3: Connect to ``mongos``.

Connect a [``mongo``](https://docs.mongodb.com/manual/reference/program/mongo/#bin.mongo) shell to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos).


#### Step 4: Find the ``jumbo`` Chunk.

Run [``sh.status(true)``](https://docs.mongodb.com/manual/reference/method/sh.status/#sh.status) to find the chunk labeled
``jumbo``.

```javascript

sh.status(true)

```

For example, the following output from sh.status(true) shows that
chunk with shard key range ``{ "x" : 2 } -->> { "x" : 3 }`` is
``jumbo``.

```

--- Sharding Status ---
  sharding version: {
     ...
  }
  shards:
     ...
  databases:
     ...
        test.foo
           shard key: { "x" : 1 }
        chunks:
             shard-b  2
             shard-a  2
        { "x" : { "$minKey" : 1 } } -->> { "x" : 1 } on : shard-b Timestamp(2, 0)
        { "x" : 1 } -->> { "x" : 2 } on : shard-a Timestamp(3, 1)
        { "x" : 2 } -->> { "x" : 3 } on : shard-a Timestamp(2, 2) jumbo
        { "x" : 3 } -->> { "x" : { "$maxKey" : 1 } } on : shard-b Timestamp(3, 0)

```


#### Step 5: Update ``chunks`` collection.

In the ``chunks`` collection of the ``config`` database, unset the
``jumbo`` flag for the chunk. For example,

```javascript

db.getSiblingDB("config").chunks.update(
   { ns: "test.foo", min: { x: 2 }, jumbo: true },
   { $unset: { jumbo: "" } }
)

```


#### Step 6: Restart the balancer.

Restart the balancer, following the steps in
[Enable the Balancer](https://docs.mongodb.com/manual/tutorial/manage-sharded-cluster-balancer/#sharding-balancing-enable).


#### Step 7: Optional. Clear current cluster meta information.

To ensure that [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) instances update their cluster
information cache, run [``flushRouterConfig``](https://docs.mongodb.com/manual/reference/command/flushRouterConfig/#dbcmd.flushRouterConfig) in the
``admin`` database.

```javascript

db.adminCommand({ flushRouterConfig: 1 } )

```
