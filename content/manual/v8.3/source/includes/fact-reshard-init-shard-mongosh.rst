
When you run the :method:`sh.shardCollection` method, the
balancer begins distributing the collection data to other shards
in the cluster. A single shard can only participate in one chunk
migration at a time. When MongoDB succeeds in copying a range of
data from one shard to another, the range on the donor shard is
marked for removal by the range deleter. This process is slow
and resource intensive.

Starting in MongoDB 8.0, if your deployment meets the
:ref:`resource requirements <reshard-to-same-key-req>`, it's
recommended that you use the :method:`sh.shardAndDistributeCollection`
method to shard the collection. This method wraps the
:dbcommand:`shardCollection` and :dbcommand:`reshardCollection`
commands to shard the collection and immediately reshard it to
the same key. This causes MongoDB to rebalance data across the
shards without waiting on the balancer.

For more information, see :ref:`reshard-to-same-key`.

