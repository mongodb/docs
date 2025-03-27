The |fts| :ref:`embeddedDocuments <bson-data-types-embedded-documents>`
type, :ref:`embedded-document-ref` operator, and :ref:`scoring-embedded`
scoring option are in preview. When an |fts| index on a replica set or
single MongoDB shard reaches 2,100,000,000 index objects,
|fts| transitions the index to a stale, queryable state. If you would
like |fts| to support more than 2,100,000,000 index objects in the
future, vote for :ftsuservoice:`this request
</suggestions/45979813-support-for-index-partitions>` in the MongoDB
Feedback Engine.
