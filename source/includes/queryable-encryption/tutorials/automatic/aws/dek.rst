.. procedure::
   :style: connected

   .. step:: Add your AWS KMS Credentials

      Add the service account credentials to your {+qe+} enabled client
      code.

      .. include:: /includes/queryable-encryption/tab-note.rst

      .. include:: /includes/queryable-encryption/tutorials/automatic/aws/iam-credentials-note.rst

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/aws/reader/make_data_key.js
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: javascript
               :caption: make_data_key.js
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/aws/reader/make_data_key.py
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: python
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/aws/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: java
               :dedent:
               :caption: makeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/sample_apps/csfle/build/go-fle-2/aws/reader/make-data-key.go
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: go
               :caption: make-data-key.go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/sample_apps/csfle/build/dotnet-fle-2/aws/reader/CSFLE/MakeDataKey.cs
               :start-after: start-kmsproviders
               :end-before: end-kmsproviders
               :language: csharp
               :dedent:
               :caption: MakeDataKey.cs

      .. tip:: Learn More

         To learn more about the KMS provider object for AWS, see
         :ref:`qe-reference-kms-providers-aws`.

   .. step:: Add Your Key Information

      Update the following code to specify your {+cmk-long+}:

      .. tip::

         You recorded your {+cmk-long+}'s {+aws-arn-abbr+} and Region
         in the :ref:`Create a {+cmk-long+} <qe-aws-create-master-key>`
         step of this guide.

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/aws/reader/make_data_key.js
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: javascript
               :caption: make_data_key.js
               :dedent:

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/aws/reader/make_data_key.py
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: python
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/aws/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: java
               :dedent:
               :caption: makeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/sample_apps/csfle/build/go-fle-2/aws/reader/make-data-key.go
               :start-after: start-datakeyopts
               :end-before: end-datakeyopts
               :language: go
               :caption: make-data-key.go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/sample_apps/csfle/build/dotnet-fle-2/aws/reader/CSFLE/MakeDataKey.cs
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
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/aws/reader/make_data_key.js
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/aws/reader/make_data_key.py
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: python
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/aws/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: java
               :dedent:
               :caption: makeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/sample_apps/csfle/build/go-fle-2/aws/reader/make-data-key.go
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: go
               :caption: make-data-key.go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/sample_apps/csfle/build/dotnet-fle-2/aws/reader/CSFLE/MakeDataKey.cs
               :start-after: start-create-dek
               :end-before: end-create-dek
               :language: csharp
               :dedent:
               :caption: MakeDataKey.cs

   .. step:: Create Your Encrypted Collection

      Use a {+qe+} enabled ``MongoClient`` instance to specify what
      fields you must encrypt and create your encrypted collection:

      .. tabs-drivers::

         .. tab::
            :tabid: nodejs

            .. literalinclude:: /includes/sample_apps/csfle/build/node-fle-2/aws/reader/make_data_key.js
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: javascript
               :dedent:
               :caption: make_data_key.js

         .. tab::
            :tabid: python

            .. literalinclude:: /includes/sample_apps/csfle/build/python-fle-2/aws/reader/make_data_key.py
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: python
               :caption: make_data_key.py
               :dedent:

         .. tab::
            :tabid: java-sync

            .. literalinclude:: /includes/sample_apps/csfle/build/java-fle-2/aws/reader/src/main/java/com/mongodb/csfle/makeDataKey.java
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: java
               :dedent:
               :caption: makeDataKey.java

         .. tab::
            :tabid: go

            .. literalinclude:: /includes/sample_apps/csfle/build/go-fle-2/aws/reader/make-data-key.go
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: go
               :caption: make-data-key.go
               :dedent:

         .. tab::
            :tabid: csharp

            .. literalinclude:: /includes/sample_apps/csfle/build/dotnet-fle-2/aws/reader/CSFLE/MakeDataKey.cs
               :start-after: start-create-enc-collection
               :end-before: end-create-enc-collection
               :language: csharp
               :dedent:
               :caption: MakeDataKey.cs

The output from the code in this section should resemble the following:

.. literalinclude:: /includes/queryable-encryption/quick-start/dek-output.out
   :language: text

.. tip:: Learn More

   To view a diagram showing how your client application creates your
   {+dek-long+} when using an AWS KMS, see
   :ref:`qe-reference-kms-providers-aws-architecture`.

   To learn more about the options for creating a {+dek-long+}
   encrypted with a {+cmk-long+} hosted in AWS KMS, see
   :ref:`qe-kms-datakeyopts-aws`.
