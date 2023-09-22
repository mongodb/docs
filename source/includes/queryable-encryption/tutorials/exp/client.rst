.. procedure::
   :style: connected

   .. _qe-tutorials-manual-enc-data-key-retrieve:

   .. step:: Specify the {+key-vault-long-title+} Namespace

      Specify ``encryption.__keyVault`` as the {+key-vault-long+}
      namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/exp/reader/insert_encrypted_document.js
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/exp/reader/insert_encrypted_document.py
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/exp/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/exp/reader/insert-encrypted-document.go
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/exp/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-key-vault
               :end-before: end-key-vault
               :language: csharp
               :dedent:

   .. step:: Specify the {+cmk-long+}

      Specify the KMS provider and specify your {+cmk-long+} inline:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/exp/reader/insert_encrypted_document.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/exp/reader/insert_encrypted_document.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/exp/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/exp/reader/insert-encrypted-document.go
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/exp/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: csharp
               :dedent:

   .. step:: Retrieve {+dek-long+}s 

      Retrieve the {+dek-long+}s created in the
      :ref:`Create a {+dek-long+} <qe-manual-encryption-tutorial-data-key-create>`
      step of this guide:

      .. _qe-quickstart-encrypted-fields-map:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/exp/reader/insert_encrypted_document.js
               :start-after: start-retrieve-deks
               :end-before: end-retrieve-deks
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/exp/reader/insert_encrypted_document.py
               :start-after: start-retrieve-deks
               :end-before: end-retrieve-deks
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/exp/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-retrieve-deks
               :end-before: end-retrieve-deks
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/exp/reader/insert-encrypted-document.go
               :start-after: start-retrieve-deks
               :end-before: end-retrieve-deks
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/exp/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-retrieve-deks
               :end-before: end-retrieve-deks
               :language: csharp
               :dedent:

   .. step:: Specify the Path of the {+shared-library+}

      .. _qe-tutorials-manual-enc-shared-lib:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/exp/reader/insert_encrypted_document.js
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/exp/reader/insert_encrypted_document.py
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/exp/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/exp/reader/insert-encrypted-document.go
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: go
               :dedent:
         
         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/exp/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-extra-options
               :end-before: end-extra-options
               :language: csharp
               :dedent:

      .. tip:: Learn More

         To learn more about the library referenced by this path,
         see the :ref:`<qe-reference-shared-library>` page.


   .. step:: Create a MongoClient Object

      Instantiate a ``MongoClient`` object with the following
      automatic encryption settings:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/exp/reader/insert_encrypted_document.js
               :start-after: start-client
               :end-before: end-client
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/exp/reader/insert_encrypted_document.py
               :start-after: start-client
               :end-before: end-client
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/exp/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-client
               :end-before: end-client
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/exp/reader/insert-encrypted-document.go
               :start-after: start-client
               :end-before: end-client
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/exp/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-client
               :end-before: end-client
               :language: csharp
               :dedent:

      .. note:: Automatic Decryption

         We use a ``MongoClient`` instance with automatic encryption enabled
         to perform automatic decryption.

         To learn more about {+manual-enc+} with automatic decryption,
         see the :ref:`Fundamentals <qe-fundamentals>` section. 

   .. step:: Create a ClientEncryption Object

      Instantiate a ``ClientEncryption`` object as follows:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/exp/reader/insert_encrypted_document.js
               :start-after: start-client-enc
               :end-before: end-client-enc
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/exp/reader/insert_encrypted_document.py
               :start-after: start-client-enc
               :end-before: end-client-enc
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/exp/reader/src/main/java/com/mongodb/qe/InsertEncryptedDocument.java
               :start-after: start-client-enc
               :end-before: end-client-enc
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/exp/reader/insert-encrypted-document.go
               :start-after: start-client-enc
               :end-before: end-client-enc
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/exp/reader/QueryableEncryption/InsertEncryptedDocument.cs
               :start-after: start-client-enc
               :end-before: end-client-enc
               :language: csharp
               :dedent:

   .. note:: Indexed and Unindexed Algorithms

      To learn more about the indexed and unindexed algorithms in
      {+manual-enc+}, see :ref:`<qe-fundamentals-man-enc-algorithm-choice>`.
