.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``autoScaling``
     - document
     -  Contains the ``diskGBEnabled`` field which specifies whether to
        enable or disable disk auto-scaling.

   * - ``autoScaling.diskGBEnabled``
     - boolean
     - Specifies whether disk auto-scaling is enabled. The default
       is ``true``.

       - Set to ``true`` to enable disk auto-scaling.
       - Set to ``false`` to disable disk auto-scaling.

   * - ``backupEnabled``
     - Boolean
     - If ``true``, the cluster uses |service| :ref:`backup-continuous`
       for backing up cluster data. 

   * - ``biConnector``
     - document
     - Information on whether |bic| is enabled or disabled for the
       cluster.

       .. include:: /includes/extracts/cluster-option-bi-cluster-requirements.rst

       The ``biConnector`` document includes the following fields:

       .. list-table::
          :header-rows: 1
          :widths: 20 80

          * - Field
            - Description

          * - ``enabled``
            - | ``true`` if |bic| is enabled.
              | ``false`` if |bic| is disabled.

          * - ``readPreference``
            - | ``"primary"`` if |bic| reads from the primary.
              | ``"secondary"`` if |bic| reads from a secondary.
              | ``"analytics"`` if |bic| reads from an
                :ref:`analytics node <analytics-node-overview>`.

   * - ``clusterType``
     - string
     - Specifies the type of the cluster:

       - ``REPLICASET`` - :term:`replica set`
       - ``SHARDED`` - :term:`sharded cluster`
       - ``GEOSHARDED`` - :doc:`Global Cluster </global-clusters>`

   * - ``diskSizeGB``
     - double
     - ** AWS / GCP Only ** The size in gigabytes of the server's root
       volume. You can add capacity by increasing this number, up to a
       maximum possible value of ``4096`` (i.e., 4 TB).

       Each instance size has its own default value. To view default
       values:

       1. Open the |service| web interface.
       #. Click the button to add a new cluster.
       #. View the available default sizes.
       #. Close the window without saving changes.

   * - ``encryptionAtRestProvider``
     - string
     - Specify ``AWS`` to enable
       :doc:`Encryption at Rest </security-aws-kms>` using the
       |service| project AWS Key Management System settings. The
       cluster must meet the following restrictions:

       - ``providerSettings.providerName`` must be ``AWS`` or
         ``AZURE``.
       - ``providerSettings.instanceSizeName`` must be ``M10`` or
         greater.
       - ``clusterType`` must be ``REPLICASET``.
       - ``backupEnabled`` must be ``false`` or omitted.

       For complete documentation on Encryption at Rest restrictions,
       see :ref:`security-aws-kms-restrictions`.

       You must configure encryption at rest for the |service| project
       before enabling it on any cluster in the project. For
       complete documentation on configuring Encryption at Rest,
       see :ref:`security-aws-kms`.

   * - ``groupId``
     - string
     - ID of the project the cluster belongs to.

   * - ``id``
     - string
     - ID of the cluster.

   * - ``mongoDBVersion``
     - string
     - The version of MongoDB the cluster runs, in
       ``<major version>.<minor version>`` format.

   * - ``mongoDBMajorVersion``
     - string
     - The major version of MongoDB the cluster runs:

       - 3.2 [1]_
       - 3.4
       - 3.6

   * - ``mongoURI``
     - string
     - The base
       :manual:`connection string </reference/connection-string>` for
       the cluster. Include the following query parameters
       to use the ``mongoURI`` for connecting to the |service| cluster

       - ``replicaSet=<replica set name>`` (replica set clusters only)
       - ``ssl=true``
       - ``authSource=admin``

       Include a username and password for a MongoDB user associated to
       the |service| project directly after the ``mongodb://`` protocol
       portion of the ``mongoURI``. To review the connection string
       format, see the connection string format
       :manual:`documentation </reference/connection-string>`. To add
       MongoDB users to a |service| project, see :ref:`mongodb-users`.

       You cannot connect to a |service| cluster using ``mongoURI``
       without all the specified query parameters and the user
       authentication information.

       |service| only displays this field after the cluster is
       operational, not while it builds the cluster.

   * - ``mongoURIUpdated``
     - string
     - Lists when the connection string was last updated. The
       connection string changes, for example, if you change a replica
       set to a sharded cluster.

       |service| only displays this field after the cluster is
       operational, not while it builds the cluster.

   * - ``mongoURIWithOptions``
     - string

     - The :manual:`connection string </reference/connection-string>`
       for connecting to the |service| cluster. Includes
       the ``replicaSet``, ``ssl``, and ``authSource`` query parameters
       in the connection string with values appropriate for the
       cluster.

       Include a username and password for a MongoDB user associated to
       the |service| project directly after the ``mongodb://`` protocol
       portion of the ``mongoURI``. To review the connection string
       format, see the  :manual:`connection string format documentation
       </reference/connection-string>`. To add MongoDB users to a
       |service| project, see :ref:`mongodb-users`.

       You cannot connect to a |service| cluster using
       ``mongoURIWithOptions`` without the user authentication
       information.

       |service| only displays this field after the cluster is
       operational, not while it builds the cluster.

   * - ``name``
     - string
     - The name of the cluster as it appears in |service|.

   * - ``numShards``
     - integer

     - Selects whether the cluster is a :term:`sharded cluster` or a
       :term:`replica set` and specifies the number of shards for a
       sharded cluster.

       If this is set to ``1``, the cluster is a replica set. For more
       information on MongoDB replica sets, see :manual:`Replication
       </replication>` in the MongoDB manual.

       If this is set to ``2`` or higher, the cluster is a sharded
       cluster with the number of shards specified. For more
       information on sharded clusters, see
       :manual:`Sharding </sharding>` in the MongoDB manual.

       For details on how this setting affects costs, see
       :ref:`server-number-costs`.

       The possible values are ``1`` through ``12``.

       .. note::

          Not present in the response body for
          :doc:`Global Clusters </global-clusters>`.

   * - ``paused``
     - boolean
     - A flag that indicates whether the cluster is paused or not.
       
   * - ``providerBackupEnabled``
     - Boolean
     - If ``true``, the cluster uses :ref:`backup-cloud-provider` for
       backups. If ``providerBackupEnabled`` *and* ``backupEnabled``
       are ``false``, the cluster does not use |service| backups.

   * - ``providerSettings``
     - document
     - The configuration for the provisioned servers on which MongoDB
       runs. The available options are specific to the cloud service
       provider.

   * - ``providerSettings.providerName``
     - string
     - The cloud service provider on which the servers are provisioned.

       .. include:: /includes/fact-cloud-service-providers.rst

       - ``TENANT`` - Indicates an ``M2`` or ``M5`` multi-tenant
         cluster. See ``providerSettings.backingProviderName`` for the
         cloud service provider on which the server hosting the
         cluster is provisioned.

   * - ``providerSettings.backingProviderName``
     - string
     - The cloud service provider on which the multi-tenant server is
       provisioned. Only visible if ``providerSettings.providerName``
       is ``TENANT``.

       .. include:: /includes/fact-cloud-service-providers.rst

   * - ``providerSettings.regionName``
     - string
     - The physical location of your MongoDB cluster. The region you
       choose can affect network latency for clients accessing your
       databases.

       For multi-region clusters, see ``replicationSpec.<region>``.

   * - ``providerSettings.instanceSizeName``
     - string
     - The name of the instance size used for the |service| cluster.

       .. include:: /includes/extracts/fact-cluster-instance-sizes-basic.rst

       See :doc:`/reference/microsoft-azure`,
       :doc:`/reference/google-gcp`, or :doc:`/reference/amazon-aws`
       for complete documentation of each instance size and its default
       resources for a given cloud service provider.

   * - ``providerSettings.diskIOPS``
     - integer
     - The maximum input/output operations per second (IOPS) the
       system can perform.

   * - ``providerSettings.diskTypeName``
     - string
     - **Azure Only** The disk type of the server's root volume.

       The following table lists the possible values for this field,
       and their corresponding storage size.

       .. list-table::
          :header-rows: 1
          :widths: 40 60

          * - ``diskTypeName``
            - Storage Size

          * - ``P4`` :sup:`1`
            - 32GB

          * - ``P6``
            - 64GB

          * - ``P10`` :sup:`2`
            - 128GB

          * - ``P20``
            - 512GB

          * - ``P30``
            - 1024GB

          * - ``P40``
            - 2048GB

          * - ``P50``
            - 4095GB

       :sup:`1` Default for ``M20`` and ``M30`` Azure instances

       :sup:`2` Default for ``M40+`` Azure instances

   * - ``providerSettings.encryptEBSVolume``
     - Boolean
     - *AWS only*. If enabled, the Amazon EBS encryption feature
       encrypts the server's root volume for both data at rest within
       the volume and for data moving between the volume and the
       instance.

   * - ``replicationFactor``
     - number
     - The number of :term:`replica set` members. Each member keeps a
       copy of your databases, providing high availability and data
       redundancy.

       For multi-region clusters, add the total number of
       ``replicationSpec.<region>.electableNodes`` to calculate the
       replication factor of the cluster.

       If your cluster is a sharded cluster, each shard is a replica
       set with the specified replication factor.

       For information on how the replication factor affects costs, see
       :ref:`server-number-costs`. For more information on MongoDB
       replica sets, see :manual:`Replication </replication>` in the
       MongoDB manual.

       The possible values are ``3``, ``5``, or ``7``.

   * - ``replicationSpec``
     - document
     - The configuration of each region in the cluster. Each element
       in this document represents a region where |service| deploys
       your cluster.

   * - ``replicationSpec.<region>``
     - document
     - The physical location of the region. The ``<region>`` string
       corresponds to a region where |service| deploys your cluster.

       Each ``<region>`` document describes the region's priority in
       elections and the number and type of MongoDB nodes |service|
       deploys to the region.

   * - ``replicationSpec.<region>.electableNodes``
     - integer
     - The number of electable nodes in the region. Electable nodes
       can become the :term:`primary` and can facilitate local reads.

   * - ``replicationSpec.<region>.priority``
     - integer
     - The election priority of the region. The highest possible
       priority is ``7``, which identifies the **Preferred Region** of
       the cluster. |service| places the :term:`primary` node in the
       **Preferred Region**. The lowest possible priority is ``0``,
       which identifies a read only region.

       You can have any number of priority ``0`` read only regions.
       Priorities ``1`` through ``7`` are exclusive - no more than one
       region per cluster can be assigned a given priority.

   * - ``replicationSpec.<region>.readOnlyNodes``
     - integer
     - The number of read-only nodes in the region. Read-only nodes
       can never become the :term:`primary`, but can facilitate
       local-reads.

   * - ``replicationSpecs``
     - array of documents
     - The configuration for each zone in a
       :doc:`Global Cluster </global-clusters>`. Each document in this
       array represents a zone where |service| deploys nodes for your
       Global Cluster.

   * - ``replicationSpecs[n].id``
     - string
     - Unique identifier of the replication document.

   * - ``replicationSpecs[n].zoneName``
     - string
     - The name for the zone.

   * - ``replicationSpecs[n].numShards``
     - int
     - The number of shards to deploy in the specified zone.

   * - ``replicationSpecs[n].regionsConfig``
     - document
     - The physical location of the region. Each ``regionsConfig``
       document describes the region's priority in elections and the
       number and type of MongoDB nodes |service| deploys to the region.

   * - ``srvAddress``
     - string
     - :manual:`Connection string </reference/connection-string>`
       for connecting to the |service| cluster. The ``+srv`` modifier
       forces the connection to use |tls-ssl|. See the ``mongoURI``
       for additional options.

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
