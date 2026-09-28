.. _qe-quick-start-set-up-rust:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install libmongocrypt.

      To install ``libmongocrypt``, see the :ref:`qe-install` page. In the 
      drop-down menus, select your operating system and the :guilabel:`Rust` 
      driver.

   .. step:: Create a project directory.

      In your shell, run the following command to create a directory called 
      ``rust_qe`` for this project: 

      .. code-block:: bash

         cargo new rust_qe

      This command creates a ``Cargo.toml`` file and a ``src/main.rs`` file in 
      your ``rust_qe`` directory. 
      
      Run the following command to navigate into the project directory: 

      .. code-block:: bash

         cd rust_qe
      
   .. step:: Install dependencies. 
      
      To add the necessary crates, paste the following code into your project's 
      ``Cargo.toml`` file.

      .. literalinclude:: /includes/qe-tutorials/rust/Cargo.toml
         :language: toml
         :caption: rust_qe/Cargo.toml
         :dedent:

      This code declares the MongoDB Rust driver with the
      ``in-use-encryption`` feature flag, which provides the encryption
      functionality required for {+qe+}, and the ``dotenv`` crate that
      reads your credentials from a ``.env`` file.

   .. step:: Set up your environment variables.

      In your ``rust_qe`` directory, create a ``.env`` file. The sample
      code in this tutorial references environment variables that you
      need to set in this ``.env`` file. Paste the following code into
      this file:

      .. literalinclude:: /includes/qe-tutorials/rust/env_template
         :language: bash
         :caption: rust_qe/.env
         :end-before: AWS Credentials
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/env-variables.rst

      To learn more about setting up environment variables, see the
      `README.md <{+sample-app-url-qe+}/rust/README.md>`__ file included
      in the sample application on GitHub.

   .. step:: Create your main project file.

      In the ``rust_qe/src`` directory, rename your ``main.rs`` file to
      ``queryable_encryption_tutorial.rs`` and paste the following starter
      code into this file. The placeholder comments indicate where you
      will add code in future steps of this tutorial:

      .. code-block:: rust
         :caption: rust_qe/src/queryable_encryption_tutorial.rs

         use mongodb::{
             bson::{doc, spec::BinarySubtype, Binary, Bson, Document},
             client_encryption::{ClientEncryption, LocalMasterKey, MasterKey},
             mongocrypt::ctx::KmsProvider,
             options::ClientOptions,
             Client, Collection, Namespace,
         };
         use dotenv::dotenv;
         use rand::RngCore;
         use std::env;
         use std::fs::{self, OpenOptions};
         use std::io::{Read, Write};
         use std::path::Path;

         #[tokio::main]
         async fn main() -> mongodb::error::Result<()> {
             dotenv().ok();

             // Paste application variables below

             // Paste code to generate CMK below

             // Paste code to retrieve CMK and specify KMS provider settings below

             // Paste automatic encryption options code below

             // Paste client configuration code below

             // Paste schema below

             // Paste code to create an encrypted collection below

             // Paste code to insert a document below

             // Paste code to query the document below

             return Ok(());
         }

   .. step:: Assign your application variables.

      Declare the required application variables by pasting the
      following code into your ``queryable_encryption_tutorial.rs``
      file under the ``// Paste application variables below`` comment. For this 
      tutorial, set the ``kms_provider_name`` variable to ``"local"``. 

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_tutorial.rs
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: rust
         :dedent:

      The following table describes each application variable in the
      code snippet:

      .. list-table::
         :header-rows: 1
         :widths: 40 60

         * - Variable
           - Description
         * - ``kms_provider_name``
           - The KMS used to store your {+cmk-long+}.
         * - ``uri``
           - Your MongoDB connection URI. Set with the ``MONGODB_URI``
             environment variable.
         * - ``key_vault_database_name``
           - The database where DEKs are stored. Set to
             ``"encryption"``.
         * - ``key_vault_collection_name``
           - The collection where DEKs are stored. Set to
             ``"__keyVault"``.
         * - ``key_vault_namespace``
           - The namespace in MongoDB where your DEKs are stored. Set
             this variable to a ``Namespace`` struct that takes the
             values of the ``key_vault_database_name`` and
             ``key_vault_collection_name`` variables.
         * - ``encrypted_database_name``
           - The database where encrypted data is stored. Set to
             ``"medicalRecords"``.
         * - ``encrypted_collection_name``
           - The collection where encrypted data is stored. Set to
             ``"patients"``.

.. _qe-quick-start-configure-rust:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After you set up your project, follow the steps in this section to
create an encryption key and configure your application for {+qe+}.

