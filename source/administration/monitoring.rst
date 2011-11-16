===========================
Monitoring Database Systems
===========================

.. default-domain: mongodb

Monitoring is a crucial component of all database administration
work. A firm grasp of MongoDB's monitoring capabilities will enable
you to effectively assess and maintain your deployment proactively,
and also efficiently diagnose any issues that you encounter. This
document provides an overview of the tools you may use for monitoring
MongoDB, an introduction to diagnostic strategies, and suggestions for
monitoring instances in MongoDB's replica sets and shard clusters.

.. seealso::

   For more information about monitoring tools, see:

   - :doc:`/utilities/mongostat`.
   - :doc:`/utilities/mongotop`.

   For more background on various other MongoDB status outputs see:

   - :doc:`/reference/server-status`
   - :doc:`/reference/replica-status`
   - :doc:`/reference/database-statistics`
   - :doc:`/reference/collection-statistics`

   10gen provides a hosted monitoring service which collects and
   aggregates these data to provide insight into the performance and
   operation of MongoDB deployments. See the `MongoDB Monitoring
   Service (MMS) <http://mms.10gen.com/>`_ and the `MMS documentation
   <http://mms.10gen.com/help/>`_ for more information.

Monitoring Tools
----------------

MongoDB provides a number of ways to collect data about the state and
condition of a running MongoDB instance. Each method provides a
different set of information, and is useful in a different
context. This section provides an overview of these utilities and
statistics, along with an example of the kinds of questions that each
method is most suited to help you address.

Utilities
~~~~~~~~~

The MongoDB distribution includes a number of binary programs that are
useful for quickly returning statistics about the instances
performance and activity. These are typically useful for diagnosing
current issues with the database.

mongotop
````````

:command:`mongotop` tracks and reports the current read and write
activity of a MongoDB instance. ``mongotop`` provides per-collection
visibility into use. Use ``mongotop`` to verify that activity and use
match expectations.

monostat
````````

:command:`mongostat` captures and returns counters of database
operations. ``mongostat`` reports operations on a per-type
(e.g. insert, query, update, delete, etc.) basis that makes it easy to
understand the nature of the load on the server. Use ``mongostat`` to
understand the distribution of operation types and to inform capacity
development plans.

Statistics
~~~~~~~~~~

The MongoDB interface provides a number of commands that return
statistics about the state of the MongoDB instance. These commands
useful for capturing the state of the MongoDB instance and can be used
by scripts and programs to develop custom alerts, or modify the
behavior of your application in response to the activity of your
instance.

serverStatus
````````````

Return the :doc:`serverStatus data </reference/server-status/>` using
the :command:`serverStatus` command. The document returned
contains a general overview of the state of the database, including
disk usage, memory use, connection, journaling, access. The command is
quick to run and does not impact the performance of your MongoDB
instance.

Most data regarding the state of a MongoDB instance is derived from
``serverStatus``: while you probably don't want to run this command
directly to assess the status of a MongoDB instance, it's a good idea
to be familiar with the data provided by :command:`serverStatus`.

replStats
`````````

View the :doc:`replStatus data </reference/replica-status>` with the
:command:`replStatus` command. The document returned by this
command contains information regarding the state and configuration of
the replica set. Use this data to ensure that replication is properly
configured, and to check the connections between the current host and
the members of the replica set.

dbStats
```````

The :doc:`dbStats data </reference/database-statistics>` is accessible
by way of the :command:`dbStats`. The document returned contains data
that reflects the amount of storage used and data contained in the
database, as well as object, collection, and index counters among
other relevant information. Use this data to track the state and size
of a specific database, to compare utilization between databases, or
to determine average object size.

