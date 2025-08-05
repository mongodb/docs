The code samples in this tutorial use the following variables to perform
the {+qe+} workflow:

.. tabs-drivers::

   .. tab::
      :tabid: shell

      - **kmsProviderName** - The KMS you use to store your
        {+cmk-long+}. Set this to your key provider: ``"aws"``, 
        ``"azure"``, ``"gcp"``, or ``"kmip"``.

      - **uri** - Your MongoDB deployment connection URI. Set your
        connection URI in the ``MONGODB_URI`` environment variable or
        replace the value directly.

      - **keyVaultDatabaseName** - The MongoDB database where your
        data encryption keys (DEKs) will be stored. Set this to ``"encryption"``.

      - **keyVaultCollectionName** - The collection in MongoDB where
        your DEKs will be stored. Set this to ``"__keyVault"``.

      - **keyVaultNamespace** - The namespace in MongoDB where your DEKs
        will be stored. Set this to the values of the 
        ``keyVaultDatabaseName`` and ``keyVaultCollectionName``
        variables, separated by a period.

      - **encryptedDatabaseName** - The MongoDB database where your
        encrypted data will be stored. Set this to ``"medicalRecords"``.
      
      - **encryptedCollectionName** - The collection in MongoDB where
        your encrypted data will be stored. Set this to ``"patients"``.

      You can declare these variables by using the following code:

      .. literalinclude:: /includes/qe-tutorials/mongosh/queryable-encryption-tutorial.js
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: javascript
         :dedent:

   .. tab::
      :tabid: nodejs

      - **kmsProviderName** - The KMS you use to store your
        {+cmk-long+}. Set this to your key provider: ``"aws"``, 
        ``"azure"``, ``"gcp"``, or ``"kmip"``.
      
      - **uri** - Your MongoDB deployment connection URI. Set your connection
        URI in the ``MONGODB_URI`` environment variable or replace the value
        directly.
      
      - **keyVaultDatabaseName** - The MongoDB database where your data
        encryption keys (DEKs) will be stored. Set this to ``"encryption"``.
      
      - **keyVaultCollectionName** - The collection in MongoDB where your DEKs
        will be stored. Set this to ``"__keyVault"``.
      
      - **keyVaultNamespace** - The namespace in MongoDB where your DEKs
        will be stored. Set this to the values of the ``keyVaultDatabaseName``
        and ``keyVaultCollectionName`` variables, separated by a period.
      
      - **encryptedDatabaseName** - The MongoDB database where your encrypted
        data will be stored. Set this to ``"medicalRecords"``.
      
      - **encryptedCollectionName** - The collection in MongoDB where your
        encrypted data will be stored. Set this to ``"patients"``.

      You can declare these variables by using the following code:

      .. literalinclude:: /includes/qe-tutorials/node/queryable-encryption-tutorial.js
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: javascript
         :dedent:

   .. tab::
      :tabid: python

      - **kms_provider_name** - The KMS you use to store your
        {+cmk-long+}. Set this to your key provider: ``"aws"``, 
        ``"azure"``, ``"gcp"``, or ``"kmip"``.
      
      - **uri** - Your MongoDB deployment connection URI. Set your connection
        URI in the ``MONGODB_URI`` environment variable or replace the value
        directly.
      
      - **key_vault_database_name** - The MongoDB database where your data
        encryption keys (DEKs) will be stored. Set this to ``"encryption"``.
      
      - **key_vault_collection_name** - The collection in MongoDB where your
        DEKs will be stored. Set this to ``"__keyVault"``.
      
      - **key_vault_namespace** - The namespace in MongoDB where your DEKs
        will be stored. Set this to the values of the ``key_vault_database_name``
        and ``key_vault_collection_name`` variables, separated by a period.
      
      - **encrypted_database_name** - The MongoDB database where your encrypted
        data will be stored. Set this to ``"medicalRecords"``.
      
      - **encrypted_collection_name** - The collection in MongoDB where
        your encrypted data will be stored. Set this to ``"patients"``.

      You can declare these variables by using the following code:

      .. literalinclude:: /includes/qe-tutorials/python/queryable_encryption_tutorial.py
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: python
         :dedent:

   .. tab::
      :tabid: java-sync

      - **kmsProviderName** - The KMS you use to store your
        {+cmk-long+}. Set this to your key provider: ``"aws"``, 
        ``"azure"``, ``"gcp"``, or ``"kmip"``.
      
      - **uri** - Your MongoDB deployment connection URI. Set your connection
        URI in the ``MONGODB_URI`` environment variable or replace the value
        directly.
      
      - **keyVaultDatabaseName** - The MongoDB database where your data
        encryption keys (DEKs) will be stored. Set this to ``"encryption"``.
      
      - **keyVaultCollectionName** - The collection in MongoDB where your DEKs
        will be stored. Set this to ``"__keyVault"``.
      
      - **keyVaultNamespace** - The namespace in MongoDB where your DEKs
        will be stored. Set this to the values of the ``keyVaultDatabaseName``
        and ``keyVaultCollectionName`` variables, separated by a period.
      
      - **encryptedDatabaseName** - The MongoDB database where your encrypted
        data will be stored. Set this to ``"medicalRecords"``.
      
      - **encryptedCollectionName** - The collection in MongoDB where your
        encrypted data will be stored. Set this to ``"patients"``.

      You can declare these variables by using the following code:

      .. literalinclude:: /includes/qe-tutorials/java/src/main/java/com/mongodb/tutorials/qe/QueryableEncryptionTutorial.java
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: java
         :dedent:

   .. tab::
      :tabid: go

      - **kmsProviderName** - The KMS you use to store your
        {+cmk-long+}. Set this to your key provider: ``"aws"``, 
        ``"azure"``, ``"gcp"``, or ``"kmip"``.
      
      - **uri** - Your MongoDB deployment connection URI. Set your connection
        URI in the ``MONGODB_URI`` environment variable or replace the value
        directly.
      
      - **keyVaultDatabaseName** - The MongoDB database where your data
        encryption keys (DEKs) will be stored. Set this to ``"encryption"``.
      
      - **keyVaultCollectionName** - The collection in MongoDB where your DEKs
        will be stored. Set this to ``"__keyVault"``.
      
      - **keyVaultNamespace** - The namespace in MongoDB where your DEKs
        will be stored. Set this to the values of the
        ``keyVaultDatabaseName`` and ``keyVaultCollectionName``
        variables, separated by a period.
      
      - **encryptedDatabaseName** - The MongoDB database where your encrypted
        data will be stored. Set this to ``"medicalRecords"``.
      
      - **encryptedCollectionName** - The collection in MongoDB where your
        encrypted data will be stored. Set this to ``"patients"``.

      You can declare these variables by using the following code:

      .. literalinclude:: /includes/qe-tutorials/go/queryable_encryption_tutorial.go
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: go
         :dedent:

   .. tab::
      :tabid: csharp

      - **kmsProviderName** - The KMS you use to store your
        {+cmk-long+}. Set this to your key provider: ``"aws"``, 
        ``"azure"``, ``"gcp"``, or ``"kmip"``.
      
      - **keyVaultDatabaseName** - The MongoDB database where your data
        encryption keys (DEKs) will be stored. Set ``keyVaultDatabaseName``
        to ``"encryption"``.
      
      - **keyVaultCollectionName** - The collection in MongoDB where your DEKs
        will be stored. Set ``keyVaultCollectionName`` to ``"__keyVault"``.
      
      - **keyVaultNamespace** - The namespace in MongoDB where your DEKs
        will be stored. Set ``keyVaultNamespace`` to a new
        ``CollectionNamespace`` object whose name is the values of the
        ``keyVaultDatabaseName`` and ``keyVaultCollectionName``
        variables, separated by a period.
      
      - **encryptedDatabaseName** - The MongoDB database where your encrypted
        data will be stored. Set ``encryptedDatabaseName`` to ``"medicalRecords"``.
      
      - **encryptedCollectionName** - The collection in MongoDB where your
        encrypted data will be stored. Set ``encryptedCollectionName`` to
        ``"patients"``.
      
      - **uri** - Your MongoDB deployment connection URI. Set your connection
        URI in the ``appsettings.json`` file or replace the value
        directly.

      You can declare these variables by using the following code:

      .. literalinclude:: /includes/qe-tutorials/csharp/QueryableEncryptionTutorial.cs
         :start-after: start-setup-application-variables
         :end-before: end-setup-application-variables
         :language: csharp
         :dedent:

   .. tab::
      :tabid: rust

      - **kms_provider_name** - The KMS you're using to store your {+cmk-long+}.
        Set this variable to ``"local"`` for this tutorial.
      - **uri** - Your MongoDB deployment connection URI. Set your connection
        URI in the ``MONGODB_URI`` environment variable.
      - **key_vault_database_name** - The database in MongoDB where your data
        encryption keys (DEKs) will be stored. Set this variable
        to ``"encryption"``.
      - **key_vault_collection_name** - The collection in MongoDB where your DEKs
        will be stored. Set this variable to ``"__keyVault"``, which is the 
        convention to help prevent mistaking it for a user collection.
      - **key_vault_namespace** - The namespace in MongoDB where your DEKs will
        be stored. Set this variable to a ``Namespace`` struct and pass the values of
        the ``key_vault_database_name`` and ``key_vault_collection_name`` variables.
      - **encrypted_database_name** - The database in MongoDB where your encrypted
        data will be stored. Set this variable to ``"medicalRecords"``.
      - **encrypted_collection_name** - The collection in MongoDB where your encrypted
        data will be stored. Set this variable to ``"patients"``.

      You can declare these variables by using the following code:

      .. literalinclude:: /includes/qe-tutorials/rust/src/queryable_encryption_tutorial.rs
          :start-after: start-setup-application-variables
          :end-before: end-setup-application-variables
          :language: rust
          :dedent:

   .. tab::
      :tabid: php

      - **$kmsProviderName** - The KMS you're using to store your {+cmk-long+}.
        Set the ``KMS_PROVIDER`` environment variable to your key provider:
        ``'aws'``, ``'azure'``, ``'gcp'``, or ``'kmip'``.
      - **$uri** - Your MongoDB deployment connection URI. Set your connection
        URI in the ``MONGODB_URI`` environment variable.
      - **$keyVaultDatabaseName** - The database in MongoDB where your data
        encryption keys (DEKs) will be stored. Set the value of ``$keyVaultDatabaseName``
        to ``'encryption'``.
      - **$keyVaultCollectionName** - The collection in MongoDB where your DEKs
        will be stored. Set this variable to ``'__keyVault'``, which is the 
        convention to help prevent mistaking it for a user collection.
      - **$keyVaultNamespace** - The namespace in MongoDB where your DEKs will
        be stored. Set this variable to the values of the ``$keyVaultDatabaseName``
        and ``$keyVaultCollectionName`` variables, separated by a period.
      - **$encryptedDatabaseName** - The database in MongoDB where your encrypted
        data will be stored. Set this variable to ``'medicalRecords'``.
      - **$encryptedCollectionName** - The collection in MongoDB where your encrypted
        data will be stored. Set this variable to ``'patients'``.

      You can declare these variables by using the following code:

      .. literalinclude:: /includes/qe-tutorials/php/queryable-encryption-tutorial.php
          :start-after: start-setup-application-variables
          :end-before: end-setup-application-variables
          :language: php
          :dedent:

.. important:: {+key-vault-long-title+} Namespace Permissions

        The {+key-vault-long+} is in the ``encryption.__keyVault``
        namespace. Ensure that the database user your application uses to connect
        to MongoDB has :ref:`ReadWrite <manual-reference-role-read-write>`
        permissions on this namespace.

.. include:: /includes/queryable-encryption/env-variables.rst