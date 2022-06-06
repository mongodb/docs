.. procedure::
   :style: connected

   .. step:: Specify the {+key-vault-long-title+} Namespace

      Specify ``encryption.__keyVault`` as the {+key-vault-long+}
      namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/queryable-encryption/sample_apps/build/node-fle-2/aws/reader/insert_encrypted_document.js
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:

   .. step:: Specify your AWS Credentials

      Specify the ``aws`` KMS provider and your {+aws-iam-abbr+} user
      credentials:

      .. include:: /includes/queryable-encryption/tutorials/automatic/aws/iam-credentials-note.rst

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/queryable-encryption/sample_apps/build/node-fle-2/aws/reader/insert_encrypted_document.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:


   .. step:: Create an {+enc-fields-map-title+} For Your Collection

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/queryable-encryption/sample_apps/build/node-fle-2/aws/reader/insert_encrypted_document.js
               :start-after: start-schema
               :end-before: end-schema
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:

   .. step:: Specify the Location of the {+shared-library+}

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/queryable-encryption/sample_apps/build/node-fle-2/aws/reader/insert_encrypted_document.js
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:

      .. include:: /includes/queryable-encryption/shared-lib-learn-more.rst

   .. step:: Create the MongoClient

      Instantiate a MongoDB client object with the following
      automatic encryption settings:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/queryable-encryption/sample_apps/build/node-fle-2/aws/reader/insert_encrypted_document.js
               :start-after: start-client
               :end-before: end-client
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:
