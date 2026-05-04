.. procedure::
   :style: normal

   .. step:: Create a Unique Index on your {+key-vault-long+}
      
      Create a unique index on the ``keyAltNames`` field in your
      ``encryption.__keyVault`` namespace.

      .. include:: /includes/queryable-encryption/tab-note.rst

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/MakeDataKey.cs
         :start-after: start-create-index
         :end-before: end-create-index
         :language: csharp
         :dedent:

   .. step:: Create a New {+dek-long+}

      a. Add your {+azure-kv+} Credentials

         Add the service account credentials to your CSFLE-enabled client
         code.

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

      #. Add Your Key Information

         Update the following code to specify your {+cmk-long+}:

         .. tip::

            You recorded your {+cmk-long+}'s {+aws-arn-abbr+} and Region
            in the :ref:`Create a {+cmk-long+} <aws-create-master-key>`
            step of this guide.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/MakeDataKey.cs
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: csharp
            :dedent:

      #. Generate your {+dek-long+}

         Generate your {+dek-long+} using the variables declared in :ref:`step one
         <csfle-azure-create-index>` of this tutorial.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/MakeDataKey.cs
            :start-after: start-create-dek
            :end-before: end-create-dek
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

      .. see:: Complete Code

         To view the complete code for making a {+dek-long+}, see
         `our Github repository
         <{+sample-app-url-csfle+}/dotnet/azure/reader/CSFLE/MakeDataKey.cs>`__
         
   .. step:: Configure the MongoClient

      .. tip::

         Follow the remaining steps in this tutorial in a separate file from the
         one created in the previous steps.

         To view the complete code for this file, see
         `our Github repository
         <{+sample-app-url-csfle+}/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs>`__
      
      a. Specify the {+key-vault-long-title+} Namespace

         Specify ``encryption.__keyVault`` as the {+key-vault-long+}
         namespace.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
            :start-after: start-key-vault
            :end-before: end-key-vault
            :language: csharp
            :dedent:

      #. Specify your Azure Credentials

         Specify the ``azure`` KMS provider and your Azure
         credentials:

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: csharp
            :dedent:

      #. Create an Encryption Schema For Your Collection

         .. tip:: Add Your {+dek-long+} Base64 ID

            Make sure to update the following code to include your Base64
            {+dek-abbr+} ID. You received this value in the
            :ref:`Generate your {+dek-long+} <csfle-azure-create-dek>` step of this
            guide.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
            :start-after: start-schema
            :end-before: end-schema
            :language: csharp
            :dedent:

      #. Specify the Location of the {+shared-library+}

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
            :start-after: start-extra-options
            :end-before: end-extra-options
            :language: csharp
            :dedent:

         .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

      #. Create the MongoClient

         Instantiate a MongoDB client object with the following automatic
         encryption settings that use the variables declared in the previous
         steps:
         
         .. tabs::

            .. tab:: C# Driver v3.0+
               :tabid: csharp-v3

               .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
                  :start-after: start-client
                  :end-before: end-client
                  :language: csharp
                  :dedent:
            
            .. tab:: C# Driver < v3.0
               :tabid: csharp-v2

               .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
                  :start-after: MongoClientSettings.Extensions.AddAutoEncryption(); // .NET/C# Driver v3.0 or later only
                  :end-before: end-client
                  :language: csharp
                  :dedent:

   .. step:: Insert a Document with Encrypted Fields

      Use your {+csfle-abbrev+}-enabled
      ``MongoClient`` instance to insert a {+in-use-doc+} into the
      ``medicalRecords.patients`` namespace using the following code
      snippet:

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
          :start-after: start-insert
          :end-before: end-insert
          :language: csharp
          :dedent:

      When you insert a document, your {+csfle-abbrev+}-enabled client
      encrypts the fields of your document such that it resembles the following:

      .. literalinclude:: /includes/quick-start/inserted-doc-enc.json
         :language: json
         :copyable: false

      .. see:: Complete Code

         To view the complete code for inserting a {+in-use-doc+}, see
         `our Github repository
         <{+sample-app-url-csfle+}/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs>`__

   .. step:: Retrieve Your {+in-use-doc-title+}

      Retrieve the {+in-use-doc+} you inserted in the
      :ref:`Insert a Document with Encrypted Fields <csfle-azure-insert>`
      step of this guide.

      To show the functionality of {+csfle-abbrev+}, the following code snippet queries for
      your document with a client configured for automatic {+csfle-abbrev+} as well as
      a client that is not configured for automatic {+csfle-abbrev+}.

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs
         :start-after: start-find
         :end-before: end-find
         :language: csharp
         :dedent:

      The output of the preceding code snippet should look like this:

      .. literalinclude:: /includes/quick-start/find-output.out
         :language: json
         :copyable: false

      .. see:: Complete Code

         To view the complete code for finding a {+in-use-doc+}, see
         `our Github repository <{+sample-app-url-csfle+}/dotnet/azure/reader/CSFLE/InsertEncryptedDocument.cs>`__






