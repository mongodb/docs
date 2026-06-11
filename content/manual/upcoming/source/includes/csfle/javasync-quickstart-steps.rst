Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install the dependencies.

      In an Integrated Development Environment (IDE), create a new Maven project named ``JavaCSFLE``.
      Then, navigate to the ``pom.xml`` file and add the following dependencies:

      .. code-block:: xml
         :caption: JavaCSFLE/pom.xml

         <dependencies>
            <dependency>
               <groupId>org.mongodb</groupId>
               <artifactId>mongodb-driver-sync</artifactId>
               <version>{+java-driver-version+}.0</version>
            </dependency>
            <dependency>
               <groupId>org.mongodb</groupId>
               <artifactId>mongodb-crypt</artifactId>
               <version>{+java-driver-version+}.0</version>
            </dependency>
         </dependencies>

      This code installs the MongoDB Java Sync Driver and the ``mongodb-crypt`` package,
      which provides the necessary classes for {+csfle+} and {+qe+} operations.

   .. step:: Create your main project file.

      In your ``JavaCSFLE`` project, navigate to the ``Main.java`` file and replace its contents with
      the following code:

      .. literalinclude:: /includes/csfle/java/src/main/java/com/mongodb/csfle/Main.java
         :language: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/Main.java
         :dedent:

      The ``Main.java`` file contains your main method, which runs
      the code from the other project files. In this tutorial, the file
      is in the ``com/mongodb/csfle`` base package directory, but you can use a
      different directory and replace the package name in the code.

   .. step:: Create your data key file.

      To generate a {+cmk-long+} and {+dek-long+}, create a file
      named ``MakeDataKey.java`` in your project's base package directory.
      Then, paste the following code into the file:

      .. code-block:: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/MakeDataKey.java

         package com.mongodb.csfle;

         import java.io.*;
         import java.nio.file.*;
         import java.security.SecureRandom;
         import java.util.*;
         import java.util.Base64;

         import org.bson.BsonBinary;
         import org.bson.BsonBoolean;
         import org.bson.BsonDocument;
         import org.bson.BsonInt32;
         import com.mongodb.ClientEncryptionSettings;
         import com.mongodb.ConnectionString;
         import com.mongodb.MongoClientSettings;
         import com.mongodb.client.MongoClient;
         import com.mongodb.client.MongoClients;
         import com.mongodb.client.model.IndexOptions;
         import com.mongodb.client.model.vault.DataKeyOptions;
         import com.mongodb.client.vault.ClientEncryption;
         import com.mongodb.client.vault.ClientEncryptions;

         public class MakeDataKey {
             public static void main(String[] args) throws Exception {
                 // Paste CMK generation code below

                 // Paste index creation code below

                 // Paste DEK generation code below
             }
         }

      In future steps, you will add code to this file under each
      corresponding comment.

   .. step:: Create your encrypted operations file.

      Next, create a file named ``InsertEncryptedDocument.java`` in
      your base package directory and paste the following code:

      .. code-block:: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java

         package com.mongodb.csfle;

         import java.nio.file.*;
         import java.util.*;

         import static com.mongodb.client.model.Filters.eq;

         import com.mongodb.AutoEncryptionSettings;
         import com.mongodb.ConnectionString;
         import com.mongodb.MongoClientSettings;
         import com.mongodb.client.MongoClient;
         import com.mongodb.client.MongoClients;
         import org.bson.BsonDocument;
         import org.bson.Document;

         public class InsertEncryptedDocument {
             public static void main(String[] args) throws Exception {
                 Map<String, Map<String, Object>> kmsProviders =
                     Config.getKmsProviders();

                 // Paste JSON schema below

                 // Paste client configuration code below

                 // Paste code to insert a document below

                 // Paste code to query the document below
             }
         }

      In future steps, you will add code that inserts and queries
      encrypted documents under each corresponding comment.

   .. step:: Assign your configuration variables.

      Each of your project files use variables from a configuration
      class. Create a file named ``Config.java`` in your
      base package directory and paste the following code:

      .. literalinclude:: /includes/csfle/java/src/main/java/com/mongodb/csfle/Config.java
         :language: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/Config.java
         :dedent:

      Then, replace the following placeholder values:

      - ``<connection string>``: Your MongoDB :ref:`connection string <mongodb-uri>`
      - ``<Automatic Encryption Shared Library path>``: The full path
        to your {+shared-library+}, which resembles the following paths:
        
        - **macOS**: ``/<crypt shared directory>/lib/mongo_crypt_v1.dylib``
        - **Linux**: ``/<crypt shared directory>/lib/mongo_crypt_v1.so``
        - **Windows**: ``C:\<crypt shared directory>\bin\mongo_crypt_v1.dll``

      The ``Config.java`` class instructs your application to store
      data encryption keys in the ``encryption.__keyVault`` namespace.

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After setting up your project, follow the steps in this section to
create an encryption key and configure your application for
{+csfle-abbrev+}.

