
.. procedure::
   :style: normal

   .. step:: Create a {+cmk-long+}

      You must create a {+cmk-long+} ({+cmk-abbr+}) to perform {+csfle-abbrev+}.

      Create a 96-byte {+cmk-long+} and save it in your **Local Key Provider**,
      which is your filesystem,
      as the file ``master-key.txt``:

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/java/local/reader/src/main/java/com/mongodb/csfle/MakeDataKey.java
         :start-after: start-local-cmk
         :end-before: end-local-cmk
         :language: javascript
         :dedent:

      In addition to byte strings, you can also use a Base64-encoded string as a
      local key.

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

      .. include:: /includes/in-use-encryption/cmk-csfle-bash.rst

      .. see:: Complete Code
      
         To view the complete code for making a {+cmk-long+}, see
         `our Github repository <{+sample-app-url-csfle+}/node/local/reader/make_data_key.js>`__.
      
   .. step:: Create a Unique Index on your {+key-vault-long+}

      Create a partial unique index on the ``keyAltNames`` field in your
      ``encryption.__keyVault`` namespace. This index should have a 
      ``partialFilterExpression`` for documents where ``keyAltNames`` exists.

      {+csfle+} depends on server-enforced uniqueness of key alternate names.

      .. literalinclude::  /includes/generated/in-use-encryption/csfle/node/local/reader/make_data_key.js
         :start-after: start-create-index
         :end-before: end-create-index
         :language: javascript
         :dedent:

   .. step:: Create a {+dek-long+}

      a. Read the {+cmk-long+} and Specify KMS Provider Settings

         Retrieve the contents of the {+cmk-long+} file that you generated
         in the :ref:`Create a {+cmk-long+} <csfle-quick-start-create-master-key>` step of this guide.

         Use the {+cmk-abbr+} value in your KMS provider settings. The
         client uses these settings to discover the {+cmk-abbr+}. As
         you are using the Local Key Provider, set the provider name to
         ``local``.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/make_data_key.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      #. Create a Data Encryption Key

         Construct a client with your MongoDB connection string and {+key-vault-long+}
         namespace, and create a {+dek-long+}:

         .. note:: {+key-vault-long-title+} Namespace Permissions

            .. include:: /includes/note-key-vault-permissions

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/make_data_key.js
            :start-after: start-create-dek
            :end-before: end-create-dek
            :language: javascript
            :dedent:

         .. include:: /includes/tutorials/automatic/node-include-clientEncryption.rst

         The output from the code above should resemble the following:

         .. code-block:: none
            :copyable: false

            DataKeyId [base64]: 3k13WkSZSLy7kwAAP4HDyQ==

      .. see:: Complete Code

         To view the complete code for making a {+dek-long+}, see
         `our Github repository
         <{+sample-app-url-csfle+}/node/local/reader/make_data_key.js>`__.
      
   .. step:: Configure the MongoClient

      a. Specify the {+key-vault-long-title+} Namespace

         Specify ``encryption.__keyVault`` as the {+key-vault-long+}
         namespace.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/insert_encrypted_document.js
            :start-after: start-key-vault
            :end-before: end-key-vault
            :language: javascript
            :dedent:

      #. Specify the Local {+cmk-long+}

         Specify the KMS provider and specify your key inline:

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/insert_encrypted_document.js
            :start-after: start-kmsproviders
            :end-before: end-kmsproviders
            :language: javascript
            :dedent:

      #. Create an Encryption Schema For Your Collection

         .. tip:: Add Your {+dek-long+} Base64 ID

            Make sure to update the following code to include your Base64
            {+dek-abbr+} ID. You received this value in the
            :ref:`Generate your {+dek-long+} <csfle-local-create-dek>` step of this
            guide.

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/insert_encrypted_document.js
            :start-after: start-schema
            :end-before: end-schema
            :language: javascript
            :dedent:

      #. Specify the Location of the {+shared-library+}

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/insert_encrypted_document.js
            :start-after: start-extra-options
            :end-before: end-extra-options
            :language: javascript
            :dedent:
         
         .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

      #. Create the MongoClient

         Instantiate a MongoDB client object with the following
         automatic encryption settings:

         .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/insert_encrypted_document.js
            :start-after: start-client
            :end-before: end-client
            :language: javascript
            :dedent:

   .. step:: Insert a Document with Encrypted Fields

      Use your {+csfle-abbrev+}-enabled
      ``MongoClient`` instance to insert a {+in-use-doc+} into the
      ``medicalRecords.patients`` namespace using the following code
      snippet:

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/insert_encrypted_document.js
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
         `our Github repository
         <{+sample-app-url-csfle+}/node/local/reader/insert_encrypted_document.js>`__.
         
   .. step:: Retrieve Your {+in-use-doc-title+}

      Retrieve the {+in-use-doc+} you inserted in the
      :ref:`Insert a Document with Encrypted Fields <csfle-quick-start-insert>`
      step of this guide.

      To show the functionality of {+csfle-abbrev+}, the following code snippet queries for
      your document with a client configured for automatic {+csfle-abbrev+} as well as
      a client that is not configured for automatic {+csfle-abbrev+}.

      .. literalinclude:: /includes/generated/in-use-encryption/csfle/node/local/reader/insert_encrypted_document.js
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
         `our Github repository <{+sample-app-url-csfle+}/node/local/reader/insert_encrypted_document.js>`__.