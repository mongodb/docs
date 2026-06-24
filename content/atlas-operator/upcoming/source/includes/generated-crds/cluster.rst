.. _cluster: 

Cluster
-------

A cluster, managed by the MongoDB Kubernetes Atlas Operator.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiVersion``
     - string
     - atlas.generated.mongodb.com/v1
     - true

   * -  ``kind``
     - string
     - Cluster
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - Specification of the cluster supporting the following versions:

       - v20250312

       At most one versioned ``spec`` can be specified. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__
       **Validations:**

       - (has(self.v20250312.``groupId``) && has(self.``connectionSecretRef``)) || (!has(self.v20250312.``groupId``)): spec.``connectionSecretRef`` must be set if spec.v20250312.``groupId`` is set.
     - false

   * -  ``status``
     - object
     - Most recently observed read-only ``status`` of the cluster for the specified resource version. This data may not be up to date and is populated by the system. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__
     - false

.. _cluster-spec: 

Cluster.spec
~~~~~~~~~~~~

Specification of the cluster supporting the following versions:

- v20250312

At most one versioned spec can be specified. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``connectionSecretRef``
     - object
     - ``SENSITIVE`` ``FIELD``
       Reference to a secret containing the credentials to setup the connection to Atlas.
     - false

   * -  ``v20250312``
     - object
     - The spec of the cluster resource for version v20250312.
       **Validations:**

       - (has(self.``groupId``) && !has(self.``groupRef``)) || (!has(self.``groupId``) && has(self.``groupRef``)): ``groupId`` and ``groupRef`` are mutually exclusive; only one of them can be set
     - false

.. _cluster-spec-connectionsecretref: 

Cluster.spec.connectionSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

SENSITIVE FIELD

Reference to a secret containing the credentials to setup the connection to Atlas.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the secret containing the Atlas credentials.
     - false

.. _cluster-spec-v20250312: 

Cluster.spec.v20250312
~~~~~~~~~~~~~~~~~~~~~~

The spec of the cluster resource for version v20250312.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``entry``
     - object
     - The ``entry`` fields of the cluster resource spec. These fields can be set for creating and updating clusters.
     - false

   * -  ``groupId``
     - string
     - Unique 24-hexadecimal digit string that identifies your project. Use the ``/groups`` endpoint to retrieve all projects to which the authenticated user has access.

       .. note::

          Groups and projects are synonymous terms. Your group id is the same as your project id. For existing groups, your group/project id remains the same. The resource and corresponding endpoints use the term groups.

       **Validations:**

       - self == ``oldSelf``: ``groupId`` cannot be modified after creation
     - false

   * -  ``groupRef``
     - object
     - A reference to a "Group" resource.
       The value of "$.status.v20250312.id" will be used to set "``groupId``".
       Mutually exclusive with the "``groupId``" property.
     - false

.. _cluster-spec-v20250312-entry: 

Cluster.spec.v20250312.entry
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The entry fields of the cluster resource spec. These fields can be set for creating and updating clusters.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``acceptDataRisksAndForceReplicaSetReconfig``
     - string
     - If reconfiguration is necessary to regain a primary due to a regional outage, submit this field alongside your topology reconfiguration to request a new regional outage resistant topology. Forced reconfigurations during an outage of the majority of electable nodes carry a risk of data loss if replicated writes (even majority committed writes) have not been replicated to the new primary node. ``MongoDB`` Atlas docs contain more information. To proceed with an operation which carries that risk, set ``acceptDataRisksAndForceReplicaSetReconfig`` to the current date. This parameter expresses its value in the ``ISO`` 8601 timestamp format in ``UTC``.
     - false

   * -  ``adaptiveCapacity``
     - string
     - Governs adaptive capacity behavior of Azure nodes in single-cloud Azure clusters or multi-cloud clusters that include Azure nodes. Adaptive capacity enables fallback hardware selection when the primary instance family is unavailable. ``ENABLED`` means the cluster explicitly opts in to adaptive capacity. ``DISABLED`` means the cluster explicitly opts out; the cluster receives capacity errors instead of being placed on fallback hardware. ``null`` means the field is unset; Azure clusters use adaptive capacity by default when the feature is enabled at the group level. Setting this field for single-cloud ``AWS`` or ``GCP`` clusters is a no-op.
     - false

   * -  ``advancedConfiguration``
     - object
     - Group of settings that configures a subset of the advanced configuration details.
     - false

   * -  ``backupEnabled``
     - boolean
     - Flag that indicates whether the cluster can perform backups. If set to ``true``, the cluster can perform backups. You must set this value to ``true`` for NVMe clusters. Backup uses Cloud Backups for dedicated clusters and `Shared Cluster Backups <https://docs.atlas.mongodb.com/backup/shared-tier/overview/>`__ for tenant clusters. If set to ``false``, the cluster doesn't use backups.
     - false

   * -  ``biConnector``
     - object
     - Settings needed to configure the ``MongoDB`` Connector for Business Intelligence for this cluster.
     - false

   * -  ``clusterType``
     - string
     - Configuration of nodes that comprise the cluster.
     - false

   * -  ``configServerManagementMode``
     - string
     - Config Server Management Mode for creating or updating a sharded cluster. When configured as ``ATLAS_MANAGED``, Atlas may automatically switch the cluster's config server type for optimal performance and savings. When configured as ``FIXED_TO_DEDICATED``, the cluster will always use a dedicated config server.
     - false

   * -  ``configServerType``
     - string
     - Describes a sharded cluster's config server type.
     - false

   * -  ``diskWarmingMode``
     - string
     - Disk warming mode selection.
     - false

   * -  ``encryptionAtRestProvider``
     - string
     - Cloud service provider that manages your customer keys to provide an additional layer of encryption at rest for the cluster. To enable customer key management for encryption at rest, the cluster ``replicationSpecs[n].regionConfigs[m].{type}Specs.instanceSize`` setting must be ``M10`` or higher and ``"backupEnabled" : false`` or omitted entirely.
     - false

   * -  ``globalClusterSelfManagedSharding``
     - boolean
     - Set this field to configure the Sharding Management Mode when creating a new Global Cluster.
       When set to false, the management mode is set to Atlas-Managed Sharding. This mode fully manages the sharding of your Global Cluster and is built to provide a seamless deployment experience.
       When set to true, the management mode is set to Self-Managed Sharding. This mode leaves the management of shards in your hands and is built to provide an advanced and flexible deployment experience.
       This setting cannot be changed once the cluster is deployed.
     - false

   * -  ``labels``
     - []object
     - Collection of key-value pairs between 1 to 255 characters in length that tag and categorize the cluster. The ``MongoDB`` Cloud console doesn't display your labels.
       Cluster ``labels`` are deprecated and will be removed in a future release. We strongly recommend that you use Resource Tags instead.
     - false

   * -  ``mongoDBEmployeeAccessGrant``
     - object
     - ``MongoDB`` employee granted access level and expiration for a cluster.
     - false

   * -  ``mongoDBMajorVersion``
     - string
     - ``MongoDB`` major version of the cluster. Set to the binary major version.
       On creation: Choose from the available versions of ``MongoDB``, or leave unspecified for the current recommended default in the ``MongoDB`` Cloud platform. The recommended version is a recent Long Term Support version. The default is not guaranteed to be the most recently released version throughout the entire release cycle. For versions available in a specific project, see the linked documentation or use the ``API`` endpoint for ``project LTS versions endpoint``.
       On update: Increase version only by 1 major version at a time. If the cluster is pinned to a ``MongoDB`` feature compatibility version exactly one major version below the current ``MongoDB`` version, the ``MongoDB`` version can be downgraded to the previous major version.
     - false

   * -  ``name``
     - string
     - Human-readable label that identifies the cluster.
     - false

   * -  ``paused``
     - boolean
     - Flag that indicates whether the cluster is paused.
     - false

   * -  ``pitEnabled``
     - boolean
     - Flag that indicates whether the cluster uses continuous cloud backups.
     - false

   * -  ``redactClientLogData``
     - boolean
     - Enable or disable log redaction.
       This setting configures the ``mongod`` or ``mongos`` to redact any document field contents from a message accompanying a given log event before logging. This prevents the program from writing potentially sensitive data stored on the database to the diagnostic log. Metadata such as error or operation codes, line numbers, and source file names are still visible in the logs.
       Use ``redactClientLogData`` in conjunction with Encryption at Rest and ``TLS``/``SSL`` (Transport Encryption) to assist compliance with regulatory requirements.
       *Note*: changing this setting on a cluster will trigger a rolling restart as soon as the cluster is updated.
     - false

   * -  ``replicaSetScalingStrategy``
     - string
     - Set this field to configure the replica set scaling mode for your cluster.
       By default, Atlas scales under ``WORKLOAD_TYPE``. This mode allows Atlas to scale your analytics nodes in parallel to your operational nodes.
       When configured as ``SEQUENTIAL``, Atlas scales all nodes sequentially. This mode is intended for steady-state workloads and applications performing latency-sensitive secondary reads.
       When configured as ``NODE_TYPE``, Atlas scales your electable nodes in parallel with your read-only and analytics nodes. This mode is intended for large, dynamic workloads requiring frequent and timely cluster tier scaling. This is the fastest scaling strategy, but it might impact latency of workloads when performing extensive secondary reads.
     - false

   * -  ``replicationSpecs``
     - []object
     - List of settings that configure your cluster regions. This array has one object per shard representing node configurations in each shard. For replica sets there is only one object representing node configurations.
     - false

   * -  ``retainBackups``
     - boolean
     - Flag that indicates whether the cluster retains backups.
     - false

   * -  ``rootCertType``
     - string
     - Root Certificate Authority that ``MongoDB`` Atlas cluster uses. ``MongoDB`` Cloud supports Internet Security Research Group.
     - false

   * -  ``tags``
     - []object
     - List that contains key-value pairs between 1 to 255 characters in length for tagging and categorizing the cluster.
     - false

   * -  ``terminationProtectionEnabled``
     - boolean
     - Flag that indicates whether termination protection is enabled on the cluster. If set to ``true``, ``MongoDB`` Cloud won't delete the cluster. If set to ``false``, ``MongoDB`` Cloud will delete the cluster.
     - false

   * -  ``useAwsTimeBasedSnapshotCopyForFastInitialSync``
     - boolean
     - Flag that indicates whether ``AWS`` time-based snapshot copies will be used instead of slower standard snapshot copies during fast Atlas cross-region initial syncs. This flag is only relevant for clusters containing ``AWS`` nodes.
     - false

   * -  ``versionReleaseSystem``
     - string
     - Method by which the cluster maintains the ``MongoDB`` versions. If value is ``CONTINUOUS``, you must not specify ``mongoDBMajorVersion``.
     - false

