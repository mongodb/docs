.. list-table::
   :widths: 20 10 70
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``autoScaling``
     - document
     - *Optional*

       Specify whether to enable/disable disk auto-scaling. The
       document contains ``diskGBEnabled`` field:

       - Set to ``true`` to enable disk auto-scaling.
       - Set to ``false`` to disable disk auto-scaling.

   * - ``mongoDBMajorVersion``
     - string
     - For a cluster running with MongoDB 3.2, specify ``3.4`` to
       direct |service| to upgrade the cluster to MongoDB 3.4. [1]_

       For a cluster running with MongoDB 3.4, specify ``3.6`` to direct
       |service| to upgrade the cluster to MongoDB 3.6.

       You cannot modify this field for ``M2`` or ``M5`` shared tier
       clusters.

       .. include:: /includes/extracts/fact-mongodb-version-downgrade-restriction-scale.rst

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

       The possible values are ``1`` through ``12``.

   * - ``paused``
     - boolean
     - *Optional* A flag to pause or resume the cluster. Possible values are:

       - ``true`` to pause the cluster. You cannot pause a cluster with
         pending changes.

       - ``false`` to resume the cluster. Default.

       .. note::

          Available for M10+ Clusters.

          You cannot pause a cluster with pending changes. If the
          cluster is paused for 7 days, |service| auto-resumes the
          cluster.

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
         ``providerSettings.instanceSizeName`` is either ``M2`` or ``M5``
       
       .. include:: /includes/fact-m2-m5-multi-tenant.rst
          
       You must include this value if modifying any of the other
       ``providerSettings``.

   * - ``providerSettings.backingProviderName``
     - string
     - The cloud service provider on which the server for a multi-tenant 
       cluster is provisioned. This setting is only valid when
       ``providerSettings.providerName`` is ``TENANT`` and 
       ``providerSettings.instanceSizeName`` is ``M2`` or ``M5``.
       
       .. include:: /includes/fact-cloud-service-providers.rst
       
       You must include this value if modifying any of the other
       ``providerSettings``.

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

       You must include ``providerSettings.providerName`` if modifying this
       value.

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

       You must include ``providerSettings.providerName`` if modifying this
       value.
       
       .. include:: /includes/fact-m2-m5-multi-tenant.rst

   * - ``providerSettings.diskIOPS``
     - integer
     - *Optional*

       .. admonition:: AWS only
          :class: note

          Requires that ``providerSettings.instanceSizeName`` be
          ``M30`` or greater.

       The maximum input/output operations per second (IOPS) the system can
       perform. The possible values depend on the selected
       ``providerSettings.instanceSizeName`` and
       ``diskSizeGB``.
       
       To view the possible 
       :abbr:`IOPS (input/output operations per second)` values
       for the selected instance size and storage capacity:
       
       #. Open the |service| web interface.
       #. Select :guilabel:`Build a New Cluster`.
       #. Under :guilabel:`Cloud Provider & Region`, select ``AWS``.
       #. Under :guilabel:`Cloud Provider & Region`, select the region corresponding to your configured ``providerSettings.regionName``. 
       #. Under :guilabel:`Cluster Tier`, select the instance size corresponding to your configured ``providerSettings.instanceSizeName``.
       #. Under :guilabel:`Cluster Tier`, set the :guilabel:`Storage Capacity` slider to your configured ``diskSizeGB``.
          Alternatively, input the exact value of ``diskSizeGB`` in the input box to the right of the slider.
       
       |service| lists the possible 
       :abbr:`IOPS (input/output operations per second)` values for the
       selected instance and storage size as 
       :guilabel:`Standard`, :guilabel:`Fast`, and :guilabel:`Fastest`. 
       Set the value of ``providerSettings.diskIOPS`` to your preferred 
       :abbr:`IOPS (input/output operations per second)` setting.
       
       You must include ``providerSettings.providerName`` if modifying this
       value.

       Changing this value affects the cost of running the cluster
       as described in the :ref:`billing <storage-speed>` documentation.

   * - ``providerSettings.diskTypeName``
     - string
     - *Required*

       **Azure ONLY**

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

       .. important:: |service| calculates storage charges differently
          depending on whether you choose the default value or a custom value.
          For details, see :ref:`storage-capacity`.

   * - ``providerSettings.encryptEBSVolume``
     - Boolean
     - *AWS only*. If enabled, the Amazon EBS encryption feature encrypts the
       server's root volume for both data at rest within the volume and for
       data moving between the volume and the instance.

       You must include ``providerSettings.providerName`` if modifying this
       value.

   * - ``replicationFactor``
     - number
     - The number of :term:`replica set` members. Each member keeps a copy of
       your databases, providing high availability and data redundancy.

       Do *not* specify this field when creating a multi-region cluster
       using the ``replicationSpec`` document.

       If your cluster is a sharded cluster, each shard is a replica set with
       the specified replication factor.

       For information on how the replication factor affects costs, see
       :ref:`server-number-costs`. For more information on MongoDB replica
       sets, see :manual:`Replication </replication>` in the MongoDB manual.

       The possible values are ``3``, ``5``, or ``7``.

       |service| ignores this value if you specify the ``replicationSpec``
       document.

   * - ``replicationSpec``
     - document
     - *Optional*

       The configuration of each region in a multi-region cluster. Each
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

   * - ``replicationSpec.<region>``
     - document
     - *Required if specifying* ``replicationSpec``

       The physical location of the region. Replace ``<region>`` with the name
       of the region.
       
       Each ``<region>`` document describes the region's priority in
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
     - *Required*

       The number of electable nodes for |service| to deploy to the region.
       Electable nodes can become the :term:`primary` and can facilitate
       local reads.

       The total number of ``electableNodes`` across all
       ``replicationSpec.<region>`` documents must be ``3``, ``5``, or ``7``.

       Specify ``0`` if you do not want any electable nodes in the
       region.

       You cannot create electable nodes if the
       ``replicationSpec.<region>.priority`` is 0.

   * - ``replicationSpec.<region>.priority``
     - integer
     - *Required*

       The election priority of the region. For regions with only
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
     - *Required*

       The number of read-only nodes for |service| to deploy to the region.
       Read-only nodes can never become the :term:`primary`, but can
       facilitate local-reads.

       Specify ``0`` if you do not want any read-only nodes in the region.

   * - ``diskSizeGB``
     - double
     - *Optional*

       ** AWS / GCP Only**

       The size in gigabytes of the server's root volume. You can add capacity
       by increasing this number, up to a maximum possible value of ``4096``
       (i.e., 4 TB).

       .. important:: |service| calculates storage charges differently
          depending on whether you choose the default value or a custom value.
          For details, see :ref:`storage-capacity`.

   * - ``backupEnabled``
     - Boolean
     - *Optional*

       Set to ``true`` to enable |service| 
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

       Specify whether to enable/disable |bic|.

       .. include:: /includes/extracts/cluster-option-bi-cluster-requirements.rst

       The ``biConnector`` document includes the following fields:

       .. list-table::
          :widths: 20 80

          * - ``enabled``
            - | Set to ``true`` to enable |bic|.
              | Set to ``false`` to disable |bic|.
      
          * - ``readPreference``
            - | Set to ``"primary"`` to have |bic| read from the primary.
              | Set to ``"secondary"`` to have |bic| read from a secondary member. *Default*

   * - ``encryptionAtRestProvider``
     - string
     - *Optional* Specifies whether :doc:`Encryption at Rest </security-aws-kms>` is
       enabled for the |service| cluster. You must :doc:`/reference/api/enable-configure-encryptionatrest`
       before you can enable the feature for clusters in that project.
       Valid values are the following:

       - ``NONE``: Specifies that Encryption at Rest is disabled for the
         cluster.

       - ``AWS``: Specifies that Encryption at Rest is enabled for the
         cluster using the AWS KMS credentials specified for the |service|
         project where the cluster resides.
         