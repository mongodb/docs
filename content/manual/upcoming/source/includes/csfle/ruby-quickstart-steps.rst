.. _csfle-quick-start-set-up-ruby:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Create your main project file.

      Create a directory named ``ruby-csfle`` to store your project
      files, and then add a file named ``main.rb`` to this directory.
      Paste the following code into this file:

      .. literalinclude:: /includes/csfle/ruby/main.rb
         :language: ruby
         :caption: ruby-csfle/main.rb
         :dedent:

      The ``main.rb`` file contains your main script, which imports
      and runs the code from the other project files.

   .. step:: Create your data key file.

      To generate a {+cmk-long+} and {+dek-long+}, create a file
      named ``make_data_key.rb`` in your ``ruby-csfle`` directory
      and paste the following code:

      .. code-block:: ruby
         :caption: ruby-csfle/make_data_key.rb

         require 'mongo'
         require 'base64'
         require 'securerandom'
         require_relative 'config'

         # Paste CMK generation code below

         def make_key
           # Paste index creation code below

           # Paste DEK creation code below
         end

      In future steps, you will add code to this file following each
      corresponding comment.

   .. step:: Create your encrypted operations file.

      Next, create a file named ``insert_encrypted_document.rb`` in
      your ``ruby-csfle`` directory and paste the following code:

      .. code-block:: ruby
         :caption: ruby-csfle/insert_encrypted_document.rb

         require 'mongo'
         require 'base64'
         require_relative 'config'

         def insert
           # Paste JSON schema below

           # Paste client configuration code below

           # Paste code to insert a document below

           # Paste code to query the document below
         end

      In future steps, you will add code that inserts and queries
      encrypted documents under each corresponding comment.

   .. step:: Assign your configuration variables.

      Each of your project files imports variables from a
      configuration file. Create a file named ``config.rb`` in your
      ``ruby-csfle`` directory and paste the following code:

      .. literalinclude:: /includes/csfle/ruby/config.rb
         :language: ruby
         :caption: ruby-csfle/config.rb
         :dedent:

      Then, replace the following placeholder values:

      - ``<connection string>``: Your MongoDB connection string
      - ``<Automatic Encryption Shared Library path>``: The full path
        to your {+shared-library+}, which resembles
        ``/<crypt shared directory>/lib/mongo_crypt_v1.dylib``
        on macOS and
        ``/<crypt shared directory>/lib/mongo_crypt_v1.so``
        on Linux

      The ``config.rb`` file instructs your application to store
      data encryption keys in the ``encryption.__keyVault``
      namespace.

.. _csfle-quick-start-configure-ruby:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After setting up your project, follow the steps in this section to
create an encryption key and configure your application for
{+csfle-abbrev+}.

.. procedure::
   :style: connected

   .. _csfle-quick-start-create-master-key-ruby:

   .. step:: Create a {+cmk-long+}.

      Paste the following code into your ``make_data_key.rb`` file
      under the ``# Paste CMK generation code below`` comment to
      generate a 96-byte {+cmk-long+} ({+cmk-abbr+}) and save it to
      your filesystem when you run the application:

      .. literalinclude:: /includes/csfle/ruby/make_data_key.rb
         :language: ruby
         :caption: ruby-csfle/make_data_key.rb
         :start-after: start-generate-cmk
         :end-before: end-generate-cmk
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Create a unique index on your {+key-vault-long+}.

      {+csfle+} depends on server-enforced uniqueness of key alternate
      names, so you must create a unique index on the ``keyAltNames``
      field in your {+key-vault-long+}.

      Add the following code to your ``make_data_key.rb`` file under
      the ``# Paste index creation code below`` comment to connect
      to MongoDB and create a partial unique index on the
      ``keyAltNames`` field:

      .. literalinclude:: /includes/csfle/ruby/make_data_key.rb
         :language: ruby
         :caption: ruby-csfle/make_data_key.rb
         :start-after: start-create-index
         :end-before: end-create-index
         :dedent:

   .. step:: Create a {+dek-long+}.

      Add the following code to your ``make_data_key.rb`` file under
      the ``# Paste DEK creation code below`` comment to configure
      a ``Mongo::ClientEncryption`` instance and generate a
      {+dek-long+}:

      .. literalinclude:: /includes/csfle/ruby/make_data_key.rb
         :language: ruby
         :caption: ruby-csfle/make_data_key.rb
         :start-after: start-create-data-key
         :end-before: end-create-data-key
         :dedent:

      The ``Mongo::ClientEncryption`` instance uses your KMS provider
      credentials, key vault namespace, and your client to manage
      encryption keys. Once configured, the code calls the
      ``create_data_key`` method to generate a {+dek-long+} and
      writes it to a separate file.

   .. step:: Define an encryption schema.

      Add the following code to your ``insert_encrypted_document.rb``
      file under the ``# Paste JSON schema below`` comment to define
      an encryption schema:

      .. literalinclude:: /includes/csfle/ruby/insert_encrypted_document.rb
         :language: ruby
         :caption: ruby-csfle/insert_encrypted_document.rb
         :start-after: start-json-schema
         :end-before: end-json-schema
         :dedent:

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

   .. step:: Create a standard and a {+csfle-abbrev+}-enabled client.

      Paste the following code into your
      ``insert_encrypted_document.rb`` file under the
      ``# Paste client configuration code below`` comment to create
      two MongoDB clients:

      .. literalinclude:: /includes/csfle/ruby/insert_encrypted_document.rb
         :language: ruby
         :caption: ruby-csfle/insert_encrypted_document.rb
         :start-after: start-create-client
         :end-before: end-create-client
         :dedent:

      This code creates a ``Mongo::Client`` instance with an
      ``auto_encryption_options`` hash that specifies your KMS
      provider credentials, key vault namespace, encryption schema,
      and the location of your {+shared-library+}. The code also
      creates a standard ``Mongo::Client`` instance without automatic
      encryption. In a future step, you will compare the output of
      both clients.

      .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