.. _cluster-spec-v20250312-entry-advancedconfiguration: 

Cluster.spec.v20250312.entry.advancedConfiguration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Group of settings that configures a subset of the advanced configuration details.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``customOpensslCipherConfigTls12``
     - []string
     - The custom ``OpenSSL`` cipher suite list for ``TLS`` 1.2. This field is only valid when ``tlsCipherConfigMode`` is set to ``CUSTOM``.
     - false

   * -  ``customOpensslCipherConfigTls13``
     - []string
     - The custom ``OpenSSL`` cipher suite list for ``TLS`` 1.3. This field is only valid when ``tlsCipherConfigMode`` is set to ``CUSTOM``.
     - false

   * -  ``minimumEnabledTlsProtocol``
     - string
     - Minimum Transport Layer Security (``TLS``) version that the cluster accepts for incoming connections. Clusters using ``TLS`` 1.0 or 1.1 should consider setting ``TLS`` 1.2 as the minimum ``TLS`` protocol version.
     - false

   * -  ``tlsCipherConfigMode``
     - string
     - The ``TLS`` cipher suite configuration mode. The default mode uses the default cipher suites. The custom mode allows you to specify custom cipher suites for both ``TLS`` 1.2 and ``TLS`` 1.3.
     - false

.. _cluster-spec-v20250312-entry-biconnector: 

Cluster.spec.v20250312.entry.biConnector
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Settings needed to configure the MongoDB Connector for Business Intelligence for this cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether ``MongoDB`` Connector for Business Intelligence is ``enabled`` on the specified cluster.
     - false

   * -  ``readPreference``
     - string
     - Data source node designated for the ``MongoDB`` Connector for Business Intelligence on ``MongoDB`` Cloud. The ``MongoDB`` Connector for Business Intelligence on ``MongoDB`` Cloud reads data from the primary, secondary, or analytics node based on your read preferences. Defaults to ``ANALYTICS`` node, or ``SECONDARY`` if there are no ``ANALYTICS`` nodes.
     - false

.. _cluster-spec-v20250312-entry-labels: 

Cluster.spec.v20250312.entry.labels
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Human-readable labels applied to this MongoDB Cloud component.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``key``
     - string
     - Key applied to tag and categorize this component.
     - false

   * -  ``value``
     - string
     - Value set to the Key applied to tag and categorize this component.
     - false

.. _cluster-spec-v20250312-entry-mongodbemployeeaccessgrant: 

Cluster.spec.v20250312.entry.mongoDBEmployeeAccessGrant
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MongoDB employee granted access level and expiration for a cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``expirationTime``
     - string
     - Expiration date for the employee access grant. This parameter expresses its value in the ``ISO`` 8601 timestamp format in ``UTC``.
     - true

   * -  ``grantType``
     - string
     - Level of access to grant to ``MongoDB`` Employees.
     - true

   * -  ``links``
     - []object
     - List of one or more Uniform Resource Locators (URLs) that point to ``API`` sub-resources, related ``API`` resources, or both. ``RFC`` 5988 outlines these relationships.
     - false

.. _cluster-spec-v20250312-entry-mongodbemployeeaccessgrant-links: 

Cluster.spec.v20250312.entry.mongoDBEmployeeAccessGrant.links
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``href``
     - string
     - Uniform Resource Locator (``URL``) that points another ``API`` resource to which this response has some relationship. This ``URL`` often begins with ``https://cloud.mongodb.com/api/atlas``.
     - false

   * -  ``rel``
     - string
     - Uniform Resource Locator (``URL``) that defines the semantic relationship between this resource and another ``API`` resource. This ``URL`` often begins with ``https://cloud.mongodb.com/api/atlas``.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs: 

Cluster.spec.v20250312.entry.replicationSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Details that explain how MongoDB Cloud replicates data on the specified MongoDB database.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``regionConfigs``
     - []object
     - Hardware specifications for nodes set for a given region. Each ``regionConfigs`` object must be unique by region and cloud provider within the ``replicationSpec``. Each ``regionConfigs`` object describes the region's priority in elections and the number and type of ``MongoDB`` nodes that ``MongoDB`` Cloud deploys to the region. Each ``regionConfigs`` object must have either an ``analyticsSpecs`` object, ``electableSpecs`` object, or ``readOnlySpecs`` object. Tenant clusters only require ``electableSpecs``. Dedicated clusters can specify any of these specifications, but must have at least one ``electableSpecs`` object within a ``replicationSpec``.
       **Example:**
       If you set ``replicationSpecs[n].regionConfigs[m].analyticsSpecs.instanceSize`` : ``M30``, set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M30`` if you have electable nodes and ``replicationSpecs[n].regionConfigs[m].readOnlySpecs.instanceSize`` : ``M30`` if you have read-only nodes.
     - false

   * -  ``zoneId``
     - string
     - Unique 24-hexadecimal digit string that identifies the zone in a Global Cluster. This value can be used to configure Global Cluster backup policies.
     - false

   * -  ``zoneName``
     - string
     - Human-readable label that describes the zone this shard belongs to in a Global Cluster. Provide this value only if ``clusterType`` : ``GEOSHARDED`` but not ``selfManagedSharding`` : ``true``.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs-regionconfigs: 

