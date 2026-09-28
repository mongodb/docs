.. _qe-quick-start-set-up-java:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install dependencies.

      This tutorial uses Apache Maven to manage dependencies. In an Integrated
      Development Environment (IDE), create a new Maven project named 
      ``JavaQE``. Then, navigate to the ``pom.xml`` file and add the following 
      dependencies:

      .. literalinclude:: /includes/qe-tutorials/java/pom.xml
         :language: xml
         :caption: JavaQE/pom.xml
         :dedent:

      This code installs the MongoDB Java Sync Driver and the ``mongodb-crypt`` 
      package, which provides the necessary classes for {+qe+}. It also installs
      the ``dotenv-java`` package, which reads your credentials from a ``.env``
      file.

   .. step:: Set up your environment variables.

      In your ``JavaQE`` directory, create a file named ``.env``. The
      sample code in this tutorial reads its configuration from this
      file. Paste the following code into this file:

      .. literalinclude:: /includes/qe-tutorials/java/env_template
         :language: bash
         :caption: JavaQE/.env
         :end-before: AWS Credentials
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/env-variables.rst

      For more information on setting up your environment variables,
      see the `README.md <{+sample-app-url-qe+}/java/README.md>`__ file
      included in the sample application on GitHub.

   .. step:: Create your data model classes.

      This tutorial uses Plain Old Java Objects (POJOs) as data models
      to represent the document structure. In your
      ``src/main/java/com/mongodb/tutorials/qe/models`` directory,
      create a file named ``Patient.java`` and paste the following ``Patient`` 
      class into the file:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/models/Patient.java
         :language: java
         :caption: models/Patient.java
         :start-after: start-patient-model
         :end-before: end-patient-model
         :dedent:

      Then, create a file named ``PatientRecord.java`` and paste the following 
      ``PatientRecord`` class into the file:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/models/PatientRecord.java
         :language: java
         :caption: models/PatientRecord.java
         :start-after: start-patientRecord-model
         :end-before: end-patientRecord-model
         :dedent:

      Finally, create a file named ``PatientBilling.java`` and paste the 
      following ``PatientBilling`` class into the file:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/models/PatientBilling.java
         :language: java
         :caption: models/PatientBilling.java
         :start-after: start-patientBilling-model
         :end-before: end-patientBilling-model
         :dedent:

      To learn more about Java POJOs, see the `Plain Old Java Object
      <https://en.wikipedia.org/wiki/Plain_old_Java_object>`__
      Wikipedia article.

   .. step:: Create your application file.

      In your ``src/main/java/com/mongodb/tutorials/qe`` directory,
      create a file named ``QueryableEncryptionTutorial.java``. This
      file contains the main {+qe+} workflow. Paste the following
      starter code into this file. The placeholder comments indicate
      where you add code in later steps of this tutorial:

      .. code-block:: java
         :caption: qe/QueryableEncryptionTutorial.java

         package com.mongodb.tutorials.qe;

         import com.mongodb.AutoEncryptionSettings;
         import com.mongodb.ClientEncryptionSettings;
         import com.mongodb.ConnectionString;
         import com.mongodb.MongoClientSettings;
         import com.mongodb.client.MongoClient;
         import com.mongodb.client.MongoClients;
         import com.mongodb.client.MongoCollection;
         import com.mongodb.client.MongoDatabase;
         import com.mongodb.client.model.CreateCollectionOptions;
         import com.mongodb.client.model.CreateEncryptedCollectionParams;
         import com.mongodb.client.result.InsertOneResult;
         import com.mongodb.client.vault.ClientEncryption;
         import com.mongodb.client.vault.ClientEncryptions;
         import com.mongodb.tutorials.qe.models.Patient;
         import com.mongodb.tutorials.qe.models.PatientBilling;
         import com.mongodb.tutorials.qe.models.PatientRecord;
         import io.github.cdimascio.dotenv.Dotenv;
         import org.bson.BsonArray;
         import org.bson.BsonDocument;
         import org.bson.BsonNull;
         import org.bson.BsonString;
         import org.bson.codecs.configuration.CodecProvider;
         import org.bson.codecs.configuration.CodecRegistry;
         import org.bson.codecs.pojo.PojoCodecProvider;

         import java.io.File;
         import java.io.FileInputStream;
         import java.io.FileOutputStream;
         import java.security.SecureRandom;
         import java.util.Arrays;
         import java.util.HashMap;
         import java.util.Map;

         import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
         import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
         import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

         public class QueryableEncryptionTutorial {

             // Loads values from your .env file
             // Later steps call getEnv() to read your configuration values
             static class QueryableEncryptionHelpers {
                 private static final Dotenv dotEnv = Dotenv.configure()
                         .directory("./.env")
                         .load();

                 public static String getEnv(String name) {
                     return dotEnv.get(name);
                 }
             }

             static String getEnv(String name) {
                 return QueryableEncryptionHelpers.getEnv(name);
             }

             public static void main(String[] args) throws Exception {
                 // Paste application variables below


                 // Paste code to generate CMK below


                 // Paste code to retrieve the CMK and specify KMS provider settings below


                 // Paste automatic encryption options code below


                 // Paste client settings code below


                 try (MongoClient encryptedClient = MongoClients.create(clientSettings)) {

                     // Paste schema below


                     // Paste code to create an encrypted collection below


                     // Paste code to insert a document below


                     // Paste code to query the document below

                 }
             }
         }

   .. step:: Assign your application variables.

      The code samples in this tutorial use the following variables to
      perform the {+qe+} workflow. Paste the following code into the
      ``main()`` method of ``QueryableEncryptionTutorial.java``, under
      the ``// Paste application variables below`` comment. For this
      tutorial, set the ``kmsProviderName`` variable to ``"local"``:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: java
         :dedent:

      .. list-table::
         :header-rows: 1
         :widths: 30 70

         * - Variable
           - Description
         * - ``kmsProviderName``
           - The KMS that stores your {+cmk-long+}. For this tutorial,
             set this variable to ``"local"``.
         * - ``uri``
           - Your MongoDB connection URI. Set with the ``MONGODB_URI``
             environment variable in your ``.env`` file.
         * - ``keyVaultDatabaseName``
           - The database that stores your DEKs. Set to
             ``"encryption"``.
         * - ``keyVaultCollectionName``
           - The collection that stores your DEKs. Set to
             ``"__keyVault"``.
         * - ``keyVaultNamespace``
           - The namespace in MongoDB that stores your DEKs. Set this
             variable to the values of the ``keyVaultDatabaseName`` and
             ``keyVaultCollectionName`` variables, separated by a
             period.
         * - ``encryptedDatabaseName``
           - The database that stores your encrypted data. Set to
             ``"medicalRecords"``.
         * - ``encryptedCollectionName``
           - The collection that stores your encrypted data. Set to
             ``"patients"``.

