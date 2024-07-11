Ensure that the available storage space on each shard the
collection will be distributed across is at least twice the size
of the collection that you want to reshard and its total index
size, divided by the number of shards. 

.. code-block:: none
  :copyable: false

  storage_req = ( ( collection_storage_size + index_size ) * 2 ) / shard_count

For example, consider a collection that contains 2 TB of
data and has a 400 GB index distributed across four shards.
To perform a resharding operation on this collection, each
shard would require 1.2 TB of available storage.

.. code-block:: none
  :copyable: false

  1.2 TB storage = ( ( 2 TB collection + 0.4 TB index ) * 2 ) / 4 shards

To meet storage requirements, you may need to upgrade to
the next tier of storage during the resharding operation.
You can scale down once the operation completes.

