.. _atlascustomrole: 

AtlasCustomRole
---------------

AtlasCustomRole is the Schema for the AtlasCustomRole API

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
     - ``AtlasCustomRole``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasCustomRoleSpec`` defines the target state of ``CustomRole`` in Atlas.
       *Validations*:

       - (has(self.``externalProjectRef``) && !has(self.``projectRef``)) || (!has(self.``externalProjectRef``) && has(self.``projectRef``)): must define only one project reference through ``externalProjectRef`` or ``projectRef``

       - (has(self.``externalProjectRef``) && has(self.``connectionSecret``)) || !has(self.``externalProjectRef``): must define a local connection secret when referencing an external project
     - false

   * -  ``status``
     - object
     - ``AtlasCustomRoleStatus`` is a ``status`` for the ``AtlasCustomRole`` Custom resource.
       Not the one included in the ``AtlasProject``
     - false

.. _atlascustomrole-spec: 

AtlasCustomRole.spec
~~~~~~~~~~~~~~~~~~~~

AtlasCustomRoleSpec defines the target state of CustomRole in Atlas.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``role``
     - object
     - Role represents a Custom Role in Atlas.
     - true

   * -  ``connectionSecret``
     - object
     - Name of the secret containing Atlas ``API`` private and public keys.
     - false

   * -  ``externalProjectRef``
     - object
     - ``externalProjectRef`` holds the parent Atlas project ``ID``.
       Mutually exclusive with the "``projectRef``" field.
     - false

   * -  ``projectRef``
     - object
     - ``projectRef`` is a reference to the parent ``AtlasProject`` resource.
       Mutually exclusive with the "``externalProjectRef``" field.
     - false

.. _atlascustomrole-spec-role: 

AtlasCustomRole.spec.role
~~~~~~~~~~~~~~~~~~~~~~~~~

Role represents a Custom Role in Atlas.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that identifies the role. This ``name`` must be unique for this custom role in this project.
     - true

   * -  ``actions``
     - []object
     - List of the individual privilege ``actions`` that the role grants.
     - false

   * -  ``inheritedRoles``
     - []object
     - List of the built-in roles that this custom role inherits.
     - false

.. _atlascustomrole-spec-role-actions: 

AtlasCustomRole.spec.role.actions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that identifies the privilege action.
     - true

   * -  ``resources``
     - []object
     - List of ``resources`` on which you grant the action.
     - true

.. _atlascustomrole-spec-role-actions-resources: 

AtlasCustomRole.spec.role.actions.resources
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``cluster``
     - boolean
     - Flag that indicates whether to grant the action on the ``cluster`` resource. If true, ``MongoDB`` Cloud ignores Database and Collection parameters.
     - false

   * -  ``collection``
     - string
     - Human-readable label that identifies the ``collection`` on which you grant the action to one ``MongoDB`` user.
     - false

   * -  ``database``
     - string
     - Human-readable label that identifies the ``database`` on which you grant the action to one ``MongoDB`` user.
     - false

.. _atlascustomrole-spec-role-inheritedroles: 

AtlasCustomRole.spec.role.inheritedRoles
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``database``
     - string
     - Human-readable label that identifies the ``database`` on which someone grants the action to one ``MongoDB`` user.
     - true

   * -  ``name``
     - string
     - Human-readable label that identifies the role inherited.
     - true

.. _atlascustomrole-spec-connectionsecret: 

AtlasCustomRole.spec.connectionSecret
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

.. _atlascustomrole-spec-externalprojectref: 

AtlasCustomRole.spec.externalProjectRef
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

.. _atlascustomrole-spec-projectref: 

AtlasCustomRole.spec.projectRef
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

.. _atlascustomrole-status: 

AtlasCustomRole.status
~~~~~~~~~~~~~~~~~~~~~~

AtlasCustomRoleStatus is a status for the AtlasCustomRole Custom resource.
Not the one included in the AtlasProject

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

.. _atlascustomrole-status-conditions: 

AtlasCustomRole.status.conditions
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
