The ``sharding`` array is optional and defines the configuration of each sharded cluster.

.. code-block:: cfg

   "sharding" : [
       {
           "name" : <string>,
           "configServer" : [ <string>, ... ],
           "collections" : [
               {
                   "_id" : <string>,
                   "key" : [
                       [ shard key ],
                       [ shard key ],
                       ...
                   ]
               },
               ...
           ],
           "shards" : [
               {
                   "_id" : <string>,
                   "rs" : <string>
               },
               ...
           ]
       },
       ...
   ]

.. list-table::
   :widths: 30 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``sharding``
     - array of objects
     - *Optional*. Objects that define the configuration of each
       :term:`sharded cluster`. Each object in the array contains the
       specifications for one cluster. The Automation Agent regularly
       checks each cluster's state against the specifications. If the
       specification and cluster don't match, the agent will change the
       configuration of the cluster, which might cause the balancer to
       migrate chunks.

   * - ``sharding.name``
     - string
     - The name of the cluster. This must correspond with the value in
       ``processes.cluster`` for a :program:`mongos`.

   * - ``sharding.configServer``
     - array
     - String values that provide the names of each :term:`config server's
       <config server>` hosts. The host names are the same names as are
       used in each host's ``processes.name`` field.

   * - ``sharding.collections``
     - array of objects
     - Objects that define the sharded :term:`collections <collection>`
       and their :term:`shard keys <shard key>`.

   * - ``sharding.collections._id``
     - string
     - The :term:`namespace` of the sharded collection. The namespace is
       the combination of the database name and the name of the
       collection. For example, ``testdb.testcoll``.

   * - ``sharding.collections.key``
     - array of arrays
     - The collection's :term:`shard keys <shard key>`. This "array of
       arrays" contains a single array if there is a single shard key and
       contains multiple arrays if there is a compound shard key.

   * - ``sharding.shards``
     - array of objects
     - Objects that define the cluster's :term:`shards <shard>`.

   * - ``sharding.shards._id``
     - string
     - The name of the shard.

   * - ``sharding.shards.rs``
     - string
     - The name of the shard's replica set, as specified in the
       ``replicaSets._id`` field.
