Atlas Functions are defined in a sub-directory of your application's
``/functions`` directory. Each function maps to its own subdirectory
with the same name as the function.

Each function is configured in ``config.json`` and has its source code
defined in ``source.js``.

.. code-block:: none
   :copyable: False
   
   yourRealmApp/
   └── functions/
       └── <function name>/
           ├── config.json
           └── source.js

Configuration
~~~~~~~~~~~~~

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
     "run_as_user_id_script_source": "<Function Source Code>"
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
     - If ``true``, this function may only be accessed from
       HTTPS endpoints, rules, and named functions.
   
   * - | ``can_evaluate``
       | Document
     - A :ref:`rule expression <expressions>` that evaluates to ``true`` when
       the function is allowed to execute in response to a given request.
   
   * - | ``disable_arg_logs``
       | Boolean
     - If ``true``, App Services omits the arguments provided to a function
       from the :ref:`function execution log entry <logs-function>`.
   
   * - | ``run_as_system``
       | Boolean
     - If ``true``, this function :ref:`runs as the system user
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
       function is called and returns the unique ID of a :doc:`App Services
       User </users>` that the function executes as. Cannot be used with
       ``run_as_user_id``.

Source Code
~~~~~~~~~~~

.. code-block:: javascript
   :caption: source.js

   exports = function() {
     // function code
   };