Cluster.spec.v20250312.entry.replicationSpecs.regionConfigs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Cloud service provider on which MongoDB Cloud provisions the hosts.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``analyticsAutoScaling``
     - object
     - Options that determine how this cluster handles resource scaling.
     - false

   * -  ``analyticsSpecs``
     - object
     - The current hardware specifications for read only nodes in the region.
     - false

   * -  ``autoScaling``
     - object
     - Options that determine how this cluster handles resource scaling.
     - false

   * -  ``backingProviderName``
     - string
     - Cloud service provider on which ``MongoDB`` Cloud provisioned the multi-tenant cluster. The resource returns this parameter when ``providerName`` is ``TENANT`` and ``electableSpecs.instanceSize`` is ``M0``, ``M2`` or ``M5``.
       Please note that using an ``instanceSize`` of ``M2`` or ``M5`` will create a Flex cluster instead. Support for the ``instanceSize`` of ``M2`` or ``M5`` will be discontinued in January 2026. We recommend using the Create Flex Cluster ``API`` for such configurations moving forward.
     - false

   * -  ``electableSpecs``
     - object
     - Hardware specifications for all electable nodes deployed in the region. Electable nodes can become the primary and can enable local reads. If you don't specify this option, ``MongoDB`` Cloud deploys no electable nodes to the region.
     - false

   * -  ``priority``
     - integer
     - Precedence is given to this region when a primary election occurs. If your ``regionConfigs`` has only ``readOnlySpecs``, ``analyticsSpecs``, or both, set this value to ``0``. If you have multiple ``regionConfigs`` objects (your cluster is multi-region or multi-cloud), they must have priorities in descending order. The highest ``priority`` is ``7``.
       **Example:** If you have three regions, their priorities would be ``7``, ``6``, and ``5`` respectively. If you added two more regions for supporting electable nodes, the priorities of those regions would be ``4`` and ``3`` respectively.
     - false

   * -  ``providerName``
     - string
     - Cloud service provider on which ``MongoDB`` Cloud provisions the hosts. Set dedicated clusters to ``AWS``, ``GCP``, ``AZURE`` or ``TENANT``.
     - false

   * -  ``readOnlySpecs``
     - object
     - The current hardware specifications for read only nodes in the region.
     - false

   * -  ``regionName``
     - string
     - Physical location of your ``MongoDB`` cluster nodes. The region you choose can affect network latency for clients accessing your databases. The region name is only returned in the response for single-region clusters. When ``MongoDB`` Cloud deploys a dedicated cluster, it checks if a ``VPC`` or ``VPC`` connection exists for that provider and region. If not, ``MongoDB`` Cloud creates them as part of the deployment. It assigns the ``VPC`` a Classless Inter-Domain Routing (``CIDR``) block. To limit a new ``VPC`` peering connection to one Classless Inter-Domain Routing (``CIDR``) block and region, create the connection first. Deploy the cluster after the connection starts. ``GCP`` Clusters and Multi-region clusters require one ``VPC`` peering connection for each region. ``MongoDB`` nodes can use only the peering connection that resides in the same region as the nodes to communicate with the peered ``VPC``.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs-regionconfigs-analyticsautoscaling: 

Cluster.spec.v20250312.entry.replicationSpecs.regionConfigs.analyticsAutoScaling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Options that determine how this cluster handles resource scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``compute``
     - object
     - Options that determine how this cluster handles ``CPU`` scaling.
     - false

   * -  ``diskGB``
     - object
     - Setting that enables disk auto-scaling.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs-regionconfigs-analyticsautoscaling-compute: 

Cluster.spec.v20250312.entry.replicationSpecs.regionConfigs.analyticsAutoScaling.compute
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Options that determine how this cluster handles CPU scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether instance size reactive auto-scaling is enabled.

       - Set to ``true`` to enable instance size reactive auto-scaling. If enabled, you must specify a value for ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.maxInstanceSize``.
       - Set to ``false`` to disable instance size reactive auto-scaling.
     - false

   * -  ``maxInstanceSize``
     - string
     - Instance size boundary to which your cluster can automatically scale.
     - false

   * -  ``minInstanceSize``
     - string
     - Instance size boundary to which your cluster can automatically scale.
     - false

   * -  ``scaleDownEnabled``
     - boolean
     - Flag that indicates whether the instance size may scale down via reactive auto-scaling. ``MongoDB`` Cloud requires this parameter if ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.enabled`` is ``true``. If you enable this option, specify a value for ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.minInstanceSize``.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs-regionconfigs-analyticsautoscaling-diskgb: 

Cluster.spec.v20250312.entry.replicationSpecs.regionConfigs.analyticsAutoScaling.diskGB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Setting that enables disk auto-scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether this cluster enables disk auto-scaling. The maximum memory allowed for the selected cluster tier and the oplog size can limit storage auto-scaling.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs-regionconfigs-analyticsspecs: 

Cluster.spec.v20250312.entry.replicationSpecs.regionConfigs.analyticsSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The current hardware specifications for read only nodes in the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Target throughput desired for storage attached to your Azure-provisioned cluster. Change this parameter if you:

       - set ``replicationSpecs[n].regionConfigs[m].providerName`` : ``Azure``.
       - set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M40`` or greater not including ``Mxx_NVME`` tiers.

       The maximum input/output operations per second (``IOPS``) depend on the selected ``.instanceSize`` and ``.diskSizeGB``.
       This parameter defaults to the cluster tier's standard ``IOPS`` value.
       Changing this value impacts cluster cost.
     - false

   * -  ``diskSizeGB``
     - number
     - Storage capacity of instance data volumes expressed in gigabytes. Increase this number to add capacity.
       This value must be equal for all shards and node types.
       This value is not configurable on ``M0``/``M2``/``M5`` clusters.
       ``MongoDB`` Cloud requires this parameter if you set ``replicationSpecs``.
       If you specify a disk size below the minimum (10 ``GB``), this parameter defaults to the minimum disk size value.
       Storage charge calculations depend on whether you choose the default value or a custom value.
       The maximum value for disk storage cannot exceed 50 times the maximum ``RAM`` for the selected cluster. If you require more storage space, consider upgrading your cluster to a higher tier.
     - false

   * -  ``diskThroughput``
     - integer
     - Target throughput desired for storage attached to this hardware. Only returned for Gen 2 instance sizes with Standard (``GP3``) volume type.
     - false

   * -  ``ebsVolumeType``
     - string
     - Type of storage you want to attach to your ``AWS``-provisioned cluster.

       - ``STANDARD`` volume types can't exceed the default input/output operations per second (``IOPS``) rate for the selected volume size.

       - ``PROVISIONED`` volume types must fall within the allowable ``IOPS`` range for the selected volume size. You must set this value to (``PROVISIONED``) for NVMe clusters.
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instance sizes in this region in this shard. Each instance size has a default storage and memory capacity. Electable nodes and read-only nodes (known as "base nodes") within a single shard must use the same instance size. Analytics nodes can scale independently from base nodes within a shard. Both base nodes and analytics nodes can scale independently from their equivalents in other shards.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs-regionconfigs-autoscaling: 

Cluster.spec.v20250312.entry.replicationSpecs.regionConfigs.autoScaling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Options that determine how this cluster handles resource scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``compute``
     - object
     - Options that determine how this cluster handles ``CPU`` scaling.
     - false

   * -  ``diskGB``
     - object
     - Setting that enables disk auto-scaling.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs-regionconfigs-autoscaling-compute: 

Cluster.spec.v20250312.entry.replicationSpecs.regionConfigs.autoScaling.compute
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Options that determine how this cluster handles CPU scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether instance size reactive auto-scaling is enabled.

       - Set to ``true`` to enable instance size reactive auto-scaling. If enabled, you must specify a value for ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.maxInstanceSize``.
       - Set to ``false`` to disable instance size reactive auto-scaling.
     - false

   * -  ``maxInstanceSize``
     - string
     - Instance size boundary to which your cluster can automatically scale.
     - false

   * -  ``minInstanceSize``
     - string
     - Instance size boundary to which your cluster can automatically scale.
     - false

   * -  ``scaleDownEnabled``
     - boolean
     - Flag that indicates whether the instance size may scale down via reactive auto-scaling. ``MongoDB`` Cloud requires this parameter if ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.enabled`` is ``true``. If you enable this option, specify a value for ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.minInstanceSize``.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs-regionconfigs-autoscaling-diskgb: 

Cluster.spec.v20250312.entry.replicationSpecs.regionConfigs.autoScaling.diskGB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Setting that enables disk auto-scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether this cluster enables disk auto-scaling. The maximum memory allowed for the selected cluster tier and the oplog size can limit storage auto-scaling.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs-regionconfigs-electablespecs: 

