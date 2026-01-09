.. _atlasdeployment: 

AtlasDeployment
---------------

AtlasDeployment is the Schema for the atlasdeployments API

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``apiVersion``
     - string
     - atlas.mongodb.com/v1
     - true

   * -  ``kind``
     - string
     - ``AtlasDeployment``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasDeploymentSpec`` defines the target state of ``AtlasDeployment``.
       Only one of ``DeploymentSpec``, ``AdvancedDeploymentSpec`` and ``ServerlessSpec`` should be defined.
       *Validations*:

       - (has(self.``externalProjectRef``) && !has(self.``projectRef``)) || (!has(self.``externalProjectRef``) && has(self.``projectRef``)): must define only one project reference through ``externalProjectRef`` or ``projectRef``

       - (has(self.``externalProjectRef``) && has(self.``connectionSecret``)) || !has(self.``externalProjectRef``): must define a local connection secret when referencing an external project

       - !has(self.``serverlessSpec``) || (``oldSelf``.``hasValue``() && ``oldSelf``.value().``serverlessSpec`` != null): ``serverlessSpec`` cannot be added - serverless instances are deprecated
     - false

   * -  ``status``
     - object
     - ``AtlasDeploymentStatus`` defines the observed state of ``AtlasDeployment``.
     - false

.. _atlasdeployment-spec: 

AtlasDeployment.spec
~~~~~~~~~~~~~~~~~~~~

AtlasDeploymentSpec defines the target state of AtlasDeployment.
Only one of DeploymentSpec, AdvancedDeploymentSpec and ServerlessSpec should be defined.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``backupRef``
     - object
     - Reference to the backup schedule for the ``AtlasDeployment``.
     - false

   * -  ``connectionSecret``
     - object
     - Name of the secret containing Atlas ``API`` private and public keys.
     - false

   * -  ``deploymentSpec``
     - object
     - Configuration for the advanced (v1.5) deployment ``API`` https://www.mongodb.com/docs/atlas/reference/api/clusters/
     - false

   * -  ``externalProjectRef``
     - object
     - ``externalProjectRef`` holds the parent Atlas project ``ID``.
       Mutually exclusive with the "``projectRef``" field.
     - false

   * -  ``flexSpec``
     - object
     - Configuration for the Flex cluster ``API``. https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Flex-Clusters
     - false

   * -  ``processArgs``
     - object
     - ``ProcessArgs`` allows modification of Advanced Configuration Options.
     - false

   * -  ``projectRef``
     - object
     - ``projectRef`` is a reference to the parent ``AtlasProject`` resource.
       Mutually exclusive with the "``externalProjectRef``" field.
     - false

   * -  ``serverlessSpec``
     - object
     - Configuration for the serverless deployment ``API``. https://www.mongodb.com/docs/atlas/reference/api/serverless-instances/
       ``DEPRECATED``: Serverless instances are deprecated. See https://dochub.mongodb.org/core/atlas-flex-migration for details.
     - false

   * -  ``upgradeToDedicated``
     - boolean
     - ``upgradeToDedicated``, when set to true, triggers the migration from a Flex to a
       Dedicated cluster. The user ``MUST`` provide the new dedicated cluster configuration.
       This flag is ignored if the cluster is already dedicated.
     - false

.. _atlasdeployment-spec-backupref: 

AtlasDeployment.spec.backupRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to the backup schedule for the AtlasDeployment.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the Kubernetes Resource
     - true

   * -  ``namespace``
     - string
     - Namespace of the Kubernetes Resource
     - false

.. _atlasdeployment-spec-connectionsecret: 

AtlasDeployment.spec.connectionSecret
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Name of the secret containing Atlas API private and public keys.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the resource being referred to
       More info: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/#names
     - true

.. _atlasdeployment-spec-deploymentspec: 

AtlasDeployment.spec.deploymentSpec
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configuration for the advanced (v1.5) deployment API https://www.mongodb.com/docs/atlas/reference/api/clusters/

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the advanced deployment as it appears in Atlas.
       After Atlas creates the deployment, you can't change its name.
       Can only contain ``ASCII`` letters, numbers, and hyphens.
       *Validations*:

       - self == ``oldSelf``: Name cannot be modified after deployment creation
     - true

   * -  ``backupEnabled``
     - boolean
     - Flag that indicates if the deployment uses Cloud Backups for backups.
       Applicable only for ``M10``+ deployments.
     - false

   * -  ``biConnector``
     - object
     - Configuration of ``BI`` Connector for Atlas on this deployment.
       The ``MongoDB`` Connector for Business Intelligence for Atlas (``BI`` Connector) is only available for ``M10`` and larger deployments.
     - false

   * -  ``clusterType``
     - enum
     - Type of the deployment that you want to create.
       The parameter is required if ``replicationSpecs`` are set or if Global Deployments are deployed.
       *Enum*: ``REPLICASET``, ``SHARDED``, ``GEOSHARDED``
     - false

   * -  ``configServerManagementMode``
     - enum
     - Config Server Management Mode for creating or updating a sharded cluster.
       *Enum*: ``ATLAS_MANAGED``, ``FIXED_TO_DEDICATED``
     - false

   * -  ``customZoneMapping``
     - []object
     - List that contains Global Cluster parameters that map zones to geographic regions.
     - false

   * -  ``diskSizeGB``
     - integer
     - Capacity, in gigabytes, of the host's root volume.
       Increase this number to add capacity, up to a maximum possible value of 4096 (i.e., 4 ``TB``).
       This value must be a positive integer.
       The parameter is required if ``replicationSpecs`` are configured.
       *Minimum*: 0
       *Maximum*: 4096
     - false

   * -  ``encryptionAtRestProvider``
     - enum
     - Cloud service provider that offers Encryption at Rest.
       *Enum*: ``AWS``, ``GCP``, ``AZURE``, ``NONE``
     - false

   * -  ``labels``
     - []object
     - Collection of key-value pairs that tag and categorize the deployment.
       Each key and value has a maximum length of 255 characters.
       ``DEPRECATED``: Cluster ``labels`` are deprecated and will be removed in a future release. We strongly recommend that you use Resource Tags instead.
     - false

   * -  ``managedNamespaces``
     - []object
     - List that contains information to create a managed namespace in a specified Global Cluster to create.
     - false

   * -  ``mongoDBMajorVersion``
     - string
     - ``MongoDB`` major version of the cluster. Set to the binary major version.
     - false

   * -  ``mongoDBVersion``
     - string
     - Version of ``MongoDB`` that the cluster runs.
     - false

   * -  ``paused``
     - boolean
     - Flag that indicates whether the deployment should be paused.
     - false

   * -  ``pitEnabled``
     - boolean
     - Flag that indicates the deployment uses continuous cloud backups.
     - false

   * -  ``replicationSpecs``
     - []object
     - Configuration for deployment regions.
     - false

   * -  ``rootCertType``
     - string
     - Root Certificate Authority that ``MongoDB`` Atlas cluster uses.
     - false

   * -  ``searchIndexes``
     - []object
     - An array of ``SearchIndex`` objects with fields that describe the search index.
     - false

   * -  ``searchNodes``
     - []object
     - Settings for Search Nodes for the cluster. Currently, at most one search node configuration may be defined.
     - false

   * -  ``tags``
     - []object
     - Key-value pairs for resource tagging.
     - false

   * -  ``terminationProtectionEnabled``
     - boolean
     - Flag that indicates whether termination protection is enabled on the cluster. If set to true, ``MongoDB`` Cloud won't delete the cluster. If set to false, ``MongoDB`` Cloud will delete the cluster.
       *Default*: false
     - false

   * -  ``versionReleaseSystem``
     - string
     - Method by which the cluster maintains the ``MongoDB`` versions.
       If value is ``CONTINUOUS``, you must not specify ``mongoDBMajorVersion``.
     - false

