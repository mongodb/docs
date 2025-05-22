Calculate the required storage space for the resharding operation by 
adding your collection size and index size, assuming a minimum oplog 
window of 24 hours by using this formula:

.. code-block:: none
 
   Available storage required on each shard = [(collection size + index size) *2 ] / number of shards the collection will be distributed across.

For example, a 2TB collection and 400GB of indexes distributed across 
4 shards will need a minimum of 1.2TB of available storage per shard:

.. code-block:: none
    
   [ (2 TB + 400GB) * 2 ] / 4 shards = 1.2 TB / shard

You must confirm that you have the available storage space in your 
cluster.

If there is insufficient space or I/O headroom available, you must 
increase the storage size. If there is insufficient CPU headroom, you 
must scale up the cluster by selecting a higher instance size.

.. tip:: 

   If your MongoDB cluster is hosted on Atlas, you can use the Atlas UI to 
   review storage, CPU, and I/O headroom metrics.
