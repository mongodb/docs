.. _ipaccesslistentry: 

IPAccessListEntry
-----------------

A ipaccesslistentry, managed by the MongoDB Kubernetes Atlas Operator.

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
     - IPAccessListEntry
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - Specification of the ipaccesslistentry supporting the following versions:

       - v20250312

       At most one versioned ``spec`` can be specified. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__
       **Validations:**

       - (has(self.v20250312.``groupId``) && has(self.``connectionSecretRef``)) || (!has(self.v20250312.``groupId``)): spec.``connectionSecretRef`` must be set if spec.v20250312.``groupId`` is set.
     - false

   * -  ``status``
     - object
     - Most recently observed read-only ``status`` of the ipaccesslistentry for the specified resource version. This data may not be up to date and is populated by the system. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__
     - false

.. _ipaccesslistentry-spec: 

IPAccessListEntry.spec
~~~~~~~~~~~~~~~~~~~~~~

Specification of the ipaccesslistentry supporting the following versions:

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
     - The spec of the ipaccesslistentry resource for version v20250312.
       **Validations:**

       - (has(self.``groupId``) && !has(self.``groupRef``)) || (!has(self.``groupId``) && has(self.``groupRef``)): ``groupId`` and ``groupRef`` are mutually exclusive; only one of them can be set
     - false

.. _ipaccesslistentry-spec-connectionsecretref: 

IPAccessListEntry.spec.connectionSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _ipaccesslistentry-spec-v20250312: 

IPAccessListEntry.spec.v20250312
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The spec of the ipaccesslistentry resource for version v20250312.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``entry``
     - object
     - The ``entry`` fields of the ipaccesslistentry resource spec. These fields can be set for creating and updating ipaccesslistentries.
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

.. _ipaccesslistentry-spec-v20250312-entry: 

IPAccessListEntry.spec.v20250312.entry
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The entry fields of the ipaccesslistentry resource spec. These fields can be set for creating and updating ipaccesslistentries.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``awsSecurityGroup``
     - string
     - Unique string of the Amazon Web Services (``AWS``) security group that you want to add to the project's ``IP`` access list. Your ``IP`` access list entry can be one ``awsSecurityGroup``, one ``cidrBlock``, or one ``ipAddress``. You must configure Virtual Private Connection (``VPC``) peering for your project before you can add an ``AWS`` security group to an ``IP`` access list. You cannot set ``AWS`` security groups as temporary access list entries. Don't set this parameter if you set ``cidrBlock`` or ``ipAddress``.
     - false

   * -  ``cidrBlock``
     - string
     - Range of ``IP`` addresses in Classless Inter-Domain Routing (``CIDR``) notation that you want to add to the project's ``IP`` access list. Your ``IP`` access list entry can be one ``awsSecurityGroup``, one ``cidrBlock``, or one ``ipAddress``. Don't set this parameter if you set ``awsSecurityGroup`` or ``ipAddress``.
     - false

   * -  ``comment``
     - string
     - Remark that explains the purpose or scope of this ``IP`` access list entry.
     - false

   * -  ``deleteAfterDate``
     - string
     - Date and time after which ``MongoDB`` Cloud deletes the temporary access list entry. This parameter expresses its value in the ``ISO`` 8601 timestamp format in ``UTC`` and can include the time zone designation. The date must be later than the current date but no later than one week after you submit this request. The resource returns this parameter if you specified an expiration date when creating this ``IP`` access list entry.
     - false

   * -  ``ipAddress``
     - string
     - ``IP`` address that you want to add to the project's ``IP`` access list. Your ``IP`` access list entry can be one ``awsSecurityGroup``, one ``cidrBlock``, or one ``ipAddress``. Don't set this parameter if you set ``awsSecurityGroup`` or ``cidrBlock``.
     - false

.. _ipaccesslistentry-spec-v20250312-groupref: 

IPAccessListEntry.spec.v20250312.groupRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _ipaccesslistentry-status: 

IPAccessListEntry.status
~~~~~~~~~~~~~~~~~~~~~~~~

Most recently observed read-only status of the ipaccesslistentry for the specified resource version. This data may not be up to date and is populated by the system. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__

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
     - The last observed Atlas state of the ipaccesslistentry resource for version v20250312.
     - false

.. _ipaccesslistentry-status-conditions: 

IPAccessListEntry.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _ipaccesslistentry-status-v20250312: 

IPAccessListEntry.status.v20250312
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The last observed Atlas state of the ipaccesslistentry resource for version v20250312.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``awsSecurityGroup``
     - string
     - Unique string of the Amazon Web Services (``AWS``) security group that you want to add to the project's ``IP`` access list. Your ``IP`` access list entry can be one ``awsSecurityGroup``, one ``cidrBlock``, or one ``ipAddress``. You must configure Virtual Private Connection (``VPC``) peering for your project before you can add an ``AWS`` security group to an ``IP`` access list. You cannot set ``AWS`` security groups as temporary access list entries. Don't set this parameter if you set ``cidrBlock`` or ``ipAddress``.
     - false

   * -  ``cidrBlock``
     - string
     - Range of ``IP`` addresses in Classless Inter-Domain Routing (``CIDR``) notation that you want to add to the project's ``IP`` access list. Your ``IP`` access list entry can be one ``awsSecurityGroup``, one ``cidrBlock``, or one ``ipAddress``. Don't set this parameter if you set ``awsSecurityGroup`` or ``ipAddress``.
     - false

   * -  ``comment``
     - string
     - Remark that explains the purpose or scope of this ``IP`` access list entry.
     - false

   * -  ``deleteAfterDate``
     - string
     - Date and time after which ``MongoDB`` Cloud deletes the temporary access list entry. This parameter expresses its value in the ``ISO`` 8601 timestamp format in ``UTC`` and can include the time zone designation. The date must be later than the current date but no later than one week after you submit this request. The resource returns this parameter if you specified an expiration date when creating this ``IP`` access list entry.
     - false

   * -  ``groupId``
     - string
     - Unique 24-hexadecimal digit string that identifies the project that contains the ``IP`` access list to which you want to add one or more entries.
     - false

   * -  ``ipAddress``
     - string
     - ``IP`` address that you want to add to the project's ``IP`` access list. Your ``IP`` access list entry can be one ``awsSecurityGroup``, one ``cidrBlock``, or one ``ipAddress``. Don't set this parameter if you set ``awsSecurityGroup`` or ``cidrBlock``.
     - false