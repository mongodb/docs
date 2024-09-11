.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Datadog Tags
     - Description

   * - ``organizationname``
     - The |service| organization associated with the metric.
  
   * - ``projectname``
     - The |service| project associated with the metric.

   * - ``clustername``
     - The |service| {+cluster+} associated with the metric.

   * - ``replicasetname``
     - The replica set associated with the metric.

   * - ``shardedclustername``
     - The sharded cluster associated with the metric.

   * - ``databasename``
     - The database associated with the metric.

   * - ``collectionname``
     - The collection associated with the metric.

   * - ``hostnameport``
     - The port number associated with your |service| hostname.

   * - ``hostnamestate``
     - The state of your |service| hostname (primary, secondary, or individual process).
       You can use this tag to filter collection-level latency metrics when querying 
       your sharded cluster or replica set.