.. procedure::
   :style: normal

   .. step:: Configure your {+kmip-kms-no-hover+}

      .. include:: /includes/tutorials/automatic/kmip/configure.rst

   .. step:: Specify your Certificates

      Your client must connect to your {+kmip-kms+} through TLS and present
      a client certificate that your {+kmip-kms+} accepts:

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/make_data_key.js
         :start-after: start-create-tls
         :end-before: end-create-tls
         :language: javascript
         :dedent:

Create the Application
~~~~~~~~~~~~~~~~~~~~~~

.. procedure::
   :style: normal

   .. step:: Create a Unique Index on Your Key Vault Collection

      .. _csfle-kmip-create-index:

      Create a unique index on the ``keyAltNames`` field in your
      ``encryption.__keyVault`` namespace.

      .. include:: /includes/queryable-encryption/tab-note.rst

      .. literalinclude::  /includes/generated/in-use-encryption/csfle/node/kmip/reader/make_data_key.js
         :start-after: start-create-index
         :end-before: end-create-index
         :language: javascript
         :dedent:

   .. step:: Create a {+dek-long+}

      a. Add your Endpoint

         Specify the URI endpoint of your {+kmip-kms+}:

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/make_data_key.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

         .. include:: /includes/queryable-encryption/tutorials/automatic/named-kms-note.rst

            .. replacement:: kms-provider

               KMIP
                        
            .. replacement:: kms-provider-name

               "my_kmip_provider"

      #. Add Your Key Information

         The following code prompts your {+kmip-kms+} to automatically generate
         a {+cmk-long+}:

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/make_data_key.js
            :start-after: start-datakeyopts
            :end-before: end-datakeyopts
            :language: javascript
            :dedent:

      #. Generate your {+dek-long+}

         .. _csfle-kmip-create-dek:

         Generate your {+dek-long+} using the variables declared in :ref:`step one
         <csfle-kmip-create-index>` of this tutorial.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

         .. include:: /includes/tutorials/automatic/node-include-clientEncryption.rst

      .. see:: Complete Code

         To view the complete code for making a {+dek-long+}, see
         `our Github repository <{+sample-app-url-csfle+}/node/kmip/reader/make_data_key.js>`__.

   .. step:: Configure the MongoClient

      .. tip::

         Follow the remaining steps in this tutorial in a separate file
         from the one created in the previous steps.

         To view the complete code for this file, see
         `our Github repository
         <{+sample-app-url-csfle+}/node/kmip/reader/insert_encrypted_document.js>`__.
         
      a. Specify the {+key-vault-long-title+} Namespace

         Specify ``encryption.__keyVault`` as the {+key-vault-long+}
         namespace.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
            :start-after: start-key-vault
            :end-before: end-key-vault
            :language: javascript
            :dedent:

      #. Specify your KMIP Endpoint

         Specify ``kmip`` in your ``kmsProviders`` object and enter
         the URI endpoint of your {+kmip-kms+}:

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      #. Create an Encryption Schema For Your Collection

         Create an encryption schema that specifies how your client
         application encrypts your documents' fields:

         .. tip:: Add Your {+dek-long+} Base64 ID

            Make sure to update the following code to include your Base64
            {+dek-abbr+} ID. You received this value in the
            :ref:`Generate your {+dek-long+} <csfle-kmip-create-dek>` step of this
            guide.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
            :start-after: start-schema
            :end-before: end-schema
            :language: javascript
            :dedent:

         .. include:: /includes/quick-start/schema/further-reading-note.rst

      #. Specify the Location of the {+shared-library+}

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
            :start-after: start-extra-options
            :end-before: end-extra-options
            :language: javascript
            :dedent:

         .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

      #. Create the MongoClient

         Instantiate a MongoDB client object with the following automatic
         encryption settings that use the variables declared in the previous
         steps:
         
         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
            :start-after: start-client
            :end-before: end-client
            :language: javascript
            :dedent:

   .. step:: Insert a Document with Encrypted Fields

      .. _csfle-kmip-insert:

      Use your {+csfle-abbrev+}-enabled
      ``MongoClient`` instance to insert a {+in-use-doc+} into the
      ``medicalRecords.patients`` namespace using the following code
      snippet:

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
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
         `our Github repository <{+sample-app-url-csfle+}/node/kmip/reader/insert_encrypted_document.js>`__.

   .. step:: Retrieve Your {+in-use-doc-title+}

      Retrieve the {+in-use-doc+} you inserted in the
      :ref:`Insert a Document with Encrypted Fields <csfle-kmip-insert>`
      step of this guide.

      To show the functionality of {+csfle-abbrev+}, the following code snippet queries for
      your document with a client configured for automatic {+csfle-abbrev+} as well as
      a client that is not configured for automatic {+csfle-abbrev+}.

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/kmip/reader/insert_encrypted_document.js
         :start-after: start-find
         :end-before: end-find
         :language: javascript
         :dedent:

      The output of the preceding code snippet should look like this:

      .. literalinclude:: /includes/quick-start/find-output.out
         :language: json
         :copyable: false

      .. see:: Complete Code

         To view the complete code for inserting a {+in-use-doc+}, see
         `our Github repository <{+sample-app-url-csfle+}/node/kmip/reader/insert_encrypted_document.js>`__.