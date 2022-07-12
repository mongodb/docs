from pymongo import MongoClient, ASCENDING
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.encryption import ClientEncryption
import base64
import os
from bson.codec_options import CodecOptions
from bson.binary import STANDARD, UUID

# :state-start: local-reader local-test
import os
path = "master-key.txt"
file_bytes = os.urandom(96)
with open(path, "wb") as f:
  f.write(file_bytes)
# :state-end:

# start-kmsproviders
# :state-start: local-reader local-test
path = "./master-key.txt"
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
# Drop the database storing your encrypted fields as all
# the DEKs encrypting those fields were deleted in the preceding line.
key_vault_client["medicalRecords"].drop_collection("patients")
key_vault_client[key_vault_db][key_vault_coll].create_index(
    [("keyAltNames", ASCENDING )],
    unique = True,
    partialFilterExpression = { "keyAltNames": { "$exists": True } })
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
# :state-start: local-reader
data_key_id = client_encryption.create_data_key("local")
# :state-end:
# :state-start: local-test
# :uncomment-start:
#data_key_id = client_encryption.create_data_key("local", key_alt_names=["demo-data-key"])
# :uncomment-end:
# :state-end:
# :state-start: aws-reader azure-reader gcp-reader
# :uncomment-start:
#data_key_id = client_encryption.create_data_key(provider, master_key)
# :uncomment-end:
# :state-end:
# :state-start: aws-test azure-test gcp-test
# :uncomment-start:
#data_key_id = client_encryption.create_data_key(provider, master_key, key_alt_names=["demo-data-key"])
# :uncomment-end:
# :state-end:

base_64_data_key_id = base64.b64encode(data_key_id)
print("DataKeyId [base64]: ", base_64_data_key_id)
# end-create-dek
