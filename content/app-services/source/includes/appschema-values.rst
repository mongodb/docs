Values are defined in your application's ``/values`` directory.

Each value is defined in its own JSON file named after the value.

.. code-block:: text
   :copyable: False

   yourRealmApp/
   └── values/
       └── <value name>.json

Configuration
~~~~~~~~~~~~~

.. code-block:: json
   :caption: <value name>.json

   {
     "id": "<Value ID>",
     "name": "<Value Name>",
     "from_secret": <boolean>,
     "value": <Stored JSON Value|Secret Name>
   }

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description
   
   * - | ``id``
       | String
     - A string that uniquely identifies the value. Atlas App Services automatically
       generates a unique ID for a value when you create it.
   
   * - | ``name``
       | String
     - A unique name for the value. This name is how you refer to
       the value in functions and rules.
   
   * - | ``from_secret``
       | Boolean
     - Default: ``false``. If ``true``, the value exposes a
       :ref:`Secret <app-secret>` instead of a plain-text JSON value.
   
   * - | ``value``
       | String, Array, or Object
     - The stored data that App Services exposes when the value is referenced.
       
       If ``from_secret`` is ``false``, ``value`` can be a standard
       JSON string, array, or object.
       
       If ``from_secret`` is ``true``, ``value`` is a string that
       contains the name of the :ref:`Secret <app-secret>` that the
       value exposes.
