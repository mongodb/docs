=======================
Server Status Reference
=======================

The :command:`serverStatus` returns a collection of information that
reflects the database's status. These data are useful for diagnosing
and assessing the performance of your MongoDB instance. This reference
catalogs each datum included in the output of this command and
provides context for using this data to more effectively administer
your database.

Basic Information
-----------------

.. describe:: host

   The ``host`` field contains the system's hostname. In Unix/Linux
   system, this should be the same as the output of the ``hostname``
   command.

.. describe:: version

   The ``version`` field contains the version of MongoDB running on
   the current :term:`mongod` or :term:`mongos` instance.

.. describe:: process

   The ``process`` field identifies which kind of MongoDB instance is
   running. Possible values are:

   - ``mongos``
   - ``mongod``

.. describe:: uptime

   The value of the ``uptime`` field corresponds to the number of
   seconds that the ``mongos`` or ``mongod`` process has been
   active.

.. describe:: uptimeEstimate

   ``uptimeEstimate`` provides the uptime as calculated from MongoDB's
   internal course-grained time.

TODO what is course-grained timing in this context

.. describe:: localTime

   The ``localTime`` value is the current time, according to the
   server, in UTC specified in an ISODate format.

globalLock
----------

.. describe:: globalLock

   The ``globalLock`` data structure contains information regarding
   the database's current lock state, historical lock status, current
   operation queue, and the number of active clients.

.. describe:: globalLock.toalTime

   The value of ``globalLock.totalTime`` represents the time, in
   microseconds, since the database last started, that the
   ``globalLock`` has existed.

   Larger values indicate that the database has been unavailable for
   more time; however, :status:`uptime` provides context for this
   datum. Also consider the effect of long-running administrative
   operations on this value.

TODO factcheck

.. describe:: globalLock.lockTime

   The value of ``globalLock.lockTime`` represents the time, in
   microseconds, since the database last started, that the
   ``globalLock`` has been *held*.

   Consider this value in combination with
   :status:`globalLock.totalTime`, which is calculated in the
   :status:`globalLock.ratio` value. If this value is small but
   :status:`globalLock.totalTime` is high the ``globalLock`` has
   typically been held frequently for shorter periods of time, which
   may be indicative of a more normal use pattern. If the
   :status:`globalLock.lockTime`` is higher and the
   :status:`globalLock.totalTime` is smaller (relatively,) then fewer
   operations are responsible for a greater portion of server's use
   (relatively.)

.. describe:: globalLock.ratio

   The value of ``gobalLock.ratio`` displays the relationship between
   :status:`globalLock.lockTime` and :status:`globalLock.totalTime`.

   Low values indicate that the ``globalLock`` has typically been held
   frequently for shorter periods of time. High values indicate that
   the ``globalLock`` has been held infrequently for longer periods of
   time.

.. _globallock-currentqueue:

globalLock.currentQueue
~~~~~~~~~~~~~~~~~~~~~~~

.. describe:: globalLock.currentQueue

   The ``globalLock.currentQueue`` data structure value provides more
   granular information concerning the number of operations queued
   because of a lock.

.. describe:: globalLock.currentQueue.total

   The value of ``globalLock.currentQueue.total`` provides a combined
   total of operations queued waiting for the lock.

   A consistently small queue, particularly of shorter operations
   should cause no concern. Also, consider this value in light of the
   size of queue waiting for the read lock
   (e.g. :status:`globalLock.currentQueue.readers`) and write-lock
   (e.g. :status:`globalLock.currentQueue.readers`) individually.

.. describe:: globalLock.currentQueue.readers

   The value of ``globalLock.currentQueue.readers`` is the number of
   operations that are currently queued and waiting for the
   read-lock. A consistently small write-queue, particularly of
   shorter operations should cause no concern.

.. describe:: globalLock.currentQueue.writers

   The value of ``globalLock.currentQueue.writers`` is the number of
   operations that are currently queued and waiting for the
   write-lock. A consistently small write-queue, particularly of
   shorter operations should cause no concern.

TODO add more information about globalLock.currentQueue data including normal ranges.

globalLock.activeClients
~~~~~~~~~~~~~~~~~~~~~~~~

.. describe:: globalLock.activeClients

   The ``globalLock.activeClients`` data structure provides more
   granular information about the number of connected clients and the
   operation types (e.g. read or write) performed by these clients.

   Use this data to provide context for the :ref:`currentQueue
   <globallock-currentqueue>` data.

.. describe:: globalLock.activeClients.total

   The value of ``globalLock.activeClients.total`` is the total number
   of active client connections to the database. This combines clients
   that are performing read operations
   (e.g. :status:`globalLock.activeClients.readers`) and clients that
   are performing write operations (e.g. :status:`globalLock.activeClients.writers`).

.. describe:: globalLock.activeClients.readers

   The value of ``globalLock.activeClients.readers`` contains a count
   of the active client connections performing read operations.

.. describe:: globalLock.activeClients.writers

   The value of ``globalLock.activeClients.writers`` contains a count
   of active client connections performing write operations.

mem
---

.. describe:: mem

   The ``mem`` data structure holds information regarding the target
   system architecture of ``mongod`` and current memory use.

.. describe:: mem.bits

   The value of ``mem.bits`` is either ``64`` or ``32``, depending the
   target system architecture for which the ``mongod`` instance was
   compiled. In most instances this is ``64``, and this value does not
   change over time.

.. describe:: mem.resident

   The value of ``mem.resident`` is roughly equivalent to the amount
   of RAM, in bytes, currently used by the database process. In normal
   use this value tends to grow. In dedicated database servers this
   number tends to approach the total amount of system memory.

.. describe:: mem.virtual

   ``mem.virtual`` displays the quantity, in bytes, of virtual memory
   used by the ``mongod`` process. In typical deployments this value
   is slightly larger than :status:`mem.mapped`. If this value is
   significantly (i.e. gigabytes) larger than :status:`mem.mapped`,
   this could indicate a memory leak.

   If :term:`journaling` is enabled, then ``mem.virtual`` is twice the
   value of :status:`mem.mapped`.

.. describe:: mem.supported

   ``mem.supported`` is true when the underlying system supports
   extended memory information. If this value is false and the system
   does not support extended memory information, then other
   :status:`mem` values may not be accessible to the database server.

TODO what is extended memory information and how do we collect it?

.. describe:: mem.mapped

   The value of ``mem.mapped`` provides the amount of mapped
   memory. Because MognoDB uses memory-mapped files, this value is
   likely to be to be roughly equivalent to the total size of your
   database or databases.

connections
-----------

.. describe:: connections

   The ``connections`` data structure holds data regarding the
   current connection status and availability of the database
   server. Use these values to asses the current load and capacity
   requirements of the server.

.. describe:: connections.current

   The value of ``connections.current`` corresponds to the number of
   connections to the database server from clients. This number
   includes the current shell session. Consider the value of
   :status:`connections.available` to add more context to this datum.

TODO factcheck current shell connection

.. describe:: connections.available

   ``connections.available`` provides a count of the number of unused
   available connections that the database can provide. Consider this
   value in combination with the value of
   :status:`connections.current` to understand the connection load on
   the database.

extra_info
----------

TODO determine all possible fields in extra_info, and understand use

.. describe:: extra_info

   The ``extra_info`` data structure holds data collected by the
   ``mongod`` instance about the underlying system. Your system may
   only report a subset of these fields.

.. describe:: extra_info.note

   The field ``extra_info.note`` reports that the data in this
   structure depend on the underlying platform, and has the text:
   "fields vary by platform."

.. describe:: extra_info.heap_usage_bytes

   The ``extra_info.heap_usage_bytes`` field is only available on
   Linux systems, and relates the total size in bytes of heap space
   used by the database process.

.. describe:: extra_info.page_faults

   The ``extra_info.page_faults`` field is only available on Linux
   systems, and relates the total number of page faults that require
   disk operations. Page faults refer to operations that require the
   database server to access data which isn't available in active
   memory. The ``page_fault`` counter may increase dramatically during
   moments of poor performance and may be correlated with limited
   memory environments and larger data sets. Limited and sporadic page
   faults do not in and of themselves indicate an issue.

indexCouters
------------

.. describe:: indexCouters

   The ``indexCounters`` data structure contains information about the
   state and use of the indexes in MongoDB.

.. describe:: indexCouters.btree

   The ``indexCounters.btree`` data stricture contains data regarding
   MongoDB's :term:`btree` indexes.

.. describe:: indexCouters.btree.accesses

   ``indexCounters.btree.accesses`` reports the number of times that
   the index has been accessed. This value is the combination of the
   :status:`indexCounters.btree.hits` and
   :status:`indexCounters.btree.misses`. Higher values indicate that
   your database has indexes and that these indexes are being used. If
   this number does not grow over time, this might indicate that your
   indexes do not effectively support your use.

.. describe:: indexCouters.btree.hits

   The ``indexCouters.btree.hits`` value reflects the number of times
   that an index has been access and ``mongod`` is able to return the
   index from memory.

   A higher value indicates that the indexes are being used
   effectively. ``indexCounters.btree.hits`` values that represent a
   greater proportion of the :status:`indexCounters.btree.accesses`
   value, tend to indicate more effective index configuration.

.. describe:: indexCouters.btree.misses

   The ``indexCounters.btree.misses`` value represents the number of
   times that an index page was accessed that was not in memory. These
   "misses," do not indicate a failed query or operation, but rather
   an inefficient use of the index. Lower values in this field
   indicate better index use and likely overall performance as well.

.. describe:: indexCounters.btree.resets

   The ``index Counter.btree.resets`` value reflects the number of
   times that the index counters have been reset since the database
   last restarted. Typically this value is ``0``, but use this value
   to provide context for the data specified by other
   :status:`indexCounters` values.

.. describe:: indexCouters.btree.missRatio

   The ``indexCounters.btree.missRatio`` value is the ratio of
   :status:`indexCounters.btree.hits` to
   :status:`indexCounters.btree.misses` misses. This value is
   typically ``0`` or approaching ``0``.

backgroundFlushing
------------------

.. describe:: backgroundFlushing

   ``mongod`` periodically flushes writes to disk. In the default
   configuration, this happens every 60 seconds. The
   ``backgroundFlushing`` data structure contains data that regarding
   these operations. Consider these values if you have concerns about
   write performance and :ref:`durability <durability-status>`.

.. describe:: backgroundFlushing.flushes

   ``backgroundFlushing.flushes`` is a counter that collects the
   number of times the database has flushed all writes to disk. This
   value will grow as database runs for longer periods of time.

.. describe:: backgroundFlushing.total_ms

   The ``backgroundFlushing.total_ms`` value provides the total number
   of milliseconds (ms) that the ``mongod`` processes have spent
   writing (i.e. flushing) data to disk. Because this is an absolute
   value, consider the value of :status:`backgroundFlishing.flushes`
   and :status:`backgroundFlushing.average_ms` to provide better
   context for this datum.

.. describe:: backgroundFlushing.average_ms

   The ``backgroundFlushing.average_ms`` value describes the
   relationship between the number of flushes and the total amount of
   time that the database has spent writing data to disk. The larger
   :status:`backgroundFlushing.flushes` is, the more likely this value
   is likely to represent a "normal," time; however, this value can be
   skewed by abnormal data.

   Use the :status:`backgroundFlushing.last_ms` to ensure that a high
   average has not been skewed by transient historical issue or a
   random write distribution.

.. describe:: backgroundFlushing.last_ms

   The value of the ``backgroundFlushing.last_ms`` field is the amount
   of time, in milliseconds, that the last flush operation took to
   complete. Use this value to verify that the current performance of
   the server and is in line with the historical data provided by
   :status:`backgroundFlushing.average_ms` and
   :status:`backgroundFlushing.total_ms`.

.. describe:: backgroundFlushing.last_finished

   The ``backgroundFlushing.last_finished`` field provides a timestamp
   from when the last flush operation was completed in the
   :term:`ISODate` format. If this value is more than a few minutes
   old relative to your server's current time and accounting for
   differences in time zone, restarting the database may result in
   some data loss.

   Also consider ongoing operations that might skew this value by
   routinely block write operations.

cursors
-------

.. describe:: cursors

   The ``cursors`` data structure contains data regarding cursor state
   and use.

.. describe:: cursors.totalOpen

   ``cursors.totalOpen`` provides the number of cursors that MongoDB
   is maintaining for clients. Typically this value small or zero;
   however, if there is a queue, or a large number of operations this
   value may rise.

TODO factcheck

.. describe:: cursors.clientCursors_size

   .. deprecated:: 1.x
      See :status:`cursors.totalOpen` for this datum.

.. describe:: cursors.timedOut

   ``cursors.timedOut`` provides a counter of the total number of
   cursors that have timed out since the server process started. If
   this number is large or growing at a regular rate, ensure that
   there are no issues with your system's memory or your application's
   connection.

TODO factcheck

network
-------

.. describe:: network

   The ``network`` data structure contains data regarding MongoDB's
   network use.

.. describe:: network.bytesIn

   The value of the ``network.bytesIn`` field reflects the amount of
   network traffic, in bytes, received *by* this database. Use this
   value to ensure that network traffic sent to the ``mongod`` process
   is consistent with expectations and overall inter-application
   traffic.

.. describe:: network.bytesOut

   The value of the ``network.bytesOut`` field reflects the amount of
   network traffic, in bytes, sent *from* this database. Use this
   value to ensure that network traffic sent by the ``mongod`` process
   is consistent with expectations and overall inter-application
   traffic.

.. describe:: network.numRequests

   The ``network.numRequests`` field is a counter of the total number
   of distinct requests that the server has received. Use this value
   to provide context for the :status:`network.bytesIn` and
   :status:`network.bytesOut` values to ensure that MongoDB's network
   utilization is consistent with expectations and application use.

repl
----

.. describe:: repl

   The ``repl`` data structure contains status information for
   MongoDB's replication (i.e. "replica set") configuration. These
   values only appear when replication is enabled for the current
   host.

   See :doc:`replication` for more information on replication.

.. describe:: repl.setName

   The ``repl.setName`` field contains a string with the name of the
   current replica set. This value is taken from ``--replSet`` command
   line argument, or ``replSet`` value in the configuration file.

   See :doc:`replication` for more information on replication.

.. describe:: repl.ismaster

   The value of the ``repl.ismaster`` field is either "``true``" or
   "``false``" and reflects whether the current node is the master or
   primary node in the replica set.

   See :doc:`replication` for more information on replication.

.. describe:: repl.secondary

   The value of the ``repl.secondary`` field is either "``true``" or
   "``false``" and reflects whether the current node is a secondary
   node in the replica set.

   See :doc:`replication` for more information on replication.

.. describe:: repl.hosts

   ``repl.hosts`` is an array that lists the other nodes in the
   current replica set. Each host in the list is displayed the form of
   "``"hostname:port"``".

   See :doc:`replication` for more information on replication.

optcounters
-----------

.. describe:: optcounters

   The ``opcounters`` data structure provides an overview of database
   operations by type and makes it possible to analyze the load on
   the database in more granular manner.

   These numbers will grow over time and in response to database
   use. Analyze these values over time to track database utilization.

.. describe:: optcounters.insert

   ``opcounters.insert`` provides a counter of the total number of
   insert operations since the ``mongod`` instance last started.

.. describe:: optcounters.query

   ``opcounters.query`` provides a counter of the total number of
   queries since the ``mongod`` instance last started.

.. describe:: optcounters.update

   ``opcounters.update`` provides a counter of the total number of
   update operations since the ``mongod`` instance last started.

.. describe:: optcounters.delete

   ``opcounters.delete`` provides a counter of the total number of
   delete operations since the ``mongod`` instance last started.

.. describe:: optcounters.getmore

   ``opcounters.getmore`` provides a counter of the total number of
   "getmore" operations since the ``mongod`` instance last started. On
   a primary node, this counter can be high even if the query count is
   low. Secondary nodes send ``getMore`` operations to the primary
   node as part of the replication process.

.. describe:: optcounters.command

   ``opcounters.command`` provides a counter of the total number of
   commands issued to the database since the ``mongod`` instance last
   started.

asserts
-------

.. describe:: asserts

   The ``asserts`` data structure provides an account of the number of
   asserts on the database. While assert errors are typically
   uncommon, if there are non-zero values for the ``asserts``, you
   should check the log file for the ``mongod`` process for more
   information. In many cases these errors are trivial, but should be
   investigated.

.. describe:: asserts.regular

   The ``asserts.regular`` counter tracks the number of regular
   assertions raised since the server process started. Check the log
   file for more information about these messages.

.. describe:: asserts.warning

   The ``asserts.warning`` counter tracks the number of warnings
   raised since the server process started. Check the log file for
   more information about these warnings.

.. describe:: asserts.msg

   The ``asserts.msg`` counter tracks the number of message assertions
   raised since the server process started. Check the log file for
   more information about these messages.

.. describe:: asserts.user

   The ``asserts.users`` counter reports the number of "user asserts"
   that have occurred since the last time the server process
   started. These are errors that can be generated by a user such as
   out of disk space or duplicate key. You should be able to resolve
   this issue by fixing a problem with your application or
   deployment. Check the log for more information.

.. describe:: asserts.rollovers

   The ``asserts.rollovers`` counter displays the number of times that
   the rollover counters have rolled over since the last time the
   server process started. The counters will rollover to zero after
   **TK** assertions. Use this value to provide context to the other
   values in the :status:`asserts` data structure.

TODO determine number of assertions per-rollover.

TODO develop more in-depth/useful assertion descriptions

.. _durability-status:

dur
---

Durability
~~~~~~~~~~

.. describe:: dur

   The ``dur`` (for "durability") data structure contains data
   regarding MongoDB's journaling. Journaling must be enabled for
   these data to appear in the output of "``ServerStatus``".

   See :doc:`journaling` for more information about journaling
   operations.

.. describe:: dur.commits

   The ``dur.commits`` value provides the number of commits to the
   journal in the last commit interval.

   Commits to the journal are grouped to improve performance. By
   default the interval is 100 milliseconds (ms), but the interval is
   configurable as a run-time option and can range from 2ms to 300ms.

.. describe:: dur.journaledMB

   The ``dur.journaledMB`` value provides the amount of data in
   megabytes (MB) written to the journal in the last commit interval.

   Commits to the journal are grouped to improve performance. By
   default the commit interval is 100 milliseconds (ms), but the
   interval is configurable as a run-time option and can range from
   2ms to 300ms.

.. describe:: dur.writeToDataFilesMB

   The ``dur.writeToDataFilesMB`` value provides the amount of data in
   megabytes (MB) written from the journal to the data files in the
   last commit interval.

   Commits to the journal are grouped to improve performance. By
   default the commit interval is 100 milliseconds (ms), but the
   interval is configurable as a run-time option and can range from
   2ms to 300ms.

.. describe:: dur.compression

   The ``dur.compression`` value ...

TODO not included in existing documentation...

.. describe:: dur.commitsInWriteLock

   The value of the field ``dur.commitsInWriteLock`` provides a count
   of the commits to the journal in the last interval that were
   queued behind a write lock. Commits in a write lock are
   undesirable and may indicate a defect in application requests or
   capacity concerns for the database.

TODO factcheck commentary

.. describe:: dur.earlyCommits

   The ``dur.earlyCommits`` value reflects the number of time a commit
   was requested before the scheduled time. Use this value to ensure
   that your journal commit interval is not too long for your deployment

timeMS
~~~~~~

.. describe:: dur.timeMS

   The ``dur.timeMS`` data structure provides information about the
   performance of the ``mongod`` instance for journaling operations.

.. describe:: dur.timeMS.dt

   The ``dur.timeMS.dt`` value provides, in milliseconds, the length
   of time over which the ``dur.timeMS`` data were collected. Use this
   field to provide context to the adjacent values.

.. describe:: dur.timeMS.prepLogBuffer

   The ``dur.timeMS.prepLogBuffer`` value provides, in milliseconds,
   the amount of time preparing to write to the journal. Smaller
   values indicate better journal performance.

.. describe:: dur.timeMS.writeToJournal

   The ``dur.timeMS.writeToJournal`` value provides, in milliseconds,
   the amount of time spent actually writing to the journal. File
   system speeds and device interfaces can affect performance.

.. describe:: dur.timeMS.writeToDataFiles

   The ``dur.timeMS.writeToDataFiles`` value provides, in
   milliseconds, the amount of time spent writing to data files after
   journaling. File system speeds and device interfaces can affect
   performance.

.. describe:: dur.timeMS.remapPrivateView

   The ``dur.timeMS.remapPrivateView`` value provides, in
   milliseconds, the amount of time remapping copy-on-write memory
   mapped views. Smaller values indicate better journal performance.


Other Statuses
--------------

.. describe:: writeBacksQueued

   The value of ``writeBacksQueued`` is "``true``" when there are
   operations from a ``mongos`` that need to be retried. Typically
   this option is false.
