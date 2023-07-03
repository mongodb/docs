package com.mongodb.tutorials.qe.util;

import java.io.File;
import java.io.FileOutputStream;
import java.security.SecureRandom;
import java.util.HashMap;
import java.util.Map;

import com.mongodb.AutoEncryptionSettings;
import com.mongodb.ClientEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.vault.ClientEncryption;
import com.mongodb.client.vault.ClientEncryptions;
import io.github.cdimascio.dotenv.Dotenv;
import org.bson.BsonDocument;
import org.bson.BsonString;

import java.io.FileInputStream;

public final class QueryableEncryptionHelpers {

    // This loads the variables defined in the .env file
    private static final Dotenv dotEnv = Dotenv.configure()
            .directory("./.env")
            .load();
    public static Map<String, Map<String, Object>> getKmsProviderCredentials(String kmsProviderName) throws Exception {

        switch (kmsProviderName) {
            case "local":
                // Reuse the key from the customer-master-key.txt file if it exists
                if (! new File("./customer-master-key.txt").isFile()) {
                    // start-generate-local-key
                    byte[] localMasterKeyWrite = new byte[96];
                    new SecureRandom().nextBytes(localMasterKeyWrite);
                    try (FileOutputStream stream = new FileOutputStream("customer-master-key.txt")) {
                        stream.write(localMasterKeyWrite);
                    }
                    // end-generate-local-key
                }

                // start-get-local-key
                byte[] localMasterKeyRead = new byte[96];

                try (FileInputStream fis = new FileInputStream("customer-master-key.txt")) {
                    if (fis.read(localMasterKeyRead) < 96)
                        throw new Exception("Expected to read 96 bytes from the customer master key file");
                }
                Map<String, Object> keyMap = new HashMap<String, Object>();
                keyMap.put("key", localMasterKeyRead);

                Map<String, Map<String, Object>> kmsProviderCredentials = new HashMap<String, Map<String, Object>>();
                kmsProviderCredentials.put("local", keyMap);
                // end-get-local-key

                return kmsProviderCredentials;
            case "aws":
                // start-aws-kms-credentials
                Map<String, Object> awsProviderDetails = new HashMap<>();
                awsProviderDetails.put("accessKeyId", getEnv("AWS_ACCESS_KEY_ID")); // Your AWS access key ID
                awsProviderDetails.put("secretAccessKey", getEnv("AWS_SECRET_ACCESS_KEY")); // Your AWS secret access key

                Map<String, Map<String, Object>> awsKmsCredentials = new HashMap<String, Map<String, Object>>();
                awsKmsCredentials.put("aws", awsProviderDetails);
                // end-aws-kms-credentials

                return awsKmsCredentials;
            case "azure":
                // start-azure-kms-credentials
                Map<String, Object> azureProviderDetails = new HashMap<>();
                azureProviderDetails.put("tenantId", getEnv("AZURE_TENANT_ID")); // Your Azure tenant ID
                azureProviderDetails.put("clientId", getEnv("AZURE_CLIENT_ID")); // Your Azure client ID
                azureProviderDetails.put("clientSecret", getEnv("AZURE_CLIENT_SECRET")); // Your Azure client secret

                Map<String, Map<String, Object>> azureKmsCredentials = new HashMap<String, Map<String, Object>>();
                azureKmsCredentials.put("azure", azureProviderDetails);
                // end-azure-kms-credentials

                return azureKmsCredentials;
            case "gcp":
                // start-gcp-kms-credentials
                Map<String, Object> gcpProviderDetails = new HashMap<>();
                gcpProviderDetails.put("email", getEnv("GCP_EMAIL")); // Your GCP email
                gcpProviderDetails.put("privateKey", getEnv("GCP_PRIVATE_KEY")); // Your GCP private key

                Map<String, Map<String, Object>> gcpKmsCredentials = new HashMap<String, Map<String, Object>>();
                gcpKmsCredentials.put("gcp", gcpProviderDetails);
                // end-gcp-kms-credentials

                return gcpKmsCredentials;
            case "kmip":
                // start-kmip-kms-credentials
                Map<String, Object> providerDetails = new HashMap<>();
                providerDetails.put("endpoint", getEnv("KMIP_KMS_ENDPOINT")); // Your KMIP KMS endpoint

                Map<String, Map<String, Object>> kmipKmsCredentials = new HashMap<String, Map<String, Object>>();
                kmipKmsCredentials.put("kmip", providerDetails);
                // end-kmip-kms-credentials
                return kmipKmsCredentials;
            default:
                throw new Exception("Unrecognized KMS provider");
        }
    }
    public static BsonDocument getCustomerMasterKeyCredentials(String kmsProviderName) throws Exception {
        switch(kmsProviderName) {
            case "local":
            case "kmip":
                // start-kmip-local-cmk-credentials
                BsonDocument customerMasterKeyCredentials = new BsonDocument();
                // end-kmip-local-cmk-credentials
                return customerMasterKeyCredentials;
            case "aws":
                // start-aws-cmk-credentials
                BsonDocument awsCustomerMasterKeyCredentials = new BsonDocument();
                awsCustomerMasterKeyCredentials.put("provider", new BsonString(kmsProviderName));
                awsCustomerMasterKeyCredentials.put("key", new BsonString(getEnv("AWS_KEY_ARN"))); // Your AWS Key ARN
                awsCustomerMasterKeyCredentials.put("region", new BsonString(getEnv("AWS_KEY_REGION"))); // Your AWS Key Region
                // end-aws-cmk-credentials
                return awsCustomerMasterKeyCredentials;
            case "azure":
                // start-azure-cmk-credentials
                BsonDocument azureCustomerMasterKeyCredentials = new BsonDocument();
                azureCustomerMasterKeyCredentials.put("provider", new BsonString(kmsProviderName));
                azureCustomerMasterKeyCredentials.put("keyName", new BsonString(getEnv("AZURE_KEY_NAME"))); // Your Azure Key Vault Endpoint
                azureCustomerMasterKeyCredentials.put("keyVaultEndpoint", new BsonString(getEnv("AZURE_KEY_VAULT_ENDPOINT"))); // Your Azure Key Name
                // end-azure-cmk-credentials
                return azureCustomerMasterKeyCredentials;
            case "gcp":
                // start-gcp-cmk-credentials
                BsonDocument gcpCustomerMasterKeyCredentials = new BsonDocument();
                gcpCustomerMasterKeyCredentials.put("provider", new BsonString(kmsProviderName));
                gcpCustomerMasterKeyCredentials.put("projectId", new BsonString(getEnv("GCP_PROJECT_ID"))); // Your GCP Project ID
                gcpCustomerMasterKeyCredentials.put("location", new BsonString(getEnv("GCP_LOCATION"))); // Your GCP Key Location
                gcpCustomerMasterKeyCredentials.put("keyRing", new BsonString(getEnv("GCP_KEY_RING"))); // Your GCP Key Ring
                gcpCustomerMasterKeyCredentials.put("keyName", new BsonString(getEnv("GCP_KEY_NAME"))); // Your GCP Key Name
                // end-gcp-cmk-credentials
                return gcpCustomerMasterKeyCredentials;
            default:
                throw new Exception("Unrecognized KMS provider");
        }
    }

    public static AutoEncryptionSettings getAutoEncryptionOptions(
            String keyVaultNamespace,
            Map<String, Map<String, Object>> kmsProviderCredentials
    ) {

        // start-auto-encryption-options
        Map<String, Object> extraOptions = new HashMap<String, Object>();
        extraOptions.put("cryptSharedLibPath", getEnv("SHARED_LIB_PATH")); // Path to your Automatic Encryption Shared Library

        AutoEncryptionSettings autoEncryptionSettings = AutoEncryptionSettings.builder()
                .keyVaultNamespace(keyVaultNamespace)
                .kmsProviders(kmsProviderCredentials)
                .extraOptions(extraOptions)
                .build();
        // end-auto-encryption-options
        return autoEncryptionSettings;

    }

    public static String getEnv(String name) {
        return dotEnv.get(name);
    }
}
