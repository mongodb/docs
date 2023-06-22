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
        // start-generate-local-key
        try {
          masterKeyPath = "master-key.txt";
          if (!fs.existsSync(masterKeyPath)) {
            fs.writeFileSync(masterKeyPath, crypto.randomBytes(96));
          }
        } catch (err) {
          console.error(err);
        }
        // end-generate-local-key
      })();
      // start-get-local-key
      // WARNING: Do not use a local key file in a production application
      const localMasterKey = fs.readFileSync("./master-key.txt");
      kmsProviderCredentials = {
        local: {
          key: localMasterKey,
        },
      };
      // end-get-local-key
      return kmsProviderCredentials;
    default:
      throw new Error("Invalid KMS provider name");
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
