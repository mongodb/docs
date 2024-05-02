The **sharding** array defines the configuration of each sharded
cluster. This parameter is required for deployments with sharded
clusters.

.. code-block:: json
   :linenos:

   "sharding" : [
     {
       "managedSharding" : false,
       "name" : "<string>",
       "configServerReplica" : "<string>",
       "shards" : [
         {
           "_id" : "<string>",
           "rs" : "<string>",
           "tags" : [ "<string>", ... ]
         },
         ...
       ],
     },
     ...
   ]

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - sharding
     - array of objects
     - Optional
     - Objects that define the configuration of each
       :manual:`sharded cluster </reference/glossary/#std-term-sharded-cluster>`. Each object in the array contains the
       specifications for one cluster. The {+mdbagent+} regularly
       checks each cluster's state against the specifications. If the
       specification and cluster don't match, the agent will change the
       configuration of the cluster, which might cause the balancer to
       migrate chunks.

   * - sharding.managedSharding
     - boolean
     - Optional
     - Flag that indicates whether |mms| Automation manages all
       :manual:`sharded collections </sharding>`
       and :manual:`tags </core/zone-sharding>` in the deployment.
       Starting in |mms| version 7.0, this can be set only to ``false``.

   * - sharding.name
     - string
     - Conditional
     - Name of the cluster. This must correspond with the value in
       **processes.cluster** for a |mongos|.

   * - sharding.configServerReplica
     - string
     - Conditional
     - Name of the :ref:`config server replica set <csrs>`.

       You can add this array parameter if your config server runs as a replica set.

       If you run legacy mirrored config servers that
       don't run as a replica set, use **sharding.configServer**.

   * - sharding.configServer
     - array of strings
     - Conditional
     - Names of the config server hosts. The host names match the names
       used in each host's **processes.name** parameter.

       If your sharded cluster runs MongoDB 3.4 or later, use
       **sharding.configServerReplica**.

       .. important:: MongoDB 3.4 removes support for mirrored config servers.

   * - sharding.shards
     - array of objects
     - Conditional
     - Cluster's :manual:`shards  </reference/glossary/#std-term-shard>`.

   * - sharding.shards._id
     - string
     - Conditional
     - Name of the shard.

   * - sharding.shards.rs
     - string
     - Conditional
     - Name of the shard's replica set. This is specified in the
       **replicaSets._id** parameter.

   * - sharding.shards.tags
     - array of strings
     - Conditional
     - Zones assigned to this shard.

       You can add this array parameter if you use
       :manual:`zoned sharding </core/zone-sharding>`.
