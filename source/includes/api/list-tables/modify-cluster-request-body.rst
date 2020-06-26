.. list-table::
   :header-rows: 1
   :widths: 15 10 10 65

   * - Body Parameter
     - Type
     - Necessity
     - Description

   * - ``autoScaling``
     - document
     - Optional
     - Configure your cluster to automatically scale its storage and
       cluster tier. For more information on cluster auto-scaling, see
       :ref:`cluster-autoscaling`.

   * - | ``autoScaling``
       | ``.compute``
     - document
     - Optional
     - Specifies whether the cluster automatically scales its cluster
       tier and whether the cluster can scale down.

       .. important::

          Cluster tier auto-scaling is not available for clusters
          using ``Low CPU`` or ``NVME`` storage classes.

   * - | ``autoScaling``
       | ``.compute``
       | ``.enabled``
     - boolean
     - Optional
     - Specifies whether cluster tier auto-scaling is enabled. The
       default is ``false``.

       - Set to ``true`` to enable cluster tier auto-scaling. If
         enabled, you must specify a value for
         ``providerSettings.autoScaling.compute.maxInstanceSize``.

       - Set to ``false`` to disable cluster tier auto-scaling.

       .. note::

          If you disable auto-scaling for your cluster, |service|
          sets your minimum and maximum autoscaling bounds to
          ``null``. If you re-enable autoscaling at a later time, you
          must set new values for
          ``providerSettings.autoScaling.compute.minInstanceSize`` and
          ``providerSettings.autoScaling.compute.maxInstanceSize``.

   * - | ``autoScaling``
       | ``.compute``
       | ``.scaleDownEnabled``
     - boolean
     - Optional
     - Set to true to enable the cluster tier to scale down. This
       option is only available if ``autoScaling.compute.enabled``
       is ``true``.

       If this option is enabled, you must specify a value for
       ``providerSettings.autoScaling.compute.minInstanceSize``.

       .. note::

          .. include:: /includes/fact-must-enable-autoscaling.rst

   * - | ``autoScaling``
       | ``.diskGBEnabled``
     - boolean
     - Optional
     - Specifies whether disk auto-scaling is enabled. The default
       is ``true``.

       - Set to ``true`` to enable disk auto-scaling.
       - Set to ``false`` to disable disk auto-scaling.

       .. include:: /includes/fact-ram-to-storage-ratio.rst

   * - ``backupEnabled``
     - boolean
     - Optional
     - Set to ``true`` to enable |service|
       :doc:`{+old-backup+}s </backup/legacy-backup/overview>` for the
       cluster.

       Set to ``false`` to disable {+old-backup+}s for the cluster.
       |service| deletes any stored snapshots. See the {+old-backup+} :ref:`retention-policy` for more information.

       You cannot enable {+old-backup+}s if you have an
       existing cluster in the project with
       :doc:`/backup/cloud-backup/overview` enabled.

       The default value is ``false``.

       .. note::

          This option is not supported on clusters running
          MongoDB 4.2. Clusters running MongoDB 4.2 must use
          :doc:`/backup/cloud-backup/overview`.

       .. important::

          If you have :doc:`{+old-backup+}s </backup/legacy-backup/overview>`
          enabled on your cluster and you upgrade from MongoDB server version
          ``4.0`` to ``4.2``, you must set ``backupEnabled`` to ``false`` and set
          ``providerBackupEnabled`` to ``true`` as part of the API request.
          Continuous backups are no longer supported in MongoDB version ``4.2``.
          Instead, use :doc:`/backup/cloud-backup/overview`.

   * - ``biConnector``
     - document
     - Optional
     - Specify whether to enable/disable |bic|.

       .. include:: /includes/extracts/cluster-option-bi-cluster-requirements.rst

   * - | ``biConnector``
       | ``.enabled``
     - boolean
     - Optional
     - Specifies whether or not |bic| is enabled on the cluster.

       - Set to ``true`` to enable |bic|.
       - Set to ``false`` to disable |bic|.

   * - | ``biConnector``
       | ``.readPreference``
     - string
     - Optional
     - Specifies the read preference to be used by |bic| on the
       cluster. Each |bic| read preference contains a distinct
       combination of :manual:`readPreference </core/read-preference/>`
       and :manual:`readPreferenceTags </core/read-preference/#tag-sets>`
       options. To learn more about |bic| read preferences, see
       :ref:`BI Connector Read Preferences Table <bic-read-preferences>`.

       - Set to ``"primary"`` to have |bic| read from the primary.

       - Set to ``"secondary"`` to have |bic| read from a secondary
         member. *The preference defaults to this value if there are no
         analytics nodes in the cluster*.

       - Set to ``"analytics"`` to have |bic| read from an
         :ref:`analytics node <analytics-nodes-overview>`.
         *Default if the cluster contains analytics nodes*.

         .. note::

            To set the ``readPreference`` value to ``"analytics"``,
            the cluster must have at least one analytics node.

            If the ``readPreference`` value is ``"analytics"``, you
            cannot remove all analytics nodes from the cluster.

   * - ``clusterType``
     - string
     - Conditional
     - Specifies the type of the cluster that you want to modify.

       .. include:: /includes/fact-conversion-sharded-clusters.rst

       .. admonition:: When should you use ``clusterType``?
          :class: note

          .. list-table::
             :header-rows: 1
             :widths: 80 20

             * - Condition
               - Necessity

             * - You set ``replicationSpecs``.
               - Required

             * - You are deploying
                 :doc:`Global Clusters </global-clusters>`.
               - Required

             * - You are deploying non-Global replica sets and sharded
                 clusters.
               - Optional

       Accepted values include:

       .. list-table::
          :header-rows: 1
          :widths: 60 40

          * - Value
            - Cluster Type

          * - ``REPLICASET``
            - :term:`replica set`
          * - ``SHARDED``
            - :term:`sharded cluster`
          * - ``GEOSHARDED``
            - Global Cluster

   * - ``diskSizeGB``
     - double
     - Conditional
     -
       .. admonition:: When should you use ``diskSizeGB``?
          :class: note

          This setting:

          - Cannot be used with |nvme-clusters|
          - Cannot be used with Azure clusters. Use
            :ref:`providerSettings.diskTypeName <modify-cluster-providerSettings-diskTypeName>` instead.
          - Must be used when ``replicationSpecs`` is set

       The size in gigabytes of the server's root volume. You can add
       capacity by increasing this number, up to a maximum possible
       value of ``4096`` (i.e., 4 TB).

       Each cluster tier has its own default value. If you set a value
       below the cluster default, |service| replaces it with the
       default value. To view default values: open the |service| web
       interface; click the button to add a new cluster; view the
       available default sizes; close the window without saving
       changes.

       .. important::

          |service| calculates storage charges differently depending on
          whether you choose the default value or a custom value. For
          details, see :ref:`storage-capacity`.

       .. include:: /includes/fact-storage-limitation.rst

       .. include:: /includes/autoscale-oplog.rst

   * - ``encryptionAtRestProvider``
     - string
     - Optional
     - Set the Encryption at Rest parameter to one of the following:

       .. tabs::

          tabs:
            - id: aws
              name: AWS
              content: |

                Specify ``AWS`` to enable
                :doc:`Encryption at Rest </security-aws-kms>` using the
                |service| project |aws| Key Management System settings.
                The cluster must meet the following requirements:

                .. include:: /includes/fact-encryption-at-rest-restrictions.rst

            - id: gcp
              name: GCP
              content: |

                Specify ``GCP`` to enable
                :doc:`Encryption at Rest </security-kms-encryption/>` using the
                |service| project |gcp| Key Management System settings.
                The cluster must meet the following requirements:

                .. include:: /includes/fact-encryption-at-rest-restrictions.rst

            - id: azure
              name: Azure
              content: |

                Specify ``AZURE`` to enable
                :ref:`Encryption at Rest <security-azure-kms>` using
                the |service| project Azure Key Management System
                settings. The cluster must meet the following
                requirements:

                .. include:: /includes/fact-encryption-at-rest-restrictions.rst

            - id: none
              name: NONE
              content: |

                Specify ``NONE`` to disable Encryption at rest.

   * - ``labels``
     - array of documents
     - Optional
     - Array containing key-value pairs that tag and categorize the
       cluster.

       Each key and value has a maximum length of 255 characters.

       .. include:: /includes/fact-example-labels.rst

   * - ``name``
     - string
     - Optional
     - Name of the cluster as it appears in |service|. Once the
       cluster is created, its name cannot be changed.

   * - ``mongoDBMajorVersion``
     - string
     - Optional
     - Version of the cluster to deploy. |service| supports the
       following MongoDB versions for ``M10+`` clusters:

       - ``3.6``
       - ``4.0``
       - ``4.2``
       - ``4.4``

       .. include:: /includes/admonitions/version-4.4-beta.rst

       You must set this value to ``4.2`` if
       ``providerSettings.instanceSizeName``
       is either ``M2`` or ``M5``.

       .. include:: /includes/admonitions/version-4.4-beta-shared-tier-exception.rst

       |service| always deploys the cluster with the latest stable
       release of the specified version. You can upgrade to a newer
       version of MongoDB when you
       :doc:`modify a cluster </reference/api/clusters-modify-one>`

       .. note::

          If you are upgrading from version ``4.0`` to ``4.2`` and you
          have :doc:`{+old-backup+}s </backup/legacy-backup/overview>`
          enabled, you must set ``backupEnabled`` to ``false`` and set
          ``providerBackupEnabled`` to ``true`` as part of the API request.
          Continuous backups are no longer supported in MongoDB version ``4.2``.
          Instead, use :doc:`/backup/cloud-backup/overview`. 

   * - ``numShards``
     - integer
     - Conditional
     - Number of shards to deploy in a sharded cluster.

       .. important::

          If you use the ``replicationSpecs`` parameter, you must set
          ``numShards``.

       The possible values are ``1`` through ``50``, inclusive. The
       default value is 1.

       - If you specify a ``numShards`` value of ``1`` and a
         ``clusterType`` of ``SHARDED``, |service| deploys a
         single-shard :term:`sharded cluster`.

       - If you specify a ``numShards`` value of ``1`` and a
         ``clusterType`` of ``REPLICASET``, |service| deploys a
         :term:`replica set`.

       .. include:: /includes/fact-single-shard-cluster-warning.rst

       For more information on sharded clusters, see
       :manual:`Sharding </sharding>` in the MongoDB manual.

       For details on how this setting affects costs, see
       :ref:`server-number-costs`.

       .. note::

          Do not include in the request body for
          :doc:`Global Clusters </global-clusters>`.

   * - ``paused``
     - boolean
     - Optional
     - Indicates whether the cluster is paused or not. The default
       value is false.

       You cannot create a paused cluster. Either omit the field or
       explicitly set to false.

   * - ``pitEnabled``
     - boolean
     - Optional
     - Indicates if the cluster uses :ref:`{+pit-restore+}s
       <pit-restore>`. If set to ``true``, ``providerBackupEnabled``
       must also be set to ``true``.

   * - ``providerBackupEnabled``
     - boolean
     - Conditional
     - Set ``true`` or ``false`` to enable or disable
       :ref:`backup-cloud-provider` for cluster backups.
       If ``providerBackupEnabled`` *and* ``backupEnabled`` are
       ``false``, the cluster does not use |service| backups.

       If you disable {+old-backup+}s for the cluster,
       |service| deletes all stored snapshots. See the {+old-backup+} :ref:`retention-policy` for more information.

       You cannot enable {+Cloud-Backup+}s if you have an
       existing cluster in the project with
       :ref:`legacy-backup` enabled.

       .. important::

          You must set this value to ``true`` for NVMe clusters.

   * - ``providerSettings``
     - document
     - Optional
     - Configuration for the provisioned servers on which MongoDB
       runs. The available options are specific to the cloud service
       provider.

   * - | ``providerSettings``
       | ``.autoScaling``
     - document
     - Conditional
     - Contains the ``minInstanceSize`` and ``maxInstanceSize`` fields
       which specify the range of instance sizes to which your cluster
       can scale. Required if
       ``autoScaling.compute.enabled`` is ``true``.

       .. important::

          .. include:: /includes/fact-must-enable-autoscaling.rst

   * - | ``providerSettings``
       | ``.autoScaling``
       | ``.compute``
     - document
     - Conditional
     - Contains the ``minInstanceSize`` and ``maxInstanceSize`` fields
       which specify the range of instance sizes to which your cluster
       can scale.

   * - | ``providerSettings``
       | ``.autoScaling``
       | ``.compute``
       | ``.minInstanceSize``
     - string
     - Conditional
     - Minimum instance size to which your cluster can
       automatically scale (e.g., ``M10``). Required if
       ``autoScaling.compute.scaleDownEnabled`` is ``true``.

   * - | ``providerSettings``
       | ``.autoScaling``
       | ``.compute``
       | ``.maxInstanceSize``
     - string
     - Conditional
     - Maximum instance size to which your cluster can
       automatically scale (e.g., ``M40``). Required if
       ``autoScaling.compute.enabled`` is ``true``.

   * - | ``providerSettings``
       | ``.backingProviderName``
     - string
     - Conditional
     - Cloud service provider on which the server for a
       multi-tenant cluster is provisioned.

       This setting is only valid when ``providerSetting.providerName``
       is ``TENANT`` and ``providerSetting.instanceSizeName`` is ``M2``
       or ``M5``.

       .. include:: /includes/fact-cloud-service-providers.rst

   * - | ``providerSettings``
       | ``.diskIOPS``
     - integer
     - AWS Optional
     -
       .. include:: /includes/providerSettings-diskIOPS.rst

   * - | ``providerSettings``
       | ``.diskTypeName``
     - string
     - Azure Optional
     - .. include:: /includes/modify-cluster-providerSettings-diskTypeName.rst

   * - | ``providerSettings``
       | ``.encryptEBSVolume``
     - boolean
     - AWS Optional
     - If enabled, the Amazon EBS encryption feature encrypts the
       server's root volume for both data at rest within the volume
       and for data moving between the volume and the cluster.

       .. note::

          This setting is always enabled for |nvme-clusters|.

       The default value is ``true``.

   * - | ``providerSettings``
       | ``.instanceSizeName``
     - string
     - Required
     - |service| provides different cluster tiers, each with a default
       storage capacity and RAM size. The cluster you select is
       used for all the data-bearing servers in your cluster. For
       definitions of data-bearing servers, see
       :ref:`server-number-costs`.

       .. tabs-cloud-providers::

          tabs:
            - id: aws
              content: |

                .. include:: /includes/list-tables/instance-types/aws.rst

                .. include:: /includes/fact-instance-size-names.rst

            - id: gcp
              content: |

                .. include:: /includes/list-tables/instance-types/gcp.rst

            - id: azure
              content: |

                .. include:: /includes/list-tables/instance-types/azure.rst

       .. include:: /includes/fact-m2-m5-multi-tenant.rst

   * - | ``providerSettings``
       | ``.providerName``
     - string
     - Conditional
     - Cloud service provider on which the servers are provisioned.

       .. include:: /includes/fact-cloud-service-providers.rst
       - ``TENANT`` - A multi-tenant deployment on one of the supported
         cloud service providers. Only valid when
         ``providerSettings.instanceSizeName`` is either ``M2`` or
         ``M5``.

       .. include:: /includes/fact-m2-m5-multi-tenant.rst

       If you modify any ``providerSettings`` or ``replicationSpec``
       values, you *must* specify this value. For ``M2`` and ``M5``
       clusters, you must also specify the
       ``providerSettings.backingProviderName``.

   * - | ``providerSettings``
       | ``.regionName``
     - string
     - Optional
     -
       .. admonition:: Required if setting ``replicationSpecs`` array to empty
          :class: note

          This field is *required* if you have not set any values in
          the  ``replicationSpecs`` array.

       Physical location of your MongoDB cluster. The region you choose
       can affect network latency for clients accessing your databases.

       Do *not* specify this field when creating a multi-region cluster
       using the ``replicationSpec`` document.

       .. include:: /includes/fact-group-region-association.rst

       Select your cloud provider's tab for example cluster region
       names:

       .. include:: /includes/fact-cloud-region-name-examples.rst

   * - | ``providerSettings``
       | ``.volumeType``
     - string
     - AWS Optional
     -
       .. include:: /includes/providerSettings-volumeType.rst

   * - ``replicationFactor``
     - number
     - Optional
     -

       .. admonition:: Use ``replicationSpecs``
          :class: note

          ``replicationFactor`` is deprecated. Use
          ``replicationSpecs``.

       Number of :term:`replica set` members. Each member keeps a
       copy of your databases, providing high availability and data
       redundancy. The possible values are ``3``, ``5``, or ``7``. The
       default value is ``3``.

       Do *not* specify this field when creating a multi-region cluster
       using the ``replicationSpec`` document.

       If your cluster is a sharded cluster, each shard is a replica
       set with the specified replication factor.

       For information on how the replication factor affects costs, see
       :ref:`server-number-costs`. For more information on MongoDB
       replica sets, see :manual:`Replication </replication>` in the
       MongoDB manual.

       |service| ignores this value if you pass the ``replicationSpec``
       document.

   * - ``replicationSpec``
     - document
     - Optional
     -

       .. admonition:: Use ``replicationSpecs``
          :class: note

          ``replicationSpec`` is deprecated. Use ``replicationSpecs``.

       Configuration of each region in a multi-region cluster. Each
       element in this document represents a region where |service|
       deploys your cluster.

       For single-region clusters, you can either specify the
       ``providerSettings.regionName`` and ``replicationFactor``, *or*
       you can use the ``replicationSpec`` document to define a single
       region.

       For multi-region clusters, omit the
       ``providerSettings.regionName`` field.

       For Global Clusters, specify the ``replicationSpecs`` parameter
       rather than a ``replicationSpec`` parameter.

       .. important::

          You **must** order each element in this document by
          ``replicationSpec.<region>.priority`` descending.

       Use the ``replicationSpecs`` parameter to modify a
       :doc:`Global Cluster </global-clusters>`.

       .. note::

          You cannot specify both the ``replicationSpec`` and
          ``replicationSpecs`` parameters in the same request body.

   * - | ``replicationSpec``
       | ``.<region>``
     - document
     - Optional
     - Physical location of the region. Replace ``<region>`` with
       the name of the region. Each ``<region>`` document describes the
       region's priority in elections and the number and type of
       MongoDB nodes |service| deploys to the region. You must order
       each ``<region>`` by ``replicationSpec.priority`` descending.

       You must specify at least one ``replicationSpec.<region>``
       document.

       Select your cloud provider's tab for example cluster region
       names:

       .. include:: /includes/fact-cloud-region-name-examples.rst

       For each ``<region>`` document, you must specify the
       ``analyticsNodes``, ``electableNodes``, ``priority``, and
       ``readOnlyNodes`` fields. For information on cross-region
       node limits, see :ref:`mod-cluster-considerations`.

       .. include:: /includes/fact-group-region-association.rst

   * - | ``replicationSpec``
       | ``.<region>``
       | ``.analyticsNodes``
     - integer
     - Optional
     -
       .. include:: /includes/fact-api-analytics-nodes-description.rst

   * - | ``replicationSpec``
       | ``.<region>``
       | ``.electableNodes``
     - integer
     - Optional
     - Number of electable nodes for |service| to deploy to the
       region. Electable nodes can become the :term:`primary` and can
       facilitate local reads.

       The total number of ``electableNodes`` across all
       ``replicationSpec.<region>`` document must be ``3``, ``5``, or
       ``7``.

       Specify ``0`` if you do not want any electable nodes in the
       region.

       You cannot create electable nodes if the
       ``replicationSpec.<region>.priority`` is 0.

   * - | ``replicationSpec``
       | ``.<region>``
       | ``.priority``
     - integer
     - Optional
     - Election priority of the region. For regions with only
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

   * - | ``replicationSpec``
       | ``.<region>``
       | ``.readOnlyNodes``
     - integer
     - Optional
     - Number of read-only nodes for |service| to deploy to the
       region. Read-only nodes can never become the :term:`primary`,
       but can facilitate local-reads.

       Specify ``0`` if you do not want any read-only nodes in the
       region.

   * - ``replicationSpecs``
     - array of documents
     - Conditional
     - Configuration for cluster regions.

       .. admonition:: When should you use ``replicationSpecs``?
          :class: note

          .. list-table::
             :header-rows: 1
             :widths: 40 20 40

             * - Condition
               - Necessity
               - Values

             * - You are deploying
                 :doc:`Global Clusters </global-clusters>`.
               - Required
               - Each document in the array represents a zone where
                 |service| deploys your cluster's nodes.

             * - You are deploying non-Global replica sets and sharded
                 clusters.
               - Optional
               - This array has one document representing where
                 |service| deploys your cluster's nodes.

       You must specify all parameters in ``replicationSpecs`` document array.

       .. admonition:: What parameters depend on ``replicationSpecs``?

          If you set ``replicationSpecs``, you must:

          - Set ``clusterType``
          - Set ``numShards``
          - Not set ``replicationSpec``
          - Not use |nvme-clusters|
          - Not use Azure clusters

   * - | ``replicationSpecs[n]``
       | ``.id``
     - string
     - Conditional
     - Unique identifer of the replication document for a zone in a
       |global-write-cluster|.

       .. list-table:: When is this value needed?
          :header-rows: 1
          :widths: 80 20

          * - Condition
            - Necessity

          * - Existing zones included in a cluster modification request
              body.
            - Required

          * - Adding a new zone to an existing |global-write-cluster|.
            - Optional

       .. warning::

          |service| deletes any existing zones in a
          |global-write-cluster| that are not included in a cluster
          modification request.

   * - | ``replicationSpecs[n]``
       | ``.numShards``
     - integer
     - Required
     - Number of shards to deploy in the specified zone. The default
       value is ``1``.

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
     - document
     - Optional
     - Physical location of the region. Each ``regionsConfig``
       document describes the region's priority in elections and the
       number and type of MongoDB nodes |service| deploys to the
       region. You must order each ``regionsConfigs`` document by
       ``regionsConfig.priority``, descending.

       .. include:: /includes/fact-group-region-association.rst

       Select your cloud provider's tab for example cluster region
       names:

       .. include:: /includes/fact-cloud-region-name-examples.rst

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
       | ``.electableNodes``
     - integer
     - Optional
     - Number of electable nodes for |service| to deploy to the
       region. Electable nodes can become the :term:`primary` and can
       facilitate local reads.

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
       | ``.readOnlyNodes``
     - integer
     - Optional
     - Number of read-only nodes for |service| to deploy to the
       region. Read-only nodes can never become the :term:`primary`,
       but can facilitate local-reads.

       Specify ``0`` if you do not want any read-only nodes in the
       region.

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
       | ``.analyticsNodes``
     - integer
     - Optional
     -
       .. include:: /includes/fact-api-analytics-nodes-description.rst

   * - | ``replicationSpecs[n]``
       | ``.regionsConfig``
       | ``.priority``
     - integer
     - Optional
     - Election priority of the region. For regions with only
       read-only nodes, set this value to ``0``.

   * - | ``replicationSpecs[n]``
       | ``.zoneName``
     - string
     - Optional
     - Name for the zone in a |global-write-cluster|.
