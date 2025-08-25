:doc:`Triggers </triggers>` are defined in your application's
``/triggers`` directory.

Each trigger is defined in its own JSON file with the same name as the
trigger.

.. code-block:: none
   :copyable: False
   
   yourRealmApp/
   └── triggers/
       └── <trigger name>.json

Configuration
~~~~~~~~~~~~~

.. code-block:: json
   :caption: <trigger name>.json
   
   {
     "id": "<Trigger ID>",
     "name": "<Trigger Name>",
     "type": "<Trigger Type>",
     "function_name": "<Trigger Function Name>",
     "config": {
       "<Configuration Option>": <Configuration Value>
     },
     "disabled": <Boolean>,
   }

.. list-table::
   :widths: 10 30
   :header-rows: 1

   * - Field
     - Description

   * - | ``id``
       | String
     - A string that uniquely identifies the Trigger. Atlas App Services
       automatically generates a unique ID for a trigger when you create
       it.

   * - | ``name``
       | String
     - The name of the Trigger. The name may be at most 64 characters
       long and can only contain ASCII letters, numbers, underscores,
       and hyphens.

   * - | ``type``
       | String
     - The :doc:`type </triggers>` of application event that the trigger
       listens for.
       
       Valid Options:
       
       - ``"DATABASE"``
       - ``"AUTHENTICATION"``
       - ``"SCHEDULED"``

   * - | ``function_name``
       | String
     - The name of the Atlas Function that the Trigger
       executes whenever it fires. The Trigger automatically passes
       arguments to the function depending on the Trigger ``type``.

   * - | ``config``
       | Document
     - A document with fields that map to additional configuration
       options for the trigger. The exact configuration fields depend on
       the trigger ``type``.
       
       - :ref:`Database Trigger Configuration <config-database-trigger>`
       - :ref:`Authentication Trigger Configuration <config-authentication-trigger>`
       - :ref:`Scheduled Trigger Configuration <config-scheduled-trigger>`

   * - | ``disabled``
       | Boolean
     - If ``true``, the trigger will not listen for any events and will
       not fire.
