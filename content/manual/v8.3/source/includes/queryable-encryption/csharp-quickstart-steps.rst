.. _qe-quick-start-set-up-csharp:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Create your .NET console project.
      
      Run the following commands to create a new .NET console project in a
      directory named ``CSharpQE``:

      .. code-block:: bash

         mkdir CSharpQE && cd CSharpQE
         dotnet new console

   .. step:: Install dependencies.

      From your ``CSharpQE`` directory, run the following commands to install 
      the MongoDB .NET/C# Driver and required packages:

      .. code-block:: bash

         dotnet add package MongoDB.Driver
         dotnet add package MongoDB.Driver.Encryption
         dotnet add package Microsoft.Extensions.Configuration.Json

   .. step:: Configure your application settings.

      In your ``CSharpQE`` directory, create a file named
      ``appsettings.json``. The sample code in this tutorial reads its
      configuration from this file. Paste the following code into this file:

      .. code-block:: json
         :caption: CSharpQE/appsettings.json

         {
             "MongoDbUri": "<Your MongoDB URI>",
             "CryptSharedLibPath": "<Full path to your Automatic Encryption Shared Library>"
         }

      .. include:: /includes/queryable-encryption/quick-start/env-variables.rst

      .. tip:: appsettings.json Location

         When you run the application, the ``appsettings.json`` file must be in
         the same directory as the compiled executable. Add the following
         ``ItemGroup`` to your ``.csproj`` file so that the
         ``CopyToOutputDirectory`` setting automatically copies
         ``appsettings.json`` to the output ``bin`` directory when you build:

         .. code-block:: xml

            <ItemGroup>
              <None Update="appsettings.json">
                <CopyToOutputDirectory>PreserveNewest</CopyToOutputDirectory>
              </None>
            </ItemGroup>

      For more information on setting up your configuration, see the
      `README.md <{+sample-app-url-qe+}/csharp/README.md>`__ file included in the
      sample application on GitHub.

   .. step:: Create your data model classes.

      This tutorial uses separate classes as data models to represent the
      document structure. In your ``CSharpQE`` directory, create a file
      named ``Patient.cs`` and paste the following ``Patient`` class into
      the file:

      .. literalinclude:: /includes/qe-tutorials/csharp/Patient.cs
         :language: csharp
         :caption: CSharpQE/Patient.cs
         :start-after: start-patient
         :end-before: end-patient
         :dedent:

      Then, create a file named ``PatientRecord.cs`` and paste the
      following ``PatientRecord`` class into the file:

      .. literalinclude:: /includes/qe-tutorials/csharp/PatientRecord.cs
         :language: csharp
         :caption: CSharpQE/PatientRecord.cs
         :start-after: start-patient-record
         :end-before: end-patient-record
         :dedent:

      Finally, create a file named ``PatientBilling.cs`` and paste the
      following ``PatientBilling`` class into the file:

      .. literalinclude:: /includes/qe-tutorials/csharp/PatientBilling.cs
         :language: csharp
         :caption: CSharpQE/PatientBilling.cs
         :start-after: start-patient-billing
         :end-before: end-patient-billing
         :dedent:

   .. step:: Create your main project file. 

      Replace the contents of the ``Program.cs`` file that was
      generated in your ``CSharpQE`` directory with the following
      code:

      .. literalinclude:: /includes/qe-tutorials/csharp/Program.cs
         :language: csharp
         :caption: CSharpQE/Program.cs
         :dedent:

      The ``Program.cs`` file contains your main method, which calls the
      code in your other project files to generate encryption keys and
      perform encrypted operations.
   
   .. step:: Create your application file.

      In your ``CSharpQE`` directory, create a file named
      ``QueryableEncryptionTutorial.cs``. This file contains the main
      {+qe+} workflow. Paste the following starter code into this file:

      .. code-block:: csharp
         :caption: CSharpQE/QueryableEncryptionTutorial.cs

         using Microsoft.Extensions.Configuration;
         using MongoDB.Bson;
         using MongoDB.Bson.IO;
         using MongoDB.Bson.Serialization.Conventions;
         using MongoDB.Driver;
         using MongoDB.Driver.Encryption;
         using System.Security.Cryptography;

         namespace QueryableEncryption;

         public static class QueryableEncryptionTutorial
         {
            public static async Task RunExample()
            {
               var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
               ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

               // Paste application variables below


               // The helper code snippets you paste below read configuration
               // from this alias of your appSettings variable
               var _appSettings = appSettings;

               // Paste code to generate CMK below


               // Paste code to retrieve the CMK and specify KMS provider settings below


               // Paste automatic encryption options code below


               // Paste client configuration code below


               // Paste schema below


               // Paste code to create an encrypted collection below


               // Paste code to insert a document below


               // Paste code to query the document below

            }
         }

      The placeholder comments indicate where you add code in later steps
      of this tutorial.

   .. step:: Assign your application variables.

      The code samples in this tutorial use the following variables to perform
      the {+qe+} workflow. Paste the following code into the ``RunExample()``
      method of ``QueryableEncryptionTutorial.cs``, under the
      ``// Paste application variables below`` comment. For this tutorial, set 
      the ``kmsProviderName`` variable to ``"local"``.

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionTutorial.cs
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: csharp
         :dedent:

      .. list-table::
         :header-rows: 1
         :widths: 30 70

         * - Variable
           - Description
         * - ``kmsProviderName``
           - The KMS that stores your {+cmk-long+}. For this tutorial, set
             this variable to ``"local"``.
         * - ``keyVaultDatabaseName``
           - The database that stores your DEKs. Set to ``"encryption"``.
         * - ``keyVaultCollectionName``
           - The collection that stores your DEKs. Set to ``"__keyVault"``.
         * - ``keyVaultNamespace``
           - The namespace in MongoDB that stores your DEKs. Set this variable
             to a new ``CollectionNamespace`` object whose name is the values of
             the ``keyVaultDatabaseName`` and ``keyVaultCollectionName``
             variables, separated by a period.
         * - ``encryptedDatabaseName``
           - The database that stores your encrypted data. Set to
             ``"medicalRecords"``.
         * - ``encryptedCollectionName``
           - The collection that stores your encrypted data. Set to
             ``"patients"``.
         * - ``uri``
           - Your MongoDB connection URI. Set with the ``MongoDbUri`` value in
             your ``appsettings.json`` file.

