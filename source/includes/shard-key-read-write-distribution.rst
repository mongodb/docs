``readWriteDistribution`` consists of the metrics about the query 
routing patterns and the :ref:`hotness 
<sharding-troubleshooting-monotonicity>` of shard key ranges. These 
metrics are based on sampled queries. You can configure query sampling
for a collection with ``configureQueryAnalyzer``. These 
metrics are only returned when ``readWriteDistribution`` is true. The 
metrics are calculated when |analyzeShardKey| is run based on sampled 
read and write queries and are not be returned if there are no sampled 
queries.

- If there are no sampled read queries, the command returns
  ``writeDistribution`` but omits ``readDistribution``.

- If there are no sampled write queries, the command returns
  ``readDistribution`` but omits ``writeDistribution``.


.. list-table::
   :header-rows: 1

   * - ``keyCharacteristics`` Value
     - ``readWriteDistribution`` Value 
     - Behaviors

   * - ``true``
     - ``false``
     -
       - |analyzeShardKey| returns 
         :ref:`keyCharacteristics <key-characteristics-output>` metrics and 
         omits :ref:`readWriteDistribution <read-write-distribution-output>`
         metrics.

       - If the shard key does not have a |suppindx|, 
         |analyzeShardKey| raises an 
         ``IllegalOperation`` error.

   * - ``false``
     - ``true``
     - |analyzeShardKey| returns ``readWriteDistribution`` metrics 
       and omits ``keyCharacteristics`` metrics.

   * - ``true``
     - ``true``
     - 
       - |analyzeShardKey| returns both ``readWriteDistribution`` 
         metrics and ``keyCharacteristics`` metrics.

       - If the shard key does not have a supporting index, 
         |analyzeShardKey| returns ``readWriteDistribution`` metrics 
         and omits ``keyCharacteristics`` metrics.
