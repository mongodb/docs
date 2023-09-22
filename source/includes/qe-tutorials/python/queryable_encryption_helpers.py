from pymongo import MongoClient, ASCENDING
from pymongo.encryption import (ClientEncryption, QueryType)
from pymongo.encryption_options import AutoEncryptionOpts
from bson.codec_options import CodecOptions
from bson.binary import STANDARD, UUID
import os

def get_kms_provider_credentials(kms_provider_string):
    if kms_provider_string == "aws":
        # start-aws-kms-credentials
        kms_provider_credentials = {
            "aws": {
                "accessKeyId": os.environ['AWS_ACCESS_KEY_ID'], # Your AWS access key ID
                "secretAccessKey": os.environ['AWS_SECRET_ACCESS_KEY'] # Your AWS secret access key
            }
        }
        # end-aws-kms-credentials
        return kms_provider_credentials
    elif kms_provider_string == "azure":
        # start-azure-kms-credentials
        kms_provider_credentials = {
            "azure": {
                "tenantId": os.environ['AZURE_TENANT_ID'], # Your Azure tenant ID
                "clientId": os.environ['AZURE_CLIENT_ID'], # Your Azure client ID
                "clientSecret": os.environ['AZURE_CLIENT_SECRET'] # Your Azure client secret
            }
        }
        # end-azure-kms-credentials
        return kms_provider_credentials
    elif kms_provider_string == "gcp":
        # start-gcp-kms-credentials
        kms_provider_credentials = {
            "gcp": {
                "email": os.environ['GCP_EMAIL'], # Your GCP email
                "privateKey": os.environ['GCP_PRIVATE_KEY'] # Your GCP private key
            }
        }
        # end-gcp-kms-credentials
        return kms_provider_credentials
    elif kms_provider_string == "kmip":
        # start-kmip-kms-credentials
        kms_provider_credentials = {
            "kmip": {
                "endpoint": os.environ['KMIP_KMS_ENDPOINT'] # Your KMIP KMS endpoint
            }
        }
        # end-kmip-kms-credentials

        return kms_provider_credentials
    elif kms_provider_string == "local":
        # Reuse the key from the customer-master-key.txt file if it exists
        if not os.path.exists("./customer-master-key.txt"):
            try:
                # start-generate-local-key
                path = "customer-master-key.txt"
                file_bytes = os.urandom(96)
                with open(path, "wb") as f:
                    f.write(file_bytes)
                # end-generate-local-key
            except Exception as e:
                raise Exception("Unable to write Customer Master Key to file due to the following error: ", e)

        try:
            # start-get-local-key
            path = "./customer-master-key.txt"
            with open(path, "rb") as f:
                local_master_key = f.read()
                kms_provider_credentials = {
                    "local": {
                        "key": local_master_key
                    },
                }
            # end-get-local-key
            return kms_provider_credentials
        except Exception as e:
            raise Exception("Unable to read Customer Master Key from file due to the following error: ", e)
    else:
        raise ValueError(
            "Unrecognized value for kms_provider_name encountered while retrieving KMS credentials.")


def get_customer_master_key_credentials(kms_provider_string):
    if kms_provider_string == "aws":
       # start-aws-cmk-credentials
       customer_master_key_credentials = {
           "key": os.environ['AWS_KEY_ARN'],  # Your AWS Key ARN
           "region": os.environ['AWS_KEY_REGION'] # Your AWS Key Region
       }
       # end-aws-cmk-credentials
       return customer_master_key_credentials
    elif kms_provider_string == "azure":
       # start-azure-cmk-credentials
       customer_master_key_credentials = {
           "keyName": os.environ['AZURE_KEY_NAME'], # Your Azure key name
           "keyVaultEndpoint": os.environ['AZURE_KEY_VAULT_ENDPOINT'] # Your Azure key vault endpoint
       }
       # end-azure-cmk-credentials
       return customer_master_key_credentials
    elif kms_provider_string == "gcp":
       # start-gcp-cmk-credentials
       customer_master_key_credentials = {
           "projectId": os.environ['GCP_PROJECT_ID'], # Your GCP email
           "location": os.environ['GCP_LOCATION'],  # Your GCP private key
           "keyRing": os.environ['GCP_KEY_RING'],  # Your GCP private key
           "keyName": os.environ['GCP_KEY_NAME']  # Your GCP private key
       }
       # end-gcp-cmk-credentials
       return customer_master_key_credentials
    elif kms_provider_string == "kmip" or kms_provider_string == "local":
       # start-kmip-local-cmk-credentials
       customer_master_key_credentials = {}
       # end-kmip-local-cmk-credentials
       return customer_master_key_credentials
    else:
       raise ValueError("Unrecognized value for kms_provider_name encountered while retrieving Customer Master Key credentials.")

def get_client_encryption(
        encrypted_client,
        kms_provider_name,
        kms_provider_credentials,
        key_vault_namespace
):

    if (kms_provider_name == "kmip"):
        # start-kmip-client-encryption
        client_encryption = ClientEncryption(
            kms_providers=kms_provider_credentials,
            key_vault_namespace=key_vault_namespace,
            key_vault_client=encrypted_client,
            codec_options=CodecOptions(uuid_representation=STANDARD),
            kms_tls_options=get_kmip_tls_options()
        )
        # end-kmip-client-encryption
        return client_encryption

    # start-client-encryption
    client_encryption = ClientEncryption(
        kms_providers=kms_provider_credentials,
        key_vault_namespace=key_vault_namespace,
        key_vault_client=encrypted_client,
        codec_options=CodecOptions(uuid_representation=STANDARD)
    )
    # end-client-encryption
    return client_encryption

def get_kmip_tls_options():
    # start-tls-options
    tls_options = {
        "kmip": {

            "tlsCAFile": os.environ['KMIP_TLS_CA_FILE'], # Path to your TLS CA file
            "tlsCertificateKeyFile": os.environ['KMIP_TLS_CERT_FILE'] # Path to your TLS certificate key file
        }
    }
    # end-tls-options
    return tls_options

def get_auto_encryption_options(
        kms_provider_name,
        key_vault_namespace,
        kms_provider_credentials,
):

    if kms_provider_name == "kmip":
        tls_options = get_kmip_tls_options()
        # start-kmip-encryption-options
        auto_encryption_opts = AutoEncryptionOpts(
            kms_provider_credentials,
            key_vault_namespace,
            crypt_shared_lib_path=os.environ['SHARED_LIB_PATH'], # Path to your Automatic Encryption Shared Library
            kms_tls_options=tls_options
        )
        # end-kmip-encryption-options
        return auto_encryption_opts

    # start-auto-encryption-options
    auto_encryption_options = AutoEncryptionOpts(
        kms_provider_credentials,
        key_vault_namespace,
        crypt_shared_lib_path=os.environ['SHARED_LIB_PATH'] # Path to your Automatic Encryption Shared Library>
    )
    # end-auto-encryption-options
    return auto_encryption_options

