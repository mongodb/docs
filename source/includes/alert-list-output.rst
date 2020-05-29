.. list-table::
   :widths: 20 20 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``acknowledgedUntil``
     - date
     - |iso8601-time| through which the alert has been acknowledged.
       ``mongocli`` returns this value after the alert has been
       acknowledged.

   * - ``acknowledgementComment``
     - string
     - Comment left by the user who acknowledged the alert.
       ``mongocli`` returns this value after the alert has been
       acknowledged.

   * - ``acknowledgingUsername``
     - string
     - Username of the user who acknowledged the alert. ``mongocli``
       returns this value after the alert has been acknowledged.

   * - ``alertConfigId``
     - string
     - Unique identifier of the alert configuration that triggered this
       alert.

   * - ``clusterName``
     - string
     - Name the cluster to which this alert applies.

   * - ``created``
     - date
     - |iso8601-time| when this alert was created.

   * - ``currentValue``
     - object
     - Current value of the metric that triggered the alert.
       ``mongocli`` returns this value if ``"eventTypeName" :
       "OUTSIDE_METRIC_THRESHOLD"``.

   * - ``currentValue.number``
     - float
     - Value.

   * - ``currentValue.units``
     - string
     - Units for the value. Possible units are:

       .. include:: /includes/possibleValues-api-units.rst

   * - ``eventTypeName``
     - string
     - Name of the event that triggered the alert. The possible values
       depend on the alert type.

   * - ``groupId``
     - string
     - Unique identifier of the project for which this alert was
       opened.

   * - ``hostnameAndPort``
     - string
     - Hostname and port of the host to which the alert applies.

   * - ``id``
     - string
     - Unique identifier for the alert.

   * - ``lastNotified``
     - date
     - |iso8601-time| when the last notification was sent for this
       alert. Only present if notifications have been sent.

   * - ``metricName``
     - string
     - Name of the metric whose value went outside the threshold.
       ``mongocli`` returns this value if ``"eventTypeName" :
       "OUTSIDE_METRIC_THRESHOLD"``. Possible values are:

       - ``ASSERT_MSG``
       - ``ASSERT_REGULAR``
       - ``ASSERT_USER``
       - ``ASSERT_WARNING``
       - ``BACKGROUND_FLUSH_AVG``
       - ``CACHE_BYTES_READ_INTO``
       - ``CACHE_BYTES_WRITTEN_FROM``
       - ``CACHE_DIRTY_BYTES``
       - ``CACHE_USED_BYTES``
       - ``COMPUTED_MEMORY``
       - ``CONNECTIONS``
       - ``CURSORS_TOTAL_CLIENT_CURSORS_SIZE``
       - ``CURSORS_TOTAL_OPEN``
       - ``CURSORS_TOTAL_TIMED_OUT``
       - ``DB_DATA_SIZE_TOTAL``
       - ``DB_STORAGE_TOTAL``
       - ``DISK_PARTITION_SPACE_USED_DATA``
       - ``DISK_PARTITION_SPACE_USED_INDEX``
       - ``DISK_PARTITION_SPACE_USED_JOURNAL``
       - ``DISK_PARTITION_UTILIZATION_DATA``
       - ``DISK_PARTITION_UTILIZATION_INDEX``
       - ``DISK_PARTITION_UTILIZATION_JOURNAL``
       - ``EXTRA_INFO_PAGE_FAULTS``
       - ``GLOBAL_ACCESSES_NOT_IN_MEMORY``
       - ``GLOBAL_LOCK_CURRENT_QUEUE_READERS``
       - ``GLOBAL_LOCK_CURRENT_QUEUE_TOTAL``
       - ``GLOBAL_LOCK_CURRENT_QUEUE_WRITERS``
       - ``GLOBAL_LOCK_PERCENTAGE``
       - ``GLOBAL_PAGE_FAULT_EXCEPTIONS_THROWN``
       - ``INDEX_COUNTERS_BTREE_ACCESSES``
       - ``INDEX_COUNTERS_BTREE_HITS``
       - ``INDEX_COUNTERS_BTREE_MISS_RATIO``
       - ``INDEX_COUNTERS_BTREE_MISSES``
       - ``JOURNALING_COMMITS_IN_WRITE_LOCK``
       - ``JOURNALING_MB``
       - ``JOURNALING_WRITE_DATA_FILES_MB``
       - ``LOGICAL_SIZE``
       - ``MEMORY_RESIDENT``
       - ``MEMORY_VIRTUAL``
       - ``MEMORY_MAPPED``
       - ``NETWORK_BYTES_IN``
       - ``NETWORK_BYTES_OUT``
       - ``NETWORK_NUM_REQUESTS``
       - ``NORMALIZED_SYSTEM_CPU_USER``
       - ``OPCOUNTER_CMD``
       - ``OPCOUNTER_DELETE``
       - ``OPCOUNTER_INSERT``
       - ``OPCOUNTER_QUERY``
       - ``OPCOUNTER_REPL_UPDATE``
       - ``OPCOUNTER_REPL_DELETE``
       - ``OPCOUNTER_REPL_INSERT``
       - ``OPCOUNTER_UPDATE``
       - ``OPLOG_MASTER_LAG_TIME_DIFF``
       - ``OPLOG_MASTER_TIME``
       - ``OPLOG_RATE_GB_PER_HOUR``
       - ``OPLOG_SLAVE_LAG_MASTER_TIME``
       - ``RESTARTS_IN_LAST_HOUR``
       - ``TICKETS_AVAILABLE_READS``
       - ``TICKETS_AVAILABLE_WRITES``

   * - ``replicaSetName``
     - string
     - Name of the replica set, if applicable.

   * - ``resolved``
     - date
     - |iso8601-time| when the alert was closed. ``mongocli`` returns
       this value if ``"status" : "CLOSED"``.

   * - ``status``
     - string
     - Current state of the alert. Possible values are:

       .. list-table::
          :widths: 20 80
          :stub-columns: 1

          * - ``TRACKING``
            - Alert conditions exist, but the condition hasn't
              persisted for long enough to trigger an alert.

          * - ``OPEN``
            - Alert is open.

          * - ``CLOSED``
            - Alert is closed.

          * - ``CANCELLED``
            - Alert is cancelled.

   * - ``updated``
     - date
     - |iso8601-time| when this alert was last updated.
