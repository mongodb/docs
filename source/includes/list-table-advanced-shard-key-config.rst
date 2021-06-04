.. list-table::
   :widths: 20 80

   * - :guilabel:`Default`
     - |service| uses the document that specifies the field or fields 
       as the :manual:`shard key </core/sharding-shard-key/>`.

   * - :guilabel:`Use unique index as the shard key`
     - |service| uses the underlying index to enforce a unique 
       constraint on the shard key of the Global Collection.

   * - :guilabel:`Use hashed index as the shard key`
     - |service| distributes the sharded data evenly by hashing the 
       second field of the shard key. This option is only available for 
       |service| clusters running MongoDB v4.4 or later.
       
       You can optionally select :guilabel:`Pre-split data for even 
       distribution` to specify whether to perform initial chunk 
       creation and distribution for an empty or non-existing 
       collection based on the defined zones and zone ranges for the 
       collection. 
       
       If you select the :guilabel:`Pre-split data for even 
       distribution` option, you can also specify the minimum number of 
       chunks to create initially when sharding an empty collection 
       with a :manual:`hashed shard key </core/hashed-sharding/>`. 
       Initial chunk distribution allows |service| to setup zoned 
       sharding quickly. The number of chunks the |service| creates 
       depends on the number of zones that you define. By default, 
       |service| creates one chunk per location code and distributes 
       chunks evenly across all shards. 

