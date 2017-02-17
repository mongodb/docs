.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``name``
     - string
     - The name of the cluster as it appears in |service|.

   * - ``groupId``
     - string
     - ID of the group the cluster belongs to.

   * - ``mongoDBVersion``
     - string
     - The version of MongoDB the cluster uses. |service| deploys the latest
       released version of the MongoDB Community Edition. As new maintenance
       releases become available, |service| upgrades the cluster via a rolling
       process that maintains cluster availability.

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

   * - ``providerSettings``
     - object
     - The configuration for the provisioned servers on which MongoDB runs.
       The available options are specific to the cloud service provider.

   * - ``providerSettings.providerName``
     - string
     - The cloud service provider on which the servers are provisioned.

       |service| currently integrates with Amazon Web Services (AWS). This
       field value is ``AWS`` until other integrations become available.

   * - ``providerSettings.regionName``
     - string
     - The physical location of your MongoDB cluster. The region you choose
       can affect network latency for clients accessing your databases.

       .. include:: /includes/fact-group-region-association.rst

       For ``AWS``, |service| currently uses the following values. |service|
       might also offer additional values in the future.

       - ``AP_SOUTHEAST_2``
       - ``EU_WEST_1``
       - ``US_EAST_1``
       - ``US_WEST_2``

   * - ``providerSettings.instanceSizeName``
     - string
     - The name of the instance size used for the |service| cluster.

       To view available instance sizes: open the |service| web interface;
       view an existing configuration or click the button to add a new one;
       view the available instance sizes; close the window without saving
       changes.

   * - ``providerSettings.diskIOPS``
     - integer

     - The maximum input/output operations per second (IOPS) the system can
       perform. The available IOPS depend on the instance size: each instance
       size has a specific set of available IOPS values. To view available
       values, use the |service| interface to either view an existing
       configuration or add a new one; then click an instance size to view the
       available values; and then close the configuration without saving
       changes.

   * - ``providerSettings.encryptEBSVolume``
     - Boolean
     - *AWS only*. If enabled, the Amazon EBS encryption feature encrypts the
       server's root volume for both data at rest within the volume and for
       data moving between the volume and the instance.

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