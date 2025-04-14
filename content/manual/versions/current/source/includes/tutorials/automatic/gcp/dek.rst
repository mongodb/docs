a. Add your GCP KMS Credentials

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. include:: /includes/tutorials/automatic/gcp/attached-service-account.rst

         .. include:: /includes/tutorials/automatic/gcp/specify-provider-credentials.rst

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/gcp/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: java
            :dedent:

         .. include:: /includes/queryable-encryption/tutorials/automatic/named-kms-note.rst

            .. replacement:: kms-provider

               GCP
                     
            .. replacement:: kms-provider-name

               "my_gcp_provider"

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/gcp/named-kms/NamedKms.java
            :language: java
            :dedent:

      .. tab::
         :tabid: nodejs

         .. include:: /includes/tutorials/automatic/gcp/specify-provider-credentials.rst

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/gcp/reader/make_data_key.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

         .. include:: /includes/queryable-encryption/tutorials/automatic/named-kms-note.rst

            .. replacement:: kms-provider

               GCP
                     
            .. replacement:: kms-provider-name

               "my_gcp_provider"

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/gcp/named-kms/named-kms.js
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. include:: /includes/tutorials/automatic/gcp/specify-provider-credentials.rst

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/gcp/reader/make_data_key.py
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: python
            :dedent:

         .. include:: /includes/queryable-encryption/tutorials/automatic/named-kms-note.rst

            .. replacement:: kms-provider

               GCP
                     
            .. replacement:: kms-provider-name

               "my_gcp_provider"

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/gcp/named-kms/named-kms.py
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. include:: /includes/tutorials/automatic/gcp/specify-provider-credentials.rst

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/gcp/reader/CSFLE/MakeDataKey.cs
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: csharp
            :dedent:

         .. include:: /includes/queryable-encryption/tutorials/automatic/named-kms-note.rst

            .. replacement:: kms-provider

               GCP
                     
            .. replacement:: kms-provider-name

               "my_gcp_provider"

         .. literalinclude:: /includes/queryable-encryption/tutorials/automatic/gcp/named-kms/NamedKms.cs
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. include:: /includes/tutorials/automatic/gcp/specify-provider-credentials.rst

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/gcp/reader/make-data-key.go
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: go
            :dedent:

   .. include:: /includes/tutorials/automatic/gcp/gcp-credentials-note.rst

#. Add Your Key Information

   Update the following code to specify your {+cmk-long+}:

   .. tip::

      You recorded your {+cmk-long+} details in the
      in the :ref:`Create a {+cmk-long+} <gcp-create-master-key>`
      step of this guide.

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/gcp/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: java
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/gcp/reader/make_data_key.js
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: javascript
            :dedent:

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/gcp/reader/make_data_key.py
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/gcp/reader/CSFLE/MakeDataKey.cs
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/gcp/reader/make-data-key.go
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: go
            :dedent:

#. Generate your {+dek-long+}

   .. _csfle-gcp-create-dek:

   Generate your {+dek-long+} using the variables declared in :ref:`step one
   <csfle-gcp-create-index>` of this tutorial.

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/gcp/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: java
            :dedent:

      .. tab::
         :tabid: nodejs

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/gcp/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

         .. include:: /includes/tutorials/automatic/node-include-clientEncryption.rst

      .. tab::
         :tabid: python

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/python/gcp/reader/make_data_key.py
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: python
            :dedent:

      .. tab::
         :tabid: csharp

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/gcp/reader/CSFLE/MakeDataKey.cs
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: csharp
            :dedent:

      .. tab::
         :tabid: go

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/go/gcp/reader/make-data-key.go
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: go
            :dedent:

.. tip:: Learn More

   To view a diagram showing how your client application creates your
   {+dek-long+} when using an {+gcp-kms+}, see
   :ref:`qe-fundamentals-kms-providers-gcp-architecture`.

   To learn more about the options for creating a {+dek-long+}
   encrypted with a {+cmk-long+} hosted in {+azure-kv+}, see
   :ref:`qe-kms-provider-object-gcp` and
   :ref:`qe-kms-datakeyopts-gcp`.
