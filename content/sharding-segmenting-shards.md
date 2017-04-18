+++
title = "Segmenting Data by Application or Customer"

[tags]
mongodb = "product"
+++
# Segmenting Data by Application or Customer


# On this page

* [Scenario](#scenario) 

* [Procedure](#procedure) 

In sharded clusters, you can create [*zones*](#term-zone) of sharded data based
on the [*shard key*](#term-shard-key). You can associate each zone with one or more shards
in the cluster. A shard can associate with any number of non-conflicting
zones. In a balanced cluster, MongoDB migrates [*chunks*](#term-chunk) covered
by a zone only to those shards associated with the zone.

This tutorial shows you how to segment data using [Zones](#zone-sharding).

Consider the following scenarios where segmenting data by application or
customer may be necessary:

* A database serving multiple applications 

* A database serving multiple customers 

* A database that requires isolating ranges or subsets of application or customer data 

* A database that requires resource allocation for ranges or subsets of application or customer data 

This diagram illustrates a sharded cluster using zones to
segment data based on application or customer. This allows for data to
be isolated to specific shards. Additionally, each shard can have specific
hardware allocated to fit the performance requirement of the data stored on
that shard.

![Overview of zones used for supporting data segmentation](../images/sharding-segmenting-shards-overview.bakedsvg.svg)


## Scenario

An application tracks the score of a user along with a ``client`` field,
storing scores in the ``gamify`` database under the ``users`` collection.
Each possible value of ``client`` requires its own zone to allow for
data segmentation. It also allows the administrator to optimize the
hardware for each shard associated to a ``client`` for performance and cost.

The following documents represent a partial view of two users:

```javascript

{
  "_id" : ObjectId("56f08c447fe58b2e96f595fa"),
  "client" : "robot",
  "userid" : 123,
  "high_score" : 181,
  ...,
}
{
  "_id" : ObjectId("56f08c447fe58b2e96f595fb"),
  "client" : "fruitos",
  "userid" : 456,
  "high_score" : 210,
  ...,
}

```


### Shard Key

The ``users`` collection uses the ``{ client : 1, userid : 1 }`` compound
index as the shard key.

The ``client`` field in each document allows creating a zone for each
distinct client value.

The ``userid`` field provides a high [cardinality](#shard-key-cardinality) and low [frequency](#shard-key-frequency)
component to the shard key relative to ``country``.

See [Choosing a Shard Key](#sharding-shard-key-requirements) for more
general instructions on selecting a shard key.


### Architecture

The application requires adding shard to a zone associated to a specific
``client``.

The sharded cluster deployment currently consists of four [*shards*](#term-shard).

![Diagram of Data Segmentation Architecture using zones](../images/sharding-segmenting-shards-architecture.bakedsvg.svg)


### Zones

For this application, there are two client zones.

![Diagram of zones used for supporting data segmentation](../images/sharding-segmenting-shards-tags.bakedsvg.svg)

Robot client ("robot")
   This zone represents all documents where ``client : robot``.

FruitOS client ("fruitos")
   This zone represents all documents where ``client : fruitos``.


### Write Operations

With zones, if an inserted or updated document matches a
configured zone, it can only be written to a shard inside that zone.

MongoDB can write documents that do not match a configured zone to any
shard in the cluster.

Note: The behavior described above requires the cluster to be in a steady state with no chunks violating a configured zone. See the following section on the [balancer](#sharding-tiered-hardware-balancing) for more information. 


### Read Operations

MongoDB can route queries to a specific shard if the query includes at least
the ``client`` field.

For example, MongoDB can attempt a [targeted read operation](#sharding-mongos-targeted) on the following query:

```javascript

chatDB = db.getSiblingDB("gamify")
chatDB.users.find( { "client" : "robot" , "userid" : "123" } )

```

Queries without the ``client`` field perform [broadcast operations](#sharding-mongos-broadcast).


### Balancer

The [balancer](#sharding-balancing) [migrates](#sharding-chunk-migration) chunks to the appropriate shard respecting any
configured zones. Until the migration, shards may contain chunks that violate
configured zones. Once balancing completes, shards should only
contain chunks whose ranges do not violate its assigned zones.

Adding or removing zones or zone ranges can result in chunk migrations.
Depending on the size of your data set and the number of chunks a zone or zone
range affects, these migrations may impact cluster performance. Consider
running your [balancer](#sharding-balancing) during specific scheduled
windows. See [Schedule the Balancing Window](#sharding-schedule-balancing-window) for a tutorial on how
to set a scheduling window.


### Security

For sharded clusters running with [Role-Based Access Control](#authorization), authenticate as a user
with at least the [``clusterManager``](#clusterManager) role on the ``admin`` database.


## Procedure

You must be connected to a [``mongos``](#bin.mongos) associated to the target
[*sharded cluster*](#term-sharded-cluster) to proceed. You cannot create zones or zone ranges by
connecting directly to a [*shard*](#term-shard).


### Step 1: Disable the Balancer

The balancer must be disabled on the collection
to ensure no migrations take place while configuring the new zones.

Use [``sh.disableBalancing()``](#sh.disableBalancing), specifying the namespace of the
collection, to stop the balancer.

```javascript

sh.disableBalancing("chat.message")

```

Use [``sh.isBalancerRunning()``](#sh.isBalancerRunning) to check if the balancer process
is currently running. Wait until any current balancing rounds have completed
before proceeding.


### Step 2: Add each shard to the appropriate zone

Add ``shard0000`` to the ``robot`` zone.

```javascript

sh.addShardTag("shard0000", "robot")

```

Add ``shard0001`` to the ``robot`` zone.

```javascript

sh.addShardTag("shard0001", "robot")

```

Add ``shard0002`` to the ``fruitos`` zone.

```javascript

sh.addShardTag("shard0002", "fruitos")

```

Add ``shard0003`` to the ``fruitos`` zone.

```javascript

sh.addShardTag("shard0003", "fruitos")

```

Run [``sh.status()``](#sh.status) to review the zone configured for the sharded
cluster.


### Step 3: Define ranges for each zone

Define range for the ``robot`` client and associate it to the ``robot``
zone using the [``sh.addTagRange()``](#sh.addTagRange) method.

This method requires:

* The full namespace of the target collection 

* The inclusive lower bound of the range 

* The exclusive upper bound of the range 

* The name of the zone 

```javascript

sh.addTagRange(
  "gamify.users",
  { "client" : "robot", "userid" : MinKey },
  { "client" : "robot", "userid" : MaxKey },
  "robot"
)

```

Define range for the ``fruitos`` client and associate it to the
``fruitos`` zone using the [``sh.addTagRange()``](#sh.addTagRange) method.

This method requires:

* The full namespace of the target collection 

* The inclusive lower bound of the range 

* The exclusive upper bound of the range 

* The name of the zone 

```javascript

sh.addTagRange(
  "gamify.users",
  { "client" : "fruitos", "userid" : MinKey },
  { "client" : "fruitos", "userid" : MaxKey },
  "fruitos"
)

```

The ``MinKey`` and ``MaxKey`` values are reserved special
values for comparisons. ``MinKey`` always compares as lower than
every other possible value, while ``MaxKey`` always compares as
higher than every other possible value. The configured ranges captures every
user for each ``client``.


### Step 4: Enable the Balancer

Re-enable the balancer to rebalance the cluster.

Use [``sh.enableBalancing()``](#sh.enableBalancing), specifying the namespace of the
collection, to start the balancer.

```javascript

sh.enableBalancing("chat.message")

```

Use [``sh.isBalancerRunning()``](#sh.isBalancerRunning) to check if the balancer process
is currently running.


### Step 5: Review the changes

The next time the [balancer](#sharding-balancing) runs, it
[splits](#sharding-chunk-split) and
[migrates](#sharding-chunk-migration) chunks across the
shards respecting the configured zones.

Once balancing finishes, the shards in the ``robot`` zone only contain
documents with ``client : robot``, while shards in the ``fruitos`` zone only
contain documents with ``client : fruitos``.

You can confirm the chunk distribution by running [``sh.status()``](#sh.status).
