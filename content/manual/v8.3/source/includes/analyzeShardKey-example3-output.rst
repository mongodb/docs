.. code-block:: none
   :copyable: false

   {
      "readDistribution" : {
        "sampleSize" : {
          "total" : 61363,
          "find" : 61363,
          "aggregate" : 0,
          "count" : 0,
          "distinct" : 0
        },
        "percentageOfSingleShardReads" : 50.0008148233,
        "percentageOfMultiShardReads" : 49.9991851768,
        "percentageOfScatterGatherReads" : 0,
        "numReadsByRange" : [
          688,
          775,
          737,
          776,
          652,
          671,
          1332,
          1407,
          535,
          428,
          985,
          573,
          1496,
          ...
          ],
        },
      "writeDistribution" : {
        "sampleSize" : {
          "total" : 49638,
          "update" : 30680,
          "delete" : 7500,
          "findAndModify" : 11458
        },
        "percentageOfSingleShardWrites" : 100,
        "percentageOfMultiShardWrites" : 0,
        "percentageOfScatterGatherWrites" : 0,
        "numWritesByRange" : [
          389,
          601,
          430,
          454,
          462,
          421,
          668,
          833,
          493,
          300,
          683,
          460,
          ...
         ],
         "percentageOfShardKeyUpdates" : 0,
         "percentageOfSingleWritesWithoutShardKey" : 0,
         "percentageOfMultiWritesWithoutShardKey" : 0
       }
   }
