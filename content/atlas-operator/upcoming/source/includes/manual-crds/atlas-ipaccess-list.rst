.. _atlasipaccesslist: 

AtlasIPAccessList
-----------------

AtlasIPAccessList is the Schema for the atlasipaccesslists API.

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
     - ``AtlasIPAccessList``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasIPAccessListSpec`` defines the desired state of ``AtlasIPAccessList``.
       *Validations*:

       - (has(self.``externalProjectRef``) && !has(self.``projectRef``)) || (!has(self.``externalProjectRef``) && has(self.``projectRef``)): must define only one project reference through ``externalProjectRef`` or ``projectRef``

       - (has(self.``externalProjectRef``) && has(self.``connectionSecret``)) || !has(self.``externalProjectRef``): must define a local connection secret when referencing an external project
     - false

   * -  ``status``
     - object
     - ``AtlasIPAccessListStatus`` is the most recent observed ``status`` of the ``AtlasIPAccessList`` cluster. Read-only.
     - false

.. _atlasipaccesslist-spec: 

AtlasIPAccessList.spec
~~~~~~~~~~~~~~~~~~~~~~

AtlasIPAccessListSpec defines the desired state of AtlasIPAccessList.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``entries``
     - []object
     - Entries is the list of ``IP`` Access to be managed.
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

.. _atlasipaccesslist-spec-entries: 

AtlasIPAccessList.spec.entries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``awsSecurityGroup``
     - string
     - Unique identifier of ``AWS`` security group in this access list entry.
     - false

   * -  ``cidrBlock``
     - string
     - Range of ``IP`` addresses in ``CIDR`` notation in this access list entry.
     - false

   * -  ``comment``
     - string
     - Comment associated with this access list entry.
     - false

   * -  ``deleteAfterDate``
     - string
     - Date and time after which Atlas deletes the temporary access list entry.
       *Format*: date-time
     - false

   * -  ``ipAddress``
     - string
     - Entry using an ``IP`` address in this access list entry.
     - false

.. _atlasipaccesslist-spec-connectionsecret: 

AtlasIPAccessList.spec.connectionSecret
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

.. _atlasipaccesslist-spec-externalprojectref: 

AtlasIPAccessList.spec.externalProjectRef
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

.. _atlasipaccesslist-spec-projectref: 

AtlasIPAccessList.spec.projectRef
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

.. _atlasipaccesslist-status: 

AtlasIPAccessList.status
~~~~~~~~~~~~~~~~~~~~~~~~

AtlasIPAccessListStatus is the most recent observed status of the AtlasIPAccessList cluster. Read-only.

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

   * -  ``entries``
     - []object
     - Status is the state of the ip access list
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification that the Atlas Operator is aware of.
       The Atlas Operator updates this field to the 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

.. _atlasipaccesslist-status-conditions: 

AtlasIPAccessList.status.conditions
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
     - Status of the condition, one of True, False, Unknown.
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
     - A human readable ``message`` indicating details about the transition.
     - false

   * -  ``reason``
     - string
     - The ``reason`` for the condition's last transition.
     - false

.. _atlasipaccesslist-status-entries: 

AtlasIPAccessList.status.entries
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``entry``
     - string
     - Entry is the ip access Atlas is managing
     - true

   * -  ``status``
     - string
     - Status is the correspondent state of the entry
     - true
