.. _qe-quick-start-set-up-nodejs:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install dependencies.

      Create a directory named ``nodeQE`` to store your project
      files. Run the following commands to navigate into the directory,
      initialize your project, and install the required packages:

      .. code-block:: bash

         cd nodeQE
         npm init -y
         npm install mongodb-client-encryption dotenv

      Then, open the generated ``package.json`` file. To use `ECMAScript modules <https://nodejs.org/api/esm.html#modules-ecmascript-modules>`__,
      the standard format for packaging JavaScript code for reuse, replace the
      existing line that specifies the ``"type"`` field with the following line:

      .. code-block:: json

         "type": "module"

   .. step:: Set up your environment variables.

      In your ``nodeQE`` directory, create a ``.env`` file. The sample code in 
      this tutorial references environment variables that you need to set in 
      this ``.env`` file. Paste the following code into this file:

      .. literalinclude:: /includes/qe-tutorials/node/env_template
         :language: text
         :start-after: MongoDB connection uri and automatic encryption shared library path
         :end-before: AWS Credentials
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/env-variables.rst

      For more information on setting up environment variables, see the 
      `README.md <{+sample-app-url-qe+}/node/README.md>`__  file included in the 
      sample application on GitHub.

   .. step:: Create your main project file.

      In your ``nodeQE`` directory, create a file named ``quickstart.js``.
      Paste the following starter code into this file. The placeholder comments
      indicate where you will add code in future steps of this tutorial:

      .. code-block:: javascript
         :caption: nodeQE/quickstart.js

         import "dotenv/config";
         import { existsSync, writeFileSync, readFileSync } from "node:fs";
         import { randomBytes } from "node:crypto";
         import { MongoClient } from "mongodb";
         import { ClientEncryption } from "mongodb";
         
         async function runExample() {

           // Paste application variables below

           // Paste code to generate CMK below

           // Paste code to retrieve CMK and specify KMS provider settings below 

           // Paste automatic encryption options code below

           // Paste client configuration code below

           // Paste schema below

           // Paste code to create an encrypted collection below

           // Paste code to insert a document below

           // Paste code to query the document below
         }

         runExample().catch(console.dir);

      .. include:: /includes/tutorials/automatic/node-include-clientEncryption.rst

   .. step:: Assign your application variables.

      Declare the required application variables by pasting the following code into your
      ``quickstart.js`` file under the ``// Paste application variables below``
      comment. For this tutorial, set the ``kmsProviderName`` variable to 
      ``"local"``.

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-tutorial.js
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: javascript
         :dedent:

      The following table describes each application variable in the code snippet:
      
      .. list-table::
         :header-rows: 1
         :widths: 30 70
         
         * - Variable
           - Description
         * - ``kmsProviderName``
           - The KMS used to store your {+cmk-long+}. For this
             tutorial, set this variable to ``"local"``.
         * - ``uri``
           - Your MongoDB connection URI. Set with the
             ``MONGODB_URI`` environment variable.
         * - ``keyVaultDatabaseName``
           - The database where DEKs are stored. Set to ``"encryption"``.
         * - ``keyVaultCollectionName``
           - The collection where DEKs are stored. Set to ``"__keyVault"``.
         * - ``keyVaultNamespace``
           - The namespace in MongoDB where your DEKs are stored. Set this 
             variable to the values of the ``keyVaultDatabaseName`` and
             ``keyVaultCollectionName`` variables, separated by a period.
         * - ``encryptedDatabaseName``
           - The database where encrypted data is stored. Set to
             ``"medicalRecords"``.
         * - ``encryptedCollectionName``
           - The collection where encrypted data is stored. Set to
             ``"patients"``.

.. _qe-quick-start-configure-nodejs:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After you set up your project, follow the steps in this section to create an 
encryption key and configure your application for {+qe+}.

