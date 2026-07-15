.. _csfle-quick-start-set-up-csharp:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables. 

.. procedure::
   :style: connected

   .. step:: Create your .NET console project.

      Run the following commands to create a new .NET console project
      in a directory named ``CSharpCSFLE``:

      .. code-block:: bash

         mkdir CSharpCSFLE && cd CSharpCSFLE
         dotnet new console

   .. step:: Install the dependencies.

      From your ``CSharpCSFLE`` directory, run the following
      commands to install the MongoDB .NET/C# Driver and the
      ``MongoDB.Driver.Encryption`` package:

      .. code-block:: bash

         dotnet add package MongoDB.Driver
         dotnet add package MongoDB.Driver.Encryption

   .. step:: Create your main project file.

      Replace the contents of the ``Program.cs`` file that was
      generated in your ``CSharpCSFLE`` directory with the following
      code:

      .. literalinclude:: /includes/csfle/csharp/Program.cs
         :language: csharp
         :caption: CSharpCSFLE/Program.cs
         :dedent:

      The ``Program.cs`` file contains your main method, which calls the
      code in your other project files to generate encryption keys and
      perform encrypted operations.

   .. step:: Create your data key file.

      To generate a {+cmk-long+} and {+dek-long+}, create a file named
      ``MakeDataKey.cs`` in your ``CSharpCSFLE`` directory and paste the
      following code:

      .. code-block:: csharp
         :caption: CSharpCSFLE/MakeDataKey.cs

         using MongoDB.Driver;
         using MongoDB.Bson;
         using MongoDB.Driver.Encryption;

         namespace CsfleTutorial;

         public static class MakeDataKey
         {
             public static void MakeKey()
             {
                 // Paste CMK generation code below

                 // Paste index creation code below

                 // Paste DEK creation code below
             }
         }

      In future steps, you will add code to this file under each
      corresponding comment.

   .. step:: Create your encrypted operations file.

      Next, create a file named ``InsertEncryptedDocument.cs`` in your
      ``CSharpCSFLE`` directory and paste the following code:

      .. code-block:: csharp
         :caption: CSharpCSFLE/InsertEncryptedDocument.cs

         using MongoDB.Driver;
         using MongoDB.Bson;
         using MongoDB.Driver.Encryption;

         namespace CsfleTutorial;

         public static class InsertEncryptedDocument
         {
             public static void Insert()
             {
                 var db = "medicalRecords";
                 var coll = "patients";
                 var dbNamespace = $"{db}.{coll}";

                 // Paste encryption schema below

                 // Paste client configuration code below

                 // Paste code to insert a document below

                 // Paste code to query the document below
             }
         }

      In future steps, you will add code that inserts and queries
      encrypted documents under each corresponding comment.

   .. step:: Assign your configuration variables.

      Each of your project files uses variables from a configuration
      class. Create a file named ``Config.cs`` in your ``CSharpCSFLE``
      directory and paste the following code:

      .. literalinclude:: /includes/csfle/csharp/Config.cs
         :language: csharp
         :caption: CSharpCSFLE/Config.cs
         :dedent:

      Then, replace the following placeholder values:

      - ``<connection string>``: Your MongoDB connection string
      - ``<Automatic Encryption Shared Library path>``: The full path
        to your {+shared-library+}, which resembles the following paths:
        
        - **macOS**: ``/<crypt shared directory>/lib/mongo_crypt_v1.dylib``
        - **Linux**: ``/<crypt shared directory>/lib/mongo_crypt_v1.so``
        - **Windows**: ``C:\<crypt shared directory>\bin\mongo_crypt_v1.dll``

      The ``Config.cs`` file instructs your application to store data
      encryption keys in the ``encryption.__keyVault`` namespace.

.. _csfle-quick-start-configure-csharp:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After setting up your project, follow the steps in this section to
create an encryption key and configure your project for
{+csfle-abbrev+}.

