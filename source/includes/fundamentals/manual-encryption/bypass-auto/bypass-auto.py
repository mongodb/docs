auto_encryption_opts = AutoEncryptionOpts(
    kms_providers=kms_providers,
    key_vault_namespace=key_vault_namespace,
    bypass_auto_encryption=True,
)
client = MongoClient(auto_encryption_opts=auto_encryption_opts)
