from pymongo import MongoClient
from pymongo.encryption_options import AutoEncryptionOpts
from pymongo.encryption import ClientEncryption
import base64
import os
from bson.codec_options import CodecOptions
from bson.binary import STANDARD, UUID
import pprint

# start-key-vault
key_vault_namespace = "encryption.__keyVault"
# end-key-vault

# :state-start: aws-test azure-test local-test gcp-test
connection_string = os.getenv("MONGODB_URI")
# :state-end:
# :state-start: local-reader aws-reader azure-reader gcp-reader
# :uncomment-start:
#connection_string = "<your connection string here>"
# :uncomment-end:
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
#    "aws": {
#        "accessKeyId": "<IAM User Access Key ID>",
#        "secretAccessKey": "<IAM User Secret Access Key>"
#    }
# }
# :state-uncomment-end:
# :state-uncomment-start: aws-test
# provider="aws"
# kms_providers = {
#    "aws": {
#        "accessKeyId": os.getenv("AWS_ACCESS_KEY_ID"),
#        "secretAccessKey": os.getenv("AWS_SECRET_ACCESS_KEY")
#    }
# }
# :state-uncomment-end:
# :state-uncomment-start: azure-reader
#provider = "azure"
#kms_providers = {
#    "azure": {
#        "tenantId": "<Azure account organization>",
#        "clientId": "<Azure client ID>",
#        "clientSecret": "<Azure client secret>",
#    }
#}
# :state-uncomment-end:
# :state-uncomment-start: azure-test
#provider = "azure"
#kms_providers = {
#    "azure": {
#        "tenantId": os.getenv("AZURE_TENANT_ID"),
#        "clientId": os.getenv("AZURE_CLIENT_ID"),
#        "clientSecret": os.getenv("AZURE_CLIENT_SECRET"),
#    }
#}
# :state-uncomment-end:
# :state-uncomment-start: gcp-reader
#provider = "gcp"
#kms_providers = {
#   "gcp": {
#      "email": "<your GCP email>",
#      "privateKey": "<your GCP private key>"
#   }
#}
# :state-uncomment-end:
# :state-uncomment-start: gcp-test
#provider = "gcp"
#kms_providers = {
#   "gcp": {
#      "email": os.getenv("GCP_EMAIL"),
#      "privateKey": os.getenv("GCP_PRIVATE_KEY")
#   }
#}
# :state-uncomment-end:
# end-kmsproviders

# start-schema
# :state-start: aws-reader azure-reader local-reader gcp-reader
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
# :state-end:
# :state-start: aws-test azure-test local-test gcp-test
# :uncomment-start:
## Make All fields random to use json pointer to reference key-id
#json_schema = {'bsonType': 'object', 'encryptMetadata': {'keyId': '/key-id'}, 'properties': {'insurance': {'bsonType': 'object', 'properties': {'policyNumber': {'encrypt': {'bsonType': 'int', 'algorithm': 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'}}}}, 'medicalRecords': {'encrypt': {'bsonType': 'array', 'algorithm': 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'}}, 'bloodType': {'encrypt': {'bsonType': 'string', 'algorithm': 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'}}, 'ssn': {'encrypt': {'bsonType': 'int', 'algorithm': 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'}}}}
# :uncomment-end:
# :state-end:

patient_schema = {
  "medicalRecords.patients": json_schema
}
# end-schema

# start-extra-options
# :state-start: aws-reader azure-reader local-reader gcp-reader
# :uncomment-start:
#extra_options = {
#   'mongocryptd_spawn_path': '/usr/local/bin/mongocryptd'
#}
# :uncomment-end:
# :state-end:
# :state-start: aws-test azure-test local-test gcp-test
extra_options = {
   'mongocryptd_spawn_path': os.getenv("MONGCRYPTD_PATH")
}
# :state-end:
# end-extra-options

# start-client
fle_opts = AutoEncryptionOpts(
   kms_providers,
   key_vault_namespace,
   schema_map=patient_schema,
   **extra_options
)
secureClient = MongoClient(connection_string, auto_encryption_opts=fle_opts)
# end-client

# start-insert
def insert_patient(collection, name, ssn, blood_type, medical_records, policy_number, provider):
  insurance = {
    'policyNumber': policy_number,
    'provider': provider
  }
  doc = {
      'name': name,
      'ssn': ssn,
      'bloodType': blood_type,
      'medicalRecords': medical_records,
      'insurance': insurance,
      # :state-start: aws-test azure-test local-test gcp-test
      # :uncomment-start:
      #'key-id': 'demo-data-key'
      # :uncomment-end:
      # :state-end:
  }
  collection.insert_one(doc)


medical_record = [{"weight": 180, "bloodPressure": "120/80"}]
insert_patient(secureClient.medicalRecords.patients,
               "Jon Doe",
               241014209,
               "AB+",
               medical_record,
               123142,
               "MaestCare")
# end-insert
regularClient = MongoClient(connection_string)
# start-find
print("Finding a document with regular (non-encrypted) client.")
result = regularClient.medicalRecords.patients.find_one({"name":"Jon Doe"})
pprint.pprint(result)
print("Finding a document with encrypted client, searching on an encrypted field")
# :state-start: local-reader aws-reader azure-reader gcp-reader
# :uncomment-start:
#pprint.pprint(secureClient.medicalRecords.patients.find_one({"ssn":241014209}))
# :uncomment-end:
# :state-end:
# :state-start: local-test aws-test azure-test gcp-test
pprint.pprint(secureClient.medicalRecords.patients.find_one({"name":"Jon Doe"}))
# :state-end:
# end-find
