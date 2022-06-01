The |fts| :ref:`bson-data-types-embedded-documents` index option,  
:ref:`embedded-document-ref` operator, and :ref:`scoring-embedded` 
scoring option are in preview. When an |fts| index on a replica set or 
single MongoDB shard reaches Lucene’s two billion document limit, 
|fts| doesn't index new documents or apply updates to existing 
documents for that index. A solution to accomodate this limitation will 
be in place when we make this feature generally available. Meanwhile, 
the MongoDB Cloud Support team will help troubleshoot any issues 
related to using this feature as part of your contract.