.. _qe-quick-start-configure-java:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After you set up your project, follow the steps in this section to
create an encryption key and configure your application for {+qe+}.

.. procedure::
   :style: connected

   .. step:: Create an encryption key.

      Paste the following code into your
      ``QueryableEncryptionTutorial.java`` file under the
      ``// Paste code to generate CMK below`` comment. This code
      creates a 96-byte {+cmk-long+} and saves it to your filesystem as
      the file ``customer-master-key.txt``:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/util/QueryableEncryptionHelpers.java
         :start-after: start-generate-local-key
         :end-before: end-generate-local-key
         :language: java
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Retrieve the {+cmk-long+} and specify the KMS provider settings.

      Paste the following code under the ``// Paste code to retrieve
      the CMK and specify KMS provider settings below`` comment. This
      code retrieves the contents of the ``customer-master-key.txt``
      file and uses the {+cmk-abbr+} value in your KMS provider
      settings. Setting the provider name to ``local`` indicates that
      you are using a Local Key Provider:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/util/QueryableEncryptionHelpers.java
         :start-after: start-get-local-key
         :end-before: end-get-local-key
         :emphasize-lines: 9-13
         :language: java
         :dedent:

   .. step:: Set your automatic encryption options.

      Paste the following code under the ``// Paste automatic
      encryption options code below`` comment. This code creates an
      ``AutoEncryptionSettings`` object that contains the following
      options:

      - The namespace of your {+key-vault-long+}
      - The ``kmsProviderCredentials`` object, defined in the previous
        step
      - The ``extraOptions`` object, which contains the path to your
        {+shared-library+}

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/util/QueryableEncryptionHelpers.java
         :start-after: start-auto-encryption-options
         :end-before: end-auto-encryption-options
         :emphasize-lines: 4-8
         :language: java
         :dedent:

   .. step:: Create a client to set up an encrypted collection.

      To create a client that encrypts and decrypts data in your
      collection, paste the following code under the ``// Paste client
      settings code below`` comment. This code builds the
      ``clientSettings`` object from your connection URI and your
      automatic encryption options:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
         :start-after: start-create-client
         :end-before: try (MongoClient encryptedClient = MongoClients.create(clientSettings)) {
         :language: java
         :dedent:

      The ``try`` block in your starter code passes these settings to
      ``MongoClients.create()`` to instantiate the encrypted client.

   .. step:: Specify fields to encrypt.

      To encrypt a field, add it to the {+enc-schema+}. To enable
      queries on a field, add the ``queries`` property. Paste the
      following code under the ``// Paste schema below`` comment:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
         :start-after: start-encrypted-fields-map
         :end-before: end-encrypted-fields-map
         :language: java
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/encrypted-fields-query-note.rst

   .. step:: Create your encrypted collection.

      Add the following code blocks to your
      ``QueryableEncryptionTutorial.java`` file under the ``// Paste
      code to create an encrypted collection below`` comment in the
      order shown.

      First, instantiate a ``ClientEncryption`` object to access the
      API for the encryption helper methods:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
         :start-after: start-client-encryption
         :end-before: end-client-encryption
         :language: java
         :dedent:

      Because you are using a local {+cmk-long+}, you don't need to
      provide {+cmk-long+} credentials. Create a variable containing an
      empty object to use in place of credentials when you create your
      encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/util/QueryableEncryptionHelpers.java
         :start-after: start-kmip-local-cmk-credentials
         :end-before: end-kmip-local-cmk-credentials
         :language: java
         :dedent:

      Create your encrypted collection by using the 
      ``createEncryptedCollection()`` helper method accessed through the 
      ``ClientEncryption`` class. This method automatically generates data 
      encryption keys for your encrypted fields and creates the encrypted 
      collection:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
         :start-after: start-create-encrypted-collection
         :end-before: end-create-encrypted-collection
         :language: java
         :dedent:

.. _qe-quick-start-operations-java:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After you configure your application and database connection, you can
insert and query encrypted documents.

.. procedure::
   :style: connected

   .. step:: Insert a document with encrypted fields.

      Add the following code blocks under the ``// Paste code to insert
      a document below`` comment in the order shown.

      First, configure your application to use the POJO classes that
      you created:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
         :start-after: start-setup-application-pojo
         :end-before: end-setup-application-pojo
         :language: java
         :dedent:

      Then, create an instance of a ``Patient`` that describes a
      patient's personal information and use the encrypted client to
      insert it into the ``patients`` collection:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
         :start-after: start-insert-document
         :end-before: end-insert-document
         :language: java
         :dedent:

   .. step:: Query on encrypted data.

      Paste the following code under the ``// Paste code to query the
      document below`` comment to execute a find query on an encrypted
      field and print the decrypted data:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
         :start-after: start-find-document
         :end-before: end-find-document
         :language: java
         :dedent:

   .. step:: Compile and run your application.

      To compile and run your application, run the following commands
      from your ``JavaQE`` directory:

      .. code-block:: bash

         mvn clean package
         java -jar target/queryable-encryption-tutorial.jar

      The driver decrypts the encrypted fields automatically when it
      returns the document. The output resembles the following:

      .. code-block:: none
         :copyable: false

         {id=648b384a722cb9b8392df76a, name='Jon Doe', patientRecord={ssn='987-65-4320', billing={cardType='Visa', cardNumber='4111111111111111'}, billAmount=1500}}

      .. include:: /includes/queryable-encryption/safe-content-warning.rst
