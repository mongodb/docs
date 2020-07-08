The ``sharding`` array defines the configuration of each sharded cluster.
This field is required for deployments with sharded clusters.

.. code-block:: cfg

   "sharding" : [
       {
           "managedSharding" : <boolean>,
           "name" : <string>,
           "configServerReplicaSet" : <string>,
           // "configServerReplicaSet" applies if the config server is a replica set.
           // For legacy mirrored config servers, use "configServer", which takes a
           // string array.
           "collections" : [
               {
                   "_id" : <string>,
                   "key" : [
                       [ shard key ],
                       [ shard key ],
                       ...
                   ],
                   "unique" : <boolean>
               },
               ...
           ],
           "shards" : [
               {
                   "_id" : <string>,
                   "rs" : <string>,
                   "tags" : [ <string>, ... ]
               },
               ...
           ],
           "tags" : [
               {
                   "ns" : <string>,
                   "min" : [
                       {
                           "field" : <string>,
                           "fieldType" : <string>,
                           "value" : <string>
                       }
                   ],
                   "max" : [
                       {
                           "field" : <string>,
                           "fieldType" : <string>,
                           "value" : <string>
                       }
                   ],
                   "tag" : <string>
               },
               ...
           ]
       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``sharding``
     - object array
     - *Optional*. Objects that define the configuration of each
       :term:`sharded cluster`. Each object in the array contains the
       specifications for one cluster. The {+aagent+} regularly
       checks each cluster's state against the specifications. If the
       specification and cluster don't match, the agent will change the
       configuration of the cluster, which might cause the balancer to
       migrate chunks.

   * - | ``sharding``
       | ``.managedSharding``
     - boolean
     - If ``true``, |mms| Automation manages all :manual:`sharded collections </sharding>`
       and :manual:`tags </core/zone-sharding>` (i.e., zones) in the deployment.

   * - | ``sharding``
       | ``.name``
     - string
     - The name of the cluster. This must correspond with the value in
       ``processes.cluster`` for a :program:`mongos`.

   * - | ``sharding``
       | ``.configServerReplica``
     - string
     - The name of the :term:`config server's <config server>` replica set.

       Use this field only for a config server that is a replica set. If you
       use legacy mirrored config servers (config servers that are not a
       replica set), use ``sharding.configServer``.

   * - | ``sharding``
       | ``.configServer``
     - array of strings
     - For legacy mirrored :term:`config servers <config server>`, an array
       that contains the names of the config server hosts. The host names are
       the same names used in each host's ``processes.name`` field.

       Use this field only for legacy mirrored config servers (config servers
       that are not a replica set), which are available only with MongoDB 3.2
       and earlier. Otherwise use ``sharding.configServerReplica``.

       .. important:: MongoDB 3.4 removes support for mirrored config servers.

   * - | ``sharding``
       | ``.collections``
     - object array
     - Objects that define the sharded :term:`collections <collection>`
       and their :term:`shard keys <shard key>`.

   * - | ``sharding``
       | ``.collections``
       | ``._id``
     - string
     - The :term:`namespace` of the sharded collection. The namespace is
       the combination of the database name and the name of the
       collection. For example, ``testdb.testcoll``.

   * - | ``sharding``
       | ``.collections``
       | ``.key``
     - array of arrays
     - The collection's :term:`shard keys <shard key>`. This "array of
       arrays" contains a single array if there is a single shard key and
       contains multiple arrays if there is a compound shard key.

   * - | ``sharding``
       | ``.collections``
       | ``.unique``
     - boolean
     - If set to ``true``, MongoDB enforces uniqueness for the shard key. For
       more information, see the :manual:`sh.shardCollection()
       method </reference/method/sh.shardCollection>` in
       the MongoDB manual.

   * - | ``sharding``
       | ``.shards``
     - object array
     - Objects that define the cluster's :term:`shards <shard>`.

   * - | ``sharding``
       | ``.shards``
       | ``._id``
     - string
     - The name of the shard.

   * - | ``sharding``
       | ``.shards``
       | ``.rs``
     - string
     - The name of the shard's replica set, as specified in the
       ``replicaSets._id`` field.

   * - | ``sharding``
       | ``.shards``
       | ``.tags``
     - array of strings
     - If you use :manual:`zoned sharding </core/zone-sharding>`, the zones
       assigned to the shard.

   * - | ``sharding``
       | ``.tags``
     - object array
     - If you use :manual:`zoned sharding </core/zone-sharding>`, this array
       defines the zones. Each object in this array defines a zone and
       configures the shard key range for that zone.

   * - | ``sharding``
       | ``.tags``
       | ``.ns``
     - string
     - The :term:`namespace` of the collection that uses zoned sharding.
       The namespace is the combination of the database name and the name of
       the collection. For example, ``testdb.testcoll``.

   * - | ``sharding``
       | ``.tags``
       | ``.min``
     - array
     - The minimum value of the shard key range.

       .. include:: /includes/possibleValues-sharding.tags-ranges.rst

   * - | ``sharding``
       | ``.tags``
       | ``.max``
     - array
     - The maximum value of the shard key range.

       .. include:: /includes/possibleValues-sharding.tags-ranges.rst

   * - | ``sharding``
       | ``.tags``
       | ``.tag``
     - string

     - The name of the :manual:`zone </core/zone-sharding>` associated with
       the shard key range specified by ``sharding.tags.min`` and
       ``sharding.tags.max``.

.. example:: The ``sharding.tags`` Array with Compound Shard Key

   The following example configuration defines a compound shard key range with a
   min value of ``{ a : 1, b : ab }`` and a max value of ``{ a : 100, b : fg }``.
   The example defines the range on the ``testdb.test1`` collection and assigns
   it to zone ``zone1``.

   .. code-block:: cfg

      "tags" : [
          {
              "ns" : "testdb.test1",
              "min" : [
                  {
                      "field" : "a",
                      "fieldType" : "integer",
                      "value" : "1"
                  },
                  {
                      "field" : "b",
                      "fieldType" : "string",
                      "value" : "ab"
                  }
              ],
              "max" : [
                  {
                      "field" : "a",
                      "fieldType" : "integer",
                      "value" : "100"
                  },
                  {
                      "field" : "b",
                      "fieldType" : "string",
                      "value" : "fg"
                  }
              ],
              "tag" : "zone1"
          }
      ]
