require 'mongo'
require 'base64'
require 'securerandom'
require_relative 'config'

# start-generate-cmk
File.binwrite(MASTER_KEY_PATH, SecureRandom.random_bytes(96))
# end-generate-cmk

def make_key
  # start-create-index
  key_vault_client = Mongo::Client.new(CONNECTION_STRING)
  key_vault_client.use(KEY_VAULT_DB).database.drop
  key_vault_client.use('medicalRecords').database.drop
  key_vault_client.use(KEY_VAULT_DB)[KEY_VAULT_COLL].indexes.create_one(
    { 'keyAltNames' => 1 },
    unique: true,
    partial_filter_expression: { 'keyAltNames' => { '$exists' => true } }
  )
  key_vault_client.close
  # end-create-index

  # start-create-data-key
  client = Mongo::Client.new(CONNECTION_STRING)
  client_encryption = Mongo::ClientEncryption.new(
    client,
    key_vault_namespace: KEY_VAULT_NAMESPACE,
    kms_providers: get_kms_providers
  )
  dek_id = client_encryption.create_data_key('local')
  base64_dek_id = Base64.strict_encode64(dek_id.data)
  puts "DataKeyId [base64]: #{base64_dek_id}"
  File.write(DEK_ID_PATH, base64_dek_id)
  client.close
  # end-create-data-key
end
