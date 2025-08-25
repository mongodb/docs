:ref:`Authentication providers <authentication-providers>`
are defined in your application's ``/auth_providers``
directory.

Each provider is defined in its own JSON file named after the provider.
For detailed information on configuring and using a specific
authentication provider, see that provider's reference page.

.. code-block:: none
   :copyable: False

   yourRealmApp/
   └── auth_providers/
       └── <provider name>.json

Configuration
~~~~~~~~~~~~~

.. code-block:: json
   :caption: <provider name>.json
   
   {
     "id": "<Provider ID>",
     "name": "<Provider Name>",
     "type": "<Provider Type>",
     "disabled": <Boolean>,
     "config": {
       "<Configuration Option>": <Configuration Value>
     },
     "secret_config": {
       "<Configuration Option>": "<Secret Name>"
     },
     "metadata_fields": [{
       "required": <Boolean>,
       "name": "Field Name"
     }]
   }

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description
   
   * - | ``id``
       | String
     - A value that uniquely identifies the authentication
       provider. Atlas App Services automatically generates a unique ID for a
       provider when you create it.
   
   * - | ``name``
       | String
     - The name of the authentication provider.
   
   * - | ``type``
       | String
     - The :ref:`type <auth-provider-list>` of the authentication
       provider.
       
       Valid Options:
       
       - ``"anon-user"``
       - ``"local-userpass"``
       - ``"api-key"``
       - ``"oauth2-apple"``
       - ``"oauth2-google"``
       - ``"oauth2-facebook"``
       - ``"custom-token"``
       - ``"custom-function"``
   
   * - | ``config``
       | Document
     - A document that contains configuration values that are specific
       to the authentication provider. The existence of this field and
       its exact configuration fields depend on the provider type.
   
   * - | ``secret_config``
       | Document
     - A document where each field name is a private configuration field
       for the provider and the value of each field is the name of a
       :ref:`Secret <app-secret>` that stores the configuration value.
   
   * - | ``metadata_fields``
       | Array<Document>
     - An array of documents where each document defines a metadata
       field that describes the user. The existence of this field and
       the exact format of each metadata field document depends on the
       provider type.
   
   * - | ``disabled``
       | Boolean
     - If ``true``, this authentication provider is not enabled for your
       application and cannot be used.
