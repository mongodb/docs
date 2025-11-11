Ensure that the available storage space on each recipient shard is at least
twice the storage size of the collection that you want to reshard plus its
total index size, divided by the number of shards:

.. code-block:: none
  :copyable: false

  ( ( collection_storage_size + index_size ) * 2 ) / shard_count = storage_req

For example, consider a collection with a storage size of 2 TB data and a 400
GB index. To distribute it across four shards you'd need:

.. code-block:: none
  :copyable: false

  ( ( 2 TB collection + 0.4 TB index ) * 2 ) / 4 shards = 1.2 TB storage

To reshard this collection, each shard requires 1.2 TB of available storage. 

On MongoDB Atlas, you may need to upgrade to the next tier of storage for 
the resharding operation. You can downgrade once the operation completes.