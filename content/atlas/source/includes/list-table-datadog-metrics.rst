.. list-table::
   :header-rows: 1
   :widths: 45 12 43

   * - Metric Names
     - Metric Type
     - Description

   * - | ``CONNECTIONS`` 
       | (mongodb.atlas.connections.current)
     - Process
     - Number of open connections currently open on the cluster.

   * - | ``DB_STORAGE_TOTAL`` 
       | (mongodb.atlas.stats.totalstoragesize)
       | ``DB_DATA_SIZE_TOTAL``
       | (mongodb.atlas.stats.totaldatasize)
       | ``DB_INDEX_SIZE_TOTAL``
       | (mongodb.atlas.stats.totalindexsize)
     - Process
     - Total database storage size, data size, and index size on the
       {+cluster+} in bytes.

   * - | ``DISK_LATENCY_READS``
       | (mongodb.atlas.system.disk.latency.reads)
       | ``DISK_LATENCY_WRITES``
       | (mongodb.atlas.system.disk.latency.writes)
     - Disk
     - Latency gauge in milliseconds for read requests and
       write requests.


   * - | ``DISK_MAX_LATENCY_READS``
       | (mongodb.atlas.system.disk.max.latency.reads)
       | ``DISK_MAX_LATENCY_WRITES``
       | (mongodb.atlas.system.disk.max.latency.writes)
     - Disk
     - Maximum latency gauge in milliseconds for read requests and write
       requests.

   * - | ``DISK_QUEUE_DEPTH``
       | (mongodb.atlas.system.disk.queuedepth)
     - Disk
     - Average length of the queue of requests issued 
       to the disk partition that MongoDB uses over the time 
       period specified by the metric granularity.

   * - | ``MAX_DISK_QUEUE_DEPTH``
       | (mongodb.atlas.system.disk.max.queuedepth)
     - Disk
     - Maximum values over the time period specified by the metric 
       granularity for the average length of the queue of requests 
       issued to the disk partition that MongoDB uses.

   * - | ``DOCUMENT_METRICS_RETURNED``
       | (mongodb.atlas.metrics.document.returned)
       | ``DOCUMENT_METRICS_INSERTED``
       | (mongodb.atlas.metrics.document.inserted)
       | ``DOCUMENT_METRICS_UPDATED``
       | (mongodb.atlas.metrics.document.updated)
       | ``DOCUMENT_METRICS_DELETED``
       | (mongodb.atlas.metrics.document.deleted)
     - Process
     - Number of documents read or written per second.

   * - | ``NETWORK_BYTES_IN``
       | (mongodb.atlas.network.bytes.in)
     - Process
     - Average rate of physical bytes (after any wire compression) sent 
       to the database server per second. 

   * - | ``NETWORK_BYTES_OUT``
       | (mongodb.atlas.network.bytes.out)
     - Process
     - Average rate of physical bytes (after any wire compression) sent 
       from the database server per second.

   * - | ``NETWORK_NUM_REQUESTS``
       | (mongodb.atlas.network.num.requests)
     - Process
     - Average rate of requests sent to the database server per second. 

   * - | ``OPCOUNTER_CMD`` 
       | (mongodb.atlas.opcounters.command)
       | ``OPCOUNTER_QUERY``
       | (mongodb.atlas.opcounters.query)
       | ``OPCOUNTER_UPDATE``
       | (mongodb.atlas.opcounters.update)
       | ``OPCOUNTER_DELETE``
       | (mongodb.atlas.opcounters.delete)
       | ``OPCOUNTER_GETMORE``
       | (mongodb.atlas.opcounters.getmore)
       | ``OPCOUNTER_INSERT``
       | (mongodb.atlas.opcounters.insert)
     - Process
     - Number of operations per second, separated by operation type.

   * - | ``OP_EXECUTION_TIME_READS`` 
       | (mongodb.atlas.oplatencies.reads.avg)
       | ``OP_EXECUTION_TIME_WRITES``
       | (mongodb.atlas.oplatencies.writes.avg)
       | ``OP_EXECUTION_TIME_COMMANDS`` 
       | (mongodb.atlas.oplatencies.commands.avg)
     - Process
     - Average operation time in milliseconds, separated by operation
       type.

   * - | ``QUERY_STATS_BYTES_READ_SUM_TOTAL``
       | (mongodb.atlas.querystats.bytes_read_sum_total)
     - Counter
     - Number of bytes read by the given query shape from the disk to 
       the cache.

   * - | ``QUERY_STATS_DOCS_EXAMINED_RATIO``
       | (mongodb.atlas.querystats.docs_examined_ratio)
     - Gauge
     - Ratio of documents examined to documents returned by queries 
       with the given query shape.

   * - | ``QUERY_STATS_DOCS_EXAMINED_ SUM_TOTAL``
       | (mongodb.atlas.querystats.docs_examined_sum_total)
     - Counter
     - Total number of documents examined by queries with the given 
       query shape.

   * - | ``QUERY_STATS_DOCS_RETURNED_ SUM_TOTAL``
       | (mongodb.atlas.querystats.docs_returned_sum_total)
     - Counter
     - Total number of documents returned by queries with the given 
       query shape.

   * - | ``QUERY_STATS_EXEC_COUNT_TOTAL``
       | (mongodb.atlas.querystats.exec_count_total)
     - Counter
     - Total number of times that queries with the given query shape 
       have been executed.

   * - | ``QUERY_STATS_KEYS_EXAMINED_RATIO``
       | (mongodb.atlas.querystats.keys_examined_ratio)
     - Gauge
     - Ratio of in-bounds and out-of-bounds index keys examined to 
       indexes containing documents returned by queries with the given 
       query shape.

   * - | ``QUERY_STATS_KEYS_EXAMINED_SUM_TOTAL``
       | (mongodb.atlas.querystats.keys_examined_sum_total)
     - Counter
     - Total number of in-bounds and out-of-bounds index keys examined 
       by queries with the given query shape.

   * - | ``QUERY_STATS_LAST_EXEC_MICROS``
       | (mongodb.atlas.querystats.last_exec_micros)
     - Gauge
     - Execution runtime in microseconds for the most recent query with 
       the given query shape.

   * - | ``QUERY_STATS_TIME_TO_RESPONSE_MICROS_SUM_TOTAL``
       | (mongodb.atlas.querystats.time_to_response_micros_sum_total)
     - Counter
     - Time in microseconds spent from the beginning of query 
       processing to the first server response.

   * - | ``QUERY_STATS_WORKING_MILLIS_SUM_TOTAL``
       | (mongodb.atlas.querystats.working_millis_sum_total)
     - Counter
     - Total time in milliseconds spent running queries with the given 
       query shape. If the query resulted in ``getMore`` commands, this 
       metric includes the time spent processing the ``getMore`` 
       requests. This metric does not include time spent waiting for 
       the client.
   
   * - | ``QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED``
       | (mongodb.atlas.metrics.queryexecutor.scannedobjectsperreturned)
     - Process
     - Ratio measuring number of objects scanned over objects
       returned. Lower values indicate more efficient queries.

   * - | ``QUERY_SPILL_TO_DISK_DURING_SORT``
       | (mongodb.atlas.metrics.query.sort.spillToDisk)
     - Process
     - The total number of writes to disk caused by :pipeline:`$sort` stages.

   * - | ``REPLICATION_LAG``
       | (mongodb.atlas.replset.replicationlag)
     - Process
     - Amount of time in seconds that updates to the secondary delay
       behind updates to the primary.

   * - | ``REPLICATION_OPLOG_WINDOW``
       | (mongodb.atlas.replset.oplogWindow) 
     - Process
     - Estimated average number, in seconds, of database 
       operations available in the primary's replication oplog. This 
       metric is based on oplog churn. A :manual:`full resync 
       </tutorial/resync-replica-set-member/>` is required if 
       replication lag on a secondary node exceeds the replication 
       oplog window and replication headroom reaches zero.

   * - | ``REPLICATION_STATUS_HEALTH``
       | (mongodb.atlas.replstatus.health)
     - Process
     - Number that indicates a replica set member's health. A value of
       ``1`` indicates that the replica set member is up/running. A
       value of ``0`` indicates that the replica set member is down/not
       running.

       You might see an inaccurate health status in the following 
       scenarios:

       - If you have a network partition and the MongoDB Agent lives 
         on an isolated node in a replica set, only pings from the 
         isolated node reach Datadog. The isolated node and 
         {+atlas-ui+} report the other nodes as down.
       - If you have a network partition and the MongoDB Agent lives 
         outside the impacted nodes, pings from all the nodes reach 
         Datadog, but report different statuses.
       - If all nodes are unresponsive or their state is hanging, no 
         new pings come in. The {+atlas-ui+} reports these nodes as 
         down, but Datadog reports them as healthy and the status gets 
         older.
       - If Datadog experiences an outage or slowdown in metrics
         ingestion, this metric may report incorrectly and produce a 
         false positive result.

       :gold:`IMPORTANT:` If the health status is ``1``, but no other metrics appear in 
       Datadog, the replica set might be down.

   * - | ``REPLICATION_STATUS_STATE``
       | (mongodb.atlas.replstatus.state)
     - Process
     - Integer between ``0`` and ``10`` that represents a replica set
       member's :manual:`replica state </reference/replica-states/>`.
       
   * - | ``SYSTEM_MEMORY_USED``
       | (mongodb.atlas.system.memory.used)
       | ``SYSTEM_MEMORY_AVAILABLE``
       | (mongodb.atlas.system.memory.available)
     - System
     - Gauge that indicates physical memory used, in kilobytes.

   * - | ``MAX_SYSTEM_MEMORY_USED``
       | (mongodb.atlas.system.memory.max.used)
       | ``MAX_SYSTEM_MEMORY_AVAILABLE``
       | (mongodb.atlas.system.memory.max.available)
     - System
     - Gauge that indicates the maximum physical memory used, in kilobytes.

   * - | ``SYSTEM_NORMALIZED_CPU_USER`` 
       | (mongodb.atlas.system.cpu.norm.user)
       | ``SYSTEM_NORMALIZED_CPU_KERNEL``
       | (mongodb.atlas.system.cpu.norm.kernel)
       | ``SYSTEM_NORMALIZED_CPU_NICE``
       | (mongodb.atlas.system.cpu.norm.nice)
       | ``SYSTEM_NORMALIZED_CPU_IOWAIT``
       | (mongodb.atlas.system.cpu.norm.iowait)
       | ``SYSTEM_NORMALIZED_CPU_IRQ``
       | (mongodb.atlas.system.cpu.norm.irq)
       | ``SYSTEM_NORMALIZED_CPU_SOFTIRQ``
       | (mongodb.atlas.system.cpu.norm.softirq)
       | ``SYSTEM_NORMALIZED_CPU_GUEST``
       | (mongodb.atlas.system.cpu.norm.guest)
       | ``SYSTEM_NORMALIZED_CPU_STEAL``
       | (mongodb.atlas.system.cpu.norm.steal)
     - System
     - Percent of time utilized by logical CPUs across various
       processes for the server. These values are normalized with
       respect to the number of logical CPU cores.

   * - | ``MAX_SYSTEM_NORMALIZED_CPU_USER`` 
       | (mongodb.atlas.system.cpu.max.norm.user)
       | ``MAX_SYSTEM_NORMALIZED_CPU_KERNEL``
       | (mongodb.atlas.system.cpu.max.norm.kernel)
       | ``MAX_SYSTEM_NORMALIZED_CPU_NICE``
       | (mongodb.atlas.system.cpu.max.norm.nice)
       | ``MAX_SYSTEM_NORMALIZED_CPU_IOWAIT``
       | (mongodb.atlas.system.cpu.max.norm.iowait)
       | ``MAX_SYSTEM_NORMALIZED_CPU_IRQ``
       | (mongodb.atlas.system.cpu.max.norm.irq)
       | ``MAX_SYSTEM_NORMALIZED_CPU_SOFTIRQ``
       | (mongodb.atlas.system.cpu.max.norm.softirq)
       | ``MAX_SYSTEM_NORMALIZED_CPU_GUEST``
       | (mongodb.atlas.system.cpu.max.norm.guest)
       | ``MAX_SYSTEM_NORMALIZED_CPU_STEAL``
       | (mongodb.atlas.system.cpu.max.norm.steal)
     - System
     - Maximum values over the time period specified by the metric 
       granularity for the percent of time utilized by logical CPUs 
       across various processes for the server. These values are 
       normalized with respect to the number of logical CPU cores.

   * - | ``PROCESS_NORMALIZED_CPU_USER`` 
       | (mongodb.atlas.system.cpu.mongoprocess.norm.user)
       | ``PROCESS_NORMALIZED_CPU_KERNEL``
       | (mongodb.atlas.system.cpu.mongoprocess.norm.kernel)
       | ``PROCESS_NORMALIZED_CPU_CHILDREN_USER`` 
       | (mongodb.atlas.system.cpu.mongoprocess.norm.childrenuser)
       | ``PROCESS_NORMALIZED_CPU_CHILDREN_KERNEL``
       | (mongodb.atlas.system.cpu.mongoprocess.norm.childrenkernel)
     - Process
     - Percent of time utilized by logical CPUs across various
       processes specific to the MongoDB process in the server. These
       values are normalized with respect to the number of logical CPU
       cores.

   * - | ``MAX_PROCESS_NORMALIZED_CPU_USER`` 
       | (mongodb.atlas.system.cpu.mongoprocess.max.norm.user)
       | ``MAX_PROCESS_NORMALIZED_CPU_KERNEL``
       | (mongodb.atlas.system.cpu.mongoprocess.max.norm.kernel)
       | ``MAX_PROCESS_NORMALIZED_CPU_CHILDREN_USER`` 
       | (mongodb.atlas.system.cpu.mongoprocess.max.norm.childrenuser)
       | ``MAX_PROCESS_NORMALIZED_CPU_CHILDREN_KERNEL``
       | (mongodb.atlas.system.cpu.mongoprocess.max.norm.childrenkernel)
     - Process
     - Maximum values over the time period specified by the metric 
       granularity for the percent of time utilized by logical CPUs 
       across various processes specific to the MongoDB process in the 
       server. These values are normalized with respect to the number 
       of logical CPU cores.

   * - | ``MEMORY_RESIDENT``
       | (mongodb.atlas.mem.resident)
       | ``MEMORY_VIRTUAL``
       | (mongodb.atlas.mem.virtual)
     - Process
     - Memory (in ``MB``) consumed by the MongoDB process on
       the server, separated by memory type.

   * - | ``OPCOUNTER_REPL_CMD`` 
       | (mongodb.atlas.opcountersrepl.command)
       | ``OPCOUNTER_REPL_UPDATE``
       | (mongodb.atlas.opcountersrepl.update)
       | ``OPCOUNTER_REPL_DELETE`` 
       | (mongodb.atlas.opcountersrepl.delete)
       | ``OPCOUNTER_REPL_INSERT``
       | (mongodb.atlas.opcountersrepl.insert)
     - Process
     - Measure rate of database operations on MongoDB
       :manual:`secondaries </core/replica-set-secondary/>`, as
       collected from the MongoDB :dbcommand:`serverStatus` command's
       ``opcountersRepl`` document.

       You can view these metrics on the :guilabel:`Opcounters - Repl`
       chart, accessed via :ref:`Cluster Metrics
       <monitor-cluster-metrics>`.

   * - | ``OPLOG_RATE_GB_PER_HOUR``
       | (mongodb.atlas.replset.oplograte)
     - Process
     - The average rate of :manual:`oplog </core/replica-set-oplog/>`
       the primary generates in gigabytes per hour.

   * - | ``TOTAL_NUMBER_OF_GETMORE_COMMANDS``
       | (mongodb.atlas.search.index.stats.commands.getmore)
     - |fts|
     - Total number of ``getmore`` commands run on all |fts| queries.

   * - | ``TOTAL_NUMBER_OF_DELETES``
       | (mongodb.atlas.search.index.stats.deletes)
     - |fts|
     - Total number of documents or fields (specified in the index 
       definition) removed.

   * - | ``TOTAL_NUMBER_OF_INDEX_FIELD``
       | (mongodb.atlas.search.index.stats.index.fields) 
     - |fts|
     - Total number of unique fields present in the |fts| index.

   * - | ``TOTAL_INDEX_SIZE_ON_DISK``
       | (mongodb.atlas.search.index.stats.index.size)
     - |fts|
     - Total size of all indexes on disk.

   * - | ``TOTAL_NUMBER_OF_INSERTS_SERIES``
       | (mongodb.atlas.search.index.stats.inserts)
     - |fts|
     - Total number of documents or fields (specified in the index 
       definition) that |fts| indexed.
   
   * - | ``MAX_REPLICATION_LAG``
       | (mongodb.atlas.search.index.stats.max.replication.lag)
     - |fts|
     - Approximate number of milliseconds that |fts| is behind in 
       replicating changes from the :term:`oplog` of |mongod|.

   * - | ``TOTAL_NUMBER_OF_UPDATES``
       | (mongodb.atlas.search.index.stats.updates)
     - |fts|
     - Total number of documents or fields (specified in the index 
       definition) that |fts| updated.

   * - | ``TOTAL_NUMBER_OF_ERROR_QUERIES``
       | (mongodb.atlas.search.index.stats.queries.error)
     - |fts|
     - Total number of queries for which |fts| is unable to return a 
       response.

   * - | ``TOTAL_NUMBER_OF_SUCCESS_QUERIES``
       | (mongodb.atlas.search.index.stats.queries.success)
     - |fts|
     - Total number of queries for which |fts| successfully returned a 
       response.

   * - | ``TOTAL_NUMBER_OF_TOTAL_QUERIES``
       | (mongodb.atlas.search.index.stats.queries.total)
     - |fts|
     - Total number of queries submitted to |fts|.

   * - | ``JVM_CURRENT_MEMORY``
       | (mongodb.atlas.search.jvm.current.memory)
     - |fts|
     - Amount of memory that the JVM heap is currently 
       using.

   * - | ``JVM_MAX_MEMORY``
       | (mongodb.atlas.search.jvm.max.memory)
     - |fts|
     - Total available memory in the JVM heap.

   * - | ``DISK_PARTITION_SPACE_FREE``
       | (mongodb.atlas.system.disk.space.free)
       | ``DISK_PARTITION_SPACE_USED`` 
       | (mongodb.atlas.system.disk.space.used)
       | ``DISK_PARTITION_SPACE_PERCENT_FREE`` 
       | (mongodb.atlas.system.disk.space.percentfree)
       | ``DISK_PARTITION_SPACE_PERCENT_USED`` 
       | (mongodb.atlas.system.disk.space.percentused)
     - Disk
     - Measure free disk space and used disk space (in bytes) on the
       disk partition used by MongoDB.

   * - | ``MAX_DISK_PARTITION_SPACE_FREE``
       | (mongodb.atlas.system.disk.max.space.free)
       | ``MAX_DISK_PARTITION_SPACE_USED`` 
       | (mongodb.atlas.system.disk.max.space.used)
       | ``MAX_DISK_PARTITION_SPACE_PERCENT_FREE`` 
       | (mongodb.atlas.system.disk.max.space.percentfree)
       | ``MAX_DISK_PARTITION_SPACE_PERCENT_USED`` 
       | (mongodb.atlas.system.disk.max.space.percentused)
     - Disk
     - Maximum values over the time period specified by the metric 
       granularity for free disk space and used disk 
       space (in bytes) on the disk partition used by MongoDB.

   * - | ``DISK_PARTITION_IOPS_READ``
       | (mongodb.atlas.system.disk.iops.reads)
       | ``DISK_PARTITION_IOPS_WRITE`` 
       | (mongodb.atlas.system.disk.iops.writes)
       | ``DISK_PARTITION_IOPS_TOTAL`` 
       | (mongodb.atlas.system.disk.iops.total) 
     - Disk
     - Measure throughput of |iops| for the disk partition used by
       MongoDB.

   * - | ``MAX_DISK_PARTITION_IOPS_READ``
       | (mongodb.atlas.system.disk.max.iops.reads)
       | ``MAX_DISK_PARTITION_IOPS_WRITE`` 
       | (mongodb.atlas.system.disk.max.iops.writes)
       | ``MAX_DISK_PARTITION_IOPS_TOTAL`` 
       | (mongodb.atlas.system.disk.max.iops.total) 
     - Disk
     - Maximum values over the time period specified by the metric 
       granularity for the throughput of |iops| for the 
       disk partition used by MongoDB.

   * - | ``SYSTEM_NETWORK_BYTES_IN``
       | (mongodb.atlas.system.network.bytes.in)
     - System
     - Average rate of physical bytes received per second.

   * - | ``SYSTEM_NETWORK_BYTES_OUT``
       | (mongodb.atlas.system.network.bytes.out)
     - System
     - Average rate of physical bytes transmitted per second. 

   * - | ``MAX_SYSTEM_NETWORK_IN``
       | (mongodb.atlas.system.network.max.bytes.in)
     - System
     - Maximum values over the time period specified by the metric 
       granularity for the average rate of physical bytes received per 
       second.

   * - | ``MAX_SYSTEM_NETWORK_OUT``
       | (mongodb.atlas.system.network.max.bytes.out)
     - System
     - Maximum values over the time period specified by the metric 
       granularity for the average rate of physical bytes transmitted 
       per second.

   * - | ``CACHE_BYTES_READ_INTO``
       | (mongodb.atlas.wiredtiger.cache.bytes_read_into_cache)
       | ``CACHE_BYTES_WRITTEN_FROM``
       | (mongodb.atlas.wiredtiger.cache.bytes_written_from_cache)
     - Process
     - Measure average rate of bytes read into and written from 
       :manual:`WiredTiger's cache 
       </reference/command/serverStatus/#serverstatus.wiredTiger.cache>`.

   * - | ``CACHE_USED_BYTES``
       | (mongodb.atlas.wiredtiger.cache.bytes_currently_in_cache)
       | ``CACHE_DIRTY_BYTES``
       | (mongodb.atlas.wiredtiger.cache.tracked_dirty_bytes_in_cache)
     - Process
     - Measure number of bytes of data and number of bytes of dirty 
       data in :manual:`WiredTiger's cache </reference/command/serverStatus/#serverstatus.wiredTiger.cache>`.

   * - | ``PAGES_READ_INTO_CACHE`` 
       | (mongodb.atlas.wiredtiger.cache.pages_read_into_cache) 
       | ``PAGES_REQUESTED_FROM_CACHE``
       | (mongodb.atlas.wiredtiger.cache.pages_requested_from_the_cache)
     - Process 
     - Number of pages read into the cache and the number of pages
       requested from the cache.

   * - | ``TICKETS_AVAILABLE_READS``
       | (mongodb.atlas.wiredtiger.concurrenttransactions.read.available)
       | ``TICKETS_AVAILABLE_WRITES``
       | (mongodb.atlas.wiredtiger.concurrenttransactions.write.available)
     - Process
     - Measure number of read and write operations in the 
       :manual:`storage engine </core/wiredtiger>`.

   * - | ``GLOBAL_LOCK_CURRENT_QUEUE_READERS``
       | (mongodb.atlas.global.lock.current.queue.readers)
       | ``GLOBAL_LOCK_CURRENT_QUEUE_WRITERS``
       | (mongodb.atlas.global.lock.current.queue.writers)
       | ``GLOBAL_LOCK_CURRENT_QUEUE_TOTAL``
       | (mongodb.atlas.global.lock.current.queue.total)
     - Global
     - Gauge that indicates the number of operations currently queued
       due to :manual:`locks </faq/concurrency>` that |service|
       holds on reads, writes, or combined reads and writes.

   * - | ``AVG_OBJECT_SIZE``
       | (dbstats.avg.object.size)
     - Gauge
     - Average size of each document in bytes. This is the
       :data:`~dbStats.dataSize` divided by the number of documents. The
       :ref:`scale argument <scale-argument>` does not affect the
       ``avgObjSize`` value.

   * - | ``COLLECTIONS``
       | (mongodb.atlas.dbstats.collections)
     - Gauge
     - Number of collections in the database.

   * - | ``DATA_SIZE``
       | (mongodb.atlas.dbstats.data.size)
     - Gauge
     - Total size of the uncompressed data held in the database.

   * - | ``FILE_SIZE``
       | (mongodb.atlas.dbstats.file.size)
     - Gauge
     - Total size of all disk space in use on the filesystem where MongoDB
       stores data.

   * - | ``INDEX_SIZE``
       | (mongodb.atlas.dbstats.index.size)
     - Gauge
     - Sum of the disk space allocated to all indexes in the database, 
       including free index space.

   * - | ``INDEXES``
       | (mongodb.atlas.dbstats.indexes)
     - Gauge
     - Total number of indexes across all collections in the database.

   * - | ``NUM_EXTENTS``
       | (mongodb.atlas.dbstats.num.extents)
     - Gauge
     - Contains a count of the number of extents in the database across all collections. 

   * - | ``OBJECTS``
       | (mongodb.atlas.dbstats.objects)
     - Gauge
     - Number of objects (specifically, :term:`documents <document>`) in the
       database across all collections.

   * - | ``STORAGE_SIZE``
       | (mongodb.atlas.dbstats.storage.size)
     - Gauge
     - Sum of the disk space allocated to all collections in the database for
       :term:`document` storage, including free space.

   * - | ``VIEWS``
       | (mongodb.atlas.dbstats.views)
     - Gauge
     - Number of :manual:`views </core/views/>` in the database.

   * - | ``COLLECTION_READ_LATENCY``
       | (mongodb.atlas.latencyStats.read.sum)
       | ``COLLECTION_WRITE_LATENCY``
       | (mongodb.atlas.latencyStats.write.sum)
       | ``COLLECTION_COMMANDS_LATENCY``
       | (mongodb.atlas.latencyStats.write.sum)
       | ``COLLECTION_TOTAL_LATENCY``
       | (mongodb.atlas.latencyStats.total.sum)
     - Counter
     - A 64-bit integer giving the latency in microseconds
       for read, write, command, and total requests.

   * - | ``COLLECTION_READ_OPS``
       | (mongodb.atlas.latencyStats.read.count)
       | ``COLLECTION_WRITE_OPS``
       | (mongodb.atlas.latencyStats.write.count)
       | ``COLLECTION_COMMANDS_OPS``
       | (mongodb.atlas.latencyStats.write.count)
       | ``COLLECTION_TOTAL_OPS``
       | (mongodb.atlas.latencyStats.total.count)
     - Counter
     - A 64-bit integer giving the number of operations 
       performed on the collection since the last reporting interval 
       for read, write, command, and total requests.

   * - | ``READ_HISTOGRAM_P50``
       | (mongodb.atlas.latencyStats.read.p50)
       | ``WRITE_HISTOGRAM_P50``
       | (mongodb.atlas.latencyStats.write.p50)
       | ``COMMANDS_HISTOGRAM_P50``
       | (mongodb.atlas.latencyStats.commands.p50)
       | ``TOTAL_HISTOGRAM_P50``
       | (mongodb.atlas.latencyStats.total.p50)
     - Counter
     - Number of operations on the 50th percentile in the :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`
       for read, write, command, and total requests.

   * - | ``READ_HISTOGRAM_P95``
       | (mongodb.atlas.latencyStats.read.p95)
       | ``WRITE_HISTOGRAM_P95``
       | (mongodb.atlas.latencyStats.write.p95)
       | ``COMMANDS_HISTOGRAM_P95``
       | (mongodb.atlas.latencyStats.commands.p95)
       | ``TOTAL_HISTOGRAM_P95``
       | (mongodb.atlas.latencyStats.total.p95)
     - Counter
     - Number of operations on the 95th percentile in the :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`
       for read, write, command, and total requests.

   * - | ``READ_HISTOGRAM_P99``
       | (mongodb.atlas.latencyStats.read.p99)
       | ``WRITE_HISTOGRAM_P99``
       | (mongodb.atlas.latencyStats.write.p99)
       | ``COMMANDS_HISTOGRAM_P99``
       | (mongodb.atlas.latencyStats.commands.p99)
       | ``TOTAL_HISTOGRAM_P99``
       | (mongodb.atlas.latencyStats.total.p99)
     - Counter
     - Number of operations on the 99th percentile in the :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`
       for read, write, command, and total requests.

   * - | ``CHANGE_STREAM_TIME_DIFFERENCE_SECS``
       | (mongodb.atlas.stream_processing.change_stream_time_difference_secs)
     - Gauge
     - Lag (in seconds) of the last read change event compared to the last event in the oplog.

   * - | ``DLQ_MESSAGE_COUNT``
       | (mongodb.atlas.stream_processing.dlq_message_count)
     - Counter
     - Total number of messages that were sent to the :term:`dead letter queue` (DLQ.

   * - | ``DLQ_MESSAGE_SIZE``
       | (mongodb.atlas.stream_processing.dlq_message_size)
     - Counter
     - Total number of bytes sent to the :term:`dead letter queue` (DLQ).

   * - | ``INPUT_MESSAGE_COUNT``
       | (mongodb.atlas.stream_processing.input_message_count)
     - Counter
     - Total number of input messages read, including rejected documents.

   * - | ``INPUT_MESSAGE_SIZE``
       | (mongodb.atlas.stream_processing.input_message_size)
     - Counter
     - Total number of input bytes read, including rejected messages.

   * - | ``KAFKA_TOTAL_OFFSET_LAG``
       | (mongodb.atlas.stream_processing.kafka_total_offset_lag)
     - Gauge
     - Sum of all partition lags (only applicable to stream processors using a Kafka source).

   * - | ``LAST_DLQ_MESSAGE_OUT``
       | (mongodb.atlas.stream_processing.last_dlq_message_out)
     - Gauge
     - Timestamp of the last document sent to the :term:`dead letter queue` (DLQ).

   * - | ``LAST_MESSAGE_IN``
       | (mongodb.atlas.stream_processing.last_message_in)
     - Gauge
     - Timestamp of the last document processed.

   * - | ``OPERATOR_TARGET_INPUT_MESSAGE_COUNT``
       | (mongodb.atlas.stream_processing.operator_target_input_message_count)
     - Counter
     - Total number of input messages read for an operator target, including rejected documents.

   * - | ``OPERATOR_TARGET_OUTPUT_MESSAGE_COUNT``
       | (mongodb.atlas.stream_processing.operator_target_output_message_count)
     - Counter
     - Total number of output messages emitted for an operator target.

   * - | ``OUTPUT_MESSAGE_COUNT``
       | (mongodb.atlas.stream_processing.output_message_count)
     - Counter
     - Total number of output messages emitted.

   * - | ``OUTPUT_MESSAGE_SIZE``
       | (mongodb.atlas.stream_processing.output_message_size)
     - Counter
     - Total number of output bytes emitted.

   * - | ``PER_PAIR_EVENT_COUNT``
       | (mongodb.atlas.stream_processing.per_pair_event_count)
     - Counter
     - Total number of events processed for an input/output pair.

   * - | ``PER_PAIR_P50_LATENCY_MICROS``
       | (mongodb.atlas.stream_processing.per_pair_p50_latency_micros)
     - Gauge
     - 50th percentile latency of input + output in microseconds.

   * - | ``PROCESSOR_P50_MICROS``
       | (mongodb.atlas.stream_processing.processor_p50_micros)
     - Gauge
     - 50th percentile latency of the processor in microseconds.
