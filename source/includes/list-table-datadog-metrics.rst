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
     - Latency rate in milliseconds for read requests and
       write requests.


   * - | ``DISK_MAX_LATENCY_READS``
       | (mongodb.atlas.system.disk.max.latency.reads)
       | ``DISK_MAX_LATENCY_WRITES``
       | (mongodb.atlas.system.disk.max.latency.writes)
     - Disk
     - Maximum latency gauge in milliseconds for read requests and write
       requests.

   * - | ``DISK_PARTITION_UTILIZATION``
       | (mongodb.atlas.system.disk.iops.percentutilization)
     - Disk
     - Percentage of time during which requests are being issued
       to and serviced by the disk partition. Includes requests from all
       processes, not just MongoDB processes.

   * - | ``DISK_QUEUE_DEPTH``
       | (mongodb.atlas.system.disk.queuedepth)
     - Disk
     - Average length of the queue of requests issued 
       to the disk partition that MongoDB uses over the time 
       period specified by the metric granularity.

   * - | ``MAX_DISK_PARTITION_UTILIZATION_DATA``
       | (mongodb.atlas.system.disk.max.iops.percentutilization)
     - Disk
     - Maximum disk utilization percent value over the time period
       specified by the metric granularity.

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

   * - | ``QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED``
       | (mongodb.atlas.metrics.queryexecutor.scannedobjectsperreturned)
     - Process
     - Ratio measuring number of objects scanned over objects
       returned. Lower values indicate more efficient queries.

   * - | ``REPLICATION_LAG``
       | (mongodb.atlas.replset.replicationlag)
     - Process
     - Amount of time in seconds that updates to the secondary delay
       behind updates to the primary.

   * - | ``REPLICATION_OPLOG_WINDOW``
       | (mongodb.atlas.replset.oplogWindow) 
     - Process
     - Estimated average number, in seconds, of database 
       operations available in the primary’s replication oplog. This 
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

       .. important::

          If the health status is ``1``, but no other metrics appear in 
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
     - Gauge that indicates physical memory used, in bytes.

   * - | ``MAX_SYSTEM_MEMORY_USED``
       | (mongodb.atlas.system.memory.max.used)
       | ``MAX_SYSTEM_MEMORY_AVAILABLE``
       | (mongodb.atlas.system.memory.max.available)
     - System
     - Gauge that indicates the maximum physical memory used, in bytes.

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
       | (mongodb.atlas.system.cpu.mongoprocess.user)
       | ``PROCESS_NORMALIZED_CPU_KERNEL``
       | (mongodb.atlas.system.cpu.mongoprocess.kernel)
       | ``PROCESS_NORMALIZED_CPU_CHILDREN_USER`` 
       | (mongodb.atlas.system.cpu.mongoprocess.childrenuser)
       | ``PROCESS_NORMALIZED_CPU_CHILDREN_KERNEL``
       | (mongodb.atlas.system.cpu.mongoprocess.childrenkernel)
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
