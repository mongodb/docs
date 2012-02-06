===========================
Monitoring Database Systems
===========================

.. default-domain:: mongodb

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

   `10gen <http://10gen.com>`_ provides a hosted monitoring service
   which collects and aggregates these data to provide insight into
   the performance and operation of MongoDB deployments. See the
   `MongoDB Monitoring Service (MMS) <http://mms.10gen.com/>`_ and the
   `MMS documentation <http://mms.10gen.com/help/>`_ for more
   information.

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

:program:`mongotop` tracks and reports the current read and write
activity of a MongoDB instance. :program:`mongotop` provides per-collection
visibility into use. Use :program:`mongotop` to verify that activity and use
match expectations.

.. seealso:: ":doc:`/reference/mongotop`."

monostat
````````

:program:`mongostat` captures and returns counters of database
operations. :program:`mongostat` reports operations on a per-type
(e.g. insert, query, update, delete, etc.) basis that makes it easy to
understand the nature of the load on the server. Use
:program:`mongostat` to understand the distribution of operation types
and to inform capacity development plans.

.. seealso:: ":doc:`/reference/mongostat`."

.. _rest-interface:

REST Interface
``````````````

MongoDB also provides a :term:`REST` interface that exposes a
diagnostic and monitoring information in a simple web page. Enable
this by setting :setting:`rest` to ``true``, and access this page via
the local host interface using the port numbered 1000 more than that
the database port: in default configurations this is ``28017``.

Statistics
~~~~~~~~~~

The MongoDB interface provides a number of commands that return
statistics about the state of the MongoDB instance. These commands
useful for capturing the state of the MongoDB instance. Consider using
their output in scripts and programs to develop custom alerts, or
modifying the behavior of your application in response to the activity
of your instance.

serverStatus
````````````

Return the :doc:`serverStatus data </reference/server-status/>` using
the :dbcommand:`serverStatus` command. The document returned
contains a general overview of the state of the database, including
disk usage, memory use, connection, journaling, access. The command is
quick to run and does not impact the performance of your MongoDB
instance.

You can find a near complete account of the state of a MongoDB
instance in the output of :dbcommand:`serverStatus`
command. Although, in most cases you will not run this command
directly to assess the status of a MongoDB instance, it's a good idea
to be familiar with the data provided by
:dbcommand:`serverStatus`.

replSetGetStatus
````````````````

View the :doc:`replSetGetStatus data </reference/replica-status>` with the
:dbcommand:`replSetGetStatus` command. The document returned by this
command contains information regarding the state and configuration of
the replica set. Use this data to ensure that replication is properly
configured, and to check the connections between the current host and
the members of the replica set.

.. seealso:: ":js:func:`rs.status()`."

dbStats
```````

The :doc:`dbStats data </reference/database-statistics>` is accessible
by way of the :dbcommand:`dbStats` command. This command returns
a document that contains data reflecting the amount of storage used
and data contained in the database, as well as object, collection, and
index counters among other relevant information. Use this data to
track the state and size of a specific database, to compare
utilization between databases, or to determine average object size.

.. seealso:: ":js:func:`db.stats()`."

collStats
`````````

The :doc:`collStats data </reference/collection-statistics>` is
accessible using the :dbcommand:`collStats`. command. It
provides statistics that resemble :dbcommand:`dbStats` on the
collection level: this includes a count of the objects in the
collection, the size of the collection, the amount of disk space used
by the collection, and information about the indexes.

.. seealso:: ":js:func:`db.printCollectionStats()`"

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
performance slows as requests and operations wait for the lock. To
determine if this effects your database, begin by checking the data
conveyed in the :ref:`globalLock` section of the
:dbcommand:`serverStatus` response. If
:status:`globalLock.currentQueue.total` is consistently high,
then there is a chance that a large number of requests waiting for a
lock. This indicates a possible concurrency issue that might effect
performance.

If :status:`globalLock.toalTime` is high in context of
:status:`uptime` then the database has existed in a lock state
for a significant amount of time. If :status:`globalLock.ratio`
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
it may make it difficult to determine if the amount of RAM is
sufficient for the data set. Consider :ref:`memory usage statuses
<memory-status>` to better understand MongoDB's memory utilization.

Check the resident memory use (i.e. :status:`mem.resident`:)
if this exceeds the amount of system memory *and* there's a
significant amount of data on disk that isn't in RAM, you have
exceeded the capacity of your system. Additionally, if the amount of
mapped memory (i.e. :status:`mem.mapped`) is greater than the
amount of system memory, some operations will require disk access to
read data from virtual memory with deleterious effects on performance.

.. _administration-monitoring-page-faults:

Page Faults
~~~~~~~~~~~

Page faults represent the number of times that MongoDB requires data
not located in physical memory, and must read from virtual memory. To
check for page faults, see the
:status:`extra_info.page_faults` value in the
:dbcommand:`serverStatus` command. This data is only available
on Linux systems.

Alone page faults minor and complete quickly; however, in aggregate,
large numbers of page fault typically indicate that MongoDB is reading
too much data from disk and can indicate a number of underlying causes
and recommendations.

If possible, increasing the amount of RAM accessible to MongoDB may
help reduce the number of page faults. If this is not possible, for
some deployments consider increasing the size of your :term:`replica
set` and distribute read operations to :term:`secondary` members of
the replica sets; for other deployments, add one or more :term:`shards
<shard>` to a :term:`shard cluster` to distribute load among MongoDB
instances.

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

