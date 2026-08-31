To return a document summarizing the current status of an existing 
stream processor with {+mongosh+}, use the 
:method:`sp.processor.stats()` method. It has the following syntax:

.. code-block:: sh

   sp.<streamprocessor>.stats({options: {<options>}})

Where ``options`` is an optional document. To learn more about the
command options and output fields, see :method:`sp.processor.stats()`.

For a description of every field in the output document, see
:ref:`atlas-sp-metrics`.

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
      addedParallelism: 7,
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
