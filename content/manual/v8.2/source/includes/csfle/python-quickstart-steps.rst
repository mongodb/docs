.. _csfle-quick-start-set-up:

Set Up Your Project
~~~~~~~~~~~~~~~~~~~

Follow the steps in this section to create your project files and
assign the required configuration variables.

.. procedure::
   :style: connected

   .. step:: Install the dependencies.

      First, ensure that you have the following dependencies installed
      in your development environment:

      - `Python3 version 3.8 or later <https://www.python.org/downloads/>`__
      - `pip <https://pip.pypa.io/en/stable/installation/>`__

      Then, create a directory named ``python-csfle`` to store your project files.
      From this directory, start a `virtual environment <https://docs.python.org/3/library/venv.html>`__
      and install the PyMongo driver:

      .. code-block:: bash

         python3 -m pip install pymongo

   .. step:: Create your main project file.

      Add a file named ``main.py`` to your ``python-csfle`` directory.
      Paste the following code into this file:

      .. literalinclude:: /includes/csfle/python/main.py
         :language: python
         :caption: python-csfle/main.py
         :dedent:

      The ``main.py`` file contains your main function, which imports and runs the code
      from the other project files.

   .. step:: Create your data key file.

      To generate a {+cmk-long+} and {+dek-long+}, create a file named ``make_data_key.py``
      in your ``python-csfle`` directory and paste the following code:

      .. code-block:: python
         :caption: python-csfle/make_data_key.py

         from pymongo import MongoClient, ASCENDING
         from pymongo.encryption_options import AutoEncryptionOpts
         from pymongo.encryption import ClientEncryption
         import base64
         import os
         from bson.codec_options import CodecOptions
         from bson.binary import STANDARD, UUID
         import config

         kms_providers = config.get_kms_providers()

         # Paste CMK generation code below

         # Paste index creation code below

         # Paste Client and DEK generation code below

      In future steps, you will add code to this file under each
      corresponding comment.

   .. step:: Create your encrypted operations file.

      Next, create a file named ``insert_encrypted_document.py`` in your ``python-csfle`` directory
      and paste the following code:

      .. code-block:: python
         :caption: python-csfle/insert_encrypted_document.py

        from pymongo import MongoClient
        from pymongo.encryption_options import AutoEncryptionOpts
        from pymongo.encryption import ClientEncryption
        import base64
        import os
        from bson.codec_options import CodecOptions
        from bson.binary import STANDARD, UUID, Binary, UUID_SUBTYPE
        import pprint
        import config

        kms_providers = config.get_kms_providers()

        # Paste JSON schema below

        # Paste client configuration code below

        # Paste code to insert a document below

        # Paste code to query the document below

      In future steps, you will add code that inserts and queries encrypted documents
      under each corresponding comment.

   .. step:: Assign your configuration variables.

      Each of your project files imports variables from a configuration file.
      Create a file named ``config.py`` in your ``python-csfle`` directory and paste
      the following code:

      .. literalinclude:: /includes/csfle/python/config.py
         :language: python
         :caption: python-csfle/config.py
         :dedent:

      Then, replace the following placeholder values:

      - ``<connection string>``: Your MongoDB connection string
      - ``<Automatic Encryption Shared Library path>``: The full path
        to your {+shared-library+}, which resembles the following paths:
        
        - **macOS**: ``/<crypt shared directory>/lib/mongo_crypt_v1.dylib``
        - **Linux**: ``/<crypt shared directory>/lib/mongo_crypt_v1.so``
        - **Windows**: ``C:\<crypt shared directory>\bin\mongo_crypt_v1.dll``

      The ``config.py`` file instructs your application to
      store data encryption keys in the ``encryption.__keyVault`` namespace.

.. _field-level-encryption-data-key-create:
.. _csfle-quick-start-configure:

Configure Encryption
~~~~~~~~~~~~~~~~~~~~

After setting up your project, follow the steps in this section to create
an encryption key and configure your application for {+csfle-abbrev+}.

