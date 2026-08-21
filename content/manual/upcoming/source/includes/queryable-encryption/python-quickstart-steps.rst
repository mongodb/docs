.. _qe-quick-start-set-up-python:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install dependencies.

      Create a directory named ``python-qe`` to store your project
      files. Run the following commands to navigate into the directory
      and create a virtual environment:

      .. code-block:: bash

         cd python-qe
         python3 -m venv venv
         source venv/bin/activate

      Then, install the required packages:

      .. code-block:: bash

         python3 -m pip install pymongo pymongocrypt python-dotenv

   .. step:: Set up your environment variables.

      In your ``python-qe`` directory, create a ``.env`` file. The sample code 
      in this tutorial references environment variables that you need to set in
      this ``.env`` file. Paste the following code into this file:

      .. literalinclude:: /includes/qe-tutorials/python/env_template
         :language: text
         :start-after: MongoDB connection uri and automatic encryption shared library path
         :end-before: AWS Credentials
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/env-variables.rst

      For more information on setting up environment variables, see the
      `README.md <{+sample-app-url-qe+}/python/README.md>`__  file included in the
      sample application on GitHub.

   .. step:: Create your main project file.

      In your ``python-qe`` directory, create a file named ``quickstart.py``.
      Paste the following starter code into this file. The placeholder comments
      indicate where you will add code in future steps of this tutorial:

      .. code-block:: python
         :caption: python-qe/quickstart.py

         import os
         from dotenv import load_dotenv
         from pymongo import MongoClient
         from pymongo.encryption import ClientEncryption
         from pymongo.encryption_options import AutoEncryptionOpts
         from bson.codec_options import CodecOptions
         from bson.binary import STANDARD

         load_dotenv()

         # Paste application variables below

         # Paste code to generate CMK below

         # Paste code to retrieve CMK and specify KMS provider settings below

         # Paste automatic encryption options code below

         # Paste client configuration code below

         # Paste schema below

         # Paste code to create an encrypted collection below

         # Paste code to insert a document below

         # Paste code to query the document below

   .. step:: Assign your application variables.

      Declare the required application variables by pasting the following code into your
      ``quickstart.py`` file under the ``# Paste application variables below``
      comment. For this tutorial, set the ``kms_provider_name`` variable to 
      ``"local"``.

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_tutorial.py
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: python
         :dedent:

      The following table describes each application variable in the code snippet:
      
      .. list-table::
         :header-rows: 1
         :widths: 30 70
         
         * - Variable
           - Description
         * - ``kms_provider_name``
           - The KMS used to store your {+cmk-long+}. For this
             tutorial, set this variable to ``"local"``.
         * - ``uri``
           - Your MongoDB connection URI. Set with the
             ``MONGODB_URI`` environment variable.
         * - ``key_vault_database_name``
           - The database where DEKs are stored. Set to ``"encryption"``.
         * - ``key_vault_collection_name``
           - The collection where DEKs are stored. Set to ``"__keyVault"``.
         * - ``key_vault_namespace``
           - The namespace in MongoDB where your DEKs are stored. Set this 
             variable to the values of the ``key_vault_database_name`` and
             ``key_vault_collection_name`` variables, separated by a period.
         * - ``encrypted_database_name``
           - The database where encrypted data is stored. Set to
             ``"medicalRecords"``.
         * - ``encrypted_collection_name``
           - The collection where encrypted data is stored. Set to
             ``"patients"``.

.. _qe-quick-start-configure-python:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~~

After you set up your project, follow the steps in this section to create an
encryption key and configure your application for {+qe+}.

