from pymongo import MongoClient
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.encryption import ClientEncryption
import base64
import os
from bson.codec_options import CodecOptions
from bson.binary import STANDARD, UUID


# start-kmsproviders
provider = "azure"
kms_providers = {
    provider: {
        "tenantId": "<Azure account organization>",
        "clientId": "<Azure client ID>",
        "clientSecret": "<Azure client secret>",
    }
}
# end-kmsproviders

# start-datakeyopts
master_key = {
    "keyName": "<Azure key name>",
    "keyVersion": "<Azure key version>",
    "keyVaultEndpoint": "<Azure key vault endpoint/key identifier>",
}
# end-datakeyopts


# start-create-dek
connection_string = "<your connection string here>"
key_vault_namespace = "encryption.__keyVault"

client = MongoClient(connection_string)
client_encryption = ClientEncryption(
    kms_providers,  # pass in the kms_providers variable from the previous step
    key_vault_namespace,
    client,
    CodecOptions(uuid_representation=STANDARD),
)

data_key_id = client_encryption.create_data_key(provider, master_key)

base_64_data_key_id = base64.b64encode(data_key_id)
print("DataKeyId [base64]: ", base_64_data_key_id)
# end-create-dek
