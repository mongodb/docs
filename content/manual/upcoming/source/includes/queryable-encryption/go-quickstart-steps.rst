.. _qe-quick-start-set-up-go:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install libmongocrypt 1.8.0 or later

      For instructions on how to install ``libmongocrypt``, select your 
      operating system and the :guilabel:`Go` driver on the :ref:`qe-install` 
      page.

   .. step:: Install dependencies.

      Create a directory named ``go-qe`` to store your project files. Run the
      following commands to navigate into the directory, initialize your
      project, and install the required packages:

      .. code-block:: bash

         cd go-qe
         go mod init go-qe
         go get go.mongodb.org/mongo-driver/v2/mongo
         go get github.com/joho/godotenv

   .. step:: Set up your environment variables.

      In your ``go-qe`` directory, create a ``.env`` file. The sample code in
      this tutorial references environment variables that you need to set in
      this ``.env`` file. Paste the following code into this file:

      .. literalinclude:: /includes/qe-tutorials/go/env_template
         :language: bash
         :end-before: AWS Credentials
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/env-variables.rst

      For more information on setting up environment variables, see the
      `README.md <{+sample-app-url-qe+}/go/README.md>`__  file included in the
      sample application on GitHub.

   .. step:: Create your data model file.

      This Go tutorial uses structs to represent the document structure. In your ]
      ``go-qe`` directory, create a file named ``models.go``
      and paste the following code into this file:

      .. literalinclude:: /includes/qe-tutorials/go/models.go
         :language: go
         :dedent:

   .. step:: Create your main project file.

      In your ``go-qe`` directory, create a file named ``main.go``. Paste the
      following starter code into this file. The placeholder comments indicate
      where you will add code in future steps of this tutorial:

      .. code-block:: go
         :caption: go-qe/main.go

         package main

         import (
             "context"
             "crypto/rand"
             "encoding/json"
             "fmt"
             "os"

             "github.com/joho/godotenv"
             "go.mongodb.org/mongo-driver/v2/bson"
             "go.mongodb.org/mongo-driver/v2/mongo"
             "go.mongodb.org/mongo-driver/v2/mongo/options"
         )

         func main() {

             if err := godotenv.Load(".env"); err != nil {
                 panic("Error loading .env file")
             }

             // Paste application variables below

             // Paste code to generate CMK below

             // Paste code to retrieve CMK and specify KMS provider settings below

             // Paste automatic encryption options code below

             // Paste client configuration code below

             // Paste JSON schema below

             // Paste code to create an encrypted collection below

             // Paste code to insert a document below

             // Paste code to query the document below
         }

   .. step:: Assign your application variables.

      Declare the required application variables by pasting the following code 
      into your ``main.go`` file under the ``// Paste application variables 
      below`` comment. For this tutorial, set the ``kmsProviderName`` variable to 
      ``"local"``.

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_tutorial.go
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: go
         :dedent:

      .. list-table::
         :header-rows: 1
         :widths: 30 70
         
         * - Variable
           - Description
         * - ``kmsProviderName``
           - The KMS that stores your {+cmk-long+}. For this tutorial, set 
             this variable to ``"local"``.
         * - ``uri``
           - Your MongoDB connection URI. Set with the
             ``MONGODB_URI`` environment variable.
         * - ``keyVaultDatabaseName``
           - The database that stores your DEKs. Set to ``"encryption"``.
         * - ``keyVaultCollectionName``
           - The collection that stores your DEKs. Set to ``"__keyVault"``.
         * - ``keyVaultNamespace``
           - The namespace in MongoDB that stores your DEKs. Set this variable 
             to the values of the ``keyVaultDatabaseName`` and
             ``keyVaultCollectionName`` variables, separated by a period.
         * - ``encryptedDatabaseName``
           - The database that stores your encrypted data. Set to
             ``"medicalRecords"``.
         * - ``encryptedCollectionName``
           - The collection that stores your encrypted data. Set to
             ``"patients"``.

.. _qe-quick-start-configure-go:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~~

After you set up your project, follow the steps in this section to create an
encryption key and configure your application for {+qe+}.

