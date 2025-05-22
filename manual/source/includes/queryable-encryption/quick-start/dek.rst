a. Read the {+cmk-long+} and Specify KMS Provider Settings

   .. _qe-field-level-encryption-data-key-create:

   Retrieve the contents of the {+cmk-long+} file that you generated
   in the :ref:`Create a {+cmk-long+} <qe-quick-start-create-master-key>` step of this guide.

   Use the {+cmk-abbr+} value in your KMS provider settings. The
   client uses these settings to discover the {+cmk-abbr+}. Set the
   provider name to ``local`` to indicate that you are using a
   Local Key Provider.

   .. include:: /includes/queryable-encryption/tab-note.rst

   .. tabs-drivers::

      .. tab::
         :tabid: shell

         .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/mongosh/local/reader/make_data_key.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/local/reader/make_data_key.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/local/reader/make_data_key.py
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: python
            :dedent:

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/local/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: java
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/local/reader/make-data-key.go
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: go
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/local/reader/QueryableEncryption/MakeDataKey.cs
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: csharp
            :dedent:

#. Create your {+dek-long+}s

   .. _qe-local-create-dek:

   Construct a client with your MongoDB connection string and {+key-vault-long+}
   namespace, and create the {+dek-long+}s:

   .. note:: {+key-vault-long-title+} Namespace Permissions

      .. include:: /includes/note-key-vault-permissions

   .. tabs-drivers::

      .. tab::
         :tabid: shell

         .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/mongosh/local/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/local/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/local/reader/make_data_key.py
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: python
            :dedent:

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/local/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: java
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/local/reader/make-data-key.go
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: go
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/local/reader/QueryableEncryption/MakeDataKey.cs
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: csharp
            :dedent:

#. Create Your Encrypted Collection

   Use a {+qe+} enabled ``MongoClient`` instance to specify what
   fields you must encrypt and create your encrypted collection:

   .. tabs-drivers::

      .. tab::
         :tabid: shell

         .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/mongosh/local/reader/make_data_key.js
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: javascript
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/node/local/reader/make_data_key.js
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude::  /includes/generated/in-use-encryption/queryable-encryption/python/local/reader/make_data_key.py
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: python
            :dedent:

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/local/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: java
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/local/reader/make-data-key.go
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: go
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/local/reader/QueryableEncryption/MakeDataKey.cs
            :start-after: start-create-enc-collection
            :end-before: end-create-enc-collection
            :language: csharp
            :dedent:

The output from the code in this section should resemble the following:

.. literalinclude:: /includes/queryable-encryption/quick-start/dek-output.out
   :language: text
   :copyable: false
