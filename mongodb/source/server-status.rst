.. 64 total items, 52 without containers (and writebacksqueued)
.. 45

=======================
Server Status Reference
=======================

The :command:`serverStatus` outputs a collection of data that you can
use to diagnose and assess the performance of your MongoDB
instance. This reference catalogs each datum


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

TODO what is course-grained timing?

.. describe:: localTime

   The ``localTime`` value is the current time, according to the
   server, in UTC specified in an ISODate format.

globalLock
----------

.. describe:: globalLock

   The ``globalLock`` data structure contains information regarding
   the database's current and historical lock status, current
   operation queue, and the number of active clients.

.. describe:: globalLock.toalTime

   The value of ``globalLock.totalTime`` represents the time, in
   microseconds, since the database last started, that the
   ``globalLock`` has existed.

   Larger values indicate that the database has been unavailable for
   more time; however, :status:`uptime` should be considered. Also
   consider the effect of long-running administrative operations on
   this value.

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
   the `globalLock` has been held infrequently for longer periods of
   time.

.. _globallock-currentqueue:

globalLock.currentQueue
~~~~~~~~~~~~~~~~~~~~~~~

.. describe:: globalLock.currentQueue

   The ``globalLock.currentQueue`` data structure value provides more
   granular information about the number of operations queued because
   of a lock.

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
   kinds (e.g. read or write) of operations these clients are
   performing.

   Use this data to provide context for the :ref:`currentQueue
   <globallock-currentqueue>` data.

.. describe:: globalLock.activeClients.total

   The value of ``globalLock.activeClients.total`` is the total number
   of active client connections to the database. This combines clients
   that are performing read operations
   (e.g. :status:`globalLock.activeClients.readers`) and clients that
   are performing write operations (e.g. :status:`:
   globalLock.activeClients.writers`).

.. describe:: globalLock.activeClients.readers

   The value of ``globalLock.activeClients.readers`` is the number of
   active client connections performing read operations.

.. describe:: globalLock.activeClients.writers

   The value of ``globalLock.activeClients.writers`` is the number of
   active client connections performing write operations.

TODO add more information about globalLock.activeClients data including rages.

mem
---

.. describe:: mem

   The ``mem`` data structure holds the information regarding
   MongoDB's architecture and current memory use.

.. describe:: mem.bits

   The value of ``mem.bits`` is either ``64`` or ``32``, depending the
   target system architecture for which the ``mongod`` instance was
   compiled. In most instances this is ``64``, and this value will
   never change over time.

.. describe:: mem.resident

   The value of ``mem.resident`` is roughly equivalent to the amount
   of RAM, in bytes, that the database process is currently using. In
   normal use, this value tends to grown, and on dedicated database
   servers this number tends to approach the total amount of system
   memory.

.. describe:: mem.virtual

   ``mem.virtual`` displays the quantity, in bytes,  of virtual memory used by
   the ``mongod`` process. In typical deployments this value is
   slightly larger than :status:`mem.mapped`; however, if this value
   is significantly (i.e. gigabytes) larger than :status:`mem.mapped`,
   this might be the sign of a memory leak.

   If you have :term:`journaling` enabled, then ``mem.virtual`` is
   twice the value of :status:`mem.mapped`.

.. describe:: mem.supported

   ``mem.supported`` is true when the underlying system supports
   extended memory information. If this value is false, and the system
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

   The ``connections`` data structure holds information regarding the
   current connection status and availability of the database
   server. Use these values to asses the current load and capacity
   requirements of the server.

.. describe:: connections.current

   The value of ``connections.current`` corresponds to the number of
   connections to the database server from clients. This number
   includes the current shell session. Consider the value of
   :status:`connections.available` to add more context to this data
   point.

TODO check current shell connection fact

.. describe:: connections.available

   ``connections.available`` provides a count of the number of unused
   available connections that the database can provide. Consider this
   value in combination with the value of
   :status:`connections.current` to understand the connection load on
   the database.

extra_info
----------

TODO determine all possible fields in extra_info

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
   systems, and relates the total number of page faults that required
   disk operations. Page faults refer to operations that require the
   database server to access data which isn't available in active
   memory. The ``page_fault`` counter may increase dramatically during
   moments of poor performance, and may be correlated with limited
   memory environments and larger data sets. Limited and sporadic page
   faults do not in and of themselves indicate an issue.

TODO describe use


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
   this number doesn't grow over time, this might indicate that your
   indexes do not effectively support your use.

.. describe:: indexCouters.btree.hits

   The ``indexCouters.btree.hits`` value reports the number of times
   that an index has been access and ``mongod`` is able to return the
   index from memory.

   A higher value indicates that the indexes are being used
   effectively. ``indexCounters.btree.hits`` values that represent a
   greater proportion of the :status:`indexCounters.btree.accesses`
   value, tend to indicate more effective index configuration.

.. describe:: indexCouters.btree.misses

   The ``indexCounters.btree.misses`` value represents the number of
   times that an index page was accessed but was not in memory. These
   "misses," do not indicate a failed query or operation, but rather
   an inefficient use of the index. Lower values in this field
   indicate better index use and likely overall performance as well.

.. describe:: indexCounters.btree.resets

   The ``index Counter.btree.resets`` value indicates the number of
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

   ``mongod`` periodically flushes writes to disk.In the default
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
   of milliseconds (ms) that the ``mongod`` prices has spent writing
   or flushing data to disk. Because this is an absolute value,
   consider the value of :status:`backgroundFlishing.flushes` and
   :status:`backgroundFlushing.average_ms` to provide better context
   for this data.

.. describe:: backgroundFlushing.average_ms

   The ``backgroundFlushing.average_ms`` value provides the
   relationship between the number of flushes and the total amount of
   time that the database has spent writing data to disk. The greater
   the number of :status:`backgroundFlushing.flushes`, the more likely
   this value is likely to represent a "normal," time; however, this
   value can be skewed by abnormal data. Use the
   :status:`backgroundFlushing.last_ms` to ensure that a high average
   has not been skewed by transient historical issue.

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

   Also consider ongoing operations which might routinely block
   write operations for a time before becoming alarmed.

cursors
-------

.. describe:: cursors

   The ``cursors`` data structure collects all data about the current
   state of cursors and cursor use.

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
.. describe:: network.bytesIn
.. describe:: network.bytesOut
.. describe:: network.numRequests

optcountes
----------

.. describe:: optcounters
.. describe:: optcounters.insert
.. describe:: optcounters.query
.. describe:: optcounters.update
.. describe:: optcounters.delete
.. describe:: optcounters.getmore
.. describe:: optcounters.command

asserts
-------

.. describe:: asserts
.. describe:: asserts.regular
.. describe:: asserts.warning
.. describe:: asserts.msg
.. describe:: asserts.user
.. describe:: asserts.rollovers

.. _durability-status:

dur
---

Durability
~~~~~~~~~~

.. describe:: dur
.. describe:: dur.commits
.. describe:: dur.journaledMB
.. describe:: dur.writeToDataFilesMB
.. describe:: dur.compression
.. describe:: dur.commitsInWriteLock
.. describe:: dur.earlyCommits

timeMS
~~~~~~

.. describe:: dur.timeMS
.. describe:: dur.timeMS.dt
.. describe:: dur.timeMS.prepLogBuffer
.. describe:: dur.timeMS.writeToJournal
.. describe:: dur.timeMS.writeToDataFiles
.. describe:: dur.timeMS.remapPrivateView

Other Statuses
--------------

.. describe:: writeBacksQueued

   The value of  ``writeBacksQueued`` is true when there are
   operations from a ``mongos`` that need to be retried. Typically
   this option is false.
