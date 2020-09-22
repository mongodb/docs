The **sharding** array defines the configuration of each sharded
cluster. This parameter is required for deployments with sharded
clusters.

.. code-block:: json
   :linenos:

   "sharding" : [
     {
       "managedSharding" : <boolean>,
       "name" : "<string>",
       "configServerReplicaSet" : "<string>",
       "collections" : [
         {
           "_id" : "<string>",
           "key" : [
             [ "shard key" ],
             [ "shard key" ],
             ...
           ],
           "unique" : <boolean>
         },
         ...
       ],
       "shards" : [
         {
           "_id" : "<string>",
           "rs" : "<string>",
           "tags" : [ "<string>", ... ]
         },
         ...
       ],
       "tags" : [
         {
           "ns" : "<string>",
           "min" : [
             {
               "parameter" : "<string>",
               "parameterType" : "<string>",
               "value" : "<string>"
             }
           ],
           "max" : [
             {
               "parameter" : "<string>",
               "parameterType" : "<string>",
               "value" : "<string>"
             }
           ],
           "tag" : "<string>"
         },
         ...
       ]
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
       :term:`sharded cluster`. Each object in the array contains the
       specifications for one cluster. The {+mdbagent+} regularly
       checks each cluster's state against the specifications. If the
       specification and cluster don't match, the agent will change the
       configuration of the cluster, which might cause the balancer to
       migrate chunks.

   * - sharding.managedSharding
     - boolean
     - Conditional
     - Flag that indicates whether |mms| Automation manages all
       :manual:`sharded collections </sharding>`
       and :manual:`tags </core/zone-sharding>` in the deployment

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

   * - sharding.collections
     - array of objects
     - Conditional
     - Objects that define the sharded :term:`collections <collection>`
       and their :term:`shard keys <shard key>`.

   * - sharding.collections._id
     - string
     - Conditional
     - :term:`namespace` of the sharded collection. The namespace
       is the combination of the database name and the name of the
       collection. For example, **testdb.testcoll**.

   * - sharding.collections.key
     - array of arrays
     - Conditional
     - Collection's :term:`shard keys <shard key>`. It contains:

       - One array if your cluster uses one shard key.
       - Multiple arrays if your cluster uses a compound shard key.

   * - sharding.collections.unique
     - boolean
     - Conditional
     - Flag that indicates whether MongoDB
       :manual:`enforces uniqueness for the shard key </reference/method/sh.shardCollection>`.

   * - sharding.shards
     - array of objects
     - Conditional
     - Cluster's :term:`shards <shard>`.

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

   * - sharding.tags
     - array of objects
     - Conditional
     - Definition of zones for
       :manual:`zoned sharding </core/zone-sharding>`. Each object in
       this array defines a zone and configures the shard key range
       for that zone.

   * - sharding.tags.ns
     - string
     - Conditional
     - :term:`Namespace <namespace>` of the collection that uses zoned
       sharding. The namespace combines the database name and the name
       of the collection.

       .. example::

          testdb.testcoll

   * - sharding.tags.min
     - array
     - Conditional
     - Minimum value of the shard key range.

       .. include:: /includes/possibleValues-sharding.tags-ranges.rst

   * - sharding.tags.max
     - array
     - Conditional
     - Maximum value of the shard key range.

       .. include:: /includes/possibleValues-sharding.tags-ranges.rst

   * - sharding.tags.tag
     - string
     - Conditional
     - Name of the :manual:`zone </core/zone-sharding>` associated
       with the shard key range specified by **sharding.tags.min** and
       **sharding.tags.max**.

.. example:: The **sharding.tags** Array with Compound Shard Key

   The following example configuration defines a compound shard key
   range with a min value of **{ a : 1, b : ab }** and a max value of
   **{ a : 100, b : fg }**. The example defines the range on the
   **testdb.test1** collection and assigns it to zone **zone1**.

   .. code-block:: json
      :linenos:

      "tags" : [
        {
          "ns" : "testdb.test1",
          "min" : [
            {
              "parameter" : "a",
              "parameterType" : "integer",
              "value" : "1"
            },
            {
              "parameter" : "b",
              "parameterType" : "string",
              "value" : "ab"
            }
          ],
          "max" : [
            {
              "parameter" : "a",
              "parameterType" : "integer",
              "value" : "100"
            },
            {
              "parameter" : "b",
              "parameterType" : "string",
              "value" : "fg"
            }
          ],
          "tag" : "zone1"
        }
      ]
