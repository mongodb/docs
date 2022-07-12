from pymongo import MongoClient, ASCENDING
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.encryption import ClientEncryption, MongoCryptOptions
import base64
import os
from bson.codec_options import CodecOptions
from bson.binary import STANDARD, UUID

import os
# :state-start: local-reader local-test
path = "master-key.txt"
file_bytes = os.urandom(96)
with open(path, "wb") as f:
  f.write(file_bytes)
# :state-end:

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

# start-datakeyopts
# :state-start: local-reader local-test
# :state-end:
# :state-uncomment-start: aws-reader
# master_key={ "region": "<Master Key AWS Region>", "key": "<Master Key ARN>" }
# :state-uncomment-end:
# :state-uncomment-start: aws-test
# master_key={ "region": os.getenv("AWS_KEY_REGION"), "key": os.getenv("AWS_KEY_ARN") }
# :state-uncomment-end:
# :state-uncomment-start: azure-reader
#master_key = {
#    "keyName": "<Azure key name>",
#    "keyVersion": "<Azure key version>",
#    "keyVaultEndpoint": "<Azure key vault endpoint/key identifier>",
#}
# :state-uncomment-end:
# :state-uncomment-start: azure-test
#master_key = {
#    "keyName": os.getenv("AZURE_KEY_NAME"),
#    "keyVaultEndpoint": os.getenv("AZURE_KEY_VAULT_ENDPOINT"),
#}
# :state-uncomment-end:
# :state-uncomment-start: gcp-reader
#master_key = {
#    "projectId": "<GCP project identifier>",
#    "location": "<GCP region>",
#    "keyRing": "<GCP key ring name>",
#    "keyName": "<GCP key name>",
#}
# :state-uncomment-end:
# :state-uncomment-start: gcp-test
#master_key = {
#    "projectId": os.getenv("GCP_PROJECT_ID"),
#    "location": os.getenv("GCP_LOCATION"),
#    "keyRing": os.getenv("GCP_KEY_RING"),
#    "keyName": os.getenv("GCP_KEY_NAME"),
#}
# :state-uncomment-end:
# end-datakeyopts


# start-create-index
# :state-start: aws-test azure-test local-test gcp-test
connection_string = os.getenv("MONGODB_URI")
# :state-end:
# :state-start: local-reader aws-reader azure-reader gcp-reader
# :uncomment-start:
#connection_string = "<your connection string here>"
# :uncomment-end:
# :state-end:

key_vault_coll = "__keyVault"
key_vault_db = "encryption"
key_vault_namespace = f"{key_vault_db}.{key_vault_coll}"
key_vault_client = MongoClient(connection_string);
# Drop the Key Vault Collection in case you created this collection
# in a previous run of this application.
key_vault_client.drop_database(key_vault_db);

key_vault_client[key_vault_db][key_vault_coll].create_index(
    [("keyAltNames", ASCENDING )],
    unique = True,
    partialFilterExpression = { "keyAltNames": { "$exists": True } })
# end-create-index

# start-create-dek
client = MongoClient(connection_string)
client_encryption = ClientEncryption(
    kms_providers,  # pass in the kms_providers variable from the previous step
    key_vault_namespace,
    client,
    CodecOptions(uuid_representation=STANDARD),
)

data_key_id_1 = client_encryption.create_data_key(provider,     
    # :state-start: aws-test aws-reader azure-test azure-reader gcp-test gcp-reader
    # :uncomment-start:
    #master_key= master_key,
    # :uncomment-end:
    # :state-end:
    key_alt_names=["dataKey1"])
data_key_id_2 = client_encryption.create_data_key(provider,
    # :state-start: aws-test aws-reader azure-test azure-reader gcp-test gcp-reader
    # :uncomment-start:
    #master_key= master_key,
    # :uncomment-end:
    # :state-end:
    key_alt_names=["dataKey2"])
data_key_id_3 = client_encryption.create_data_key(provider,
    # :state-start: aws-test aws-reader azure-test azure-reader gcp-test gcp-reader
    # :uncomment-start:
    #master_key= master_key,
    # :uncomment-end:
    # :state-end:
    key_alt_names=["dataKey3"])
data_key_id_4 = client_encryption.create_data_key(provider,
    # :state-start: aws-test aws-reader azure-test azure-reader gcp-test gcp-reader
    # :uncomment-start:
    #master_key= master_key,
    # :uncomment-end:
    # :state-end:
    key_alt_names=["dataKey4"])
# end-create-dek


# start-create-enc-collection
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

key_vault_namespace = "encryption.__keyVault"


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

secure_client = MongoClient(connection_string, auto_encryption_opts=auto_encryption)
# Drop the encrypted collection in case you created this collection
# in a previous run of this application.
secure_client.drop_database(encrypted_db_name)
encrypted_db = secure_client[encrypted_db_name]
encrypted_db.create_collection(encrypted_coll_name)
print("Created encrypted collection!")
# end-create-enc-collection
