.. _flexcluster: 

FlexCluster
-----------

A flexcluster, managed by the MongoDB Kubernetes Atlas Operator.

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
     - ``FlexCluster``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - Specification of the flexcluster supporting the following versions:

       - v20250312

       At most one versioned ``spec`` can be specified. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__
       **Validations:**

       - (has(self.v20250312.``groupId``) && has(self.``connectionSecretRef``)) || (!has(self.v20250312.``groupId``)): spec.``connectionSecretRef`` must be set if spec.v20250312.``groupId`` is set.
     - false

   * -  ``status``
     - object
     - Most recently observed read-only ``status`` of the flexcluster for the specified resource version. This data may not be up to date and is populated by the system. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__
     - false

.. _flexcluster-spec: 

FlexCluster.spec
~~~~~~~~~~~~~~~~

Specification of the flexcluster supporting the following versions:

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
     - The spec of the flexcluster resource for version v20250312.
       **Validations:**

       - (has(self.``groupId``) && !has(self.``groupRef``)) || (!has(self.``groupId``) && has(self.``groupRef``)): ``groupId`` and ``groupRef`` are mutually exclusive; only one of them can be set
     - false

.. _flexcluster-spec-connectionsecretref: 

FlexCluster.spec.connectionSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _flexcluster-spec-v20250312: 

FlexCluster.spec.v20250312
~~~~~~~~~~~~~~~~~~~~~~~~~~

The spec of the flexcluster resource for version v20250312.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``entry``
     - object
     - The ``entry`` fields of the flexcluster resource spec. These fields can be set for creating and updating flexclusters.
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

.. _flexcluster-spec-v20250312-entry: 

FlexCluster.spec.v20250312.entry
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The entry fields of the flexcluster resource spec. These fields can be set for creating and updating flexclusters.

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
     - List that contains key-value pairs between 1 to 255 characters in length for tagging and categorizing the instance.
     - false

   * -  ``terminationProtectionEnabled``
     - boolean
     - Flag that indicates whether termination protection is enabled on the cluster. If set to ``true``, ``MongoDB`` Cloud won't delete the cluster. If set to ``false``, ``MongoDB`` Cloud will delete the cluster.
     - false

.. _flexcluster-spec-v20250312-entry-providersettings: 

FlexCluster.spec.v20250312.entry.providerSettings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Group of cloud provider settings that configure the provisioned MongoDB flex cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``backingProviderName``
     - string
     - Cloud service provider on which ``MongoDB`` Cloud provisioned the flex cluster.
     - true

   * -  ``regionName``
     - string
     - Human-readable label that identifies the geographic location of your ``MongoDB`` flex cluster. The region you choose can affect network latency for clients accessing your databases. For a complete list of region names, see `AWS <https://docs.atlas.mongodb.com/reference/amazon-aws/#std-label-amazon-aws>`__, `GCP <https://docs.atlas.mongodb.com/reference/google-gcp/>`__, and `Azure <https://docs.atlas.mongodb.com/reference/microsoft-azure/>`__.
     - true

.. _flexcluster-spec-v20250312-entry-tags: 

FlexCluster.spec.v20250312.entry.tags
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _flexcluster-spec-v20250312-groupref: 

FlexCluster.spec.v20250312.groupRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _flexcluster-status: 

FlexCluster.status
~~~~~~~~~~~~~~~~~~

Most recently observed read-only status of the flexcluster for the specified resource version. This data may not be up to date and is populated by the system. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__

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
     - The last observed Atlas state of the flexcluster resource for version v20250312.
     - false

.. _flexcluster-status-conditions: 

FlexCluster.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _flexcluster-status-v20250312: 

FlexCluster.status.v20250312
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The last observed Atlas state of the flexcluster resource for version v20250312.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``providerSettings``
     - object
     - Group of cloud provider settings that configure the provisioned ``MongoDB`` flex cluster.
     - true

   * -  ``backupSettings``
     - object
     - Flex backup configuration.
     - false

   * -  ``clusterType``
     - string
     - Flex cluster topology.
     - false

   * -  ``connectionStrings``
     - object
     - Collection of Uniform Resource Locators that point to the ``MongoDB`` database.
     - false

   * -  ``createDate``
     - string
     - Date and time when ``MongoDB`` Cloud created this instance. This parameter expresses its value in ``ISO`` 8601 format in ``UTC``.
     - false

   * -  ``groupId``
     - string
     - Unique 24-hexadecimal character string that identifies the project.
     - false

   * -  ``id``
     - string
     - Unique 24-hexadecimal digit string that identifies the instance.
     - false

   * -  ``mongoDBVersion``
     - string
     - Version of ``MongoDB`` that the instance runs.
     - false

   * -  ``name``
     - string
     - Human-readable label that identifies the instance.
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

   * -  ``versionReleaseSystem``
     - string
     - Method by which the cluster maintains the ``MongoDB`` versions.
     - false

.. _flexcluster-status-v20250312-providersettings: 

FlexCluster.status.v20250312.providerSettings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Group of cloud provider settings that configure the provisioned MongoDB flex cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``backingProviderName``
     - string
     - Cloud service provider on which ``MongoDB`` Cloud provisioned the flex cluster.
     - false

   * -  ``diskSizeGB``
     - number
     - Storage capacity available to the flex cluster expressed in gigabytes.
     - false

   * -  ``providerName``
     - string
     - Human-readable label that identifies the provider type.
     - false

   * -  ``regionName``
     - string
     - Human-readable label that identifies the geographic location of your ``MongoDB`` flex cluster. The region you choose can affect network latency for clients accessing your databases. For a complete list of region names, see `AWS <https://docs.atlas.mongodb.com/reference/amazon-aws/#std-label-amazon-aws>`__, `GCP <https://docs.atlas.mongodb.com/reference/google-gcp/>`__, and `Azure <https://docs.atlas.mongodb.com/reference/microsoft-azure/>`__.
     - false

.. _flexcluster-status-v20250312-backupsettings: 

FlexCluster.status.v20250312.backupSettings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Flex backup configuration.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``enabled``
     - boolean
     - Flag that indicates whether backups are performed for this flex cluster. Backup uses flex cluster backups.
     - false

.. _flexcluster-status-v20250312-connectionstrings: 

FlexCluster.status.v20250312.connectionStrings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Collection of Uniform Resource Locators that point to the MongoDB database.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``standard``
     - string
     - Public connection string that you can use to connect to this cluster. This connection string uses the ``mongodb://`` protocol.
     - false

   * -  ``standardSrv``
     - string
     - Public connection string that you can use to connect to this flex cluster. This connection string uses the ``mongodb+srv://`` protocol.
     - false