.. _atlasdeployment-spec-deploymentspec-biconnector: 

AtlasDeployment.spec.deploymentSpec.biConnector
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configuration of BI Connector for Atlas on this deployment.
The MongoDB Connector for Business Intelligence for Atlas (BI Connector) is only available for M10 and larger deployments.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether the Business Intelligence Connector for Atlas is ``enabled`` on the deployment.
     - false

   * -  ``readPreference``
     - string
     - Source from which the ``BI`` Connector for Atlas reads data. Each ``BI`` Connector for Atlas read preference contains a distinct combination of ``readPreference`` and ``readPreferenceTags`` options.
     - false

.. _atlasdeployment-spec-deploymentspec-customzonemapping: 

AtlasDeployment.spec.deploymentSpec.customZoneMapping
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``location``
     - string
     - Code that represents a ``location`` that maps to a zone in your global cluster.
       ``MongoDB`` Atlas represents this ``location`` with a ``ISO`` 3166-2 ``location`` and subdivision codes when possible.
     - true

   * -  ``zone``
     - string
     - Human-readable label that identifies the ``zone`` in your global cluster. This ``zone`` maps to a location code.
     - true

.. _atlasdeployment-spec-deploymentspec-labels: 

AtlasDeployment.spec.deploymentSpec.labels
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

LabelSpec contains key-value pairs that tag and categorize the Cluster/DBUser

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
     - true

   * -  ``value``
     - string
     - Value set to the Key applied to tag and categorize this component.
     - true

.. _atlasdeployment-spec-deploymentspec-managednamespaces: 

AtlasDeployment.spec.deploymentSpec.managedNamespaces
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ManagedNamespace represents the information about managed namespace configuration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``collection``
     - string
     - Human-readable label of the ``collection`` to manage for this Global Cluster.
     - true

   * -  ``db``
     - string
     - Human-readable label of the database to manage for this Global Cluster.
     - true

   * -  ``customShardKey``
     - string
     - Database parameter used to divide the collection into shards. Global clusters require a compound shard key.
       This compound shard key combines the location parameter and the user-selected custom key.
     - false

   * -  ``isCustomShardKeyHashed``
     - boolean
     - Flag that indicates whether someone hashed the custom shard key for the specified collection.
       If you set this value to false, ``MongoDB`` Cloud uses ranged sharding.
     - false

   * -  ``isShardKeyUnique``
     - boolean
     - Flag that indicates whether someone hashed the custom shard key.
       If this parameter returns false, this cluster uses ranged sharding.
     - false

   * -  ``numInitialChunks``
     - integer
     - Minimum number of chunks to create initially when sharding an empty collection with a hashed shard key.
       Maximum value is 8192.
     - false

   * -  ``presplitHashedZones``
     - boolean
     - Flag that indicates whether ``MongoDB`` Cloud should create and distribute initial chunks for an empty or non-existing collection.
       ``MongoDB`` Cloud distributes data based on the defined zones and zone ranges for the collection.
     - false

.. _atlasdeployment-spec-deploymentspec-replicationspecs: 

AtlasDeployment.spec.deploymentSpec.replicationSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``numShards``
     - integer
     - Positive integer that specifies the number of shards to deploy in each specified zone.
       If you set this value to 1 and ``clusterType`` is ``SHARDED``, ``MongoDB`` Cloud deploys a single-shard sharded cluster.
       Don't create a sharded cluster with a single shard for production environments.
       Single-shard sharded clusters don't provide the same benefits as multi-shard configurations
     - false

   * -  ``regionConfigs``
     - []object
     - Hardware specifications for nodes set for a given region.
       Each ``regionConfigs`` object describes the region's priority in elections and the number and type of ``MongoDB`` nodes that ``MongoDB`` Cloud deploys to the region.
       Each ``regionConfigs`` object must have either an ``analyticsSpecs`` object, ``electableSpecs`` object, or ``readOnlySpecs`` object.
       Tenant clusters only require ``electableSpecs``. Dedicated clusters can specify any of these specifications, but must have at least one ``electableSpecs`` object within a ``replicationSpec``.
       Every hardware specification must use the same ``instanceSize``.
     - false

   * -  ``zoneName``
     - string
     - Human-readable label that identifies the zone in a Global Cluster.
     - false

