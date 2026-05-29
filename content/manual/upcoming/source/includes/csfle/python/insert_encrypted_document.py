from pymongo import MongoClient
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.encryption import ClientEncryption
import base64
import os
from bson.codec_options import CodecOptions
from bson.binary import STANDARD, UUID, Binary, UUID_SUBTYPE
import pprint
import config


kms_providers = config.get_kms_providers()

# start-json-schema
with open(config.dek_id_path, "rb") as f:
    dek_id = f.read()

json_schema = {
    "bsonType": "object",
    "encryptMetadata": {"keyId": [Binary(base64.b64decode(dek_id), UUID_SUBTYPE)]},
    "properties": {
        "insurance": {
            "bsonType": "object",
            "properties": {
                "policyNumber": {
                    "encrypt": {
                        "bsonType": "int",
                        "algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
                    }
                }
            },
        },
        "medicalRecords": {
            "encrypt": {
                "bsonType": "array",
                "algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
            }
        },
        "bloodType": {
            "encrypt": {
                "bsonType": "string",
                "algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Random",
            }
        },
        "ssn": {
            "encrypt": {
                "bsonType": "int",
                "algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic",
            }
        },
    },
}

patient_schema = {"medicalRecords.patients": json_schema}
# end-json-schema

# start-create-client
extra_options = {
    "crypt_shared_lib_path": config.crypt_shared_lib_path
}

fle_opts = AutoEncryptionOpts(
    kms_providers, config.key_vault_namespace, schema_map=patient_schema, **extra_options
)
secureClient = MongoClient(config.connection_string, auto_encryption_opts=fle_opts)
# end-create-client

# start-insert-document
collection = secureClient.medicalRecords.patients
collection.insert_one({
    "name": "Jon Doe",
    "ssn": 241014209,
    "bloodType": "AB+",
    "medicalRecords": [{"weight": 180, "bloodPressure": "120/80"}],
    "insurance": {"policyNumber": 123142, "provider": "MaestCare"},
})
# end-insert-document

# start-find-document
print("Finding a document with the regular (non-encrypted) client:")
regularClient = MongoClient(config.connection_string)
result = regularClient.medicalRecords.patients.find_one({"name": "Jon Doe"})
pprint.pprint(result)

print("\nFinding a document with the encrypted client:")
pprint.pprint(secureClient.medicalRecords.patients.find_one({"name": "Jon Doe"}))
# end-find-document