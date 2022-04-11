.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description
       
   * - ``customZoneMapping``
     - document
     - A comma-separated list of all custom zone mappings defined for
       the Global Cluster. |service| automatically maps each location code
       to the closest geographical zone. Custom zone mappings
       allow administrators to override these automatic mappings. If your
       Global Cluster does not have any custom zone mappings, this document
       is empty.

   * - ``managedNamespaces``
     - array of documents
     - Each document specifies a namespace for a :doc:`Global Cluster
       </global-clusters>` managed by |service|.

   * - ``managedNamespaces[n].collection``
     - string
     - The name of the collection associated with the managed namespace.
       
   * - ``managedNamespaces[n].customShardKey``
     - string
     - The custom shard key for the collection. :doc:`Global Clusters
       </global-clusters>` require a compound shard key consisting of
       a ``location`` field and a user-selected second key, the custom
       shard key.

   * - ``managedNamespaces[n].db``
     - string
     - The name of the database containing the collection.

   * - ``managedNamespaces[n].isCustomShardKeyHashed``
     - boolean
     - Flag that specifies whether the custom shard key for the 
       collection is :manual:`hashed 
       </reference/method/sh.shardCollection/#hashed-shard-keys>`. 
       Value can be one of the following:

       - ``true`` - if custom shard key is hashed 
       - ``false`` - if custom shard key is not hashed (default)

       Default value is ``false``. If ``false``, |service| uses 
       :manual:`ranged sharding </core/ranged-sharding/>`. This is only 
       available for |service| clusters with MongoDB v4.4 and later.

   * - ``managedNamespaces[n].isShardKeyUnique``
     - boolean
     - Flag that specifies whether the underlying index enforces a 
       unique constraint. Value can be one of the following:

       - ``true`` - if shard key is unique 
       - ``false`` - if shard key is not unique (default)

   * - ``managedNamespaces[n].numInitialChunks``
     - integer
     - Minimum number of chunks to create initially when sharding an 
       empty collection with a :manual:`hashed shard key 
       </core/hashed-sharding/#std-label-sharding-hashed>`. To learn 
       more, see :ref:`Global Cluster Sharding Reference 
       <global-cluster-sharding>`. This is only available for 
       |service| clusters with MongoDB v4.4 and later.

   * - ``managedNamespaces[n].presplitHashedZones``
     - boolean
     - Flag that specifies whether to perform initial chunk creation 
       and distribution for an empty or non-existing collection based 
       on the defined zones and zone ranges for the collection. Value 
       can be one of the following:

       - ``true`` - to perform initial chunk creation and distribution 
       - ``false`` - to not perform initial chunk creation and 
         distribution (default)
       
       Default value is ``false``. This is only available for 
       |service| clusters with MongoDB v4.4 and later.