Cluster.spec.v20250312.entry.replicationSpecs.regionConfigs.electableSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Hardware specifications for all electable nodes deployed in the region. Electable nodes can become the primary and can enable local reads. If you don't specify this option, MongoDB Cloud deploys no electable nodes to the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Target throughput desired for storage attached to your Azure-provisioned cluster. Change this parameter if you:

       - set ``replicationSpecs[n].regionConfigs[m].providerName`` : ``Azure``.
       - set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M40`` or greater not including ``Mxx_NVME`` tiers.

       The maximum input/output operations per second (``IOPS``) depend on the selected ``.instanceSize`` and ``.diskSizeGB``.
       This parameter defaults to the cluster tier's standard ``IOPS`` value.
       Changing this value impacts cluster cost.
     - false

   * -  ``diskSizeGB``
     - number
     - Storage capacity of instance data volumes expressed in gigabytes. Increase this number to add capacity.
       This value must be equal for all shards and node types.
       This value is not configurable on ``M0``/``M2``/``M5`` clusters.
       ``MongoDB`` Cloud requires this parameter if you set ``replicationSpecs``.
       If you specify a disk size below the minimum (10 ``GB``), this parameter defaults to the minimum disk size value.
       Storage charge calculations depend on whether you choose the default value or a custom value.
       The maximum value for disk storage cannot exceed 50 times the maximum ``RAM`` for the selected cluster. If you require more storage space, consider upgrading your cluster to a higher tier.
     - false

   * -  ``diskThroughput``
     - integer
     - Target throughput desired for storage attached to this hardware. Only returned for Gen 2 instance sizes with Standard (``GP3``) volume type.
     - false

   * -  ``ebsVolumeType``
     - string
     - Type of storage you want to attach to your ``AWS``-provisioned cluster.

       - ``STANDARD`` volume types can't exceed the default input/output operations per second (``IOPS``) rate for the selected volume size.

       - ``PROVISIONED`` volume types must fall within the allowable ``IOPS`` range for the selected volume size. You must set this value to (``PROVISIONED``) for NVMe clusters.
     - false

   * -  ``effectiveInstanceSize``
     - string
     - The true tenant instance size. This is present to support backwards compatibility for deprecated provider types and/or instance sizes.
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instances in this ``M0``/``M2``/``M5`` tier cluster.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _cluster-spec-v20250312-entry-replicationspecs-regionconfigs-readonlyspecs: 

Cluster.spec.v20250312.entry.replicationSpecs.regionConfigs.readOnlySpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The current hardware specifications for read only nodes in the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Target throughput desired for storage attached to your Azure-provisioned cluster. Change this parameter if you:

       - set ``replicationSpecs[n].regionConfigs[m].providerName`` : ``Azure``.
       - set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M40`` or greater not including ``Mxx_NVME`` tiers.

       The maximum input/output operations per second (``IOPS``) depend on the selected ``.instanceSize`` and ``.diskSizeGB``.
       This parameter defaults to the cluster tier's standard ``IOPS`` value.
       Changing this value impacts cluster cost.
     - false

   * -  ``diskSizeGB``
     - number
     - Storage capacity of instance data volumes expressed in gigabytes. Increase this number to add capacity.
       This value must be equal for all shards and node types.
       This value is not configurable on ``M0``/``M2``/``M5`` clusters.
       ``MongoDB`` Cloud requires this parameter if you set ``replicationSpecs``.
       If you specify a disk size below the minimum (10 ``GB``), this parameter defaults to the minimum disk size value.
       Storage charge calculations depend on whether you choose the default value or a custom value.
       The maximum value for disk storage cannot exceed 50 times the maximum ``RAM`` for the selected cluster. If you require more storage space, consider upgrading your cluster to a higher tier.
     - false

   * -  ``diskThroughput``
     - integer
     - Target throughput desired for storage attached to this hardware. Only returned for Gen 2 instance sizes with Standard (``GP3``) volume type.
     - false

   * -  ``ebsVolumeType``
     - string
     - Type of storage you want to attach to your ``AWS``-provisioned cluster.

       - ``STANDARD`` volume types can't exceed the default input/output operations per second (``IOPS``) rate for the selected volume size.

       - ``PROVISIONED`` volume types must fall within the allowable ``IOPS`` range for the selected volume size. You must set this value to (``PROVISIONED``) for NVMe clusters.
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instance sizes in this region in this shard. Each instance size has a default storage and memory capacity. Electable nodes and read-only nodes (known as "base nodes") within a single shard must use the same instance size. Analytics nodes can scale independently from base nodes within a shard. Both base nodes and analytics nodes can scale independently from their equivalents in other shards.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _cluster-spec-v20250312-entry-tags: 

Cluster.spec.v20250312.entry.tags
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Key-value pair that tags and categorizes a MongoDB Cloud organization, project, or cluster. For example, ``environment : production``.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``key``
     - string
     - Constant that defines the set of the tag. For example, ``environment`` in the ``environment : production`` tag.
     - true

   * -  ``value``
     - string
     - Variable that belongs to the set of the tag. For example, ``production`` in the ``environment : production`` tag.
     - true

.. _cluster-spec-v20250312-groupref: 

Cluster.spec.v20250312.groupRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A reference to a "Group" resource.
The value of "$.status.v20250312.id" will be used to set "groupId".
Mutually exclusive with the "groupId" property.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the "Group" resource.
     - false

.. _cluster-status: 

Cluster.status
~~~~~~~~~~~~~~

Most recently observed read-only status of the cluster for the specified resource version. This data may not be up to date and is populated by the system. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``conditions``
     - []object
     - Represents the latest available observations of a resource's current state.
     - false

   * -  ``v20250312``
     - object
     - The last observed Atlas state of the cluster resource for version v20250312.
     - false

.. _cluster-status-conditions: 

Cluster.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``status``
     - string
     - Status of the condition, one of True, False, Unknown.
     - true

   * -  ``type``
     - string
     - Type of condition.
     - true

   * -  ``lastTransitionTime``
     - string
     - Last time the condition transitioned from one status to another.
       *Format*: date-time
     - false

   * -  ``message``
     - string
     - A human readable ``message`` indicating details about the transition.
     - false

   * -  ``observedGeneration``
     - integer
     - ``observedGeneration`` represents the .metadata.generation that the condition was set based upon.
     - false

   * -  ``reason``
     - string
     - The ``reason`` for the condition's last transition.
     - false

.. _cluster-status-v20250312: 

Cluster.status.v20250312
~~~~~~~~~~~~~~~~~~~~~~~~

