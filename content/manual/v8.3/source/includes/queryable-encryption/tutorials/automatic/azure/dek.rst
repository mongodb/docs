a. Add your {+azure-kv+} Credentials

   .. _qe-tutorials-automatic-encryption-azure-kms-providers:

   Add the service account credentials to your {+qe+} enabled client
   code.

   .. include:: /includes/queryable-encryption/tab-note.rst

   .. tabs-drivers::

      .. tab::
         :tabid: shell

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/azure/reader/make_data_key.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/azure/reader/make_data_key.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/azure/reader/make_data_key.py
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: python
            :dedent:

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/azure/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: java
            :dedent:

         .. include:: /includes/tutorials/automatic/azure/azure-vm-managed-identity.rst

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/azure/reader/make-data-key.go
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: go
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/azure/reader/QueryableEncryption/MakeDataKey.cs
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: csharp
            :dedent:

#. Add Your Key Information

   Update the following code to specify your {+cmk-long+}:

   .. tip::

      You recorded your {+cmk-long+} credentials in the
      :ref:`azure-create-master-key` step of this guide.

   .. tabs-drivers::

      .. tab::
         :tabid: shell

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/azure/reader/make_data_key.js
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: javascript
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/azure/reader/make_data_key.js
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/azure/reader/make_data_key.py
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: python
            :dedent:

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/azure/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: java
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/azure/reader/make-data-key.go
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: go
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/azure/reader/QueryableEncryption/MakeDataKey.cs
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: csharp
            :dedent:

#. Create your {+dek-long+}s

   Construct a client with your MongoDB connection string and {+key-vault-long+}
   namespace, and create the {+dek-long+}s:

   .. note:: {+key-vault-long-title+} Namespace Permissions

      The {+key-vault-long+} is in the ``encryption.__keyVault``
      namespace. Ensure that the database user your application uses to connect
      to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
      permissions on this namespace.

   .. tabs-drivers::

      .. tab::
         :tabid: shell

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/azure/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/azure/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/azure/reader/make_data_key.py
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: python
            :dedent:

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/azure/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: java
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/azure/reader/make-data-key.go
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: go
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/azure/reader/QueryableEncryption/MakeDataKey.cs
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: csharp
            :dedent:

#. Create Your Encrypted Collection

   Use a {+qe+} enabled ``MongoClient`` intance to specify what
   fields you must encrypt and create your encrypted collection:

   .. tabs-drivers::

      .. tab::
         :tabid: shell

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/azure/reader/make_data_key.js
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: javascript
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/azure/reader/make_data_key.js
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/azure/reader/make_data_key.py
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: python
            :dedent:

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/azure/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: java
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/azure/reader/make-data-key.go
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: go
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/azure/reader/QueryableEncryption/MakeDataKey.cs
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: csharp
            :dedent:

.. tip:: Learn More

   To view a diagram showing how your client application creates your
   {+dek-long+} when using an {+azure-kv+}, see
   :ref:`qe-fundamentals-kms-providers-azure-architecture`.

   To learn more about the options for creating a {+dek-long+}
   encrypted with a {+cmk-long+} hosted in {+azure-kv+}, see
   :ref:`qe-kms-provider-object-azure` and
   :ref:`qe-kms-datakeyopts-azure`.
