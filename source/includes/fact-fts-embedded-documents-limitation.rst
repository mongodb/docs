|fts| doesn't support indexing more than two billion 
index objects, where each indexed embedded document counts as a single 
object. Using the ``embeddedDocuments`` field type can result in indexing 
objects over this limit, which causes an index to transition to a failed state. 
If your collection has large arrays that might generate two billion objects, you 
must :ref:`shard <create-cluster-sharding>` any clusters that contain 
indexes with the ``embeddedDocuments`` type.
