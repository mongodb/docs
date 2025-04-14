
.. _db.currentOp-resharding-ex:

Resharding Output Example
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

   {
       shard: '<string>',
       totalCopyTimeElapsedSecs: Long('<count>'),
       totalApplyTimeElapsedSecs: Long('<count>'),
       totalCriticalSectionTimeElapsedSecs: Long('<count>'),
       totalIndexBuildTimeElapsedSecs: Long('<count>'),
       indexesToBuild: Long('<count>'),
       indexesBuilt: Long('<count>'),
       oplogEntriesFetched: Long('<count>'),
       oplogEntriesApplied: Long('<count>'),
       insertsApplied: Long('<count>'),
       updatesApplied: Long('<count>'),
       deletesApplied: Long('<count>'),
       type: 'op',
       desc: 'ReshardingMetrics{Donor|Recipient|Coordinator}Service <reshardingUUID>',
       op: 'command',
       ns: '<database>.<collection>',
       originatingCommand: {
          reshardCollection: '<database>.<collection>',
          key: '<shardkey>',
          unique:'<boolean>',
          collation: { locale: 'simple' }
       },
       totalOperationTimeElapsedSecs: Long('<count>'),
       recipientState: '<service state>',
       remainingOperationTimeEstimatedSecs: Long('<count>'),
       approxDocumentsToCopy: Long('<count>'),
       approxBytesToCopy: Long('<count>'),
       bytesCopied: Long('<count>'),
       countWritesToStashCollections: Long('<count>'),
       documentsCopied: Long('<count>'),
       provenance: 'reshardCollection'
   }