:doc:`3rd party services </reference/services>` are defined in the ``/services``
directory. Each service maps to its own sub-directory with the same name as the
service.

Each service directory contains the following:

- ``config.json``: a service configuration file

- ``/rules``: a sub-directory of service rule configurations

- ``/incoming_webhooks``: a sub-directory of webhook configurations (if the
  service supports webhooks, i.e. HTTP, GitHub, or Twilio)

.. code-block:: none
   :copyable: False
   
   yourRealmApp/
   └── services/
       └── <services name>/
           ├── config.json
           ├── incoming_webhooks/
           │   ├── config.json
           │   └── source.js
           └── rules/
               └── <rule name>.json

.. _service-configuration-file:

Service Configuration
~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
   :caption: config.json

   {
     "id": "<Service ID>",
     "name": "<Service Name>",
     "type": "<Service Type>",
     "config": {
       "<Configuration Option>": <Configuration Value>
     },
     "secret_config": {
       "<Configuration Option>": "<Secret Name>"
     },
   }

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description
   
   * - | ``id``
       | String
     - A string that uniquely identifies the service. Atlas App Services
       automatically generates a unique ID for a service when you create
       it.
   
   * - | ``name``
       | String
     - The name of the service. The name may be at most 64 characters
       long and can only contain ASCII letters, numbers, underscores,
       and hyphens.
   
   * - | ``type``
       | String
     - The type of the service.
       
       Valid Options:
       
       - ``"http"``
       - ``"aws"``
       - ``"twilio"``
       - ``"github"``
       - ``"gcm"``
   
   * - | ``config``
       | Document
     - A document with fields that map to additional configuration
       options for the service. The exact configuration fields depend on
       the service ``type``.
       
       - :ref:`HTTP Service Configuration <http-service-configuration>`
       - :ref:`AWS Service Configuration <aws-service-configuration>`
       - :ref:`Twilio Service Configuration <twilio-service-configuration>`
       - :ref:`GitHub Service Configuration <github-service-configuration>`
   
   * - | ``secret_config``
       | Document
     - A document where each field name is a private configuration field
       for the service and the value of each field is the name of a
       :ref:`Secret <app-secret>` that stores the configuration value.

Service Rules
~~~~~~~~~~~~~

Rules for a specific external service are defined in the ``/<service
name>/rules`` sub-directory.

Each rule maps to its own JSON file with the same name as the rule.

.. code-block:: json
   :caption: <rule name>.json

   {
     "id": "<Rule ID>",
     "name": "<Rule Name>",
     "actions": ["<Service Action Name>"],
     "when": <JSON Rule Expression>
   }

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description
   
   * - | ``id``
       | String
     - A string that uniquely identifies the rule. App Services automatically
       generates a unique ID for a rule when you create it.
   
   * - | ``name``
       | String
     - The name of the service rule. The name may be at most 64
       characters long and can only contain ASCII letters, numbers,
       underscores, and hyphens.
   
   * - | ``actions``
       | Array<String>
     - A list of service actions that the rule applies to. The specific
       actions available depend on the service ``type``.
   
   * - | ``when``
       | Document
     - A :ref:`rule expression <expressions>` that evaluates to ``true`` when
       the rule applies to a given request.

Incoming Webhooks
~~~~~~~~~~~~~~~~~

Incoming webhooks for a specific service are defined in the
``/<service name>/incoming_webhooks/`` sub-directory.

Incoming webhooks use the :ref:`same configuration format as function
<legacy-appschema-functions>` but have additional configuration parameters.

Configuration
+++++++++++++

.. code-block:: json
   :caption: config.json
   
   {
     "id": "<Function ID>",
     "name": "<Function Name>",
     "private": <Boolean>,
     "can_evaluate": <Rule Expression>,
     "disable_arg_logs": <Boolean>,
     "run_as_system": <Boolean>,
     "run_as_user_id": "<App Services User ID>",
     "run_as_user_id_script_source": "<Function Source Code>",
     "respond_result": <Boolean>,
     "options": {
       "httpMethod": "<HTTP Method>",
       "validationMethod": "<Webhook Validation Method>",
       "secret": "<Webhook Secret>"
     }
   }

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description
   
   * - | ``id``
       | String
     - A value that uniquely identifies the function. App Services
       automatically generates a unique ID for a function when you
       create it.
   
   * - | ``name``
       | String
     - The name of the function. The name must be unique among all
       functions in your application.
   
   * - | ``private``
       | Boolean
     - If ``true``, this function may only be accessed from incoming
       webhooks, rules, and named functions.
   
   * - | ``can_evaluate``
       | Document
     - A :ref:`rule expression <expressions>` that evaluates to ``true`` if
       the function is allowed to execute in response to a given request.
   
   * - | ``disable_arg_logs``
       | Boolean
     - If ``true``, App Services omits the arguments provided to a function
       from the :ref:`function execution log entry <logs-function>`.
   
   * - | ``run_as_system``
       | Boolean
     - If ``true``, the webhook function :ref:`runs as the system user
       <system-functions>`. This overrides any values defined for
       ``run_as_user_id`` and ``run_as_user_id_script_source``.
   
   * - | ``run_as_user_id``
       | String
     - The unique ID of a :doc:`App Services User </users>` that the
       function always executes as. Cannot be used with
       ``run_as_user_id_script_source``.
   
   * - | ``run_as_user_id_script_source``
       | String
     - A stringified :doc:`function </functions>` that runs whenever the
       webhook is called and returns the unique ID of a :doc:`App Services
       User </users>` that the function executes as. Cannot be used with
       ``run_as_user_id``.
   
   * - | ``respond_result``
       | Boolean
     - If ``true``, App Services includes the webhook function return value as
       the body of the HTTP response it sends to the client that
       initiated the webhook request.
   
   * - | ``options``
       | Document
     - A document that contains configuration options for the webhook.

       .. code-block:: json

          {
            "httpMethod": "<HTTP Method>",
            "validationMethod": "<Webhook Validation Method>",
            "secret": "<Webhook Secret>"
          }

       .. list-table::
          :header-rows: 1
          :widths: 10 30

          * - Field
            - Description

          * - | ``httpMethod``
              | String
            - The HTTP method type that the webhook accepts. Incoming
              webhook requests must use this method.

          * - | ``validationMethod``
              | String
            - The name of the :ref:`request validation method
              <webhook-request-validation>` that the webhook uses.
              
              Valid options:
              
              - ``"VERIFY_PAYLOAD"``
              - ``"SECRET_AS_QUERY_PARAM"``
              - ``"NO_VALIDATION"``

          * - | ``secret``
              | String
            - The secret value used to :ref:`validate incoming webhook
              requests <webhook-request-validation>`.

Source Code
+++++++++++

.. code-block:: javascript
   :caption: source.js
   
   exports = function() {
     // webhook function code
   };
