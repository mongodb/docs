.. _csfle-quick-start-set-up-go:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install the dependencies.

      Create and navigate to a directory named ``go-csfle``, and then
      initialize a Go module:

      .. code-block:: bash

         mkdir go-csfle && cd go-csfle
         go mod init go-csfle

      Then, add the MongoDB Go Driver to your project by running the
      following command:

      .. code-block:: bash

         go get go.mongodb.org/mongo-driver/v2/mongo

   .. step:: Create your main project file.

      Add a file named ``main.go`` to your ``go-csfle`` directory
      and paste the following code:

      .. literalinclude:: /includes/csfle/go/main.go
         :language: go
         :dedent:
         :caption: go-csfle/main.go

      The ``main.go`` file contains your main function, which calls
      the functions from your other project files in sequence.

   .. step:: Create your data key file.

      To generate a {+cmk-long+} and {+dek-long+}, create a file
      named ``make_data_key.go`` in your ``go-csfle`` directory and
      paste the following code:

      .. code-block:: go
         :caption: go-csfle/make_data_key.go

         package main

         import (
            "context"
            "crypto/rand"
            "encoding/base64"
            "fmt"
            "os"

            "go.mongodb.org/mongo-driver/v2/bson"
            "go.mongodb.org/mongo-driver/v2/mongo"
            "go.mongodb.org/mongo-driver/v2/mongo/options"
         )

         func MakeKey() error {
            // Paste CMK generation code below

            // Paste index creation code below

            // Paste DEK creation code below

            return nil
         }

      In future steps, you will add code to this file under each
      corresponding comment.

   .. step:: Create your encrypted operations file.

      Next, create a file named ``insert_encrypted_document.go`` in
      your ``go-csfle`` directory and paste the following code:

      .. code-block:: go
         :caption: go-csfle/insert_encrypted_document.go

         package main

         import (
            "context"
            "fmt"
            "os"
            "strings"

            "go.mongodb.org/mongo-driver/v2/bson"
            "go.mongodb.org/mongo-driver/v2/mongo"
            "go.mongodb.org/mongo-driver/v2/mongo/options"
         )

         func Insert() error {
            // Paste JSON schema below

            // Paste client configuration code below

            // Paste code to insert a document below

            // Paste code to query the document below

            return nil
         }

      In future steps, you will add code that inserts and queries
      encrypted documents under each corresponding comment.

   .. step:: Assign your configuration variables.

      Each of your project files uses variables from a configuration
      file. Create a file named ``config.go`` in your ``go-csfle``
      directory and paste the following code:

      .. literalinclude:: /includes/csfle/go/config.go
         :language: go
         :dedent:
         :caption: go-csfle/config.go

      Then, replace the following placeholder values:

      - ``<connection string>``: Your MongoDB connection string
      - ``<Automatic Encryption Shared Library path>``: The full path
        to your {+shared-library+}, which resembles the following paths:
        
        - **macOS**: ``/<crypt shared directory>/lib/mongo_crypt_v1.dylib``
        - **Linux**: ``/<crypt shared directory>/lib/mongo_crypt_v1.so``
        - **Windows**: ``C:\<crypt shared directory>\bin\mongo_crypt_v1.dll``

      The ``config.go`` file instructs your application to store data
      encryption keys in the ``encryption.__keyVault`` namespace.

.. _csfle-quick-start-configure-go:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After setting up your project, follow the steps in this section to
create an encryption key and configure your app for
{+csfle-abbrev+}.

