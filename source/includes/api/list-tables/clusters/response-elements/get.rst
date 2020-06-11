.. list-table::
   :widths: 15 10 75
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``clusterName``
     - string
     - Display name of the cluster. Note that |mongod| itself doesn't
       allow you to name a cluster; |mms| supplies this name and you can
       update it. For a replica set within a sharded cluster, the
       cluster name is the name of its parent cluster.

   * - ``groupId``
     - string
     - Unique identifier of the project to which the cluster belongs.

   * - ``id``
     - string
     - Unique identifier of the cluster.

   * - ``lastHeartbeat``
     - date
     - |iso8601-time| when |mms| most recently processed a ping from
       this cluster. 

   * - ``replicaSetName``
     - string
     - Replica set name. |mms| returns this value when a cluster has a
       ``typeName`` of ``REPLICA_SET`` or ``CONFIG_SERVER_REPLICA_SET``.

   * - ``shardName``
     - string
     - Shard name. |mms| returns this value when a cluster has a
       ``typeName`` of ``SHARDED`` or a ``REPLICA_SET`` that part of a
       sharded cluster. 

   * - ``typeName``
     - string
     - Cluster type. |mms| may return:

       .. list-table::
          :header-rows: 1
          :widths: 50 50
          :stub-columns: 1

          * - ``typeName``
            - Description

          * - ``REPLICA_SET`` 
            - :term:`A replica set <replica set>`.

          * - ``SHARDED`` 
            - A sharded cluster where each shard is a :term:`standalone`
              instance. No shards are replica sets. 

          * - ``SHARDED_REPLICA_SET`` 
            - A sharded cluster that contains at least one shard that is
              a replica set. 

          * - ``CONFIG_SERVER_REPLICA_SET`` 
            - Config servers deployed as a replica set. 
