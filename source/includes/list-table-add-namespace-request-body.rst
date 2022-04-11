.. list-table::
   :widths: 30 10 60
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``collection``
     - string
     - The name of the collection associated with the managed namespace.
       
   * - ``customShardKey``
     - string
     - The custom shard key for the collection. :doc:`Global Clusters
       </global-clusters>` require a compound shard key consisting of
       a ``location`` field and a user-selected second key, the custom
       shard key.

   * - ``db``
     - string
     - The name of the database containing the collection.

   * - ``isCustomShardKeyHashed``
     - boolean
     - *Optional.* Flag that specifies whether the custom shard key for 
       the collection is :manual:`hashed 
       </reference/method/sh.shardCollection/#hashed-shard-keys>`. 
       Value can be one of the following:

       - ``true`` - if custom shard key is hashed 
       - ``false`` - if custom shard key is not hashed (default)

       If omitted, defaults to ``false``. If ``false``, |service| uses 
       :manual:`ranged sharding </core/ranged-sharding/>`. This is only 
       available for |service| clusters with MongoDB v4.4 and later.

   * - ``isShardKeyUnique``
     - boolean
     - *Optional.* Flag that specifies whether the underlying index 
       enforces a unique constraint. Value can be one of the following:

       - ``true`` - if shard key is unique 
       - ``false`` - if shard key is not unique (default)

       If omitted, defaults to ``false``. You cannot specify ``true`` 
       when using :manual:`hashed shard keys 
       </core/hashed-sharding/#std-label-sharding-hashed>`.

   * - ``numInitialChunks``
     - integer
     - *Optional.* Specifies the minimum number of chunks to create 
       initially when sharding an empty collection with a 
       :manual:`hashed shard key 
       </core/hashed-sharding/#std-label-sharding-hashed>`. |service| 
       then creates and balances chunks across the cluster. The 
       ``numInitialChunks`` must be less than ``8192`` per shard. If 
       omitted, defaults to ``2``. To learn more, see
       :ref:`Global Cluster Sharding Reference 
       <global-cluster-sharding>`. This is only available for 
       |service| clusters with MongoDB v4.4 and later.

   * - ``presplitHashedZones``
     - boolean
     - *Optional.* For :manual:`hashed sharding 
       </core/hashed-sharding/#std-label-sharding-hashed>` only. Flag 
       that specifies whether to perform initial chunk creation and 
       distribution for an empty or non-existing collection based on 
       the defined zones and zone ranges for the collection. Value 
       can be one of the following:

       - ``true`` - to perform initial chunk creation and distribution 
       - ``false`` - to not perform initial chunk creation and 
         distribution (default)
       
       If omitted, defaults to ``false``. This is only available for 
       |service| clusters with MongoDB v4.4 and later.