.. procedure::
   :style: connected

   .. step:: Create an encryption key.

      Paste the following code into your ``quickstart.py`` file under the
      ``# Paste code to generate CMK below`` comment. This code snippet creates
      a 96-byte {+cmk-long+} and saves it to your filesystem as the
      file ``customer-master-key.txt``:

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
         :start-after: start-generate-local-key
         :end-before: end-generate-local-key
         :language: python
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Retrieve the {+cmk-long+} and specify the KMS provider settings.

      Paste the following code into your ``quickstart.py`` file under the
      ``# Paste code to retrieve CMK and specify KMS provider settings below``
      comment to retrieve the contents of the ``customer-master-key.txt`` file
      you generated in the previous step:

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
         :start-after: start-get-local-key
         :end-before: end-get-local-key
         :emphasize-lines: 6-10
         :language: python
         :dedent:

      This code sets the provider name to ``local`` to use a Local Key Provider
      and uses the {+cmk-abbr+} value from your KMS provider settings.

   .. step:: Set your automatic encryption options.

      Add the following code under the
      ``# Paste automatic encryption options code below`` comment to create an
      ``AutoEncryptionOpts`` object that contains the following options:

      - The ``kms_provider_credentials`` object, defined in the previous step
      - The namespace of your {+key-vault-long+}
      - The path to your {+shared-library+}

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
         :start-after: start-auto-encryption-options
         :end-before: end-auto-encryption-options
         :language: python
         :dedent:

   .. step:: Create a client to set up an encrypted collection.

      Create a new client to encrypt and decrypt your collection. The client
      uses your connection URI and automatic encryption options. Paste the
      following code into your ``quickstart.py`` file, under the
      ``# Paste client configuration code below`` comment:

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_tutorial.py
         :start-after: start-create-client
         :end-before: end-create-client
         :language: python
         :dedent:

   .. step:: Specify fields to encrypt.

      To encrypt a field, add it to the {+enc-schema+}. To enable queries on a
      field, add the ``queries`` property. Paste the following code under the
      ``# Paste schema below`` comment:

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_tutorial.py
         :start-after: start-encrypted-fields-map
         :end-before: end-encrypted-fields-map
         :language: python
         :dedent:

      .. include:: /includes/queryable-encryption/quick-start/encrypted-fields-query-note.rst

   .. step:: Create your encrypted collection.

      Add the following code blocks to your ``quickstart.py`` file, under the
      ``# Paste code to create an encrypted collection below`` comment in the
      order shown.

      First, instantiate a ``ClientEncryption`` object to access the API for the
      encryption helper methods:

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
         :start-after: start-client-encryption
         :end-before: end-client-encryption
         :language: python
         :dedent:

      Because you are using a local {+cmk-long+}, you don't need to provide
      {+cmk-long+} credentials. Create a variable containing an empty object to
      use in place of credentials when you create your encrypted collection.

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_helpers.py
         :start-after: start-kmip-local-cmk-credentials
         :end-before: end-kmip-local-cmk-credentials
         :language: python
         :dedent:

      Create your encrypted collection by using the encryption helper method
      accessed through the ``ClientEncryption`` class. This method automatically
      generates data encryption keys for your encrypted fields and creates the
      encrypted collection:

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_tutorial.py
         :start-after: start-create-encrypted-collection
         :end-before: end-create-encrypted-collection
         :language: python
         :dedent:

.. _qe-quick-start-operations-python:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After you configure your application and database connection, you can insert
and query encrypted documents.

.. procedure::
   :style: connected

   .. step:: Insert a document with encrypted fields.

      Paste the following code under the
      ``# Paste code to insert a document below`` comment to create a
      document that stores patient data and insert it into the ``patients``
      collection:

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_tutorial.py
         :start-after: start-insert-document
         :end-before: end-insert-document
         :emphasize-lines: 16
         :language: python
         :dedent:

   .. step:: Query on encrypted data.

      Add the following code to your ``quickstart.py`` file under the
      ``# Paste code to query the document below`` comment:

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_tutorial.py
         :start-after: start-find-document
         :end-before: end-find-document
         :language: python
         :dedent:

   .. step:: Run your application.

      To start your application, run the following command from your project
      directory:

      .. code-block:: bash

         python3 quickstart.py

      The output of the preceding code sample should look similar to the
      following:

      .. literalinclude:: /includes/qe-tutorials/encrypted-document.json
         :language: json
         :copyable: false
         :dedent:

      .. include:: /includes/queryable-encryption/safe-content-warning.rst
