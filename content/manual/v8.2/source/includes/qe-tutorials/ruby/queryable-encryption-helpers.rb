# frozen_string_literal: true

require "mongo"
require "securerandom"

def drop_existing_collection(client, database_name)
  client.use(database_name).database.drop
end

def get_kms_provider_credentials(kms_provider_name)
  case kms_provider_name
  when "aws"
    # start-aws-kms-credentials
    kms_providers = {
      aws: {
        accessKeyId: ENV["AWS_ACCESS_KEY_ID"], # Your AWS access key ID
        secretAccessKey: ENV["AWS_SECRET_ACCESS_KEY"] # Your AWS secret access key
      }
    }
    # end-aws-kms-credentials
  when "azure"
    # start-azure-kms-credentials
    kms_providers = {
      azure: {
        tenantId: ENV["AZURE_TENANT_ID"], # Your Azure tenant ID
        clientId: ENV["AZURE_CLIENT_ID"], # Your Azure client ID
        clientSecret: ENV["AZURE_CLIENT_SECRET"] # Your Azure client secret
      }
    }
    # end-azure-kms-credentials
  when "gcp"
    # start-gcp-kms-credentials
    kms_providers = {
      gcp: {
        email: ENV["GCP_EMAIL"], # Your GCP email
        privateKey: ENV["GCP_PRIVATE_KEY"] # Your GCP private key
      }
    }
    # end-gcp-kms-credentials
  when "kmip"
    # start-kmip-kms-credentials
    kms_providers = {
      kmip: {
        endpoint: ENV["KMIP_KMS_ENDPOINT"] # Your KMIP KMS endpoint
      }
    }
    # end-kmip-kms-credentials
  when "local"
    # start-generate-local-key
    unless File.exist?("./customer-master-key.txt")
      File.binwrite("./customer-master-key.txt", SecureRandom.random_bytes(96))
    end
    # end-generate-local-key

    # start-get-local-key
    # WARNING: Do not use a local key file in a production application
    local_master_key = File.binread("./customer-master-key.txt")

    raise "Expected the customer master key file to be 96 bytes." unless local_master_key.bytesize == 96

    kms_providers = {
      local: {
        key: local_master_key
      }
    }
    # end-get-local-key
  else
    raise ArgumentError, "Unrecognized value for KMS provider name \"#{kms_provider_name}\" encountered while retrieving KMS credentials."
  end

  kms_providers
end

def get_customer_master_key_credentials(kms_provider_name)
  case kms_provider_name
  when "aws"
    # start-aws-cmk-credentials
    customer_master_key_credentials = {
      key: ENV["AWS_KEY_ARN"], # Your AWS Key ARN
      region: ENV["AWS_KEY_REGION"] # Your AWS Key Region
    }
    # end-aws-cmk-credentials
  when "azure"
    # start-azure-cmk-credentials
    customer_master_key_credentials = {
      keyVaultEndpoint: ENV["AZURE_KEY_VAULT_ENDPOINT"], # Your Azure Key Vault Endpoint
      keyName: ENV["AZURE_KEY_NAME"] # Your Azure Key Name
    }
    # end-azure-cmk-credentials
  when "gcp"
    # start-gcp-cmk-credentials
    customer_master_key_credentials = {
      projectId: ENV["GCP_PROJECT_ID"], # Your GCP Project ID
      location: ENV["GCP_LOCATION"], # Your GCP Key Location
      keyRing: ENV["GCP_KEY_RING"], # Your GCP Key Ring
      keyName: ENV["GCP_KEY_NAME"] # Your GCP Key Name
    }
    # end-gcp-cmk-credentials
  when "kmip", "local"
    # start-kmip-local-cmk-credentials
    customer_master_key_credentials = {}
    # end-kmip-local-cmk-credentials
  else
    raise ArgumentError, "Unrecognized value for KMS provider name \"#{kms_provider_name}\" encountered while retrieving Customer Master Key credentials."
  end

  customer_master_key_credentials
end

def get_auto_encryption_options(kms_provider_name, key_vault_namespace, kms_providers)
  if kms_provider_name == "kmip"
    tls_options = get_kmip_tls_options

    # start-kmip-encryption-options
    auto_encryption_options = {
      key_vault_namespace: key_vault_namespace,
      kms_providers: kms_providers,
      extra_options: {
        crypt_shared_lib_path: ENV["SHARED_LIB_PATH"] # Path to your Automatic Encryption Shared Library
      },
      kms_tls_options: tls_options
    }
    # end-kmip-encryption-options
  else
    # start-auto-encryption-options
    auto_encryption_options = {
      key_vault_namespace: key_vault_namespace,
      kms_providers: kms_providers,
      extra_options: {
        crypt_shared_lib_path: ENV["SHARED_LIB_PATH"] # Path to your Automatic Encryption Shared Library
      }
    }
    # end-auto-encryption-options
  end

  auto_encryption_options
end

def get_kmip_tls_options
  # start-tls-options
  tls_options = {
    kmip: {
      ssl_ca_cert: ENV["KMIP_TLS_CA_FILE"], # Path to your TLS CA file
      ssl_client_cert_key: ENV["KMIP_TLS_CERT_FILE"] # Path to your TLS certificate key file
    }
  }
  # end-tls-options
  tls_options
end

def get_client_encryption(encrypted_client, auto_encryption_options)
  # start-client-encryption
  client_encryption = Mongo::ClientEncryption.new(
    encrypted_client,
    key_vault_namespace: auto_encryption_options[:key_vault_namespace],
    kms_providers: auto_encryption_options[:kms_providers]
  )
  # end-client-encryption
  client_encryption
end

def create_encrypted_collection(
  client_encryption,
  encrypted_client,
  encrypted_database_name,
  encrypted_collection_name,
  kms_provider_name,
  encrypted_fields_map,
  customer_master_key_credentials
)
  begin
    # start-create-encrypted-collection
    client_encryption.create_encrypted_collection(
      encrypted_client.use(encrypted_database_name).database,
      encrypted_collection_name,
      encrypted_fields_map,
      kms_provider_name,
      customer_master_key_credentials
    )
    # end-create-encrypted-collection
  rescue Mongo::Error => e
    raise "Unable to create encrypted collection due to the following error: #{e.class}: #{e.message}"
  end
end
