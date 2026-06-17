To return a document summarizing the current status of an existing 
stream processor with {+mongosh+}, use the 
:method:`sp.processor.stats()` method. It has the following syntax:

.. code-block:: sh

   sp.<streamprocessor>.stats({options: {<options>}})

Where ``options`` is an optional document. To learn more about the
command options and output fields, see :method:`sp.processor.stats()`.

The output document has the following fields:

.. list-table::
  :widths: 20 20 60
  :header-rows: 1

  * - Field
    - Type
    - Description

  * - ``ns``
    - string
    - The namespace the stream processor is defined in.

  * - ``stats``
    - object
    - A document describing the operational state of the stream 
      processor.

  * - ``stats.name``
    - string
    - The name of the stream processor.

  * - ``stats.status``
    - string
    - The engine state of the stream processor, which represents its
      internal execution state on a single worker. This field can
      have the following values:

      - ``starting``
      - ``running``
      - ``error``
      - ``stopping``

      This differs from the ``state`` field returned by
      :method:`sp.listStreamProcessors()`, which reports the |service|
      control-plane lifecycle state of the stream processor. The
      two values can differ. For example, a processor's
      control-plane ``state`` can be ``STOPPING`` while its engine
      ``stats.status`` is still ``running``, or the control-plane
      ``state`` can be ``PROVISIONING`` while ``stats.status``
      returns no value because the processor is not yet running on
      a worker.

  * - ``stats.scaleFactor``
    - integer
    - The scale in which the size field displays. If set to ``1``,
      sizes display in bytes. If set to ``1024``, sizes display in
      kilobytes.

  * - ``stats.inputMessageCount``
    - integer
    - The number of documents published to the stream. A document
      is considered 'published' to the stream once it passes
      through the :pipeline:`$source` stage, not when it passes 
      through the entire pipeline.

  * - ``stats.inputMessageSize``
    - integer
    - The number of bytes or kilobytes published to the stream. 
      Bytes are considered 'published' to the stream once they pass
      through the :pipeline:`$source` stage, not when it passes
      through the entire pipeline.

  * - ``stats.outputMessageCount``
    - integer
    - The number of documents processed by the stream. A document is
      considered 'processed' by the stream once it passes through the
      entire pipeline.

  * - ``stats.outputMessageSize``
    - integer
    - The number of bytes or kilobytes processed by the stream. Bytes
      are considered 'processed' by the stream once they pass through
      the entire pipeline.

  * - ``stats.dlqMessageCount``
    - integer
    - The number of documents sent to the :ref:`atlas-sp-dlq`.

  * - ``stats.dlqMessageSize``
    - integer
    - The number of bytes or kilobytes sent to the 
      :ref:`atlas-sp-dlq`.

  * - ``stats.changeStreamTimeDifferenceSecs``
    - integer
    - The difference, in seconds, between the event time represented by
      the most recent change stream :ref:`resume token
      <change-event-resume-token>` and the latest event in the
      :term:`oplog`.

  * - ``stats.changeStreamState``
    - token
    - The most recent change stream :ref:`resume token
      <change-event-resume-token>`. Only applies to stream processors
      with a change stream source.

  * - ``stats.latency``
    - document
    - Latency statistics for the stream processor as a whole.
      {+atlas-sp+} returns this field only if you pass in the 
      ``verbose`` option.

  * - ``stats.latency.p50``
    - integer
    - The estimated 50th percentile latency of all documents
      processed in the past 30 seconds. If your pipeline includes
      a window stage, latency measurements include the interval
      of the window.

      For example, if your ``$tumblingWindow`` stage has an interval
      of 5 minutes, latency measurements will include those 5 minutes.

  * - ``stats.latency.p99``
    - integer
    - The estimated 99th percentile latency of all documents 
      processed in the past 30 seconds. If your pipeline includes
      a window stage, latency measurements include the interval
      of the window.

      For example, if your ``$tumblingWindow`` stage has an interval
      of 5 minutes, latency measurements will include those 5 minutes.      

  * - ``stats.latency.start``
    - datetime
    - Wall time at which the most recent 30 second measurement
      window began.

  * - ``stats.latency.end``
    - datetime
    - Wall time at which the most recent 30 second measurement
      window ended.
    
  * - ``stats.latency.unit``
    - string
    - Unit of time in which latency is counted. This value is
      always ``microseconds``.

  * - ``stats.latency.count``
    - integer
    - Number of documents the stream processor has processed in
      the most recent 30 second measurement window.

  * - ``stats.latency.sum``
    - integer
    - Sum of all individual latency measurements, in
      microseconds, taken in the most recent 30 second
      measurement window.
    
  * - ``stats.stateSize``
    - integer
    - The number of bytes used by windows to store processor state.

  * - ``stats.watermark``
    - integer
    - The timestamp of the current watermark.

  * - ``stats.operatorStats``
    - array
    - The statistics for each operator in the processor pipeline. 
      {+atlas-sp+} returns this field only if you pass in the 
      ``verbose`` option.
      
      ``stats.operatorStats`` provides per-operator versions of many
      core ``stats`` fields:

      - ``stats.operatorStats.name``
      - ``stats.operatorStats.inputMessageCount``
      - ``stats.operatorStats.inputMessageSize``
      - ``stats.operatorStats.outputMessageCount``
      - ``stats.operatorStats.outputMessageSize``
      - ``stats.operatorStats.dlqMessageCount``
      - ``stats.operatorStats.dlqMessageSize``
      - ``stats.operatorStats.latency``
      - ``stats.operatorStats.stateSize``
        
      ``stats.operatorStats`` includes the following
      unique fields:

      - ``stats.operatorStats.maxMemoryUsage``
      - ``stats.operatorStats.executionTimeMillis``
 
      ``stats.operatorStats`` also includes the following fields given 
      that you have passed in the ``verbose`` option and your 
      processor includes a window stage:

      - ``stats.minOpenWindowStartTime``
      - ``stats.maxOpenWindowStartTime``

      ``stats.operatorStats`` can also include the following field 
      for certain source and sink operators:

      - ``stats.operatorStats.targetStats``

  * - ``stats.operatorStats.maxMemoryUsage``
    - integer
    - The maximum memory usage of the operator in bytes or kilobytes.

  * - ``stats.operatorStats.executionTimeSecs``
    - integer
    - The total execution time of the operator in seconds.

  * - ``stats.minOpenWindowStartTime``
    - date
    - The start time of the minimum open window. This value is optional.

  * - ``stats.maxOpenWindowStartTime``
    - date
    - The start time of the maximum open window. This value is optional.

  * - ``stats.operatorStats.targetStats``
    - array
    - The per-target statistics for certain source and sink operators.

      Each element of this array is a document that represents a single 
      input or output target, such as an input or output collection or 
      a {+kafka+} topic. Depending on the operator, each document 
      contains a subset of the following fields:

      For source operators, such as {+kafka+} :pipeline:`$source` 
      or change stream sources:

      Either ``db`` and ``coll`` for MongoDB targets, or ``topic`` 
      for {+kafka+} targets.

      - ``inputMessageCount`` 
      - ``inputMessageSize``

      For sink operators, such as MongoDB :pipeline:`$merge` 
      or ``$emit`` sinks:

      Either ``db`` and ``coll`` for MongoDB targets, or ``topic`` 
      for {+kafka+} targets.

      - ``outputMessageCount`` 
      - ``outputMessageSize``

      {+atlas-sp+} collects per-target statistics only for 
      some stream aggregation stages, such as {+kafka+} 
      :pipeline:`$source` and MongoDB :pipeline:`$merge`.

      It records per-target statistics for at most 100 distinct targets; 
      after that, the stream processor stops adding new entries to 
      ``targetStats`` but continues updating aggregate 
      per-operator statistics.

  * - ``stats.kafkaPartitions``
    - array
    - Offset information for an {+kafka+} broker's partitions. 
      ``kafkaPartitions`` applies only to connections using an 
      {+kafka+} source.
 
  * - ``stats.kafkaPartitions.partition``
    - integer
    - The {+kafka+} topic partition number.

  * - ``stats.kafkaPartitions.currentOffset``
    - integer
    - The offset that the stream processor is on for the
      specified partition. This value equals the previous offset
      that the stream processor processed plus ``1``.

  * - ``stats.kafkaPartitions.checkpointOffset``
    - integer
    - The offset that the stream processor last committed to the
      {+kafka+} broker and the checkpoint for the specified
      partition. All messages through this offset are 
      recorded in the last checkpoint.

  * - ``stats.kafkaPartitions.isIdle``
    - boolean
    - The flag that indicates whether the partition is idle. This 
      value defaults to ``false``. 