.. procedure::
   :style: connected

   .. step:: Create an encryption key.

      Paste the following code into your ``main.go`` file under the
      ``// Paste code to generate CMK below`` comment. This code snippet creates
      a 96-byte {+cmk-long+} and saves it to your filesystem as the
      file ``customer-master-key.txt``:

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
         :start-after: start-generate-local-key
         :end-before: end-generate-local-key
         :language: go
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Retrieve the {+cmk-long+} and specify the KMS provider settings.

      Paste the following code into your ``main.go`` file under the
      ``// Paste code to retrieve CMK and specify KMS provider settings below``
      comment to retrieve the contents of the ``customer-master-key.txt`` file:

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
         :start-after: start-get-local-key
         :end-before: end-get-local-key
         :emphasize-lines: 8
         :language: go
         :dedent:

      This code sets the provider name to ``local`` to use a Local Key Provider
      and uses the {+cmk-abbr+} value from your KMS provider settings.

   .. step:: Set your automatic encryption options.

      Add the following code under the
      ``// Paste automatic encryption options code below`` comment to create an
      ``AutoEncryption`` object that contains the following options:

      - The namespace of your {+key-vault-long+}
      - The ``kmsProviderCredentials`` object, defined in the previous step
      - The ``cryptSharedLibraryPath`` object, which contains the path to your
        {+shared-library+}

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
         :start-after: start-auto-encryption-options
         :end-before: end-auto-encryption-options
         :emphasize-lines: 5-8
         :language: go
         :dedent:

   .. step:: Create a client to set up an encrypted collection.

      Create a new client to encrypt and decrypt your collection. The client
      uses your connection URI and automatic encryption options. Paste the
      following code into your ``main.go`` file, under the
      ``// Paste client configuration code below`` comment:

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_tutorial.go
         :start-after: start-create-client
         :end-before: end-create-client
         :language: go
         :dedent:

   .. step:: Specify fields to encrypt.

      To encrypt a field, add it to the {+enc-schema+}. To enable queries on a
      field, add the ``queries`` property. Paste the following code under the
      ``// Paste JSON schema below`` comment:

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_tutorial.go
         :start-after: start-encrypted-fields-map
         :end-before: end-encrypted-fields-map
         :language: go
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/encrypted-fields-query-note.rst

   .. step:: Create your encrypted collection.

      Add the following code blocks to your ``main.go`` file, under the
      ``// Paste code to create an encrypted collection below`` comment in the
      order shown.

      First, instantiate a ``ClientEncryption`` object to access the API for the
      encryption helper methods:

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
         :start-after: start-client-encryption
         :end-before: end-client-encryption
         :language: go
         :dedent:

      Because you are using a local {+cmk-long+}, you don't need to provide
      {+cmk-long+} credentials. Create a variable containing an empty object to
      use in place of credentials when you create your encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_helpers.go
         :start-after: start-kmip-local-cmk-credentials
         :end-before: end-kmip-local-cmk-credentials
         :language: go
         :dedent:

      To create your encrypted collection, use the ``ClientEncryption`` object's 
      ``CreateEncryptedCollection()`` helper method. This method automatically
      generates data encryption keys for your encrypted fields and creates the
      encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_tutorial.go
         :start-after: start-create-encrypted-collection
         :end-before: end-create-encrypted-collection
         :language: go
         :dedent:

.. _qe-quick-start-operations-go:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After you configure your application and database connection, you can insert
and query encrypted documents.

.. procedure::
   :style: connected

   .. step:: Insert a document with encrypted fields.

      Paste the following code under the
      ``// Paste code to insert a document below`` comment to create a
      document that stores patient data and insert it into the ``patients``
      collection:

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_tutorial.go
         :start-after: start-insert-document
         :end-before: end-insert-document
         :language: go
         :dedent:

   .. step:: Query on encrypted data.

      Add the following code to your ``main.go`` file under the
      ``// Paste code to query the document below`` comment:

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_tutorial.go
         :start-after: start-find-document
         :end-before: end-find-document
         :language: go
         :dedent:

   .. step:: Compile and run your application.

      To compile and run your application, run the following commands from your 
      project directory:

      .. code-block:: bash

         go build -tags cse 
         ./go-qe

      The output of the preceding code sample should look similar to the
      following:

      .. code-block:: json

         {
             "PatientName": "Jon Doe",
             "PatientID": 12345678,
             "PatientRecord": {
                 "SSN": "987-65-4320",
                 "Billing": {
                     "Type": "Visa",
                     "Number": "4111111111111111"
                 },
                 "BillAmount": 1500
             }
         }

      .. include:: /includes/queryable-encryption/safe-content-warning.rst
