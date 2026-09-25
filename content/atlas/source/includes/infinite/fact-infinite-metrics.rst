The following metrics are unique to {+atlas-infinite-full+} and are not
available for {+atlas-core-full+}:

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Metric
     - Description

   * - :guilabel:`Storage IOPS`
     - Use these series to view I/O operations per second against
       {+atlas-infinite-full+}'s storage layer:

       - :guilabel:`Read IOPS` displays the average rate of read
         operations per second.

       - :guilabel:`Write IOPS` displays the average rate of write
         operations per second.

   * - :guilabel:`Storage Latency`
     - Use these series to view the read and write latency for operations
       against {+atlas-infinite-full+}'s storage layer:

       - :guilabel:`Read Latency` displays the average latency of reads
         in milliseconds from {+atlas-infinite-full+}'s storage layer.

       - :guilabel:`Write Latency` displays the average latency of
         writes in milliseconds to {+atlas-infinite-full+}'s storage
         layer.

   * - :guilabel:`Storage Throughput`
     - Use these series to view bytes read from and written to
       {+atlas-infinite-full+}'s storage layer:

       - :guilabel:`Bytes Read` displays the average rate, in
         bytes-per-second, of data read from {+atlas-infinite-full+}'s
         storage layer.

       - :guilabel:`Bytes Written` displays the average rate, in
         bytes-per-second, of data written to {+atlas-infinite-full+}'s
         storage layer.

   * - :guilabel:`Storage Throughput Utilization`
     - Displays the percentage of consumed throughput to
       {+atlas-infinite-full+}'s storage layer.

   * - :guilabel:`Storage Space`
     - Use these series to view storage space usage for
       {+atlas-infinite-full+}:

       - :guilabel:`Storage Space Free` displays the amount of free storage
         space in bytes.

       - :guilabel:`Storage Space Percent Free` displays the percentage of
         storage space that is free.

       - :guilabel:`Storage Space Used` displays the amount of storage space
         in bytes that is currently in use.

       - :guilabel:`Storage Space Percent Used` displays the percentage of
         storage space that is in use.

   * - :guilabel:`Active Collections and Indexes`
     - Displays the number of active collections and indexes.

   * - :guilabel:`Avg Majority Write Concern Wait`
     - The average time write operations in milliseconds wait to satisfy
       their majority write concern. Elevated values indicate replication
       acknowledgement is slow.

To learn more about the {+atlas-infinite-full+} architecture, see
:ref:`atlas-infinite-architecture`.
