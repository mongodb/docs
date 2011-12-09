===========================
Monitoring Database Systems
===========================

Monitoring is a critical component in all database administration
work. A firm grasp of MongoDB's reporting approach allow you to
effectively assess and maintain your deployment proactively.
Additionally, a sense of MongoDB's and normal parameters will allow
you to capably diagnose issues as you encounter them. This document
provides an overview of the available tools and data provided by
MongoDB as well as introduction to diagnostic strategies, and
suggestions for monitoring instances in MongoDB's replica sets and
shard clusters.

.. seealso::

   For more information about monitoring tools, see:

   - :doc:`/reference/mongostat`.
   - :doc:`/reference/mongotop`.

   For more background on various other MongoDB status outputs see:

   - :doc:`/reference/server-status`
   - :doc:`/reference/replica-status`
   - :doc:`/reference/database-statistics`
   - :doc:`/reference/collection-statistics`

   MongoDB also provides a :ref:`REST interface <rest-interface>` that
   provides an overview of this diagnostic data in web-access able
   interface.

   10gen provides a hosted monitoring service which collects and
   aggregates these data to provide insight into the performance and
   operation of MongoDB deployments. See the `MongoDB Monitoring
   Service (MMS) <http://mms.10gen.com/>`_ and the `MMS documentation
   <http://mms.10gen.com/help/>`_ for more information.

Monitoring Tools
----------------

MongoDB provides two main methods and several operation for collecting
that reflects the state and condition of a running MongoDB
instance. First, there are a set of tools accessible from the system
shell that provide real time reporting of activity on the
database. Second, several :doc:`database commands
</reference/commands>` return fine grained statistics about the
current database state. Each method provides a data that answer a
different set of questions, and are useful for monitoring different
context kinds of activity.

This section provides an overview of these utilities and statistics,
along with an example of the kinds of questions that each method is
most suited to help you address.

Utilities
~~~~~~~~~

The MongoDB distribution includes a number of binary programs that are
useful for quickly returning statistics about the instances
performance and activity. These are typically useful for diagnosing
current issues with the database.

mongotop
````````

:option:`mongotop` tracks and reports the current read and write
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

.. _rest-interface:

REST Interface
``````````````

MongoDB also provides a :term:`REST` interface that exposes a
diagnostic and monitoring information in a simple web page. Enable
this by setting :mongodb:setting:`rest` to ``true``, and access this page via
the local host interface using the port numbered 1000 more than that
the database port: in default configurations this is ``28017``.

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
:command:`serverStatus` response. If :mongodb:status:`globalLock.currentQueue.total`
is consistently high, then there are probably a large number of
requests waiting for a lock. This indicates a possible concurrency
issue that might effect performance.

If :mongodb:status:`globalLock.toalTime` is high in context of
:mongodb:status:`uptime` then the database has existed in a lock state
for a significant amount of time. If :mongodb:status:`globalLock.ratio`
is also high, MongoDB has likely been processing a large number of
long running queries. Long queries are often the result of a number of
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

See if the amount of resident memory use (i.e. :mongodb:status:`mem.resident`)
exceeds the amount of system memory *and* there's a significant amount
of data on disk that isn't in ram. Additionally If the amount of
mapped memory (i.e. :mongodb:status:`mem.mapped`) is greater than the amount
of system memory, some operations will require disk access to read
data from virtual memory with deleterious effects on performance.

.. _administration-monitoring-page-faults:

Page Faults
~~~~~~~~~~~

Page faults represent the number of time that MongoDB requires data
located in virtual memory but is loaded in physical memory. To check
for page faults, see the :mongodb:status:`extra_info.page_faults` value in the
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
other deployments, add one or more :term:`shards <shard>` to a
:term:`shard cluster` to distribute load among MongoDB instances.

Number of Connections
~~~~~~~~~~~~~~~~~~~~~

In some cases, the number of connections between the application layer
(i.e. clients) and the database, this can overwhelm the ability of the
server to handle requests which can produce performance
irregularities. Check the following fields in the :doc:`serverStatus
</reference/server-status>` document:

- :mongodb:status:`globalLock.activeClients` contains a counter of the total
  number of clients with active operations in progress or queued.

- :mongodb:status:`connections` is a container for the following two fields:

  - :mongodb:status:`connections.current` the total number of current clients
    that connect to the database instance.

  - :mongodb:status:`connections.available` the total number of unused
    collections available for new clients.

If requests are high because there are a lot of concurrent application
requests, and the database is keeping up. If this is the case, then
you will need to add additional nodes to your cluster. Increase the
size of your :term:`replica set` and distribute read operations to
:term:`secondary` nodes, or one or more :term:`shards <shard>` to a
:term:`shard cluster` to distribute load among MongoDB instances.

