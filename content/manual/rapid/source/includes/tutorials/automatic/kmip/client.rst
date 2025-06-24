a. Specify the {+key-vault-long-title+} Namespace

   Specify ``encryption.__keyVault`` as the {+key-vault-long+}
   namespace.

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/kmip/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
            :start-after: start-key-vault
            :end-before: end-key-vault
            :language: java
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
            :start-after: start-key-vault
            :end-before: end-key-vault
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/kmip/reader/insert_encrypted_document.py
            :start-after: start-key-vault
            :end-before: end-key-vault
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/kmip/reader/CSFLE/InsertEncryptedDocument.cs
            :start-after: start-key-vault
            :end-before: end-key-vault
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
            :start-after: start-key-vault
            :end-before: end-key-vault
            :language: go
            :dedent:

#. Specify your KMIP Endpoint

   Specify ``kmip`` in your ``kmsProviders`` object and enter
   the URI endpoint of your {+kmip-kms+}:

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/kmip/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: java
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/kmip/reader/insert_encrypted_document.py
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/kmip/reader/CSFLE/InsertEncryptedDocument.cs
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: go
            :dedent:


#. Create an Encryption Schema For Your Collection

   Create an encryption schema that specifies how your client
   application encrypts your documents' fields:

   .. tip:: Add Your {+dek-long+} Base64 ID

      Make sure to update the following code to include your Base64
      {+dek-abbr+} ID. You received this value in the
      :ref:`Generate your {+dek-long+} <csfle-kmip-create-dek>` step of this
      guide.

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/kmip/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
            :start-after: start-schema
            :end-before: end-schema
            :language: java
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
            :start-after: start-schema
            :end-before: end-schema
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/kmip/reader/insert_encrypted_document.py
            :start-after: start-schema
            :end-before: end-schema
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/kmip/reader/CSFLE/InsertEncryptedDocument.cs
            :start-after: start-schema
            :end-before: end-schema
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
            :start-after: start-schema
            :end-before: end-schema
            :language: go
            :dedent:
   
   .. include:: /includes/quick-start/schema/further-reading-note.rst

#. Specify the Location of the {+shared-library+}

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/kmip/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
            :start-after: start-extra-options
            :end-before: end-extra-options
            :language: java
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
            :start-after: start-extra-options
            :end-before: end-extra-options
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/kmip/reader/insert_encrypted_document.py
            :start-after: start-extra-options
            :end-before: end-extra-options
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/kmip/reader/CSFLE/InsertEncryptedDocument.cs
            :start-after: start-extra-options
            :end-before: end-extra-options
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
            :start-after: start-extra-options
            :end-before: end-extra-options
            :language: go
            :dedent:

   .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

#. Create the MongoClient

   Instantiate a MongoDB client object with the following automatic
   encryption settings that use the variables declared in the previous steps:

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/kmip/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
            :start-after: start-client
            :end-before: end-client
            :language: java
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
            :start-after: start-client
            :end-before: end-client
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/kmip/reader/insert_encrypted_document.py
            :start-after: start-client
            :end-before: end-client
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. tabs::

            .. tab:: C# Driver v3.0+
               :tabid: csharp-v3

               .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/kmip/reader/CSFLE/InsertEncryptedDocument.cs
                  :start-after: start-client
                  :end-before: end-client
                  :language: csharp
                  :dedent:

            .. tab:: C# Driver < v3.0
               :tabid: csharp-v2

               .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/kmip/reader/CSFLE/InsertEncryptedDocument.cs
                  :start-after: MongoClientSettings.Extensions.AddAutoEncryption(); // .NET/C# Driver v3.0 or later only
                  :end-before: end-client
                  :language: csharp
                  :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/kmip/reader/insert-encrypted-document.go
            :start-after: start-client
            :end-before: end-client
            :language: go
            :dedent:

