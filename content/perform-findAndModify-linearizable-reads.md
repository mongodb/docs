+++
title = "Linearizable Reads via findAndModify"

[tags]
mongodb = "product"
+++
# Linearizable Reads via ``findAndModify``


## Overview

When reading from a replica set, it is possible to read data that is
stale (i.e. may not reflect all writes that have occurred prior to the
read operation) or not durable (i.e. the state of the data may reflect
a write that has not been acknowledged by a majority or the replica set
members and thus could be rolled back), depending on the read concern
used.

Starting in version 3.4, MongoDB introduces
[``"linearizable"``](#readconcern."linearizable") read concern that returns durable data
that is not stale. [``Linearizable``](#readconcern."linearizable") read
concern guarantees only apply if read operations specify a query filter
that uniquely identifies a single document.

This tutorial outlines an alternative procedure, one using
[``db.collection.findAndModify()``](#db.collection.findAndModify) to read data that is not stale
and cannot be rolled back, for deployments using MongoDB 3.2. For
MongoDB 3.4, although the outlined procedure can be applied, see
[``"linearizable"``](#readconcern."linearizable") read concern instead.


## Linearizable Reads via ``findAndModify``

This procedure uses [``db.collection.findAndModify()``](#db.collection.findAndModify) to read
data that is not stale and cannot be rolled back. To do so, the
procedure uses the [``findAndModify()``](#db.collection.findAndModify) method with
a [write concern](#write-concern) to modify a dummy field in a
document. Specifically, the procedure requires that:

* [``db.collection.findAndModify()``](#db.collection.findAndModify) use an **exact** match query, and a [unique index](#) **must exist** to satisfy the query. 

* [``findAndModify()``](#db.collection.findAndModify) must actually modify a document; i.e. result in a change to the document. 

* [``findAndModify()``](#db.collection.findAndModify) must use the write concern [``{ w: "majority" }``](#writeconcern."majority"). 

Important: The "quorum read" procedure has a substantial cost over simply using a read concern of [``"majority"``](#readconcern."majority") because it incurs write latency rather than read latency. This technique should only be used if staleness is absolutely intolerable. 


### Prerequisites

This tutorial reads from a collection named ``products``. Initialize
the collection using the following operation.

```javascript

db.products.insert( [
   {
     _id: 1,
     sku: "xyz123",
     description: "hats",
     available: [ { quantity: 25, size: "S" }, { quantity: 50, size: "M" } ],
     _dummy_field: 0
   },
   {
     _id: 2,
     sku: "abc123",
     description: "socks",
     available: [ { quantity: 10, size: "L" } ],
     _dummy_field: 0
   },
   {
     _id: 3,
     sku: "ijk123",
     description: "t-shirts",
     available: [ { quantity: 30, size: "M" }, { quantity: 5, size: "L" } ],
     _dummy_field: 0
   }
] )

```

The documents in this collection contain a dummy field named
``_dummy_field`` that will be incremented by the
[``db.collection.findAndModify()``](#db.collection.findAndModify) in the tutorial. If the field
does not exist, the [``db.collection.findAndModify()``](#db.collection.findAndModify) operation
will add the field to the document. The purpose of the field is to
ensure that the [``db.collection.findAndModify()``](#db.collection.findAndModify) results in a
modification to the document.


### Procedure

[1] In [some circumstances](#edge-cases), two nodes in a replica set may *transiently* believe that they are the primary, but at most, one of them will be able to complete writes with [``{ w: "majority" }``](#writeconcern."majority") write concern. The node that can complete [``{ w: "majority" }``](#writeconcern."majority") writes is the current primary, and the other node is a former primary that has not yet recognized its demotion, typically due to a [*network partition*](#term-network-partition). When this occurs, clients that connect to the former primary may observe stale data despite having requested read preference [``primary``](#primary), and new writes to the former primary will eventually roll back. 


### Step 1: Create a unique index.

Create a unique index on the fields that will be used to specify an
exact match in the [``db.collection.findAndModify()``](#db.collection.findAndModify) operation.

This tutorial will use an exact match on the ``sku`` field. As such,
create a unique index on the ``sku`` field.

```javascript

db.products.createIndex( { sku: 1 }, { unique: true } )

```


### Step 2: Use ``findAndModify`` to read committed data.

Use the [``db.collection.findAndModify()``](#db.collection.findAndModify) method to make a
trivial update to the document you want to read and return the
modified document. A write concern of [``{ w: "majority" }``](#writeconcern."majority") is required. To specify the document to read, you must
use an exact match query that is supported by a unique index.

The following [``findAndModify()``](#db.collection.findAndModify) operation
specifies an exact match on the uniquely indexed field ``sku`` and
increments the field named ``_dummy_field`` in the matching document.
While not necessary, the write concern for this command also includes
a [wtimeout](#wc-wtimeout) value of ``5000`` milliseconds to prevent the
operation from blocking forever if the write cannot propagate to a
majority of voting members.

```javascript

var updatedDocument = db.products.findAndModify(
   {
     query: { sku: "abc123" },
     update: { $inc: { _dummy_field: 1 } },
     new: true,
     writeConcern: { w: "majority", wtimeout: 5000 }
   }
);

```

Even in situations where two nodes in the replica set believe that
they are the primary, only one will be able to complete the write with
[``w: "majority"``](#writeconcern."majority"). As such, the
[``findAndModify()``](#db.collection.findAndModify) method with
[``"majority"``](#writeconcern."majority") write concern will be successful only when
the client has connected to the true primary to perform the operation.

Since the quorum read procedure only increments a dummy field in the
document, you can safely repeat invocations of
[``findAndModify()``](#db.collection.findAndModify), adjusting the
[wtimeout](#wc-wtimeout) as necessary.
