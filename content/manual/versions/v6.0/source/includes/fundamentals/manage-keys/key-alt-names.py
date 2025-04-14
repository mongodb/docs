client = MongoClient(connection_string)
client_encryption = ClientEncryption(
    kms_providers,
    key_vault_namespace,
    client,
    CodecOptions(uuid_representation=STANDARD),
)
master_key={ "<Your dataKeyOpts Key>" : "<Your dataKeyOpts Value>"}
data_key_id = client_encryption.create_data_key(provider, master_key, key_alt_names=["<Your Key Alt Name>"])
