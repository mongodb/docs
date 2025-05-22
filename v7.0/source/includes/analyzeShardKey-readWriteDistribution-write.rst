.. list-table::
   :header-rows: 1
   :widths: 20 20 30 30

   * - Field
     - Type
     - Description
     - Usage    

   * - ``sampleSize.total``
     - integer
     - Total number of sampled write queries.
     -

   * - ``sampleSize.update``
     - integer
     - Total number of sampled ``update`` queries. 
     -
   
   * - ``sampleSize.delete``
     - integer
     - Total number of sampled ``delete`` queries.
     -
   
   * - ``sampleSize.findAndModify``
     - integer
     - Total number of sampled ``findAndModify`` queries.
     -

   * - ``percentageOfSingleShardWrites``
     - double
     - Percentage of writes that target a single shard, 
       regardless of how the data is distributed.
     - 

   * - ``percentageOfMultiShardWrites``
     - double
     - Percentage of writes that target multiple shards.
     - This category includes the writes that may target only a single 
       shard if the data is distributed such that the values targeted 
       by the write fall under a single shard.

   * - ``percentageOfScatterGatherWrites``
     - double
     - Percentage of writes that are scatter-gather, regardless of how 
       the data is distributed.    
     - Avoid a shard key with a high value for this metric because
       it is generally more performant for a write to target a single 
       shard.

   * - ``numWritesByRange``
     - array of integers 
     - Array of numbers representing the number of times that each 
       range sorted from ``MinKey`` to ``MaxKey`` is targeted.
     - Avoid a shard key where the distribution of 
       ``numWritesByRange`` is a very skewed since that implies that 
       there is likely to be one or more hot shards for writes.

       Choose a shard key where the sum of ``numWritesByRange`` is 
       similar to ``sampleSize.total``. 
       
       The number of ranges can be configured using the 
       ``analyzeShardKeyNumRanges`` parameter which defaults to ``100``.
       The value is ``100`` because the goal is to find a shard key that 
       scales up to 100 shards.

   * - ``percentageOfShardKeyUpdates``
     - double
     - Percentage of write queries that update a document’s shard key 
       value.
     - Avoid a shard key with a high ``percentageOfShardKeyUpdates``.
       Updates to a document’s shard key value may cause 
       the document to move to a different shard, which requires 
       executing an internal transaction on the shard that the query 
       targets. For details on changing a document's shard key value, 
       see :ref:`<change-a-shard-key>`.
       
       Updates are currently only supported as retryable writes or in a 
       transaction, and have a batch size limit of ``1``. 

   * - ``percentageOfSingleWritesWithoutShardKey``
     - double
     - The percentage of write queries that are ``multi=false`` and not 
       targetable to a single shard. 
     - Avoid a shard key with a high value for this metric.

       Performing this type of write is expensive because they can
       involve running internal transactions.

   * - ``percentageOfMultiWritesWithoutShardKey``
     - double
     - The percentage of write queries that are ``multi=true`` and not 
       targetable to a single shard.
     - Avoid a shard key with a high value for this metric.

