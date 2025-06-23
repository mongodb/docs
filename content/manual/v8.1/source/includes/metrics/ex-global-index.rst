
.. _db.currentOp-global-index-ex:

Global Index Example
~~~~~~~~~~~~~~~~~~~~

.. code-block:: javascript

   {
       type: "op",
       desc: "GlobalIndex{Donor, Recipient, Coordinator}Service <globalIndexUUID}",
       op: "command",
       ns: "<database>.<collection>",
       originatingCommand: {
           createIndexes: "<database>.<collection>",
           key: <indexkeypattern>,
           unique: <boolean>,
           <Additional createIndexes options>
       },
      {donor, coordinator, recipient}State : "<service state>",
      approxDocumentsToScan: Long(<count>),
      approxBytesToScan: Long(<count>),
      bytesWrittenFromScan: Long(<count>),
      countWritesToStashCollections: Long(<count>),
      countWritesDuringCriticalSection : Long(<count>),
      countReadsDuringCriticalSection: Long(<count>),
      keysWrittenFromScan: Long(<count>),
      remainingOperationTimeEstimatedSecs: Long(<count>),
      allShardsLowestRemainingOperationTimeEstimatedSecs: Long(<estimate>),
      allShardsHighestRemainingOperationTimeEstimatedSecs: Long(<estimate>),
      totalCopyTimeElapsedSecs: Long(<count>),
      totalCriticalSectionTimeElapsedSecs : Long(<count>),
      totalOperationTimeElapsedSecs: Long(<count>),
   }

