.. _atlasnetworkpeering: 

AtlasNetworkPeering
-------------------

AtlasNetworkPeering is the Schema for the AtlasNetworkPeering API

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
     - ``AtlasNetworkPeering``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasNetworkPeeringSpec`` defines the desired state of ``AtlasNetworkPeering``
       *Validations*:

       - (has(self.``externalProjectRef``) && !has(self.``projectRef``)) || (!has(self.``externalProjectRef``) && has(self.``projectRef``)): must define only one project reference through ``externalProjectRef`` or ``projectRef``

       - (has(self.``externalProjectRef``) && has(self.``connectionSecret``)) || !has(self.``externalProjectRef``): must define a local connection secret when referencing an external project

       - (has(self.``containerRef``.name) && !has(self.``containerRef``.id)) || (!has(self.``containerRef``.name) && has(self.``containerRef``.id)): must either have a container Atlas id or Kubernetes name, but not both (or neither)

       - (self.``containerRef``.name == ``oldSelf``.``containerRef``.name) || (!has(self.``containerRef``.name) && !has(``oldSelf``.``containerRef``.name)): container ref name is immutable

       - (self.``containerRef``.id == ``oldSelf``.``containerRef``.id) || (!has(self.``containerRef``.id) && !has(``oldSelf``.``containerRef``.id)): container ref id is immutable

       - (self.id == ``oldSelf``.id) || (!has(self.id) && !has(``oldSelf``.id)): id is immutable
     - false

   * -  ``status``
     - object
     - ``AtlasNetworkPeeringStatus`` is a ``status`` for the ``AtlasNetworkPeering`` Custom resource.
       Not the one included in the ``AtlasProject``
     - false

.. _atlasnetworkpeering-spec: 

AtlasNetworkPeering.spec
~~~~~~~~~~~~~~~~~~~~~~~~

AtlasNetworkPeeringSpec defines the desired state of AtlasNetworkPeering

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``containerRef``
     - object
     - ``ContainerDualReference`` refers to a Network Container either by Kubernetes name or Atlas ``ID``.
     - true

   * -  ``provider``
     - enum
     - Name of the cloud service ``provider`` for which you want to create the network peering service.
       *Enum*: ``AWS``, ``GCP``, ``AZURE``
     - true

   * -  ``awsConfiguration``
     - object
     - AWSConfiguration is the specific ``AWS`` settings for network peering.
     - false

   * -  ``azureConfiguration``
     - object
     - ``AzureConfiguration`` is the specific Azure settings for network peering.
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

   * -  ``gcpConfiguration``
     - object
     - GCPConfiguration is the specific Google Cloud settings for network peering.
     - false

   * -  ``id``
     - string
     - ``ID`` is the peering identifier for an already existent network peering to be managed by the operator.
       This field is immutable.
     - false

   * -  ``projectRef``
     - object
     - ``projectRef`` is a reference to the parent ``AtlasProject`` resource.
       Mutually exclusive with the "``externalProjectRef``" field.
     - false

.. _atlasnetworkpeering-spec-containerref: 

AtlasNetworkPeering.spec.containerRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ContainerDualReference refers to a Network Container either by Kubernetes name or Atlas ID.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``id``
     - string
     - ``ID`` is the Atlas identifier of the Network Container Atlas resource this Peering Connection relies on.
       Use either name or ``ID``, not both.
     - false

   * -  ``name``
     - string
     - Name of the container Kubernetes resource, must be present in the same namespace.
       Use either ``name`` or ``ID``, not both.
     - false

.. _atlasnetworkpeering-spec-awsconfiguration: 

AtlasNetworkPeering.spec.awsConfiguration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AWSConfiguration is the specific AWS settings for network peering.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``accepterRegionName``
     - string
     - ``AccepterRegionName`` is the provider region name of user's vpc in ``AWS`` native region format.
     - true

   * -  ``awsAccountId``
     - string
     - ``AccountID`` of the user's vpc.
     - true

   * -  ``routeTableCidrBlock``
     - string
     - User ``VPC`` ``CIDR``.
     - true

   * -  ``vpcId``
     - string
     - ``AWS`` ``VPC`` ``ID``.
     - true