The last observed Atlas state of the cluster resource for version v20250312.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``adaptiveCapacity``
     - string
     - Governs adaptive capacity behavior of Azure nodes in single-cloud Azure clusters or multi-cloud clusters that include Azure nodes. Adaptive capacity enables fallback hardware selection when the primary instance family is unavailable. ``ENABLED`` means the cluster explicitly opts in to adaptive capacity. ``DISABLED`` means the cluster explicitly opts out; the cluster receives capacity errors instead of being placed on fallback hardware. ``null`` means the field is unset; Azure clusters use adaptive capacity by default when the feature is enabled at the group level. Setting this field for single-cloud ``AWS`` or ``GCP`` clusters is a no-op.
     - false

   * -  ``advancedConfiguration``
     - object
     - Group of settings that configures a subset of the advanced configuration details.
     - false

   * -  ``configServerManagementMode``
     - string
     - Config Server Management Mode for creating or updating a sharded cluster. When configured as ``ATLAS_MANAGED``, Atlas may automatically switch the cluster's config server type for optimal performance and savings. When configured as ``FIXED_TO_DEDICATED``, the cluster will always use a dedicated config server.
     - false

   * -  ``configServerType``
     - string
     - Describes a sharded cluster's config server type.
     - false

   * -  ``connectionStrings``
     - object
     - Collection of Uniform Resource Locators that point to the ``MongoDB`` database.
     - false

   * -  ``createDate``
     - string
     - Date and time when ``MongoDB`` Cloud created this cluster. This parameter expresses its value in ``ISO`` 8601 format in ``UTC``.
     - false

   * -  ``effectiveReplicationSpecs``
     - []object
     - List of settings that represent the actual cluster state. This is read-only and always returned in the response. It reflects the current cluster configuration, which may differ from ``replicationSpecs`` due to system-managed changes.
     - false

   * -  ``featureCompatibilityVersion``
     - string
     - Feature compatibility version of the cluster. This will always appear regardless of whether ``FCV`` is pinned.
     - false

   * -  ``featureCompatibilityVersionExpirationDate``
     - string
     - Feature compatibility version expiration date. Will only appear if ``FCV`` is pinned. This parameter expresses its value in the ``ISO`` 8601 timestamp format in ``UTC``.
     - false

   * -  ``globalClusterSelfManagedSharding``
     - boolean
     - Set this field to configure the Sharding Management Mode when creating a new Global Cluster.
       When set to false, the management mode is set to Atlas-Managed Sharding. This mode fully manages the sharding of your Global Cluster and is built to provide a seamless deployment experience.
       When set to true, the management mode is set to Self-Managed Sharding. This mode leaves the management of shards in your hands and is built to provide an advanced and flexible deployment experience.
       This setting cannot be changed once the cluster is deployed.
     - false

   * -  ``groupId``
     - string
     - Unique 24-hexadecimal character string that identifies the project.
     - false

   * -  ``id``
     - string
     - Unique 24-hexadecimal digit string that identifies the cluster.
     - false

   * -  ``internalClusterRole``
     - string
     - Internal classification of the cluster's role. Possible values: ``NONE`` (regular user cluster), ``SYSTEM_CLUSTER`` (system cluster for backup), ``INTERNAL_SHADOW_CLUSTER`` (internal use shadow cluster for testing).
     - false

   * -  ``mongoDBEmployeeAccessGrant``
     - object
     - ``MongoDB`` employee granted access level and expiration for a cluster.
     - false

   * -  ``mongoDBVersion``
     - string
     - Version of ``MongoDB`` that the cluster runs.
     - false

   * -  ``redactClientLogData``
     - boolean
     - Enable or disable log redaction.
       This setting configures the ``mongod`` or ``mongos`` to redact any document field contents from a message accompanying a given log event before logging. This prevents the program from writing potentially sensitive data stored on the database to the diagnostic log. Metadata such as error or operation codes, line numbers, and source file names are still visible in the logs.
       Use ``redactClientLogData`` in conjunction with Encryption at Rest and ``TLS``/``SSL`` (Transport Encryption) to assist compliance with regulatory requirements.
       *Note*: changing this setting on a cluster will trigger a rolling restart as soon as the cluster is updated.
     - false

   * -  ``replicaSetScalingStrategy``
     - string
     - Set this field to configure the replica set scaling mode for your cluster.
       By default, Atlas scales under ``WORKLOAD_TYPE``. This mode allows Atlas to scale your analytics nodes in parallel to your operational nodes.
       When configured as ``SEQUENTIAL``, Atlas scales all nodes sequentially. This mode is intended for steady-state workloads and applications performing latency-sensitive secondary reads.
       When configured as ``NODE_TYPE``, Atlas scales your electable nodes in parallel with your read-only and analytics nodes. This mode is intended for large, dynamic workloads requiring frequent and timely cluster tier scaling. This is the fastest scaling strategy, but it might impact latency of workloads when performing extensive secondary reads.
     - false

   * -  ``retainBackups``
     - boolean
     - Flag that indicates whether the cluster retains backups.
     - false

   * -  ``stateName``
     - string
     - Human-readable label that indicates any current activity being taken on this cluster by the Atlas control plane. With the exception of ``CREATING`` and ``DELETING`` states, clusters should always be available and have a Primary node even when in states indicating ongoing activity.

       - ``IDLE``: Atlas is making no changes to this cluster and all changes requested via the ``UI`` or ``API`` can be assumed to have been applied.
       - ``CREATING``: A cluster being provisioned for the very first time returns state ``CREATING`` until it is ready for connections. Ensure ``IP`` Access List and ``DB`` Users are configured before attempting to connect.
       - ``UPDATING``: A change requested via the ``UI``, ``API``, ``AutoScaling``, or other scheduled activity is taking place.
       - ``DELETING``: The cluster is in the process of deletion and will soon be deleted.
       - ``REPAIRING``: One or more nodes in the cluster are being returned to service by the Atlas control plane. Other nodes should continue to provide service as normal.
     - false

.. _cluster-status-v20250312-advancedconfiguration: 

Cluster.status.v20250312.advancedConfiguration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Group of settings that configures a subset of the advanced configuration details.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``customOpensslCipherConfigTls12``
     - []string
     - The custom ``OpenSSL`` cipher suite list for ``TLS`` 1.2. This field is only valid when ``tlsCipherConfigMode`` is set to ``CUSTOM``.
     - false

   * -  ``customOpensslCipherConfigTls13``
     - []string
     - The custom ``OpenSSL`` cipher suite list for ``TLS`` 1.3. This field is only valid when ``tlsCipherConfigMode`` is set to ``CUSTOM``.
     - false

   * -  ``minimumEnabledTlsProtocol``
     - string
     - Minimum Transport Layer Security (``TLS``) version that the cluster accepts for incoming connections. Clusters using ``TLS`` 1.0 or 1.1 should consider setting ``TLS`` 1.2 as the minimum ``TLS`` protocol version.
     - false

   * -  ``tlsCipherConfigMode``
     - string
     - The ``TLS`` cipher suite configuration mode. The default mode uses the default cipher suites. The custom mode allows you to specify custom cipher suites for both ``TLS`` 1.2 and ``TLS`` 1.3.
     - false

.. _cluster-status-v20250312-connectionstrings: 

Cluster.status.v20250312.connectionStrings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Collection of Uniform Resource Locators that point to the MongoDB database.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``awsPrivateLink``
     - map[string]string
     - Private endpoint-aware connection strings that use ``AWS``-hosted clusters with Amazon Web Services (``AWS``) ``PrivateLink``. Each key identifies an Amazon Web Services (``AWS``) interface endpoint. Each value identifies the related ``mongodb://`` connection string that you use to connect to ``MongoDB`` Cloud through the interface endpoint that the key names.
     - false

   * -  ``awsPrivateLinkSrv``
     - map[string]string
     - Private endpoint-aware connection strings that use ``AWS``-hosted clusters with Amazon Web Services (``AWS``) ``PrivateLink``. Each key identifies an Amazon Web Services (``AWS``) interface endpoint. Each value identifies the related ``mongodb://`` connection string that you use to connect to Atlas through the interface endpoint that the key names. If the cluster uses an optimized connection string, ``awsPrivateLinkSrv`` contains the optimized connection string. If the cluster has the non-optimized (legacy) connection string, ``awsPrivateLinkSrv`` contains the non-optimized connection string even if an optimized connection string is also present.
     - false

   * -  ``private``
     - string
     - Network peering connection strings for each interface Virtual Private Cloud (``VPC``) endpoint that you configured to connect to this cluster. This connection string uses the ``mongodb+srv://`` protocol. The resource returns this parameter once someone creates a network peering connection to this cluster. This protocol tells the application to look up the host seed list in the Domain Name System (``DNS``). This list synchronizes with the nodes in a cluster. If the connection string uses this Uniform Resource Identifier (``URI``) format, you don't need to append the seed list or change the ``URI`` if the nodes change. Use this ``URI`` format if your driver supports it. If it doesn't, use ``connectionStrings.private``. For Amazon Web Services (``AWS``) clusters, this resource returns this parameter only if you enable custom ``DNS``.
     - false

   * -  ``privateEndpoint``
     - []object
     - List of private endpoint-aware connection strings that you can use to connect to this cluster through a private endpoint. This parameter returns only if you deployed a private endpoint to all regions to which you deployed this clusters' nodes.
     - false

   * -  ``privateSrv``
     - string
     - Network peering connection strings for each interface Virtual Private Cloud (``VPC``) endpoint that you configured to connect to this cluster. This connection string uses the ``mongodb+srv://`` protocol. The resource returns this parameter when someone creates a network peering connection to this cluster. This protocol tells the application to look up the host seed list in the Domain Name System (``DNS``). This list synchronizes with the nodes in a cluster. If the connection string uses this Uniform Resource Identifier (``URI``) format, you don't need to append the seed list or change the Uniform Resource Identifier (``URI``) if the nodes change. Use this Uniform Resource Identifier (``URI``) format if your driver supports it. If it doesn't, use ``connectionStrings.private``. For Amazon Web Services (``AWS``) clusters, this parameter returns only if you `enable custom DNS <https://docs.atlas.mongodb.com/reference/api/aws-custom-dns-update/>`__.
     - false

   * -  ``standard``
     - string
     - Public connection string that you can use to connect to this cluster. This connection string uses the ``mongodb://`` protocol.
     - false

   * -  ``standardSrv``
     - string
     - Public connection string that you can use to connect to this cluster. This connection string uses the ``mongodb+srv://`` protocol.
     - false

.. _cluster-status-v20250312-connectionstrings-privateendpoint: 

Cluster.status.v20250312.connectionStrings.privateEndpoint
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Private endpoint-aware connection string that you can use to connect to this cluster through a private endpoint.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``connectionString``
     - string
     - Private endpoint-aware connection string that uses the ``mongodb://`` protocol to connect to ``MongoDB`` Cloud through a private endpoint.
     - false

   * -  ``endpoints``
     - []object
     - List that contains the private ``endpoints`` through which you connect to ``MongoDB`` Cloud when you use ``connectionStrings.privateEndpoint[n].connectionString`` or ``connectionStrings.privateEndpoint[n].srvConnectionString``.
     - false

   * -  ``srvConnectionString``
     - string
     - Private endpoint-aware connection string that uses the ``mongodb+srv://`` protocol to connect to ``MongoDB`` Cloud through a private endpoint. The ``mongodb+srv`` protocol tells the driver to look up the seed list of hosts in the Domain Name System (``DNS``). This list synchronizes with the nodes in a cluster. If the connection string uses this Uniform Resource Identifier (``URI``) format, you don't need to append the seed list or change the Uniform Resource Identifier (``URI``) if the nodes change. Use this Uniform Resource Identifier (``URI``) format if your application supports it. If it doesn't, use ``connectionStrings.privateEndpoint[n].connectionString``.
     - false

   * -  ``srvShardOptimizedConnectionString``
     - string
     - Private endpoint-aware connection string optimized for sharded clusters that uses the ``mongodb+srv://`` protocol to connect to ``MongoDB`` Cloud through a private endpoint. If the connection string uses this Uniform Resource Identifier (``URI``) format, you don't need to change the Uniform Resource Identifier (``URI``) if the nodes change. Use this Uniform Resource Identifier (``URI``) format if your application and Atlas cluster supports it. If it doesn't, use and consult the documentation for ``connectionStrings.privateEndpoint[n].srvConnectionString``.
     - false

   * -  ``type``
     - string
     - ``MongoDB`` process ``type`` to which your application connects. Use ``MONGOD`` for replica sets and ``MONGOS`` for sharded clusters.
     - false

.. _cluster-status-v20250312-connectionstrings-privateendpoint-endpoints: 

Cluster.status.v20250312.connectionStrings.privateEndpoint.endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Details of a private endpoint deployed for this cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``endpointId``
     - string
     - Unique string that the cloud provider uses to identify the private endpoint.
     - false

   * -  ``providerName``
     - string
     - Cloud provider in which ``MongoDB`` Cloud deploys the private endpoint.
     - false

   * -  ``region``
     - string
     - Region where the private endpoint is deployed.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs: 