If requests are high because there are many concurrent application
requests, and the database is keeping up. If this is the case, then
you will need increase the size of your deployment. Increase the size
of your :term:`replica set` and distribute read operations to
:term:`secondary` members. Add one or more :term:`shards <shard>` to a
:term:`shard cluster` to distribute load among :program:`mongod`
instances.

Spikes in the number of connections can also be the result of
application or driver errors. Extremely high numbers of connections
is often indicative of a driver or other configuration error.

.. _database-profiling:

Database Profiling
~~~~~~~~~~~~~~~~~~

MongoDB contains a database profiling system that can help identify
inefficient queries and operations. Enable the profiler by setting the
:dbcommand:`profile` value using one of the following command in
the :program:`mongo` shell. These functions are equivalent:

.. code-block:: javascript

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
   performance, only enable profiling for strategic intervals and as
   minimally as possible on production systems.

   You may enable profiling on a per-:program:`mongod` basis. This
   setting will not propagate across a :term:`replica set` or
   :term:`shard cluster`.

See the output of the profiler in the :program:`mongod` log and use
this information to optimize your queries and database. You can
specify the :setting:`slowms` to set a threshold above which
the profiler considers operations "slow" and thus included in the
level "``1``" profiling data. :program:`mongod` writes the output of
the profiler in the ``system.profile`` collection. You can view the
profiler with the "``show profile``" in the :program:`mongo` shell. You
can query the collection directly. For example the following command
will return all operations that lasted longer than 100 milliseconds:

.. code-block:: javascript

   db.system.profile.find( { millis : { $gt : 100 } } )

Ensure that the value specified here (i.e. ``100``) is above the
:setting:`slowms` threshold.

.. seealso:: ":doc:`/applications/optimization`" address strategies
   you can use to improve the performance of your database queries and
   operations.

.. _replica-set-monitoring:

Replication and Monitoring
--------------------------

The primary administrative concern that requires monitoring with
replica sets, beyond the requirements for any MongoDB instance is
"replication lag." This refers to the amount of time that it takes a
write operation on the :term:`primary` to replicate to a
:term:`secondary`. Some very small delay period may be acceptable, as
replication lag grows two significant problems emerge:

- First, operations that have occurred in the period of lag are not
  replicated to one or more secondaries. If you're using replication
  to ensure data persistence, exceptionally long delays before
  replication may impact the integrity of your data set.

- Second, if the replication lag exceeds the length of the operation
  log (":term:`oplog`") then secondary will have to resync from the
  master. If this happens regularly, the secondaries may have to
  resync unnecessarily increasing the load on the primary instance.

Replication issues are most often the result of network connectivity
issues between members or a :term:`primary` instance that does not
have the resources to support application and replication traffic. To
check the status of a replica use the :dbcommand:`replSetGetStatus` or
the following helper in the shell: ::

     rs.status()

See the ":doc:`/reference/replica-status`" document for a more in depth
overview view of this output. In general watch the following two data
points:

- :status:`optimeDate`. Pay particular attention to the difference in
  time between the :term:`primary` and the :term:`secondary` members.

- :status:`lastHeartbeat`, which reflects the last time each
  member had any contact to the current member. Compare this to the
  :status:`date` which reflects the current date and time of
  the member you're currently connected to.

The size of the operation log is configurable at runtime using the
:option:`mongod --oplogsize` argument to the :program:`mongod` command,
or preferably the :setting:`oplogsize` in the MongoDB
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

The :term:`configdb` provides a map of documents to shards. The
cluster updates this map as :term:`chunks <chunk>` move between
shards. When a configuration server becomes inaccessible, some
sharding operations like moving chunks and starting :program:`mongos`
instances become unavailable. However, shard clusters remain
accessible from already-running mongo instances.

Because inaccessible configuration servers can have a serious impact
on the availability of a shard cluster, you should keep uptime
monitoring of the configuration servers to ensure that your shard
cluster remains well balanced and that :program:`mongos` instances can
restart.

Balancing and Chunk Distribution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The most effective :term:`shard clusters <shard cluster>` require that
:term:`chunks <chunk>` migrate between the shards. MongoDB has a background
:term:`balancer` process that distributes data such that chunks are
always optimally distributed among the :term:`shards <shard>`. Issue
the :js:func:`db.printShardingStatus()` or :js:func:`sh.status()`
command to the :program:`mongos` by way of the :program:`mongo`
shell. This returns an overview of the shard cluster including the
database name, and a list of the chunks.

Stale Locks
~~~~~~~~~~~

In nearly every case, all locks used by the balancer are automatically
released when they become stale. However, because any long lasting
lock can block future balancing, it's important to insure that all
locks are legitimate. To check the lock status of the database,
connect to a :program:`mongos` instance using the :doc:`mongo shell
</reference/mongo>`". Issue the following command sequence to switch
to the config database and display all outstanding locks on the shard
database: ::

     use config
     db.locks.find()

For active deployments, the above query might return an useful result
set. The balancing process, which originates on a randomly selected
:program:`mongos`, takes a special "balancer" lock that prevents other
balancing activity from transpiring. Use the following command, also
to the ``config`` database, to check the status of the "balancer"
lock. ::

     db.locks.find( { _id : "balancer" } )

If this lock exists, make sure that the balancer process is actively
using this lock.

TODO figure out how to move forward with this.
