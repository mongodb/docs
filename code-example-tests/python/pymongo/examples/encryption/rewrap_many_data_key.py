# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "\"<connection string URI>\"",
#     "{\"keyAltNames\": \"my-key\"}": "{\"<filter field>\": \"<filter value>\"}",
#     "provider=\"local\"": "provider=\"<KMS provider>\"",
#     "master_key={}": "master_key={\"<dataKeyOpts Key>\": \"<dataKeyOpts Value>\"}"
#   }
# }

from bson.binary import STANDARD
from bson.codec_options import CodecOptions
from pymongo import MongoClient
from pymongo.encryption import ClientEncryption


def rewrap_data_keys(CONNECTION_STRING, kms_providers, key_vault_namespace):
    try:
        # :snippet-start: rewrap-data-key
        key_vault_client = MongoClient(CONNECTION_STRING)

        client_encryption = ClientEncryption(
            kms_providers,
            key_vault_namespace,
            key_vault_client,
            CodecOptions(uuid_representation=STANDARD),
        )

        result = client_encryption.rewrap_many_data_key(
            filter={"keyAltNames": "my-key"},
            provider="local",
            master_key={},
        )
        # :snippet-end:

        return result

    finally:
        key_vault_client.close()


# :replace-end:
