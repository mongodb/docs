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

        if (kmsProviderName == "local") {
            // Reuse the key from the customer-master-key.txt file if it exists
            if (!new File("./customer-master-key.txt").isFile()) {
                // start-generate-local-key
                byte[] localCustomerMasterKey = new byte[96];
                new SecureRandom().nextBytes(localCustomerMasterKey);
                try (FileOutputStream stream = new FileOutputStream("customer-master-key.txt")) {
                    stream.write(localCustomerMasterKey);

                    // ...
                    // end-generate-local-key
                } catch (Exception e) {
                    throw new Exception("Unable to write Customer Master Key file due to the following error:" + e.getMessage());
                }
            }

            // start-get-local-key
            byte[] localCustomerMasterKey = new byte[96];

            try (FileInputStream fis = new FileInputStream("customer-master-key.txt")) {
                if (fis.read(localCustomerMasterKey) != 96)
                    throw new Exception("Expected the customer master key file to be 96 bytes.");
            } catch (Exception e) {
                throw new Exception("Unable to read the Customer Master Key due to the following error: " + e.getMessage());
            }
            Map<String, Object> keyMap = new HashMap<String, Object>();
            keyMap.put("key", localCustomerMasterKey);

            Map<String, Map<String, Object>> kmsProviderCredentials = new HashMap<String, Map<String, Object>>();
            kmsProviderCredentials.put("local", keyMap);
            // end-get-local-key

            return kmsProviderCredentials;
        } else if (kmsProviderName == "aws") {
            // start-aws-kms-credentials
            Map<String, Object> kmsProviderDetails = new HashMap<>();
            kmsProviderDetails.put("accessKeyId", getEnv("AWS_ACCESS_KEY_ID")); // Your AWS access key ID
            kmsProviderDetails.put("secretAccessKey", getEnv("AWS_SECRET_ACCESS_KEY")); // Your AWS secret access key

            Map<String, Map<String, Object>> kmsProviderCredentials = new HashMap<String, Map<String, Object>>();
            kmsProviderCredentials.put("aws", kmsProviderDetails);
            // end-aws-kms-credentials

            return kmsProviderCredentials;
        } else if (kmsProviderName == "azure") {
            // start-azure-kms-credentials
            Map<String, Object> kmsProviderDetails = new HashMap<>();
            kmsProviderDetails.put("tenantId", getEnv("AZURE_TENANT_ID")); // Your Azure tenant ID
            kmsProviderDetails.put("clientId", getEnv("AZURE_CLIENT_ID")); // Your Azure client ID
            kmsProviderDetails.put("clientSecret", getEnv("AZURE_CLIENT_SECRET")); // Your Azure client secret

            Map<String, Map<String, Object>> kmsProviderCredentials = new HashMap<String, Map<String, Object>>();
            kmsProviderCredentials.put("azure", kmsProviderDetails);
            // end-azure-kms-credentials

            return kmsProviderCredentials;
        } else if (kmsProviderName == "gcp") {
            // start-gcp-kms-credentials
            Map<String, Object> kmsProviderDetails = new HashMap<>();
            kmsProviderDetails.put("email", getEnv("GCP_EMAIL")); // Your GCP email
            kmsProviderDetails.put("privateKey", getEnv("GCP_PRIVATE_KEY")); // Your GCP private key

            Map<String, Map<String, Object>> kmsProviderCredentials = new HashMap<String, Map<String, Object>>();
            kmsProviderCredentials.put("gcp", kmsProviderDetails);
            // end-gcp-kms-credentials

            return kmsProviderCredentials;
        } else if (kmsProviderName == "kmip") {
            // start-kmip-kms-credentials
            Map<String, Object> kmsProviderDetails = new HashMap<>();
            kmsProviderDetails.put("endpoint", getEnv("KMIP_KMS_ENDPOINT")); // Your KMIP KMS endpoint

            Map<String, Map<String, Object>> kmsProviderCredentials = new HashMap<String, Map<String, Object>>();
            kmsProviderCredentials.put("kmip", kmsProviderDetails);
            // end-kmip-kms-credentials
            return kmsProviderCredentials;
        }
        throw new Exception("Unrecognized KMS provider name \"" + kmsProviderName + "\" encountered while retrieving KMS credentials.");
    }
    
    public static BsonDocument getCustomerMasterKeyCredentials(String kmsProviderName) throws Exception {
        if (kmsProviderName == "local" || kmsProviderName == "kmip") {
            // start-kmip-local-cmk-credentials
            BsonDocument customerMasterKeyCredentials = new BsonDocument();
            // end-kmip-local-cmk-credentials
            return customerMasterKeyCredentials;
        } else if (kmsProviderName == "aws") {
            // start-aws-cmk-credentials
            BsonDocument customerMasterKeyCredentials = new BsonDocument();
            customerMasterKeyCredentials.put("provider", new BsonString(kmsProviderName));
            customerMasterKeyCredentials.put("key", new BsonString(getEnv("AWS_KEY_ARN"))); // Your AWS Key ARN
            customerMasterKeyCredentials.put("region", new BsonString(getEnv("AWS_KEY_REGION"))); // Your AWS Key Region
            // end-aws-cmk-credentials
            return customerMasterKeyCredentials;
        } else if (kmsProviderName == "azure") {
            // start-azure-cmk-credentials
            BsonDocument customerMasterKeyCredentials = new BsonDocument();
            customerMasterKeyCredentials.put("provider", new BsonString(kmsProviderName));
            customerMasterKeyCredentials.put("keyName", new BsonString(getEnv("AZURE_KEY_NAME"))); // Your Azure Key Vault Endpoint
            customerMasterKeyCredentials.put("keyVaultEndpoint", new BsonString(getEnv("AZURE_KEY_VAULT_ENDPOINT"))); // Your Azure Key Name
            // end-azure-cmk-credentials
            return customerMasterKeyCredentials;
        } else if (kmsProviderName == "gcp") {
            // start-gcp-cmk-credentials
            BsonDocument customerMasterKeyCredentials = new BsonDocument();
            customerMasterKeyCredentials.put("provider", new BsonString(kmsProviderName));
            customerMasterKeyCredentials.put("projectId", new BsonString(getEnv("GCP_PROJECT_ID"))); // Your GCP Project ID
            customerMasterKeyCredentials.put("location", new BsonString(getEnv("GCP_LOCATION"))); // Your GCP Key Location
            customerMasterKeyCredentials.put("keyRing", new BsonString(getEnv("GCP_KEY_RING"))); // Your GCP Key Ring
            customerMasterKeyCredentials.put("keyName", new BsonString(getEnv("GCP_KEY_NAME"))); // Your GCP Key Name
            // end-gcp-cmk-credentials
            return customerMasterKeyCredentials;
        }
        throw new Exception("Unrecognized KMS provider name \"" + kmsProviderName + "\" encountered while retrieving Customer Master Key credentials.");
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
