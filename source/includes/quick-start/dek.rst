.. procedure::
   :style: connected

   .. step:: Read the {+cmk-long+} and Specify KMS Provider Settings

      .. _field-level-encryption-data-key-create:

      Retrieve the contents of the {+cmk-long+} file that you generated
      in the :ref:`Create a {+cmk-long+} <csfle-quick-start-create-master-key>` step of this guide.

      Pass the {+cmk-abbr+} value to your KMS provider settings. The
      client uses these settings to discover the {+cmk-abbr+}. As
      you are using the Local Key Provider, set the provider name to
      ``local``.

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/local/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :dedent:

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/make_data_key.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/local/reader/make_data_key.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/local/reader/CSFLE/MakeDataKey.cs
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: csharp
               :dedent:

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/local/reader/make-data-key.go
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: go
               :dedent:

   .. step:: Create a Data Encryption Key

      .. _csfle-local-create-dek:

      Construct a client with your MongoDB connection string and {+key-vault-long+}
      namespace, and create a {+dek-long+}:

      .. note:: {+key-vault-long-title+} Namespace Permissions

         The {+key-vault-long+} is in the ``encryption.__keyVault``
         namespace. Ensure that the database user your application uses to connect
         to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
         permissions on this namespace.

      .. tabs-drivers::

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/local/reader/make-data-key.go
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: go
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/local/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: java
               :dedent:

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/make_data_key.js
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: javascript
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/local/reader/make_data_key.py
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: python
               :dedent:


         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/local/reader/CSFLE/MakeDataKey.cs
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: csharp
               :dedent:


      The output from the code above should resemble the following:

      .. code-block:: none
         :copyable: false

         DataKeyId [base64]: 3k13WkSZSLy7kwAAP4HDyQ==
