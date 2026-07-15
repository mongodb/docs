.. _databaseuser: 

DatabaseUser
------------

A databaseuser, managed by the MongoDB Kubernetes Atlas Operator.

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
     - ``DatabaseUser``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - Specification of the databaseuser supporting the following versions:

       - v20250312

       At most one versioned ``spec`` can be specified. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__
       **Validations:**

       - (has(self.v20250312.``groupId``) && has(self.``connectionSecretRef``)) || (!has(self.v20250312.``groupId``)): spec.``connectionSecretRef`` must be set if spec.v20250312.``groupId`` is set.
     - false

   * -  ``status``
     - object
     - Most recently observed read-only ``status`` of the databaseuser for the specified resource version. This data may not be up to date and is populated by the system. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__
     - false

.. _databaseuser-spec: 

DatabaseUser.spec
~~~~~~~~~~~~~~~~~

Specification of the databaseuser supporting the following versions:

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
     - The spec of the databaseuser resource for version v20250312.
       **Validations:**

       - (has(self.``groupId``) && !has(self.``groupRef``)) || (!has(self.``groupId``) && has(self.``groupRef``)): ``groupId`` and ``groupRef`` are mutually exclusive; only one of them can be set
     - false

.. _databaseuser-spec-connectionsecretref: 

DatabaseUser.spec.connectionSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _databaseuser-spec-v20250312: 

DatabaseUser.spec.v20250312
~~~~~~~~~~~~~~~~~~~~~~~~~~~

The spec of the databaseuser resource for version v20250312.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``entry``
     - object
     - The ``entry`` fields of the databaseuser resource spec. These fields can be set for creating and updating databaseusers.
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

.. _databaseuser-spec-v20250312-entry: 

DatabaseUser.spec.v20250312.entry
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The entry fields of the databaseuser resource spec. These fields can be set for creating and updating databaseusers.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``databaseName``
     - string
     - The database against which the database user authenticates. Database users must provide both a username and authentication database to log into ``MongoDB``. If the user authenticates with ``AWS`` ``IAM``, x.509, ``LDAP``, or ``OIDC`` Workload this value should be ``$external``. If the user authenticates with ``SCRAM``-``SHA`` or ``OIDC`` Workforce, this value should be ``admin``.
     - true

   * -  ``roles``
     - []object
     - List that provides the pairings of one role with one applicable database.
     - true

   * -  ``username``
     - string
     - Human-readable label that represents the user that authenticates to ``MongoDB``. The format of this label depends on the method of authentication:

       .. list-table::
          :header-rows: 1
          :widths: 25 25 25 25

          * - Authentication Method
            - Parameter Needed
            - Parameter Value
            - ``username`` Format

          * - ``AWS`` ``IAM``
            - ``awsIAMType``
            - ``ROLE``
            - ``ARN``

          * - ``AWS`` ``IAM``
            - ``awsIAMType``
            - ``USER``
            - ``ARN``

          * - x.509
            - ``x509Type``
            - ``CUSTOMER``
            - `RFC 2253 <https://tools.ietf.org/html/2253>`__ Distinguished Name

          * - x.509
            - ``x509Type``
            - ``MANAGED``
            - `RFC 2253 <https://tools.ietf.org/html/2253>`__ Distinguished Name

          * - ``LDAP``
            - ``ldapAuthType``
            - ``USER``
            - `RFC 2253 <https://tools.ietf.org/html/2253>`__ Distinguished Name

          * - ``LDAP``
            - ``ldapAuthType``
            - ``GROUP``
            - `RFC 2253 <https://tools.ietf.org/html/2253>`__ Distinguished Name

          * - ``OIDC`` Workforce
            - ``oidcAuthType``
            - ``IDP_GROUP``
            - Atlas ``OIDC`` ``IdP`` ``ID`` (found in federation settings), followed by a '/', followed by the ``IdP`` group name

          * - ``OIDC`` Workload
            - ``oidcAuthType``
            - ``USER``
            - Atlas ``OIDC`` ``IdP`` ``ID`` (found in federation settings), followed by a '/', followed by the ``IdP`` user name

          * - ``SCRAM``-``SHA``
            - ``awsIAMType``, ``x509Type``, ``ldapAuthType``, ``oidcAuthType``
            - ``NONE``
            - Alphanumeric string
     - true

   * -  ``awsIAMType``
     - string
     - Human-readable label that indicates whether the new database user authenticates with the Amazon Web Services (``AWS``) Identity and Access Management (``IAM``) credentials associated with the user or the user's role.
     - false

   * -  ``deleteAfterDate``
     - string
     - Date and time when ``MongoDB`` Cloud deletes the user. This parameter expresses its value in the ``ISO`` 8601 timestamp format in ``UTC`` and can include the time zone designation. You must specify a future date that falls within one week of making the Application Programming Interface (``API``) request.
     - false

   * -  ``description``
     - string
     - Description of this database user.
     - false

   * -  ``labels``
     - []object
     - List that contains the key-value pairs for tagging and categorizing the ``MongoDB`` database user. The ``labels`` that you define do not appear in the console.
     - false

   * -  ``ldapAuthType``
     - string
     - Part of the Lightweight Directory Access Protocol (``LDAP``) record that the database uses to authenticate this database user on the ``LDAP`` host.
     - false

   * -  ``oidcAuthType``
     - string
     - Human-readable label that indicates whether the new database user or group authenticates with ``OIDC`` federated authentication. To create a federated authentication user, specify the value of ``USER`` in this field. To create a federated authentication group, specify the value of ``IDP_GROUP`` in this field.
     - false

   * -  ``passwordSecretRef``
     - object
     - ``SENSITIVE`` ``FIELD``
       Reference to a secret containing data for the "password" field:
       Alphanumeric string that authenticates this database user against the database specified in ``databaseName``. To authenticate with ``SCRAM``-``SHA``, you must specify this parameter. This parameter doesn't appear in this response.
     - false

   * -  ``scopes``
     - []object
     - List that contains clusters, ``MongoDB`` Atlas Data Lakes, and ``MongoDB`` Atlas Streams Workspaces that this database user can access. If omitted, ``MongoDB`` Cloud grants the database user access to all the clusters, ``MongoDB`` Atlas Data Lakes, and ``MongoDB`` Atlas Streams Workspaces in the project.
     - false

   * -  ``x509Type``
     - string
     - X.509 method that ``MongoDB`` Cloud uses to authenticate the database user.

       - For application-managed X.509, specify ``MANAGED``.
       - For self-managed X.509, specify ``CUSTOMER``.

       Users created with the ``CUSTOMER`` method require a Common Name (``CN``) in the **username** parameter. You must create externally authenticated users on the ``$external`` database.
     - false

.. _databaseuser-spec-v20250312-entry-roles: 

DatabaseUser.spec.v20250312.entry.roles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Range of resources available to this database user.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``databaseName``
     - string
     - Database to which the user is granted access privileges.
     - true

   * -  ``roleName``
     - string
     - Human-readable label that identifies a group of privileges assigned to a database user. This value can either be a built-in role or a custom role.
     - true

   * -  ``collectionName``
     - string
     - Collection on which this role applies.
     - false

.. _databaseuser-spec-v20250312-entry-labels: 

DatabaseUser.spec.v20250312.entry.labels
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _databaseuser-spec-v20250312-entry-passwordsecretref: 

DatabaseUser.spec.v20250312.entry.passwordSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

SENSITIVE FIELD

Reference to a secret containing data for the "password" field:

Alphanumeric string that authenticates this database user against the database specified in ``databaseName``. To authenticate with SCRAM-SHA, you must specify this parameter. This parameter doesn't appear in this response.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the secret containing the sensitive field value.
     - true

   * -  ``key``
     - string
     - Key of the secret data containing the sensitive field value, defaults to "password".
       *Default*: password
     - false

.. _databaseuser-spec-v20250312-entry-scopes: 

DatabaseUser.spec.v20250312.entry.scopes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Range of resources available to this database user.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that identifies the cluster or ``MongoDB`` Atlas Data Lake that this database user can access.
     - true

   * -  ``type``
     - string
     - Category of resource that this database user can access.
     - true

.. _databaseuser-spec-v20250312-groupref: 

DatabaseUser.spec.v20250312.groupRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _databaseuser-status: 

DatabaseUser.status
~~~~~~~~~~~~~~~~~~~

Most recently observed read-only status of the databaseuser for the specified resource version. This data may not be up to date and is populated by the system. More info: `https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status <https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status>`__

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
     - The last observed Atlas state of the databaseuser resource for version v20250312.
     - false

.. _databaseuser-status-conditions: 

DatabaseUser.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _databaseuser-status-v20250312: 

DatabaseUser.status.v20250312
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The last observed Atlas state of the databaseuser resource for version v20250312.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``databaseName``
     - string
     - The database against which the database user authenticates. Database users must provide both a username and authentication database to log into ``MongoDB``. If the user authenticates with ``AWS`` ``IAM``, x.509, ``LDAP``, or ``OIDC`` Workload this value should be ``$external``. If the user authenticates with ``SCRAM``-``SHA`` or ``OIDC`` Workforce, this value should be ``admin``.
     - true

   * -  ``groupId``
     - string
     - Unique 24-hexadecimal digit string that identifies the project.
     - true

   * -  ``username``
     - string
     - Human-readable label that represents the user that authenticates to ``MongoDB``. The format of this label depends on the method of authentication:

       .. list-table::
          :header-rows: 1
          :widths: 25 25 25 25

          * - Authentication Method
            - Parameter Needed
            - Parameter Value
            - ``username`` Format

          * - ``AWS`` ``IAM``
            - ``awsIAMType``
            - ``ROLE``
            - ``ARN``

          * - ``AWS`` ``IAM``
            - ``awsIAMType``
            - ``USER``
            - ``ARN``

          * - x.509
            - ``x509Type``
            - ``CUSTOMER``
            - `RFC 2253 <https://tools.ietf.org/html/2253>`__ Distinguished Name

          * - x.509
            - ``x509Type``
            - ``MANAGED``
            - `RFC 2253 <https://tools.ietf.org/html/2253>`__ Distinguished Name

          * - ``LDAP``
            - ``ldapAuthType``
            - ``USER``
            - `RFC 2253 <https://tools.ietf.org/html/2253>`__ Distinguished Name

          * - ``LDAP``
            - ``ldapAuthType``
            - ``GROUP``
            - `RFC 2253 <https://tools.ietf.org/html/2253>`__ Distinguished Name

          * - ``OIDC`` Workforce
            - ``oidcAuthType``
            - ``IDP_GROUP``
            - Atlas ``OIDC`` ``IdP`` ``ID`` (found in federation settings), followed by a '/', followed by the ``IdP`` group name

          * - ``OIDC`` Workload
            - ``oidcAuthType``
            - ``USER``
            - Atlas ``OIDC`` ``IdP`` ``ID`` (found in federation settings), followed by a '/', followed by the ``IdP`` user name

          * - ``SCRAM``-``SHA``
            - ``awsIAMType``, ``x509Type``, ``ldapAuthType``, ``oidcAuthType``
            - ``NONE``
            - Alphanumeric string
     - true
