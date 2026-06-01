from pymongo import MongoClient, ASCENDING
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.encryption import ClientEncryption
import base64
import os
from bson.codec_options import CodecOptions
from bson.binary import STANDARD, UUID
import config

kms_providers = config.get_kms_providers()

# start-generate-cmk
file_bytes = os.urandom(96)
with open(config.master_key_path, "wb") as f:
    f.write(file_bytes)
# end-generate-cmk

# start-create-index
key_vault_client = MongoClient(config.connection_string)
# Drops the Key Vault collection and database if they already exist
key_vault_client.drop_database(config.key_vault_db)
key_vault_client["medicalRecords"].drop_collection("patients")
key_vault_client[config.key_vault_db][config.key_vault_coll].create_index(
    [("keyAltNames", ASCENDING)],
    unique=True,
    partialFilterExpression={"keyAltNames": {"$exists": True}},
)
# end-create-index

# start-create-data-key
client = MongoClient(config.connection_string)
client_encryption = ClientEncryption(
    kms_providers,
    config.key_vault_namespace,
    client,
    CodecOptions(uuid_representation=STANDARD),
)

data_key_id = client_encryption.create_data_key("local")

base_64_data_key_id = base64.b64encode(data_key_id)
print("DataKeyId [base64]: ", base_64_data_key_id)

# Writes the key ID to a file for use by other scripts
with open(config.dek_id_path, "wb") as f:
    f.write(base_64_data_key_id)
# end-create-data-key