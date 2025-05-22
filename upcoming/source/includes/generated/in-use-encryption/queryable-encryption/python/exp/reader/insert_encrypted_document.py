import os

from pymongo import MongoClient
from pymongo.encryption import (
    Algorithm,
    AutoEncryptionOpts,
    ClientEncryption,
    QueryType,
)
import pprint

# start-key-vault
key_vault_namespace = "encryption.__keyVault"
key_vault_db_name, key_vault_coll_name = key_vault_namespace.split(".", 1)
# end-key-vault

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

# start-retrieve-deks
connection_string = "<your connection string here>"
client = MongoClient(connection_string)
key_vault = client[key_vault_db_name][key_vault_coll_name]

data_key_id_1 = key_vault.find_one({"keyAltNames": "dataKey1"})["_id"]
data_key_id_2 = key_vault.find_one({"keyAltNames": "dataKey2"})["_id"]
# end-retrieve-deks

# start-extra-options
opts = AutoEncryptionOpts(
    kms_providers,
    key_vault.full_name,
    bypass_query_analysis=True,
    key_vault_client=client,
    crypt_shared_lib_path="<path to FLE Shared Library>",
)
# end-extra-options

# start-client
encrypted_client = MongoClient(connection_string, auto_encryption_opts=opts)
db = encrypted_client.medicalRecords
coll = db.patients
# end-client

# start-client-enc
client_encryption = ClientEncryption(
    kms_providers, key_vault_namespace, client, client.codec_options
)
# end-client-enc

# start-insert
patientId = 12345678
medications = ["Atorvastatin", "Levothyroxine"]
indexed_insert_payload = client_encryption.encrypt(
    patientId, Algorithm.INDEXED, data_key_id_1, contention_factor=8
)
unindexed_insert_payload = client_encryption.encrypt(
    medications, Algorithm.UNINDEXED, data_key_id_2
)
coll.insert_one(
    {
        "firstName": "Jon",
        "patientId": indexed_insert_payload,
        "medications": unindexed_insert_payload,
    }
)
# end-insert

# start-find
find_payload = client_encryption.encrypt(
    patientId,
    Algorithm.INDEXED,
    data_key_id_1,
    query_type=QueryType.EQUALITY,
    contention_factor=8,
)
doc = coll.find_one({"encryptedIndexed": find_payload})
print("\nReturned document:\n")
pprint.pprint(doc)
# end-find

client_encryption.close()
encrypted_client.close()
client.close()
