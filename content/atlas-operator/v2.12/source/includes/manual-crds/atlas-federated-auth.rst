.. _atlasfederatedauth: 

AtlasFederatedAuth
------------------

AtlasFederatedAuth is the Schema for the Atlasfederatedauth API

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
     - ``AtlasFederatedAuth``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasFederatedAuthSpec`` defines the target state of ``AtlasFederatedAuth``.
     - false

   * -  ``status``
     - object
     - ``AtlasFederatedAuthStatus`` defines the observed state of ``AtlasFederatedAuth``.
     - false

.. _atlasfederatedauth-spec: 

AtlasFederatedAuth.spec
~~~~~~~~~~~~~~~~~~~~~~~

AtlasFederatedAuthSpec defines the target state of AtlasFederatedAuth.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``connectionSecretRef``
     - object
     - Connection secret with ``API`` credentials for configuring the federation.
       These credentials must have ``OrganizationOwner`` permissions.
     - false

   * -  ``dataAccessIdentityProviders``
     - []string
     - The collection of unique ids representing the identity providers that can be used for data access in this organization.
       Currently connected data access identity providers missing from this field will be disconnected.
     - false

   * -  ``domainAllowList``
     - []string
     - Approved domains that restrict users who can join the organization based on their email address.
     - false

   * -  ``domainRestrictionEnabled``
     - boolean
     - Prevent users in the federation from accessing organizations outside the federation, and creating new organizations.
       This option applies to the entire federation.
       See more information at https://www.mongodb.com/docs/atlas/security/federation-advanced-options/#restrict-user-membership-to-the-federation
       *Default*: false
     - false

   * -  ``enabled``
     - boolean
     - *Default*: false
     - false

   * -  ``postAuthRoleGrants``
     - []string
     - Atlas roles that are granted to a user in this organization after authenticating.
     - false

   * -  ``roleMappings``
     - []object
     - Map ``IDP`` groups to Atlas roles.
     - false

   * -  ``ssoDebugEnabled``
     - boolean
     - *Default*: false
     - false

.. _atlasfederatedauth-spec-connectionsecretref: 

AtlasFederatedAuth.spec.connectionSecretRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Connection secret with API credentials for configuring the federation.
These credentials must have OrganizationOwner permissions.

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

.. _atlasfederatedauth-spec-rolemappings: 

AtlasFederatedAuth.spec.roleMappings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

RoleMapping maps an external group from an identity provider to roles within Atlas.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``externalGroupName``
     - string
     - ``ExternalGroupName`` is the name of the ``IDP`` group to which this mapping applies.
     - false

   * -  ``roleAssignments``
     - []object
     - ``RoleAssignments`` define the roles within projects that should be given to members of the group.
     - false

.. _atlasfederatedauth-spec-rolemappings-roleassignments: 

AtlasFederatedAuth.spec.roleMappings.roleAssignments
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``projectName``
     - string
     - The Atlas project in the same org in which the role should be given.
     - false

   * -  ``role``
     - enum
     - The ``role`` in Atlas that should be given to group members.
       *Enum*: ``ORG_MEMBER``, ``ORG_READ_ONLY``, ``ORG_BILLING_ADMIN``, ``ORG_GROUP_CREATOR``, ``ORG_OWNER``, ``ORG_BILLING_READ_ONLY``, ``GROUP_OWNER``, ``GROUP_READ_ONLY``, ``GROUP_DATA_ACCESS_ADMIN``, ``GROUP_DATA_ACCESS_READ_ONLY``, ``GROUP_DATA_ACCESS_READ_WRITE``, ``GROUP_CLUSTER_MANAGER``, ``GROUP_SEARCH_INDEX_EDITOR``, ``GROUP_DATABASE_ACCESS_ADMIN``, ``GROUP_BACKUP_MANAGER``, ``GROUP_STREAM_PROCESSING_OWNER``, ``ORG_STREAM_PROCESSING_ADMIN``, ``GROUP_OBSERVABILITY_VIEWER``
     - false

.. _atlasfederatedauth-status: 

AtlasFederatedAuth.status
~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasFederatedAuthStatus defines the observed state of AtlasFederatedAuth.

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

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification of which the Atlas Operator is aware.
       The Atlas Operator updates this field to the value of 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

.. _atlasfederatedauth-status-conditions: 

AtlasFederatedAuth.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