.. procedure::
   :style: connected

   .. step:: Create a {+cmk-long+}.

      Paste the following code into your ``MakeDataKey.java`` file
      under the ``// Paste CMK generation code below`` comment to
      generate a 96-byte {+cmk-long+} ({+cmk-abbr+}) and save it to
      your filesystem when you run the application:

      .. literalinclude:: /includes/csfle/java/src/main/java/com/mongodb/csfle/MakeDataKey.java
         :language: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/MakeDataKey.java
         :start-after: start-generate-cmk
         :end-before: end-generate-cmk
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Create a unique index on your {+key-vault-long+}.

      {+csfle+} depends on server-enforced uniqueness of key alternate
      names, so you must create a unique index on the
      ``keyAltNames`` field in your {+key-vault-long+}.

      Add the following code to your ``MakeDataKey.java`` file under
      the ``// Paste index creation code below`` comment to connect to
      MongoDB and create a partial unique index on the
      ``keyAltNames`` field:

      .. literalinclude:: /includes/csfle/java/src/main/java/com/mongodb/csfle/MakeDataKey.java
         :language: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/MakeDataKey.java
         :start-after: start-create-index
         :end-before: end-create-index
         :dedent:

   .. step:: Create a {+dek-long+}.

      Add the following code to your ``MakeDataKey.java`` file under
      the ``// Paste DEK generation code below`` comment to configure
      a ``ClientEncryption`` instance and generate a {+dek-long+}:

      .. literalinclude:: /includes/csfle/java/src/main/java/com/mongodb/csfle/MakeDataKey.java
         :language: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/MakeDataKey.java
         :start-after: start-create-data-key
         :end-before: end-create-data-key
         :dedent:

      The ``ClientEncryption`` instance uses your KMS provider
      credentials, key vault namespace, and your connection settings
      to manage encryption keys. Once configured, the code calls
      ``createDataKey()`` to generate a {+dek-long+} and writes the
      key ID to a file.

   .. step:: Define a JSON schema.

      Add the following code to your
      ``InsertEncryptedDocument.java`` file under the
      ``// Paste JSON schema below`` comment to define an encryption
      schema:

      .. literalinclude:: /includes/csfle/java/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
         :language: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
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
      on the encrypted fields. Random encryption provides stronger
      security for fields that you don't need to query, because this
      algorithm does not support read operations on the encrypted
      fields.

   .. step:: Create a standard and a {+csfle-abbrev+}-enabled client.

      Paste the following code into your
      ``InsertEncryptedDocument.java`` file under the
      ``// Paste client configuration code below`` comment
      to create two MongoDB clients:

      .. literalinclude:: /includes/csfle/java/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
         :language: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
         :start-after: start-create-client
         :end-before: end-create-client
         :dedent:

      This code creates a ``MongoClient`` instance with
      ``AutoEncryptionSettings`` that specify your KMS provider
      credentials, key vault namespace, encryption schema, and the
      location of your {+shared-library+}.
      The code also creates a standard ``MongoClient`` instance without
      automatic encryption. In a future step, you will compare the
      output of both clients.

      .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After configuring your application and database connection, follow
the steps in this section to insert and query encrypted documents.

.. procedure::
   :style: connected

   .. step:: Insert a document with encrypted fields.

      Add the following code to your
      ``InsertEncryptedDocument.java`` file under the
      ``// Paste code to insert a document below`` comment to insert
      a document into the ``medicalRecords.patients`` collection:

      .. literalinclude:: /includes/csfle/java/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
         :language: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
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

      Add the following code to your
      ``InsertEncryptedDocument.java`` file under the
      ``// Paste code to query the document below`` comment to
      retrieve the document with both a {+csfle-abbrev+}-enabled
      client and a standard client:

      .. literalinclude:: /includes/csfle/java/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
         :language: java
         :caption: JavaCSFLE/src/main/java/com/mongodb/csfle/InsertEncryptedDocument.java
         :start-after: start-find-document
         :end-before: end-find-document
         :dedent:

      The {+csfle-abbrev+}-enabled client automatically decrypts the
      encrypted fields when it retrieves the document. The standard
      client returns the encrypted binary values.

   .. step:: Run the application.

      Start the application by running the ``Main.java`` file in your
      IDE.

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
         {"_id": {"$oid": "..."}, "name": "Jon Doe", "ssn": {"$binary": 
         {"base64": "ARYntz2D/ENqpAa9E1JcGi8QBX2oPBS6MfdE16XiOvjs7ZrUZtTFzlCHr4zeujm2FnDNDJynNRZfCFbHBAOnXNCU8Ey92IFQZtaQIoc4lcPWhg==", "subType": "06"}},
         "bloodType": {"$binary": {"base64": "AhYntz2D/ENqpAa9E1JcGi8CMgflFgLG6FIAQEhXlxrreDUVFVl5h68KFcet0ANaFUfclf7aN200NGzw/lxUom53jSiYD95iI8rbjm/LlGcN+w==", "subType": "06"}},
         "medicalRecords": {"$binary": {"base64": "AhYntz2D/ENqpAa9E1JcGi8EFRrvY5sDeZc0lOxk7yQj7GK7hUAd2iSFq+uF3F6zt2toE4nNw3nTIDUzX/9W2H+YLGvucHaTk6Z7L9FPpsluNXGY65hPlr6OfVJWcfF/a1gGqDCfS1P02WVDbJQ9PPyHPXEAYzC6Z+DTPNMTU1CSsA==", "subType": "06"}},
         "insurance": {"policyNumber": {"$binary": {"base64": "ARYntz2D/ENqpAa9E1JcGi8Qveejc6QQdkMIX28awKMugoZdO5fLJeMsflTzOl1eOHlorQ/arY5gXWqa+Gvsrj/aWe4l22V0jM5RSwIw8/sVEQ==", "subType": "06"}},
         "provider": "MaestCare"}}
         Finding a document with the encrypted client:
         {"_id": {"$oid": "..."}, "name": "Jon Doe", "ssn": 241014209, "bloodType": "AB+", "medicalRecords":
         [{"weight": 180}, {"bloodPressure": "120/80"}], "insurance": {"policyNumber": 123142, "provider": "MaestCare"}}

         ============================================================
         All scripts completed successfully!
         ============================================================

      The output includes your {+dek-abbr+} ID, the encrypted document
      as stored in your database, and the decrypted document retrieved
      with your {+csfle-abbrev+}-enabled client.
