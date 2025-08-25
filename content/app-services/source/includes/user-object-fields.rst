.. list-table::
   :header-rows: 1
   :widths: 10 15 75

   * - Field
     - Type
     - Description

   * - ``id``
     - string
     - A string representation of the :manual:`ObjectId
       </reference/bson-types/#objectid>` that uniquely identifies the
       user.

   * - ``type``
     - string
     - The type of the user. The following types are possible:

       .. list-table::
          :header-rows: 1
          :widths: 30 70

          * - Type
            - Description

          * - "normal"
            - The user is an :doc:`application user </users>` logged in
              through an authentication provider other than the
              :doc:`API Key </authentication/api-key>` provider.

          * - "server"
            - The user is a server process logged in with any type of
              :doc:`App Services API Key </authentication/api-key>`.

          * - "system"
            - The user is the :ref:`system user <system-user>` that
              bypasses all rules.

   * - ``data``
     - document
     
     - A document that contains metadata that describes the
       user. This field combines the data for all ``identities``
       associated with the user, so the exact field names and values
       depend on which :doc:`authentication providers </users>`
       the user has authenticated with.

       .. note:: System Functions Have No User Data
          
          In :ref:`system functions <system-functions>`, the ``user.data``
          object is empty. Use :method:`context.runningAsSystem()` to test if
          the function is running as a system user.

   * - ``custom_data``
     - document
     
     - A document from your application's :ref:`custom user
       data collection <custom-user-data>` that
       specifies the user's ID. You can use the custom user data
       collection to store arbitrary data about your application's
       users. If you set the ``name`` field, App Services populates the 
       ``username`` metadata field with the return value of ``name``. 
       App Services automatically fetches a new copy of the data
       whenever a user refreshes their access token, such as when they
       log in. The underlying data is a regular MongoDB document, so you
       can use standard CRUD operations through the :doc:`MongoDB Atlas
       service </mongodb>` to define and modify the user's custom data.
       
       .. note:: Avoid Storing Large Custom User Data
          
          Custom user data is limited to ``16MB``, the maximum size of a
          MongoDB document. To avoid hitting this limit, consider
          storing small and relatively static user data in each custom
          user data document, such as the user's preferred language or
          the URL of their avatar image. For data that is large,
          unbounded, or frequently updated, consider only storing a
          reference to the data in the custom user document or storing
          the data with a reference to the user's ID rather than in the
          custom user document.
   
   * - ``identities``
     - array
     - A list of authentication provider identities associated with the
       user. When a user first logs in with a specific provider, App Services
       associates the user with an identity object that contains a
       unique identifier and additional metadata about the user from the
       provider. For subsequent logins, App Services refreshes the existing
       identity data but does not create a new identity. Identity
       objects have the following form:

       .. code-block:: json
          
          {
            "id": "<Unique ID>",
            "provider_type": "<Provider Name>",
            "data": {
              "<Metadata Field>": <Value>,
              ...
            }
          }
       
       .. list-table::
          :header-rows: 1
          :widths: 10 20

          * - Field Name
            - Description

          * - ``id``
            - A provider-generated string that uniquely identifies this
              identity

          * - ``provider_type``
            - The type of authentication provider associated with this
              identity.

          * - ``data``
            - Additional metadata from the authentication provider that
              describes the user. The exact field names and values will
              vary depending on which authentication providers the user
              has logged in with. For a provider-specific breakdown of
              user identity data, see :ref:`User Metadata
              <user-metadata>`.
