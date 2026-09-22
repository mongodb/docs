.. _atlasstreamconnection: 

AtlasStreamConnection
---------------------

AtlasStreamConnection is the Schema for the atlasstreamconnections API

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
     - ``AtlasStreamConnection``
     - true

   * -  ``metadata``
     - object
     - Refer to the Kubernetes ``API`` documentation for the fields of the ``metadata`` field.
     - true

   * -  ``spec``
     - object
     - ``AtlasStreamConnectionSpec`` defines the target state of ``AtlasStreamConnection``.
     - false

   * -  ``status``
     - object
     - ``AtlasStreamConnectionStatus`` defines the observed state of ``AtlasStreamConnection``.
     - false

.. _atlasstreamconnection-spec: 

AtlasStreamConnection.spec
~~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasStreamConnectionSpec defines the target state of AtlasStreamConnection.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Human-readable label that uniquely identifies the stream connection.
     - true

   * -  ``type``
     - enum
     - Type of the connection. Can be either Cluster or Kafka.
       *Enum*: Kafka, Cluster, Sample
     - true

   * -  ``clusterConfig``
     - object
     - The configuration to be used to connect to an Atlas Cluster.
     - false

   * -  ``kafkaConfig``
     - object
     - The configuration to be used to connect to a Kafka Cluster.
     - false

.. _atlasstreamconnection-spec-clusterconfig: 

AtlasStreamConnection.spec.clusterConfig
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The configuration to be used to connect to an Atlas Cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - Name of the cluster configured for this connection.
     - true

   * -  ``role``
     - object
     - The name of a built-in or Custom ``DB`` Role to connect to an Atlas Cluster.
     - true

.. _atlasstreamconnection-spec-clusterconfig-role: 

AtlasStreamConnection.spec.clusterConfig.role
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The name of a built-in or Custom DB Role to connect to an Atlas Cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``name``
     - string
     - The ``name`` of the role to use. Can be a built-in role or a custom role.
     - true

   * -  ``type``
     - enum
     - Type of the ``DB`` role. Can be either ``BUILT_IN`` or ``CUSTOM``.
       *Enum*: ``BUILT_IN``, ``CUSTOM``
     - true

.. _atlasstreamconnection-spec-kafkaconfig: 

AtlasStreamConnection.spec.kafkaConfig
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

The configuration to be used to connect to a Kafka Cluster.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``authentication``
     - object
     - User credentials required to connect to a Kafka Cluster. Includes the ``authentication`` type, as well as the parameters for that ``authentication`` mode.
     - true

   * -  ``bootstrapServers``
     - string
     - Comma separated list of server addresses
     - true

   * -  ``security``
     - object
     - Properties for the secure transport connection to Kafka. For ``SSL``, this can include the trusted certificate to use.
     - true

   * -  ``config``
     - map[string]string
     - A map of Kafka key-value pairs for optional configuration. This is a flat object, and keys can have '.' characters.
     - false

.. _atlasstreamconnection-spec-kafkaconfig-authentication: 

AtlasStreamConnection.spec.kafkaConfig.authentication
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

User credentials required to connect to a Kafka Cluster. Includes the authentication type, as well as the parameters for that authentication mode.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``credentials``
     - object
     - Reference to the secret containing th Username and Password of the account to connect to the Kafka cluster.
     - true

   * -  ``mechanism``
     - enum
     - Style of authentication. Can be one of ``PLAIN``, ``SCRAM``-256, or ``SCRAM``-512.
       *Enum*: ``PLAIN``, ``SCRAM``-256, ``SCRAM``-512
     - true

.. _atlasstreamconnection-spec-kafkaconfig-authentication-credentials: 

AtlasStreamConnection.spec.kafkaConfig.authentication.credentials
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Reference to the secret containing th Username and Password of the account to connect to the Kafka cluster.

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

.. _atlasstreamconnection-spec-kafkaconfig-security: 

AtlasStreamConnection.spec.kafkaConfig.security
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Properties for the secure transport connection to Kafka. For SSL, this can include the trusted certificate to use.

.. list-table::
   :header-rows: 1
   :widths: 25 10 65 10

   * -  ``Name``
     - Type
     - Description
     - Required

   * -  ``protocol``
     - enum
     - Describes the transport type. Can be either ``PLAINTEXT`` or ``SSL``.
       *Enum*: ``PLAINTEXT``, ``SSL``
     - true

   * -  ``certificate``
     - object
     - A trusted, public x509 ``certificate`` for connecting to Kafka over ``SSL``.
     - false

.. _atlasstreamconnection-spec-kafkaconfig-security-certificate: 

AtlasStreamConnection.spec.kafkaConfig.security.certificate
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

A trusted, public x509 certificate for connecting to Kafka over SSL.

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

.. _atlasstreamconnection-status: 

AtlasStreamConnection.status
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

AtlasStreamConnectionStatus defines the observed state of AtlasStreamConnection.

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

   * -  ``instances``
     - []object
     - List of ``instances`` using the connection configuration
     - false

   * -  ``observedGeneration``
     - integer
     - ``ObservedGeneration`` indicates the generation of the resource specification of which the Atlas Operator is aware.
       The Atlas Operator updates this field to the value of 'metadata.generation' as soon as it starts reconciliation of the resource.
       *Format*: int64
     - false

.. _atlasstreamconnection-status-conditions: 

AtlasStreamConnection.status.conditions
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

.. _atlasstreamconnection-status-instances: 

AtlasStreamConnection.status.instances
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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
