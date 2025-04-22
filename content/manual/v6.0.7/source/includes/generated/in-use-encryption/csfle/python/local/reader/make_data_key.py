from pymongo import MongoClient, ASCENDING
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.encryption import ClientEncryption
import base64
import os
from bson.codec_options import CodecOptions
from bson.binary import STANDARD, UUID

import os

path = "master-key.txt"
file_bytes = os.urandom(96)
with open(path, "wb") as f:
    f.write(file_bytes)

# start-kmsproviders
path = "./master-key.txt"
with open(path, "rb") as f:
    local_master_key = f.read()
kms_providers = {
    "local": {
        "key": local_master_key  # local_master_key variable from the previous step
    },
}
# end-kmsproviders

# start-datakeyopts
# end-datakeyopts

# start-create-index
connection_string = "<your connection string here>"

key_vault_coll = "__keyVault"
key_vault_db = "encryption"
key_vault_namespace = f"{key_vault_db}.{key_vault_coll}"
key_vault_client = MongoClient(connection_string)
# Drop the Key Vault Collection in case you created this collection
# in a previous run of this application.
key_vault_client.drop_database(key_vault_db)
# Drop the database storing your encrypted fields as all
# the DEKs encrypting those fields were deleted in the preceding line.
key_vault_client["medicalRecords"].drop_collection("patients")
key_vault_client[key_vault_db][key_vault_coll].create_index(
    [("keyAltNames", ASCENDING)],
    unique=True,
    partialFilterExpression={"keyAltNames": {"$exists": True}},
)
# end-create-index


# start-create-dek
key_vault_database = "encryption"
key_vault_collection = "__keyVault"
key_vault_namespace = f"{key_vault_database}.{key_vault_collection}"

client = MongoClient(connection_string)
client_encryption = ClientEncryption(
    kms_providers,  # pass in the kms_providers variable from the previous step
    key_vault_namespace,
    client,
    CodecOptions(uuid_representation=STANDARD),
)
data_key_id = client_encryption.create_data_key("local")

base_64_data_key_id = base64.b64encode(data_key_id)
print("DataKeyId [base64]: ", base_64_data_key_id)
# end-create-dek