Spikes in the number of connections can also be the result of
application or driver errors. Extremely high numbers of connections
is often indicative of a driver or other configuration error.

.. _database-profiling:

Database Profiling
~~~~~~~~~~~~~~~~~~

MongoDB contains a database profiling system that can help identify
inefficient queries and operations. Enable the profiler by setting the
``profile`` value using one of the following command in the :option:`mongo`
shell. These functions are equivalent: ::

     db.runCommand( { profile: 1 } )
     db.setProfilingLevel(1)

The following profiling levels are available:

=========  ==================================
**Level**  **Setting**
---------  ----------------------------------
   0       Off. No profiling.
   1       On. Only includes slow operations.
   2       On. Includes all operations.
=========  ==================================

.. note::

   Because the database profiler can have an impact on the
   performance, and so should only be enabled for strategic intervals
   and as minimally as possible on production systems.

   Profiling is enabled on a per-:option:`mongod` basis. This setting
   will not propagate throughout a :term:`replica set` or :term:`shard
   cluster`.

See the output of the profiler in the ``mongod`` log and use this
information to optimize your queries and database. You you can specify
the :mongodb:setting:`slowms` to set a threshold above which
operations are considered "slow" and thus included in the level
"``1``" profiling data. The output of the profiler is collected in the
``system.profile`` collection. You can view the profiler with the
"``show profile``" shell command :option:`mongo`. You can query the
collection directly. For example the following command will return all
operations that lasted longer than 100 milliseconds: ::

     db.system.profile.find( { millis : { $gt : 100 } } )

Ensure that the value specified here (i.e. ``100``) is above the
:mongodb:setting:`slowms` threshold.

.. seealso:: ":doc:`/optimization`" address strategies you can use to
             improve the performance of your database queries and
             operations.

.. _replica-set-monitoring:

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

- :mongodb:status:`optimeDate`. Pay particular attention to the difference in
  time between the primary and the secondary nodes.

- :mongodb:status:`lastHeartbeat`, which reflects the last time each node had
  any contact to the current node. Compare this to the :mongodb:status:`date`
  which reflects the current date and time of the node you're
  currently connected to.

The size of the operation log is configurable at runtime using the
:option:`mongod --oplogsize` argument to the :command:`mongod`
command, or preferably the :mongodb:setting:`oplogsize` in the MongoDB
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
operation the of sharding in MongoDB. See the ":doc:`/core/sharding`"
document for more information.

Config Servers
~~~~~~~~~~~~~~

The :term:`configdb` provides a map of documents to shards. The map is
updated as :term:`chunks <chunk>` are migrated between shards. When a
configuration server becomes inaccessible, some sharding operations
like moving chunks and starting :option:`mongos` instances become
unavailable. However, shard clusters remain accessible from
already-running mongo instances.

Because inaccessible configuration servers can have a serious impact
on the availability of a shard cluster, you should keep uptime
monitoring of the configuration servers to ensure that your shard
cluster remains well balanced and that :option:`mongos` instances can
restart.

Balancing and Chunk Distribution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The effective most :term:`shard` clusters depend on data being
balanced between the shards. MongoDB has a background :term:`balancer`
process that distributes data such that chunks are always optimally
distributed among the nodes. Issue the
:js:func:`db.printShardingStatus()` or :js:func:`sh.status()` command
command to the :option:`mongos` by way of the :option:`mongo`
shell. This returns an overview of the shard cluster including the
database name, and a list of the chunks.

For clusters with only a few shards and a small amount of data,
verifying that chunks are evenly distributed can be done by way of
approximation. For larger clusters, use the following shell function
to display the distribution of chunks among shards.

TODO create a shell function for showing
 ::

   for shard in cluster; do
       print "{ shardName: $shard, numChunks }";
   done

.. run group command against chunk collection inside config server

Stale Locks
~~~~~~~~~~~

In nearly every case all locks are automatically released when they
become stale. However, because any long lasting lock can
block. balancing. To check the lock status of the database, connect to
a :option:`mongos` instance using the :doc:`mongo shell
</reference/mongo>`". Issue the following command sequence to switch
to the config database and display all outstanding locks on the shard
database: ::

     use config
     db.locks.find()

For active deployments, the above query might return an useful result
set. The balancing process, which originates on a randomly selected
``mongos``, takes a special "balancer" lock that prevents other
balancing activity from transpiring. Use the following command, also
to the ``config`` database, to check the status of the "balancer"
lock. ::

     db.locks.find( { _id : "balancer" } )

Ensure that this lock is being used and hasn't become stale.

TODO figure out how to move forward with this.
