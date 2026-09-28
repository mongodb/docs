.. _csfle-quick-start-set-up-nodejs:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install the dependencies.

      Create a directory named ``nodeCSFLE`` to store your project
      files. From this directory, run the following commands
      to initialize your project and install the required packages:

      .. code-block:: bash

         npm init -y
         npm install mongodb mongodb-client-encryption

      Then, open the generated ``package.json`` file. To use `ECMAScript modules <https://nodejs.org/api/esm.html#modules-ecmascript-modules>`__,
      the standard format for packaging JavaScript code for reuse, replace the
      existing line that specifies the ``"type"`` field with the following line:

      .. code-block:: json

         "type": "module"

   .. step:: Create your main project file.

      Add a file named ``main.js`` to your ``nodeCSFLE`` directory.
      Paste the following code into this file:

      .. literalinclude:: /includes/csfle/nodejs/main.js
         :language: javascript
         :caption: nodeCSFLE/main.js
         :dedent:

      The ``main.js`` file contains your main function, which imports
      and runs the code from the other project files.

   .. step:: Create your data key file.

      To generate a {+cmk-long+} and {+dek-long+}, create a file named
      ``makeDataKey.js`` in your ``nodeCSFLE`` directory and paste
      the following code:

      .. code-block:: javascript
         :caption: nodeCSFLE/makeDataKey.js

         import { MongoClient, ClientEncryption } from "mongodb";
         import fs from "fs";
         import crypto from "crypto";
         import * as config from "./config.js";

         // Paste CMK generation code below

         async function makeKey() {
           // Paste index creation code below

           // Paste DEK creation code below
         }

         export { makeKey };

      In future steps, you will add code to this file under each
      corresponding comment.

   .. step:: Create your encrypted operations file.

      Next, create a file named ``insertEncryptedDocument.js`` in
      your ``nodeCSFLE`` directory and paste the following code:

      .. code-block:: javascript
         :caption: nodeCSFLE/insertEncryptedDocument.js

         import { MongoClient, Binary } from "mongodb";
         import fs from "fs";
         import * as config from "./config.js";

         async function insert() {
           // Paste JSON schema below

           // Paste client configuration code below

           // Paste code to insert a document below

           // Paste code to query the document below
         }

         export { insert };

      In future steps, you will add code that inserts and queries
      encrypted documents under each corresponding comment.

   .. step:: Assign your configuration variables.

      Each of your project files imports variables from a
      configuration file. Create a file named ``config.js`` in your
      ``nodeCSFLE`` directory and paste the following code:

      .. literalinclude:: /includes/csfle/nodejs/config.js
         :language: javascript
         :caption: nodeCSFLE/config.js
         :dedent:

      Then, replace the following placeholder values:

      - ``<connection string>``: Your MongoDB connection string
      - ``<Automatic Encryption Shared Library path>``: The full path
        to your {+shared-library+}, which resembles the following paths:
        
        - **macOS**: ``/<crypt shared directory>/lib/mongo_crypt_v1.dylib``
        - **Linux**: ``/<crypt shared directory>/lib/mongo_crypt_v1.so``
        - **Windows**: ``C:\<crypt shared directory>\bin\mongo_crypt_v1.dll``

      The ``config.js`` file instructs your application to store data
      encryption keys in the ``encryption.__keyVault`` namespace.

.. _csfle-quick-start-configure-nodejs:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After setting up your project, follow the steps in this section to
create an encryption key and configure your application for
{+csfle-abbrev+}.

.. procedure::
   :style: connected

   .. _csfle-quick-start-create-master-key-nodejs:

   .. step:: Create a {+cmk-long+}.

      Paste the following code into your ``makeDataKey.js`` file
      under the ``// Paste CMK generation code below`` comment. This
      code generates a 96-byte {+cmk-long+} ({+cmk-abbr+}) and saves it to
      your filesystem:

      .. literalinclude:: /includes/csfle/nodejs/makeDataKey.js
         :language: javascript
         :caption: nodeCSFLE/makeDataKey.js
         :start-after: start-generate-cmk
         :end-before: end-generate-cmk
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Create a unique index on your {+key-vault-long+}.

      {+csfle+} depends on server-enforced uniqueness of key alternate
      names, so you must create a unique index on the ``keyAltNames``
      field in your {+key-vault-long+}.

      Add the following code to your ``makeDataKey.js`` file under
      the ``// Paste index creation code below`` comment to connect
      to MongoDB and create a partial unique index on the
      ``keyAltNames`` field:

      .. literalinclude:: /includes/csfle/nodejs/makeDataKey.js
         :language: javascript
         :caption: nodeCSFLE/makeDataKey.js
         :start-after: start-create-index
         :end-before: end-create-index
         :dedent:

   .. step:: Create a {+dek-long+}.

      Add the following code to your ``makeDataKey.js`` file under
      the ``// Paste DEK creation code below`` comment to configure
      a ``ClientEncryption`` instance and generate a {+dek-long+}:

      .. literalinclude:: /includes/csfle/nodejs/makeDataKey.js
         :language: javascript
         :caption: nodeCSFLE/makeDataKey.js
         :start-after: start-create-data-key
         :end-before: end-create-data-key
         :dedent:

      The ``ClientEncryption`` instance uses your KMS provider
      credentials, key vault namespace, and your client to manage
      encryption keys. Once configured, the code calls the
      ``createDataKey()`` method to generate a {+dek-long+} and
      writes it to a separate file.

   .. step:: Define an encryption schema.

      Add the following code to your ``insertEncryptedDocument.js``
      file under the ``// Paste JSON schema below`` comment to define
      an encryption schema:

      .. literalinclude:: /includes/csfle/nodejs/insertEncryptedDocument.js
         :language: javascript
         :caption: nodeCSFLE/insertEncryptedDocument.js
         :start-after: start-json-schema
         :end-before: end-json-schema
         :dedent:

      The code reads your {+dek-abbr+} ID and uses it to encrypt the
      following fields in the ``medicalRecords.patients`` collection:

      - ``insurance.policyNumber``: Encrypted with deterministic
        encryption
      - ``ssn``: Encrypted with deterministic encryption
      - ``bloodType``: Encrypted with random encryption
      - ``medicalRecords``: Encrypted with random encryption

      Deterministic encryption allows you to perform equality queries
      on the encrypted fields. Random encryption provides
      stronger security for fields that do not require querying.

   .. step:: Create a standard and a {+csfle-abbrev+}-enabled client.

      Paste the following code into your
      ``insertEncryptedDocument.js`` file under the
      ``// Paste client configuration code below`` comment
      to create two MongoDB clients:

      .. literalinclude:: /includes/csfle/nodejs/insertEncryptedDocument.js
         :language: javascript
         :caption: nodeCSFLE/insertEncryptedDocument.js
         :start-after: start-create-client
         :end-before: end-create-client
         :dedent:

      This code creates a ``MongoClient`` instance with an
      ``autoEncryption`` object that specifies your KMS provider
      credentials, key vault namespace, encryption schema, and the
      location of your {+shared-library+}. The code also creates a
      standard ``MongoClient`` instance without automatic encryption.
      In a future step, you will compare the output of both clients.

      .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

