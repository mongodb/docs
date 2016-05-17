.. list-table::
   :widths: 35 65
   :header-rows: 1

   * - Configuration Option

     - Description

   * - :guilabel:`Cluster Name`

     - The name as it will appear in |service|.

   * - :guilabel:`Region`

     - The physical location of your MongoDB cluster. The region you choose
       can affect network latency for clients accessing your databases.

       Pricing for cluster configuration settings vary by region. You can make
       configuration choices and then try different region selections to
       compare costs before creating the cluster.

   * - :guilabel:`Instance Size`

     - The memory, storage, and IOPS specification for each server for
       your MongoDB cluster. Each instance size comes with a default
       set of resources, but you can customize the servers to meet your
       use case. You can modify the following, which changes the cost:

       - :guilabel:`Custom Storage Capacity`: The size of the server root volume.

       - :guilabel:`Custom Storage Speed`: The input/output operations per
         second (IOPS) the system can perform.

       - :guilabel:`Use encrypted storage volumes`: Uses simple encryption on
         your root volume for data at rest and disk I/O.

   * - :guilabel:`Replication Factor`

     - The number of :term:`replica set` members. Each member keeps a copy of
       your database, providing high availability and data redundancy. For
       more information, see :manual:`Replication </replication>` in the
       MongoDB manual.

   * - :guilabel:`Do you want a sharded cluster?`

     - :term:`Sharded clusters <sharded cluster>` support horizontal
       scaling.

       Each shard in the sharded cluster is a replica set, consisting
       of the number of members specified by the replication factor.

       |service| runs the :ref:`config servers
       <sharding-config-server>` as a three-member replica set.
       
       For more information on sharded clusters, see :manual:`Sharding
       </sharding>` in the MongoDB manual.

   * - :guilabel:`Do you want to enable backup?`

     - If enabled, |service| takes snapshots of your databases at regular
       intervals and retains them according to your group's :ref:`retention
       policy <retention-policy>`.

   * - :guilabel:`Admin Username & Password`

     - Creates a MongoDB admin user with the specified username and
       password. These fields appears only if you are creating the
       first cluster in a |service| group.
       
       **When creating a new admin user, be sure to save the
       credentials.**

       The admin user has read and write access to any MongoDB database
       in any cluster in your |service| group. The admin user can also
       enable sharding.

       To have |service| generate the password for the admin user,
       click :guilabel:`Generate Secure Password`. If you choose to
       have |service| generate the password, |service| displays it only
       once.
