const fs = require("fs");
const crypto = require("crypto");

async function dropExistingCollection(client, databaseName) {
  const database = client.getDB(databaseName);
  await database.dropDatabase();
}

function getKMSProviderCredentials(kmsProviderName) {
  let kmsProviderCredentials;
  switch (kmsProviderName) {
    case "aws":
      // start-aws-kms-credentials
      kmsProviderCredentials = {
        aws: {
          accessKeyId: process.env["AWS_ACCESS_KEY_ID"], // Your AWS access key ID
          secretAccessKey: process.env["AWS_SECRET_ACCESS_KEY"], // Your AWS secret access key
        },
      };
      // end-aws-kms-credentials
      return kmsProviderCredentials;
    case "azure":
      // start-azure-kms-credentials
      kmsProviderCredentials = {
        azure: {
          tenantId: process.env["AZURE_TENANT_ID"], // Your Azure tenant ID
          clientId: process.env["AZURE_CLIENT_ID"], // Your Azure client ID
          clientSecret: process.env["AZURE_CLIENT_SECRET"], // Your Azure client secret
        },
      };
      // end-azure-kms-credentials
      return kmsProviderCredentials;
    case "gcp":
      // start-gcp-kms-credentials
      kmsProviderCredentials = {
        gcp: {
          email: process.env["GCP_EMAIL"], // Your GCP email
          privateKey: process.env["GCP_PRIVATE_KEY"], // Your GCP private key
        },
      };
      // end-gcp-kms-credentials
      return kmsProviderCredentials;
    case "kmip":
      // start-kmip-kms-credentials
      kmsProviderCredentials = {
        kmip: {
          endpoint: process.env["KMIP_KMS_ENDPOINT"], // Your KMIP KMS endpoint
        },
      };
      // end-kmip-kms-credentials
      return kmsProviderCredentials;
    case "local":
      (function () {
        try {
          // start-generate-local-key
          customerMasterKeyPath = "customer-master-key.txt";
          if (!fs.existsSync(customerMasterKeyPath)) {
            fs.writeFileSync(customerMasterKeyPath, crypto.randomBytes(96));
          }
          // end-generate-local-key
        } catch (err) {
          throw new Error(
            `Unable to write Customer Master Key to file due to the following error: ${err}`
          );
        }
      })();
      try {
        // start-get-local-key
        // WARNING: Do not use a local key file in a production application
        const localMasterKey = fs.readFileSync("./customer-master-key.txt");

        if (localMasterKey.length !== 96) {
          throw new Error(
            "Expected the customer master key file to be 96 bytes."
          );
        }

        kmsProviderCredentials = {
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
      return kmsProviderCredentials;
    default:
      throw new Error(
        `Unrecognized value for KMS provider name \"${kmsProviderName}\" encountered while retrieving KMS credentials.`
      );
  }
}

function getCustomerMasterKeyCredentials(kmsProviderName) {
  let customerMasterKeyCredentials;
  switch (kmsProviderName) {
    case "aws":
      // start-aws-cmk-credentials
      customerMasterKeyCredentials = {
        key: process.env["AWS_KEY_ARN"], // Your AWS Key ARN
        region: process.env["AWS_KEY_REGION"], // Your AWS Key Region
      };
      // end-aws-cmk-credentials
      return customerMasterKeyCredentials;
    case "azure":
      // start-azure-cmk-credentials
      customerMasterKeyCredentials = {
        keyVaultEndpoint: process.env["AZURE_KEY_VAULT_ENDPOINT"], // Your Azure Key Vault Endpoint
        keyName: process.env["AZURE_KEY_NAME"], // Your Azure Key Name
      };
      // end-azure-cmk-credentials
      return customerMasterKeyCredentials;
    case "gcp":
      // start-gcp-cmk-credentials
      customerMasterKeyCredentials = {
        projectId: process.env["GCP_PROJECT_ID"], // Your GCP Project ID
        location: process.env["GCP_LOCATION"], // Your GCP Key Location
        keyRing: process.env["GCP_KEY_RING"], //  Your GCP Key Ring
        keyName: process.env["GCP_KEY_NAME"], // Your GCP Key Name
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

async function getAutoEncryptionOptions(
  kmsProviderName,
  keyVaultNamespace,
  kmsProviderCredentials
) {
  if (kmsProviderName === "kmip") {
    const tlsOptions = getKmipTlsOptions();
    // start-kmip-encryption-options
    const autoEncryptionOptions = {
      keyVaultNamespace: keyVaultNamespace,
      kmsProviders: kmsProviderCredentials,
      tlsOptions,
    };
    // end-kmip-encryption-options
    return autoEncryptionOptions;
  } else {
    // start-auto-encryption-options
    const autoEncryptionOptions = {
      keyVaultNamespace: keyVaultNamespace,
      kmsProviders: kmsProviderCredentials,
    };
    // end-auto-encryption-options

    return autoEncryptionOptions;
  }
}

function getKmipTlsOptions() {
  // start-tls-options
  const tlsOptions = {
    kmip: {
      tlsCAFile: process.env["KMIP_TLS_CA_FILE"], // Path to your TLS CA file
      tlsCertificateKeyFile: process.env["KMIP_TLS_CERT_FILE"], // Path to your TLS certificate key file
    },
  };
  // end-tls-options
  return tlsOptions;
}

module.exports = {
  dropExistingCollection,
  getKMSProviderCredentials,
  getAutoEncryptionOptions,
  getCustomerMasterKeyCredentials,
};
