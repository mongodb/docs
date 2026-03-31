The code samples in this tutorial use the following variables to
perform the {+qe+} workflow:

- **kmsProviderName** - The KMS you use to store your
  {+cmk-long+}. Set this to your key provider: ``"aws"``,
  ``"azure"``, ``"gcp"``, or ``"kmip"``.

- **keyVaultDatabaseName** - The MongoDB database where your
  data encryption keys (DEKs) will be stored. Set
  ``keyVaultDatabaseName`` to ``"encryption"``.

- **keyVaultCollectionName** - The collection in MongoDB where
  your DEKs will be stored. Set ``keyVaultCollectionName`` to
  ``"__keyVault"``.

- **keyVaultNamespace** - The namespace in MongoDB where your
  DEKs will be stored. Set ``keyVaultNamespace`` to a new
  ``CollectionNamespace`` object whose name is the values of the
  ``keyVaultDatabaseName`` and ``keyVaultCollectionName``
  variables, separated by a period.

- **encryptedDatabaseName** - The MongoDB database where your
  encrypted data will be stored. Set ``encryptedDatabaseName``
  to ``"medicalRecords"``.

- **encryptedCollectionName** - The collection in MongoDB where
  your encrypted data will be stored. Set
  ``encryptedCollectionName`` to ``"patients"``.

- **uri** - Your MongoDB deployment connection URI. Set your
  connection URI in the ``appsettings.json`` file or replace the
  value directly.