.. _atlasdeployment-spec-deploymentspec-replicationspecs-regionconfigs: 

AtlasDeployment.spec.deploymentSpec.replicationSpecs.regionConfigs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``analyticsSpecs``
     - object
     - Hardware specifications for analytics nodes deployed in the region.
     - false

   * -  ``autoScaling``
     - object
     - Options that determine how this cluster handles resource scaling.
     - false

   * -  ``backingProviderName``
     - enum
     - Cloud service provider on which the host for a multi-tenant deployment is provisioned.
       This setting only works when "``providerName``" : "``TENANT``" and "``providerSetting``.``instanceSizeName``" : ``M2`` or ``M5``.
       Otherwise, it should be equal to the "``providerName``" value.
       *Enum*: ``AWS``, ``GCP``, ``AZURE``
     - false

   * -  ``electableSpecs``
     - object
     - Hardware specifications for nodes deployed in the region.
     - false

   * -  ``priority``
     - integer
     - Precedence is given to this region when a primary election occurs.
       If your ``regionConfigs`` has only ``readOnlySpecs``, ``analyticsSpecs``, or both, set this value to 0.
       If you have multiple ``regionConfigs`` objects (your cluster is multi-region or multi-cloud), they must have priorities in descending order.
       The highest ``priority`` is 7
     - false

   * -  ``providerName``
     - enum
     - *Enum*: ``AWS``, ``GCP``, ``AZURE``, ``TENANT``, ``SERVERLESS``
     - false

   * -  ``readOnlySpecs``
     - object
     - Hardware specifications for read only nodes deployed in the region.
     - false

   * -  ``regionName``
     - string
     - Physical location of your ``MongoDB`` deployment.
       The region you choose can affect network latency for clients accessing your databases.
     - false

.. _atlasdeployment-spec-deploymentspec-replicationspecs-regionconfigs-analyticsspecs: 

AtlasDeployment.spec.deploymentSpec.replicationSpecs.regionConfigs.analyticsSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Hardware specifications for analytics nodes deployed in the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Disk ``IOPS`` setting for ``AWS`` storage.
       Set only if you selected ``AWS`` as your cloud service provider.
       *Format*: int64
     - false

   * -  ``ebsVolumeType``
     - enum
     - Disk ``IOPS`` setting for ``AWS`` storage.
       Set only if you selected ``AWS`` as your cloud service provider.
       *Enum*: ``STANDARD``, ``PROVISIONED``
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instance sizes in this region.
       Each instance size has a default storage and memory capacity.
       The instance size you select applies to all the data-bearing hosts in your instance size.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _atlasdeployment-spec-deploymentspec-replicationspecs-regionconfigs-autoscaling: 

AtlasDeployment.spec.deploymentSpec.replicationSpecs.regionConfigs.autoScaling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
     - Collection of settings that configure how a deployment might scale its deployment tier and whether the deployment can scale down.
     - false

   * -  ``diskGB``
     - object
     - Flag that indicates whether disk auto-scaling is enabled. The default is true.
     - false

.. _atlasdeployment-spec-deploymentspec-replicationspecs-regionconfigs-autoscaling-compute: 

AtlasDeployment.spec.deploymentSpec.replicationSpecs.regionConfigs.autoScaling.compute
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Collection of settings that configure how a deployment might scale its deployment tier and whether the deployment can scale down.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether deployment tier auto-scaling is enabled. The default is false.
     - false

   * -  ``maxInstanceSize``
     - string
     - Maximum instance size to which your deployment can automatically scale (such as ``M40``). Atlas requires this parameter if "``autoScaling``.compute.enabled" : true.
     - false

   * -  ``minInstanceSize``
     - string
     - Minimum instance size to which your deployment can automatically scale (such as ``M10``). Atlas requires this parameter if "``autoScaling``.compute.``scaleDownEnabled``" : true.
     - false

   * -  ``scaleDownEnabled``
     - boolean
     - Flag that indicates whether the deployment tier may scale down. Atlas requires this parameter if "``autoScaling``.compute.enabled" : true.
     - false

.. _atlasdeployment-spec-deploymentspec-replicationspecs-regionconfigs-autoscaling-diskgb: 

AtlasDeployment.spec.deploymentSpec.replicationSpecs.regionConfigs.autoScaling.diskGB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Flag that indicates whether disk auto-scaling is enabled. The default is true.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether this cluster enables disk auto-scaling.
       The maximum memory allowed for the selected cluster tier and the oplog size can limit storage auto-scaling.
     - false

.. _atlasdeployment-spec-deploymentspec-replicationspecs-regionconfigs-electablespecs: 

AtlasDeployment.spec.deploymentSpec.replicationSpecs.regionConfigs.electableSpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Hardware specifications for nodes deployed in the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Disk ``IOPS`` setting for ``AWS`` storage.
       Set only if you selected ``AWS`` as your cloud service provider.
       *Format*: int64
     - false

   * -  ``ebsVolumeType``
     - enum
     - Disk ``IOPS`` setting for ``AWS`` storage.
       Set only if you selected ``AWS`` as your cloud service provider.
       *Enum*: ``STANDARD``, ``PROVISIONED``
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instance sizes in this region.
       Each instance size has a default storage and memory capacity.
       The instance size you select applies to all the data-bearing hosts in your instance size.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _atlasdeployment-spec-deploymentspec-replicationspecs-regionconfigs-readonlyspecs: 

