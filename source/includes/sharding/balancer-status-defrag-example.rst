If the queried namespace is going through chunk defragmentation, the
|balancer-command| returns output similar to the following:

.. code-block:: javascript
   :copyable: false

   {
      "balancerCompliant": false,
      "firstComplianceViolation": "defragmentingChunks",
      "details": {
         "currentPhase": "moveAndMergeChunks",
         "progress": { "remainingChunksToProcess": 1 }
      }
   }

.. note::
   
   Chunk defragmentation occurs in multiple phases. The ``progress`` field
   only pertains to the current phase. 
