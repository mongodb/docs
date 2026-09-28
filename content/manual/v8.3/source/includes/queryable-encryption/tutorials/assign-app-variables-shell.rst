The code samples in this tutorial use the following variables to
perform the {+qe+} workflow:

- **kmsProviderName** - The KMS you use to store your
  {+cmk-long+}. Set this to your key provider: ``"aws"``,
  ``"azure"``, ``"gcp"``, or ``"kmip"``.

- **uri** - Your MongoDB deployment connection URI. Set your
  connection URI in the ``MONGODB_URI`` environment variable or
  replace the value directly.

- **keyVaultDatabaseName** - The MongoDB database where your
  data encryption keys (DEKs) will be stored. Set this to
  ``"encryption"``.

- **keyVaultCollectionName** - The collection in MongoDB where
  your DEKs will be stored. Set this to ``"__keyVault"``.

- **keyVaultNamespace** - The namespace in MongoDB where your
  DEKs will be stored. Set this to the values of the
  ``keyVaultDatabaseName`` and ``keyVaultCollectionName``
  variables, separated by a period.

- **encryptedDatabaseName** - The MongoDB database where your
  encrypted data will be stored. Set this to
  ``"medicalRecords"``.

- **encryptedCollectionName** - The collection in MongoDB where
  your encrypted data will be stored. Set this to ``"patients"``.
