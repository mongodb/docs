
.. _db.currentOp-resharding-ex:

Resharding Output Example
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

   {    
       type: "op",
       desc: "Resharding{Donor, Recipient, Coordinator}Service <reshardingUUID>",
       op: "command",
       ns: "<database>.<collection>",
       originatingCommand: {
           reshardCollection: "<database>.<collection>",
           key: <shardkey>,
           unique: <boolean>,
           collation: {locale: "simple"},
           // Other options to the reshardCollection command are omitted
           // to decrease the likelihood the output is truncated.
      },
      {donor, coordinator, recipient}State : "<service state>",
      approxDocumentsToCopy: NumberLong(<count>),
      approxBytesToCopy: NumberLong(<count>),
      bytesCopied: NumberLong(<count>),
      countWritesToStashCollections: NumberLong(<count>),
      countWritesDuringCriticalSection : NumberLong(<count>),
      countReadsDuringCriticalSection: NumberLong(<count>),
      deletesApplied: NumberLong(<count>),
      documentsCopied: NumberLong(<count>),
      insertsApplied: NumberLong(<count>),
      oplogEntriesFetched: NumberLong(<count>),
      oplogEntriesApplied: NumberLong(<count>),
      remainingOperationTimeEstimatedSecs: NumberLong(<count>),
      allShardsLowestRemainingOperationTimeEstimatedSecs: NumberLong(<estimate>),
      allShardsHighestRemainingOperationTimeEstimatedSecs: NumberLong(<estimate>),
      totalApplyTimeElapsedSecs: NumberLong(<count>),
      totalCopyTimeElapsedSecs: NumberLong(<count>),
      totalCriticalSectionTimeElapsedSecs : NumberLong(<count>),
      totalOperationTimeElapsedSecs: NumberLong(<count>),
      updatesApplied: NumberLong(<count>),
   }

