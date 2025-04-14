a. Add your {+azure-kv+} Credentials

   .. _csfle-tutorials-automatic-encryption-azure-kms-providers:

   Add the service account credentials to your CSFLE-enabled client
   code.

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/azure/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: java
            :dedent:

         .. include:: /includes/queryable-encryption/tutorials/automatic/named-kms-note.rst

            .. replacement:: kms-provider

               Azure
                     
            .. replacement:: kms-provider-name

               "my_azure_provider"

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/azure/named-kms/NamedKms.java
            :language: java
            :dedent:

         .. include:: /includes/tutorials/automatic/azure/azure-vm-managed-identity.rst

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/make_data_key.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

         .. include:: /includes/queryable-encryption/tutorials/automatic/named-kms-note.rst

            .. replacement:: kms-provider

               Azure
                     
            .. replacement:: kms-provider-name

               "my_azure_provider"

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/azure/named-kms/named-kms.js
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/azure/reader/make_data_key.py
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: python
            :dedent:

         .. include:: /includes/queryable-encryption/tutorials/automatic/named-kms-note.rst

            .. replacement:: kms-provider

               Azure
                     
            .. replacement:: kms-provider-name

               "my_azure_provider"

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/azure/named-kms/named-kms.py
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/MakeDataKey.cs
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: csharp
            :dedent:

         .. include:: /includes/queryable-encryption/tutorials/automatic/named-kms-note.rst

            .. replacement:: kms-provider

               Azure
                     
            .. replacement:: kms-provider-name

               "my_azure_provider"

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/azure/named-kms/NamedKms.cs
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/azure/reader/make-data-key.go
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: go
            :dedent:

#. Add Your Key Information

   Update the following code to specify your {+cmk-long+}:

   .. tip::

      You recorded your {+cmk-long+}'s {+aws-arn-abbr+} and Region
      in the :ref:`Create a {+cmk-long+} <aws-create-master-key>`
      step of this guide.

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/azure/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: java
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/make_data_key.js
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/azure/reader/make_data_key.py
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/MakeDataKey.cs
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/azure/reader/make-data-key.go
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: go
            :dedent:

#. Generate your {+dek-long+}

   .. _csfle-azure-create-dek:

   Generate your {+dek-long+} using the variables declared in :ref:`step one
   <csfle-azure-create-index>` of this tutorial.

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/azure/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: java
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

         .. include:: /includes/tutorials/automatic/node-include-clientEncryption.rst

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/azure/reader/make_data_key.py
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/MakeDataKey.cs
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/azure/reader/make-data-key.go
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: go
            :dedent:

.. tip:: Learn More

   To view a diagram showing how your client application creates your
   {+dek-long+} when using an {+azure-kv+}, see
   :ref:`qe-fundamentals-kms-providers-azure-architecture`.

   To learn more about the options for creating a {+dek-long+}
   encrypted with a {+cmk-long+} hosted in {+azure-kv+}, see
   :ref:`qe-kms-provider-object-azure` and
   :ref:`qe-kms-datakeyopts-azure`.
