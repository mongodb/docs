require 'mongo'
require 'base64'
require_relative 'config'

def insert
  # start-json-schema
  dek_id = BSON::Binary.new(
    Base64.strict_decode64(File.read(DEK_ID_PATH)),
    :uuid
  )
  patient_schema = {
    'medicalRecords.patients' => {
      bsonType: 'object',
      encryptMetadata: {
        keyId: [dek_id]
      },
      properties: {
        insurance: {
          bsonType: 'object',
          properties: {
            policyNumber: {
              encrypt: {
                bsonType: 'int',
                algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic'
              }
            }
          }
        },
        medicalRecords: {
          encrypt: {
            bsonType: 'array',
            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'
          }
        },
        bloodType: {
          encrypt: {
            bsonType: 'string',
            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Random'
          }
        },
        ssn: {
          encrypt: {
            bsonType: 'int',
            algorithm: 'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic'
          }
        }
      }
    }
  }
  # end-json-schema

  # start-create-client
  secure_client = Mongo::Client.new(
    CONNECTION_STRING,
    auto_encryption_options: {
      key_vault_namespace: KEY_VAULT_NAMESPACE,
      kms_providers: get_kms_providers,
      schema_map: patient_schema,
      extra_options: {
        crypt_shared_lib_path: CRYPT_SHARED_LIB_PATH
      }
    }
  )
  regular_client = Mongo::Client.new(CONNECTION_STRING)
  # end-create-client

  # start-insert-document
  collection = secure_client.use('medicalRecords')['patients']
  collection.insert_one(
    name: 'Jon Doe',
    ssn: 241014209,
    bloodType: 'AB+',
    medicalRecords: [{ weight: 180, bloodPressure: '120/80' }],
    insurance: {
      policyNumber: 123142,
      provider: 'MaestCare'
    }
  )
  # end-insert-document

  # start-find-document
  puts 'Finding a document with the regular (non-encrypted) client:'
  p regular_client.use('medicalRecords')['patients']
    .find(name: 'Jon Doe').first

  puts "\nFinding a document with the encrypted client:"
  p secure_client.use('medicalRecords')['patients']
    .find(name: 'Jon Doe').first

  regular_client.close
  secure_client.close
  # end-find-document
end
