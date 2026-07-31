.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Metric
     - Description

   * - :guilabel:`CPU Usage`
     - Displays normalized CPU usage percentage for the ``mongot``
       process.

   * - :guilabel:`JVM Memory`
     - Displays JVM heap memory used and maximum heap capacity
       for the ``mongot`` process. Use this chart to identify
       memory pressure that could affect search performance.

   * - :guilabel:`JVM GC Pause`
     - Displays the maximum JVM garbage collection pause duration,
       in seconds. Frequent or long pauses can affect search
       query latency.

   * - :guilabel:`Disk Space Used`
     - Displays the percentage of disk space used by the ``mongot``
       process.

   * - :guilabel:`Index Size`
     - Displays the combined size of all search indexes on the
       ``mongot`` process, in bytes.

   * - :guilabel:`Index Documents`
     - Displays the total number of documents across all search
       indexes on the ``mongot`` process.

   * - :guilabel:`Index Segments`
     - Displays the total number of Lucene segments across all
       search indexes on the ``mongot`` process.

   * - :guilabel:`Search Query Throughput`
     - Displays the total rate and failed rate of Search queries,
       in operations per second.

   * - :guilabel:`Search Query Latency`
     - Displays the average and maximum latency of Search
       commands, in milliseconds.

   * - :guilabel:`Vector Search Throughput`
     - Displays the total rate and failed rate of Vector Search
       queries, in operations per second.

   * - :guilabel:`Vector Search Latency`
     - Displays the average and maximum latency of Vector Search
       commands, in milliseconds.

   * - :guilabel:`Index Manager Health`
     - Displays the number of index managers in each of the
       following states: ``STEADY_STATE``, ``FAILED``, and
       ``FAILED_EXCEEDED``.
