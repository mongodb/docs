
When you run the :dbcommand:`shardCollection` command, the
balancer begins distributing the collection data to other shards
in the cluster. A single shard can only participate in one chunk
migration at a time. When MongoDB succeeds in copying a range of
data from one shard to another, the range on the donor shard is
marked for removal by the range deleter. This process is slow
and resource intensive.

Starting in MongoDB 8.0, if your deployment meets the
:ref:`resource requirements <reshard-to-same-key-req>`, it's
recommended you use the :dbcommand:`reshardCollection` command
to perform this initial balancing of data by resharding to the
same key. This causes MongoDB to rebalance data across the
shards without waiting on the balancer.

To use the :dbcommand:`reshardCollection` command to perform the
initial balancing:

#. Use the :dbcommand:`shardCollection` command to configure the
   collection as a sharded collection. 

#. Use the :dbcommand:`reshardCollection` to reshard to the same
   shard key by setting the ``forceRedistribution`` option to
   ``true``. MongoDB then balances the data across the shards.

For more information, see :ref:`reshard-to-same-key`.

