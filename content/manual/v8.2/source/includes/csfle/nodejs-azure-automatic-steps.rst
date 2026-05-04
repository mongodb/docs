.. procedure::
   :style: normal

   .. step:: Create a Unique Index on your {+key-vault-long+}
      
      .. _csfle-azure-create-index:

      Create a unique index on the ``keyAltNames`` field in your
      ``encryption.__keyVault`` namespace.

      .. include:: /includes/queryable-encryption/tab-note.rst

      .. literalinclude::  /includes/generated/in-use-encryption/csfle/node/azure/reader/make_data_key.js
         :start-after: start-create-index
         :end-before: end-create-index
         :language: javascript
         :dedent:

   .. step:: Create a New {+dek-long+}

      a. Add your {+azure-kv+} Credentials

         .. _csfle-tutorials-automatic-encryption-azure-kms-providers:

         Add the service account credentials to your CSFLE-enabled client
         code.

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

      #. Add Your Key Information

         Update the following code to specify your {+cmk-long+}:

         .. tip::

            You recorded your {+cmk-long+}'s {+aws-arn-abbr+} and Region
            in the :ref:`Create a {+cmk-long+} <aws-create-master-key>`
            step of this guide.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/make_data_key.js
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: javascript
            :dedent:

      #. Generate your {+dek-long+}

         .. _csfle-azure-create-dek:

         Generate your {+dek-long+} using the variables declared in :ref:`step one
         <csfle-azure-create-index>` of this tutorial.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

         .. include:: /includes/tutorials/automatic/node-include-clientEncryption.rst

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
         <{+sample-app-url-csfle+}/node/azure/reader/make_data_key.js>`__.
         
   .. step:: Configure the MongoClient

      .. tip::

         Follow the remaining steps in this tutorial in a separate file from the
         one created in the previous steps.

         To view the complete code for this file, see
         `our Github repository
         <{+sample-app-url-csfle+}/node/azure/reader/insert_encrypted_document.js>`__.
         
      a. Specify the {+key-vault-long-title+} Namespace

         Specify ``encryption.__keyVault`` as the {+key-vault-long+}
         namespace.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
            :start-after: start-key-vault
            :end-before: end-key-vault
            :language: javascript
            :dedent:

      #. Specify your Azure Credentials

         Specify the ``azure`` KMS provider and your Azure
         credentials:

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      #. Create an Encryption Schema For Your Collection

         .. tip:: Add Your {+dek-long+} Base64 ID

            Make sure to update the following code to include your Base64
            {+dek-abbr+} ID. You received this value in the
            :ref:`Generate your {+dek-long+} <csfle-azure-create-dek>` step of this
            guide.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
            :start-after: start-schema
            :end-before: end-schema
            :language: javascript
            :dedent:

      #. Specify the Location of the {+shared-library+}

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
            :start-after: start-extra-options
            :end-before: end-extra-options
            :language: javascript
            :dedent:

         .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

      #. Create the MongoClient

         Instantiate a MongoDB client object with the following automatic
         encryption settings that use the variables declared in the previous
         steps:
         
         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
            :start-after: start-client
            :end-before: end-client
            :language: javascript
            :dedent:

   .. step:: Insert a Document with Encrypted Fields

      .. _csfle-azure-insert:

      Use your {+csfle-abbrev+}-enabled
      ``MongoClient`` instance to insert a {+in-use-doc+} into the
      ``medicalRecords.patients`` namespace using the following code
      snippet:

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
         :start-after: start-insert
         :end-before: end-insert
         :language: javascript
         :dedent:

      When you insert a document, your {+csfle-abbrev+}-enabled client
      encrypts the fields of your document such that it resembles the following:

      .. literalinclude:: /includes/quick-start/inserted-doc-enc.json
         :language: json
         :copyable: false

      .. see:: Complete Code

         To view the complete code for inserting a {+in-use-doc+}, see
         `our Github repository <{+sample-app-url-csfle+}/node/azure/reader/insert_encrypted_document.js>`__.

   .. step:: Retrieve Your {+in-use-doc-title+}

      Retrieve the {+in-use-doc+} you inserted in the
      :ref:`Insert a Document with Encrypted Fields <csfle-azure-insert>`
      step of this guide.

      To show the functionality of {+csfle-abbrev+}, the following code snippet queries for
      your document with a client configured for automatic {+csfle-abbrev+} as well as
      a client that is not configured for automatic {+csfle-abbrev+}.

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/azure/reader/insert_encrypted_document.js
         :start-after: start-find
         :end-before: end-find
         :language: javascript
         :dedent:

      The output of the preceding code snippet should look like this:

      .. literalinclude:: /includes/quick-start/find-output.out
         :language: json
         :copyable: false

      .. see:: Complete Code

         To view the complete code for finding a {+in-use-doc+}, see
         `our Github repository <{+sample-app-url-csfle+}/node/azure/reader/insert_encrypted_document.js>`__.





