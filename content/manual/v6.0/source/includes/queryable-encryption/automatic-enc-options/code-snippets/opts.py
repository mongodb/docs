fle_opts = AutoEncryptionOpts(
  kms_providers,
  key_vault_namespace,
  schema_map=patient_schema,
  **extra_options
)
client = MongoClient(connection_string, auto_encryption_opts=fle_opts)
