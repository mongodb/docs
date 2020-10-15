.. This file is shared by
   /reference/api/alerts.txt
   /reference/api/global-alerts.txt
   /reference/api/measurements.txt

Host Measurements
~~~~~~~~~~~~~~~~~

.. list-table::
   :widths: 40 60

   * - - ``ASSERT_REGULAR``
       - ``ASSERT_WARNING``
       - ``ASSERT_MSG``
       - ``ASSERT_USER``

     - Rate of asserts for a MongoDB process found in the 
       :serverstatus:`asserts` document that the
       :manual:`serverStatus </reference/command/serverStatus>`
       command generates.

   * - - ``BACKGROUND_FLUSH_AVG``

     - Amount of data flushed in the background.

   * - - ``CACHE_BYTES_READ_INTO``
       - ``CACHE_BYTES_WRITTEN_FROM``
       - ``CACHE_DIRTY_BYTES``
       - ``CACHE_USED_BYTES``
       - ``TICKETS_AVAILABLE_READS``
       - ``TICKETS_AVAILABLE_WRITE``

     - Amount of bytes in the :manual:`WiredTiger </core/wiredtiger>`
       storage engine cache and tickets found in the
       :serverstatus:`wiredTiger.cache` and
       :serverstatus:`wiredTiger.concurrentTransactions` documents
       that the
       :manual:`serverStatus </reference/command/serverStatus>`
       command generates.

   * - - ``CONNECTIONS``

     - Number of connections to a MongoDB process found in the
       :serverstatus:`connections` document that the
       :manual:`serverStatus </reference/command/serverStatus>`
       command generates.

   * - - ``CURSORS_TOTAL_OPEN``
       - ``CURSORS_TOTAL_TIMED_OUT``

     - Number of :manual:`cursors </core/cursors>` for a MongoDB
       process found in the :serverstatus:`metrics.cursor` document 
       that the 
       :manual:`serverStatus </reference/command/serverStatus>`
       command generates.

   * - - ``EXTRA_INFO_PAGE_FAULTS``
       - ``GLOBAL_ACCESSES_NOT_IN_MEMORY``
       - ``GLOBAL_PAGE_FAULT_EXCEPTIONS_THROWN``

     - Numbers of ``Memory Issues`` and ``Page Faults`` for a MongoDB
       process.

   * - - ``GLOBAL_LOCK_CURRENT_QUEUE_TOTAL``
       - ``GLOBAL_LOCK_CURRENT_QUEUE_READERS``
       - ``GLOBAL_LOCK_CURRENT_QUEUE_WRITERS``

     - Number of operations waiting on locks for the MongoDB process
       that the 
       :manual:`serverStatus </reference/command/serverStatus>` 
       command generates. |mms| computes these values based on the
       type of storage engine.

   * - - ``INDEX_COUNTERS_BTREE_ACCESSES``
       - ``INDEX_COUNTERS_BTREE_HITS``
       - ``INDEX_COUNTERS_BTREE_MISSES``
       - ``INDEX_COUNTERS_BTREE_MISS_RATIO``

     - Number of index btree operations.

   * - - ``JOURNALING_COMMITS_IN_WRITE_LOCK``
       - ``JOURNALING_MB``
       - ``JOURNALING_WRITE_DATA_FILES_MB``

     - Number of journaling operations.

   * - - ``MEMORY_RESIDENT``
       - ``MEMORY_VIRTUAL``
       - ``MEMORY_MAPPED``
       - ``COMPUTED_MEMORY``

     - Amount of memory for a MongoDB process found in the
       :serverstatus:`mem` document that the
       :manual:`serverStatus </reference/command/serverStatus>` command collects.

   * - - ``NETWORK_BYTES_IN``
       - ``NETWORK_BYTES_OUT``
       - ``NETWORK_NUM_REQUESTS``

     - Amount of throughput for MongoDB process found in the
       :serverstatus:`network` document that the 
       :manual:`serverStatus </reference/command/serverStatus>` command collects.

   * - - ``OPLOG_SLAVE_LAG_MASTER_TIME``
       - ``OPLOG_MASTER_TIME``
       - ``OPLOG_MASTER_LAG_TIME_DIFF``
       - ``OPLOG_RATE_GB_PER_HOUR``

     - Durations and throughput of the MongoDB process' 
       :manual:`oplog </core/replica-set-oplog>`.

   * - - ``DB_STORAGE_TOTAL``
       - ``DB_DATA_SIZE_TOTAL``

     - Number of database operations on a MongoDB process since the
       process last started.

   * - - ``OPCOUNTER_CMD``
       - ``OPCOUNTER_QUERY``
       - ``OPCOUNTER_UPDATE``
       - ``OPCOUNTER_DELETE``
       - ``OPCOUNTER_GETMORE``
       - ``OPCOUNTER_INSERT``

     - Rate of database operations on a MongoDB process since the
       process last started found in the :serverstatus:`opcounters` document that the 
       :manual:`serverStatus </reference/command/serverStatus>` command collects.

   * - - ``OPCOUNTER_REPL_CMD``
       - ``OPCOUNTER_REPL_UPDATE``
       - ``OPCOUNTER_REPL_DELETE``
       - ``OPCOUNTER_REPL_INSERT``

     - Rate of database operations on MongoDB
       :term:`secondaries <secondary>` found in the
       :serverstatus:`opcountersRepl` document that the
       :manual:`serverStatus </reference/command/serverStatus>`
       command collects.

   * - - ``DOCUMENT_METRICS_RETURNED``
       - ``DOCUMENT_METRICS_INSERTED``
       - ``DOCUMENT_METRICS_UPDATED``
       - ``DOCUMENT_METRICS_DELETED``

     - Average rate of documents returned, inserted, updated, or
       deleted per second during a selected time period.

   * - - ``OPERATIONS_SCAN_AND_ORDER``

     - Average rate for operations per second during a selected time
       period that perform a sort but cannot perform the sort using an
       index.

   * - - ``OP_EXECUTION_TIME_READS``
       - ``OP_EXECUTION_TIME_WRITES``
       - ``OP_EXECUTION_TIME_COMMANDS``

     - Average execution time in milliseconds per read, write, or
       command operation during a selected time period.

       *Available to hosts running MongoDB 3.4 or later.*

   * - - ``RESTARTS_IN_LAST_HOUR``

     - Number of times the host restarted within the previous hour.

   * - - ``SYSTEM_MEMORY_USED``
       - ``SYSTEM_MEMORY_FREE``
       - ``SYSTEM_MEMORY_AVAILABLE``

     - Physical memory usage, in bytes.

   * - - ``SYSTEM_NETWORK_BYTES_IN``
       - ``SYSTEM_NETWORK_BYTES_OUT``

     - Network throughput in bytes per second.

   * - - ``SWAP_USAGE_USED``
       - ``SWAP_USAGE_FREE``

     - Total amount swap space in use.
