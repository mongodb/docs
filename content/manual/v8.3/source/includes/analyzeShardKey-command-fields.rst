.. list-table::
   :header-rows: 1
   :widths: 30 15 10 55

   * - Field
     - Type
     - Necessity
     - Description

   * - ``shardKey``
     - document
     - Required
     - Shard key to analyze. This can be a candidate shard key for an 
       unsharded collection or sharded collection or the current shard 
       key for a sharded collection.

       There is no default value.

   * - ``keyCharacteristics``
     - boolean
     - Optional
     - Whether or not the metrics about the characteristics of the shard 
       key are calculated. For details, see
       :ref:`keyCharacteristics <key-characteristics-output>`.

       Defaults to ``true``.

   * - ``readWriteDistribution`` 
     - boolean
     - Optional
     - Whether or not the metrics about the read and write distribution
       are calculated. For details, see 
       :ref:`readWriteDistribution <read-write-distribution-output>`.

       Defaults to ``true``.

       .. include:: /includes/analyzeShardKey-read-and-write-distribution-metrics.rst

   * - ``sampleRate``
     - double
     - Optional
     - The proportion of the documents in the collection to sample when 
       calculating the metrics about the characteristics of the shard 
       key. If you set ``sampleRate``, you cannot set ``sampleSize``.

       Must greater than ``0``, up to and including ``1``.

       There is no default value.

   * - ``sampleSize``
     - integer
     - Optional
     - The number of documents to sample when calculating the metrics 
       about the characteristics of the shard key. If you set 
       ``sampleSize``, you cannot set ``sampleRate``.

       If not specified and ``sampleRate`` is not specified, the sample 
       size defaults to sample size set by
       ``analyzeShardKeyCharacteristicsDefaultSampleSize``.     
