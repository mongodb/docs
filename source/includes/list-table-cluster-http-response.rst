.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``autoScaling``
     - document
     - Information on whether disk auto-scaling is enabled. The document contains
       ``diskGBEnabled`` field set to:

       - ``true`` if enabled.
       - ``false`` if disabled.

       Default is true.

   * - ``name``
     - string
     - The name of the cluster as it appears in |service|.

   * - ``groupId``
     - string
     - ID of the group the cluster belongs to.
       
   * - ``id``
     - string
     - ID of the cluster.

   * - ``mongoDBVersion``
     - string     
     - The version of MongoDB the cluster runs, in 
       ``<major version>.<minor version>`` format.
       
   * - ``mongoDBMajorVersion``
     - string
     - The major version of MongoDB the cluster runs. |service| supports
       the following MongoDB versions:
       
       - 3.2
       - 3.4
       - 3.6

   * - ``mongoURI``
     - string
     - The :manual:`connection string </reference/connection-string>` for
       connecting to the cluster through a :manual:`MongoDB driver
       </applications/drivers>` or the :program:`mongo` shell. To download the
       :program:`mongo` shell, click a cluster's :guilabel:`Connect` button
       and follow the download instructions.

       When you create a new cluster, the ``mongoURI`` will not show up while
       the cluster is being built. |service| provides the connection string
       only after the cluster is running.

   * - ``mongoURIUpdated``
     - string
     - Lists when the connection string was last updated. The connection
       string changes, for example, if you change a replica set to a sharded
       cluster.

   * - ``numShards``
     - integer

     - Selects whether the cluster is a :term:`sharded cluster` or a
       :term:`replica set` and specifies the number of shards for a sharded
       cluster.

       If this is set to ``1``, the cluster is a replica set. For more
       information on MongoDB replica sets, see :manual:`Replication
       </replication>` in the MongoDB manual.

       If this is set to ``2`` or higher, the cluster is a sharded cluster
       with the number of shards specified. For more information on sharded
       clusters, see :manual:`Sharding </sharding>` in the MongoDB manual.

       For details on how this setting affects costs, see
       :ref:`server-number-costs`.

       The possible values are ``1`` through ``12``.

   * - ``providerSettings``
     - document
     - The configuration for the provisioned servers on which MongoDB runs.
       The available options are specific to the cloud service provider.

   * - ``providerSettings.providerName``
     - string
     - The cloud service provider on which the servers are provisioned.

       .. include:: /includes/fact-cloud-service-providers.rst
       
       - ``TENANT`` - Indicates an ``M2`` or ``M5`` multi-tenant cluster. 
         See ``providerSettings.backingProviderName`` for the cloud service
         provider on which the server hosting the cluster is provisioned.
         
   * - ``providerSettings.backingProviderName``
     - string
     - The cloud service provider on which the multi-tenant server is
       provisioned. Only visible if ``providerSettings.providerName`` is 
       ``TENANT``.
       
       .. include:: /includes/fact-cloud-service-providers.rst

   * - ``providerSettings.regionName``
     - string
     - The physical location of your MongoDB cluster. The region you choose
       can affect network latency for clients accessing your databases.

       .. include:: /includes/fact-group-region-association.rst

       .. list-table::
          :header-rows: 1
          
          * - Provider
            - Regions
            
          * - AWS 
            - .. include:: /includes/fact-aws-region-names.rst
              
          * - GCP
            - .. include:: /includes/fact-gcp-region-names.rst
              
          * - Azure
            - .. include:: /includes/fact-azure-region-names.rst

   * - ``providerSettings.instanceSizeName``
     - string
     - The name of the instance size used for the |service| cluster.

       To view available instance sizes: open the |service| web interface;
       select :guilabel:`Build a New Cluster`; select your preferred cloud
       service provider and region; view the available instance sizes; close
       the window without saving changes.

   * - ``providerSettings.diskIOPS``
     - integer
     - The maximum input/output operations per second (IOPS) the system can
       perform. The available :abbr:`IOPS (Input/Output Operations per
       Second)` depend on the instance size: each instance size has a specific
       set of available IOPS values. To view available values: open the
       |service| web interface; select :guilabel:`Build a New Cluster`; select
       your preferred cloud service provider and region; click an instance
       size to view the available values for :guilabel:`Custom Storage Speed`; 
       close the window without saving changes.

   * - ``providerSettings.encryptEBSVolume``
     - Boolean
     - *AWS only*. If enabled, the Amazon EBS encryption feature encrypts the
       server's root volume for both data at rest within the volume and for
       data moving between the volume and the instance.

   * - ``replicationFactor``
     - number
     - The number of :term:`replica set` members. Each member keeps a copy of
       your databases, providing high availability and data redundancy.

       If your cluster is a sharded cluster, each shard is a replica set with
       the specified replication factor.

       For information on how the replication factor affects costs, see
       :ref:`server-number-costs`. For more information on MongoDB replica
       sets, see :manual:`Replication </replication>` in the MongoDB manual.

       The possible values are ``3``, ``5``, or ``7``.

   * - ``replicationSpec``
     - document
     - The configuration of each region in the cluster. Each element
       in this document represents a region where |service| deploys your 
       cluster.

   * - ``replicationSpec.<region>``
     - document
     - The physical location of the region. The ``<region>`` string 
       corresponds to a region where |service| deploys your cluster. 
       
       Each ``<region>`` document describes the region's priority in
       elections and the number and type of MongoDB nodes |service| deploys
       to the region.

   * - ``replicationSpec.<region>.electableNodes``
     - integer
     - The number of electable nodes in the region. Electable nodes can become
       the :term:`primary` and can facilitate local reads.

   * - ``replicationSpec.<region>.priority``
     - integer
     - The election priority of the region. The highest possible priority is
       ``7``, which identifies the **Preferred Region** of the cluster.
       |service| places the :term:`primary` node in the **Preferred Region**.
       The lowest possible priority is ``0``, which identifies a read only region.

       You can have any number of priority ``0`` read only regions. 
       Priorities ``1`` through ``7`` are exclusive - no more than one
       region per cluster can be assigned a given priority.

   * - ``replicationSpec.<region>.readOnlyNodes``
     - integer
     - The number of read-only nodes in the region. Read-only nodes can never
       become the :term:`primary`, but can facilitate local-reads.

   * - ``diskSizeGB``
     - double
     - The size in gigabytes of the server's root volume. You can add capacity
       by increasing this number, up to a maximum possible value of ``16384``
       (i.e., 16 TB).

       Each instance size has its own default value. To view default values:
       open the |service| web interface; click the button to add a new
       cluster; view the available default sizes; close the window without
       saving changes.

   * - ``backupEnabled``
     - Boolean
     - If enabled, the |service| :doc:`Backup </backup-cluster>` service takes
       snapshots of your databases at regular intervals and retains them
       according to your group's :ref:`retention policy <retention-policy>`.

   * - ``stateName``
     - string
     - The current state of the cluster. The possible
       states are:

       - ``IDLE``
       - ``CREATING``
       - ``UPDATING``
       - ``DELETING``
       - ``DELETED``
       - ``REPAIRING``