.. This file is shared by
   the page that documents the "measurements.name" values returned by the "measurements" resource, and
   the page that documents the "metricName" values returned by the "alerts" resource.
   the page that documents the "metricName" values returned by the "globalAlerts" resource.

Host Measurements
~~~~~~~~~~~~~~~~~

.. list-table::

   * - - ``ASSERT_REGULAR``
       - ``ASSERT_WARNING``
       - ``ASSERT_MSG``
       - ``ASSERT_USER``

     - Measure the rate of asserts for a MongoDB process, as collected from
       the MongoDB :manual:`serverStatus </reference/command/serverStatus>`
       command's :serverstatus:`asserts` document.

   * - - ``BACKGROUND_FLUSH_AVG``

     - Measurement found on the host's ``background flush avg`` chart. To view the
       chart, see :ref:`access-host-statistics`.

   * - - ``CACHE_BYTES_READ_INTO``
       - ``CACHE_BYTES_WRITTEN_FROM``
       - ``CACHE_USAGE_DIRTY``
       - ``CACHE_USAGE_USED``
       - ``TICKETS_AVAILABLE_READS``
       - ``TICKETS_AVAILABLE_WRITES``

     - Apply to a MongoDB process's :manual:`WiredTiger </core/wiredtiger>`
       storage engine, as collected from the MongoDB :manual:`serverStatus
       </reference/command/serverStatus>` command's
       :serverstatus:`wiredTiger.cache` and
       :serverstatus:`wiredTiger.concurrentTransactions` documents.

   * - - ``CONNECTIONS``

     - Measures connections to a MongoDB process, as collected from the
       MongoDB :manual:`serverStatus </reference/command/serverStatus>`
       command's :serverstatus:`connections` document.

   * - - ``CURSORS_TOTAL_OPEN``
       - ``CURSORS_TOTAL_TIMED_OUT``

     - Measure the number of :manual:`cursors </core/cursors>` for a MongoDB
       process, as collected from the MongoDB :manual:`serverStatus
       </reference/command/serverStatus>` command's
       :serverstatus:`metrics.cursor` document.

   * - - ``EXTRA_INFO_PAGE_FAULTS``
       - ``GLOBAL_ACCESSES_NOT_IN_MEMORY``
       - ``GLOBAL_PAGE_FAULT_EXCEPTIONS_THROWN``

     - Measurements found on the host's ``Record Stats`` and ``Page Faults``
       charts. To view the charts, see :ref:`access-host-statistics`.

   * - - ``GLOBAL_LOCK_CURRENT_QUEUE_TOTAL``
       - ``GLOBAL_LOCK_CURRENT_QUEUE_READERS``
       - ``GLOBAL_LOCK_CURRENT_QUEUE_WRITERS``

     - Measure operations waiting on locks, as collected from the MongoDB
       :manual:`serverStatus </reference/command/serverStatus>` command.
       |mms| computes these values based on the type of storage engine.

   * - - ``GLOBAL_LOCK_PERCENTAGE``

     - Applicable only to hosts running MongoDB 2.0 and earlier. Measures
       operations waiting on the global lock, as collected from the MongoDB
       :manual:`serverStatus </reference/command/serverStatus>` command.

   * - - ``INDEX_COUNTERS_BTREE_ACCESSES``
       - ``INDEX_COUNTERS_BTREE_HITS``
       - ``INDEX_COUNTERS_BTREE_MISSES``
       - ``INDEX_COUNTERS_BTREE_MISS_RATIO``

     - Measurements found on the host's ``btree`` chart. To view the chart, see
       :ref:`access-host-statistics`.

   * - - ``JOURNALING_COMMITS_IN_WRITE_LOCK``
       - ``JOURNALING_MB``
       - ``JOURNALING_WRITE_DATA_FILES_MB``

     - Measurements found on the host's ``journal - commits in write lock`` chart
       and ``journal stats`` chart. To view the charts, see
       :ref:`access-host-statistics`.

   * - - ``MEMORY_RESIDENT``
       - ``MEMORY_VIRTUAL``
       - ``MEMORY_MAPPED``
       - ``COMPUTED_MEMORY``

     - Measure memory for a MongoDB process, as collected from the MongoDB
       :manual:`serverStatus </reference/command/serverStatus>` command's
       :serverstatus:`mem` document.

   * - - ``NETWORK_BYTES_IN``
       - ``NETWORK_BYTES_OUT``
       - ``NETWORK_NUM_REQUESTS``

     - Measure throughput for MongoDB process, as collected from the MongoDB
       :manual:`serverStatus </reference/command/serverStatus>` command's
       :serverstatus:`network` document.

   * - - ``OPLOG_SLAVE_LAG_MASTER_TIME``
       - ``OPLOG_MASTER_TIME``
       - ``OPLOG_MASTER_LAG_TIME_DIFF``
       - ``OPLOG_RATE_GB_PER_HOUR``

     - Measurements that apply to the MongoDB process's :manual:`oplog
       </core/replica-set-oplog>`.

   * - - ``DB_STORAGE_TOTAL``
       - ``DB_DATA_SIZE_TOTAL``

     - Measurements displayed on the host's ``db storage`` chart. To view the
       chart, see :ref:`access-host-statistics`.

   * - - ``OPCOUNTER_CMD``
       - ``OPCOUNTER_QUERY``
       - ``OPCOUNTER_UPDATE``
       - ``OPCOUNTER_DELETE``
       - ``OPCOUNTER_GETMORE``
       - ``OPCOUNTER_INSERT``

     - Measure the rate of database operations on a MongoDB process since the
       process last started, as collected from the MongoDB
       :manual:`serverStatus </reference/command/serverStatus>` command's
       :serverstatus:`opcounters` document.

   * - - ``OPCOUNTER_REPL_CMD``
       - ``OPCOUNTER_REPL_UPDATE``
       - ``OPCOUNTER_REPL_DELETE``
       - ``OPCOUNTER_REPL_INSERT``

     - Measure the rate of database operations on MongoDB :term:`secondaries
       <secondary>`, as collected from the MongoDB :manual:`serverStatus
       </reference/command/serverStatus>` command's
       :serverstatus:`opcountersRepl` document.

