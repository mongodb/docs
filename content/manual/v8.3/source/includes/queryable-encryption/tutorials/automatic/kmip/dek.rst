a. Add your Endpoint

   Specify the URI endpoint of your {+kmip-kms+}:

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/kmip/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: java
            :dedent:

      .. tab::
         :tabid: shell

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/kmip/reader/make_data_key.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/kmip/reader/make_data_key.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/kmip/reader/make_data_key.py
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/kmip/reader/QueryableEncryption/MakeDataKey.cs
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/kmip/reader/make-data-key.go
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: go
            :dedent:

#. Add Your Key Information

   The following code prompts your {+kmip-kms+} to automatically generate a {+cmk-long+}:

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/kmip/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: java
            :dedent:

      .. tab::
         :tabid: shell

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/kmip/reader/make_data_key.js
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: javascript
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/kmip/reader/make_data_key.js
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/kmip/reader/make_data_key.py
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/kmip/reader/QueryableEncryption/MakeDataKey.cs
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/kmip/reader/make-data-key.go
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: go
            :dedent:

#. Generate your {+dek-long+}s

   .. _qe-kmip-create-dek:

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/java/kmip/reader/src/main/java/com/mongodb/qe/MakeDataKey.java
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: java
            :dedent:

      .. tab::
         :tabid: shell

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/mongosh/kmip/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/node/kmip/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/python/kmip/reader/make_data_key.py
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/dotnet/kmip/reader/QueryableEncryption/MakeDataKey.cs
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/queryable-encryption/go/kmip/reader/make-data-key.go
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: go
            :dedent:
