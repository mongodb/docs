+++
title = "Segmenting Data by Location"

tags = [
"mongodb",
"administration",
"sharding",
"advanced" ]
+++

# Segmenting Data by Location

In sharded clusters, you can create [*zones*](https://docs.mongodb.com/manual/reference/glossary/#term-zone) of sharded data based
on the [*shard key*](https://docs.mongodb.com/manual/reference/glossary/#term-shard-key). You can associate each zone with one or more shards
in the cluster. A shard can associate with any number of non-conflicting
zones. In a balanced cluster, MongoDB migrates [*chunks*](https://docs.mongodb.com/manual/reference/glossary/#term-chunk) covered
by a zone only to those shards associated with the zone.

This tutorial uses [Zones](https://docs.mongodb.com/manual/core/zone-sharding/#zone-sharding) to segment data based on
geographic area.

The following are some example use cases for segmenting data by geographic
area:

* An application that requires segmenting user data based on geographic country

* A database that requires resource allocation based on geographic country

The following diagram illustrates a sharded cluster that uses geographic based
zones to manage and satisfy data segmentation requirements.

<img src="../images/sharding-segmenting-data-by-location-overview.bakedsvg.svg" width="700px" alt="Diagram geo distribution based on zones">


## Scenario

A financial chat application logs messages, tracking the country of the
originating user. The application stores the logs in the ``chat`` database
under the ``messages`` collection. The chats contain information that must be
segmented by country to have servers local to the country serve read and write
requests for the country's users. A group of countries can be assigned
same zone in order to share resources.

The application currently has users in the US, UK, and Germany. The
``country`` field represents the user's country based on its
[ISO 3166-1 Alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)
two-character country codes.

The following documents represent a partial view of three chat messages:

```javascript

{
  "_id" : ObjectId("56f08c447fe58b2e96f595fa"),
  "country" : "US",
  "userid" : 123,
  "message" : "Hello there",
  ...,
}
{
  "_id" : ObjectId("56f08c447fe58b2e96f595fb"),
  "country" : "UK",
  "userid" : 456,
  "message" : "Good Morning"
  ...,
}
{
  "_id" : ObjectId("56f08c447fe58b2e96f595fc"),
  "country" : "DE",
  "userid" : 789,
  "message" : "Guten Tag"
  ...,
}

```


### Shard Key

The ``messages`` collection uses the ``{ country : 1, userid : 1 }`` compound
index as the shard key.

The ``country`` field in each document allows for creating a zone for
each distinct country value.

The ``userid`` field provides a high [cardinality](https://docs.mongodb.com/manual/core/sharding-shard-key/#shard-key-cardinality)
and low [frequency](https://docs.mongodb.com/manual/core/sharding-shard-key/#shard-key-frequency) component to the shard key
relative to ``country``.

See [Choosing a Shard Key](https://docs.mongodb.com/manual/core/sharding-shard-key/#sharding-shard-key-requirements) for more
general instructions on selecting a shard key.


### Architecture

The sharded cluster has shards in two data centers - one in Europe, and
one in North America.

<img src="../images/sharding-segmenting-data-by-location-architecture.bakedsvg.svg" width="700px" alt="Diagram of zones used for supporting geo distribution architecture">


### Zones

This application requires one zone per data center.

``EU`` - European data center
   Shards deployed on this data center are assigned to the ``EU`` zone.

   For each country using the ``EU`` data center for local reads and writes,
   create a zone range for the ``EU`` zone with:

   * a lower bound of ``{ "country" : <country>, "userid" : MinKey }``

   * an upper bound of ``{ "country" : <country>, "userid" : MaxKey }``

``NA`` - North American data center
   Shards deployed on this data center are assigned to the ``NA`` zone.

   For each country using the ``NA`` data center for local reads and writes,
   create a zone range for the ``NA`` zone with:

   * a lower bound of ``{ "country" : <country>, "userid" : MinKey }``

   * an upper bound of ``{ "country" : <country>, "userid" : MaxKey }``

Note: The ``MinKey`` and ``MaxKey`` values are reserved special values for comparisons


### Write Operations

With zones, if an inserted or updated document matches a
configured zone, it can only be written to a shard inside of that zone.

MongoDB can write documents that do not match a configured zone to any
shard in the cluster.

Note: The behavior described above requires the cluster to be in a steady state with no chunks violating a configured zone. See the following section on the [balancer](#sharding-segmenting-data-by-location-balancer) for more information.


### Read Operations

MongoDB can route queries to a specific shard if the query includes at least
the ``country`` field.

For example, MongoDB can attempt a [targeted read operation](https://docs.mongodb.com/manual/core/sharded-cluster-query-router/#sharding-mongos-targeted) on the following query:

```javascript

chatDB = db.getSiblingDB("chat")
chatDB.messages.find( { "country" : "UK" , "userid" : "123" } )

```

Queries without the ``country`` field perform [broadcast operations](https://docs.mongodb.com/manual/core/sharded-cluster-query-router/#sharding-mongos-broadcast).

<span id="sharding-segmenting-data-by-location-balancer"></span>


### Balancer

The [balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration/#sharding-balancing) [migrates](https://docs.mongodb.com/manual/core/sharding-data-partitioning/#sharding-chunk-migration) chunks to the appropriate shard respecting any
configured zones. Until the migration, shards may contain chunks that violate
configured zones. Once balancing completes, shards should only
contain chunks whose ranges do not violate its assigned zones.

Adding or removing zones or zone ranges can result in chunk migrations.
Depending on the size of your data set and the number of chunks a zone or zone
range affects, these migrations may impact cluster performance. Consider
running your [balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration/#sharding-balancing) during specific scheduled
windows. See [Schedule the Balancing Window](https://docs.mongodb.com/manual/tutorial/manage-sharded-cluster-balancer/#sharding-schedule-balancing-window) for a tutorial on how
to set a scheduling window.


### Security

For sharded clusters running with [Role-Based Access Control](https://docs.mongodb.com/manual/core/authorization/#authorization), authenticate as a user
with at least the [``clusterManager``](https://docs.mongodb.com/manual/reference/built-in-roles/#clusterManager) role on the ``admin`` database.


## Procedure

You must be connected to a [``mongos``](https://docs.mongodb.com/manual/reference/program/mongos/#bin.mongos) to create zones and zone ranges.
You cannot create zones or zone ranges by connecting directly to a
[*shard*](https://docs.mongodb.com/manual/reference/glossary/#term-shard).


### Step 1: Disable the Balancer (Optional)

To reduce performance impacts, the balancer may be disabled on the collection
to ensure no migrations take place while configuring the new zones.

Use [``sh.disableBalancing()``](https://docs.mongodb.com/manual/reference/method/sh.disableBalancing/#sh.disableBalancing), specifying the namespace of the
collection, to stop the balancer.

```javascript

sh.disableBalancing("chat.message")

```

Use [``sh.isBalancerRunning()``](https://docs.mongodb.com/manual/reference/method/sh.isBalancerRunning/#sh.isBalancerRunning) to check if the balancer process
is currently running. Wait until any current balancing rounds have completed
before proceeding.


### Step 2: Add each shard to the appropriate zone

Add each shard in the North American data center to the ``NA`` zone.

```javascript

sh.addShardTag(<shard name>, "NA")

```

Add each shard in the European data center to the ``EU`` zone.

```javascript

sh.addShardTag(<shard name>, "EU")

```

You can review the zones assigned to any given shard by running
[``sh.status()``](https://docs.mongodb.com/manual/reference/method/sh.status/#sh.status).


### Step 3: Define ranges for each zone

For shard key values where ``country : US``, define a shard key range
and associate it to the ``NA`` zone using the [``sh.addTagRange()``](https://docs.mongodb.com/manual/reference/method/sh.addTagRange/#sh.addTagRange)
method. This method requires:

* The full namespace of the target collection.

* The inclusive lower bound of the range.

* The exclusive upper bound of the range.

* The name of the zone.

```javascript

sh.addTagRange(
  "chat.messages",
  { "country" : "US", "userid" : MinKey },
  { "country" : "US", "userid" : MaxKey },
  "NA"
)

```

For shard key values where ``country : UK``, define a shard key range
and associate it to the ``EU`` zone using the [``sh.addTagRange()``](https://docs.mongodb.com/manual/reference/method/sh.addTagRange/#sh.addTagRange)
method. This method requires:

* The full namespace of the target collection.

* The inclusive lower bound of the range.

* The exclusive upper bound of the range.

* The name of the zone.

```javascript

sh.addTagRange(
  "chat.messages",
  { "country" : "UK", "userid" : MinKey },
  { "country" : "UK", "userid" : MaxKey },
  "EU"
)

```

For shard key values where ``country : DE``, define a shard key range
and associate it to the ``EU`` zone using the [``sh.addTagRange()``](https://docs.mongodb.com/manual/reference/method/sh.addTagRange/#sh.addTagRange)
method. This method requires:

* The full namespace of the target collection.

* The inclusive lower bound of the range.

* The exclusive upper bound of the range.

* The name of the zone.

```javascript

sh.addTagRange(
  "chat.messages",
  { "country" : "DE", "userid" : MinKey },
  { "country" : "DE", "userid" : MaxKey },
  "EU"
)

```

The ``MinKey`` and ``MaxKey`` values are reserved special
value for comparisons. ``MinKey`` always compares as lower than every
other possible value, while ``MaxKey`` always compares as higher than
every other possible value. The configured ranges captures every user for
each ``device``.

Both ``country : UK`` and ``country : DE`` are assigned to the ``EU`` zone.
This associates any document with either ``UK`` or ``DE`` as the value for
``country`` to the EU data center.


### Step 4: Enable the Balancer (Optional)

If the balancer was disabled in previous steps, re-enable the balancer at
the completion of this procedure to rebalance the cluster.

Use [``sh.enableBalancing()``](https://docs.mongodb.com/manual/reference/method/sh.enableBalancing/#sh.enableBalancing), specifying the namespace of the
collection, to start the balancer.

```javascript

sh.enableBalancing("chat.message")

```

Use [``sh.isBalancerRunning()``](https://docs.mongodb.com/manual/reference/method/sh.isBalancerRunning/#sh.isBalancerRunning) to check if the balancer process
is currently running.


### Step 5: Review the Changes

The next time the [balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration/#sharding-balancing) runs, it
[splits](https://docs.mongodb.com/manual/core/sharding-data-partitioning/#sharding-chunk-split) chunks where necessary and
[migrates](https://docs.mongodb.com/manual/core/sharding-data-partitioning/#sharding-chunk-migration) chunks across the
shards respecting the configured zones.

Once balancing finishes, the shards in the  ``NA`` zone should only
contain documents with ``country : NA``, while shards in the ``EU`` zone
should only contain documents with ``country : UK`` or ``country : DE``.

A document with a value for ``country`` other than ``NA``, ``UK``, or
``DE`` can reside on any shard in the cluster.

You can confirm the chunk distribution by running [``sh.status()``](https://docs.mongodb.com/manual/reference/method/sh.status/#sh.status).


### Updating Zones

The application requires the following updates:

* Documents with ``country : UK`` must now be associated to the new ``UK`` data center. Any data in the ``EU`` data center must be migrated

* The chat application now supports users in Mexico. Documents with ``country : MX`` must be routed to the ``NA`` data center.

Perform the following procedures to update the zone ranges.


#### Step 1: Disable the Balancer (Optional)

To reduce performance impacts, the balancer may be disabled on the collection
to ensure no migrations take place while configuring the new zones or removing
the old ones.

Use [``sh.disableBalancing()``](https://docs.mongodb.com/manual/reference/method/sh.disableBalancing/#sh.disableBalancing), specifying the namespace of the
collection, to stop the balancer

```javascript

sh.disableBalancing("chat.messages")

```

Use [``sh.isBalancerRunning()``](https://docs.mongodb.com/manual/reference/method/sh.isBalancerRunning/#sh.isBalancerRunning) to check if the balancer process
is currently running. Wait until any current balancing rounds have completed
before proceeding.


#### Step 2: Add the new ``UK`` zone

Add each shard in the ``UK`` data center to the ``UK`` zone.

```javascript

sh.addShardTag("<shard name>", "UK")

```

You can review the zones assigned to any given shard by running
[``sh.status()``](https://docs.mongodb.com/manual/reference/method/sh.status/#sh.status).


#### Step 3: Remove the old zone range

Remove the old zone range associated to the ``UK`` country using the
[``sh.removeTagRange()``](https://docs.mongodb.com/manual/reference/method/sh.removeTagRange/#sh.removeTagRange) method. This method requires:

* The full namespace of the target collection.

* The inclusive lower bound of the range.

* The exclusive upper bound of the range.

* The name of the zone.

```javascript

sh.removeTagRange(
  "chat.messages",
  { "country" : "UK", "userid" : MinKey },
  { "country" : "UK", "userid" : MaxKey }
  "EU"
)

```


#### Step 4: Add new zone ranges

For shard key values where ``country : UK``, define a shard key range
and associate it to the ``UK`` zone using the [``sh.addTagRange()``](https://docs.mongodb.com/manual/reference/method/sh.addTagRange/#sh.addTagRange)
method. This method requires:

* The full namespace of the target collection.

* The inclusive lower bound of the range.

* The exclusive upper bound of the range.

* The name of the zone.

```javascript

sh.addTagRange(
  "chat.message",
  { "country" : "UK", "userid" : MinKey },
  { "country" : "UK", "userid" : MaxKey },
  "UK"
)

```

For shard key values where ``country : MX``, define a shard key range
and associate it to the ``NA`` zone using the [``sh.addTagRange()``](https://docs.mongodb.com/manual/reference/method/sh.addTagRange/#sh.addTagRange)
method. This method requires:

* The full namespace of the target collection.

* The inclusive lower bound of the range.

* The exclusive upper bound of the range.

* The name of the zone.

```javascript

sh.addTagRange(
  "chat.messages",
  { "country" : "MX", "userid" : MinKey },
  { "country" : "MX", "userid" : MaxKey },
  "NA"
)

```

The ``MinKey`` and ``MaxKey`` values are reserved special values
for comparisons. ``MinKey`` always compares as lower than every other
possible value, while ``MaxKey`` always compares as higher than
every other possible value. This ensures the two ranges captures the
entire possible value space of ``creation_date``.


#### Step 5: Enable the Balancer (Optional)

If the balancer was disabled in previous steps, re-enable the balancer at
the completion of this procedure to rebalance the cluster.

Use [``sh.enableBalancing()``](https://docs.mongodb.com/manual/reference/method/sh.enableBalancing/#sh.enableBalancing), specifying the namespace of the
collection, to start the balancer

```javascript

sh.enableBalancing("chat.messages")

```

Use [``sh.isBalancerRunning()``](https://docs.mongodb.com/manual/reference/method/sh.isBalancerRunning/#sh.isBalancerRunning) to check if the balancer process
is currently running.


#### Step 6: Review the changes

The next time the [balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration/#sharding-balancing) runs, it
[splits](https://docs.mongodb.com/manual/core/sharding-data-partitioning/#sharding-chunk-split) chunks where necessary and
[migrates](https://docs.mongodb.com/manual/core/sharding-data-partitioning/#sharding-chunk-migration) chunks across the
shards respecting the configured zones.

Before balancing, the shards in the ``EU`` zone only contained documents
where ``country : DE`` or ``country : UK``. Documents with the ``country :
MX`` could be stored on any shard in the sharded cluster.

After balancing, the shards in the ``EU`` zone should only contain documents
where ``country : DE``, while shards in the ``UK`` zone should only contain
documents where ``country : UK``. Additionally, shards in the ``NA`` zone
should only contain documents where ``country : US`` or ``country : MX``.

A document with a value for ``country`` other than ``NA``, ``MX``, ``UK``,
or ``DE`` can reside on any shard in the cluster.

You can confirm the chunk distribution by running [``sh.status()``](https://docs.mongodb.com/manual/reference/method/sh.status/#sh.status).

See also: [Zones](https://docs.mongodb.com/manual/core/zone-sharding/#zone-sharding)

  [Sharded Cluster Balancer](https://docs.mongodb.com/manual/core/sharding-balancer-administration/#sharding-balancing)

  [Deploy a Sharded Cluster](../deploy-shard-cluster/)
