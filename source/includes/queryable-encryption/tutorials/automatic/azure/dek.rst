.. procedure::
   :style: connected

   .. step:: Add your {+azure-kv+} Credentials

      .. _qe-tutorials-automatic-encryption-azure-kms-providers:

      Add the service account credentials to your {+qe+} enabled client
      code.

      .. include:: /includes/queryable-encryption/tab-note.rst

      .. tip::

         You recorded your {+azure-kv+} credentials in the
         in the :ref:`Register Your Applitcation with Azure <qe-tutorial-automatic-azure-register>`
         step of this guide.

      .. tabs-drivers::

         .. tab::
            :tabid: shell

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/azure/reader/make_data_key.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/azure/reader/make_data_key.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/azure/reader/make_data_key.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/azure/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :dedent:
               :caption: MakeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/azure/reader/make-data-key.go
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: go
               :caption: make-data-key.py
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/azure/reader/QueryableEncryption/MakeDataKey.cs
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: csharp
               :dedent:
               :caption: MakeDataKey.cs

      .. tip:: Learn More

         To learn more about the KMS provider object for {+azure-kv+}, see
         :ref:`qe-reference-kms-providers-azure`.

   .. step:: Add Your Key Information

      Update the following code to specify your {+cmk-long+}:

      .. tip::

         You recorded your {+cmk-long+}'s {+aws-arn-abbr+} and Region
         in the :ref:`Create a {+cmk-long+} <aws-create-master-key>`
         step of this guide.

      .. tabs-drivers::

         .. tab::
            :tabid: shell

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/azure/reader/make_data_key.js
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/azure/reader/make_data_key.js
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/azure/reader/make_data_key.py
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: python
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/azure/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: java
               :dedent:
               :caption: MakeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/azure/reader/make-data-key.go
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: go
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/azure/reader/QueryableEncryption/MakeDataKey.cs
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: csharp
               :dedent:
               :caption: MakeDataKey.cs

   .. step:: Create your {+dek-long+}s

      Construct a client with your MongoDB connection string and {+key-vault-long+}
      namespace, and create the {+dek-long+}s:

      .. note:: {+key-vault-long-title+} Namespace Permissions

         The {+key-vault-long+} in this guide is the ``__keyVault``
         collection in the ``encryption`` database.
         Ensure that the database user your application uses to connect
         to MongoDB has `ReadWrite
         <https://www.mongodb.com/docs/manual/reference/built-in-roles/#readWrite>`_
         permissions on the ``encryption.__keyVault`` namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: shell

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/azure/reader/make_data_key.js
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/azure/reader/make_data_key.js
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/azure/reader/make_data_key.py
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: python
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/azure/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: java
               :dedent:
               :caption: MakeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/azure/reader/make-data-key.go
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: go
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/azure/reader/QueryableEncryption/MakeDataKey.cs
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: csharp
               :dedent:
               :caption: MakeDataKey.cs

   .. step:: Create Your Encrypted Collection

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
               :caption: make_data_key.js

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/azure/reader/make_data_key.js
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/azure/reader/make_data_key.py
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: python
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/azure/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: java
               :dedent:
               :caption: MakeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/azure/reader/make-data-key.go
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: go
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/azure/reader/QueryableEncryption/MakeDataKey.cs
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: csharp
               :dedent:
               :caption: MakeDataKey.cs

.. tip:: Learn More

   To view a diagram showing how your client application creates your
   {+dek-long+} when using an {+azure-kv+}, see
   :ref:`qe-reference-kms-providers-azure-architecture`.

   To learn more about the options for creating a {+dek-long+}
   encrypted with a {+cmk-long+} hosted in {+azure-kv+}, see
   :ref:`qe-kms-provider-object-azure` and
   :ref:`qe-kms-datakeyopts-azure`.
