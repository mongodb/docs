
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
      approxDocumentsToScan: NumberLong(<count>),
      approxBytesToScan: NumberLong(<count>),
      bytesWrittenFromScan: NumberLong(<count>),
      countWritesToStashCollections: NumberLong(<count>),
      countWritesDuringCriticalSection : NumberLong(<count>),
      countReadsDuringCriticalSection: NumberLong(<count>),
      keysWrittenFromScan: NumberLong(<count>),
      remainingOperationTimeEstimatedSecs: NumberLong(<count>),
      allShardsLowestRemainingOperationTimeEstimatedSecs: NumberLong(<estimate>),
      allShardsHighestRemainingOperationTimeEstimatedSecs: NumberLong(<estimate>),
      totalCopyTimeElapsedSecs: NumberLong(<count>),
      totalCriticalSectionTimeElapsedSecs : NumberLong(<count>),
      totalOperationTimeElapsedSecs: NumberLong(<count>),
   }

