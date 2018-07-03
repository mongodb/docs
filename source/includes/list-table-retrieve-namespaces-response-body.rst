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