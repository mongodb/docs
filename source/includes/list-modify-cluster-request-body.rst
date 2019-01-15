.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``autoScaling``
     - document
     - Contains the ``diskGBEnabled`` field which specifies whether to
       enable or disable disk auto-scaling.

   * - ``autoScaling.diskGBEnabled``
     - boolean
     - Specifies whether disk auto-scaling is enabled. The default
       is ``true``.

       - Set to ``true`` to enable disk auto-scaling.
       - Set to ``false`` to disable disk auto-scaling.

       .. include:: /includes/fact-ram-to-storage-ratio.rst

   * - ``backupEnabled``
     - Boolean
     - Set to ``true`` to enable |service|
       :doc:`continuous backups </backup/continuous-backups>` for the
       cluster.

       Set to ``false`` to disable continuous backups for the cluster.
       |service| deletes any stored snapshots. See the continuous
       backup :ref:`retention-policy` for more information.

       You cannot enable continuous backups if you have an
       existing cluster in the project with
       :doc:`/backup/cloud-provider-snapshots` enabled.

   * - ``biConnector``
     - document
     - *Optional*

       Specifies |bic| configuration on this cluster.

       .. include:: /includes/extracts/cluster-option-bi-cluster-requirements.rst

   * - ``biConnector.enabled``
     - boolean
     - *Optional*

       Specifies whether or not |bic| is enabled on the cluster.

       - Set to ``true`` to enable |bic|.
       - Set to ``false`` to disable |bic|.

   * - ``biConnector.readPreference``
     - string
     - *Optional*

       Specifies the read preference to be used by |bic| on the
       cluster. Each |bic| read preference contains a distinct
       combination of :manual:`readPreference </core/read-preference/>`
       and :manual:`readPreferenceTags
       </core/read-preference/#tag-sets>` options. For details on |bic|
       read preferences, refer to the
       :ref:`Analytics Nodes Page <analytic-nodes-overview>`.

       - Set to ``"primary"`` to have |bic| read from the primary.

       - Set to ``"secondary"`` to have |bic| read from a
         secondary member. *Default if there are no
         analytics nodes in the cluster*.

       - Set to ``"analytics"`` to have |bic| read from an
         :ref:`analytics node <analytics-node-overview>`.
         *Default if the cluster contains analytics nodes*.

         To set the ``readPreference`` value to ``"analytics"``,
         the cluster must have at least one analytics node.

         If the ``readPreference`` value is ``"analytics"``, you
         cannot remove all analytics nodes from the cluster.

         .. note::

            When using a ``readPreference`` of ``"analytics"``,
            |service| colocates |bic| on the same hardware
            as the analytics nodes from which |bic| reads.

            By isolating electable data-bearing nodes from the
            |bic|, electable nodes do not compete for resources
            with |bic|, thus improving cluster reliability
            and performance.

   * - ``clusterType``
     - string
     - Specifies the type of the cluster. Required for :doc:`Global Clusters </global-clusters>`.
       Optional for replica sets and sharded clusters.

       - ``REPLICASET`` - :term:`replica set`
       - ``SHARDED`` - :term:`sharded cluster`
       - ``GEOSHARDED`` - Global Cluster

       .. include:: /includes/fact-conversion-sharded-clusters.rst

   * - ``encryptionAtRestProvider``
     - string
     - Specify ``AWS`` to enable
       :doc:`Encryption at Rest </security-aws-kms>` using the
       |service| project AWS Key Management System settings. The
       cluster must meet the following restrictions:

       - ``providerSettings.providerName`` must be ``AWS`` or ``AZURE``.
       - ``providerSettings.instanceSizeName`` must be ``M10`` or greater.
       - ``clusterType`` must be ``REPLICASET``.
       - ``backupEnabled`` must be ``false``.

       For complete documentation on Encryption at Rest restrictions,
       see :ref:`security-aws-kms-restrictions`.

       You must configure encryption at rest for the |service| project
       before enabling it on any cluster in the project. For
       complete documentation on configuring Encryption at Rest,
       see :ref:`security-aws-kms`.

       Set to ``NONE`` to disable Encryption at Rest for the cluster.

   * - ``name``
     - string
     - The name of the cluster as it appears in |service|. Once the cluster is
       created, its name cannot be changed.

   * - ``mongoDBMajorVersion``
     - string
     - The version of the cluster to deploy. |service| supports the
       following MongoDB versions for ``M10+`` clusters: [1]_

       - 3.4
       - 3.6

       You must set this value to ``3.6`` if ``providerSettings.instanceSizeName``
       is either ``M2`` or ``M5``.

       |service| always deploys the cluster with the latest stable
       release of the specified version. You can upgrade to a newer
       version of MongoDB when you :doc:`modify a cluster
       </reference/api/clusters-modify-one>`

   * - ``numShards``
     - integer
     - Selects whether the cluster is a :term:`replica set` or a
       :term:`sharded cluster`.

       If this is set to ``1``, the cluster is a replica set. For more
       information on MongoDB replica sets, see :manual:`Replication
       </replication>` in the MongoDB manual.

       If this is set to ``2`` or higher, the cluster is a sharded cluster
       with the number of shards specified. For more information on sharded
       clusters, see :manual:`Sharding </sharding>` in the MongoDB manual.

       For details on how this setting affects costs, see
       :ref:`server-number-costs`.

       The possible values are ``1`` through ``50``. The default value
       is ``1``.

       .. note::

          Do not include in the request body for :doc:`Global Clusters </global-clusters>`.

   * - ``paused``

     - boolean

     - Indicates whether the cluster is paused or not. The default value is false.

       You cannot create a paused cluster. Either omit the field or explicitly set
       to false.

   * - ``providerBackupEnabled``
     - Boolean
     - Set ``true`` or ``false`` to enable or disable
       :ref:`backup-cloud-provider` for cluster backups.
       If ``providerBackupEnabled`` *and* ``backupEnabled`` are
       ``false``, the cluster does not use |service| backups.

       If you disable continuous backups for the cluster,
       |service| deletes all stored snapshots. See the continuous
       backup :ref:`retention-policy` for more information.

       You cannot enable cloud provider snapshots if you have an
       existing cluster in the project with
       :ref:`backup-continuous` enabled.

       .. note::

          You cannot enable cloud provider snapshots for :doc:`Global Clusters </global-clusters>`.

   * - ``providerSettings``
     - document
     - The configuration for the provisioned servers on which MongoDB runs.
       The available options are specific to the cloud service provider.

   * - ``providerSettings.providerName``
     - string
     - The cloud service provider on which the servers are provisioned.

       .. include:: /includes/fact-cloud-service-providers.rst
       - ``TENANT`` - A multi-tenant deployment on one of the supported
         cloud service providers. Only valid when
         ``providerSettings.instanceSizeName`` is either ``M2`` or ``M5``.

       .. include:: /includes/fact-m2-m5-multi-tenant.rst

   * - ``providerSettings.backingProviderName``
     - string
     - The cloud service provider on which the server for a multi-tenant
       cluster is provisioned. This setting is only valid when
       ``providerSetting.providerName`` is ``TENANT`` and
       ``providerSetting.instanceSizeName`` is ``M2`` or ``M5``.

       .. include:: /includes/fact-cloud-service-providers.rst

   * - ``providerSettings.regionName``
     - string
     - The physical location of your MongoDB cluster. The region you choose
       can affect network latency for clients accessing your databases.

       Do *not* specify this field when creating a multi-region cluster
       using the ``replicationSpec`` document.

       .. include:: /includes/fact-group-region-association.rst

       The following regions are valid for ``M10+`` clusters (``M20+``
       for Azure):

       .. list-table::
          :header-rows: 1
          :widths: 20 50

          * - Provider
            - Region Names

          * - AWS
            - .. include:: /includes/fact-aws-region-names.rst
          * - GCP
            - .. include:: /includes/fact-gcp-region-names.rst
          * - AZURE
            - .. include:: /includes/fact-azure-region-names.rst

       The following regions are valid for ``M2`` and ``M5`` clusters:

       .. list-table::
          :header-rows: 1
          :widths: 20 50

          * - Provider
            - Region Names

          * - AWS
            - .. include:: /includes/fact-aws-m2-m5-region-names.rst

          * - GCP
            - .. include:: /includes/fact-gcp-m2-m5-region-names.rst

          * - AZURE

            - .. include:: /includes/fact-azure-m2-m5-region-names.rst

   * - ``providerSettings.instanceSizeName``
     - string
     - |service| provides different instance sizes, each with a default
       storage capacity and RAM size. The instance size
       you select is used for all the data-bearing servers in your cluster.
       For definitions of data-bearing servers, see
       :ref:`server-number-costs`.

       |service| supports the following instance sizes:

       .. list-table::
          :header-rows: 1
          :widths: 20 50

          * - Provider
            - Instance Sizes

          * - AWS
            - .. include:: /includes/extracts/fact-cluster-instance-sizes-AWS.rst

          * - GCP
            - .. include:: /includes/extracts/fact-cluster-instance-sizes-GCP.rst

          * - AZURE

            - .. include:: /includes/extracts/fact-cluster-instance-sizes-AZURE.rst

       .. |ast| unicode:: U+002A
       .. |dag| unicode:: U+2020
       .. |ddag| unicode:: U+2021

       |ast| :abbr:`AWS (Amazon Web Services)`,
       :abbr:`GCP (Google Cloud Platform)`,
       and :abbr:`Azure (Microsoft Azure)` only support
       ``M2`` and ``M5`` in certain regions.
       For a complete list of the regions that support ``M2`` and ``M5``
       instances, see ``providerSettings.regionName``.

       |dag| ``R`` instances are :abbr:`AWS (Amazon Web Services)` only.
       Ensure that ``providerSetting.providerName`` is ``AWS``.
       In the |service| UI, ``R`` instance correspond with
       :guilabel:`Low CPU` variants of their associated ``M`` instance.

       |ddag| These instances are only supported in the
       :abbr:`AWS (Amazon Web Services)` ``EU-WEST-3`` (Paris) region.

       .. include:: /includes/fact-m2-m5-multi-tenant.rst

   * - ``providerSettings.diskIOPS``
     - integer
     - *Optional*

       .. include:: /includes/providerSettings-diskIOPS.rst

   * - ``providerSettings.diskTypeName``
     - string
     - **Azure ONLY**

       The Azure disk type of the server's root volume.

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

   * - ``providerSettings.volumeType``
     - String
     - *Optional*

       .. include:: /includes/providerSettings-volumeType.rst

   * - ``providerSettings.encryptEBSVolume``
     - Boolean
     - *AWS only*. If enabled, the Amazon EBS encryption feature encrypts the
       server's root volume for both data at rest within the volume and for
       data moving between the volume and the instance.

       The default value is ``false``.

   * - ``replicationFactor``
     - number
     - The number of :term:`replica set` members. Each member keeps a copy of
       your databases, providing high availability and data redundancy.
       The possible values are ``3``, ``5``, or ``7``. The default value
       is ``3``.

       Do *not* specify this field when creating a multi-region cluster
       using the ``replicationSpec`` document.

       If your cluster is a sharded cluster, each shard is a replica set with
       the specified replication factor.

       For information on how the replication factor affects costs, see
       :ref:`server-number-costs`. For more information on MongoDB replica
       sets, see :manual:`Replication </replication>` in the MongoDB manual.

       |service| ignores this value if you pass the ``replicationSpec``
       document.

   * - ``replicationSpec``
     - document
     - The configuration of each region in a multi-region cluster. Each
       element in this document represents a region where |service| deploys
       your cluster.

       For single-region clusters, you can either specify the
       ``providerSettings.regionName`` and ``replicationFactor``, *or* you can
       use the ``replicationSpec`` document to define a single region.

       For multi-region clusters, omit the
       ``providerSettings.regionName`` field.

       .. important::

          You **must** order each element in this document by
          ``replicationSpec.<region>.priority`` descending.

       Use the ``replicationSpecs`` parameter to modify a
       :doc:`Global Cluster </global-clusters>`.

       .. note::

          You cannot specify both the ``replicationSpec`` and ``replicationSpecs``
          parameters in the same request body.

   * - ``replicationSpec.<region>``
     - document
     - *Required if specifying* ``replicationSpec``

       The physical location of the region. Replace ``<region>`` with the name
       of the region. Each ``<region>`` document describes the region's priority in
       elections and the number and type of MongoDB nodes |service| deploys
       to the region. You must order each ``<region>`` by
       ``replicationSpec.priority`` descending.

       You must specify at least one ``replicationSpec.<region>`` document.

       .. include:: /includes/fact-group-region-association.rst

       .. list-table::
          :header-rows: 1
          :widths: 20 50

          * - Provider
            - Region Names

          * - AWS
            - .. include:: /includes/fact-aws-region-names.rst

          * - GCP
            - .. include:: /includes/fact-gcp-region-names.rst

          * - AZURE
            - .. include:: /includes/fact-azure-region-names.rst

       For each ``<region>`` document, you must specify
       the ``electableNodes``, ``priority``, and ``readOnlyNodes`` fields.

   * - ``replicationSpec.<region>.electableNodes``
     - integer
     - The number of electable nodes for |service| to deploy to the region.
       Electable nodes can become the :term:`primary` and can facilitate
       local reads.

       The total number of ``electableNodes`` across all
       ``replicationSpec.<region>`` document must be ``3``, ``5``, or ``7``.

       Specify ``0`` if you do not want any electable nodes in the
       region.

       You cannot create electable nodes if the
       ``replicationSpec.<region>.priority`` is 0.

   * - ``replicationSpec.<region>.priority``
     - integer
     - The election priority of the region. For regions with only
       ``replicationSpec.<region>.readOnlyNodes``, set this value to
       ``0``.

       For regions where ``replicationSpec.<region>.electableNodes``
       is at least ``1``, each ``replicationSpec.<region>`` must have
       a priority of exactly one **(1)** less than the previous region.
       The first region **must** have a priority of ``7``. The lowest
       possible priority is ``1``.

       The priority ``7`` region identifies the **Preferred Region** of
       the cluster. |service| places the :term:`primary` node in the
       **Preferred Region**.  Priorities ``1`` through ``7`` are
       exclusive - no more than one region per cluster can be assigned
       a given priority.

       For example, if you have three regions, their
       priorities would be ``7``, ``6``, and ``5`` respectively.
       If you added two more regions for supporting electable nodes,
       the priorities of those regions would be ``4`` and ``3``
       respectively.

   * - ``replicationSpec.<region>.readOnlyNodes``
     - integer
     - The number of read-only nodes for |service| to deploy to the region.
       Read-only nodes can never become the :term:`primary`, but can
       facilitate local-reads.

       Specify ``0`` if you do not want any read-only nodes in the region.

   * - | ``replicationSpec``
       | ``.<region>``
       | ``.analyticsNodes``
     - integer
     - *Optional*

       .. include:: /includes/fact-api-analytics-nodes-description.rst

   * - ``replicationSpecs``
     - array of documents
     - *Optional*

       The configuration for each zone in a :doc:`Global Cluster </global-clusters>`.
       Each document in this array represents a zone where |service| deploys
       nodes for your Global Cluster. You must specify all fields of
       ``replicationSpecs`` to modify any single field.

       Use the ``replicationSpec`` parameter to modify a multi-region
       cluster.

       .. note::

          You cannot specify both the ``replicationSpec`` and ``replicationSpecs``
          parameters in the same request body.

   * - ``replicationSpecs[n].id``
     - string
     - *Required only when modifying the ``replicationSpecs`` parameter*

       Unique identifer of the replication document for a zone in a
       |global-write-cluster|. Required for all existing zones included
       in a cluster modification request body. Not required for a replication
       spec that defines a new zone that you want to add to an existing
       |global-write-cluster|.

       .. warning::

          |service| deletes any existing zones in a |global-write-cluster|
          that are not included in a cluster modification request.

   * - ``replicationSpecs[n].zoneName``
     - string
     - *Required*

       The name for the zone in a |global-write-cluster|.

   * - ``replicationSpecs[n].numShards``
     - int
     - *Required*

       The number of shards to deploy in the specified zone.

   * - ``replicationSpecs[n].regionsConfig``
     - document
     - *Required*

       The physical location of the region. Each ``regionsConfig``
       document describes the region's priority in elections and the
       number and type of MongoDB nodes |service| deploys to the region.
       You must order each ``regionsConfigs`` document by ``regionsConfig.priority``,
       descending.

       .. include:: /includes/fact-group-region-association.rst

       .. list-table::
          :header-rows: 1
          :widths: 20 50

          * - Provider
            - Region Names

          * - AWS
            - .. include:: /includes/fact-aws-region-names.rst

          * - GCP
            - .. include:: /includes/fact-gcp-region-names.rst

          * - AZURE
            - .. include:: /includes/fact-azure-region-names.rst

   * - ``replicationSpecs[n].
       regionsConfig.electableNodes``
     - ingteger
     - *Required*

       The number of electable nodes for |service| to deploy to the region.
       Electable nodes can become the :term:`primary` and can facilitate
       local reads.

   * - ``replicationSpecs[n].
       regionsConfig.readOnlyNodes``
     - integer
     - *Required*

       The number of read-only nodes for |service| to deploy to the region.
       Read-only nodes can never become the :term:`primary`, but can
       facilitate local-reads.

       Specify ``0`` if you do not want any read-only nodes in the region.

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
       | ``.analyticsNodes``
     - integer
     - *Optional*

       .. include:: /includes/fact-api-analytics-nodes-description.rst

   * - ``replicationSpecs[n]
       .regionsConfig.priority``
     - integer
     - *Required*

       The election priority of the region. For regions with only
       read-only nodes, set this value to ``0``.

   * - ``diskSizeGB``
     - double
     - **AWS / GCP ONLY**

       The size in gigabytes of the server's root volume. You can add capacity
       by increasing this number, up to a maximum possible value of ``4096``
       (i.e., 4 TB).

       Each instance size has its own default value. If you set a value below
       the instance default, |service| replaces it with the default value.
       To view default values: open the |service| web interface; click the
       button to add a new cluster; view the available default sizes; close
       the window without saving changes.

       .. important:: |service| calculates storage charges differently
          depending on whether you choose the default value or a custom value.
          For details, see :ref:`storage-capacity`.

       .. include:: /includes/fact-storage-limitation.rst