AtlasDeployment.spec.deploymentSpec.replicationSpecs.regionConfigs.readOnlySpecs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Hardware specifications for read only nodes deployed in the region.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``diskIOPS``
     - integer
     - Disk ``IOPS`` setting for ``AWS`` storage.
       Set only if you selected ``AWS`` as your cloud service provider.
       *Format*: int64
     - false

   * -  ``ebsVolumeType``
     - enum
     - Disk ``IOPS`` setting for ``AWS`` storage.
       Set only if you selected ``AWS`` as your cloud service provider.
       *Enum*: ``STANDARD``, ``PROVISIONED``
     - false

   * -  ``instanceSize``
     - string
     - Hardware specification for the instance sizes in this region.
       Each instance size has a default storage and memory capacity.
       The instance size you select applies to all the data-bearing hosts in your instance size.
     - false

   * -  ``nodeCount``
     - integer
     - Number of nodes of the given type for ``MongoDB`` Cloud to deploy to the region.
     - false

.. _atlasdeployment-spec-deploymentspec-searchindexes: 

AtlasDeployment.spec.deploymentSpec.searchIndexes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

SearchIndex is the CRD to configure part of the Atlas Search Index.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``DBName``
     - string
     - Human-readable label that identifies the database that contains the collection with one or more Atlas Search indexes.
     - true

   * -  ``collectionName``
     - string
     - Human-readable label that identifies the collection that contains one or more Atlas Search indexes.
     - true

   * -  ``name``
     - string
     - Human-readable label that identifies this index. Must be unique for a deployment.
     - true

   * -  ``type``
     - enum
     - Type of the index.
       *Enum*: search, ``vectorSearch``
     - true

   * -  ``search``
     - object
     - Atlas ``search`` index configuration.
     - false

   * -  ``vectorSearch``
     - object
     - Atlas vector search index configuration.
     - false

.. _atlasdeployment-spec-deploymentspec-searchindexes-search: 

AtlasDeployment.spec.deploymentSpec.searchIndexes.search
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Atlas search index configuration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``mappings``
     - object
     - Index specifications for the collection's fields.
     - true

   * -  ``searchConfigurationRef``
     - object
     - A reference to the ``AtlasSearchIndexConfig`` custom resource.
     - true

   * -  ``synonyms``
     - []object
     - Rule sets that map words to their ``synonyms`` in this index.
     - false

.. _atlasdeployment-spec-deploymentspec-searchindexes-search-mappings: 

AtlasDeployment.spec.deploymentSpec.searchIndexes.search.mappings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Index specifications for the collection's fields.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``dynamic``
     - ``JSON``
     - Indicates whether the index uses static, default dynamic, or configurable ``dynamic`` mappings.
       Set to **true** to enable ``dynamic`` mapping with default type set or define object to specify the name of the configured type sets for ``dynamic`` mapping.
       If you specify configurable ``dynamic`` mappings, you must define the referred type sets in the **``typeSets``** field.
       Set to **false** to use only static mappings through **mappings.fields**.
       See https://www.mongodb.com/docs/atlas/atlas-search/define-field-mappings/#configure-a-typeset for more details.
     - false

   * -  ``fields``
     - ``JSON``
     - One or more field specifications for the Atlas Search index. Required if mapping.dynamic is omitted or set to false.
     - false

.. _atlasdeployment-spec-deploymentspec-searchindexes-search-searchconfigurationref: 

AtlasDeployment.spec.deploymentSpec.searchIndexes.search.searchConfigurationRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A reference to the AtlasSearchIndexConfig custom resource.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the Kubernetes Resource
     - true

   * -  ``namespace``
     - string
     - Namespace of the Kubernetes Resource
     - false

.. _atlasdeployment-spec-deploymentspec-searchindexes-search-synonyms: 

AtlasDeployment.spec.deploymentSpec.searchIndexes.search.synonyms
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Synonym represents "Synonym" type of Atlas Search Index.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``analyzer``
     - enum
     - Specific pre-defined method chosen to apply to the synonyms to be searched.
       *Enum*: lucene.standard, lucene.simple, lucene.whitespace, lucene.keyword, lucene.arabic, lucene.armenian, lucene.basque, lucene.bengali, lucene.brazilian, lucene.bulgarian, lucene.catalan, lucene.chinese, lucene.cjk, lucene.czech, lucene.danish, lucene.dutch, lucene.english, lucene.finnish, lucene.french, lucene.galician, lucene.german, lucene.greek, lucene.hindi, lucene.hungarian, lucene.indonesian, lucene.irish, lucene.italian, lucene.japanese, lucene.korean, lucene.kuromoji, lucene.latvian, lucene.lithuanian, lucene.morfologik, lucene.nori, lucene.norwegian, lucene.persian, lucene.portuguese, lucene.romanian, lucene.russian, lucene.smartcn, lucene.sorani, lucene.spanish, lucene.swedish, lucene.thai, lucene.turkish, lucene.ukrainian
     - true

   * -  ``name``
     - string
     - Human-readable label that identifies the synonym definition. Each ``name`` must be unique within the same index definition.
     - true

   * -  ``source``
     - object
     - Data set that stores the mapping one or more words map to one or more synonyms of those words.
     - true

.. _atlasdeployment-spec-deploymentspec-searchindexes-search-synonyms-source: 

AtlasDeployment.spec.deploymentSpec.searchIndexes.search.synonyms.source
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Data set that stores the mapping one or more words map to one or more synonyms of those words.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``collection``
     - string
     - Human-readable label that identifies the ``MongoDB`` ``collection`` that stores words and their applicable synonyms.
     - true

.. _atlasdeployment-spec-deploymentspec-searchindexes-vectorsearch: 

AtlasDeployment.spec.deploymentSpec.searchIndexes.vectorSearch
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Atlas vector search index configuration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``fields``
     - ``JSON``
     - Array of ``JSON`` objects. See examples https://dochub.mongodb.org/core/avs-vector-type
     - true

.. _atlasdeployment-spec-deploymentspec-searchnodes: 