.. procedure::
   :style: connected

   .. _csfle-quick-start-create-master-key:

   .. step:: Create a {+cmk-long+}.

      Paste the following code into your ``make_data_key.py`` file under the
      ``# Paste CMK generation code below`` comment to generate
      a 96-byte {+cmk-long+} ({+cmk-abbr+}) and save it to your filesystem
      when you run the application:

      .. literalinclude:: /includes/csfle/python/make_data_key.py
         :language: python
         :caption: python-csfle/make_data_key.py
         :start-after: start-generate-cmk
         :end-before: end-generate-cmk
         :dedent:

      .. include:: /includes/queryable-encryption/qe-warning-local-keys.rst

   .. step:: Create a unique index on your {+key-vault-long+}.

      {+csfle+} depends on server-enforced uniqueness of key alternate names,
      so you must create a unique index on the ``keyAltNames`` field in your
      {+key-vault-long+}.

      Add the following code to your ``make_data_key.py`` file under the
      ``# Paste index creation code below`` comment to connect to
      MongoDB and create a partial unique index on the ``keyAltNames`` field:

      .. literalinclude:: /includes/csfle/python/make_data_key.py
         :language: python
         :caption: python-csfle/make_data_key.py
         :start-after: start-create-index
         :end-before: end-create-index
         :dedent:

   .. _csfle-local-create-dek:

   .. step:: Create a {+dek-long+}.

      .. _csfle-quick-start-create-dek:

      Add the following code to your ``make_data_key.py`` file under the
      ``# Paste Client and DEK generation code below`` comment to configure
      a ``ClientEncryption`` instance and generate a {+dek-long+}:

      .. literalinclude:: /includes/csfle/python/make_data_key.py
         :language: python
         :caption: python-csfle/make_data_key.py
         :start-after: start-create-data-key
         :end-before: end-create-data-key
         :dedent:

      The ``ClientEncryption`` instance uses your KMS provider credentials,
      key vault namespace, and your client to manage encryption keys. Once configured,
      the code calls the the ``create_data_key()`` method to generate a {+dek-long+}
      and writes it to a separate file.

   .. _csfle-quickstart-encryption-schema:

   .. step:: Define an encryption schema.

      .. _field-level-encryption-data-key-retrieve: 

      Add the following code to your ``insert_encrypted_document.py`` file under the
      ``# Paste encryption schema code below`` comment to define
      an encryption schema:

      .. literalinclude:: /includes/csfle/python/insert_encrypted_document.py
         :language: python
         :caption: python-csfle/insert_encrypted_document.py
         :start-after: start-json-schema
         :end-before: end-json-schema
         :dedent:

      The code reads your {+dek-abbr+} ID and uses it to encrypt the following fields in the
      ``medicalRecords.patients`` collection:

      - ``insurance.policyNumber``: Encrypted with deterministic encryption
      - ``ssn``: Encrypted with deterministic encryption
      - ``bloodType``: Encrypted with random encryption
      - ``medicalRecords``: Encrypted with random encryption

      Deterministic encryption allows you to perform equality queries
      on the encrypted fields. Random encryption provides stronger
      security for fields that you don't need to query, because this
      algorithm does not support read operations on the encrypted
      fields.

   .. step:: Create standard and {+csfle-abbrev+}-enabled clients.

      Paste the following code into your ``insert_encrypted_document.py``
      file under the ``# Paste client configuration code below`` comment to create
      two MongoDB clients:

      .. literalinclude:: /includes/csfle/python/insert_encrypted_document.py
         :language: python
         :caption: python-csfle/insert_encrypted_document.py
         :start-after: start-create-client
         :end-before: end-create-client
         :dedent:
     
      This code creates a ``MongoClient`` instance with an ``AutoEncryptionOpts`` object
      that specifies your KMS provider credentials, key vault namespace, encryption schema, and
      the location of your {+shared-library+}. The code also creates a
      standard ``MongoClient`` instance without automatic encryption.
      In a future step, you will compare the output of both clients.

      .. include:: /includes/tutorials/csfle-shared-lib-learn-more.rst

.. _csfle-quick-start-operations:

Perform Encrypted Operations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After configuring your application and database connection, follow the
steps in this section to insert and query encrypted documents.

