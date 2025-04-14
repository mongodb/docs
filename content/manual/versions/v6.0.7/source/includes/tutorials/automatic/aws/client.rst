.. procedure::
   :style: connected

   .. step:: Specify the {+key-vault-long-title+} Namespace

      Specify ``encryption.__keyVault`` as the {+key-vault-long+}
      namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/aws/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: java
               :caption: InsertEncryptedDocument.java
               :dedent:

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/aws/reader/insert_encrypted_document.js
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: python
               :caption: insert_encrypted_document.py
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/aws/reader/CSFLE/InsertEncryptedDocument.cs
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: csharp
               :caption: InsertEncryptedDocument.cs
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/aws/reader/insert-encrypted-document.go
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: go
               :caption: insert-encrypted-document.go
               :dedent:

   .. step:: Specify your AWS Credentials

      Specify the ``aws`` KMS provider and your {+aws-iam-abbr+} user
      credentials:

      .. include:: /includes/tutorials/automatic/aws/iam-credentials-note.rst

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/aws/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :caption: InsertEncryptedDocument.java
               :dedent:

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/aws/reader/insert_encrypted_document.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :caption: insert_encrypted_document.py
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/aws/reader/CSFLE/InsertEncryptedDocument.cs
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: csharp
               :caption: InsertEncryptedDocument.cs
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/aws/reader/insert-encrypted-document.go
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: go
               :caption: insert-encrypted-document.go
               :dedent:

   .. step:: Create an Encryption Schema For Your Collection

      .. tip:: Add Your {+dek-long+} Base64 ID

         Make sure to update the following code to include your Base64
         {+dek-abbr+} ID. You received this value in the
         :ref:`Generate your {+dek-long+} <csfle-aws-create-dek>` step of this
         guide.

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/aws/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
               :start-after: start-schema
               :end-before: end-schema
               :language: java
               :caption: InsertEncryptedDocument.java
               :dedent:

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/aws/reader/insert_encrypted_document.js
               :start-after: start-schema
               :end-before: end-schema
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
               :start-after: start-schema
               :end-before: end-schema
               :language: python
               :caption: insert_encrypted_document.py
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/aws/reader/CSFLE/InsertEncryptedDocument.cs
               :start-after: start-schema
               :end-before: end-schema
               :language: csharp
               :caption: InsertEncryptedDocument.cs
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/aws/reader/insert-encrypted-document.go
               :start-after: start-schema
               :end-before: end-schema
               :language: go
               :caption: insert-encrypted-document.go
               :dedent:

   .. step:: Specify the Location of the Encryption Binary

      Configure the client to spawn the ``mongocryptd`` process by specifying the
      path to the binary using the following configuration options:

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/aws/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: java
               :caption: InsertEncryptedDocument.java
               :dedent:

            .. note:: Encryption Binary Daemon

               If the ``mongocryptd`` daemon is already running, you can
               configure the client to skip starting it by passing the
               following option:

               .. code-block:: java
                  :emphasize-lines: 1

                  extraOptions.put("mongocryptdBypassSpawn", true);

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/aws/reader/insert_encrypted_document.js
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:

            .. note:: Encryption Binary Daemon

               If the ``mongocryptd`` daemon is already running, you can
               configure the client to skip starting it by passing the
               following option:

               .. code-block:: javascript
                  :emphasize-lines: 1

                   extraOptions.mongocryptdBypassSpawn = true;

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: python
               :caption: insert_encrypted_document.py
               :dedent:

            .. note:: Encryption Binary Daemon

               If the ``mongocryptd`` daemon is already running, you can
               configure the client to skip starting it by passing the
               following option:

               .. code-block:: python
                  :emphasize-lines: 1

                   extra_options['mongocryptd_bypass_spawn'] = True

         .. tab::
            :tabid: csharp

            .. note:: Encryption Executable

               If the ``mongocryptd.exe`` executable is not in the PATH,
               specify the spawn path.

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/aws/reader/CSFLE/InsertEncryptedDocument.cs
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: csharp
               :caption: InsertEncryptedDocument.cs
               :dedent:

         .. tab::
            :tabid: go

            .. note::

               If ``mongocryptd`` is not in the PATH,
               specify the spawn path.

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/aws/reader/insert-encrypted-document.go
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: go
               :caption: insert-encrypted-document.go
               :dedent:

            .. note:: Encryption Binary Daemon

               If the ``mongocryptd`` daemon is already running, you can
               configure the client to skip starting it by passing the
               following option:

               .. code-block:: go

                  extraOptions := map[string]interface{}{
                      "mongocryptdBypassSpawn": true,
                  }

   .. step:: Create the MongoClient

      Instantiate a MongoDB client object with the following
      automatic encryption settings:

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/aws/reader/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
               :start-after: start-client
               :end-before: end-client
               :language: java
               :caption: InsertEncryptedDocument.java
               :dedent:

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/aws/reader/insert_encrypted_document.js
               :start-after: start-client
               :end-before: end-client
               :language: javascript
               :caption: insert_encrypted_document.js
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/aws/reader/insert_encrypted_document.py
               :start-after: start-client
               :end-before: end-client
               :language: python
               :caption: insert_encrypted_document.py
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/aws/reader/CSFLE/InsertEncryptedDocument.cs
               :start-after: start-client
               :end-before: end-client
               :language: csharp
               :caption: InsertEncryptedDocument.cs
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/aws/reader/insert-encrypted-document.go
               :start-after: start-client
               :end-before: end-client
               :language: go
               :caption: insert-encrypted-document.go
