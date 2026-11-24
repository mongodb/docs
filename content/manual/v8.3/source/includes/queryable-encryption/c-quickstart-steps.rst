.. _qe-quick-start-set-up-c:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install libmongocrypt.

      To learn how to install ``libmongocrypt``, see the
      :ref:`qe-install` page. In the drop-down menus, select your
      operating system and the :guilabel:`C` driver.

   .. step:: Install the C driver.

      To learn how to install the C driver, see
      :ref:`c-get-started-download-and-install` in the C
      driver documentation. Your installed driver must be built with
      Client-Side Field Level Encryption support.

   .. step:: Create a project directory.

      In your shell, run the following command to create a directory called
      ``c_qe`` for this project:

      .. code-block:: bash

         mkdir c_qe
         cd c_qe

   .. step:: Create your ``CMakeLists.txt`` file.

      Paste the following code into a file named ``CMakeLists.txt`` in
      your ``c_qe`` directory:

      .. literalinclude:: /includes/qe-tutorials/c/CMakeLists
         :language: cmake
         :caption: c_qe/CMakeLists.txt
         :dedent:

      This file configures CMake to locate the installed C driver
      with ``find_package`` and link your application against the
      ``mongoc::mongoc`` target.

   .. step:: Set up your environment variables.

      In your ``c_qe`` directory, create a file named ``.env``. The
      sample code in this tutorial references environment variables that
      you need to set in this file. Paste the following code into this
      file:

      .. literalinclude:: /includes/qe-tutorials/c/env_template
         :language: bash
         :caption: c_qe/.env
         :end-before: AWS Credentials
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/env-variables.rst

      Before you build and run the application, source the ``.env`` file
      to export these variables into your shell:

      .. code-block:: bash

         source .env

      To learn more about setting up environment variables, see the
      `README.md <{+sample-app-url-qe+}/c/README.md>`__ file included
      in the sample application on GitHub.

   .. step:: Create your main project file.

      In your ``c_qe`` directory, create a file named
      ``queryable_encryption_tutorial.c`` and paste the following
      starter code into this file. The placeholder comments indicate
      where you will add code in future steps of this tutorial:

      .. code-block:: c
         :caption: c_qe/queryable_encryption_tutorial.c

         #include <bson/bson.h>
         #include <mongoc/mongoc.h>

         #include <stdio.h>
         #include <stdlib.h>
         #include <string.h>

         static char const *
         getenv_or_exit (char const *name)
         {
            char const *value = getenv (name);
            if (!value) {
               fprintf (stderr, "Set the %s environment variable\n", name);
               exit (EXIT_FAILURE);
            }
            return value;
         }

         // Paste KMS provider credentials function below

         // Paste CMK credentials function below

         // Paste automatic encryption options function below

         // Paste client encryption function below

         int
         main (void)
         {
            mongoc_init ();

            // Paste application variables below

            // Paste code to retrieve credentials and encryption options below

            // Paste client configuration code below

            // Paste code to create a client encryption object below

            // Paste schema below

            // Paste code to create an encrypted collection below

            // Paste code to insert a document below

            // Paste code to query the document below

            mongoc_cleanup ();
            return 0;
         }

   .. step:: Assign your application variables.

      Declare the required application variables by pasting the
      following code into your ``queryable_encryption_tutorial.c``
      file under the ``// Paste application variables below`` comment.
      For this tutorial, set the ``kms_provider_name`` variable to
      ``"local"``.

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: c
         :dedent:

      The following table describes each application variable in the
      code snippet:

      .. list-table::
         :header-rows: 1
         :widths: 40 60

         * - Variable
           - Description
         * - ``kms_provider_name``
           - The KMS used to store your {+cmk-long+}. Set to ``"local"``.
         * - ``uri_string``
           - Your MongoDB connection URI. Set with the ``MONGODB_URI``
             environment variable.
         * - ``key_vault_db_name``
           - The database where DEKs are stored. Set to
             ``"encryption"``.
         * - ``key_vault_coll_name``
           - The collection where DEKs are stored. Set to
             ``"__keyVault"``.
         * - ``encrypted_db_name``
           - The database where encrypted data is stored. Set to
             ``"medicalRecords"``.
         * - ``encrypted_coll_name``
           - The collection where encrypted data is stored. Set to
             ``"patients"``.

.. _qe-quick-start-configure-c:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After you set up your project, follow the steps in this section to
create an encryption key and configure your application for {+qe+}.

.. procedure::
   :style: connected

   .. step:: Add a function to retrieve your KMS provider credentials.

      Add the following function to your
      ``queryable_encryption_tutorial.c`` file, under the ``// Paste
      KMS provider credentials function below`` comment:

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-get-kms-provider-credentials
         :end-before: end-get-kms-provider-credentials
         :emphasize-lines: 4-30
         :language: c
         :dedent:

      This function supports every {+kms-long+} that {+qe+} supports. For this
      tutorial, you use a Local Key Provider, so the function reads a
      96-byte {+cmk-long+} from the file ``customer-master-key.txt``.

      Before you run the application, use the following command to
      generate the key and save it to that file:

      .. code-block:: sh

         openssl rand 96 > customer-master-key.txt

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Add a function to retrieve your {+cmk-long+} credentials.

      Add the following function to your
      ``queryable_encryption_tutorial.c`` file, under the ``// Paste
      CMK credentials function below`` comment. A Local Key Provider
      doesn't require separate {+cmk-long+} credentials, so the
      ``"local"`` case returns an empty document:

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-get-customer-master-key
         :end-before: end-get-customer-master-key
         :emphasize-lines: 4-8
         :language: c
         :dedent:

   .. step:: Add a function to set your automatic encryption options.

      Add the following function to your
      ``queryable_encryption_tutorial.c`` file, under the ``// Paste
      automatic encryption options function below`` comment. The function
      returns a ``mongoc_auto_encryption_opts_t`` object that
      contains the following options:

      - The namespace of your {+key-vault-long+}
      - The ``kms_providers`` document, returned by the function you
        added in the first step of this section
      - The ``extra`` document, which contains the path to your
        {+shared-library+}

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-get-auto-encryption-options
         :end-before: end-get-auto-encryption-options
         :language: c
         :dedent:

   .. step:: Add a function to create a client encryption object.

      Add the following function to your
      ``queryable_encryption_tutorial.c`` file, under the ``// Paste
      client encryption function below`` comment. The function returns a
      ``mongoc_client_encryption_t`` object that you use later in
      this tutorial to create your encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-get-client-encryption
         :end-before: end-get-client-encryption
         :language: c
         :dedent:

   .. step:: Retrieve your credentials and build your encryption options.

      Paste the following code into your
      ``queryable_encryption_tutorial.c`` file, under the ``// Paste
      code to retrieve credentials and encryption options below``
      comment. This code calls the functions you added in the
      preceding steps to retrieve your KMS provider credentials, your
      {+cmk-long+} credentials, and your automatic encryption options:

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-get-credentials-and-options
         :end-before: end-get-credentials-and-options
         :language: c
         :dedent:

   .. step:: Create a client to set up an encrypted collection.

      Create a new client to encrypt and decrypt your collection. The
      client uses your connection URI and your automatic encryption
      options. Paste the following code into your
      ``queryable_encryption_tutorial.c`` file, under the ``// Paste
      client configuration code below`` comment:

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-create-client
         :end-before: end-create-client
         :language: c
         :dedent:

   .. step:: Create a client encryption object.

      Paste the following code into your
      ``queryable_encryption_tutorial.c`` file, under the ``// Paste
      code to create a client encryption object below`` comment, to
      instantiate a ``mongoc_client_encryption_t`` object to access
      the API for the encryption helper methods:

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-create-client-encryption
         :end-before: end-create-client-encryption
         :language: c
         :dedent:

   .. step:: Specify fields to encrypt.

      To encrypt a field, add it to the {+enc-schema+}. To enable
      queries on a field, add the ``queries`` property. Paste the
      following code under the ``// Paste schema below`` comment:

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-encrypted-fields-map
         :end-before: end-encrypted-fields-map
         :language: c
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/encrypted-fields-query-note.rst

   .. step:: Create your encrypted collection.

      Create your encrypted collection by using the
      ``mongoc_client_encryption_create_encrypted_collection()``
      function. This function automatically generates data
      encryption keys for your encrypted fields and creates the
      encrypted collection. Paste the following code under the ``//
      Paste code to create an encrypted collection below`` comment:

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-create-encrypted-collection
         :end-before: end-create-encrypted-collection
         :language: c
         :dedent:

      The function writes the generated collection options, including the
      server-assigned ``encryptedFields`` document, to the
      ``created_collection_opts`` output parameter.

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After you configure your application and database connection, you can
insert and query encrypted documents.

.. procedure::
   :style: connected

   .. step:: Insert a document with encrypted fields.

      In your ``queryable_encryption_tutorial.c`` file, paste the
      following code under the ``// Paste code to insert a
      document below`` comment to create a document that stores patient
      data and insert it into the ``patients`` collection:

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-insert-document
         :end-before: end-insert-document
         :language: c
         :dedent:

   .. step:: Query on encrypted data.

      Add the following code under the ``// Paste
      code to query the document below`` comment to query
      the ``patientRecord.ssn`` field:

      .. literalinclude:: /includes/qe-tutorials/c/queryable_encryption_tutorial.c
         :start-after: start-find-document
         :end-before: end-find-document
         :language: c
         :dedent:

   .. step:: Build and run your application.

      From your ``c_qe`` directory, run the following commands to
      configure and build your application:

      .. code-block:: bash

         cmake -S . -B build
         cmake --build build

      Then, run the compiled binary from the ``build`` directory:

      .. code-block:: bash

         ./build/queryable_encryption_tutorial

      The driver decrypts the encrypted fields automatically when it
      returns the document. The output of the preceding code sample
      should resemble the following:

      .. literalinclude:: /includes/qe-tutorials/encrypted-document.json
         :language: json
         :copyable: false
         :dedent:

      .. include:: /includes/queryable-encryption/safe-content-warning.rst
