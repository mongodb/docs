from pymongo import MongoClient
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.encryption import ClientEncryption
import base64
import os
from bson.codec_options import CodecOptions
from bson.binary import STANDARD, UUID

# start-key-vault
key_vault_namespace = "encryption.__keyVault"
# end-key-vault

connection_string = "<your connection string here>"

# start-kmsproviders
provider = "aws"
kms_providers = {
    "aws": {
        "accessKeyId": "<IAM User Access Key ID>",
        "secretAccessKey": "<IAM User Secret Access Key>",
    }
}
# end-kmsproviders

# start-schema
dek_id = b"<paste-base-64-encoded-data-encryption-key-id>"
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

patient_schema = {"medicalRecords.patients": json_schema}
# end-schema

# start-extra-options
extra_options = {"mongocryptd_spawn_path": "/usr/local/bin/mongocryptd"}
# end-extra-options

# start-client
fle_opts = AutoEncryptionOpts(
    kms_providers, key_vault_namespace, schema_map=patient_schema, **extra_options
)
client = MongoClient(connection_string, auto_encryption_opts=fle_opts)
# end-client

# start-insert
def insert_patient(
    collection, name, ssn, blood_type, medical_records, policy_number, provider
):
    insurance = {"policyNumber": policy_number, "provider": provider}
    doc = {
        "name": name,
        "ssn": ssn,
        "bloodType": blood_type,
        "medicalRecords": medical_records,
        "insurance": insurance,
    }
    collection.insert_one(doc)


medical_record = [{"weight": 180, "bloodPressure": "120/80"}]
insert_patient(
    client.medicalRecords.patients,
    "Jon Doe",
    241014209,
    "AB+",
    medical_record,
    123142,
    "MaestCare",
)
# end-insert