collStats
`````````

The :doc:`collStats data </reference/collection-statistics>` is
accessible using the :command:`collStats`. command. It provides
statistics that resemble ``dbStats`` on the collection level: this
includes a count of the objects in the collection, the size of the
collection, the amount of disk space used by the collection, and
information about the indexes.

Diagnosing Performance Issues
-----------------------------

Degraded performance in MongoDB can be the result of a number of
different factors related to the relationship between the amount of
data stored in the database, the amount of ram on the system, the
number of connections to the database, and the amount of time the
database spends in a lock state.

In some cases performance issues may be transient and related to
traffic load or the availability of hardware on the host system, in
other situations, performance issues may indicate that the database
may be operating at capacity and that it's time to add additional
capacity to the database.

Locks
~~~~~

MongoDB uses a locking system to provide reliable concurrency;
however, if certain operations are long-running, or a queue forms,
performance can be impacted as requests and operations wait for the
lock. To determine if this effects your database, begin by checking
the data conveyed in the :ref:`globalLock` section of the
:command:`serverStatus` response. If
:status:`globalLock.currentQueue.total` is consistently high, then
there are probably a large number of requests waiting for a lock. This
indicates a possible concurrency issue that might effect performance.

If :status:`globalLock.toalTime` is high in context of
:status:`uptime` then the database has existed in a lock state for a
significant amount of time. If :status:`globalLock.ratio` is also
high, MongoDB has likely been processing a large number of long
running queries. Long queries are often the result of a number of
factors: ineffective use of indexes resulting from non-optimal schema
design, query structure, or configuration; or insufficient RAM
resulting in :ref:`page faults <administration-monitoring-page-faults>`
and disk reads.

Memory Usage
~~~~~~~~~~~~

Because MongoDB uses memory mapped files, given a data set of
sufficient size, the MongoDB process will allocate all memory
available on the system for its use. While this is part of the design,
it may make it possible to know if the ram is being used effectively
or if the amount of ram is sufficient for the data set. Because this
is determined in part by the utilization pattern of the data set, it's
important to check :ref:`memory use status <memory-status>` to better
understand MongoDBs memory utilization.

See if the amount of resident memory use (i.e. :status:`mem.resident`)
exceeds the amount of system memory *and* there's a significant amount
of data on disk that isn't in ram. Additionally If the amount of
mapped memory (i.e. :status:`mem.mapped`) is greater than the amount
of system memory, some operations will require disk access to read
data from virtual memory with deleterious effects on performance.

.. _administration-monitoring-page-faults:

Page Faults
~~~~~~~~~~~

Page faults represent the number of time that MongoDB requires data
located in virtual memory but is loaded in physical memory. To check
for page faults, see the :status:`extra_info.page_faults` value in the
:command:`serverStatus` command. This data is only available on Linux
systems.

Alone these operations are minor and complete quickly; however, in
aggregate, large numbers of page fault typically indicate that MongoDB
is reading too much data from disk and can indicate a number of
underlying causes and recommendations.

If possible, increasing the amount of RAM accessible to MongoDB may
help reduce the number of page faults. If this is not possible, for
some deployments consider increasing the size of your :term:`replica
set` and distribute read operations to :term:`secondary` nodes; for
other deployments, add :term:`shards` to a :term:`shard cluster` to
distribute load among MongoDB instances.

Number of Connections
~~~~~~~~~~~~~~~~~~~~~

In some cases, the number of connections between the application layer
(i.e. clients) and the database, this can overwhelm the ability of the
server to handle requests which can produce performance
irregularities. Check the following fields in the :doc:`serverStatus
</reference/server-status>` document:

- :status:`globalLock.activeClients` contains a counter of the total
  number of clients with active operations in progress or queued.

- :status:`connections` is a container for the following two fields:

  - :status:`connections.current` the total number of current clients
    that connect to the database instance.

  - :status:`connections.available` the total number of unused
    collections available for new clients.

If requests are high because there are a lot of concurrent application
requests, and the database is keeping up. If this is the case, then
you will need to add additional nodes to your cluster. Increase the
size of your :term:`replica set` and distribute read operations to
:term:`secondary` nodes, or add :term:`shards` to a :term:`shard
cluster` to distribute load among MongoDB instances.

Spikes in the number of connections can also be the result of
application or driver errors. Extremely high numbers of connections
is often indicative of a driver or other configuration error.

Replication and Monitoring
--------------------------

The primary administrative concern that requires monitoring with
replica sets, beyond the requirements for any MongoDB node is
"replication lag." This refers to the amount of time that it takes a
write operation on the :term:`primary` node to replicate to a
:term:`secondary` node. While some very small delay period is
expected, as replication lag grows, two significant problems emerge:

- the operations that have occurred in the period of lag are not
  replicated to one or more secondaries. If you're using replication
  to ensure data persistence, exceptionally long delays before
  replication may impact the integrity of your deployment.

- if the replication lag exceeds the length of the operation log
  (":term:`oplog`") then secondary will have to resync from the
  master. If this happens regularly, the secondaries may have to
  resync unnecessarily increasing the load on the primary instance.

Replication issues are most often the result of network connectivity
issues between nodes or a primary machine that does not have the
resources to support application and replication traffic. To check the
status of a replica use the :command:`replSetGetStatus` or the
following helper in the shell: ::

     rs.status()

See the ":doc:`/reference/replica-status`" document for a more in depth
overview view of this output. In general watch the following two data
points:

- :status:`optimeDate`. Pay particular attention to the difference in
  time between the primary and the secondary nodes.

- :status:`lastHeartbeat`, which reflects the last time each node had
  any contact to the current node. Compare this to the :status:`date`
  which reflects the current date and time of the node you're
  currently connected to.

The size of the operation log is configurable at runtime using the
:option:`mongod --oplogsize` argument to the :command:`mongod`
command, or preferably the :setting:`oplogsize` in the MongoDB
configuration file. The default size, is typically 5% of disk space on
64-bit systems.

Sharding and Monitoring
-----------------------

In addition to the general monitoring that all MongoDB nodes require,
:term:`shard` clusters require additional monitoring to ensure that
data is effectively distributed among nodes and that sharding
functions appropriately. All MongoDB instances need to be monitored
independently standalone or replica set members; however, there are
several aspects of sharding operation that require additional
monitoring.

Administrators of shard clusters should generally be familiar with
operation the of sharding in MongoDB. See the ":doc:`/sharding`"
document for more information.

Config Servers
~~~~~~~~~~~~~~

The :term:`configdb` provides a map of objects to shards, which is
updated as :term:`chunks` are migrated between nodes. Because
configuration databases need to be running and access able in order to
successfully access a shard cluster, monitoring these nodes to ensure
that they remain up and accessible is crucial.

Balancing and Chunk Distribution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The most effective :term:`shard` clusters depend on data being
balanced between the shards. MongoDB has a background :term:`balancer`
process that distributes data such that chunks are always optimally
distributed among the nodes. Issue the following command when
connected to the :option:`mongos` by way of the  :option:`mongo`
shell: ::

        db.printShardingStatus();

This returns an overview of the shard cluster including the database
name, and a list of the chunks.

Stale Locks
~~~~~~~~~~~

In some situations the lock that the balancer uses to initiate and
oversee the balancing process can become stale and prevent additional
balancing from occurring.

To check the state of the balancing lock, connect to a
:option:`mongos` instance using the :doc:`mongo shell
</utilities/mongo>`" and issue the following two commands: ::

     use config
     db.locks.find( { _id : "balancer" } )

Correlate these locks with running `mongos` and determine
