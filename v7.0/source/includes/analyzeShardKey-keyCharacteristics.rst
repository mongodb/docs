This is the structure of the ``keyCharacteristics`` document that is
returned when ``keyCharacteristics`` is set to ``true``:

.. code-block:: javascript
   :copyable: false

   {
      keyCharacteristics: {
         numDocsTotal: <integer>,
         numOrphanDocs: <integer>, 
         avgDocSizeBytes: <integer>,
         numDocsSampled: <integer>,
         isUnique: <bool>,
         numDistinctValues: <integer>,
         mostCommonValues: [
           { value: <shardkeyValue>, frequency: <integer> },
           ...
         ],
         monotonicity: {
           recordIdCorrelationCoefficient: <double>,
           type: "monotonic"|"not monotonic"|"unknown",
       }
     }
   }

.. list-table::
   :header-rows: 1
   :widths: 20 30 20 30 

   * - Field
     - Type
     - Description
     - Usage    

   * - ``numDocsTotal``
     - integer
     - The number of documents in the collection.
     - 

   * - ``numOrphanDocs``
     - integer
     - The number of orphan documents.
     - Orphan documents are not excluded from metrics calculation for 
       performance reasons. If ``numOrphanDocs`` is large relative 
       to ``numDocsTotal``, consider waiting until the number of orphan 
       documents is very small compared to the total number of documents 
       in the collection to run the command.

   * - ``avgDocSizeBytes``
     - integer
     - The average size of documents in the collection, in bytes.
     - If ``numDocsTotal`` is comparable to ``numDocsSampled``, you can
       estimate the size of the largest chunks by multiplying the 
       ``frequency`` of each ``mostCommonValues`` by 
       ``avgDocSizeBytes``.

   * - ``numDocsSampled``
     - integer
     - The number of sampled documents.
     - 

   * - ``numDistinctValues``
     - integer
     - The number of distinct shard key values.
     - Choose a shard key with a large ``numDistinctValues`` since the 
       number of distinct shard key values is the maximum number of 
       chunks that the balancer can create.
   
   * - ``isUnique``
     - boolean
     - Indicates whether the shard key is unique. This is only set to 
       ``true`` if there is a unique index for the shard key.
     - If the shard key is unique, then the number of distinct values 
       is equal to the number of documents. 
   
   * - ``mostCommonValues``
     - array of documents
     - An array of value and ``frequency`` (number of documents) of 
       the top most common shard key values.
     - The frequency of a shard key value is the minimum number of 
       documents in the chunk containing that value. If the frequency 
       is large, then the chunk can become a bottleneck for storage, 
       reads and writes. Choose a shard key where the frequency for 
       each most common value is low relative to ``numDocsSampled``.  

       The number of most common shard key values can be configured
       by setting ``analyzeShardKeyNumMostCommonValues`` which defaults 
       to ``5``. To avoid exceeding the 16MB BSON size limit for the 
       response, each value is set to "truncated" if its size exceeds 
       15MB / 
       :ref:`analyzeShardKey
       NumMostCommonValues <ask-nmcv-param>`.

   * - ``mostCommonValues[n].value``
     - document
     - The shard key.
     - 
   
   * - ``mostCommonValues[n].frequency``
     - integer
     - The number of documents for a given shard key.
     - Choose a shard key where the frequency for each most common 
       value is low relative to ``numDocsSampled``.

   * - ``monotonicity.``
       ``recordIdCorrelationCoefficient``
     - double
     - Only set if the monotonicity is known.
     - This is set to ``"unknown"`` when the one of the following is
       true:

       - The shard key does not have a supporting index per 
         ``shardCollection`` definition.
       - The collection is :ref:`clustered <clustered-collections>`.
       - The shard key is a hashed compound shard key where the hashed 
         field is not the first field. 

       The monotonicity check can return an incorrect result if the 
       collection has gone through chunk migrations. Chunk migration 
       deletes documents from the donor shard and re-inserts them on 
       the recipient shard. There is no guarantee that the insertion 
       order from the client is preserved.

       You can configure the threshold for the correlation coefficient 
       with 
       :ref:`analyzeShardKeyMonotonicity
       CorrelationCoefficientThreshold <ask-mcct-param>`.

   * - ``monotoncity.type``
     - string
     - Can be one of: 

       ``"monotonic"``,
       ``"not monotonic"``,
       ``"unknown"``
     - Avoid a shard key with type ``"monotonic"`` unless you do not 
       expect to insert new documents often.

       If a collection is sharded on a shard key that is monotonically 
       increasing or decreasing, new documents will be inserted onto 
       the shard that owns the ``MaxKey`` or ``MinKey`` chunk. That 
       shard can become the bottleneck for inserts and the data will 
       likely be unbalanced most of the time since the balancer will 
       need to compete with the inserts that come in. 