.. procedure::
   :style: connected

   .. _csfle-quick-start-insert:

   .. step:: Insert a document with encrypted fields.

      Add the following code to your ``insert_encrypted_document.py`` file under the
      ``# Paste document insertion code below`` comment to insert a document into the
      ``medicalRecords.patients`` collection:

      .. literalinclude:: /includes/csfle/python/insert_encrypted_document.py
         :language: python
         :caption: python-csfle/insert_encrypted_document.py
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

      Add the following code to your ``insert_encrypted_document.py`` file under the
      ``# Paste document query code below`` comment to retrieve the document with both a {+csfle-abbrev+}-enabled client
      and a standard client:

      .. literalinclude:: /includes/csfle/python/insert_encrypted_document.py
         :language: python
         :caption: python-csfle/insert_encrypted_document.py
         :start-after: start-find-document
         :end-before: end-find-document
         :dedent:

      The {+csfle-abbrev+}-enabled client automatically decrypts the
      encrypted fields when it retrieves the document. The standard client
      returns the encrypted binary values.

   .. step:: Run the application.

      To start the application, run the following command from your project directory:

      .. code-block:: bash

         python main.py

      If successful, your output resembles the following example:

      .. code-block:: none
         :copyable: false

         ============================================================
         Running make_data_key.py...
         ============================================================
         DataKeyId [base64]:  ...

         ============================================================
         Running insert_encrypted_document.py...
         ============================================================
         Finding a document with the regular (non-encrypted) client:
         {'_id': ObjectId('...'),
         'bloodType': Binary(b'\x02\x87\x83\xa9*\x8a\xa1D\x8b\xba\xe0i\x92\xb4\xa5\xe5\x80\x02\xacb\xbdI\xd5\xa7\xed\xf1\x8d\xda\x84\xd6\x1e\xf0\xa1\xa4\x142\x0b\x05\xd0\xed\x96rW\xc6+1|a"8U\xfa\xcd\xd5\x05>\xbd19\\\x8c\xba\xddUr\x87a\x9f\xb91I\xbdu\x823\x14\xbd\xa0m\xeb+\x9c', 6),
         'insurance': {'policyNumber': Binary(b'\x01\x87\x83\xa9*\x8a\xa1D\x8b\xba\xe0i\x92\xb4\xa5\xe5\x80\x104\x04\xeb\xbc7\xa7\xaf\x849\xcd\xe0\xa1}ji\x0e`\xd6\x10\x00\x19\xc0\x92\x03\xfe\x9c\x97\xbd1\xf2\xb6I\x99/\xa0\xb5\x07\xfe\xdd\x08\xf5\x11\x101\xb7q\xd0\xadK\x9bH7\x9f\xe8]=2G\x15\x1dCD\n/', 6),
                    'provider': 'MaestCare'},
         'medicalRecords': Binary(b'\x02\x87\x83\xa9*\x8a\xa1D\x8b\xba\xe0i\x92\xb4\xa5\xe5\x80\x04`hP\xa3\x84\xe1\xa5\xc9\xba0\x84\xa3i\x1e\x1e;{9"\x90\xab\xc9\xdbS\xcc\x1a/\xfcgT-\x17G\xddg\x02\x8ce\xb8\xe00gX\xc7\xcc\xb9\x1b5\x0c\x00\x7f\xa3\x1d\xda}\xc2\x99\\\x1c0b\xd2\xa1\xd7\xf8%\x86\xc1\xda\xfa\xa2\x8fV\xf9\xc9\xcb\x8a.{\xecC\xc78#\xa6HX\xe9\xc44!\\S\xb9d\xe5\x9c\xf3\xe7\xb1+\xa55AC]\x9e2\xe6\xf5<\xf2', 6),
         'name': 'Jon Doe',
         'ssn': Binary(b'\x01\x87\x83\xa9*\x8a\xa1D\x8b\xba\xe0i\x92\xb4\xa5\xe5\x80\x10\xc8\xacE\xcdpT\r\x07\x11\xc3h\x0f\x93<\x92\xcc\xb4\xd3\x97q\x1a\x0eF\x8d8\x1c.\xc9\xe1\xce\x07\x1eGX\x1e\xee\x8a>\xf8\xc7\xf36\xdeF@j\xda\x8b\xde\xc6\x92$X\x8d\xbe\xce\x83\x00E\x08Lp\xbd\xe8', 6)}
         
         Finding a document with the encrypted client:
         {'_id': ObjectId('...'),
         'bloodType': 'AB+',
         'insurance': {'policyNumber': 123142, 'provider': 'MaestCare'},
         'medicalRecords': [{'bloodPressure': '120/80', 'weight': 180}],
         'name': 'Jon Doe',
         'ssn': 241014209}

         ============================================================
         All scripts completed successfully!
         ============================================================

      The output includes your {+dek-abbr+} ID, the encrypted document as stored in your
      database, and the decrypted document retrieved with your {+csfle-abbrev+}-enabled client.