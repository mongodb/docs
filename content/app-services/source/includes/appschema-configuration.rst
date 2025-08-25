Application-level configuration information is defined in a single
document named ``config.json`` stored in your application's root
directory.

.. code-block:: none
   :copyable: False

   yourRealmApp/
   └── config.json

Configuration
~~~~~~~~~~~~~

.. code-block:: javascript
   :caption: config.json

   {
     "app_id": "",
     "name": "",
     "security": {
       "allowed_request_origins": ["<Origin URL>"]
     },
     "hosting": {
       "enabled": <boolean>,
       "custom_domain": "<Custom Domain Name>",
       "app_default_domain": "<Default Domain Name>"
     },
     "custom_user_data_config": {
       "enabled": <Boolean>
       "mongo_service_id": "<MongoDB Service ID>",
       "database_name": "<Database Name>",
       "collection_name": "<Collection Name>",
       "user_id_field": "<Field Name>"
     }
     "deployment_model": "<Deployment Model Type>",
     "location": "<Deployment Cloud Region Name>",
     "config_version": <Version Number>
   }

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description
   
   * - | ``app_id``
       | String
     - The application's :guilabel:`App ID`.
   
   * - | ``name``
       | String
     - The application's name.
       
       .. include:: /includes/note-app-name-limitations.rst
   
   * - | ``security``
       | Document
     - A document that contains configuration options for
       application-level security features.
       
       .. code-block:: json
          :copyable: False

          "security": {
            "allowed_request_origins": ["<Origin URL>"]
          }

       .. list-table::
          :header-rows: 1
          :widths: 10 30

          * - Field Name
            - Description

          * - | ``allowed_request_origins``
              | Array<String>
            - An array of URLs that incoming requests may originate
              from. If you define any allowed request origins, then
              Atlas App Services blocks any incoming request from an origin that is
              not listed.
              
              Request origins are URLs with the following form:
              
              .. code-block:: text
                 
                 <scheme>://<host>[:port]
   
   * - | ``hosting``
       | Document
     
     - A document that contains configuration options for all
       :doc:`hosted files </hosting>`:
       
       .. code-block:: json
          :copyable: False

          "hosting": {
            "enabled": <boolean>,
            "custom_domain": "<Custom Domain Name>",
            "app_default_domain": "<Default Domain Name>"
          }

       .. list-table::
          :header-rows: 1
          :widths: 10 30

          * - Field Name
            - Description

          * - | ``enabled``
              | Boolean
            - If ``true``, indicates that your application can
              :doc:`host static files </hosting>`.

          * - | ``custom_domain``
              | String
            - A :doc:`custom domain name
              </hosting/use-a-custom-domain-name>` for your
              application's hosted files.

          * - | ``app_default_domain``
              | String
            - The default domain for your application's hosted files.
              App Services automatically sets this value and you cannot change
              it.
   
   * - | ``config_version``
       | Number
     
     - The schema version that all configuration files in the
       application conform to. This value is machine generated and
       you typically should not manually set or modify it.
   
   * - | ``custom_user_data_config``
       | Document
     - A document that contains configuration options for
       :ref:`custom user data <custom-user-data>`.
       
       .. code-block:: json
          :copyable: False

          "custom_user_data_config": {
            "enabled": <Boolean>
            "mongo_service_id": "<MongoDB Service ID>",
            "database_name": "<Database Name>",
            "collection_name": "<Collection Name>",
            "user_id_field": "<Field Name>"
          }

       .. list-table::
          :header-rows: 1
          :widths: 10 30

          * - Field Name
            - Description

          * - | ``enabled``
              | Boolean
            
            - If ``true``, App Services associates each user with a document
              that contains their data stored in the specified
              collection.

          * - | ``mongo_service_id``
              | String
            - The service ID of the :ref:`MongoDB Atlas data source
              <data-sources>` that contains the custom user
              data. You can find this value in the ``id`` field of the
              service configuration file.

          * - | ``database_name``
              | String
            - The name of the database that contains the custom user
              data collection.

          * - | ``collection_name``
              | String
            - The name of the collection that contains the
              custom user data.

          * - | ``user_id_field``
              | String
            - The name of the field in each custom data document that
              contains the user ID of the application user the document
              describes.
   
   * - | ``deployment_model``
       | String
     - The application's :ref:`deployment model
       <realm-deployment-models>`. The following values are valid:
       
       .. list-table::
          :header-rows: 1
          :widths: 30 10
          
          * - Deployment Model
            - Value
          * - :ref:`Global Deployment <global-deployment>`
            - ``"GLOBAL"``
          * - :ref:`Local Deployment <local-deployment>`
            - ``"LOCAL"``
   
   * - | ``location``
       | String
     - The name of the :ref:`cloud region <deployment-regions>`
       that the application is deployed in.

       - :ref:`Local applications <local-deployment>` process all
          application requests and database writes in this region.

       - :ref:`Global applications <global-deployment>` process
         all database writes in this region, but serve other application
         requests in the nearest deployment region.
