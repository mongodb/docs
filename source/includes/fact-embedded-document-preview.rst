The |fts| :ref:`embeddedDocuments <bson-data-types-embedded-documents>`
type, :ref:`embedded-document-ref` operator, and :ref:`scoring-embedded`
scoring option are in preview. When an |fts| index on a replica set or
single MongoDB shard reaches 2,147,483,647 index objects,
|fts| transitions the index to a failed, non-queryable state. A solution
to accommodate this limitation will be in place when this feature is
generally available. To troubleshoot any issues related to using this
feature, contact :ref:`Support <request-support>`. To request support
for more than 2,147,483,647 index objects, upvote
:ftsuservoice:`this request </suggestions/45979813-support-for-index-partitions>` 
in the MongoDB Feedback Engine.
