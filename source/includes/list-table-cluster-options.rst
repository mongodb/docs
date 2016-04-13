.. list-table::
   :widths: 35 65
   :header-rows: 1

   * - Configuration Option

     - Description

   * - :guilabel:`Cluster Name`

     - The name as it will appear in |service|.

   * - :guilabel:`Region`

     - The physical location of your MongoDB cluster.

   * - :guilabel:`Instance Size`

     - The combination of memory, storage, and IOPS of the servers that run
       your MongoDB cluster. Each instance size comes with a default set of
       resources, but you can customize the servers to meet your use case. You
       can modify the following, which changes the cost:

       - :guilabel:`Custom Storage Capacity`: The size of the server root volume.

       - :guilabel:`Custom Storage Speed`: The input/output operations per
         second (IOPS) the system can perform.

       - :guilabel:`Use encrypted storage volumes`: Use simple encryption on
         your root volume for for data at rest and disk I/O.

   * - :guilabel:`Replication Factor`

     - The number of :term:`replica set` members. Each member keeps a copy of
       your database. For more information, see
       :manual:`Replication </replication>` in the MongoDB manual.

   * - :guilabel:`Do you want a sharded cluster?`

     - If the cluster will handle high throughput or contain large data sets,
       you can shard the cluster, which partitions the databases over multiple
       replica sets. Each replica set comprises the number of servers
       specified by the replication factor. For more information on sharded
       clusters, see :manual:`Sharding </sharding>` in the MongoDB manual.

   * - :guilabel:`Do you want to enable backup?`

     - If enabled, |service| takes snapshots of your databases at regular
       intervals and retains them according to your group's :ref:`retention
       policy <retention-policy>`.

   * - :guilabel:`Admin Username & Password`

     - Creates a MongoDB admin user for the cluster. The admin user has read
       and write access to any database in the cluster. Be sure to keep a copy
       of your password.

       You can click :guilabel:`Generate Secure Password` to have |service| can
       generate the password for you. If you do, **copy** the password now.
       |service| displays it only once.
