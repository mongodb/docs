# start-encryption-schema
class Patient
  include Mongoid::Document
  include Mongoid::Timestamps

  encrypt_with key_id: '<data encryption key>'

  # This field is not encrypted
  field :category, type: String

  # This field is encrypted by using AEAD_AES_256_CBC_HMAC_SHA_512-Random
  # algorithm
  field :passport_id, type: String, encrypt: {
    deterministic: false
  }

  # This field is encrypted by using AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic
  # algorithm
  field :blood_type, type: String, encrypt: {
    deterministic: true
  }

  # This field is encrypted by using AEAD_AES_256_CBC_HMAC_SHA_512-Random
  # algorithm and a different data key
  field :ssn, type: Integer, encrypt: {
    deterministic: false, key_id: '<New key ID'
  }

  embeds_one :insurance
end

class Insurance
  include Mongoid::Document
  include Mongoid::Timestamps

  field :insurer, type: String

  # This field is encrypted using AEAD_AES_256_CBC_HMAC_SHA_512-Random
  # algorithm using a key with an alternate name stored in the policy_number_key field
  field :policy_number, type: Integer, encrypt: {
    deterministic: false,
    key_name_field: :policy_number_key
  }

  embedded_in :patient
end
# end-encryption-schema

# start-query-encrypted
Patient.create!(
  category: 'ER',
  passport_id: '123456',
  blood_type: 'AB+',
  ssn: 98765,
  insurance: Insurance.new(insurer: 'TK', policy_number: 123456, policy_number_key: 'my_data_key')
)

# Fields are encrypted in the database
unencrypted_client['patients'].find.first
# end-query-encrypted

# start-rewrap-keys
# Create a key vault client
key_vault_client = Mongo::Client.new('<connection string>')

# Create the encryption object
encryption = Mongo::ClientEncryption.new(
  key_vault_client,
  key_vault_namespace: 'encryption.__keyVault',
  kms_providers: {
    aws: {
      "accessKeyId": "<IAM User Access Key ID>",
      "secretAccessKey": "<IAM User Secret Access Key>"
    }
  }
)

encryption.rewrap_many_data_key(
  {}, # Empty filter to rewrap all keys
  {
    provider: 'aws',
    master_key: {
      region: 'us-east-2',
      key: 'arn:aws:kms:us-east-2:...'
    }
  }
)
# end-rewrap-keys

# start-in-place

# Print all documents in the collection. The first document is unencrypted, and
# the second is encrypted.
Patient.all.to_a
# =>
# [#<Patient _id: 644937ac46ebfd02468e58c8, category: "ER", passport_id: "DE-1257", blood_type: "AB+", ssn: 123456>,
# #<Patient _id: 644937c946ebfd029309b912, category: "ER", passport_id: "AT-1545", blood_type: "AB+", ssn: 987654>]

# Querying for documents with a CSFLE-enabled client returns only the encrypted document
Patient.where(blood_type: 'AB+').to_a
# => [#<Patient _id: 644937c946ebfd029309b912, category: "ER", passport_id: "AT-1545", blood_type: "AB+", ssn: 987654>]
# end-in-place