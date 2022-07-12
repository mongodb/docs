package com.mongodb.csfle;
/*
 * Copyright 2008-present MongoDB, Inc.

 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

import java.util.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Base64;

import org.bson.BsonBinary;
import org.bson.BsonDocument;
import org.bson.BsonString;
import org.bson.BsonBoolean;
import org.bson.BsonInt32;

import com.mongodb.ClientEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.model.vault.DataKeyOptions;
import com.mongodb.client.vault.ClientEncryption;
import com.mongodb.client.vault.ClientEncryptions;
import com.mongodb.client.model.IndexOptions;

// :state-start: local-reader local-test
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.SecureRandom;
// :state-end:

/*
 * - Reads master key from file "master-key.txt" in root directory of project, or creates one on a KMS
 * - Locates existing local encryption key from encryption.__keyVault collection, or from a KMS
 * - Prints base 64-encoded value of the data encryption key
 */
public class makeDataKey {

    public static void main(String[] args) throws Exception {
        // :state-start: local-reader local-test
        byte[] localMasterKeyWrite = new byte[96];
        new SecureRandom().nextBytes(localMasterKeyWrite);
        try (FileOutputStream stream = new FileOutputStream("master-key.txt")) {
            stream.write(localMasterKeyWrite);
        }
        // :state-end:

        // start-kmsproviders
        // :state-start: local-reader local-test
        String kmsProvider = "local";
        String path = "master-key.txt";

        byte[] localMasterKeyRead = new byte[96];

        try (FileInputStream fis = new FileInputStream(path)) {
            if (fis.read(localMasterKeyRead) < 96)
                throw new Exception("Expected to read 96 bytes from file");
        }
        Map<String, Object> keyMap = new HashMap<String, Object>();
        keyMap.put("key", localMasterKeyRead);

        Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
        kmsProviders.put("local", keyMap);
        // :state-end:
        // :state-uncomment-start: aws-reader
        //Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
        //String kmsProvider = "aws";
        //Map<String, Object> providerDetails = new HashMap<>();
        //providerDetails.put("accessKeyId", new BsonString("<IAM User Access Key ID>"));
        //providerDetails.put("secretAccessKey", new BsonString("<IAM User Secret Access Key>"));
        //kmsProviders.put(kmsProvider, providerDetails);
        // :state-uncomment-end:
        // :state-uncomment-start: aws-test
        //Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
        //String kmsProvider = "aws";
        //Map<String, Object> providerDetails = new HashMap<>();
        //providerDetails.put("accessKeyId", System.getenv("AWS_ACCESS_KEY_ID"));
        //providerDetails.put("secretAccessKey", System.getenv("AWS_SECRET_ACCESS_KEY"));
        //kmsProviders.put(kmsProvider, providerDetails);
        // :state-uncomment-end:
        // :state-uncomment-start: azure-reader
        //String kmsProvider = "azure";
        //Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
        //Map<String, Object> providerDetails = new HashMap<>();
        //providerDetails.put("tenantId", "<Azure account organization>");
        //providerDetails.put("clientId", "<Azure client ID>");
        //providerDetails.put("clientSecret", "<Azure client secret>");
        //kmsProviders.put(kmsProvider, providerDetails);
        // :state-uncomment-end:
        // :state-uncomment-start: azure-test
        //String kmsProvider = "azure";
        //Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
        //Map<String, Object> providerDetails = new HashMap<>();
        //providerDetails.put("tenantId", System.getenv("AZURE_TENANT_ID"));
        //providerDetails.put("clientId", System.getenv("AZURE_CLIENT_ID"));
        //providerDetails.put("clientSecret", System.getenv("AZURE_CLIENT_SECRET"));
        //kmsProviders.put(kmsProvider, providerDetails);
        // :state-uncomment-end:
        // :state-uncomment-start: gcp-reader
        //String kmsProvider = "gcp";
        //Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
        //Map<String, Object> providerDetails = new HashMap<>();
        //providerDetails.put("email", "<Your GCP Email Address>");
        //providerDetails.put("privateKey", "<Your GCP Private Key>");
        //kmsProviders.put(kmsProvider, providerDetails);
        // :state-uncomment-end:
        // :state-uncomment-start: gcp-test
        //String kmsProvider = "gcp";
        //Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
        //Map<String, Object> providerDetails = new HashMap<>();
        //providerDetails.put("email", System.getenv("GCP_EMAIL"));
        //providerDetails.put("privateKey", System.getenv("GCP_PRIVATE_KEY"));
        //kmsProviders.put(kmsProvider, providerDetails);
        // :state-uncomment-end:
        // end-kmsproviders

        // start-datakeyopts
        // :state-start: local-reader local-test
        // :state-end:
        // :state-uncomment-start: aws-reader
        //masterKeyProperties.put("provider", new BsonString(kmsProvider));
        //masterKeyProperties.put("key", new BsonString("<Master Key ARN>"));
        //masterKeyProperties.put("region", new BsonString("<Master Key AWS Region>"));
        // :state-uncomment-end:
        // :state-uncomment-start: aws-test
        //BsonDocument masterKeyProperties = new BsonDocument();
        //masterKeyProperties.put("provider", new BsonString(kmsProvider));
        //masterKeyProperties.put("key", new BsonString(System.getenv("AWS_KEY_ARN")));
        //masterKeyProperties.put("region", new BsonString(System.getenv("AWS_KEY_REGION")));        
        // :state-uncomment-end:
        // :state-uncomment-start: azure-reader
        //BsonDocument masterKeyProperties = new BsonDocument();
        //masterKeyProperties.put("provider", new BsonString(kmsProvider));
        //masterKeyProperties.put("keyName", new BsonString("<Azure key name>"));
        //masterKeyProperties.put("keyVaultEndpoint", new BsonString("<Azure key vault endpoint"));
        // :state-uncomment-end:
        // :state-uncomment-start: azure-test
        //BsonDocument masterKeyProperties = new BsonDocument();
        //masterKeyProperties.put("provider", new BsonString(kmsProvider));
        //masterKeyProperties.put("keyName", new BsonString(System.getenv("AZURE_KEY_NAME")));
        //masterKeyProperties.put("keyVaultEndpoint", new BsonString(System.getenv("AZURE_KEY_VAULT_ENDPOINT")));        
        // :state-uncomment-end:
        // :state-uncomment-start: gcp-reader
        //BsonDocument masterKeyProperties = new BsonDocument();
        //masterKeyProperties.put("provider", new BsonString(kmsProvider));
        //masterKeyProperties.put("projectId", new BsonString("<Your GCP Project ID>"));
        //masterKeyProperties.put("location", new BsonString("<Your GCP Key Location>"));
        //masterKeyProperties.put("keyRing", new BsonString("<Your GCP Key Ring>"));
        //masterKeyProperties.put("keyName", new BsonString("<Your GCP Key Name>"));
        // :state-uncomment-end:
        // :state-uncomment-start: gcp-test
        //BsonDocument masterKeyProperties = new BsonDocument();
        //masterKeyProperties.put("provider", new BsonString(kmsProvider));
        //masterKeyProperties.put("projectId", new BsonString(System.getenv("GCP_PROJECT_ID")));
        //masterKeyProperties.put("location", new BsonString(System.getenv("GCP_LOCATION")));
        //masterKeyProperties.put("keyRing", new BsonString(System.getenv("GCP_KEY_RING")));
        //masterKeyProperties.put("keyName", new BsonString(System.getenv("GCP_KEY_NAME")));        
        // :state-uncomment-end:
        // end-datakeyopts

        // start-create-index
        // :state-start: aws-test azure-test local-test gcp-test
        String connectionString = System.getenv("MONGODB_URI");
        // :state-end:
        // :state-start: local-reader aws-reader azure-reader gcp-reader
        // :uncomment-start:
        //String connectionString = "<Your MongoDB URI>";
        // :uncomment-end:
        // :state-end:
        String keyVaultDb = "encryption";
        String keyVaultColl = "__keyVault";
        String keyVaultNamespace = keyVaultDb + "." + keyVaultColl;
        MongoClient keyVaultClient = MongoClients.create(connectionString);

        // Drop the Key Vault Collection in case you created this collection
        // in a previous run of this application.
        keyVaultClient.getDatabase(keyVaultDb).getCollection(keyVaultColl).drop();
        // Drop the database storing your encrypted fields as all
        // the DEKs encrypting those fields were deleted in the preceding line.
        keyVaultClient.getDatabase("medicalRecords").getCollection("patients").drop();


        MongoCollection keyVaultCollection = keyVaultClient.getDatabase(keyVaultDb).getCollection(keyVaultColl);
        IndexOptions indexOpts = new IndexOptions().partialFilterExpression(new BsonDocument("keyAltNames", new BsonDocument("$exists", new BsonBoolean(true) ))).unique(true);
        keyVaultCollection.createIndex(new BsonDocument("keyAltNames", new BsonInt32(1)), indexOpts);
        keyVaultClient.close();
        // end-create-index 

        // start-create-dek
        ClientEncryptionSettings clientEncryptionSettings = ClientEncryptionSettings.builder()
                .keyVaultMongoClientSettings(MongoClientSettings.builder()
                        .applyConnectionString(new ConnectionString(connectionString))
                        .build())
                .keyVaultNamespace(keyVaultNamespace)
                .kmsProviders(kmsProviders)
                .build();
        
        MongoClient regularClient = MongoClients.create(connectionString);

        ClientEncryption clientEncryption = ClientEncryptions.create(clientEncryptionSettings);
        // :state-uncomment-start: local-reader
        //BsonBinary dataKeyId = clientEncryption.createDataKey(kmsProvider, new DataKeyOptions());
        // :state-uncomment-end:
        // :state-start: local-test
        List keyAltNames = new ArrayList<String>();
        keyAltNames.add("demo-data-key");
        BsonBinary dataKeyId = clientEncryption.createDataKey(kmsProvider, new DataKeyOptions().keyAltNames(keyAltNames));
        // :state-end:
        // :state-start: aws-reader azure-reader gcp-reader
        // :uncomment-start:
        //BsonBinary dataKeyId = clientEncryption.createDataKey(kmsProvider, new DataKeyOptions().masterKey(masterKeyProperties));
        // :uncomment-end:
        // :state-end:
        // :state-start: aws-test azure-test gcp-test
        // :uncomment-start:
        //List keyAltNames = new ArrayList<String>();
        //keyAltNames.add("demo-data-key");
        //BsonBinary dataKeyId = clientEncryption.createDataKey(kmsProvider, new DataKeyOptions().masterKey(masterKeyProperties).keyAltNames(keyAltNames));
        // :uncomment-end:
        // :state-end:
        String base64DataKeyId = Base64.getEncoder().encodeToString(dataKeyId.getData());
        System.out.println("DataKeyId [base64]: " + base64DataKeyId);
        clientEncryption.close();
        // end-create-dek
    }
}