AtlasDeployment.spec.deploymentSpec.searchNodes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``instanceSize``
     - enum
     - Hardware specification for the Search Node instance sizes.
       *Enum*: ``S20_HIGHCPU_NVME``, ``S30_HIGHCPU_NVME``, ``S40_HIGHCPU_NVME``, ``S50_HIGHCPU_NVME``, ``S60_HIGHCPU_NVME``, ``S70_HIGHCPU_NVME``, ``S80_HIGHCPU_NVME``, ``S30_LOWCPU_NVME``, ``S40_LOWCPU_NVME``, ``S50_LOWCPU_NVME``, ``S60_LOWCPU_NVME``, ``S80_LOWCPU_NVME``, ``S90_LOWCPU_NVME``, ``S100_LOWCPU_NVME``, ``S110_LOWCPU_NVME``
     - false

   * -  ``nodeCount``
     - integer
     - Number of Search Nodes in the cluster.
       *Minimum*: 2
       *Maximum*: 32
     - false

.. _atlasdeployment-spec-deploymentspec-tags: 

AtlasDeployment.spec.deploymentSpec.tags
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

TagSpec holds a key-value pair for resource tagging on this deployment.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``key``
     - string
     - Constant that defines the set of the tag.
     - true

   * -  ``value``
     - string
     - Variable that belongs to the set of the tag.
     - true

.. _atlasdeployment-spec-externalprojectref: 

AtlasDeployment.spec.externalProjectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

externalProjectRef holds the parent Atlas project ID.
Mutually exclusive with the "projectRef" field.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``id``
     - string
     - ``ID`` is the Atlas project ``ID``.
     - true

.. _atlasdeployment-spec-flexspec: 

AtlasDeployment.spec.flexSpec
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configuration for the Flex cluster API. https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Flex-Clusters

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that identifies the instance.
     - true

   * -  ``providerSettings``
     - object
     - Group of cloud provider settings that configure the provisioned ``MongoDB`` flex cluster.
     - true

   * -  ``tags``
     - []object
     - List that contains key-value pairs between 1 and 255 characters in length for tagging and categorizing the instance.
     - false

   * -  ``terminationProtectionEnabled``
     - boolean
     - Flag that indicates whether termination protection is enabled on the cluster.
       If set to true, ``MongoDB`` Cloud won't delete the cluster. If set to false, ``MongoDB`` Cloud will delete the cluster.
       *Default*: false
     - false

.. _atlasdeployment-spec-flexspec-providersettings: 

AtlasDeployment.spec.flexSpec.providerSettings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Group of cloud provider settings that configure the provisioned MongoDB flex cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``backingProviderName``
     - enum
     - Cloud service provider on which ``MongoDB`` Atlas provisions the flex cluster.
       *Validations*:

       - self == ``oldSelf``: Backing Provider cannot be modified after cluster creation
       *Enum*: ``AWS``, ``GCP``, ``AZURE``
     - true

   * -  ``regionName``
     - string
     - Human-readable label that identifies the geographic location of your ``MongoDB`` flex cluster.
       The region you choose can affect network latency for clients accessing your databases.
       *Validations*:

       - self == ``oldSelf``: Region Name cannot be modified after cluster creation
     - true

.. _atlasdeployment-spec-flexspec-tags: 

AtlasDeployment.spec.flexSpec.tags
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

TagSpec holds a key-value pair for resource tagging on this deployment.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``key``
     - string
     - Constant that defines the set of the tag.
     - true

   * -  ``value``
     - string
     - Variable that belongs to the set of the tag.
     - true

.. _atlasdeployment-spec-processargs: 

AtlasDeployment.spec.processArgs
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ProcessArgs allows modification of Advanced Configuration Options.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``defaultReadConcern``
     - string
     - String that indicates the default level of acknowledgment requested from ``MongoDB`` for read operations set for this cluster.
     - false

   * -  ``defaultWriteConcern``
     - string
     - String that indicates the default level of acknowledgment requested from ``MongoDB`` for write operations set for this cluster.
     - false

   * -  ``failIndexKeyTooLong``
     - boolean
     - Flag that indicates whether to fail the operation and return an error when you insert or update documents where all indexed entries exceed 1024 bytes.
       If you set this to false, mongod writes documents that exceed this limit, but doesn't index them.
     - false

   * -  ``javascriptEnabled``
     - boolean
     - Flag that indicates whether the cluster allows execution of operations that perform server-side executions of ``JavaScript``.
     - false

   * -  ``minimumEnabledTlsProtocol``
     - string
     - String that indicates the minimum ``TLS`` version that the cluster accepts for incoming connections.
       Clusters using ``TLS`` 1.0 or 1.1 should consider setting ``TLS`` 1.2 as the minimum ``TLS`` protocol version.
     - false

   * -  ``noTableScan``
     - boolean
     - Flag that indicates whether the cluster disables executing any query that requires a collection scan to return results.
     - false

   * -  ``oplogMinRetentionHours``
     - string
     - Minimum retention window for cluster's oplog expressed in hours. A value of null indicates that the cluster uses the default minimum oplog window that ``MongoDB`` Cloud calculates.
     - false

   * -  ``oplogSizeMB``
     - integer
     - Number that indicates the storage limit of a cluster's oplog expressed in megabytes.
       A value of null indicates that the cluster uses the default oplog size that Atlas calculates.
       *Format*: int64
     - false

   * -  ``sampleRefreshIntervalBIConnector``
     - integer
     - Number that indicates the documents per database to sample when gathering schema information.
       *Format*: int64
     - false

   * -  ``sampleSizeBIConnector``
     - integer
     - Number that indicates the interval in seconds at which the mongosqld process re-samples data to create its relational schema.
       *Format*: int64
     - false

.. _atlasdeployment-spec-projectref: 

AtlasDeployment.spec.projectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

projectRef is a reference to the parent AtlasProject resource.
Mutually exclusive with the "externalProjectRef" field.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the Kubernetes Resource
     - true

   * -  ``namespace``
     - string
     - Namespace of the Kubernetes Resource
     - false

.. _atlasdeployment-spec-serverlessspec: 