.. procedure::
   :style: connected

   .. _csfle-quick-start-create-master-key-csharp:

   .. step:: Create a {+cmk-long+}.

      Paste the following code into your ``MakeDataKey.cs`` file inside
      the ``MakeKey()`` method, below the
      ``// Paste CMK generation code below`` comment, to generate a
      96-byte {+cmk-long+} ({+cmk-abbr+}) and save it to your
      filesystem:

      .. literalinclude:: /includes/csfle/csharp/MakeDataKey.cs
         :language: csharp
         :caption: CSharpCSFLE/MakeDataKey.cs
         :start-after: start-generate-cmk
         :end-before: end-generate-cmk
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Create a unique index on your {+key-vault-long+}.

      {+csfle+} depends on server-enforced uniqueness of key alternate
      names, so you must create a unique index on the ``keyAltNames``
      field in your {+key-vault-long+}.

      Add the following code to your ``MakeDataKey.cs`` file below the
      ``// Paste index creation code below`` comment to connect to
      MongoDB and create a partial unique index on the ``keyAltNames``
      field:

      .. literalinclude:: /includes/csfle/csharp/MakeDataKey.cs
         :language: csharp
         :caption: CSharpCSFLE/MakeDataKey.cs
         :start-after: start-create-index
         :end-before: end-create-index
         :dedent:

   .. _csfle-local-create-dek-csharp:

   .. step:: Create a {+dek-long+}.

      .. _csfle-quick-start-create-dek-csharp:

      Add the following code to your ``MakeDataKey.cs`` file below the
      ``// Paste DEK creation code below`` comment to configure a
      ``ClientEncryption`` instance and generate a {+dek-long+}:

      .. literalinclude:: /includes/csfle/csharp/MakeDataKey.cs
         :language: csharp
         :caption: CSharpCSFLE/MakeDataKey.cs
         :start-after: start-create-data-key
         :end-before: end-create-data-key
         :dedent:

      The ``ClientEncryption`` instance uses your KMS provider settings,
      key vault namespace, and client to manage encryption keys. Once
      configured, the code calls the ``CreateDataKey()`` method to
      generate a {+dek-long+} and writes it to a separate file.

   .. _csfle-quickstart-encryption-schema-csharp:

   .. step:: Define an encryption schema.

      .. _field-level-encryption-data-key-retrieve-csharp:

      Add the following code to your ``InsertEncryptedDocument.cs`` file
      below the ``// Paste encryption schema below`` comment to define
      an encryption schema:

      .. literalinclude:: /includes/csfle/csharp/InsertEncryptedDocument.cs
         :language: csharp
         :caption: CSharpCSFLE/InsertEncryptedDocument.cs
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

      Deterministic encryption allows you to perform equality queries on
      encrypted fields. Random encryption provides stronger security but
      does not support read operations on the encrypted fields.

   .. step:: Create standard and {+csfle-abbrev+}-enabled clients.

      Paste the following code into your ``InsertEncryptedDocument.cs``
      file below the
      ``// Paste client configuration code below`` comment to create two
      MongoDB clients:

      .. literalinclude:: /includes/csfle/csharp/InsertEncryptedDocument.cs
         :language: csharp
         :caption: CSharpCSFLE/InsertEncryptedDocument.cs
         :start-after: start-create-client
         :end-before: end-create-client
         :dedent:

      This code creates a ``MongoClient`` instance with an
      ``AutoEncryptionOptions`` object that specifies your KMS provider
      settings, key vault namespace, encryption schema, and the location
      of your {+shared-library+}. The code also creates a standard
      ``MongoClient`` instance without automatic encryption. In a future
      step, you will compare the output of both clients.

      .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

.. _csfle-quick-start-operations-csharp:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After configuring your project and database connection, follow the
steps in this section to insert and query encrypted documents.

.. procedure::
   :style: connected

   .. _csfle-quick-start-insert-csharp:

   .. step:: Insert a document with encrypted fields.

      Add the following code to your ``InsertEncryptedDocument.cs`` file
      below the ``// Paste code to insert a document below`` comment to
      insert a document into the ``medicalRecords.patients`` collection:

      .. literalinclude:: /includes/csfle/csharp/InsertEncryptedDocument.cs
         :language: csharp
         :caption: CSharpCSFLE/InsertEncryptedDocument.cs
         :start-after: start-insert-document
         :end-before: end-insert-document
         :dedent:

      When you insert the document, your {+csfle-abbrev+}-enabled client
      automatically encrypts the specified fields. The stored document
      resembles the following code:

      .. literalinclude:: /includes/quick-start/inserted-doc-enc.json
         :language: json
         :copyable: false

   .. step:: Query encrypted data.

      Add the following code to your ``InsertEncryptedDocument.cs`` file
      below the ``// Paste code to query the document below`` comment to
      retrieve the document with both a {+csfle-abbrev+}-enabled client
      and a standard client:

      .. literalinclude:: /includes/csfle/csharp/InsertEncryptedDocument.cs
         :language: csharp
         :caption: CSharpCSFLE/InsertEncryptedDocument.cs
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

         dotnet run

      If successful, your output resembles the following example:

      .. code-block:: none
         :copyable: false

         ============================================================
         Running MakeDataKey...
         ============================================================
         DataKeyId [base64]: ...

         ============================================================
         Running InsertEncryptedDocument...
         ============================================================
         Finding a document with the regular (non-encrypted) client:

         { "_id" : { "$oid" : "..." }, "name" : "Jon Doe",
         "ssn" : { "$binary" : { "base64" : "...", "subType" : "06" } },
         "bloodType" : { "$binary" : { "base64" : "...", "subType" : "06" } },
         "medicalRecords" : { "$binary" : { "base64" : "...", "subType" : "06" } },
         "insurance" : { "policyNumber" : { "$binary" : { "base64" : "...",
         "subType" : "06" } }, "provider" : "MaestCare" } }

         Finding a document with the encrypted client:

         { "_id" : { "$oid" : "..." }, "name" : "Jon Doe", "ssn" : 241014209,
         "bloodType" : "AB+", "medicalRecords" :
         [{ "weight" : 180, "bloodPressure" : "120/80" }],
         "insurance" : { "policyNumber" : 123142,
         "provider" : "MaestCare" } }

         ============================================================
         All scripts completed successfully!
         ============================================================

      The output includes your {+dek-abbr+} ID, the encrypted document
      as stored in your database, and the decrypted document retrieved
      with your {+csfle-abbrev+}-enabled client.
