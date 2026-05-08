.. _atlasdatabaseuser: 

AtlasDatabaseUser
-----------------

AtlasDatabaseUser is the Schema for the Atlas Database User API

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
     - ``AtlasDatabaseUser``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasDatabaseUserSpec`` defines the target state of Database User in Atlas
       *Validations*:

       - (has(self.``externalProjectRef``) && !has(self.``projectRef``)) || (!has(self.``externalProjectRef``) && has(self.``projectRef``)): must define only one project reference through ``externalProjectRef`` or ``projectRef``

       - (has(self.``externalProjectRef``) && has(self.``connectionSecret``)) || !has(self.``externalProjectRef``): must define a local connection secret when referencing an external project
     - false

   * -  ``status``
     - object
     - ``AtlasDatabaseUserStatus`` defines the observed state of ``AtlasProject``
     - false

.. _atlasdatabaseuser-spec: 

AtlasDatabaseUser.spec
~~~~~~~~~~~~~~~~~~~~~~

AtlasDatabaseUserSpec defines the target state of Database User in Atlas

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``roles``
     - []object
     - Roles is an array of this user's ``roles`` and the databases / collections on which the ``roles`` apply. A role allows
       the user to perform particular actions on the specified database.
     - true

   * -  ``username``
     - string
     - Username is a ``username`` for authenticating to ``MongoDB``
       Human-readable label that represents the user that authenticates to ``MongoDB``. The format of this label depends on the method of authentication:
       In case of ``AWS`` ``IAM``: the value should be ``AWS`` ``ARN`` for the ``IAM`` User/Role;
       In case of ``OIDC`` Workload or Workforce: the value should be the Atlas ``OIDC`` ``IdP`` ``ID``, followed by a '/', followed by the ``IdP`` group name;
       In case of Plain text auth: the value can be anything.
     - true

   * -  ``awsIamType``
     - enum
     - Human-readable label that indicates whether the new database user authenticates with Amazon Web Services (``AWS``).
       Identity and Access Management (``IAM``) credentials associated with the user or the user's role
       *Enum*: ``NONE``, ``USER``, ``ROLE``
       *Default*: ``NONE``
     - false

   * -  ``connectionSecret``
     - object
     - Name of the secret containing Atlas ``API`` private and public keys.
     - false

   * -  ``databaseName``
     - string
     - ``DatabaseName`` is a Database against which Atlas authenticates the user.
       If the user authenticates with ``AWS`` ``IAM``, x.509, ``LDAP``, or ``OIDC`` Workload this value should be '$external'.
       If the user authenticates with ``SCRAM``-``SHA`` or ``OIDC`` Workforce, this value should be 'admin'.
       Default value is 'admin'.
       *Default*: admin
     - false

   * -  ``deleteAfterDate``
     - string
     - ``DeleteAfterDate`` is a timestamp in ``ISO`` 8601 date and time format in ``UTC`` after which Atlas deletes the user.
       The specified date must be in the future and within one week.
     - false

   * -  ``description``
     - string
     - Description of this database user. Maximum 100 characters.
     - false

   * -  ``externalProjectRef``
     - object
     - ``externalProjectRef`` holds the parent Atlas project ``ID``.
       Mutually exclusive with the "``projectRef``" field.
     - false

   * -  ``labels``
     - []object
     - Labels is an array containing key-value pairs that tag and categorize the database user.
       Each key and value has a maximum length of 255 characters.
     - false

   * -  ``oidcAuthType``
     - enum
     - Human-readable label that indicates whether the new database Username with ``OIDC`` federated authentication.
       To create a federated authentication group (Workforce), specify the value of ``IDP_GROUP`` in this field.
       To create a federated authentication user (Workload), specify the value of ``USER`` in this field.
       *Enum*: ``NONE``, ``IDP_GROUP``, ``USER``
       *Default*: ``NONE``
     - false

   * -  ``passwordSecretRef``
     - object
     - ``PasswordSecret`` is a reference to the Secret keeping the user password.
     - false

   * -  ``projectRef``
     - object
     - ``projectRef`` is a reference to the parent ``AtlasProject`` resource.
       Mutually exclusive with the "``externalProjectRef``" field.
     - false

   * -  ``scopes``
     - []object
     - Scopes is an array of clusters and Atlas Data Lakes that this user has access to.
     - false

   * -  ``x509Type``
     - enum
     - X509Type is X.509 method by which the database authenticates the provided username.
       *Enum*: ``NONE``, ``MANAGED``, ``CUSTOMER``
       *Default*: ``NONE``
     - false

.. _atlasdatabaseuser-spec-roles: 

AtlasDatabaseUser.spec.roles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

RoleSpec allows the user to perform particular actions on the specified database.
A role on the admin database can include privileges that apply to the other databases as well.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``databaseName``
     - string
     - ``DatabaseName`` is a database on which the user has the specified role. A role on the admin database can include
       privileges that apply to the other databases.
     - true

   * -  ``roleName``
     - string
     - ``RoleName`` is a name of the role. This value can either be a built-in role or a custom role.
     - true

   * -  ``collectionName``
     - string
     - ``CollectionName`` is a collection for which the role applies.
     - false

.. _atlasdatabaseuser-spec-connectionsecret: 

AtlasDatabaseUser.spec.connectionSecret
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasdatabaseuser-spec-externalprojectref: 

AtlasDatabaseUser.spec.externalProjectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasdatabaseuser-spec-labels: 

AtlasDatabaseUser.spec.labels
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasdatabaseuser-spec-passwordsecretref: 

AtlasDatabaseUser.spec.passwordSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

PasswordSecret is a reference to the Secret keeping the user password.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name is the ``name`` of the Kubernetes Resource
     - true

.. _atlasdatabaseuser-spec-projectref: 

AtlasDatabaseUser.spec.projectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasdatabaseuser-spec-scopes: 

AtlasDatabaseUser.spec.scopes
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ScopeSpec if present a database user only have access to the indicated resource (Cluster or Atlas Data Lake)
if none is given then it has access to all.
It's highly recommended to restrict the access of the database users only to a limited set of resources.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name is a ``name`` of the cluster or Atlas Data Lake that the user has access to.
     - true

   * -  ``type``
     - enum
     - Type is a ``type`` of resource that the user has access to.
       *Enum*: ``CLUSTER``, ``DATA_LAKE``
     - true

.. _atlasdatabaseuser-status: 

AtlasDatabaseUser.status
~~~~~~~~~~~~~~~~~~~~~~~~

AtlasDatabaseUserStatus defines the observed state of AtlasProject

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

   * -  ``name``
     - string
     - ``UserName`` is the current ``name`` of database user.
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification of which the Atlas Operator is aware.
       The Atlas Operator updates this field to the value of 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

   * -  ``passwordVersion``
     - string
     - ``PasswordVersion`` is the '``ResourceVersion``' of the password Secret that the Atlas Operator is aware of
     - false

.. _atlasdatabaseuser-status-conditions: 

AtlasDatabaseUser.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