Cluster.status.v20250312.effectiveReplicationSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Details that explain how MongoDB Cloud replicates data on the specified MongoDB database.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``id``
     - string
     - Unique 24-hexadecimal digit string that identifies the replication object for a shard in a Cluster. If you include existing shard replication configurations in the request, you must specify this parameter. If you add a new shard to an existing Cluster, you may specify this parameter. The request deletes any existing shards in the Cluster that you exclude from the request. This corresponds to Shard ``ID`` displayed in the ``UI``.
     - false

   * -  ``regionConfigs``
     - []object
     - Hardware specifications for nodes set for a given region. Each ``regionConfigs`` object must be unique by region and cloud provider within the ``replicationSpec``. Each ``regionConfigs`` object describes the region's priority in elections and the number and type of ``MongoDB`` nodes that ``MongoDB`` Cloud deploys to the region. Each ``regionConfigs`` object must have either an ``analyticsSpecs`` object, ``electableSpecs`` object, or ``readOnlySpecs`` object. Tenant clusters only require ``electableSpecs``. Dedicated clusters can specify any of these specifications, but must have at least one ``electableSpecs`` object within a ``replicationSpec``.
       **Example:**
       If you set ``replicationSpecs[n].regionConfigs[m].analyticsSpecs.instanceSize`` : ``M30``, set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M30`` if you have electable nodes and ``replicationSpecs[n].regionConfigs[m].readOnlySpecs.instanceSize`` : ``M30`` if you have read-only nodes.
     - false

   * -  ``zoneId``
     - string
     - Unique 24-hexadecimal digit string that identifies the zone in a Global Cluster. This value can be used to configure Global Cluster backup policies.
     - false

   * -  ``zoneName``
     - string
     - Human-readable label that describes the zone this shard belongs to in a Global Cluster. Provide this value only if ``clusterType`` : ``GEOSHARDED`` but not ``selfManagedSharding`` : ``true``.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Cloud service provider on which MongoDB Cloud provisions the hosts.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``analyticsAutoScaling``
     - object
     - Options that determine how this cluster handles resource scaling.
     - false

   * -  ``analyticsSpecs``
     - object
     - The current hardware specifications for read only nodes in the region.
     - false

   * -  ``autoScaling``
     - object
     - Options that determine how this cluster handles resource scaling.
     - false

   * -  ``backingProviderName``
     - string
     - Cloud service provider on which ``MongoDB`` Cloud provisioned the multi-tenant cluster. The resource returns this parameter when ``providerName`` is ``TENANT`` and ``electableSpecs.instanceSize`` is ``M0``, ``M2`` or ``M5``.
       Please note that using an ``instanceSize`` of ``M2`` or ``M5`` will create a Flex cluster instead. Support for the ``instanceSize`` of ``M2`` or ``M5`` will be discontinued in January 2026. We recommend using the Create Flex Cluster ``API`` for such configurations moving forward.
     - false

   * -  ``effectiveAnalyticsSpecs``
     - object
     - The current hardware specifications for read only nodes in the region.
     - false

   * -  ``effectiveElectableSpecs``
     - object
     - The current hardware specifications for read only nodes in the region.
     - false

   * -  ``effectiveReadOnlySpecs``
     - object
     - The current hardware specifications for read only nodes in the region.
     - false

   * -  ``electableSpecs``
     - object
     - Hardware specifications for all electable nodes deployed in the region. Electable nodes can become the primary and can enable local reads. If you don't specify this option, ``MongoDB`` Cloud deploys no electable nodes to the region.
     - false

   * -  ``priority``
     - integer
     - Precedence is given to this region when a primary election occurs. If your ``regionConfigs`` has only ``readOnlySpecs``, ``analyticsSpecs``, or both, set this value to ``0``. If you have multiple ``regionConfigs`` objects (your cluster is multi-region or multi-cloud), they must have priorities in descending order. The highest ``priority`` is ``7``.
       **Example:** If you have three regions, their priorities would be ``7``, ``6``, and ``5`` respectively. If you added two more regions for supporting electable nodes, the priorities of those regions would be ``4`` and ``3`` respectively.
     - false

   * -  ``providerName``
     - string
     - Cloud service provider on which ``MongoDB`` Cloud provisions the hosts. Set dedicated clusters to ``AWS``, ``GCP``, ``AZURE`` or ``TENANT``.
     - false

   * -  ``readOnlySpecs``
     - object
     - The current hardware specifications for read only nodes in the region.
     - false

   * -  ``regionName``
     - string
     - Physical location of your ``MongoDB`` cluster nodes. The region you choose can affect network latency for clients accessing your databases. The region name is only returned in the response for single-region clusters. When ``MongoDB`` Cloud deploys a dedicated cluster, it checks if a ``VPC`` or ``VPC`` connection exists for that provider and region. If not, ``MongoDB`` Cloud creates them as part of the deployment. It assigns the ``VPC`` a Classless Inter-Domain Routing (``CIDR``) block. To limit a new ``VPC`` peering connection to one Classless Inter-Domain Routing (``CIDR``) block and region, create the connection first. Deploy the cluster after the connection starts. ``GCP`` Clusters and Multi-region clusters require one ``VPC`` peering connection for each region. ``MongoDB`` nodes can use only the peering connection that resides in the same region as the nodes to communicate with the peered ``VPC``.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-analyticsautoscaling: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.analyticsAutoScaling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Options that determine how this cluster handles resource scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``compute``
     - object
     - Options that determine how this cluster handles ``CPU`` scaling.
     - false

   * -  ``diskGB``
     - object
     - Setting that enables disk auto-scaling.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-analyticsautoscaling-compute: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.analyticsAutoScaling.compute
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Options that determine how this cluster handles CPU scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether instance size reactive auto-scaling is enabled.

       - Set to ``true`` to enable instance size reactive auto-scaling. If enabled, you must specify a value for ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.maxInstanceSize``.
       - Set to ``false`` to disable instance size reactive auto-scaling.
     - false

   * -  ``maxInstanceSize``
     - string
     - Instance size boundary to which your cluster can automatically scale.
     - false

   * -  ``minInstanceSize``
     - string
     - Instance size boundary to which your cluster can automatically scale.
     - false

   * -  ``scaleDownEnabled``
     - boolean
     - Flag that indicates whether the instance size may scale down via reactive auto-scaling. ``MongoDB`` Cloud requires this parameter if ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.enabled`` is ``true``. If you enable this option, specify a value for ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.minInstanceSize``.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-analyticsautoscaling-diskgb: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.analyticsAutoScaling.diskGB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Setting that enables disk auto-scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether this cluster enables disk auto-scaling. The maximum memory allowed for the selected cluster tier and the oplog size can limit storage auto-scaling.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-analyticsspecs: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.analyticsSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The current hardware specifications for read only nodes in the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Target throughput desired for storage attached to your Azure-provisioned cluster. Change this parameter if you:

       - set ``replicationSpecs[n].regionConfigs[m].providerName`` : ``Azure``.
       - set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M40`` or greater not including ``Mxx_NVME`` tiers.

       The maximum input/output operations per second (``IOPS``) depend on the selected ``.instanceSize`` and ``.diskSizeGB``.
       This parameter defaults to the cluster tier's standard ``IOPS`` value.
       Changing this value impacts cluster cost.
     - false

   * -  ``diskSizeGB``
     - number
     - Storage capacity of instance data volumes expressed in gigabytes. Increase this number to add capacity.
       This value must be equal for all shards and node types.
       This value is not configurable on ``M0``/``M2``/``M5`` clusters.
       ``MongoDB`` Cloud requires this parameter if you set ``replicationSpecs``.
       If you specify a disk size below the minimum (10 ``GB``), this parameter defaults to the minimum disk size value.
       Storage charge calculations depend on whether you choose the default value or a custom value.
       The maximum value for disk storage cannot exceed 50 times the maximum ``RAM`` for the selected cluster. If you require more storage space, consider upgrading your cluster to a higher tier.
     - false

   * -  ``diskThroughput``
     - integer
     - Target throughput desired for storage attached to this hardware. Only returned for Gen 2 instance sizes with Standard (``GP3``) volume type.
     - false

   * -  ``ebsVolumeType``
     - string
     - Type of storage you want to attach to your ``AWS``-provisioned cluster.

       - ``STANDARD`` volume types can't exceed the default input/output operations per second (``IOPS``) rate for the selected volume size.

       - ``PROVISIONED`` volume types must fall within the allowable ``IOPS`` range for the selected volume size. You must set this value to (``PROVISIONED``) for NVMe clusters.
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instance sizes in this region in this shard. Each instance size has a default storage and memory capacity. Electable nodes and read-only nodes (known as "base nodes") within a single shard must use the same instance size. Analytics nodes can scale independently from base nodes within a shard. Both base nodes and analytics nodes can scale independently from their equivalents in other shards.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-autoscaling: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.autoScaling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Options that determine how this cluster handles resource scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``compute``
     - object
     - Options that determine how this cluster handles ``CPU`` scaling.
     - false

   * -  ``diskGB``
     - object
     - Setting that enables disk auto-scaling.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-autoscaling-compute: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.autoScaling.compute
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Options that determine how this cluster handles CPU scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether instance size reactive auto-scaling is enabled.

       - Set to ``true`` to enable instance size reactive auto-scaling. If enabled, you must specify a value for ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.maxInstanceSize``.
       - Set to ``false`` to disable instance size reactive auto-scaling.
     - false

   * -  ``maxInstanceSize``
     - string
     - Instance size boundary to which your cluster can automatically scale.
     - false

   * -  ``minInstanceSize``
     - string
     - Instance size boundary to which your cluster can automatically scale.
     - false

   * -  ``scaleDownEnabled``
     - boolean
     - Flag that indicates whether the instance size may scale down via reactive auto-scaling. ``MongoDB`` Cloud requires this parameter if ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.enabled`` is ``true``. If you enable this option, specify a value for ``replicationSpecs[n].regionConfigs[m].autoScaling.compute.minInstanceSize``.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-autoscaling-diskgb: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.autoScaling.diskGB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Setting that enables disk auto-scaling.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether this cluster enables disk auto-scaling. The maximum memory allowed for the selected cluster tier and the oplog size can limit storage auto-scaling.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-effectiveanalyticsspecs: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.effectiveAnalyticsSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The current hardware specifications for read only nodes in the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Target throughput desired for storage attached to your Azure-provisioned cluster. Change this parameter if you:

       - set ``replicationSpecs[n].regionConfigs[m].providerName`` : ``Azure``.
       - set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M40`` or greater not including ``Mxx_NVME`` tiers.

       The maximum input/output operations per second (``IOPS``) depend on the selected ``.instanceSize`` and ``.diskSizeGB``.
       This parameter defaults to the cluster tier's standard ``IOPS`` value.
       Changing this value impacts cluster cost.
     - false

   * -  ``diskSizeGB``
     - number
     - Storage capacity of instance data volumes expressed in gigabytes. Increase this number to add capacity.
       This value must be equal for all shards and node types.
       This value is not configurable on ``M0``/``M2``/``M5`` clusters.
       ``MongoDB`` Cloud requires this parameter if you set ``replicationSpecs``.
       If you specify a disk size below the minimum (10 ``GB``), this parameter defaults to the minimum disk size value.
       Storage charge calculations depend on whether you choose the default value or a custom value.
       The maximum value for disk storage cannot exceed 50 times the maximum ``RAM`` for the selected cluster. If you require more storage space, consider upgrading your cluster to a higher tier.
     - false

   * -  ``diskThroughput``
     - integer
     - Target throughput desired for storage attached to this hardware. Only returned for Gen 2 instance sizes with Standard (``GP3``) volume type.
     - false

   * -  ``ebsVolumeType``
     - string
     - Type of storage you want to attach to your ``AWS``-provisioned cluster.

       - ``STANDARD`` volume types can't exceed the default input/output operations per second (``IOPS``) rate for the selected volume size.

       - ``PROVISIONED`` volume types must fall within the allowable ``IOPS`` range for the selected volume size. You must set this value to (``PROVISIONED``) for NVMe clusters.
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instance sizes in this region in this shard. Each instance size has a default storage and memory capacity. Electable nodes and read-only nodes (known as "base nodes") within a single shard must use the same instance size. Analytics nodes can scale independently from base nodes within a shard. Both base nodes and analytics nodes can scale independently from their equivalents in other shards.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-effectiveelectablespecs: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.effectiveElectableSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The current hardware specifications for read only nodes in the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Target throughput desired for storage attached to your Azure-provisioned cluster. Change this parameter if you:

       - set ``replicationSpecs[n].regionConfigs[m].providerName`` : ``Azure``.
       - set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M40`` or greater not including ``Mxx_NVME`` tiers.

       The maximum input/output operations per second (``IOPS``) depend on the selected ``.instanceSize`` and ``.diskSizeGB``.
       This parameter defaults to the cluster tier's standard ``IOPS`` value.
       Changing this value impacts cluster cost.
     - false

   * -  ``diskSizeGB``
     - number
     - Storage capacity of instance data volumes expressed in gigabytes. Increase this number to add capacity.
       This value must be equal for all shards and node types.
       This value is not configurable on ``M0``/``M2``/``M5`` clusters.
       ``MongoDB`` Cloud requires this parameter if you set ``replicationSpecs``.
       If you specify a disk size below the minimum (10 ``GB``), this parameter defaults to the minimum disk size value.
       Storage charge calculations depend on whether you choose the default value or a custom value.
       The maximum value for disk storage cannot exceed 50 times the maximum ``RAM`` for the selected cluster. If you require more storage space, consider upgrading your cluster to a higher tier.
     - false

   * -  ``diskThroughput``
     - integer
     - Target throughput desired for storage attached to this hardware. Only returned for Gen 2 instance sizes with Standard (``GP3``) volume type.
     - false

   * -  ``ebsVolumeType``
     - string
     - Type of storage you want to attach to your ``AWS``-provisioned cluster.

       - ``STANDARD`` volume types can't exceed the default input/output operations per second (``IOPS``) rate for the selected volume size.

       - ``PROVISIONED`` volume types must fall within the allowable ``IOPS`` range for the selected volume size. You must set this value to (``PROVISIONED``) for NVMe clusters.
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instance sizes in this region in this shard. Each instance size has a default storage and memory capacity. Electable nodes and read-only nodes (known as "base nodes") within a single shard must use the same instance size. Analytics nodes can scale independently from base nodes within a shard. Both base nodes and analytics nodes can scale independently from their equivalents in other shards.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-effectivereadonlyspecs: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.effectiveReadOnlySpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The current hardware specifications for read only nodes in the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Target throughput desired for storage attached to your Azure-provisioned cluster. Change this parameter if you:

       - set ``replicationSpecs[n].regionConfigs[m].providerName`` : ``Azure``.
       - set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M40`` or greater not including ``Mxx_NVME`` tiers.

       The maximum input/output operations per second (``IOPS``) depend on the selected ``.instanceSize`` and ``.diskSizeGB``.
       This parameter defaults to the cluster tier's standard ``IOPS`` value.
       Changing this value impacts cluster cost.
     - false

   * -  ``diskSizeGB``
     - number
     - Storage capacity of instance data volumes expressed in gigabytes. Increase this number to add capacity.
       This value must be equal for all shards and node types.
       This value is not configurable on ``M0``/``M2``/``M5`` clusters.
       ``MongoDB`` Cloud requires this parameter if you set ``replicationSpecs``.
       If you specify a disk size below the minimum (10 ``GB``), this parameter defaults to the minimum disk size value.
       Storage charge calculations depend on whether you choose the default value or a custom value.
       The maximum value for disk storage cannot exceed 50 times the maximum ``RAM`` for the selected cluster. If you require more storage space, consider upgrading your cluster to a higher tier.
     - false

   * -  ``diskThroughput``
     - integer
     - Target throughput desired for storage attached to this hardware. Only returned for Gen 2 instance sizes with Standard (``GP3``) volume type.
     - false

   * -  ``ebsVolumeType``
     - string
     - Type of storage you want to attach to your ``AWS``-provisioned cluster.

       - ``STANDARD`` volume types can't exceed the default input/output operations per second (``IOPS``) rate for the selected volume size.

       - ``PROVISIONED`` volume types must fall within the allowable ``IOPS`` range for the selected volume size. You must set this value to (``PROVISIONED``) for NVMe clusters.
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instance sizes in this region in this shard. Each instance size has a default storage and memory capacity. Electable nodes and read-only nodes (known as "base nodes") within a single shard must use the same instance size. Analytics nodes can scale independently from base nodes within a shard. Both base nodes and analytics nodes can scale independently from their equivalents in other shards.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-electablespecs: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.electableSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Hardware specifications for all electable nodes deployed in the region. Electable nodes can become the primary and can enable local reads. If you don't specify this option, MongoDB Cloud deploys no electable nodes to the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Target throughput desired for storage attached to your Azure-provisioned cluster. Change this parameter if you:

       - set ``replicationSpecs[n].regionConfigs[m].providerName`` : ``Azure``.
       - set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M40`` or greater not including ``Mxx_NVME`` tiers.

       The maximum input/output operations per second (``IOPS``) depend on the selected ``.instanceSize`` and ``.diskSizeGB``.
       This parameter defaults to the cluster tier's standard ``IOPS`` value.
       Changing this value impacts cluster cost.
     - false

   * -  ``diskSizeGB``
     - number
     - Storage capacity of instance data volumes expressed in gigabytes. Increase this number to add capacity.
       This value must be equal for all shards and node types.
       This value is not configurable on ``M0``/``M2``/``M5`` clusters.
       ``MongoDB`` Cloud requires this parameter if you set ``replicationSpecs``.
       If you specify a disk size below the minimum (10 ``GB``), this parameter defaults to the minimum disk size value.
       Storage charge calculations depend on whether you choose the default value or a custom value.
       The maximum value for disk storage cannot exceed 50 times the maximum ``RAM`` for the selected cluster. If you require more storage space, consider upgrading your cluster to a higher tier.
     - false

   * -  ``diskThroughput``
     - integer
     - Target throughput desired for storage attached to this hardware. Only returned for Gen 2 instance sizes with Standard (``GP3``) volume type.
     - false

   * -  ``ebsVolumeType``
     - string
     - Type of storage you want to attach to your ``AWS``-provisioned cluster.

       - ``STANDARD`` volume types can't exceed the default input/output operations per second (``IOPS``) rate for the selected volume size.

       - ``PROVISIONED`` volume types must fall within the allowable ``IOPS`` range for the selected volume size. You must set this value to (``PROVISIONED``) for NVMe clusters.
     - false

   * -  ``effectiveInstanceSize``
     - string
     - The true tenant instance size. This is present to support backwards compatibility for deprecated provider types and/or instance sizes.
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instances in this ``M0``/``M2``/``M5`` tier cluster.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _cluster-status-v20250312-effectivereplicationspecs-regionconfigs-readonlyspecs: 

