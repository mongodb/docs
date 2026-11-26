.. _group: 

Group
-----

A group, managed by the MongoDB Kubernetes Atlas Operator.

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
     - Group
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - Specification of the group supporting the following versions:

       - v20250312

       At most one versioned ``spec`` can be specified. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__
     - false

   * -  ``status``
     - object
     - Most recently observed read-only ``status`` of the group for the specified resource version. This data may not be up to date and is populated by the system. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__
     - false

.. _group-spec: 

Group.spec
~~~~~~~~~~

Specification of the group supporting the following versions:

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
     - The spec of the group resource for version v20250312.
     - false

.. _group-spec-connectionsecretref: 

Group.spec.connectionSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _group-spec-v20250312: 

Group.spec.v20250312
~~~~~~~~~~~~~~~~~~~~

The spec of the group resource for version v20250312.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``entry``
     - object
     - The ``entry`` fields of the group resource spec. These fields can be set for creating and updating groups.
     - false

   * -  ``projectOwnerId``
     - string
     - Unique 24-hexadecimal digit string that identifies the ``MongoDB`` Cloud user to whom to grant the Project Owner role on the specified project. If you set this parameter, it overrides the default value of the oldest Organization Owner.
       **Validations:**

       - self == ``oldSelf``: ``projectOwnerId`` cannot be modified after creation
     - false

.. _group-spec-v20250312-entry: 

Group.spec.v20250312.entry
~~~~~~~~~~~~~~~~~~~~~~~~~~

The entry fields of the group resource spec. These fields can be set for creating and updating groups.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that identifies the project included in the ``MongoDB`` Cloud organization.
     - true

   * -  ``orgId``
     - string
     - Unique 24-hexadecimal digit string that identifies the ``MongoDB`` Cloud organization to which the project belongs.
     - true

   * -  ``regionUsageRestrictions``
     - string
     - Applies to Atlas for Government only.
       In Commercial Atlas, this field will be rejected in requests and missing in responses.
       This field sets restrictions on available regions in the project.
       ``COMMERCIAL_FEDRAMP_REGIONS_ONLY``: Only allows deployments in ``FedRAMP`` Moderate regions.
       ``GOV_REGIONS_ONLY``: Only allows deployments in ``GovCloud`` regions.
     - false

   * -  ``tags``
     - []object
     - List that contains key-value pairs between 1 to 255 characters in length for tagging and categorizing the project.
     - false

   * -  ``withDefaultAlertsSettings``
     - boolean
     - Flag that indicates whether to create the project with default alert settings.
     - false

.. _group-spec-v20250312-entry-tags: 

Group.spec.v20250312.entry.tags
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _group-status: 

Group.status
~~~~~~~~~~~~

Most recently observed read-only status of the group for the specified resource version. This data may not be up to date and is populated by the system. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__

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
     - The last observed Atlas state of the group resource for version v20250312.
     - false

.. _group-status-conditions: 

Group.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~

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

.. _group-status-v20250312: 

Group.status.v20250312
~~~~~~~~~~~~~~~~~~~~~~

The last observed Atlas state of the group resource for version v20250312.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``clusterCount``
     - integer
     - Quantity of ``MongoDB`` Cloud clusters deployed in this project.
     - true

   * -  ``created``
     - string
     - Date and time when ``MongoDB`` Cloud ``created`` this project. This parameter expresses its value in the ``ISO`` 8601 timestamp format in ``UTC``.
     - true

   * -  ``id``
     - string
     - Unique 24-hexadecimal digit string that identifies the ``MongoDB`` Cloud project.
     - false