.. procedure:: 
   :style: connected

   .. step:: Create an encryption key.
       
      Paste the following code into your ``quickstart.js`` file under the 
      ``// Paste code to generate CMK below`` comment. This code snippet creates 
      a 96-byte {+cmk-long+} and saves it to your filesystem as the
      file ``customer-master-key.txt``:
    
      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
         :start-after: start-generate-local-key
         :end-before: end-generate-local-key
         :language: javascript
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst
    
   .. step:: Retrieve the {+cmk-long+} and specify the KMS provider settings.

      .. _qe-field-level-encryption-data-key-create:
      .. _field-level-encryption-data-key-create:

      Paste the following code into your ``quickstart.js`` file under the 
      ``// Paste code to retrieve CMK and specify KMS provider settings below`` 
      comment to retrieve the contents of the ``customer-master-key.txt`` file 
      you generated in the previous step:

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
         :start-after: start-get-local-key
         :end-before: end-get-local-key
         :emphasize-lines: 10-14
         :language: javascript
         :dedent:

      This code sets the provider name to ``local`` to use a Local Key Provider
      and uses the {+cmk-abbr+} value from your KMS provider settings.

   .. step:: Set your automatic encryption options.

      Add the following code under the 
      ``// Paste automatic encryption options code below`` comment to create an 
      ``autoEncryptionOptions`` object that contains the following
      options:

      - The namespace of your {+key-vault-long+}
      - The ``kmsProviders`` object, defined in the previous step
      - The ``sharedLibraryPathOptions`` object, which contains the path to
        your {+shared-library+}

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
         :start-after: start-auto-encryption-options
         :end-before: end-auto-encryption-options
         :emphasize-lines: 5-9
         :language: javascript
         :dedent:

   .. step:: Create a client to set up an encrypted collection.

      Create a new client to encrypt and decrypt your collection. The client
      uses your connection URI and automatic encryption options. Paste the 
      following code into your ``quickstart.js`` file, under the 
      ``// Paste client configuration code below`` comment:

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-tutorial.js
         :start-after: start-create-client
         :end-before: end-create-client
         :language: javascript
         :dedent:

   .. step:: Specify fields to encrypt. 

      To encrypt a field, add it to the {+enc-schema+}. To enable queries on a 
      field, add the ``queries`` property. Paste the following code under the 
      ``// Paste schema below`` comment:

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-tutorial.js
         :start-after: start-encrypted-fields-map
         :end-before: end-encrypted-fields-map
         :language: javascript
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/encrypted-fields-query-note.rst

   .. step:: Create your encrypted collection.

      Add the following code blocks to your ``quickstart.js`` file, under the
      ``// Paste code to create an encrypted collection below`` comment in the
      order shown.

      First, instantiate a ``ClientEncryption`` object to access the API for the
      encryption helper methods:

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
         :start-after: start-client-encryption
         :end-before: end-client-encryption
         :language: javascript
         :dedent:

      Because you are using a local {+cmk-long+}, you don't need to provide 
      {+cmk-long+} credentials. Create a variable containing an empty object to 
      use in place of credentials when you create your encrypted collection.

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
         :start-after: start-kmip-local-cmk-credentials
         :end-before: end-kmip-local-cmk-credentials
         :language: javascript
         :dedent:

      Create your encrypted collection by using the encryption helper method 
      accessed through the ``ClientEncryption`` class. This method automatically 
      generates data encryption keys for your encrypted fields and creates the 
      encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-helpers.js
         :start-after: start-create-encrypted-collection
         :end-before: end-create-encrypted-collection
         :language: javascript
         :dedent:

.. _qe-quick-start-operations-nodejs:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After you configure your application and database connection, you can insert 
and query encrypted documents. 

.. procedure:: 
   :style: connected 

   .. step:: Insert a document with encrypted fields.

      Paste the following code under the
      ``// Paste code to insert a document below`` comment to create a
      document that stores patient data and insert it into the ``patients``
      collection:

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-tutorial.js
         :start-after: start-insert-document
         :end-before: end-insert-document
         :emphasize-lines: 18
         :language: javascript
         :dedent:

   .. step:: Query on encrypted data.  

      Add the following code to your ``quickstart.js`` file under the 
      ``// Paste code to query the document below`` comment:

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-tutorial.js
         :start-after: start-find-document
         :end-before: end-find-document
         :language: javascript
         :dedent:

   .. step:: Run your application.

      To start your application, run the following command from your project 
      directory: 

      .. code-block:: bash

         node quickstart.js

      The output of the preceding code sample should look similar to the
      following:

      .. literalinclude:: /includes/qe-tutorials/encrypted-document.json
         :language: json
         :copyable: false
         :dedent:

      .. include:: /includes/queryable-encryption/safe-content-warning.rst
