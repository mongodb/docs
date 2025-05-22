This is the structure of the document that is
returned when ``readWriteDistribution`` is set to ``true``:

.. code-block:: javascript
   :copyable: false
   
   {
      readDistribution: {
        sampleSize: {
          total: <integer>,
          find: <integer>,
          aggregate: <integer>,
          count: <integer>,
          distinct: <integer>
        },
        percentageOfSingleShardReads: <double>,
        percentageOfMultiShardReads: <double>,
        percentageOfScatterGatherReads: <double>,
        numReadsByRange: [
          <integer>,
          ...
        ]
      },
      writeDistribution: {
        sampleSize: {
          total: <integer>,
          update: <integer>,
          delete: <integer>,
          findAndModify: <integer>
        },
        percentageOfSingleShardWrites: <double>,
        percentageOfMultiShardWrites: <double>,
        percentageOfScatterGatherWrites: <double>,
        numWritesByRange: [
          <integer>,
          ...     
        ],
        percentageOfShardKeyUpdates: <double>,
        percentageOfSingleWritesWithoutShardKey: <double>,
        percentageOfMultiWritesWithoutShardKey: <double>
      }
   }

.. include:: /includes/analyzeShardKey-read-and-write-distribution-metrics.rst