Cluster.status.v20250312.effectiveReplicationSpecs.regionConfigs.readOnlySpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The current hardware specifications for read only nodes in the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Target throughput desired for storage attached to your Azure-provisioned cluster. Change this parameter if you:

       - set ``replicationSpecs[n].regionConfigs[m].providerName`` : ``Azure``.
       - set ``replicationSpecs[n].regionConfigs[m].electableSpecs.instanceSize`` : ``M40`` or greater not including ``Mxx_NVME`` tiers.

       The maximum input/output operations per second (``IOPS``) depend on the selected ``.instanceSize`` and ``.diskSizeGB``.
       This parameter defaults to the cluster tier's standard ``IOPS`` value.
       Changing this value impacts cluster cost.
     - false

   * -  ``diskSizeGB``
     - number
     - Storage capacity of instance data volumes expressed in gigabytes. Increase this number to add capacity.
       This value must be equal for all shards and node types.
       This value is not configurable on ``M0``/``M2``/``M5`` clusters.
       ``MongoDB`` Cloud requires this parameter if you set ``replicationSpecs``.
       If you specify a disk size below the minimum (10 ``GB``), this parameter defaults to the minimum disk size value.
       Storage charge calculations depend on whether you choose the default value or a custom value.
       The maximum value for disk storage cannot exceed 50 times the maximum ``RAM`` for the selected cluster. If you require more storage space, consider upgrading your cluster to a higher tier.
     - false

   * -  ``diskThroughput``
     - integer
     - Target throughput desired for storage attached to this hardware. Only returned for Gen 2 instance sizes with Standard (``GP3``) volume type.
     - false

   * -  ``ebsVolumeType``
     - string
     - Type of storage you want to attach to your ``AWS``-provisioned cluster.

       - ``STANDARD`` volume types can't exceed the default input/output operations per second (``IOPS``) rate for the selected volume size.

       - ``PROVISIONED`` volume types must fall within the allowable ``IOPS`` range for the selected volume size. You must set this value to (``PROVISIONED``) for NVMe clusters.
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instance sizes in this region in this shard. Each instance size has a default storage and memory capacity. Electable nodes and read-only nodes (known as "base nodes") within a single shard must use the same instance size. Analytics nodes can scale independently from base nodes within a shard. Both base nodes and analytics nodes can scale independently from their equivalents in other shards.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _cluster-status-v20250312-mongodbemployeeaccessgrant: 

Cluster.status.v20250312.mongoDBEmployeeAccessGrant
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

MongoDB employee granted access level and expiration for a cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``expirationTime``
     - string
     - Expiration date for the employee access grant. This parameter expresses its value in the ``ISO`` 8601 timestamp format in ``UTC``.
     - true

   * -  ``grantType``
     - string
     - Level of access to grant to ``MongoDB`` Employees.
     - true

   * -  ``links``
     - []object
     - List of one or more Uniform Resource Locators (URLs) that point to ``API`` sub-resources, related ``API`` resources, or both. ``RFC`` 5988 outlines these relationships.
     - false

.. _cluster-status-v20250312-mongodbemployeeaccessgrant-links: 

Cluster.status.v20250312.mongoDBEmployeeAccessGrant.links
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``href``
     - string
     - Uniform Resource Locator (``URL``) that points another ``API`` resource to which this response has some relationship. This ``URL`` often begins with ``https://cloud.mongodb.com/api/atlas``.
     - false

   * -  ``rel``
     - string
     - Uniform Resource Locator (``URL``) that defines the semantic relationship between this resource and another ``API`` resource. This ``URL`` often begins with ``https://cloud.mongodb.com/api/atlas``.
     - false
