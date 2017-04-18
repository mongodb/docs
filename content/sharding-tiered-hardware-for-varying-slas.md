+++
title = "Tiered Hardware for Varying SLA or SLO"

[tags]
+++
# Tiered Hardware for Varying SLA or SLO


# On this page

* [Scenario](#scenario) 

* [Write Operations](#write-operations) 

* [Read Operations](#read-operations) 

* [Balancer](#balancer) 

* [Security](#security) 

* [Procedure](#procedure) 

In sharded clusters, you can create [*zones*](#term-zone) of sharded data based
on the [*shard key*](#term-shard-key). You can associate each zone with one or more shards
in the cluster. A shard can associate with any number of non-conflicting
zones. In a balanced cluster, MongoDB migrates [*chunks*](#term-chunk) covered
by a zone only to those shards associated with the zone.

This tutorial uses [Zones](#zone-sharding) to route documents based on
creation date either to shards zoned for supporting recent documents, or
those zoned for supporting archived documents.

The following are some example use cases for segmenting data based on Service
Level Agreement (SLA) or Service Level Objective (SLO):

* An application requires providing low-latency access to recently inserted / updated documents 

* An application requires prioritizing low-latency access to a range or subset of documents 

* An application that benefits from ensuring specific ranges or subsets of data are stored on servers with hardware that suits the SLA's for accessing that data 

The following diagram illustrates a sharded cluster that uses hardware based
zones to satisfy data access SLAs or SLOs.

   [image: Diagram of sharded cluster architecture for tiered SLA][image]


## Scenario

A photo sharing application requires fast access to photos uploaded within the
last 6 months. The application stores the location of each photo along with
its metadata in the ``photoshare`` database under the ``data`` collection.

The following documents represent photos uploaded by a single user:

```javascript

{
  "_id" : 10003010,
  "creation_date" : ISODate("2012-12-19T06:01:17.171Z"),
  "userid" : 123,
  "photo_location" : "example.net/storage/usr/photo_1.jpg"
}
{
  "_id" : 10003011,
  "creation_date" : ISODate("2013-12-19T06:01:17.171Z"),
  "userid" : 123,
  "photo_location" : "example.net/storage/usr/photo_2.jpg"
}
{
  "_id" : 10003012,
  "creation_date" : ISODate("2016-01-19T06:01:17.171Z"),
  "userid" : 123,
  "photo_location" : "example.net/storage/usr/photo_3.jpg"
}

```

Note that only the document with ``_id : 10003012`` was uploaded within
the past year (as of June 2016).


### Shard Key

The photo collection uses the ``{ creation_date : 1 }`` index as the shard key.

The ``creation_date`` field in each document allows for creating zones
on the creation date.


### Architecture

The sharded cluster deployment currently consists of three [*shards*](#term-shard).

   [image: Diagram of sharded cluster architecture for tiered SLA][image]


### Zones

The application requires adding each shard to a zone based on its
hardware tier. Each hardware tier represents a specific hardware configuration
designed to satisfy a given SLA or SLO.

   [image: Diagram of sharded cluster architecture for tiered SLA][image]

Fast Tier ("recent")
   These are the fastest performing machines, with large
   amounts of RAM, fast SSD disks, and powerful CPUs.

   The zone requires a range with:

   * a lower bound of ``{ creation_date : ISODate(YYYY-mm-dd)}``, where the Year, Month, and Date specified by ``YYYY-mm-dd`` is within the last 6 months. 

   * an upper bound of ``{ creation_date : MaxKey }``. 

Archival Tier ("archive")
   These machines use less RAM, slower disks, and more basic CPUs. However,
   they have a greater amount of storage per server.

   The zone requires a range with:

   * a lower bound of ``{ creation_date : MinKey }``. 

   * an upper bound of ``{ creation_date : ISODate(YYYY-mm-dd)}``, where the Year, Month, and Date match the values used for the ``recent`` tier's lower bound. 

Note: The ``MinKey`` and ``MaxKey`` values are reserved special values for comparisons. 

As performance needs increase, adding additional shards and associating them
to the appropriate zone based on their hardware tier allows for the cluster to
scale horizontally.

When defining zone ranges based on time spans, weigh the benefits of
infrequent updates to the zone ranges against the amount of data that
must be migrated on an update. For example, setting a limit of 1 year for
data to be considered 'recent' likely covers more data than setting a limit
of 1 month. While there are more migrations required when rotating on a
1 month scale, the amount of documents that must be migrated is lower than
rotating on a 1 year scale.


## Write Operations

With zones, if an inserted or updated document matches a
configured zone, it can only be written to a shard inside that zone.

MongoDB can write documents that do not match a configured zone to any
shard in the cluster.

Note: The behavior described above requires the cluster to be in a steady state with no chunks violating a configured zone. See the following section on the [balancer](#sharding-tiered-hardware-balancing) for more information. 


## Read Operations

MongoDB can route queries to a specific shard if the query includes the
shard key.

For example, MongoDB can attempt a [targeted read operation](#sharding-mongos-targeted) on the following query because it includes
``creation_date`` in the query document:

```javascript

photoDB = db.getSiblingDB("photoshare")
photoDB.data.find( { "creation_date" : ISODate("2015-01-01") } )

```

If the requested document falls within the ``recent`` zone range, MongoDB
would route this query to the shards inside that zone, ensuring a faster read
compared to a cluster-wide [broadcast read operation](#sharding-mongos-broadcast)


## Balancer

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


## Security

For sharded clusters running with [Role-Based Access Control](#authorization), authenticate as a user
with at least the [``clusterManager``](#clusterManager) role on the ``admin`` database.


## Procedure

You must be connected to a [``mongos``](#bin.mongos) to create zones or zone ranges.
You cannot create zone or zone ranges by connecting directly to a
[*shard*](#term-shard).


### Step 1: Disable the Balancer

The balancer must be disabled on the collection
to ensure no migrations take place while configuring the new zones.

Use [``sh.disableBalancing()``](#sh.disableBalancing), specifying the namespace of the
collection, to stop the balancer

```javascript

sh.disableBalancing("photoshare.data")

```

Use [``sh.isBalancerRunning()``](#sh.isBalancerRunning) to check if the balancer process
is currently running. Wait until any current balancing rounds have completed
before proceeding.


### Step 2: Add each shard to the appropriate zone

Add ``shard0000`` to the ``recent`` zone.

```javascript

sh.addShardTag("shard0000", "recent")

```

Add ``shard0001`` to the ``recent`` zone.

```javascript

sh.addShardTag("shard0001", "recent")

```

Add ``shard0002`` to the ``archive`` zone.

```javascript

sh.addShardTag("shard0002", "archive")

```

You can review the zone assigned to any given shard by running
[``sh.status()``](#sh.status).


### Step 3: Define ranges for each zone

Define range for recent photos and associate it to the ``recent`` zone
using the [``sh.addTagRange()``](#sh.addTagRange) method. This method requires:

* the full namespace of the target collection. 

* the inclusive lower bound of the range. 

* the exclusive upper bound of the range. 

* the zone. 

```javascript

sh.addTagRange(
  "photoshare.data",
  { "creation_date" : ISODate("2016-01-01") },
  { "creation_date" : MaxKey },
  "recent"
)

```

Define range for older photos and associate it to the
``archive`` zone using the [``sh.addTagRange()``](#sh.addTagRange) method.
This method requires:

* the full namespace of the target collection. 

* the inclusive lower bound of the range. 

* the exclusive upper bound of the range. 

* the zone. 

```javascript

sh.addTagRange(
  "photoshare.data",
  { "creation_date" : MinKey },
  { "creation_date" : ISODate("2016-01-01") },
  "archive"
)

```

``MinKey`` and ``MaxKey`` are reserved special values for
comparisons.


### Step 4: Enable the Balancer

Re-enable the balancer to rebalance the cluster.

Use [``sh.enableBalancing()``](#sh.enableBalancing), specifying the namespace of the
collection, to start the balancer

```javascript

sh.enableBalancing("photoshare.data")

```

Use [``sh.isBalancerRunning()``](#sh.isBalancerRunning) to check if the balancer process
is currently running.


### Step 5: Review the changes

The next time the [balancer](#sharding-balancing) runs, it
[splits](#sharding-chunk-split) and
[migrates](#sharding-chunk-migration) chunks across the
shards respecting configured zones.

Once balancing finishes, the shards in the ``recent`` zone should only
contain documents with ``creation_date`` greater than or equal to
``ISODate("2016-01-01")``, while shards in the ``archive`` zone should
only contain documents with ``creation_date`` less than
``ISODate("2016-01-01")``.

You can confirm the chunk distribution by running [``sh.status()``](#sh.status).


### Updating Zone Ranges

To update the shard ranges, perform the following operations as a part of
a cron job or other scheduled procedure:


#### Step 1: Disable the Balancer

The balancer must be disabled on the collection
to ensure no migrations take place while configuring the new zones.

Use [``sh.disableBalancing()``](#sh.disableBalancing), specifying the namespace of the
collection, to stop the balancer

```javascript

sh.disableBalancing("photoshare.data")

```

Use [``sh.isBalancerRunning()``](#sh.isBalancerRunning) to check if the balancer process
is currently running. Wait until any current balancing rounds have completed
before proceeding.


#### Step 2: Remove the old shard zone ranges

Remove the old ``recent`` zone range using the
[``sh.removeTagRange()``](#sh.removeTagRange) method. This method requires:

* the full namespace of the target collection. 

* the inclusive lower bound of the range. 

* the exclusive upper bound of the range. 

* the zone. 

```javascript

sh.removeTagRange(
  "photoshare.data",
  { "creation_date" : ISODate("2016-01-01") },
  { "creation_date" : MaxKey },
  "recent"
)

```

Remove the old ``archive`` zone range using the
[``sh.removeTagRange()``](#sh.removeTagRange) method. This method requires:

* the full namespace of the target collection. 

* the inclusive lower bound of the range. 

* the exclusive upper bound of the range. 

* the zone. 

```javascript

sh.removeTagRange(
  "photoshare.data",
  { "creation_date" : MinKey },
  { "creation_date" : ISODate("2016-01-01") },
  "archive"
)

```

``MinKey`` and ``MaxKey`` are reserved special values for
comparisons.


#### Step 3: Add the new zone range for each zone

Define range for recent photos and associate it to the ``recent`` zone using
the [``sh.addTagRange()``](#sh.addTagRange) method. This method requires:

* the full namespace of the target collection. 

* the inclusive lower bound of the range. 

* the exclusive upper bound of the range. 

* the zone. 

```javascript

sh.addTagRange(
  "photoshare.data",
  { "creation_date" : ISODate("2016-06-01") },
  { "creation_date" : MaxKey },
  "recent"
)

```

Define range for older photos and associate it to the
``archive`` zone using the [``sh.addTagRange()``](#sh.addTagRange) method.
This method requires:

* the full namespace of the target collection. 

* the inclusive lower bound of the range. 

* the exclusive upper bound of the range. 

* the zone. 

```javascript

sh.addTagRange(
  "photoshare.data",
  { "creation_date" : MinKey },
  { "creation_date" : ISODate("2016-06-01") },
  "archive"
)

```

``MinKey`` and ``MaxKey`` are reserved special values for
comparisons.


#### Step 4: Enable the Balancer

Re-enable the balancer to rebalance the cluster.

Use [``sh.enableBalancing()``](#sh.enableBalancing), specifying the namespace of the
collection, to start the balancer

```javascript

sh.enableBalancing("photoshare.data")

```

Use [``sh.isBalancerRunning()``](#sh.isBalancerRunning) to check if the balancer process
is currently running.


#### Step 5: Review the changes

The next time the [balancer](#sharding-balancing) runs, it
[splits](#sharding-chunk-split) chunks where necessary and
[migrates](#sharding-chunk-migration) chunks across the
shards respecting the configured zones.

Before balancing, the shards in the ``recent`` zone only contained documents
with ``creation_date`` greater than or equal to ``ISODate("2016-01-01")``,
while shards in the ``archive`` zone only contained documents with
``creation_date`` less than ``ISODate("2016-01-01")``.

Once balancing finishes, the shards in the ``recent`` zone should only
contain documents with ``creation_date`` greater than or equal to
``ISODate("2016-06-01")``, while shards in the ``archive`` zone should
only contain documents with ``creation_date`` less than
``ISODate("2016-06-01")``.

You can confirm the chunk distribution by running [``sh.status()``](#sh.status).
