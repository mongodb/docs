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

     - The cluster name as it will appear in |service|.
     
   * - :guilabel:`Cloud Provider and Region`
   
     - The cloud provider and physical location of your MongoDB cluster. 
       
       The choice of cloud provider and region affects the configuration
       options for the available instance sizes, network latency for clients
       accessing your cluster, and the :doc:`cost of running the cluster
       </billing>`.
       
       .. include:: /includes/fact-group-region-association.rst
       
       Regions marked as :guilabel:`Recommended` provide higher availability
       compared to other regions. For more information, see:
       
       - :ref:`AWS Recommended Regions <amazon-aws-availability-zones>`.
       
       - :ref:`GCP Recommended Regions <google-gcp-availability-zones>`.
       
       - :ref:`Azure Recommended Regions <microsoft-azure-availability-zones>`
 
   * - :guilabel:`Instance Size`

     - The memory, storage, and IOPS specification for each
       data-bearing server [#data-bearing]_ for your |service| cluster.

       .. include:: /includes/fact-instance-size-groupings.rst
       
       .. include:: /includes/enable-sharding-requirements.rst

       Each instance size comes with a default set of resources. Depending
       on the selected cloud service provider and instance size, 
       |service| can provide the following configuration options:

       - :guilabel:`Custom Storage Capacity`: The size of the server
         root volume. Changes to storage capacity affects :ref:`cost
         <instance-size-costs>`.

       - :guilabel:`Custom Storage Speed`: The input/output
         operations per second (IOPS) the system can perform. Changes to
         storage speed affects :ref:`cost <instance-size-costs>`.

       - :guilabel:`Use encrypted storage volumes`: Encrypts root
         volume for data at rest inside the volume and all data moving between
         the volume and the instance.
         
       For more information on the default resources and available
       configuration options for each cloud service provider, see:
       
       - :ref:`AWS Configuration Options <amazon-aws-configuration-options>`
       - :ref:`GCP Configuration Options <google-gcp-configuration-options>`
       - :ref:`Azure Configuration Options 
         <microsoft-azure-configuration-options>`.

       .. seealso:: :ref:`connection-limits`

   * - :guilabel:`Replication Factor`

     - The number of :term:`replica set` members. Each member keeps a
       copy of your database, providing high availability and data
       redundancy.

       |service| deploys replica set members across the selected region. For
       more information, see :ref:`amazon-aws-availability-zones` for
       :abbr:`AWS (Amazon Web Services)`, :ref:`google-gcp-availability-zones`
       for :abbr:`GCP (Google Cloud Platform)`, and
       :ref:`microsoft-azure-availability-zones` for :abbr:`Azure (Microsoft
       Azure)`.
       
       .. include:: /includes/extracts/fact-no-node-restriction-base.rst
       
       Each member of the replica set runs on a separate instance. For details
       on how the number of server instances affects cost, see
       :ref:`server-number-costs`.
       
       If your deployment is a sharded cluster, each shard is a
       replica set, and the replication factor determines the number of
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