AtlasDeployment.spec.serverlessSpec
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configuration for the serverless deployment API. https://www.mongodb.com/docs/atlas/reference/api/serverless-instances/
DEPRECATED: Serverless instances are deprecated. See https://dochub.mongodb.org/core/atlas-flex-migration for details.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the serverless deployment as it appears in Atlas.
       After Atlas creates the deployment, you can't change its name.
       Can only contain ``ASCII`` letters, numbers, and hyphens.
     - true

   * -  ``providerSettings``
     - object
     - Configuration for the provisioned hosts on which ``MongoDB`` runs. The available options are specific to the cloud service provider.
     - true

   * -  ``backupOptions``
     - object
     - Serverless Backup Options
     - false

   * -  ``privateEndpoints``
     - []object
     - List that contains the private endpoint configurations for the Serverless instance.
       ``DEPRECATED``: Serverless private endpoints are deprecated. See https://dochub.mongodb.org/core/atlas-flex-migration for details.
     - false

   * -  ``tags``
     - []object
     - Key-value pairs for resource tagging.
     - false

   * -  ``terminationProtectionEnabled``
     - boolean
     - Flag that indicates whether termination protection is enabled on the cluster. If set to true, ``MongoDB`` Cloud won't delete the cluster. If set to false, ``MongoDB`` Cloud will delete the cluster.
       *Default*: false
     - false

.. _atlasdeployment-spec-serverlessspec-providersettings: 

AtlasDeployment.spec.serverlessSpec.providerSettings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Configuration for the provisioned hosts on which MongoDB runs. The available options are specific to the cloud service provider.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``providerName``
     - enum
     - Cloud service provider on which Atlas provisions the hosts.
       *Enum*: ``AWS``, ``GCP``, ``AZURE``, ``TENANT``, ``SERVERLESS``
     - true

   * -  ``autoScaling``
     - object
     - Range of instance sizes to which your deployment can scale.
       ``DEPRECATED``: The value of this field doesn't take any effect.
     - false

   * -  ``backingProviderName``
     - enum
     - Cloud service provider on which the host for a multi-tenant deployment is provisioned.
       This setting only works when "``providerSetting``.``providerName``" : "``TENANT``" and "``providerSetting``.``instanceSizeName``" : ``M2`` or ``M5``.
       *Enum*: ``AWS``, ``GCP``, ``AZURE``
     - false

   * -  ``diskIOPS``
     - integer
     - Disk ``IOPS`` setting for ``AWS`` storage.
       Set only if you selected ``AWS`` as your cloud service provider.
       ``DEPRECATED``: The value of this field doesn't take any effect.
       *Format*: int64
     - false

   * -  ``diskTypeName``
     - string
     - Type of disk if you selected Azure as your cloud service provider.
       ``DEPRECATED``: The value of this field doesn't take any effect.
     - false

   * -  ``encryptEBSVolume``
     - boolean
     - Flag that indicates whether the Amazon ``EBS`` encryption feature encrypts the host's root volume for both data at rest within the volume and for data moving between the volume and the deployment.
       ``DEPRECATED``: The value of this field doesn't take any effect.
     - false

   * -  ``instanceSizeName``
     - string
     - Atlas provides different deployment tiers, each with a default storage capacity and ``RAM`` size. The deployment you select is used for all the data-bearing hosts in your deployment tier.
       ``DEPRECATED``: The value of this field doesn't take any effect.
     - false

   * -  ``regionName``
     - string
     - Physical location of your ``MongoDB`` deployment.
       The region you choose can affect network latency for clients accessing your databases.
     - false

   * -  ``volumeType``
     - enum
     - Disk ``IOPS`` setting for ``AWS`` storage.
       Set only if you selected ``AWS`` as your cloud service provider.
       ``DEPRECATED``: The value of this field doesn't take any effect.
       *Enum*: ``STANDARD``, ``PROVISIONED``
     - false

.. _atlasdeployment-spec-serverlessspec-providersettings-autoscaling: 

AtlasDeployment.spec.serverlessSpec.providerSettings.autoScaling
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Range of instance sizes to which your deployment can scale.
DEPRECATED: The value of this field doesn't take any effect.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``autoIndexingEnabled``
     - boolean
     - Flag that indicates whether autopilot mode for Performance Advisor is enabled.
       The default is false.
       ``DEPRECATED``: This flag is no longer supported.
     - false

   * -  ``compute``
     - object
     - Collection of settings that configure how a deployment might scale its deployment tier and whether the deployment can scale down.
     - false

   * -  ``diskGBEnabled``
     - boolean
     - Flag that indicates whether disk auto-scaling is enabled. The default is true.
     - false

.. _atlasdeployment-spec-serverlessspec-providersettings-autoscaling-compute: 

AtlasDeployment.spec.serverlessSpec.providerSettings.autoScaling.compute
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Collection of settings that configure how a deployment might scale its deployment tier and whether the deployment can scale down.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether deployment tier auto-scaling is enabled. The default is false.
     - false

   * -  ``maxInstanceSize``
     - string
     - Maximum instance size to which your deployment can automatically scale (such as ``M40``). Atlas requires this parameter if "``autoScaling``.compute.enabled" : true.
     - false

   * -  ``minInstanceSize``
     - string
     - Minimum instance size to which your deployment can automatically scale (such as ``M10``). Atlas requires this parameter if "``autoScaling``.compute.``scaleDownEnabled``" : true.
     - false

   * -  ``scaleDownEnabled``
     - boolean
     - Flag that indicates whether the deployment tier may scale down. Atlas requires this parameter if "``autoScaling``.compute.enabled" : true.
     - false

.. _atlasdeployment-spec-serverlessspec-backupoptions: 

AtlasDeployment.spec.serverlessSpec.backupOptions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Serverless Backup Options

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``serverlessContinuousBackupEnabled``
     - boolean
     - ``ServerlessContinuousBackupEnabled`` indicates whether the cluster uses continuous cloud backups.
       ``DEPRECATED``: Serverless instances are deprecated, and no longer support continuous backup. See https://dochub.mongodb.org/core/atlas-flex-migration for details.
       *Default*: true
     - false

.. _atlasdeployment-spec-serverlessspec-privateendpoints: 

