.. procedure::
   :style: connected

   .. _field-level-encryption-data-key-retrieve:

   .. step:: Specify the {+key-vault-long-title+} Namespace

      Specify ``encryption.__keyVault`` as the {+key-vault-long+}
      namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: shell

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/mongosh/local/reader/insert_encrypted_document.js
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: javascript
               :dedent:

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/local/reader/insert_encrypted_document.js
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/local/reader/insert_encrypted_document.py
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/local/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/local/reader/insert-encrypted-document.go
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/local/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: csharp
               :dedent:

   .. step:: Specify the Local {+cmk-long+}

      Specify the KMS provider and specify your {+cmk-long+} inline:

      .. tabs-drivers::

         .. tab::
            :tabid: shell

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/mongosh/local/reader/insert_encrypted_document.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :dedent:

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/local/reader/insert_encrypted_document.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/local/reader/insert_encrypted_document.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/local/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/local/reader/insert-encrypted-document.go
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/local/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: csharp
               :dedent:

   .. step:: Create an {+enc-fields-map-title+} For Your Collection

      .. _qe-quickstart-encrypted-fields-map:

      .. tabs-drivers::

         .. tab::
            :tabid: shell

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/mongosh/local/reader/insert_encrypted_document.js
               :start-after: start-schema
               :end-before: end-schema
               :language: javascript
               :dedent:

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/local/reader/insert_encrypted_document.js
               :start-after: start-schema
               :end-before: end-schema
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/local/reader/insert_encrypted_document.py
               :start-after: start-schema
               :end-before: end-schema
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/local/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-schema
               :end-before: end-schema
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/local/reader/insert-encrypted-document.go
               :start-after: start-schema
               :end-before: end-schema
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/local/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-schema
               :end-before: end-schema
               :language: csharp
               :dedent:

   .. step:: Specify the Location of the {+shared-library+}

      .. _qe-quick-start-shared-lib:

      .. tabs-drivers::

         .. tab::
            :tabid: shell

            .. code-block:: shell

               // mongosh does not require you to specify the
               // location of the {+shared-library+} 

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/local/reader/insert_encrypted_document.js
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/local/reader/insert_encrypted_document.py
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/local/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/local/reader/insert-encrypted-document.go
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: go
               :dedent:
         
         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/local/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: csharp
               :dedent:

      .. include:: /includes/queryable-encryption/shared-lib-learn-more.rst

   .. step:: Create the MongoClient

      Instantiate a MongoDB client object with the following
      automatic encryption settings:

      .. tabs-drivers::

         .. tab::
            :tabid: shell

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/mongosh/local/reader/insert_encrypted_document.js
               :start-after: start-client
               :end-before: end-client
               :language: javascript
               :dedent:

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/local/reader/insert_encrypted_document.js
               :start-after: start-client
               :end-before: end-client
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/local/reader/insert_encrypted_document.py
               :start-after: start-client
               :end-before: end-client
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/local/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-client
               :end-before: end-client
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/local/reader/insert-encrypted-document.go
               :start-after: start-client
               :end-before: end-client
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/local/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-client
               :end-before: end-client
               :language: csharp
               :dedent:
