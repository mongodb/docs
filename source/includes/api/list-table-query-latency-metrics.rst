.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Metric
     - Description 

   * - ``TOTAL_LATENCY``
     - Rate that indicates the total combined operation 
       execution time on a collection (total combined 
       operation execution time / collection interval in seconds).

   * - ``READS_LATENCY``
     - Rate that indicates the total combined read operation execution 
       time on a collection (total combined read operation execution 
       time / collection interval in seconds).

   * - ``WRITES_LATENCY``
     - Rate that indicates the total combined write operation 
       execution time on a collection (total combined write operation 
       execution time / collection interval in seconds).

   * - ``COMMANDS_LATENCY``
     - Rate that indicates the total combined command operation 
       execution time on a collection (total combined command operation 
       execution time / collection interval in seconds).

   * - ``AVERAGE_TOTAL_OPS_LATENCY``
     - Total operation execution time divided by the total operation 
       count across all operation types.

   * - ``AVERAGE_READS_LATENCY``
     - Read operation execution time divided by the read operation 
       count.

   * - ``AVERAGE_WRITES_LATENCY``
     - Write operation execution time divided by the write operation 
       count.

   * - ``AVERAGE_COMMANDS_LATENCY``
     - Command operation execution time divided by the command 
       operation count.
 
   * - ``TOTAL_OPS_P50_VALUE``
     - 50th percentile in the :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.

   * - ``READS_P50_VALUE``
     - 50th percentile in the read :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.

   * - ``WRITES_P50_VALUE``
     - 50th percentile in the write :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.

   * - ``COMMANDS_P50_VALUE``
     - 50th percentile in the command :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.
     
   * - ``TOTAL_OPS_P95_VALUE``
     - 95th percentile in the :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.

   * - ``READS_P95_VALUE``
     - 95th percentile in the read :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.

   * - ``WRITES_P95_VALUE``
     - 95th percentile in the write :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.

   * - ``COMMANDS_P95_VALUE``
     - 95th percentile in the command :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.
       
   * - ``TOTAL_OPS_P99_VALUE``
     - 99th percentile in the :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>` across all operations.

   * - ``READS_P99_VALUE``
     - 99th percentile in the read :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.

   * - ``WRITES_P99_VALUE``
     - 99th percentile in the write :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.

   * - ``COMMANDS_P99_VALUE``
     - 99th percentile in the command :manual:`latency histogram 
       </reference/operator/aggregation/collStats/#latencystats-document>`.
  
   * - ``TOTAL_OPS``
     - Rate that indicates the total number of operations 
       performed on a collection  (total operations / collection 
       interval).

   * - ``READS_OPS``
     - Rate that indicates the number of read operations 
       performed on a collection  (read operations / collection 
       interval).

   * - ``WRITES_OPS``
     - Rate that indicates the number of write operations 
       performed on a collection  (write operations / collection 
       interval).

   * - ``COMMANDS_OPS``
     - Rate that indicates the number of command operations 
       performed on a collection  (command operations / collection 
       interval).
