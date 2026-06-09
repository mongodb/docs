|fts| stops replicating changes for indexes larger than 2,100,000,000
index objects per partition, on a replica set or single shard, where each indexed
embedded parent document counts as a single object. Surpassing this limit may 
result in stale query results. 

Using the ``embeddedDocuments`` field type can result in indexing objects over
this index size limit, because each indexed embedded document is counted as a single object. 
If you create a |fts| index that has or will soon
have more than 2.1 billion index objects, use the :ref:`numPartitions <fts-index-partition>` index option 
to partition your index (supported only on Search Nodes deployments) or :ref:`shard your cluster <create-cluster-sharding>`.