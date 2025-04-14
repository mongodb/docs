- **kmsProviderName** - The KMS you're using to store your {+cmk-long+}.
  Set this variable to ``"local"`` for this tutorial.
- **uri** - Your MongoDB deployment connection URI. Set your connection
  URI in the ``MONGODB_URI`` environment variable or replace the value
  directly.
- **keyVaultDatabaseName** - The database in MongoDB where your data
  encryption keys (DEKs) will be stored. Set this variable
  to ``"encryption"``.
- **keyVaultCollectionName** - The collection in MongoDB where your DEKs
  will be stored. Set this variable to ``"__keyVault"``, which is the convention
  to help prevent mistaking it for a user collection.
- **keyVaultNamespace** - The namespace in MongoDB where your DEKs will
  be stored. Set this variable to the values of the ``keyVaultDatabaseName``
  and ``keyVaultCollectionName`` variables, separated by a period.
- **encryptedDatabaseName** - The database in MongoDB where your encrypted
  data will be stored. Set this variable to ``"medicalRecords"``.
- **encryptedCollectionName** - The collection in MongoDB where your encrypted
  data will be stored. Set this variable to ``"patients"``.