For example, the following shows the status of a stream processor named 
``proc01`` on a {+spw+} named ``inst01`` with item sizes displayed in 
KB:

.. code-block:: sh

  sp.proc01.stats(1024)

  {
    ok: 1,
    ns: 'inst01',
    stats: {
      name: 'proc01',
      status: 'running',
      scaleFactor: Long("1"), 
      inputMessageCount: Long("706028"),
      inputMessageSize: 958685236,
      outputMessageCount: Long("46322"),
      outputMessageSize: 85666332,
      dlqMessageCount: Long("0"),
      dlqMessageSize: Long("0"),
      stateSize: Long("2747968"),
      watermark: ISODate("2023-12-14T14:35:32.417Z"),
      ok: 1
    },
  }

The example shows the overall statistics for the stream processor.

To see how individual operators behave or how much traffic each 
target handles, call ``sp.<streamprocessor>.stats()`` with the 
``verbose`` option and inspect ``stats.operatorStats`` and, 
for some operators, ``stats.operatorStats.targetStats``.

For example, for a source operator, ``stats.operatorStats.targetStats`` 
collects the ``inputMessageCount`` and ``inputMessageSize`` 
fields for every unique ``db``/``coll`` or every unique topic:

.. code-block:: sh

  {
    "name" : "KafkaConsumerOperator",
    "inputMessageCount" : NumberLong(100),
    "inputMessageSize" : 100352,
    "targetStats" : [
      {
      "topic" : "outputTopic1",
      "inputMessageCount" : NumberLong(100),
      "inputMessageSize" : 100352
      }
    ],
    ...
  }

And for a sink operator, ``stats.operatorStats.targetStats`` 
collects the ``outputMessageCount`` and ``outputMessageSize`` 
fields for every unique ``db``/``coll`` or every unique topic:

.. code-block:: sh

  {
    "name" : "MergeOperator",
    "inputMessageCount" : NumberLong(10),
    "inputMessageSize" : 1744,
    "targetStats" : [
      {
        "db" : "cust1",
        "coll" : "outColl1",
        "outputMessageCount" : NumberLong(3),
        "outputMessageSize" : 1748
      },
      {
        "db" : "cust2",
        "coll" : "outColl2",
        "outputMessageCount" : NumberLong(4),
        "outputMessageSize" : 2241
      }
    ],
    ...
  }