.. _qe-quick-start-configure-csharp:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After you set up your project, follow the steps in this section to create an
encryption key and configure your application for {+qe+}.

.. procedure::
   :style: connected

   .. step:: Create an encryption key.

      Paste the following code into your ``QueryableEncryptionTutorial.cs`` 
      file under the ``// Paste code to generate CMK below`` comment. This code 
      creates a 96-byte {+cmk-long+} and saves it to your filesystem as the 
      file ``customer-master-key.txt``:

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionHelpers.cs
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         :language: csharp
         :start-after: start-generate-local-key
         :end-before: end-generate-local-key
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Retrieve the {+cmk-long+} and specify the KMS provider settings.

      Paste the following code under the ``// Paste code to retrieve the CMK and 
      specify KMS provider settings below`` comment. This code retrieves the 
      contents of the ``customer-master-key.txt`` file:

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionHelpers.cs
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         :start-after: start-get-local-key
         :end-before: end-get-local-key
         :language: csharp
         :dedent:

   .. step:: Set your automatic encryption options.

      Paste the following code under the ``// Paste automatic encryption options 
      code below`` comment. This code snippet creates an 
      ``AutoEncryptionOptions`` object that contains the following options:

      - The namespace of your {+key-vault-long+}
      - The ``kmsProviderCredentials`` object, defined in the previous step
      - The ``extraOptions`` object, which contains the path to your
        {+shared-library+}

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionHelpers.cs
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         :start-after: start-auto-encryption-options
         :end-before: end-auto-encryption-options
         :emphasize-lines: 6-9
         :language: csharp
         :dedent:

   .. step:: Create a client to set up an encrypted collection.

      Paste the following code under the ``// Paste client configuration code 
      below`` comment.

      :gold:`IMPORTANT:` If you are using the .NET/C# driver version 3.0 or 
      later, you must add the following code to your application before
      you instantiate a new ``MongoClient``:

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionTutorial.cs
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         :start-after: start-create-client
         :end-before: var clientSettings = MongoClientSettings.FromConnectionString(uri);
         :language: csharp
         :dedent:

      Then, instantiate a new ``MongoClient``:

      .. code-block:: csharp
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         
         var clientSettings = MongoClientSettings.FromConnectionString(uri); 
         clientSettings.AutoEncryptionOptions = autoEncryptionOptions;
         
         var encryptedClient = new MongoClient(clientSettings);

   .. step:: Specify fields to encrypt.

      To encrypt a field, add the field to the {+enc-schema+}. To enable queries 
      on a field, add the ``queries`` property. Paste the following code under 
      the ``// Paste schema below`` comment:

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionTutorial.cs
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         :start-after: start-encrypted-fields-map
         :end-before: end-encrypted-fields-map
         :emphasize-lines: 11
         :language: csharp
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/encrypted-fields-query-note.rst

   .. step:: Create your encrypted collection.

      Add the following code blocks to your ``QueryableEncryptionTutorial.cs`` 
      file under the ``// Paste code to create an encrypted collection below``
      comment in the order shown. 

      First, instantiate a ``ClientEncryption`` object to access the API for the
      encryption helper methods:

      .. code-block:: csharp
         :caption: CSharpQE/QueryableEncryptionTutorial.cs

         var clientEncryptionOptions = new ClientEncryptionOptions(
            keyVaultClient: encryptedClient,
            keyVaultNamespace: keyVaultNamespace,
            kmsProviders: kmsProviderCredentials
         );
         var clientEncryption = new ClientEncryption(clientEncryptionOptions);

      Because you are using a local {+cmk-long+}, you don't need to provide
      {+cmk-long+} credentials. Create a variable containing an empty object to
      use in place of credentials when you create your encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionHelpers.cs
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         :start-after: start-kmip-local-cmk-credentials
         :end-before: end-kmip-local-cmk-credentials
         :language: csharp
         :dedent:

      To create your encrypted collection, use the ``ClientEncryption`` object's 
      ``CreateEncryptedCollection()`` helper method. This method automatically
      generates data encryption keys for your encrypted fields and creates the
      encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionTutorial.cs
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         :start-after: start-create-encrypted-collection
         :end-before: end-create-encrypted-collection
         :language: csharp
         :dedent:

.. _qe-quick-start-operations-csharp:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After you configure your application and database connection, you can insert
and query encrypted documents.

.. procedure::
   :style: connected

   .. step:: Insert a document with encrypted fields.

      To create a document that stores patient data and insert it into the 
      ``patients`` collection, paste the following code under the 
      ``// Paste code to insert a document below`` comment:

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionTutorial.cs
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         :start-after: start-insert-document
         :end-before: end-insert-document
         :language: csharp
         :dedent:

   .. step:: Query on encrypted data.

      Paste the following code under the ``// Paste code to query the document
      below`` comment to retrieve an encrypted field value and print the
      decrypted data:

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionTutorial.cs
         :caption: CSharpQE/QueryableEncryptionTutorial.cs
         :start-after: start-find-document
         :end-before: end-find-document
         :language: csharp
         :dedent:

   .. step:: Run your application.

      To run the application, run the following command from your ``CSharpQE`` 
      project directory:

      .. code-block:: bash

         dotnet run

      The output of the preceding code sample should look similar to the
      following:

      .. code-block:: json
         
         { 
           "_id": {
             "$oid": "6a6281b43201828e23bbe897"
           },
           "patientName": "Jon Doe",
           "patientRecord": {
             "ssn": "987-65-4320",
             "billing": {
               "cardType": "Visa",
               "cardNumber": 4111111111111111 
             },
             "billAmount": 1500
           }
         }

      .. include:: /includes/queryable-encryption/safe-content-warning.rst
