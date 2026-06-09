If you create a |fts| index that has or will soon 
have more than 2.1 billion index objects, you must use ``numPartitions``
or :ref:`shard your cluster <create-cluster-sharding>`. For this limit, each top-level 
document or nested ``embeddedDocument`` in the indexed collection 
fields counts as one object

By default, |fts| stops replicating changes for a single index that grows larger 
than 2.1 billion index objects on any given replica set member or shard. 
This means your index remains queryable, but you might 
get stale results.