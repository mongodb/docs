.. procedure::
   :style: connected

   .. step:: Read the {+cmk-long+} and Specify KMS Provider Settings

      .. _qe-manual-encryption-tutorial-data-key-create:

      Retrieve the contents of the {+cmk-long+} file that you generated
      in the :ref:`Create a {+cmk-long+} <qe-manual-enc-create-master-key>` step of this guide.

      Pass the {+cmk-abbr+} value to your KMS provider settings. The
      client uses these settings to discover the {+cmk-abbr+}. Set the provider
      name to ``local`` to inform the driver you are using a
      Local Key Provider.

      .. include:: /includes/queryable-encryption/tab-note.rst

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/exp/reader/make_data_key.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/exp/reader/make_data_key.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/exp/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/exp/reader/make-data-key.go
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/exp/reader/QueryableEncryption/MakeDataKey.cs
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: csharp
               :dedent:

   .. step:: Create your {+dek-long+}s

      .. _qe-exp-create-dek:

      Construct a client with your MongoDB connection string and {+key-vault-long+}
      namespace, and create the {+dek-long+}s:

      .. note:: {+key-vault-long-title+} Namespace Permissions

         The {+key-vault-long+} is in the ``encryption.__keyVault``
         namespace. Ensure that the database user your application uses to connect
         to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
         permissions on this namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/exp/reader/make_data_key.js
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/exp/reader/make_data_key.py
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/exp/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/exp/reader/make-data-key.go
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/exp/reader/QueryableEncryption/MakeDataKey.cs
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: csharp
               :dedent:

   .. step:: Create Your Encrypted Collection

      Use a {+qe+} enabled ``MongoClient`` instance to specify what
      fields you must encrypt and create your encrypted collection:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/exp/reader/make_data_key.js
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/exp/reader/make_data_key.py
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: python
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/exp/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: java
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/exp/reader/make-data-key.go
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/exp/reader/QueryableEncryption/MakeDataKey.cs
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: csharp
               :dedent:

The output from the code in this section should resemble the following:

.. literalinclude:: /includes/queryable-encryption/quick-start/dek-output.out
   :language: text
   :copyable: false
