===========================
Monitoring Database Systems
===========================

.. default-domain:: mongodb

Monitoring is a critical component of all database administration. A
firm grasp of MongoDB's reporting will allow you to assess the state
of your database and maintain your deployment without crisis.
Additionally, a sense of MongoDB's normal operational parameters will
allow you to diagnose issues as you encounter them, rather than
waiting for a crisis or failure.

This document provides an overview of the available tools and data
provided by MongoDB as well as introduction to diagnostic strategies,
and suggestions for monitoring instances in MongoDB's replica sets and
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

   TODO: Do we want to include printShardingStatus?

   MongoDB provides a :ref:`REST interface <rest-interface>` that
   displays an overview of this data in web-access able interface.

   `10gen <http://10gen.com/>`_ provides a hosted monitoring service
   which collects and aggregates these data to provide insight into
   the performance and operation of MongoDB deployments. See the
   `MongoDB Monitoring Service (MMS) <http://mms.10gen.com/>`_ and the
   `MMS documentation <http://mms.10gen.com/help/>`_ for more
   information.

Monitoring Tools
----------------

There are two primary methods for collecting data regarding the state
of a running MongoDB instance. First, there are a set of tools
distributed with MongoDB that provide real-time reporting of activity
on the database. Second, several :doc:`database commands
</reference/commands>` return statistics regarding the current
database state with greater fidelity. Both methods allow you to
collect data that answers a different set of questions, and are useful
in different contexts.

This section provides an overview of these utilities and statistics,
along with an example of the kinds of questions that each method is
most suited to help you address.

Utilities
~~~~~~~~~

The MongoDB distribution includes a number of utilities that return
statistics about instances' performance and activity quickly. These
are typically most useful for diagnosing issues and assessing normal
operation.

:program:`mongotop`
```````````````````

:program:`mongotop` tracks and reports the current read and write
activity of a MongoDB instance. :program:`mongotop` provides
per-collection visibility into use. Use :program:`mongotop` to verify
that activity and use match expectations.

.. seealso:: ":doc:`/reference/mongotop`."

:program:`mongostat`
```````````````````

:program:`mongostat` captures and returns counters of database
operations. :program:`mongostat` reports operations on a per-type
(e.g. insert, query, update, delete, etc.) basis. This format makes it
easy to understand the distribution of load on the server. Use
:program:`mongostat` to understand the distribution of operation types
and to inform capacity planning.

.. seealso:: ":doc:`/reference/mongostat`."

.. _rest-interface:

REST Interface
``````````````

MongoDB provides a :term:`REST` interface that exposes a diagnostic
and monitoring information in a simple web page. Enable this by
setting :setting:`rest` to ``true``, and access this page via the
local host interface using the port numbered 1000 more than that the
database port. In default configurations the REST interface is
accessible on ``28017``. For example, to access the REST interface on a 
locally running mongod instance: http://localhost:28017

Statistics
~~~~~~~~~~

The :program:`mongo` shell provides a number of commands that return
statistics about the state of the MongoDB instance. These data may
provide finer granularity regarding the state of the MongoDB instance
than the tools above. Consider using their output in scripts and
programs to develop custom alerts, or modifying the behavior of your
application in response to the activity of your instance.

serverStatus
````````````

Access :doc:`serverStatus data </reference/server-status/>` by way of
the :dbcommand:`serverStatus` command. This :term:`JSON document`
contains a general overview of the state of the database, including
disk usage, memory use, connection, journaling, index accesses. The 
command returns quickly and does not impact MongoDB performance.

While this output contains a (nearly) complete account of the state of
a MongoDB instance, in most cases you will not run this command
directly. Nevertheless, all administrators should be familiar with the
data provided by :dbcommand:`serverStatus`.

.. seealso:: :func:`db.stats()` and :doc:`serverStatus data
   </reference/server-status/>`.

replSetGetStatus
````````````````

View the :doc:`replSetGetStatus data </reference/replica-status>` with
the :dbcommand:`replSetGetStatus` command. The document returned by
this command reflects the state and configuration of the replica
set. Use this data to ensure that replication is properly configured,
and to check the connections between the current host and the members
of the replica set.

.. seealso:: ":func:`rs.status()`" and :doc:`/reference/replica-status`

dbStats
```````

The :doc:`dbStats data </reference/database-statistics>` is accessible
by way of the :dbcommand:`dbStats` command. This command returns
a document that contains data reflecting the amount of storage used
and data contained in the database, as well as object, collection, and
index counters among other relevant information. Use this data to
track the state and size of a specific database, to compare
utilization between databases, to determine average object size.

TODO: clarify the last sentence.

.. seealso:: ":func:`db.stats()`" and
   ":doc:`/reference/database-statistics`."

collStats
`````````

The :doc:`collStats data </reference/collection-statistics>` is
accessible using the :dbcommand:`collStats`. command. It provides
statistics that resemble :dbcommand:`dbStats` on the collection level:
this includes a count of the objects in the collection, the size of
the collection, the amount of disk space used by the collection, and
information about the indexes.

.. seealso:: ":func:`db.printCollectionStats()`" and
   ":doc:`/reference/collection-statistics`."

Diagnosing Performance Issues
-----------------------------

Degraded performance in MongoDB can be the result of an array of
causes, and is typically a function of the relationship between the
quantity of data stored in the database, the amount of system RAM, the
number of connections to the database, and the amount of time the
database spends in a lock state.

In some cases performance issues may be transient and related to
traffic load or the availability of hardware on the host system, in
other situations, performance issues may indicate that the database
may be operating at capacity and that it's time to add additional
capacity to the database.

TODO: what about mentioning poor/inapropriate indexing, bad schema 
design or data access patterns 


Locks
~~~~~

MongoDB uses a locking system to ensure consistency; however, if
certain operations are long-running, or a queue forms, performance
slows as requests and operations wait for the lock. Because lock
related slow downs can be intermittent, look to the data in the
:ref:`globalLock` section of the :dbcommand:`serverStatus` response to
asses if the lock has been a challenge to your performance. If
:status:`globalLock.currentQueue.total` is consistently high, then
there is a chance that a large number of requests are waiting for a
lock. This indicates a possible concurrency issue that might effect
performance.

If :status:`globalLock.toalTime` is high in context of
:status:`uptime` then the database has existed in a lock state for a
significant amount of time. If :status:`globalLock.ratio` is also
high, MongoDB has likely been processing a large number of long
running queries. Long queries are often the result of a number of
factors: ineffective use of indexes, non-optimal schema design, poor
query structure, system architecture issues, or insufficient RAM
resulting in :ref:`page faults <administration-monitoring-page-faults>`
and disk reads.

Memory Usage
~~~~~~~~~~~~

Because MongoDB uses memory mapped files to store data, given a data
set of sufficient size, the MongoDB process will allocate all memory
available on the system for its use. Because of the way operating
systems function, the amount of allocated RAM is not a useful reflection 
of MongoDB's state.

While this is part of the design, and affords MongoDB superior
performance, the memory mapped files make it difficult to determine if
the amount of RAM is sufficient for the data set. Consider
:ref:`memory usage statuses <memory-status>` to better understand
MongoDB's memory utilization. Check the resident memory use
(i.e. :status:`mem.resident`:) if this exceeds the amount of system
memory *and* there's a significant amount of data on disk that isn't
in RAM, you may have exceeded the capacity of your system.

Also check the amount of mapped memory (i.e. :status:`mem.mapped`.) If
this value is greater than the amount of system memory, some
operations will require disk access :term:`page faults` to read data 
from virtual memory with deleterious effects on performance.

.. _administration-monitoring-page-faults:

Page Faults
~~~~~~~~~~~

Page faults represent the number of times that MongoDB requires data
not located in physical memory, and must read from virtual memory. To
check for page faults, see the :status:`extra_info.page_faults` value
in the :dbcommand:`serverStatus` command. This data is only available
on Linux systems.

