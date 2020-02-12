Starting in MongoDB 4.2, you can update a document's shard key value
unless the shard key field is the immutable ``_id`` field. Before
MongoDB 4.2, a document's shard key field value is immutable.