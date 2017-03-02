.. list-table::
   :widths: 35 65
   :header-rows: 1

   * - Configuration Option

     - Description


   * - :guilabel:`MongoDB Version`

     - The MongoDB version [#version]_ for your cluster. |service|
       always deploys the cluster with the latest stable release of the
       specified version.

       .. include:: /includes/extracts/fact-mongodb-version-create-a-cluster.rst

   * - :guilabel:`Cluster Name`

     - The name as it will appear in |service|.

   * - :guilabel:`Region`

     - The physical location of your MongoDB cluster. The region you
       choose can affect network latency for clients accessing your
       databases. Regions marked as :guilabel:`Recommended` provide 
       higher availability compared to other regions.
       
       For more information on :guilabel:`Recommended` AWS regions, 
       see :ref:`amazon-aws-availability-zones`.

       .. include:: /includes/fact-group-region-association.rst
 
       Pricing for cluster configuration settings :ref:`vary by region
       <region-costs>`.

   * - :guilabel:`Instance Size`

     - The memory, storage, and IOPS specification for each
       data-bearing server [#data-bearing]_ for your |service| cluster.

       .. include:: /includes/fact-instance-size-groupings.rst

       Each instance size comes with a default set of resources, but
       you can modify the following:

       - :guilabel:`Custom Storage Capacity`: The size of the server
         root volume. Changes to storage capacity affects :ref:`cost
         <instance-size-costs>`.

       - :guilabel:`Custom Storage Speed`: The input/output operations
         per second (IOPS) the system can perform. Changes to storage
         speed affects :ref:`cost <instance-size-costs>`.

       - :guilabel:`Use encrypted storage volumes`: Encrypts root
         volume using Amazon EBS encryption for data at rest inside the
         volume and all data moving between the volume and the
         instance.

       .. include:: /includes/enable-sharding-requirements.rst

       .. seealso:: :ref:`connection-limits`

   * - :guilabel:`Replication Factor`

     - The number of :term:`replica set` members. Each member keeps a
       copy of your database, providing high availability and data
       redundancy.

       Replica sets deployed in a :guilabel:`Recommended` region span three
       availability zones. Replica sets deployed in other regions span two
       availability zones. The number of availability zones in a region has no
       affect on the number of nodes |service| can deploy. For more
       information on how |service| deploys replica sets across availability
       zones, see :ref:`amazon-aws-availability-zones`.
       
       Each member of the replica set runs on a separate instance. For details
       on how the number of server instances affects cost, see
       :ref:`server-number-costs`.
       
       If your deployment is a sharded cluster, each shard is a
       replica set, and the replica factor determines the number of
       members in each shard replica set.

       For more information on replica sets, see :manual:`Replication
       </replication>` in the MongoDB manual.

   * - :guilabel:`Do you want a sharded cluster?`

     - :term:`Sharded clusters <sharded cluster>` support horizontal
       scaling and consists of shards, :ref:`config servers
       <sharding-config-server>` and router programs.

       .. include:: /includes/enable-sharding-requirements.rst

       .. include:: /includes/list-sharded-cluster-components.rst
       
       .. include:: /includes/fact-aws-instance.rst

       For details on how the number of server instances affects cost,
       see :ref:`server-number-costs`.

       For more information on sharded clusters, see :manual:`Sharding
       </sharding>` in the MongoDB manual.

   * - :guilabel:`Do you want to enable backup?`

     - If enabled, |service| takes snapshots of your databases at
       regular intervals and retains them according to your group's
       :ref:`retention policy <retention-policy>`.

   * - :guilabel:`Admin Username & Password`

     - Creates a MongoDB admin user with the specified username and
       password. These fields appear only if no MongoDB user exists for
       your |service| group, such as if you are creating the first
       cluster in the group and have not set up MongoDB users
       beforehand.

       **When creating a new admin user, be sure to save the
       credentials.**

       The admin user has read and write access to any MongoDB database
       in any cluster in your |service| group. The admin user can also
       enable sharding.

       To have |service| generate the password for the admin user,
       click :guilabel:`Autogenerate Secure Password`. If you choose to
       have |service| generate the password, |service| displays it only
       once.