Alone, page faults are minor and complete quickly; however, in aggregate,
large numbers of page fault typically indicate that MongoDB is reading
too much data from disk and can indicate a number of underlying causes
and recommendations.

TODO: mention MongoDB's use of yield on fault to alleviate this concurrency issue

If possible, increasing the amount of RAM accessible to MongoDB may
help reduce the number of page faults. If this is not possible, for
some deployments consider increasing the size of your :term:`replica
set` and distribute read operations to :term:`secondary` members of
the replica sets; for other deployments, add one or more :term:`shards
<shard>` to a :term:`shard cluster` to distribute load among MongoDB
instances.

TODO: Not sure we want to mention secondary reads as a solution for page faults. 

Number of Connections
~~~~~~~~~~~~~~~~~~~~~

In some cases, the number of connections between the application layer
(i.e. clients) and the database can overwhelm the ability of the
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

TODO: Mention the ulimit setting which can limit the max number of conns
TOOD: Mention the max number of conns is 20k

If requests are high because there are many concurrent application
requests, the database may have trouble keeping up with demand. If
this is the case, then you will need to increase the capacity of your
deployment. For read-heavy applications increase the size of your
:term:`replica set` and distribute read operations to
:term:`secondary` members. For write heavy applications, deploy
:term:`sharding` and add one or more :term:`shards <shard>` to a
:term:`shard cluster` to distribute load among :program:`mongod`
instances.

Spikes in the number of connections can also be the result of
application or driver errors. Extremely high numbers of connections,
particularly without corresponding workload is often indicative of a
driver or other configuration error.

TODO: Mention connection pooling in the 10gen official drivers..

.. _database-profiling:

Database Profiling
~~~~~~~~~~~~~~~~~~

MongoDB contains a database profiling system that can help identify
inefficient queries and operations. Enable the profiler by setting the
:dbcommand:`profile` value using the following command in the
:program:`mongo` shell:

.. code-block:: javascript

   db.setProfilingLevel(1)

TODO: Add examples of setting profile level with ms:w
TODO: mention ability to getProfilingLevel() and that it doesn't return the ms...

The following profiling levels are available:

TODO: Can you make this chart render with one line per row?

=========  ==================================
**Level**  **Setting**
---------  ----------------------------------
   0       Off. No profiling.
   1       On. Only includes slow operations.
   2       On. Includes all operations.
=========  ==================================

TODO: make this note have a line break b/w chart and note

.. note::

   Because the database profiler can have an impact on the
   performance, only enable profiling for strategic intervals and as
   minimally as possible on production systems.

   You may enable profiling on a per-:program:`mongod` basis. This
   setting will not propagate across a :term:`replica set` or
   :term:`shard cluster`.

TODO: mention that profiling does not persist b/w restarts for any mongod

See the output of the profiler in the ``system.profile`` collection of
your database. You can specify the :setting:`slowms` to set a
threshold above which the profiler considers operations "slow" and
thus included in the level "``1``" profiling data. Additionally,
:program:`mongod` records all "slow" queries to its :setting:`log
<dbpath>`, as defined by :setting:`slowms`.

You can view the profiler's output in "``show profile``" in the
:program:`mongo` shell, with the following operation.

.. code-block:: javascript

   db.system.profile.find( { millis : { $gt : 100 } } )

This returns all operations that lasted longer than 100 milliseconds.
Ensure that the value specified here (i.e. ``100``) is above the
:setting:`slowms` threshold.

.. seealso:: ":doc:`/applications/optimization`" addresses strategies
   that may improve the performance of your database queries and
   operations.

.. _replica-set-monitoring:

TODO: Is there more info on profiling?

Replication and Monitoring
--------------------------