.. procedure::
   :style: connected

   .. step:: Create an encryption key.

      Paste the following code into your
      ``queryable_encryption_tutorial.rs`` file under the ``// Paste
      code to generate CMK below`` comment. This code snippet creates a
      96-byte {+cmk-long+} and saves it to your filesystem as the file
      ``customer-master-key.txt``:

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_helpers.rs
         :start-after: start-generate-local-key
         :end-before: end-generate-local-key
         :language: rust
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Retrieve the {+cmk-long+} and specify the KMS provider settings.

      Paste the following code into your
      ``queryable_encryption_tutorial.rs`` file under the ``// Paste
      code to retrieve CMK and specify KMS provider settings below``
      comment to retrieve the contents of the
      ``customer-master-key.txt`` file you generated in the previous
      step:

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_helpers.rs
         :start-after: start-get-local-key
         :end-before: end-get-local-key
         :emphasize-lines: 20-26
         :language: rust
         :dedent:

      This code sets the provider name to ``local`` to use a Local Key
      Provider and uses the {+cmk-abbr+} value from your KMS provider
      settings.

   .. step:: Set your automatic encryption options.

      Add the following code under the ``// Paste automatic encryption
      options code below`` comment to create an
      ``EncryptedClientBuilder`` that contains the following options:

      - A ``ClientOptions`` struct
      - The namespace of your {+key-vault-long+}
      - The ``kms_providers`` vector, defined in the previous step

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_helpers.rs
         :start-after: start-auto-encryption-options
         :end-before: end-auto-encryption-options
         :language: rust
         :dedent:

   .. step:: Create a client to set up an encrypted collection.

      Create a new client to encrypt and decrypt your collection. The
      client uses your connection URI and the path to your
      {+shared-library+}. Paste the following code into your
      ``queryable_encryption_tutorial.rs`` file, under the ``// Paste
      client configuration code below`` comment:

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_tutorial.rs
         :start-after: start-create-client
         :end-before: end-create-client
         :language: rust
         :dedent:

   .. step:: Specify fields to encrypt.

      To encrypt a field, add it to the {+enc-schema+}. To enable
      queries on a field, add the ``queries`` property. Paste the
      following code under the ``// Paste schema below`` comment:

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_tutorial.rs
         :start-after: start-encrypted-fields-map
         :end-before: end-encrypted-fields-map
         :language: rust
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/encrypted-fields-query-note.rst

   .. step:: Create your encrypted collection.

      Add the following code blocks to your
      ``queryable_encryption_tutorial.rs`` file, under the ``// Paste
      code to create an encrypted collection below`` comment in the
      order shown.

      First, instantiate a ``ClientEncryption`` struct to access the
      API for the encryption helper methods:

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_helpers.rs
         :start-after: start-client-encryption
         :end-before: end-client-encryption
         :language: rust
         :dedent:

      Because you are using a local {+cmk-long+}, you don't need to
      provide {+cmk-long+} credentials. Create an empty
      ``LocalMasterKey`` and wrap it in a ``MasterKey::Local`` variant
      to use in place of credentials when you create your encrypted
      collection:

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_helpers.rs
         :start-after: start-local-cmk-credentials
         :end-before: end-local-cmk-credentials
         :language: rust
         :dedent:

      Create your encrypted collection by using the
      ``create_encrypted_collection()`` helper method accessed through
      the ``ClientEncryption`` struct. This method automatically
      generates data encryption keys for your encrypted fields and
      creates the encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_tutorial.rs
         :start-after: start-create-encrypted-collection
         :end-before: end-create-encrypted-collection
         :language: rust
         :dedent:

      The method that creates the encrypted collection requires a
      reference to a database *object* rather than the database *name*.
      To obtain this reference, use the ``database()`` method on your
      client object.

.. _qe-quick-start-operations-rust:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After you configure your application and database connection, you can
insert and query encrypted documents.

.. procedure::
   :style: connected

   .. step:: Insert a document with encrypted fields.

      Paste the following code under the ``// Paste code to insert a
      document below`` comment to create a document that stores patient
      data and insert it into the ``patients`` collection:

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_tutorial.rs
         :start-after: start-insert-document
         :end-before: end-insert-document
         :emphasize-lines: 18
         :language: rust
         :dedent:

   .. step:: Query on encrypted data.

      Add the following code to your
      ``queryable_encryption_tutorial.rs`` file under the ``// Paste
      code to query the document below`` comment:

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_tutorial.rs
         :start-after: start-find-document
         :end-before: end-find-document
         :language: rust
         :dedent:

   .. step:: Run your application.

      To set the path to your ``libmongocrypt`` library, run the
      following command from your project directory:

      .. code-block:: bash

         export MONGOCRYPT_LIB_DIR=/path/to/libmongocrypt/

      Then, run the following command to start your application:

      .. code-block:: bash

         cargo run --bin queryable_encryption_tutorial

      The driver decrypts the encrypted fields automatically when it
      returns the document. The output of the preceding code sample
      should resemble the following:

      .. literalinclude:: /includes/qe-tutorials/encrypted-document.json
         :language: json
         :copyable: false
         :dedent:

      .. include:: /includes/queryable-encryption/safe-content-warning.rst
