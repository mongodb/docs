.. list-table::
   :header-rows: 1

   * - Metric Name(s)
     - Metric Type
     - Description

   * - ``CONNECTIONS`` (mongodb.atlas.connections.current)
     - Process
     - Number of open connections currently open on the cluster.

   * - | ``DB_STORAGE_TOTAL`` (mongodb.atlas.stats.totalstoragesize)
       | ``DB_DATA_SIZE_TOTAL`` (mongodb.atlas.stats.totaldatasize)
     - Process
     - Total database storage size and data size on the cluster in
       bytes.

   * - ``DISK_PARTITION_UTILIZATION`` (mongodb.atlas.system.disk.iops.percentutilization)
     - Disk
     - Percentage of time during which requests are being issued
       to and serviced by the disk partition. Includes requests from all
       processes, not just MongoDB processes.

   * - | ``DOCUMENT_METRICS_RETURNED`` (mongodb.atlas.metrics.document.returned)
       | ``DOCUMENT_METRICS_INSERTED`` (mongodb.atlas.metrics.document.inserted)
       | ``DOCUMENT_METRICS_UPDATED`` (mongodb.atlas.metrics.document.updated)
       | ``DOCUMENT_METRICS_DELETED`` (mongodb.atlas.metrics.document.deleted)
     - Process
     - Number of documents read or written per second.

   * - | ``OPCOUNTER_CMD`` (mongodb.atlas.opcounters.command)
       | ``OPCOUNTER_QUERY`` (mongodb.atlas.opcounters.query)
       | ``OPCOUNTER_UPDATE`` (mongodb.atlas.opcounters.update)
       | ``OPCOUNTER_DELETE`` (mongodb.atlas.opcounters.delete)
       | ``OPCOUNTER_GETMORE`` (mongodb.atlas.opcounters.getmore)
       | ``OPCOUNTER_INSERT`` (mongodb.atlas.opcounters.insert)
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

   * - ``QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED`` (mongodb.atlas.metrics.queryexecutor.scannedobjectsperreturned)
     - Process
     - Ratio measuring number of objects scanned over objects
       returned. Lower values indicate more efficient queries.

   * - | ``SYSTEM_NORMALIZED_CPU_USER`` 
       | (mongodb.atlas.system.cpu.norm.user)
       | ``SYSTEM_NORMALIZED_CPU_KERNEL`` (mongodb.atlas.system.cpu.norm.kernel)
       | ``SYSTEM_NORMALIZED_CPU_NICE``
       | (mongodb.atlas.system.cpu.norm.nice)
       | ``SYSTEM_NORMALIZED_CPU_IOWAIT`` (mongodb.atlas.system.cpu.norm.iowait)
       | ``SYSTEM_NORMALIZED_CPU_IRQ``
       | (mongodb.atlas.system.cpu.norm.irq)
       | ``SYSTEM_NORMALIZED_CPU_SOFTIRQ`` (mongodb.atlas.system.cpu.norm.softirq)
       | ``SYSTEM_NORMALIZED_CPU_GUEST`` (mongodb.atlas.system.cpu.norm.guest)
       | ``SYSTEM_NORMALIZED_CPU_STEAL`` (mongodb.atlas.system.cpu.norm.steal)
     - System
     - Percent of time utilized by logical CPUs across various
       processes for the server. These values are normalized with
       respect to the number of logical CPU cores.

   * - | ``PROCESS_NORMALIZED_CPU_USER`` (mongodb.atlas.system.cpu.mongoprocess.user)
       | ``PROCESS_NORMALIZED_CPU_KERNEL`` (mongodb.atlas.system.cpu.mongoprocess.kernel)
       | ``PROCESS_NORMALIZED_CPU_CHILDREN_USER`` (mongodb.atlas.system.cpu.mongoprocess.childrenuser)
       | ``PROCESS_NORMALIZED_CPU_CHILDREN_KERNEL`` (mongodb.atlas.system.cpu.mongoprocess.childrenkernel)
     - Process
     - Percent of time utilized by logical CPUs across various
       processes specific to the MongoDB process in the server. These
       values are normalized with respect to the number of logical CPU
       cores.

   * - | ``MEMORY_RESIDENT`` (mongodb.atlas.mem.resident)
       | ``MEMORY_VIRTUAL`` (mongodb.atlas.mem.virtual)
     - Process
     - Memory (in ``MB``) consumed by the MongoDB process on
       the server, separated by memory type.

   * - | ``OPCOUNTER_REPL_CMD`` (mongodb.atlas.opcountersrepl.command)
       | ``OPCOUNTER_REPL_UPDATE`` (mongodb.atlas.opcountersrepl.update)
       | ``OPCOUNTER_REPL_DELETE`` (mongodb.atlas.opcountersrepl.delete)
       | ``OPCOUNTER_REPL_INSERT`` (mongodb.atlas.opcountersrepl.insert)
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

   * - | ``DISK_PARTITION_SPACE_FREE`` (mongodb.atlas.system.disk.space.free)
       | ``DISK_PARTITION_SPACE_USED`` (mongodb.atlas.system.disk.space.used)
       | ``DISK_PARTITION_SPACE_PERCENT_FREE`` (mongodb.atlas.system.disk.space.percentfree)
       | ``DISK_PARTITION_SPACE_PERCENT_USED`` (mongodb.atlas.system.disk.space.percentused)
     - Disk
     - Measure free disk space and used disk space (in bytes) on the
       disk partition used by MongoDB.

   * - | ``DISK_PARTITION_IOPS_READ``
       | (mongodb.atlas.system.disk.iops.reads)
       | ``DISK_PARTITION_IOPS_WRITE`` (mongodb.atlas.system.disk.iops.writes)
       | ``DISK_PARTITION_IOPS_TOTAL`` (mongodb.atlas.system.disk.iops.total) 
     - Disk
     - Measure throughput of |iops| for the disk partition used by
       MongoDB.

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
     - Measure number of bytes of data and number of bytes of dirty data in 
       :manual:`WiredTiger's cache 
       </reference/command/serverStatus/#serverstatus.wiredTiger.cache>`.

   * - | ``TICKETS_AVAILABLE_READS``
       | (mongodb.atlas.wiredtiger.concurrenttransactions.read.available)
       | ``TICKETS_AVAILABLE_WRITES``
       | (mongodb.atlas.wiredtiger.concurrenttransactions.write.available)
     - Process
     - Measure number of read and write operations in the 
       :manual:`storage engine </core/wiredtiger>`.