The primary administrative concern that requires monitoring with
replica sets, beyond the requirements for any MongoDB instance is
"replication lag." This refers to the amount of time that it takes a
write operation on the :term:`primary` to replicate to a
:term:`secondary`. Some very small delay period may be acceptable;
however, as replication lag grows two significant problems emerge:

- First, operations that have occurred in the period of lag are not
  replicated to one or more secondaries. If you're using replication
  to ensure data persistence, exceptionally long delays may impact the
  integrity of your data set.

- Second, if the replication lag exceeds the length of the operation
  log (":term:`oplog`") then the secondary will have to resync all data 
  from the :term:`primary` and rebuild all indexes. In normal 
  circumstances this is uncommon given the typical size of the oplog, 
  but presents a major problem.

Replication issues are most often the result of network connectivity
issues between members or a :term:`primary` instance that does not
have the resources to support application and replication traffic. To
check the status of a replica use the :dbcommand:`replSetGetStatus` or
the following helper in the shell:

.. code-block:: javascript

   rs.status()

See the ":doc:`/reference/replica-status`" document for a more in
depth overview view of this output. In general watch the value of
:status:`optimeDate`. Pay particular attention to the difference in
time between the :term:`primary` and the :term:`secondary` members.

TODO: This needs to be reworked.  It's not configurable at runtime after
the first run: http://www.mongodb.org/display/DOCS/Replication+Oplog+Length
The size of the operation log is configurable at runtime using the
:option:`--oplogSize <mongod --oplogSize>` argument to the
:program:`mongod` command, or preferably the :setting:`oplogSize` in
the MongoDB configuration file. The default size, is 5% of total available 
disk space on 64-bit systems.

.. seealso:: ":doc:`/tutorial/change-oplog-size`"

Sharding and Monitoring
-----------------------

In most cases the components of :term:`shard clusters <shard cluster>`
benefit from the same monitoring and analysis as all other MongoDB
instances. Additionally, shard clusters require monitoring to ensure
that data is effectively distributed among nodes and that sharding
operations are functioning appropriately.

.. seealso:: See the ":doc:`/core/sharding`" document for more
   information.

Config Servers
~~~~~~~~~~~~~~

The :term:`configdb` provides a map of documents to shards. The
cluster updates this map as :term:`chunks <chunk>` move between
shards. When a configuration server becomes inaccessible, some
sharding operations like moving chunks and starting :program:`mongos`
instances become unavailable. However, shard clusters remain
accessible from already-running mongo instances.

Because inaccessible configuration servers can have a serious impact
on the availability of a shard cluster, you should monitor the
configuration servers to ensure that your shard cluster remains well
balanced and that :program:`mongos` instances can restart.

Balancing and Chunk Distribution
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The most effective :term:`shard clusters <shard cluster>` require that
:term:`chunks <chunk>` are evenly balanaced between the shards. MongoDB 
has a background :term:`balancer` process that distributes data such that 
chunks are always optimally distributed among the :term:`shards <shard>`. 
Issue the :func:`db.printShardingStatus()` or :func:`sh.status()`
command to the :program:`mongos` by way of the :program:`mongo`
shell. This returns an overview of the shard cluster including the
database name, and a list of the chunks.

Stale Locks
~~~~~~~~~~~

In nearly every case, all locks used by the balancer are automatically
released when they become stale. However, because any long lasting
lock can block future balancing, it's important to insure that all
locks are legitimate. To check the lock status of the database,
connect to a :program:`mongos` instance using the :program:`mongo`
shell. Issue the following command sequence to switch to the 
``config`` database and display all outstanding locks on the shard database:

.. code-block:: javascript

   use config
   db.locks.find()

For active deployments, the above query might return a useful result
set. The balancing process, which originates on a randomly selected
:program:`mongos`, takes a special "balancer" lock that prevents other
balancing activity from transpiring. Use the following command, also
to the ``config`` database, to check the status of the "balancer"
lock.

.. code-block:: javascript

   db.locks.find( { _id : "balancer" } )

If this lock exists, make sure that the balancer process is actively
using this lock.
