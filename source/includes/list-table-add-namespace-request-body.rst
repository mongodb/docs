.. list-table::
   :widths: 20 10 70
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