.. _csfle-quick-start-operations-nodejs:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After configuring your application and database connection, follow
the steps in this section to insert and query encrypted documents.

.. procedure::
   :style: connected

   .. _csfle-quick-start-insert-nodejs:

   .. step:: Insert a document with encrypted fields.

      Add the following code to your ``insertEncryptedDocument.js``
      file under the
      ``// Paste code to insert a document below`` comment to insert
      a document into the ``medicalRecords.patients`` collection:

      .. literalinclude:: /includes/csfle/nodejs/insertEncryptedDocument.js
         :language: javascript
         :caption: nodeCSFLE/insertEncryptedDocument.js
         :start-after: start-insert-document
         :end-before: end-insert-document
         :dedent:

      When you insert the document, your {+csfle-abbrev+}-enabled
      client automatically encrypts the specified fields. The stored
      document resembles the following JSON:

      .. literalinclude:: /includes/quick-start/inserted-doc-enc.json
         :language: json
         :copyable: false

   .. step:: Query encrypted data.

      Add the following code to your ``insertEncryptedDocument.js``
      file under the
      ``// Paste code to query the document below`` comment to
      retrieve the document with both a {+csfle-abbrev+}-enabled
      client and a standard client:

      .. literalinclude:: /includes/csfle/nodejs/insertEncryptedDocument.js
         :language: javascript
         :caption: nodeCSFLE/insertEncryptedDocument.js
         :start-after: start-find-document
         :end-before: end-find-document
         :dedent:

      The {+csfle-abbrev+}-enabled client automatically decrypts the
      encrypted fields when it retrieves the document. The standard
      client returns the encrypted binary values.

   .. step:: Run the application.

      To start the application, run the following command from your
      project directory:

      .. code-block:: bash

         node main.js

      If successful, your output resembles the following example:

      .. code-block:: none
         :copyable: false

         ============================================================
         Running makeDataKey.js...
         ============================================================
         DataKeyId [base64]:  ...

         ============================================================
         Running insertEncryptedDocument.js...
         ============================================================
         Finding a document with the regular (non-encrypted) client:
         {
            _id: new ObjectId('...'),
            name: 'Jon Doe',
            ssn: Binary.createFromBase64('AbOZ3SnfHUt0rXzbnMDZQUoQlAGa8Spse/0TtNt6H1HdSKmHx4Hvqa0GpadZ9r0WKueVLD7/sslIn6EgBP2NbLw6DgZy9Jeo7Ze9b4IAfmXtVA==', 6),
            bloodType: Binary.createFromBase64('ArOZ3SnfHUt0rXzbnMDZQUoCmoaHVdpLs9dZF927WGGiinrtIU2lcuM9Oh6tsqh1Cvh9s7lxEzoBjLIT2TwmQ74ZVqi2Anogj0KmEtsOrlmrYQ==', 6),
            medicalRecords: Binary.createFromBase64('ArOZ3SnfHUt0rXzbnMDZQUoEfL3BP3IahNwrClkFuN1WJG/Ldfjf+KU/vpD7I9jqjXxNl61ABctZkdJyZU1Mbi7cO+RSAvaGoYQhEeBUubRKiAe6pRyhZS7BijiF1D2BaqZmk4gDlMggdGzstpVlPeaN/W2NRWH0l0w222Pn33fsvQ==', 6),
            insurance: {
               policyNumber: Binary.createFromBase64('AbOZ3SnfHUt0rXzbnMDZQUoQr99GZNZ/FDEVkGek0B3NhQpJZNnfp8lWVkg/Vl2uMd+Lc8q7wt70+TCk6x1XxiKGGZi/EsWm1nE8FfuBASjBiA==', 6),
               provider: 'MaestCare'
            }
         }

         Finding a document with the encrypted client:
         {
            _id: new ObjectId('...'),
            name: 'Jon Doe',
            ssn: 241014209,
            bloodType: 'AB+',
            medicalRecords: [ { weight: 180, bloodPressure: '120/80' } ],
            insurance: { policyNumber: 123142, provider: 'MaestCare' }
         }
         ============================================================
         All scripts completed successfully!
         ============================================================

      The output includes your {+dek-abbr+} ID, the encrypted
      document as stored in your database, and the decrypted document
      retrieved with your {+csfle-abbrev+}-enabled client.