.. procedure::
   :style: connected

   .. _csfle-quick-start-create-master-key-go:

   .. step:: Create a {+cmk-long+}.

      Paste the following code into your ``make_data_key.go`` file
      under the ``// Paste CMK generation code below`` comment to
      generate a 96-byte {+cmk-long+} ({+cmk-abbr+}) and save it to
      your filesystem:

      .. literalinclude:: /includes/csfle/go/make_data_key.go
         :language: go
         :start-after: start-generate-cmk
         :end-before: end-generate-cmk
         :dedent:
         :caption: go-csfle/make_data_key.go

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Create a unique index on your {+key-vault-long+}.

      {+csfle+} depends on server-enforced uniqueness of key alternate
      names, so you must create a unique index on the
      ``keyAltNames`` field in your {+key-vault-long+}.

      Add the following code to your ``make_data_key.go`` file under
      the ``// Paste index creation code below`` comment to connect
      to MongoDB and create a partial unique index on the
      ``keyAltNames`` field:

      .. literalinclude:: /includes/csfle/go/make_data_key.go
         :language: go
         :start-after: start-create-index
         :end-before: end-create-index
         :dedent:
         :caption: go-csfle/make_data_key.go

   .. step:: Create a {+dek-long+}.

      Add the following code to your ``make_data_key.go`` file under
      the ``// Paste DEK creation code below`` comment to configure a
      ``ClientEncryption`` instance and generate a {+dek-long+}:

      .. literalinclude:: /includes/csfle/go/make_data_key.go
         :language: go
         :start-after: start-create-data-key
         :end-before: end-create-data-key
         :dedent:
         :caption: go-csfle/make_data_key.go

      The ``ClientEncryption`` instance uses your KMS provider
      credentials, key vault namespace, and client to manage encryption
      keys. Once configured, the code calls ``CreateDataKey`` to
      generate a {+dek-long+} and writes it to a separate file.

   .. step:: Define an encryption schema.

      Add the following code to your
      ``insert_encrypted_document.go`` file under the
      ``// Paste JSON schema below`` comment to define an encryption
      schema:

      .. literalinclude:: /includes/csfle/go/insert_encrypted_document.go
         :language: go
         :start-after: start-json-schema
         :end-before: end-json-schema
         :dedent:
         :caption: go-csfle/insert_encrypted_document.go

      The code reads your {+dek-abbr+} ID and uses it to encrypt the
      following fields in the ``medicalRecords.patients`` collection:

      - ``insurance.policyNumber``: Deterministically encrypted
      - ``ssn``: Deterministically encrypted
      - ``bloodType``: Randomly encrypted
      - ``medicalRecords``: Randomly encrypted

      Deterministic encryption allows you to perform equality queries
      on the encrypted fields. Random encryption provides stronger
      security for fields that you don't need to query, because this
      algorithm does not support read operations on the encrypted
      fields.

   .. step:: Create a {+csfle-abbrev+}-enabled client.

      Paste the following code into your
      ``insert_encrypted_document.go`` file under the
      ``// Paste client configuration code below`` comment to create
      two MongoDB clients:

      .. literalinclude:: /includes/csfle/go/insert_encrypted_document.go
         :language: go
         :start-after: start-create-client
         :end-before: end-create-client
         :dedent:
         :caption: go-csfle/insert_encrypted_document.go

      This code creates a ``MongoClient`` instance that uses
      ``AutoEncryptionOptions``. The options specify your KMS provider
      credentials, key vault namespace, encryption schema, and the
      location of your {+shared-library+}. The code also creates a
      standard ``MongoClient`` instance without automatic encryption.
      In a future step, you will compare the output of both clients.

      .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

.. _csfle-quick-start-operations-go:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After configuring your app and database connection, follow
the steps in this section to insert and query encrypted documents.

.. procedure::
   :style: connected

   .. _csfle-quick-start-insert-go:

   .. step:: Insert a document with encrypted fields.

      Add the following code to your
      ``insert_encrypted_document.go`` file under the
      ``// Paste code to insert a document below`` comment to insert
      a document into the ``medicalRecords.patients`` collection:

      .. literalinclude:: /includes/csfle/go/insert_encrypted_document.go
         :language: go
         :start-after: start-insert-document
         :end-before: end-insert-document
         :dedent:
         :caption: go-csfle/insert_encrypted_document.go

      When you insert the document, your {+csfle-abbrev+}-enabled
      client automatically encrypts the specified fields. The stored
      document resembles the following:

      .. literalinclude:: /includes/quick-start/inserted-doc-enc.json
         :language: json
         :copyable: false

   .. step:: Query encrypted data.

      Add the following code to your
      ``insert_encrypted_document.go`` file under the
      ``// Paste code to query the document below`` comment to
      retrieve the document with both a {+csfle-abbrev+}-enabled
      client and a standard client:

      .. literalinclude:: /includes/csfle/go/insert_encrypted_document.go
         :language: go
         :start-after: start-find-document
         :end-before: end-find-document
         :dedent:
         :caption: go-csfle/insert_encrypted_document.go

      The {+csfle-abbrev+}-enabled client automatically decrypts the
      encrypted fields when it retrieves the document. The standard
      client returns the encrypted binary values.

   .. step:: Run the application.

      To install required dependencies, run the following command
      from your project directory:

      .. code-block:: bash

         go mod tidy

      Then start the application:

      .. code-block:: bash

         go run -tags cse .

      .. note::

         Go CSFLE applications require the ``-tags cse`` build
         flag to run.

      If successful, your output resembles the following example:

      .. code-block:: none
         :copyable: false

         ============================================================
         Running make_data_key...
         ============================================================
         DataKeyId [base64]: <dataKeyId>

         ============================================================
         Running insert_encrypted_document...
         ============================================================
         Finding a document with the regular (non-encrypted) client:
         {
             "_id": {
                 "$oid": "..."
             },
             "name": "Jon Doe",
             "ssn": {
                 "$binary": {
                     "base64": "...",
                     "subType": "06"
                 }
             },
             "bloodType": {
                 "$binary": {
                     "base64": "...",
                     "subType": "06"
                 }
             },
             "medicalRecords": {
                 "$binary": {
                     "base64": "...",
                     "subType": "06"
                 }
             },
             "insurance": {
                 "provider": "MaestCare",
                 "policyNumber": {
                     "$binary": {
                         "base64": "...",
                         "subType": "06"
                     }
                 }
             }
         }

         Finding a document with the encrypted client:
         {
             "_id": {
                 "$oid": "..."
             },
             "name": "Jon Doe",
             "ssn": 241014209,
             "bloodType": "AB+",
             "medicalRecords": [
                 {
                     "bloodPressure": "120/80",
                     "weight": 180
                 }
             ],
             "insurance": {
                 "provider": "MaestCare",
                 "policyNumber": 123142
             }
         }

         ============================================================
         All scripts completed successfully!
         ============================================================

      The output includes your {+dek-abbr+} ID, the encrypted
      document as stored in your database, and the decrypted document
      retrieved with your {+csfle-abbrev+}-enabled client.
