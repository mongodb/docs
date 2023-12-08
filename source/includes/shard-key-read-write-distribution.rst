``readWriteDistribution`` contains metrics about the query 
routing patterns and the :ref:`hotness 
<sharding-troubleshooting-monotonicity>` of shard key ranges. These 
metrics are based on sampled queries.

To configure query sampling for a collection, use the
``configureQueryAnalyzer`` command. The read and write distribution
metrics are only returned if ``readWriteDistribution`` is ``true``. The
metrics are calculated when |analyzeShardKey| is run and the metrics use
the sampled read and write queries. If there are no sampled queries,
read and write distribution metrics aren't returned.

- If there are no sampled read queries, the command returns
  ``writeDistribution`` but omits ``readDistribution``.

- If there are no sampled write queries, the command returns
  ``readDistribution`` but omits ``writeDistribution``.

.. include:: /includes/analyzeShardKey-read-and-write-distribution-metrics.rst

.. list-table::
   :header-rows: 1

   * - ``keyCharacteristics`` Value
     - ``readWriteDistribution`` Value 
     - Results Returned

   * - ``true``
     - ``false``
     -
       - |analyzeShardKey| returns 
         :ref:`keyCharacteristics <key-characteristics-output>` metrics and 
         omits :ref:`readWriteDistribution <read-write-distribution-output>`
         metrics.

       - If the shard key doesn't have a |suppindx|, 
         |analyzeShardKey| returns an 
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

       - If the shard key doesn't have a supporting index, 
         |analyzeShardKey| returns ``readWriteDistribution`` metrics 
         and omits ``keyCharacteristics`` metrics.
