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

/*
 * - Gets customer master key from the AWS KMS by using environment variables
 * - Locates existing data encryption key in AWS KMS
 * - Prints base 64-encoded value of the data encryption key
 */
public class MakeDataKey {

    public static void main(String[] args) throws Exception {

        // start-kmsproviders
        Map<String, Map<String, Object>> kmsProviderDetails = new HashMap<String, Map<String, Object>>();
        String kmsProvider = "aws";
        Map<String, Object> providerDetails = new HashMap<>();
        providerDetails.put("accessKeyId", new BsonString("<IAM User Access Key ID>"));
        providerDetails.put("secretAccessKey", new BsonString("<IAM User Secret Access Key>"));
        kmsProviderDetails.put(kmsProvider, providerDetails);
        // end-kmsproviders

        // start-datakeyopts
        masterKeyProperties.put("provider", new BsonString(kmsProvider));
        masterKeyProperties.put("key", new BsonString("<Master Key ARN>"));
        masterKeyProperties.put("region", new BsonString("<Master Key AWS Region>"));
        // end-datakeyopts

        // start-create-index
        String connectionString = "<Your MongoDB URI>";
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
                .kmsProviders(kmsProviderDetails)
                .build();
        
        MongoClient regularClient = MongoClients.create(connectionString);

        ClientEncryption clientEncryption = ClientEncryptions.create(clientEncryptionSettings);
        BsonBinary dataKeyId = clientEncryption.createDataKey(kmsProvider, new DataKeyOptions().masterKey(masterKeyProperties));
        String base64DataKeyId = Base64.getEncoder().encodeToString(dataKeyId.getData());
        System.out.println("DataKeyId [base64]: " + base64DataKeyId);
        clientEncryption.close();
        // end-create-dek
    }
}