.. _atlasstreaminstance: 

AtlasStreamInstance
-------------------

AtlasStreamInstance is the Schema for the atlasstreaminstances API

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
     - ``AtlasStreamInstance``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasStreamInstanceSpec`` defines the target state of ``AtlasStreamInstance``.
     - false

   * -  ``status``
     - object
     - ``AtlasStreamInstanceStatus`` defines the observed state of ``AtlasStreamInstance``.
     - false

.. _atlasstreaminstance-spec: 

AtlasStreamInstance.spec
~~~~~~~~~~~~~~~~~~~~~~~~

AtlasStreamInstanceSpec defines the target state of AtlasStreamInstance.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``clusterConfig``
     - object
     - The configuration to be used to connect to an Atlas Cluster.
     - true

   * -  ``name``
     - string
     - Human-readable label that identifies the stream connection.
     - true

   * -  ``projectRef``
     - object
     - Project which the instance belongs to.
     - true

   * -  ``connectionRegistry``
     - []object
     - List of connections of the stream instance for the specified project.
     - false

.. _atlasstreaminstance-spec-clusterconfig: 

AtlasStreamInstance.spec.clusterConfig
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The configuration to be used to connect to an Atlas Cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``provider``
     - enum
     - Name of the cluster configured for this connection.
       *Enum*: ``AWS``, ``GCP``, ``AZURE``, ``TENANT``, ``SERVERLESS``
       *Default*: ``AWS``
     - true

   * -  ``region``
     - string
     - Name of the cloud provider ``region`` hosting Atlas Stream Processing.
     - true

   * -  ``tier``
     - enum
     - Selected ``tier`` for the Stream Instance. Configures Memory / ``VCPU`` allowances.
       *Enum*: ``SP10``, ``SP30``, ``SP50``
       *Default*: ``SP10``
     - true

.. _atlasstreaminstance-spec-projectref: 

AtlasStreamInstance.spec.projectRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Project which the instance belongs to.

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

.. _atlasstreaminstance-spec-connectionregistry: 

AtlasStreamInstance.spec.connectionRegistry
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

ResourceRefNamespaced is a reference to a Kubernetes Resource that allows to configure the namespace

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

.. _atlasstreaminstance-status: 

AtlasStreamInstance.status
~~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasStreamInstanceStatus defines the observed state of AtlasStreamInstance.

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

   * -  ``connections``
     - []object
     - List of ``connections`` configured in the stream instance.
     - false

   * -  ``hostnames``
     - []string
     - List that contains the ``hostnames`` assigned to the stream instance.
     - false

   * -  ``id``
     - string
     - Unique 24-hexadecimal character string that identifies the instance
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification of which the Atlas Operator is aware.
       The Atlas Operator updates this field to the value of 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

.. _atlasstreaminstance-status-conditions: 

AtlasStreamInstance.status.conditions
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

.. _atlasstreaminstance-status-connections: 

AtlasStreamInstance.status.connections
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that uniquely identifies the stream connection
     - false

   * -  ``resourceRef``
     - object
     - Reference for the resource that contains connection configuration
     - false

.. _atlasstreaminstance-status-connections-resourceref: 

AtlasStreamInstance.status.connections.resourceRef
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference for the resource that contains connection configuration

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
