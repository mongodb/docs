:red:`WARNING:` If you shard a collection that already has a |fts|
index, you might experience a brief period of incomplete search results
while the index is building on a shard. Also, if you add a shard for
an already sharded collection that contains a |fts| index, your search
queries against that collection might return incomplete results until
the initial sync process completes on the added shards. To learn more,
see :ref:`initial sync process <troubleshoot-initial-sync>`. 
