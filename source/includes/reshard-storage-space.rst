Ensure that your cluster has sufficient available disk space for 
resharding. If documents in the resharded collection are equally 
distributed across the cluster, each shard requires 
``( ( Collection size + Index Size) / Number of Shards ) * 1.2`` on 
every shard the collection will be distributed to.

.. note::

   Resharding requires additional disk space because the process creates 
   a new collection with data distributed across shards according to the 
   new shard key.
