.. list-table::
   :widths: 15 10 75
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``autoScaling``
     - document
     - Contains auto-scaling information for the cluster. For more
       information on cluster auto-scaling, see
       :ref:`cluster-autoscaling`.

   * - | ``autoScaling``
       | ``.compute``
     - document
     - Specifies whether the cluster automatically scales its cluster
       tier and whether the cluster can scale down.

   * - | ``autoScaling``
       | ``.compute``
       | ``.enabled``
     - boolean
     - Specifies whether cluster tier auto-scaling is enabled.

   * - | ``autoScaling``
       | ``.compute``
       | ``.scaleDownEnabled``
     - boolean
     - Specifies whether the cluster tier can scale down.

   * - | ``autoScaling``
       | ``.diskGBEnabled``
     - boolean
     - Specifies whether disk auto-scaling is enabled.

   * - ``backupEnabled``
     - boolean
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
                :ref:`analytics node <analytics-nodes-overview>`.

   * - ``clusterType``
     - string
     - Specifies the type of the cluster:

       .. list-table::
          :header-rows: 1
          :widths: 20 80

          * - Value
            - Description

          * - ``REPLICASET``
            - :term:`replica set`
          * - ``SHARDED``
            - :term:`sharded cluster`
          * - ``GEOSHARDED``
            - :doc:`Global Cluster </global-clusters>`

   * - ``diskSizeGB``
     - double
     - **AWS / GCP Only** The size in gigabytes of the server's root
       volume. You can add capacity by increasing this number, up to a
       maximum possible value of ``4096`` (i.e., 4 TB).

       Each cluster tier has its own default value. To view default
       values:

       1. Open the |service| web interface.
       #. Click the button to add a new cluster.
       #. View the available default sizes.
       #. Close the window without saving changes.

   * - ``encryptionAtRestProvider``
     - string
     - :doc:`Encryption at Rest </security-aws-kms>` is enabled or
       disabled.

       For complete documentation on Encryption-at-Rest restrictions,
       see :ref:`security-aws-kms-restrictions`.

       You must configure encryption at rest for the |service| project
       before enabling it on any cluster in the project. For
       complete documentation on configuring Encryption at Rest,
       see :ref:`security-aws-kms`.

   * - ``groupId``
     - string
     - Unique identifier of the project the cluster belongs to.

   * - ``id``
     - string
     - Unique identifier of the cluster.

   * - ``labels``
     - array of documents
     - Array containing key-value pairs that tag and categorize 
       the cluster.     

   * - ``mongoDBVersion``
     - string
     - Version of MongoDB the cluster runs, in
       ``<major version>.<minor version>`` format.

   * - ``mongoDBMajorVersion``
     - string
     - Major version of MongoDB the cluster runs:

       - 3.4
       - 3.6
       - 4.0
       - 4.2

   * - ``mongoURI``
     - string
     - Base
       :manual:`connection string </reference/connection-string>` for
       the cluster.

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
     - :manual:`connection string </reference/connection-string>`
       for connecting to the |service| cluster. Includes
       the ``replicaSet``, ``ssl``, and ``authSource`` query parameters
       in the connection string with values appropriate for the
       cluster.

       To review the connection string format, see the
       :manual:`connection string format documentation </reference/connection-string>`.
       To add MongoDB users to a |service| project, see
       :ref:`mongodb-users`.

       |service| only displays this field after the cluster is
       operational, not while it builds the cluster.

   * - ``name``
     - string
     - Name of the cluster as it appears in |service|.

   * - ``numShards``
     - integer
     - Specifies the number of shards for a sharded cluster.

       If this is set to ``1``, the cluster is a replica set.

       If this is set to ``2`` or higher, the cluster is a sharded
       cluster with the number of shards specified.

       For details on how this setting affects costs, see
       :ref:`server-number-costs`.

       The possible values are ``1`` through ``12``.

       .. note::

          Not present in the response body for
          :doc:`Global Clusters </global-clusters>`.

   * - ``paused``
     - boolean
     - Flag that indicates whether the cluster is paused or not.

   * - ``pitEnabled``
     - boolean
     - Indicates if the cluster uses :ref:`Point-in-Time backups
       <aws-pit-restore>`. If set to ``true``, ``providerBackupEnabled``
       must also be set to ``true``.
       
   * - ``providerBackupEnabled``
     - boolean
     - If ``true``, the cluster uses :ref:`backup-cloud-provider` for
       backups. If ``providerBackupEnabled`` *and* ``backupEnabled``
       are ``false``, the cluster does not use |service| backups.

   * - ``providerSettings``
     - document
     - Configuration for the provisioned servers on which MongoDB
       runs. The available options are specific to the cloud service
       provider.

   * - | ``providerSettings``
       | ``.autoScaling``
     - document
     - Contains the ``compute`` field which specifies the range of
       instance sizes to which your cluster can scale.

   * - | ``providerSettings``
       | ``.autoScaling``
       | ``.compute``
     - document
     - Contains the ``minInstanceSize`` and ``maxInstanceSize`` fields
       which specify the range of instance sizes to which your cluster
       can scale.

   * - | ``providerSettings``
       | ``.autoScaling``
       | ``.compute``
       | ``.minInstanceSize``
     - string
     - Minimum instance size to which your cluster can
       automatically scale.

   * - | ``providerSettings``
       | ``.autoScaling``
       | ``.compute``
       | ``.maxInstanceSize``
     - string
     - Maximum instance size to which your cluster can
       automatically scale.

   * - | ``providerSettings``
       | ``.providerName``
     - string
     - Cloud service provider on which the servers are provisioned.

       .. include:: /includes/fact-cloud-service-providers.rst

       - ``TENANT`` - Indicates an ``M2`` or ``M5`` multi-tenant
         cluster. See ``providerSettings.backingProviderName`` for the
         cloud service provider on which the server hosting the
         cluster is provisioned.

   * - | ``providerSettings``
       | ``.backingProviderName``
     - string
     - Cloud service provider on which the multi-tenant server is
       provisioned. Only visible if ``providerSettings.providerName``
       is ``TENANT``.

       .. include:: /includes/fact-cloud-service-providers.rst

   * - | ``providerSettings``
       | ``.regionName``
     - string
     - Physical location of your MongoDB cluster. The region you
       choose can affect network latency for clients accessing your
       databases.

       For a complete list of region name values, refer to the
       the cloud provider reference pages:

       - :ref:`AWS <amazon-aws>`

       - :ref:`GCP <google-gcp>`

       - :ref:`Azure <microsoft-azure>`

       For multi-region clusters, see ``replicationSpec.<region>``.

   * - | ``providerSettings``
       | ``.instanceSizeName``
     - string
     - Name of the cluster tier used for the |service| cluster.

       .. include:: /includes/fact-instance-size-names.rst

       .. tabs-cloud-providers::

          tabs:
            - id: aws
              content: |

                .. include:: /includes/extracts/fact-cluster-instance-sizes-AWS.rst

            - id: gcp
              content: |

                .. include:: /includes/extracts/fact-cluster-instance-sizes-GCP.rst

            - id: azure
              content: |

                .. include:: /includes/extracts/fact-cluster-instance-sizes-AZURE.rst

       .. include:: /includes/fact-m2-m5-multi-tenant.rst

   * - | ``providerSettings``
       | ``.diskIOPS``
     - integer
     - Maximum input/output operations per second (IOPS) the
       system can perform.

   * - | ``providerSettings``
       | ``.diskTypeName``
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

       :sup:`1` Default for ``M20`` and ``M30`` Azure cluster tiers

       :sup:`2` Default for ``M40+`` Azure cluster tiers

   * - | ``providerSettings``
       | ``.encryptEBSVolume``
     - boolean
     - *AWS only*. If enabled, the Amazon EBS encryption feature
       encrypts the server's root volume for both data at rest within
       the volume and for data moving between the volume and the
       cluster.

   * - ``replicationFactor``
     - number
     - Number of :term:`replica set` members. Each member keeps a
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
     - Configuration of each region in the cluster. Each element
       in this document represents a region where |service| deploys
       your cluster.

   * - | ``replicationSpec``
       | ``.<region>``
     - document
     - Physical location of the region. The ``<region>`` string
       corresponds to a region where |service| deploys your cluster.

       Each ``<region>`` document describes the region's priority in
       elections and the number and type of MongoDB nodes |service|
       deploys to the region.

   * - | ``replicationSpec``
       | ``.<region>``
       | ``.electableNodes``
     - integer
     - Number of electable nodes in the region. Electable nodes
       can become the :term:`primary` and can facilitate local reads.

   * - | ``replicationSpec``
       | ``.<region>``
       | ``.priority``
     - integer
     - Election priority of the region. The highest possible
       priority is ``7``, which identifies the **Preferred Region** of
       the cluster. |service| places the :term:`primary` node in the
       **Preferred Region**. The lowest possible priority is ``0``,
       which identifies a read only region.

       You can have any number of priority ``0`` read only regions.
       Priorities ``1`` through ``7`` are exclusive - no more than one
       region per cluster can be assigned a given priority.

   * - | ``replicationSpec``
       | ``.<region>``
       | ``.readOnlyNodes``
     - integer
     - Number of read-only nodes in the region. Read-only nodes
       can never become the :term:`primary`, but can facilitate
       local-reads.

   * - ``replicationSpec.<region>.analyticsNodes``
     - integer
     - The number of :ref:`analytics nodes <analytics-nodes-overview>`
       in the region. Analytics nodes are useful for handling analytic
       data such as reporting queries from |bic|. Analytics nodes are
       read-only, and can never become the :term:`primary`.

   * - ``replicationSpecs``
     - array of documents
     - Configuration for each zone in a
       :doc:`Global Cluster </global-clusters>`. Each document in this
       array represents a zone where |service| deploys nodes for your
       Global Cluster.

   * - | ``replicationSpecs[n]``
       | ``.id``
     - string
     - Unique identifier of the replication document.

   * - | ``replicationSpecs[n]``
       | ``.zoneName``
     - string
     - Name for the zone.

   * - | ``replicationSpecs[n]``
       | ``.numShards``
     - integer
     - Number of shards to deploy in the specified zone.

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
     - document
     - Physical location of the region. Each ``regionsConfig``
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
     - Current state of the cluster. The possible states are:

       - ``IDLE``
       - ``CREATING``
       - ``UPDATING``
       - ``DELETING``
       - ``DELETED``
       - ``REPAIRING``
