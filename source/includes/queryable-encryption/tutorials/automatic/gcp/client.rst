.. procedure::
   :style: connected

   .. step:: Specify the {+key-vault-long-title+} Namespace

      Specify ``encryption.__keyVault`` as the {+key-vault-long+}
      namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/gcp/reader/insert_encrypted_document.js
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: javascript
               :dedent:
               :caption: insert_encrypted_document.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/gcp/reader/insert_encrypted_document.py
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: python
               :dedent:
               :caption: insert_encrypted_document.py

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/gcp/reader/src/main/java/com/mongodb/csfle/insertEncryptedDocument.java
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: java
               :dedent:
               :caption: insertEncryptedDocument.java

   .. step:: Specify your Cloud Account Credentials

      Specify the cloud provider and your service account credentials:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/gcp/reader/insert_encrypted_document.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :dedent:
               :caption: insert_encrypted_document.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/gcp/reader/insert_encrypted_document.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :dedent:
               :caption: insert_encrypted_document.py

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/gcp/reader/src/main/java/com/mongodb/csfle/insertEncryptedDocument.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :dedent:
               :caption: insertEncryptedDocument.java

   .. step:: Create an {+enc-fields-map-title+} For Your Collection

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/gcp/reader/insert_encrypted_document.js
               :start-after: start-schema
               :end-before: end-schema
               :language: javascript
               :dedent:
               :caption: insert_encrypted_document.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/gcp/reader/insert_encrypted_document.py
               :start-after: start-schema
               :end-before: end-schema
               :language: python
               :dedent:
               :caption: insert_encrypted_document.py

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/gcp/reader/src/main/java/com/mongodb/csfle/insertEncryptedDocument.java
               :start-after: start-schema
               :end-before: end-schema
               :language: java
               :dedent:
               :caption: insertEncryptedDocument.java

   .. step:: Specify the Location of the {+shared-library+}

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/gcp/reader/insert_encrypted_document.js
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/gcp/reader/insert_encrypted_document.py
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: python
               :dedent:
               :caption: insert_encrypted_document.py

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/gcp/reader/src/main/java/com/mongodb/csfle/insertEncryptedDocument.java
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: java
               :dedent:
               :caption: insertEncryptedDocument.java

      .. include:: /includes/queryable-encryption/shared-lib-learn-more.rst

   .. step:: Create the MongoClient

      Instantiate a MongoDB client object with the following
      automatic encryption settings:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/gcp/reader/insert_encrypted_document.js
               :start-after: start-client
               :end-before: end-client
               :language: javascript
               :dedent:
               :caption: insert_encrypted_document.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/gcp/reader/insert_encrypted_document.py
               :start-after: start-client
               :end-before: end-client
               :language: python
               :dedent:
               :caption: insert_encrypted_document.py

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/gcp/reader/src/main/java/com/mongodb/csfle/insertEncryptedDocument.java
               :start-after: start-client
               :end-before: end-client
               :language: java
               :dedent:
               :caption: insertEncryptedDocument.java
