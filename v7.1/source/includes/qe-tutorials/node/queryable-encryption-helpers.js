import "dotenv/config";
import { writeFileSync, readFileSync, existsSync } from "fs";
import { randomBytes } from "crypto";
import { ClientEncryption } from "mongodb";

export async function dropExistingCollection(client, databaseName) {
  const database = client.db(databaseName);
  await database.dropDatabase();
}

export function getKMSProviderCredentials(kmsProviderName) {
  let kmsProviders;
  switch (kmsProviderName) {
    case "aws":
      // start-aws-kms-credentials
      kmsProviders = {
        aws: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS access key ID
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS secret access key
        },
      };
      // end-aws-kms-credentials
      return kmsProviders;
    case "azure":
      // start-azure-kms-credentials
      kmsProviders = {
        azure: {
          tenantId: process.env.AZURE_TENANT_ID, // Your Azure tenant ID
          clientId: process.env.AZURE_CLIENT_ID, // Your Azure client ID
          clientSecret: process.env.AZURE_CLIENT_SECRET, // Your Azure client secret
        },
      };
      // end-azure-kms-credentials
      return kmsProviders;
    case "gcp":
      // start-gcp-kms-credentials
      kmsProviders = {
        gcp: {
          email: process.env.GCP_EMAIL, // Your GCP email
          privateKey: process.env.GCP_PRIVATE_KEY, // Your GCP private key
        },
      };
      // end-gcp-kms-credentials
      return kmsProviders;
    case "kmip":
      // start-kmip-kms-credentials
      kmsProviders = {
        kmip: {
          endpoint: process.env.KMIP_KMS_ENDPOINT, // Your KMIP KMS endpoint
        },
      };
      // end-kmip-kms-credentials
      return kmsProviders;
    case "local":
      (function () {
        // start-generate-local-key
        if (!existsSync("./customer-master-key.txt")) {
          try {
            writeFileSync("customer-master-key.txt", randomBytes(96));
          } catch (err) {
            throw new Error(
              `Unable to write Customer Master Key to file due to the following error: ${err}`
            );
          }
        }
        // end-generate-local-key
      })();
      try {
        // start-get-local-key
        // WARNING: Do not use a local key file in a production application
        const localMasterKey = readFileSync("./customer-master-key.txt");
        kmsProviders = {
          local: {
            key: localMasterKey,
          },
        };
        // end-get-local-key
      } catch (err) {
        throw new Error(
          `Unable to read the Customer Master Key due to the following error: ${err}`
        );
      }
      return kmsProviders;

    default:
      throw new Error(
        `Unrecognized value for KMS provider name \"${kmsProviderName}\" encountered while retrieving KMS credentials.`
      );
  }
}

export function getCustomerMasterKeyCredentials(kmsProviderName) {
  let customerMasterKeyCredentials;
  switch (kmsProviderName) {
    case "aws":
      // start-aws-cmk-credentials
      customerMasterKeyCredentials = {
        key: process.env.AWS_KEY_ARN, // Your AWS Key ARN
        region: process.env.AWS_KEY_REGION, // Your AWS Key Region
      };
      // end-aws-cmk-credentials
      return customerMasterKeyCredentials;
    case "azure":
      // start-azure-cmk-credentials
      customerMasterKeyCredentials = {
        keyVaultEndpoint: process.env.AZURE_KEY_VAULT_ENDPOINT, // Your Azure Key Vault Endpoint
        keyName: process.env.AZURE_KEY_NAME, // Your Azure Key Name
      };
      // end-azure-cmk-credentials
      return customerMasterKeyCredentials;
    case "gcp":
      // start-gcp-cmk-credentials
      customerMasterKeyCredentials = {
        projectId: process.env.GCP_PROJECT_ID, // Your GCP Project ID
        location: process.env.GCP_LOCATION, // Your GCP Key Location
        keyRing: process.env.GCP_KEY_RING, //  Your GCP Key Ring
        keyName: process.env.GCP_KEY_NAME, // Your GCP Key Name
      };
      // end-gcp-cmk-credentials
      return customerMasterKeyCredentials;
    case "kmip":
    case "local":
      // start-kmip-local-cmk-credentials
      customerMasterKeyCredentials = {};
      // end-kmip-local-cmk-credentials
      return customerMasterKeyCredentials;
    default:
      throw new Error(
        `Unrecognized value for KMS provider name \"${kmsProviderName}\" encountered while retrieving Customer Master Key credentials.`
      );
  }
}

export async function getAutoEncryptionOptions(
  kmsProviderName,
  keyVaultNamespace,
  kmsProviders
) {
  if (kmsProviderName === "kmip") {
    const tlsOptions = getKmipTlsOptions();

    // start-kmip-encryption-options
    const extraOptions = {
      cryptSharedLibPath: process.env.SHARED_LIB_PATH, // Path to your Automatic Encryption Shared Library
    };

    const autoEncryptionOptions = {
      keyVaultNamespace,
      kmsProviders,
      extraOptions,
      tlsOptions,
    };
    // end-kmip-encryption-options
    return autoEncryptionOptions;
  } else {
    // start-auto-encryption-options
    const extraOptions = {
      cryptSharedLibPath: process.env.SHARED_LIB_PATH, // Path to your Automatic Encryption Shared Library
    };

    const autoEncryptionOptions = {
      keyVaultNamespace,
      kmsProviders,
      extraOptions,
    };
    // end-auto-encryption-options

    return autoEncryptionOptions;
  }
}

function getKmipTlsOptions() {
  // start-tls-options
  const tlsOptions = {
    kmip: {
      tlsCAFile: process.env.KMIP_TLS_CA_FILE, // Path to your TLS CA file
      tlsCertificateKeyFile: process.env.KMIP_TLS_CERT_FILE, // Path to your TLS certificate key file
    },
  };
  // end-tls-options
  return tlsOptions;
}

export function getClientEncryption(encryptedClient, autoEncryptionOptions) {
  // start-client-encryption
  const clientEncryption = new ClientEncryption(encryptedClient, autoEncryptionOptions);
  // end-client-encryption
  return clientEncryption;
}

export async function createEncryptedCollection(
  clientEncryption,
  encryptedDatabase,
  encryptedCollectionName,
  kmsProviderName,
  encryptedFieldsMap,
  customerMasterKeyCredentials
) {
  try {
    // start-create-encrypted-collection
    await clientEncryption.createEncryptedCollection(
      encryptedDatabase,
      encryptedCollectionName,
      {
        provider: kmsProviderName,
        createCollectionOptions: encryptedFieldsMap,
        masterKey: customerMasterKeyCredentials,
      }
    );
    // end-create-encrypted-collection
  } catch (err) {
    throw new Error(
      `Unable to create encrypted collection due to the following error: ${err}`
    );
  }
}