.. _csfle-quick-start-operations-ruby:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After configuring your application and database connection, follow
the steps in this section to insert and query encrypted documents.

.. procedure::
   :style: connected

   .. _csfle-quick-start-insert-ruby:

   .. step:: Insert a document with encrypted fields.

      Add the following code to your ``insert_encrypted_document.rb``
      file under the
      ``# Paste code to insert a document below`` comment to insert
      a document into the ``medicalRecords.patients`` collection:

      .. literalinclude:: /includes/csfle/ruby/insert_encrypted_document.rb
         :language: ruby
         :caption: ruby-csfle/insert_encrypted_document.rb
         :start-after: start-insert-document
         :end-before: end-insert-document
         :dedent:

      When you insert the document, your {+csfle-abbrev+}-enabled
      client automatically encrypts the specified fields. The stored
      document resembles the following code:

      .. literalinclude:: /includes/quick-start/inserted-doc-enc.json
         :language: json
         :copyable: false

   .. step:: Query encrypted data.

      Add the following code to your ``insert_encrypted_document.rb``
      file under the
      ``# Paste code to query the document below`` comment to
      retrieve the document by using both a {+csfle-abbrev+}-enabled
      client and a standard client:

      .. literalinclude:: /includes/csfle/ruby/insert_encrypted_document.rb
         :language: ruby
         :caption: ruby-csfle/insert_encrypted_document.rb
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

         ruby main.rb

      If successful, your output resembles the following example:

      .. code-block:: none
         :copyable: false

         ============================================================
         Running make_data_key.rb...
         ============================================================
         DataKeyId [base64]: ...

         ============================================================
         Running insert_encrypted_document.rb...
         ============================================================
         Finding a document with the regular (non-encrypted) client:
         {"_id" => BSON::ObjectId('...'), "name" => "Jon Doe", "ssn" =>
         <BSON::Binary:0x688 type=ciphertext data=0x0114bccfbe8e954f...>,
         "bloodType" => <BSON::Binary:0x696 type=ciphertext data=0x0214bccfbe8e954f...>,
         "medicalRecords" => <BSON::Binary:0x704 type=ciphertext data=0x0214bccfbe8e954f...>,
         "insurance" => {"policyNumber" => <BSON::Binary:0x712 type=ciphertext data=0x0114bccfbe8e954f...>,
         "provider" => "MaestCare"}}

         Finding a document with the encrypted client:
         {"_id" => BSON::ObjectId('...'), "name" => "Jon Doe", "ssn" => 241014209,
         "bloodType" => "AB+", "medicalRecords" => [{"weight" => 180, "bloodPressure" => "120/80"}],
         "insurance" => {"policyNumber" => 123142, "provider" => "MaestCare"}}

         ============================================================
         All scripts completed successfully!
         ============================================================

      The output includes your {+dek-abbr+} ID, the encrypted
      document as stored in your database, and the decrypted document
      retrieved with your {+csfle-abbrev+}-enabled client.
