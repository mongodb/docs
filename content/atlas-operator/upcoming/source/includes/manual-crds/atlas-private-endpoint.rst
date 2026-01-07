.. _atlasprivateendpoint: 

AtlasPrivateEndpoint
--------------------

The AtlasPrivateEndpoint custom resource definition (CRD) defines a desired `Private Endpoint <https://www.mongodb.com/docs/atlas/security-private-endpoint/#std-label-private-endpoint-overview>`__ configuration for an Atlas project.
It allows a private connection between your cloud provider and Atlas that doesn't send information through a public network.

You can use private endpoints to create a unidirectional connection to Atlas clusters from your virtual network.

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
     - ``AtlasPrivateEndpoint``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasPrivateEndpointSpec`` is the specification of the desired configuration of a project private endpoint
       *Validations*:

       - (has(self.``externalProjectRef``) && !has(self.``projectRef``)) || (!has(self.``externalProjectRef``) && has(self.``projectRef``)): must define only one project reference through ``externalProjectRef`` or ``projectRef``

       - (has(self.``externalProjectRef``) && has(self.``connectionSecret``)) || !has(self.``externalProjectRef``): must define a local connection secret when referencing an external project
     - false

   * -  ``status``
     - object
     - ``AtlasPrivateEndpointStatus`` is the most recent observed ``status`` of the ``AtlasPrivateEndpoint`` cluster. Read-only.
     - false

.. _atlasprivateendpoint-spec: 

AtlasPrivateEndpoint.spec
~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasPrivateEndpointSpec is the specification of the desired configuration of a project private endpoint

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``provider``
     - enum
     - Name of the cloud service ``provider`` for which you want to create the private endpoint service.
       *Enum*: ``AWS``, ``GCP``, ``AZURE``
     - true

   * -  ``region``
     - string
     - Region of the chosen cloud provider in which you want to create the private endpoint service.
     - true

   * -  ``awsConfiguration``
     - []object
     - AWSConfiguration is the specific ``AWS`` settings for the private endpoint.
     - false

   * -  ``azureConfiguration``
     - []object
     - ``AzureConfiguration`` is the specific Azure settings for the private endpoint.
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
     - []object
     - GCPConfiguration is the specific Google Cloud settings for the private endpoint.
     - false

   * -  ``projectRef``
     - object
     - ``projectRef`` is a reference to the parent ``AtlasProject`` resource.
       Mutually exclusive with the "``externalProjectRef``" field.
     - false

.. _atlasprivateendpoint-spec-awsconfiguration: 

AtlasPrivateEndpoint.spec.awsConfiguration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AWSPrivateEndpointConfiguration holds the AWS configuration done on customer network.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``id``
     - string
     - ``ID`` that identifies the private endpoint's network interface that someone added to this private endpoint service.
     - true

.. _atlasprivateendpoint-spec-azureconfiguration: 

AtlasPrivateEndpoint.spec.azureConfiguration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AzurePrivateEndpointConfiguration holds the Azure configuration done on customer network.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``id``
     - string
     - ``ID`` that identifies the private endpoint's network interface that someone added to this private endpoint service.
     - true

   * -  ``ipAddress``
     - string
     - ``IP`` address of the private endpoint in your Azure VNet that someone added to this private endpoint service.
     - true

.. _atlasprivateendpoint-spec-connectionsecret: 

AtlasPrivateEndpoint.spec.connectionSecret
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasprivateendpoint-spec-externalprojectref: 

AtlasPrivateEndpoint.spec.externalProjectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasprivateendpoint-spec-gcpconfiguration: 

AtlasPrivateEndpoint.spec.gcpConfiguration
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

GCPPrivateEndpointConfiguration holds the GCP configuration done on customer network.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``endpoints``
     - []object
     - Endpoints is the list of individual private ``endpoints`` that comprise this endpoint group.
     - true

   * -  ``groupName``
     - string
     - ``GroupName`` is the label that identifies a set of endpoints.
     - true

   * -  ``projectId``
     - string
     - ``ProjectID`` that identifies the Google Cloud project in which you created the endpoints.
     - true

.. _atlasprivateendpoint-spec-gcpconfiguration-endpoints: 

AtlasPrivateEndpoint.spec.gcpConfiguration.endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

GCPPrivateEndpoint holds the GCP forwarding rules configured on customer network.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``ipAddress``
     - string
     - ``IP`` address to which this Google Cloud consumer forwarding rule resolves.
     - true

   * -  ``name``
     - string
     - Name that identifies the Google Cloud consumer forwarding rule that you created.
     - true

.. _atlasprivateendpoint-spec-projectref: 

AtlasPrivateEndpoint.spec.projectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasprivateendpoint-status: 

AtlasPrivateEndpoint.status
~~~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasPrivateEndpointStatus is the most recent observed status of the AtlasPrivateEndpoint cluster. Read-only.

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

   * -  ``endpoints``
     - []object
     - Endpoints are the status of the ``endpoints`` connected to the service
     - false

   * -  ``error``
     - string
     - Error is the description of the failure occurred when configuring the private endpoint
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification that the Atlas Operator is aware of.
       The Atlas Operator updates this field to the 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

   * -  ``resourceId``
     - string
     - ``ResourceID`` is the root-relative path that identifies of the Atlas Azure Private Link Service
     - false

   * -  ``serviceAttachmentNames``
     - []string
     - ``ServiceAttachmentNames`` is the list of URLs that identifies endpoints that Atlas can use to access one service across the private connection
     - false

   * -  ``serviceId``
     - string
     - ``ServiceID`` is the unique identifier of the private endpoint service in Atlas
     - false

   * -  ``serviceName``
     - string
     - ``ServiceName`` is the unique identifier of the Amazon Web Services (``AWS``) ``PrivateLink`` endpoint service or Azure Private Link Service managed by Atlas
     - false

   * -  ``serviceStatus``
     - string
     - ``ServiceStatus`` is the state of the private endpoint service
     - false

.. _atlasprivateendpoint-status-conditions: 

AtlasPrivateEndpoint.status.conditions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

.. _atlasprivateendpoint-status-endpoints: 

AtlasPrivateEndpoint.status.endpoints
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

EndpointInterfaceStatus is the most recent observed status the interfaces attached to the configured service. Read-only.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``ID``
     - string
     - ``ID`` is the external identifier set on the specification to configure the interface
     - false

   * -  ``InterfaceStatus``
     - string
     - ``InterfaceStatus`` is the state of the private endpoint interface
     - false

   * -  ``connectionName``
     - string
     - ``ConnectionName`` is the label that Atlas generates that identifies the Azure private endpoint connection
     - false

   * -  ``error``
     - string
     - Error is the description of the failure occurred when configuring the private endpoint
     - false

   * -  ``gcpForwardingRules``
     - []object
     - GCPForwardingRules is the status of the customer ``GCP`` private endpoint(forwarding rules)
     - false

.. _atlasprivateendpoint-status-endpoints-gcpforwardingrules: 

AtlasPrivateEndpoint.status.endpoints.gcpForwardingRules
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

GCPForwardingRule is the most recent observed status the GCP forwarding rules configured for an interface. Read-only.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     -  
     - false

   * -  ``status``
     - string
     -  
     - false
