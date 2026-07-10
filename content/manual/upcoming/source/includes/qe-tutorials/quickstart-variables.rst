The following table describes each application variable in the code snippet:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Variable
     - Description
   * - ``kmsProviderName``
     - The KMS used to store your {+cmk-long+}. For this
       tutorial, set this variable to ``"local"``.
   * - ``uri``
     - Your MongoDB connection URI. Set with the
       ``MONGODB_URI`` environment variable.
   * - ``keyVaultDatabaseName``
     - The database where DEKs are stored. Set to
       ``"encryption"``.
   * - ``keyVaultCollectionName``
     - The collection where DEKs are stored. Set to
       ``"__keyVault"``.
   * - ``keyVaultNamespace``
     - The namespace in MongoDB where your DEKs are stored.
       Set this variable to the values of the
       ``keyVaultDatabaseName`` and
       ``keyVaultCollectionName`` variables, separated by a
       period.
   * - ``encryptedDatabaseName``
     - The database where encrypted data is stored. Set to
       ``"medicalRecords"``.
   * - ``encryptedCollectionName``
     - The collection where encrypted data is stored. Set to
       ``"patients"``.
