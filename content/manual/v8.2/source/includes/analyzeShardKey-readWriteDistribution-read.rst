.. list-table::
   :header-rows: 1
   :widths: 20 20 30 30

   * - Field
     - Type
     - Description
     - Usage    

   * - ``sampleSize.total``
     - integer
     - Total number of sampled read queries.
     -

   * - ``sampleSize.find``
     - integer
     - Total number of sampled ``find`` queries.
     -
   
   * - ``sampleSize.aggregate``
     - integer
     - Total number of sampled ``aggregate`` queries.
     -
   
   * - ``sampleSize.count``
     - integer
     - Total number of sampled ``count`` queries.
     -

   * - ``sampleSize.distinct``
     - integer
     - Total number of sampled ``distinct`` queries.
     -

   * - ``percentageOfSingleShardReads``
     - double
     - Percentage of reads that target a single shard, 
       regardless of how the data is distributed.
     - 

   * - ``percentageOfMultiShardReads``
     - double
     - Percentage of reads that target multiple shards.
       
     - This category includes the reads that may target only 
       a single shard if the data is distributed such that the values 
       targeted by the read fall under a single shard.
     
       If the queries operate on a large amount of data, then targeting 
       multiple shards instead of one may result in a decrease in 
       latency due to the parallel query execution.

   * - ``percentageOfScatterGatherReads``
     - double
     - Percentage of reads that are scatter-gather, 
       regardless of how the data is distributed.    
     - Avoid a shard key with high value for this metric. While 
       scatter-gather queries are low-impact on the shards that do not 
       have the target data, they still have some performance impact. 

       On a cluster with a large number of shards, scatter-gather 
       queries perform significantly worse than queries that target a 
       single shard. 
   
   * - ``numReadsByRange``
     - array of integers 
     - Array of numbers representing the number of times that each 
       range sorted from ``MinKey`` to ``MaxKey`` is targeted.
     - Avoid a shard key where the distribution of 
       ``numReadsByRange`` is very skewed since that implies that 
       there is likely to be one or more hot shards for reads.  
  
       Choose a shard key where the sum of ``numReadsByRange`` is 
       similar to ``sampleSize.total``. 

       The number of ranges can be configured using the 
       ``analyzeShardKeyNumRanges`` parameter which defaults to ``100``.
       The value is ``100`` because the goal is to find a shard key that 
       scales up to 100 shards.

