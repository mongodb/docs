The |fts| :ref:`embeddedDocuments <bson-data-types-embedded-documents>`
index option, :ref:`embedded-document-ref` operator, and
:ref:`scoring-embedded` scoring option are in preview. When an |fts|
index on a replica set or single MongoDB shard reaches Lucene's two
billion document limit, |fts| doesn't index new documents or apply
updates to existing documents for that index. A solution to accommodate
this limitation will be in place when this feature is generally
available. To troubleshoot any issues related to using this feature,
contact :ref:`Support <request-support>`. 
