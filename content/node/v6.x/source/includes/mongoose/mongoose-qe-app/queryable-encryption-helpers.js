import 'dotenv/config';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { randomBytes } from 'crypto';

export async function dropExistingDatabase(client, databaseName) {
  const database = client.db(databaseName);
  await database.dropDatabase();
}

// start-kms-credentials
export function getKMSProviderCredentials(kmsProviderName) {
  let kmsProviders;
  switch (kmsProviderName) {
    case 'aws':
      kmsProviders = {
        aws: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID, // Your AWS access key ID
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY, // Your AWS secret access key
        },
      };
      return kmsProviders;
    case 'azure':
      kmsProviders = {
        azure: {
          tenantId: process.env.AZURE_TENANT_ID, // Your Azure tenant ID
          clientId: process.env.AZURE_CLIENT_ID, // Your Azure client ID
          clientSecret: process.env.AZURE_CLIENT_SECRET, // Your Azure client secret
        },
      };
      return kmsProviders;
    case 'gcp':
      kmsProviders = {
        gcp: {
          email: process.env.GCP_EMAIL, // Your GCP email
          privateKey: process.env.GCP_PRIVATE_KEY, // Your GCP private key
        },
      };
      return kmsProviders;
    case 'kmip':
      kmsProviders = {
        kmip: {
          endpoint: process.env.KMIP_KMS_ENDPOINT, // Your KMIP KMS endpoint
        },
      };
      return kmsProviders;
    case 'local':
      (function () {
        if (!existsSync('./customer-master-key.txt')) {
          try {
            writeFileSync('customer-master-key.txt', randomBytes(96));
          } catch (err) {
            throw new Error(
              `Unable to write Customer Master Key to file due to the following error: ${err}`
            );
          }
        }
      })();
      try {
        // WARNING: Do not use a local key file in a production application
        const localMasterKey = readFileSync('./customer-master-key.txt');

        if (localMasterKey.length !== 96) {
          throw new Error(
            'Expected the customer master key file to be 96 bytes.'
          );
        }

        kmsProviders = {
          local: {
            key: localMasterKey,
          },
        };
      } catch (err) {
        throw new Error(
          `Unable to read the Customer Master Key due to the following error: ${err}`
        );
      }
      return kmsProviders;

    default:
      throw new Error(
        `Unrecognized value for KMS provider name \'${kmsProviderName}\' encountered while retrieving KMS credentials.`
      );
  }
}
// end-kms-credentials

// start-cmk-credentials
export function getCustomerMasterKeyCredentials(kmsProviderName) {
  let customerMasterKeyCredentials;
  switch (kmsProviderName) {
    case 'aws':
      customerMasterKeyCredentials = {
        key: process.env.AWS_KEY_ARN, // Your AWS Key ARN
        region: process.env.AWS_KEY_REGION, // Your AWS Key Region
      };
      return customerMasterKeyCredentials;
    case 'azure':
      customerMasterKeyCredentials = {
        keyVaultEndpoint: process.env.AZURE_KEY_VAULT_ENDPOINT, // Your Azure Key Vault Endpoint
        keyName: process.env.AZURE_KEY_NAME, // Your Azure Key Name
      };
      return customerMasterKeyCredentials;
    case 'gcp':
      customerMasterKeyCredentials = {
        projectId: process.env.GCP_PROJECT_ID, // Your GCP Project ID
        location: process.env.GCP_LOCATION, // Your GCP Key Location
        keyRing: process.env.GCP_KEY_RING, //  Your GCP Key Ring
        keyName: process.env.GCP_KEY_NAME, // Your GCP Key Name
      };
      return customerMasterKeyCredentials;
    case 'kmip':
    case 'local':
      customerMasterKeyCredentials = {};
      return customerMasterKeyCredentials;
    default:
      throw new Error(
        `Unrecognized value for KMS provider name \'${kmsProviderName}\' encountered while retrieving Customer Master Key credentials.`
      );
  }
}
// end-cmk-credentials

// start-auto-encryption-options
export async function getAutoEncryptionOptions(
  kmsProviderName,
  keyVaultNamespace,
  kmsProviders
) {
  if (kmsProviderName === 'kmip') {
    const tlsOptions = {
      kmip: {
        tlsCAFile: process.env.KMIP_TLS_CA_FILE, // Path to your TLS CA file
        tlsCertificateKeyFile: process.env.KMIP_TLS_CERT_FILE, // Path to your TLS certificate key file
      },
    };
    const extraOptions = {
      cryptSharedLibPath: process.env.SHARED_LIB_PATH, // Path to your Automatic Encryption Shared Library
    };

    const autoEncryptionOptions = {
      keyVaultNamespace,
      kmsProviders,
      extraOptions,
      tlsOptions,
    };
    return autoEncryptionOptions;
  } else {
    const extraOptions = {
      cryptSharedLibPath: process.env.SHARED_LIB_PATH, // Path to your Automatic Encryption Shared Library
    };

    const autoEncryptionOptions = {
      keyVaultNamespace,
      kmsProviders,
      extraOptions,
    };
    return autoEncryptionOptions;
  }
}
// end-auto-encryption-options