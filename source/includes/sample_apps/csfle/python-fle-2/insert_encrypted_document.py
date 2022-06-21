from pymongo import MongoClient
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.encryption import ClientEncryption
import base64
import os
from bson.codec_options import CodecOptions
from bson.binary import STANDARD, UUID
import pprint

# start-key-vault
key_vault_db = "encryption"
key_vault_coll = "__keyVault"
key_vault_namespace = "encryption.__keyVault"
# end-key-vault

# start-kmsproviders
# :state-start: local-reader local-test
provider = "local"
path = "./master-key.txt"
# WARNING: Do not use a local key file in a production application
with open(path, "rb") as f:
    local_master_key = f.read()
kms_providers = {
    "local": {
        "key": local_master_key  # local_master_key variable from the previous step
    },
}
# :state-end:
# :state-uncomment-start: aws-reader
# provider="aws"
# kms_providers = {
#    provider: {
#        "accessKeyId": "<IAM User Access Key ID>",
#        "secretAccessKey": "<IAM User Secret Access Key>"
#    }
# }
# :state-uncomment-end:
# :state-uncomment-start: aws-test
# provider="aws"
# kms_providers = {
#    provider: {
#        "accessKeyId": os.getenv("AWS_ACCESS_KEY_ID"),
#        "secretAccessKey": os.getenv("AWS_SECRET_ACCESS_KEY"),
#    }
# }
# :state-uncomment-end:
# :state-uncomment-start: azure-reader
#provider = "azure"
#kms_providers = {
#    provider: {
#        "tenantId": "<Azure account organization>",
#        "clientId": "<Azure client ID>",
#        "clientSecret": "<Azure client secret>",
#    }
#}
# :state-uncomment-end:
# :state-uncomment-start: azure-test
#provider = "azure"
#kms_providers = {
#    provider: {
#        "tenantId": os.getenv("AZURE_TENANT_ID"),
#        "clientId": os.getenv("AZURE_CLIENT_ID"),
#        "clientSecret": os.getenv("AZURE_CLIENT_SECRET"),
#    }
#}
# :state-uncomment-end:
# :state-uncomment-start: gcp-reader
#provider = "gcp"
#kms_providers = {
#   provider: {
#      "email": "<your GCP email>",
#      "privateKey": "<your GCP private key>"
#   }
#}
# :state-uncomment-end:
# :state-uncomment-start: gcp-test
#provider = "azure"
#provider = "gcp"
#kms_providers = {
#   provider: {
#      "email": os.getenv("GCP_EMAIL"),
#      "privateKey": os.getenv("GCP_PRIVATE_KEY")
#   }
#}
# :state-uncomment-end:
# end-kmsproviders

# start-schema
# :state-start: aws-test azure-test local-test gcp-test
connection_string = os.getenv("MONGODB_URI")
# :state-end:
# :state-start: local-reader aws-reader azure-reader gcp-reader
# :uncomment-start:
#connection_string = "<your connection string here>"
# :uncomment-end:
# :state-end:

unencryptedClient = MongoClient(connection_string)
keyVaultClient = unencryptedClient[key_vault_db][key_vault_coll]
data_key_id_1 = keyVaultClient.find_one({"keyAltNames": "dataKey1"})["_id"]
data_key_id_2 = keyVaultClient.find_one({"keyAltNames": "dataKey2"})["_id"]
data_key_id_3 = keyVaultClient.find_one({"keyAltNames": "dataKey3"})["_id"]
data_key_id_4 = keyVaultClient.find_one({"keyAltNames": "dataKey4"})["_id"]

encrypted_db_name = "medicalRecords"
encrypted_coll_name = "patients"

encrypted_fields_map = {
    f"{encrypted_db_name}.{encrypted_coll_name}": {
        "fields": [
            {
                "keyId": data_key_id_1,
                "path": "patientId",
                "bsonType": "int",
                "queries": {"queryType": "equality"},
            },
            {
                "keyId": data_key_id_2,
                "path": "medications",
                "bsonType": "array",
            },
            {
                "keyId": data_key_id_3,
                "path": "patientRecord.ssn",
                "bsonType": "string",
                "queries": {"queryType": "equality"},
            },
            {
                "keyId": data_key_id_4,
                "path": "patientRecord.billing",
                "bsonType": "object",
            },
        ],
    },
}
# end-schema

# start-extra-options
auto_encryption = AutoEncryptionOpts(
    kms_providers,
    key_vault_namespace,
    encrypted_fields_map=encrypted_fields_map,
    schema_map=None,
    # :state-start: local-test aws-test azure-test gcp-test
    crypt_shared_lib_path= os.getenv("SHARED_LIB_PATH"),
    # :state-end:
    # :state-start: local-reader aws-reader azure-reader gcp-reader
    # :uncomment-start:
    #crypt_shared_lib_path= "<path to FLE Shared Library>",
    # :uncomment-end:
    # :state-end:
)
# end-extra-options

# start-client
secure_client = MongoClient(connection_string, auto_encryption_opts=auto_encryption)
# end-client

# start-insert
encrypted_coll = secure_client[encrypted_db_name][encrypted_coll_name]
encrypted_coll.insert_one(
    {
        "firstName": "Jon",
        "lastName": "Doe",
        "patientId": 12345678,
        "address": "157 Electric Ave.",
        "patientRecord": {
            "ssn": "987-65-4320",
            "billing": {
                "type": "Visa",
                "number": "4111111111111111",
            },
        },
        "medications": ["Atorvastatin", "Levothyroxine"],
    }
)
# end-insert

# start-find
print("Finding a document with regular (non-encrypted) client.")
pprint.pprint(unencryptedClient[encrypted_db_name][encrypted_coll_name].find_one({"firstName": "Jon"}))
print("Finding a document with encrypted client, searching on an encrypted field")
pprint.pprint(encrypted_coll.find_one({ "patientRecord.ssn": "987-65-4320" }))
# end-find
