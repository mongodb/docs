key_vault_client = MongoClient("<connection string URI>")

client_encryption = ClientEncryption(
    kms_providers,
    key_vault_namespace,
    key_vault_client,
    CodecOptions(uuid_representation=STANDARD),
)

result = client_encryption.rewrap_many_data_key(
    filter={"<filter field>": "<filter value>"},
    provider="<KMS provider>",
    master_key={"<dataKeyOpts Key>": "<dataKeyOpts Value>"},
)
