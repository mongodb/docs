.. procedure::
   :style: connected

   .. step:: Add your {+azure-kv+} Credentials

      .. _csfle-tutorials-automatic-encryption-azure-kms-providers:

      Add the service account credentials to your CSFLE-enabled client
      code.

      .. include:: /includes/tab-note.rst

      .. tip::

         You recorded your {+azure-kv+} credentials in the
         in the :ref:`Register Your Applitcation with Azure <csfle-tutorial-automatic-azure-register>`
         step of this guide.

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java/azure/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :dedent:
               :caption: makeDataKey.java

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node/azure/reader/make_data_key.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python/azure/reader/make_data_key.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :dedent:
               :caption: make_data_key.py

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/sample_apps/csfle/build/dotnet/azure/reader/CSFLE/MakeDataKey.cs
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: csharp
               :dedent:
               :caption: MakeDataKey.cs

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/sample_apps/csfle/build/go/azure/reader/make-data-key.go
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: go
               :dedent:
               :caption: make-data-key.go

      .. tip:: Learn More

         To learn more about the KMS provider object for {+azure-kv+}, see
         :ref:`csfle-reference-kms-providers-azure`.

   .. step:: Add Your Key Information

      Update the following code to specify your {+cmk-long+}:

      .. tip::

         You recorded your {+cmk-long+}'s {+aws-arn-abbr+} and Region
         in the :ref:`Create a {+cmk-long+} <aws-create-master-key>`
         step of this guide.

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java/azure/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: java
               :dedent:
               :caption: makeDataKey.java

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node/azure/reader/make_data_key.js
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python/azure/reader/make_data_key.py
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: python
               :dedent:
               :caption: make_data_key.py

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/sample_apps/csfle/build/dotnet/azure/reader/CSFLE/MakeDataKey.cs
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: csharp
               :dedent:
               :caption: MakeDataKey.cs

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/sample_apps/csfle/build/go/azure/reader/make-data-key.go
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: go
               :dedent:
               :caption: make-data-key.go

   .. step:: Generate your {+dek-long+}

      .. _csfle-azure-create-dek:

      .. tabs-drivers::

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java/azure/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: java
               :dedent:
               :caption: makeDataKey.java

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node/azure/reader/make_data_key.js
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python/azure/reader/make_data_key.py
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: python
               :dedent:
               :caption: make_data_key.py

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/sample_apps/csfle/build/dotnet/azure/reader/CSFLE/MakeDataKey.cs
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: csharp
               :dedent:
               :caption: MakeDataKey.cs

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/sample_apps/csfle/build/go/azure/reader/make-data-key.go
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: go
               :dedent:
               :caption: make-data-key.go

.. tip:: Learn More

   To view a diagram showing how your client application creates your
   {+dek-long+} when using an {+azure-kv+}, see
   :ref:`csfle-reference-kms-providers-azure-architecture`.

   To learn more about the options for creating a {+dek-long+}
   encrypted with a {+cmk-long+} hosted in {+azure-kv+}, see
   :ref:`csfle-kms-provider-object-azure` and
   :ref:`csfle-kms-datakeyopts-azure`.
