.. _atlasnetworkcontainer: 

AtlasNetworkContainer
---------------------

AtlasNetworkContainer is the Schema for the AtlasNetworkContainer API

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
     - ``AtlasNetworkContainer``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasNetworkContainerSpec`` defines the target state of an ``AtlasNetworkContainer``.
       *Validations*:

       - (has(self.``externalProjectRef``) && !has(self.``projectRef``)) || (!has(self.``externalProjectRef``) && has(self.``projectRef``)): must define only one project reference through ``externalProjectRef`` or ``projectRef``

       - (has(self.``externalProjectRef``) && has(self.``connectionSecret``)) || !has(self.``externalProjectRef``): must define a local connection secret when referencing an external project

       - (self.provider == '``GCP``' && !has(self.region)) || (self.provider != '``GCP``'): must not set region for ``GCP`` containers

       - ((self.provider == '``AWS``' || self.provider == '``AZURE``') && has(self.region)) || (self.provider == '``GCP``'): must set region for ``AWS`` and Azure containers

       - (self.id == ``oldSelf``.id) || (!has(self.id) && !has(``oldSelf``.id)): id is immutable

       - (self.region == ``oldSelf``.region) || (!has(self.region) && !has(``oldSelf``.region)): region is immutable
     - false

   * -  ``status``
     - object
     - ``AtlasNetworkContainerStatus`` is a ``status`` for the ``AtlasNetworkContainer`` Custom resource.
       Not the one included in the ``AtlasProject``
     - false

.. _atlasnetworkcontainer-spec: 

AtlasNetworkContainer.spec
~~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasNetworkContainerSpec defines the target state of an AtlasNetworkContainer.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``provider``
     - enum
     - Provider is the name of the cloud ``provider`` hosting the network container.
       *Enum*: ``AWS``, ``GCP``, ``AZURE``
     - true

   * -  ``cidrBlock``
     - string
     - Atlas ``CIDR``. It needs to be set if ``ContainerID`` is not set.
     - false

   * -  ``connectionSecret``
     - object
     - Name of the secret containing Atlas ``API`` private and public keys.
     - false

   * -  ``externalProjectRef``
     - object
     - ``externalProjectRef`` holds the parent Atlas project ``ID``.
       Mutually exclusive with the "``projectRef``" field.
     - false

   * -  ``id``
     - string
     - ``ID`` is the container identifier for an already existent network container to be managed by the operator.
       This field can be used in conjunction with ``cidrBlock`` to update the ``cidrBlock`` of an existing container.
       This field is immutable.
     - false

   * -  ``projectRef``
     - object
     - ``projectRef`` is a reference to the parent ``AtlasProject`` resource.
       Mutually exclusive with the "``externalProjectRef``" field.
     - false

   * -  ``region``
     - string
     - ``ContainerRegion`` is the provider ``region`` name of Atlas network peer container in Atlas ``region`` format
       This is required by ``AWS`` and Azure, but not used by ``GCP``.
       This field is immutable, Atlas does not admit network container changes.
     - false

.. _atlasnetworkcontainer-spec-connectionsecret: 

AtlasNetworkContainer.spec.connectionSecret
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasnetworkcontainer-spec-externalprojectref: 

AtlasNetworkContainer.spec.externalProjectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasnetworkcontainer-spec-projectref: 

AtlasNetworkContainer.spec.projectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasnetworkcontainer-status: 

AtlasNetworkContainer.status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasNetworkContainerStatus is a status for the AtlasNetworkContainer Custom resource.
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

   * -  ``id``
     - string
     - ``ID`` record the identifier of the container in Atlas
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification of which the Atlas Operator is aware.
       The Atlas Operator updates this field to the value of 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

   * -  ``provisioned``
     - boolean
     - Provisioned is true when clusters have been deployed to the container before
       the last reconciliation
     - false

.. _atlasnetworkcontainer-status-conditions: 

AtlasNetworkContainer.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
