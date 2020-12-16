.. list-table::
      :header-rows: 1
      :widths: 20 10 70

      * - Name
        - Type
        - Description

      * - ``created``
        - DateTime
        - Date this MongoDB process was created.

      * - ``groupId``
        - string
        - ID of the project that owns the process.

      * - ``hostname``
        - string
        - Hostname of the machine running the process.

      * - ``id``
        - string
        - Host ID of the machine running the process.

      * - ``lastPing``
        - DateTime
        - Date and time when the last ping for this process was received.

      * - ``links``
        - array of objects
        - One or more links to sub-resources and/or related resources.

      * - ``port``
        - number
        - Port on which the process listens.

      * - ``shardName``
        - string
        - Name of the shard this process belongs to. Only present if
          this process is part of a sharded cluster.

      * - ``replicaSetName``
        - string
        - Name of the replica set this process belongs to. Only present
          if this process is part of a replica set.

      * - ``typeName``
        - string
        - Type of process. Possible values are:

          - ``NO_DATA``
          - ``RECOVERING``
          - ``REPLICA_ARBITER``
          - ``REPLICA_PRIMARY``
          - ``REPLICA_SECONDARY``
          - ``SHARD_CONFIG_PRIMARY``
          - ``SHARD_CONFIG_SECONDARY``
          - ``SHARD_MONGOS``

          The type for new processes is ``NO_DATA`` until process
          deployment completes.

      * - ``version``
        - string
        - Version of MongoDB running for this process.
