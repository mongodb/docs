.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description
       
   * - ``customZoneMapping``
     - document
     - An empty document.
       
   * - ``managedNamespaces``
     - array of documents
     - Each document specifies a managed namespace for a global cluster
       managed by |service|. The array is empty
       if no managed namespaces are specified for the |global-write-cluster|.
       For more information, see :ref:`create-new-global-write-cluster`.

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