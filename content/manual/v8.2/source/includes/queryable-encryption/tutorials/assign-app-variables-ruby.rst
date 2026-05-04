The code samples in this tutorial use the following variables to
perform the {+qe+} workflow:

- **kms_provider_name** - The KMS you use to store your
  {+cmk-long+}. Set this to your key provider: ``"aws"``,
  ``"azure"``, ``"gcp"``, or ``"kmip"``.

- **uri** - Your MongoDB deployment connection URI. Set your
  connection URI in the ``MONGODB_URI`` environment variable or
  replace the value directly.

- **key_vault_database_name** - The MongoDB database where your
  data encryption keys (DEKs) will be stored. Set this to
  ``"encryption"``.

- **key_vault_collection_name** - The collection in MongoDB
  where your DEKs will be stored. Set this to ``"__keyVault"``,
  which is the convention to help prevent mistaking it for a
  user collection.

- **key_vault_namespace** - The namespace in MongoDB where your
  DEKs will be stored. Set this to the values of the
  ``key_vault_database_name`` and ``key_vault_collection_name``
  variables separated by a period, in the format
  ``"#{key_vault_database_name}.#{key_vault_collection_name}"``.

- **encrypted_database_name** - The MongoDB database where your
  encrypted data will be stored. Set this to
  ``"medicalRecords"``.

- **encrypted_collection_name** - The collection in MongoDB
  where your encrypted data will be stored. Set this to
  ``"patients"``.
