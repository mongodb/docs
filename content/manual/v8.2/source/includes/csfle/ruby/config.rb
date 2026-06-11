require 'mongo'
require 'base64'

CONNECTION_STRING = '<connection string>'
KEY_VAULT_DB = 'encryption'
KEY_VAULT_COLL = '__keyVault'
KEY_VAULT_NAMESPACE = "#{KEY_VAULT_DB}.#{KEY_VAULT_COLL}"
MASTER_KEY_PATH = 'master-key.txt'
DEK_ID_PATH = 'dek_id.txt'
CRYPT_SHARED_LIB_PATH = '<Automatic Encryption Shared Library path>'

def get_kms_providers
  local_master_key = File.binread(MASTER_KEY_PATH)
  { local: { key: local_master_key } }
end
