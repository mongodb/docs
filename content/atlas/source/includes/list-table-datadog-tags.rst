.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Datadog Tags
     - Description

   * - | ``organizationname`` 
       | ``org_name``
     - |service| organization associated with the metric.

   * - | ``projectname`` 
       | ``group_name``
     - |service| project associated with the metric.

   * - ``group_id``
     - Unique identifier of the |service| project associated with the metric.

   * - ``clustername``
     - |service| {+cluster+} associated with the metric.

   * - ``replicasetname``
     - Replica set associated with the metric.

   * - ``shardedclustername``
     - Sharded cluster associated with the metric.

   * - ``databasename``
     - Database associated with the metric.

   * - ``collectionname``
     - Collection associated with the metric.

   * - ``hostnameport``
     - Port number associated with your |service| hostname.

   * - ``hostnamestate``
     - State of your |service| hostname (primary, secondary, or individual process).
       You can use this tag to filter collection-level latency metrics when querying 
       your sharded cluster or replica set.

   * - ``processor_name``
     - Name of the stream processor associated with the metric.

   * - ``processor_id``
     - Unique identifier of the stream processor associated with the metric.

   * - ``tenant_name``
     - Name of the {+spw+} associated with the metric.

   * - ``tenant_id``
     - Unique identifier of the {+spw+} associated with the metric.

