.. procedure::
   :style: connected

   .. step:: Specify the {+key-vault-long-title+} Namespace

      Specify ``encryption.__keyVault`` as the {+key-vault-long+}
      namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/azure/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: java
               :dedent:
               :caption: InsertEncryptedDocument.java

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: javascript
               :dedent:
               :caption: insert_encrypted_document.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/azure/reader/insert_encrypted_document.py
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: python
               :dedent:
               :caption: insert_encrypted_document.py

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: csharp
               :dedent:
               :caption: InsertEncryptedDocument.cs

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/azure/reader/insert-encrypted-document.go
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: go
               :dedent:
               :caption: insert-encrypted-document.go

   .. step:: Specify your Azure Credentials

      Specify the ``azure`` KMS provider and your Azure
      credentials:

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/azure/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :dedent:
               :caption: InsertEncryptedDocument.java

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :dedent:
               :caption: insert_encrypted_document.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/azure/reader/insert_encrypted_document.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :dedent:
               :caption: insert_encrypted_document.py

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: csharp
               :dedent:
               :caption: InsertEncryptedDocument.cs

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/azure/reader/insert-encrypted-document.go
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: go
               :dedent:
               :caption: insert-encrypted-document.go

   .. step:: Create an Encryption Schema For Your Collection

      .. tip:: Add Your {+dek-long+} Base64 ID

         Make sure to update the following code to include your Base64
         {+dek-abbr+} ID. You received this value in the
         :ref:`Generate your {+dek-long+} <csfle-azure-create-dek>` step of this
         guide.

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/azure/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
               :start-after: start-schema
               :end-before: end-schema
               :language: java
               :dedent:
               :caption: InsertEncryptedDocument.java

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
               :start-after: start-schema
               :end-before: end-schema
               :language: javascript
               :dedent:
               :caption: insert_encrypted_document.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/azure/reader/insert_encrypted_document.py
               :start-after: start-schema
               :end-before: end-schema
               :language: python
               :dedent:
               :caption: insert_encrypted_document.py

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
               :start-after: start-schema
               :end-before: end-schema
               :language: csharp
               :dedent:
               :caption: InsertEncryptedDocument.cs

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/azure/reader/insert-encrypted-document.go
               :start-after: start-schema
               :end-before: end-schema
               :language: go
               :dedent:
               :caption: insert-encrypted-document.go

   .. step:: Specify the Location of the {+shared-library+}

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/azure/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: java
               :dedent:
               :caption: InsertEncryptedDocument.java

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: javascript
               :dedent:
               :caption: insert_encrypted_document.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/azure/reader/insert_encrypted_document.py
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: python
               :dedent:
               :caption: insert_encrypted_document.py

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: csharp
               :dedent:
               :caption: InsertEncryptedDocument.cs

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/azure/reader/insert-encrypted-document.go
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: go
               :dedent:
               :caption: insert-encrypted-document.go

      .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

   .. step:: Create the MongoClient

      Instantiate a MongoDB client object with the following
      automatic encryption settings:

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/azure/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
               :start-after: start-client
               :end-before: end-client
               :language: java
               :dedent:
               :caption: InsertEncryptedDocument.java

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
               :start-after: start-client
               :end-before: end-client
               :language: javascript
               :dedent:
               :caption: insert_encrypted_document.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/azure/reader/insert_encrypted_document.py
               :start-after: start-client
               :end-before: end-client
               :language: python
               :dedent:
               :caption: insert_encrypted_document.py

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
               :start-after: start-client
               :end-before: end-client
               :language: csharp
               :dedent:
               :caption: InsertEncryptedDocument.cs

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/azure/reader/insert-encrypted-document.go
               :start-after: start-client
               :end-before: end-client
               :language: go
               :dedent:
               :caption: insert-encrypted-document.go
