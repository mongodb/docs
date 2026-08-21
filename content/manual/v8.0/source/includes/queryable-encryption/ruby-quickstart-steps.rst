.. _qe-quick-start-set-up-ruby:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install dependencies.

      Create a directory named ``ruby-qe`` to store your project files.
      In this directory, create a file named ``Gemfile`` and paste the
      following code into the file:

      .. literalinclude:: /includes/qe-tutorials/ruby/Gemfile
         :language: ruby
         :caption: ruby-qe/Gemfile
         :dedent:

      This code declares the MongoDB Ruby driver, the
      ``libmongocrypt-helper`` gem that provides the encryption
      libraries required for {+qe+}, and the ``dotenv`` gem that reads
      your credentials from a ``.env`` file.

      Then, run the following commands to navigate into the directory
      and install the gems:

      .. code-block:: bash

         cd ruby-qe
         bundle install

   .. step:: Set up your environment variables.

      In your ``ruby-qe`` directory, create a ``.env`` file. The sample
      code in this tutorial references environment variables that you
      need to set in this ``.env`` file. Paste the following code into
      this file:

      .. literalinclude:: /includes/qe-tutorials/ruby/env_template
         :language: bash
         :caption: ruby-qe/.env
         :end-before: AWS Credentials
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/env-variables.rst

      For more information on setting up environment variables, see the
      `README.md <{+sample-app-url-qe+}/ruby/README.md>`__ file included
      in the sample application on GitHub.

   .. step:: Create your main project file.

      In your ``ruby-qe`` directory, create a file named
      ``quickstart.rb``. Paste the following starter code into this
      file. The placeholder comments indicate where you will add code in
      future steps of this tutorial:

      .. code-block:: ruby
         :caption: ruby-qe/quickstart.rb

         # frozen_string_literal: true

         require "dotenv/load"
         require "mongo"
         require "securerandom"

         # Paste application variables below

         # Paste code to generate CMK below

         # Paste code to retrieve CMK and specify KMS provider settings below

         # Paste automatic encryption options code below

         # Paste client configuration code below

         # Paste schema below

         # Paste code to create an encrypted collection below

         # Paste code to insert a document below

         # Paste code to query the document below

         encrypted_client.close

   .. step:: Assign your application variables.

      Declare the required application variables by pasting the
      following code into your ``quickstart.rb`` file under the
      ``# Paste application variables below`` comment:

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-tutorial.rb
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: ruby
         :dedent:

      The following table describes each application variable in the
      code snippet:

      .. list-table::
         :header-rows: 1
         :widths: 30 70

         * - Variable
           - Description
         * - ``kms_provider_name``
           - The KMS used to store your {+cmk-long+}. Set with the
             ``KMS_PROVIDER`` environment variable.
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
             this variable to the values of the
             ``key_vault_database_name`` and
             ``key_vault_collection_name`` variables, separated by a
             period.
         * - ``encrypted_database_name``
           - The database where encrypted data is stored. Set to
             ``"medicalRecords"``.
         * - ``encrypted_collection_name``
           - The collection where encrypted data is stored. Set to
             ``"patients"``.

.. _qe-quick-start-configure-ruby:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After you set up your project, follow the steps in this section to
create an encryption key and configure your application for {+qe+}.

.. procedure::
   :style: connected

   .. step:: Create an encryption key.

      Paste the following code into your ``quickstart.rb`` file under
      the ``# Paste code to generate CMK below`` comment. This code
      snippet creates a 96-byte {+cmk-long+} and saves it to your
      filesystem as the file ``customer-master-key.txt``:

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-helpers.rb
         :start-after: start-generate-local-key
         :end-before: end-generate-local-key
         :language: ruby
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Retrieve the {+cmk-long+} and specify the KMS provider settings.

      Paste the following code into your ``quickstart.rb`` file under
      the ``# Paste code to retrieve CMK and specify KMS provider
      settings below`` comment to retrieve the contents of the
      ``customer-master-key.txt`` file you generated in the previous
      step:

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-helpers.rb
         :start-after: start-get-local-key
         :end-before: end-get-local-key
         :emphasize-lines: 6-10
         :language: ruby
         :dedent:

      This code sets the provider name to ``local`` to use a Local Key
      Provider and uses the {+cmk-abbr+} value from your KMS provider
      settings.

   .. step:: Set your automatic encryption options.

      Add the following code under the ``# Paste automatic encryption
      options code below`` comment to create an
      ``auto_encryption_options`` hash that contains the following
      options:

      - The namespace of your {+key-vault-long+}
      - The ``kms_providers`` hash, defined in the previous step
      - The ``extra_options`` hash, which contains the path to your
        {+shared-library+}

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-helpers.rb
         :start-after: start-auto-encryption-options
         :end-before: end-auto-encryption-options
         :language: ruby
         :dedent:

   .. step:: Create a client to set up an encrypted collection.

      Create a new client to encrypt and decrypt your collection. The
      client uses your connection URI and automatic encryption options.
      Paste the following code into your ``quickstart.rb`` file, under
      the ``# Paste client configuration code below`` comment:

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-tutorial.rb
         :start-after: start-create-client
         :end-before: end-create-client
         :language: ruby
         :dedent:

   .. step:: Specify fields to encrypt.

      To encrypt a field, add it to the {+enc-schema+}. To enable
      queries on a field, add the ``queries`` property. Paste the
      following code under the ``# Paste schema below`` comment:

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-tutorial.rb
         :start-after: start-encrypted-fields-map
         :end-before: end-encrypted-fields-map
         :language: ruby
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/encrypted-fields-query-note.rst

   .. step:: Create your encrypted collection.

      Add the following code blocks to your ``quickstart.rb`` file,
      under the ``# Paste code to create an encrypted collection below``
      comment in the order shown.

      First, instantiate a ``Mongo::ClientEncryption`` object to access
      the API for the encryption helper methods:

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-helpers.rb
         :start-after: start-client-encryption
         :end-before: end-client-encryption
         :language: ruby
         :dedent:

      Because you are using a local {+cmk-long+}, you don't need to
      provide {+cmk-long+} credentials. Create a variable containing an
      empty hash to use in place of credentials when you create your
      encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-helpers.rb
         :start-after: start-kmip-local-cmk-credentials
         :end-before: end-kmip-local-cmk-credentials
         :language: ruby
         :dedent:

      Create your encrypted collection by using the
      ``create_encrypted_collection()`` helper method accessed through
      the ``Mongo::ClientEncryption`` class. This method automatically
      generates data encryption keys for your encrypted fields and
      creates the encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-helpers.rb
         :start-after: start-create-encrypted-collection
         :end-before: end-create-encrypted-collection
         :language: ruby
         :dedent:

.. _qe-quick-start-operations-ruby:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After you configure your application and database connection, you can
insert and query encrypted documents.

.. procedure::
   :style: connected

   .. step:: Insert a document with encrypted fields.

      Paste the following code under the ``# Paste code to insert a
      document below`` comment to create a document that stores patient
      data and insert it into the ``patients`` collection:

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-tutorial.rb
         :start-after: start-insert-document
         :end-before: end-insert-document
         :language: ruby
         :dedent:

   .. step:: Query on encrypted data.

      Add the following code to your ``quickstart.rb`` file under the
      ``# Paste code to query the document below`` comment:

      .. literalinclude:: /includes/qe-tutorials/ruby/queryable-encryption-tutorial.rb
         :start-after: start-find-document
         :end-before: end-find-document
         :language: ruby
         :dedent:

   .. step:: Run your application.

      To start your application, run the following command from your
      project directory:

      .. code-block:: bash

         bundle exec ruby quickstart.rb

      The driver decrypts the encrypted fields automatically when it
      returns the document. The output of the preceding code sample
      should look similar to the following:

      .. code-block:: none
         :copyable: false

         {"_id" => BSON::ObjectId('6a8611235f1548b277869df7'), 
         "patientName" => "Jon Doe", "patientId" => 12345678, 
         "patientRecord" => {"ssn" => "987-65-4320", "billing" => 
         {"type" => "Visa", "number" => "4111111111111111"}, "billAmount" => 1500}, 
         "__safeContent__" => [<BSON::Binary:0x744 type=generic data=0xc464ecc34a383129...>]}

      .. include:: /includes/queryable-encryption/safe-content-warning.rst
