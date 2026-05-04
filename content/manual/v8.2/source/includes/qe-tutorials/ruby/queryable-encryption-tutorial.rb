# frozen_string_literal: true

require "dotenv/load"
require "mongo"
require_relative "queryable-encryption-helpers"

# start-setup-application-variables
kms_provider_name = ENV["KMS_PROVIDER"]

uri = ENV["MONGODB_URI"] # Your connection URI

key_vault_database_name = "encryption"
key_vault_collection_name = "__keyVault"
key_vault_namespace = "#{key_vault_database_name}.#{key_vault_collection_name}"
encrypted_database_name = "medicalRecords"
encrypted_collection_name = "patients"
# end-setup-application-variables

kms_provider_credentials = get_kms_provider_credentials(kms_provider_name)
customer_master_key_credentials = get_customer_master_key_credentials(kms_provider_name)

auto_encryption_options = get_auto_encryption_options(
  kms_provider_name,
  key_vault_namespace,
  kms_provider_credentials
)

# start-create-client
encrypted_client = Mongo::Client.new(uri, auto_encryption_options: auto_encryption_options)
# end-create-client

drop_existing_collection(encrypted_client, encrypted_database_name)
drop_existing_collection(encrypted_client, key_vault_database_name)

# start-encrypted-fields-map
encrypted_fields_map = {
  encrypted_fields: {
    fields: [
      {
        path: "patientRecord.ssn",
        bsonType: "string",
        queries: { queryType: "equality" },
        keyId: nil
      },
      {
        path: "patientRecord.billing",
        bsonType: "object",
        keyId: nil
      }
    ]
  }
}
# end-encrypted-fields-map

client_encryption = get_client_encryption(encrypted_client, auto_encryption_options)

create_encrypted_collection(
  client_encryption,
  encrypted_client,
  encrypted_database_name,
  encrypted_collection_name,
  kms_provider_name,
  encrypted_fields_map,
  customer_master_key_credentials
)

# start-insert-document
patient_document = {
  patientName: "Jon Doe",
  patientId: 12345678,
  patientRecord: {
    ssn: "987-65-4320",
    billing: {
      type: "Visa",
      number: "4111111111111111"
    },
    billAmount: 1500
  }
}

encrypted_collection = encrypted_client
  .use(encrypted_database_name)[encrypted_collection_name]

result = encrypted_collection.insert_one(patient_document)
# end-insert-document

if result.n == 1
  puts "Successfully inserted the patient document."
end

# start-find-document
find_result = encrypted_collection.find("patientRecord.ssn" => "987-65-4320").first
puts find_result.inspect
# end-find-document

encrypted_client.close