AtlasDeployment.spec.serverlessSpec.privateEndpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ServerlessPrivateEndpoint configures private endpoints for the Serverless instances.
DEPRECATED: Serverless private endpoints are deprecated. See https://dochub.mongodb.org/core/atlas-flex-migration for details.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``cloudProviderEndpointID``
     - string
     - ``CloudProviderEndpointID`` is the identifier of the cloud provider endpoint.
     - false

   * -  ``name``
     - string
     - Name is the ``name`` of the Serverless ``PrivateLink`` Service. Should be unique.
     - false

   * -  ``privateEndpointIpAddress``
     - string
     - ``PrivateEndpointIPAddress`` is the IPv4 address of the private endpoint in your Azure VNet that someone added to this private endpoint service.
     - false

.. _atlasdeployment-spec-serverlessspec-tags: 

AtlasDeployment.spec.serverlessSpec.tags
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

TagSpec holds a key-value pair for resource tagging on this deployment.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``key``
     - string
     - Constant that defines the set of the tag.
     - true

   * -  ``value``
     - string
     - Variable that belongs to the set of the tag.
     - true

.. _atlasdeployment-status: 

AtlasDeployment.status
~~~~~~~~~~~~~~~~~~~~~~

AtlasDeploymentStatus defines the observed state of AtlasDeployment.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``conditions``
     - []object
     - Conditions is the list of statuses showing the current state of the Atlas Custom Resource
     - true

   * -  ``connectionStrings``
     - object
     - ``ConnectionStrings`` is a set of connection strings that your applications use to connect to this cluster.
     - false

   * -  ``customZoneMapping``
     - object
     - List that contains key value pairs to map zones to geographic regions.
       These pairs map an ``ISO`` 3166-1a2 location code, with an ``ISO`` 3166-2 subdivision code when possible, to a unique 24-hexadecimal string that identifies the custom zone.
     - false

   * -  ``managedNamespaces``
     - []object
     - List that contains a namespace for a Global Cluster. ``MongoDB`` Atlas manages this cluster.
     - false

   * -  ``mongoDBVersion``
     - string
     - ``MongoDBVersion`` is the version of ``MongoDB`` the cluster runs, in . format.
     - false

   * -  ``mongoURIUpdated``
     - string
     - ``MongoURIUpdated`` is a timestamp in ``ISO`` 8601 date and time format in ``UTC`` when the connection string was last updated.
       The connection string changes if you update any of the other values.
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification of which the Atlas Operator is aware.
       The Atlas Operator updates this field to the value of 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

   * -  ``replicaSets``
     - []object
     - Details that explain how ``MongoDB`` Cloud replicates data on the specified ``MongoDB`` database.
       This array has one object per shard representing node configurations in each shard. For replica sets there is only one object representing node configurations.
     - false

   * -  ``searchIndexes``
     - []object
     - ``SearchIndexes`` contains a list of search indexes statuses configured for a project.
     - false

   * -  ``serverlessPrivateEndpoints``
     - []object
     - ``ServerlessPrivateEndpoints`` contains a list of private endpoints configured for the serverless deployment.
     - false

   * -  ``stateName``
     - string
     - ``StateName`` is the current state of the cluster.
       The possible states are: ``IDLE``, ``CREATING``, ``UPDATING``, ``DELETING``, ``DELETED``, ``REPAIRING``
     - false

.. _atlasdeployment-status-conditions: 

AtlasDeployment.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Condition describes the state of an Atlas Custom Resource at a certain point.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``status``
     - string
     - Status of the condition; one of True, False, Unknown.
     - true

   * -  ``type``
     - string
     - Type of Atlas Custom Resource condition.
     - true

   * -  ``lastTransitionTime``
     - string
     - Last time the condition transitioned from one status to another.
       Represented in ``ISO`` 8601 format.
       *Format*: date-time
     - false

   * -  ``message``
     - string
     - A ``message`` providing details about the transition.
     - false

   * -  ``reason``
     - string
     - The ``reason`` for the condition's last transition.
     - false

.. _atlasdeployment-status-connectionstrings: 

AtlasDeployment.status.connectionStrings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ConnectionStrings is a set of connection strings that your applications use to connect to this cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``private``
     - string
     - Network-peering-endpoint-aware mongodb:// connection strings for each interface ``VPC`` endpoint you configured to connect to this cluster.
       Atlas returns this parameter only if you created a network peering connection to this cluster.
     - false

   * -  ``privateEndpoint``
     - []object
     - Private endpoint connection strings.
       Each object describes the connection strings you can use to connect to this cluster through a private endpoint.
       Atlas returns this parameter only if you deployed a private endpoint to all regions to which you deployed this cluster's nodes.
     - false

   * -  ``privateSrv``
     - string
     - Network-peering-endpoint-aware mongodb+srv:// connection strings for each interface ``VPC`` endpoint you configured to connect to this cluster.
       Atlas returns this parameter only if you created a network peering connection to this cluster.
       Use this ``URI`` format if your driver supports it. If it doesn't, use ``connectionStrings``.private.
     - false

   * -  ``standard``
     - string
     - Public mongodb:// connection string for this cluster.
     - false

   * -  ``standardSrv``
     - string
     - Public mongodb+srv:// connection string for this cluster.
     - false

.. _atlasdeployment-status-connectionstrings-privateendpoint: 

AtlasDeployment.status.connectionStrings.privateEndpoint
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

PrivateEndpoint connection strings. Each object describes the connection strings
you can use to connect to this cluster through a private endpoint.
Atlas returns this parameter only if you deployed a private endpoint to all regions
to which you deployed this cluster's nodes.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``connectionString``
     - string
     - Private-endpoint-aware mongodb:// connection string for this private endpoint.
     - false

   * -  ``endpoints``
     - []object
     - Private endpoint through which you connect to Atlas when you use ``connectionStrings``.``privateEndpoint``[n].``connectionString`` or ``connectionStrings``.``privateEndpoint``[n].``srvConnectionString``.
     - false

   * -  ``srvConnectionString``
     - string
     - Private-endpoint-aware mongodb+srv:// connection string for this private endpoint.
     - false

   * -  ``srvShardOptimizedConnectionString``
     - string
     - Private endpoint-aware connection string optimized for sharded clusters that uses the ``mongodb+srv://`` protocol to connect to ``MongoDB`` Cloud through a private endpoint.
     - false

   * -  ``type``
     - string
     - Type of ``MongoDB`` process that you connect to with the connection strings
       Atlas returns:
       • ``MONGOD`` for replica sets, or
       • ``MONGOS`` for sharded clusters
     - false

.. _atlasdeployment-status-connectionstrings-privateendpoint-endpoints: 

AtlasDeployment.status.connectionStrings.privateEndpoint.endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Endpoint through which you connect to Atlas

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``endpointId``
     - string
     - Unique identifier of the private endpoint.
     - false

   * -  ``ip``
     - string
     - Private ``IP`` address of the private endpoint network interface you created in your Azure VNet.
     - false

   * -  ``providerName``
     - string
     - Cloud provider to which you deployed the private endpoint. Atlas returns ``AWS`` or ``AZURE``.
     - false

   * -  ``region``
     - string
     - Region to which you deployed the private endpoint.
     - false

.. _atlasdeployment-status-customzonemapping: 

AtlasDeployment.status.customZoneMapping
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

List that contains key value pairs to map zones to geographic regions.
These pairs map an ISO 3166-1a2 location code, with an ISO 3166-2 subdivision code when possible, to a unique 24-hexadecimal string that identifies the custom zone.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``customZoneMapping``
     - map[string]string
     - List that contains key value pairs to map zones to geographic regions.
       These pairs map an ``ISO`` 3166-1a2 location code, with an ``ISO`` 3166-2 subdivision code when possible, to a unique 24-hexadecimal string that identifies the custom zone.
     - false

   * -  ``zoneMappingErrMessage``
     - string
     - Error message for failed Custom Zone Mapping.
     - false

   * -  ``zoneMappingState``
     - string
     - Status of the Custom Zone Mapping.
     - false

.. _atlasdeployment-status-managednamespaces: 

AtlasDeployment.status.managedNamespaces
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``collection``
     - string
     - Human-readable label of the ``collection`` to manage for this Global Cluster.
     - true

   * -  ``db``
     - string
     - Human-readable label of the database to manage for this Global Cluster.
     - true

   * -  ``customShardKey``
     - string
     - Database parameter used to divide the collection into shards. Global clusters require a compound shard key.
       This compound shard key combines the location parameter and the user-selected custom key.
     - false

   * -  ``errMessage``
     - string
     - Error message for a failed Managed Namespace.
     - false

   * -  ``isCustomShardKeyHashed``
     - boolean
     - Flag that indicates whether someone hashed the custom shard key for the specified collection.
       If you set this value to false, ``MongoDB`` Atlas uses ranged sharding.
     - false

   * -  ``isShardKeyUnique``
     - boolean
     - Flag that indicates whether someone hashed the custom shard key. If this parameter returns false, this cluster uses ranged sharding.
     - false

   * -  ``numInitialChunks``
     - integer
     - Minimum number of chunks to create initially when sharding an empty collection with a hashed shard key.
     - false

   * -  ``presplitHashedZones``
     - boolean
     - Flag that indicates whether ``MongoDB`` Cloud should create and distribute initial chunks for an empty or non-existing collection.
       ``MongoDB`` Atlas distributes data based on the defined zones and zone ranges for the collection.
     - false

   * -  ``status``
     - string
     - Status of the Managed Namespace.
     - false

.. _atlasdeployment-status-replicasets: 

AtlasDeployment.status.replicaSets
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``id``
     - string
     - Unique 24-hexadecimal digit string that identifies the replication object for a shard in a Cluster.
     - true

   * -  ``zoneName``
     - string
     - Human-readable label that describes the zone this shard belongs to in a Global Cluster.
     - false

.. _atlasdeployment-status-searchindexes: 

AtlasDeployment.status.searchIndexes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``ID``
     - string
     - Unique 24-hexadecimal digit string that identifies this Atlas Search index.
     - true

   * -  ``message``
     - string
     - Details on the status of the search index.
     - true

   * -  ``name``
     - string
     - Human-readable label that identifies this index.
     - true

   * -  ``status``
     - string
     - Condition of the search index.
     - true

.. _atlasdeployment-status-serverlessprivateendpoints: 

AtlasDeployment.status.serverlessPrivateEndpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``_id``
     - string
     - ``ID`` is the identifier of the Serverless ``PrivateLink`` Service.
     - false

   * -  ``cloudProviderEndpointId``
     - string
     - ``CloudProviderEndpointID`` is the identifier of the cloud provider endpoint.
     - false

   * -  ``endpointServiceName``
     - string
     - ``EndpointServiceName`` is the name of the ``PrivateLink`` endpoint service in ``AWS``. Returns null while the endpoint service is being created.
     - false

   * -  ``errorMessage``
     - string
     - ``ErrorMessage`` is the error message if the Serverless ``PrivateLink`` Service failed to create or connect.
     - false

   * -  ``name``
     - string
     - Name is the ``name`` of the Serverless ``PrivateLink`` Service. Should be unique.
     - false

   * -  ``privateEndpointIpAddress``
     - string
     - ``PrivateEndpointIPAddress`` is the IPv4 address of the private endpoint in your Azure VNet that someone added to this private endpoint service.
     - false

   * -  ``privateLinkServiceResourceId``
     - string
     - ``PrivateLinkServiceResourceID`` is the root-relative path that identifies the Azure Private Link Service that ``MongoDB`` Cloud manages. ``MongoDB`` Cloud returns null while it creates the endpoint service.
     - false

   * -  ``providerName``
     - string
     - ``ProviderName`` is human-readable label that identifies the cloud provider. Values include ``AWS`` or ``AZURE``.
     - false

   * -  ``status``
     - string
     - Status of the ``AWS`` Serverless ``PrivateLink`` connection.
     - false