.. _atlasnetworkpeering-spec-azureconfiguration: 

AtlasNetworkPeering.spec.azureConfiguration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AzureConfiguration is the specific Azure settings for network peering.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``azureDirectoryId``
     - string
     - ``AzureDirectoryID`` is the unique identifier for an Azure ``AD`` directory.
     - true

   * -  ``azureSubscriptionId``
     - string
     - ``AzureSubscriptionID`` is the unique identifier of the Azure subscription in which the VNet resides.
     - true

   * -  ``resourceGroupName``
     - string
     - ``ResourceGroupName`` is the name of your Azure resource group.
     - true

   * -  ``vNetName``
     - string
     - VNetName is name of your Azure VNet. Its applicable only for Azure.
     - true

.. _atlasnetworkpeering-spec-connectionsecret: 

AtlasNetworkPeering.spec.connectionSecret
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasnetworkpeering-spec-externalprojectref: 

AtlasNetworkPeering.spec.externalProjectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasnetworkpeering-spec-gcpconfiguration: 

AtlasNetworkPeering.spec.gcpConfiguration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

GCPConfiguration is the specific Google Cloud settings for network peering.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``gcpProjectId``
     - string
     - User ``GCP`` Project ``ID``. Its applicable only for ``GCP``.
     - true

   * -  ``networkName``
     - string
     - ``GCP`` Network Peer Name. Its applicable only for ``GCP``.
     - true

.. _atlasnetworkpeering-spec-projectref: 

AtlasNetworkPeering.spec.projectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasnetworkpeering-status: 

AtlasNetworkPeering.status
~~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasNetworkPeeringStatus is a status for the AtlasNetworkPeering Custom resource.
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

   * -  ``awsStatus``
     - object
     - AWSStatus contains ``AWS`` only related status information
     - false

   * -  ``azureStatus``
     - object
     - ``AzureStatus`` contains Azure only related status information
     - false

   * -  ``gcpStatus``
     - object
     - GCPStatus contains ``GCP`` only related status information
     - false

   * -  ``id``
     - string
     - ``ID`` recrods the identified of the peer created by Atlas
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification that the Atlas Operator is aware of.
       The Atlas Operator updates this field to the 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

   * -  ``status``
     - string
     - Status describes the last ``status`` seen for the network peering setup
     - false

.. _atlasnetworkpeering-status-conditions: 

AtlasNetworkPeering.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasnetworkpeering-status-awsstatus: 

AtlasNetworkPeering.status.awsStatus
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AWSStatus contains AWS only related status information

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``connectionId``
     - string
     - ``ConnectionID`` is the ``AWS`` ``VPC`` peering connection ``ID``
     - false

   * -  ``vpcId``
     - string
     - ``VpcID`` is ``AWS`` ``VPC`` id on the Atlas side
     - false

.. _atlasnetworkpeering-status-azurestatus: 

AtlasNetworkPeering.status.azureStatus
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AzureStatus contains Azure only related status information

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``azureSubscriptionIDpcId``
     - string
     - ``AzureSubscriptionID`` is Azure Subscription id on the Atlas side
     - false

   * -  ``vNetName``
     - string
     - ``VnetName`` is Azure network on the Atlas side
     - false

.. _atlasnetworkpeering-status-gcpstatus: 

AtlasNetworkPeering.status.gcpStatus
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

GCPStatus contains GCP only related status information

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``gcpProjectID``
     - string
     - GCPProjectID is ``GCP`` project on the Atlas side
     - false

   * -  ``networkName``
     - string
     - ``NetworkName`` is ``GCP`` network on the Atlas side
     - false
