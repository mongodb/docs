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

import static com.mongodb.client.model.Filters.eq;

import com.mongodb.AutoEncryptionSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import org.bson.BsonDocument;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import org.bson.Document;

// :state-start: local-reader local-test
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.security.SecureRandom;
// :state-end:


/*
 * - Reads master key from file "master-key.txt" in root directory of project
 * - Creates a JSON schema for a specified collection to enable automatic encryption
 * - Creates an encrypted client and upserts a single document
 * - Finds the upserted document with the encrypted client using an encrypted field
 * - Attempts to find the upserted document with the normal client using an encrypted field
 * - Finds the upserted document with the normal client using a non-encrypted field
 */
public class insertEncryptedDocument {

    public static void main(String[] args) throws Exception {
        String recordsDb = "medicalRecords";
        String recordsColl = "patients";
        
        // start-key-vault
        String keyVaultNamespace = "encryption.__keyVault";
        // end-key-vault

        // :state-start: aws-test azure-test local-test gcp-test
        String connectionString = System.getenv("MONGODB_URI");
        // :state-end:
        // :state-start: local-reader aws-reader azure-reader gcp-reader
        // :uncomment-start:
        //String connectionString = "mongodb://localhost:27017";
        // :uncomment-end:
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
        //providerDetails.put("accessKeyId", "<IAM User Access Key ID>");
        //providerDetails.put("secretAccessKey", "<IAM User Secret Access Key>");
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
        //Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
        //String kmsProvider = "azure";
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

        // start-schema
        // :state-start: aws-reader azure-reader local-reader gcp-reader
        // :uncomment-start:
        //String dekId = "<paste-base-64-encoded-data-encryption-key-id>>";
        //Document jsonSchema = new Document().append("bsonType", "object").append("encryptMetadata",
        //         new Document().append("keyId", new ArrayList<>((Arrays.asList(new Document().append("$binary", new Document()
        //                 .append("base64", dekId)
        //                 .append("subType", "04")))))))
        //         .append("properties", new Document()
        //                 .append("ssn", new Document().append("encrypt", new Document()
        //                         .append("bsonType", "int")
        //                         .append("algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic")))
        //                 .append("bloodType", new Document().append("encrypt", new Document()
        //                         .append("bsonType", "string")
        //                         .append("algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Random")))
        //                 .append("medicalRecords", new Document().append("encrypt", new Document()
        //                         .append("bsonType", "array")
        //                         .append("algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Random")))
        //                 .append("insurance", new Document()
        //                         .append("bsonType", "object")
        //                         .append("properties",
        //                                 new Document().append("policyNumber", new Document().append("encrypt", new Document()
        //                                         .append("bsonType", "int")
        //                                         .append("algorithm", "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"))))));
        // :uncomment-end:
        // :state-end:
        // :state-start: aws-test azure-test local-test gcp-test
        Document jsonSchema = new Document().append("bsonType", "object").append("encryptMetadata",
        new Document().append("keyId", "/key-id"))
        .append("properties", new Document()
                .append("ssn", new Document().append("encrypt", new Document()
                    .append("bsonType", "int")
                    .append("algorithm","AEAD_AES_256_CBC_HMAC_SHA_512-Random")))
                .append("bloodType", new Document().append("encrypt", new Document()
                    .append("bsonType", "string")
                    .append("algorithm","AEAD_AES_256_CBC_HMAC_SHA_512-Random")))
                .append("medicalRecords", new Document().append("encrypt", new Document()
                    .append("bsonType", "array")
                    .append("algorithm","AEAD_AES_256_CBC_HMAC_SHA_512-Random")))
                .append("insurance", new Document()
                        .append("bsonType", "object")
                        .append("properties",
                                new Document().append("policyNumber", new Document().append("encrypt", new Document()
                                .append("bsonType", "int")
                                .append("algorithm","AEAD_AES_256_CBC_HMAC_SHA_512-Random"))))));
        // :state-end:
        HashMap<String, BsonDocument> schemaMap = new HashMap<String, BsonDocument>();
        schemaMap.put("medicalRecords.patients", BsonDocument.parse(jsonSchema.toJson()));
        // end-schema

        // start-extra-options
        Map<String, Object> extraOptions = new HashMap<String, Object>();
        // :state-start: aws-reader azure-reader local-reader gcp-reader
        // :uncomment-start:
        //extraOptions.put("mongocryptdSpawnPath", "/usr/local/bin/mongocryptd");
        // :uncomment-end:
        // :state-end:
        // :state-start: aws-test azure-test local-test gcp-test
        extraOptions.put("mongocryptdSpawnPath", System.getenv("MONGCRYPTD_PATH"));
        // :state-end:
        // end-extra-options

        MongoClientSettings clientSettingsRegular = MongoClientSettings.builder()
            .applyConnectionString(new ConnectionString(connectionString))
            .build();

        MongoClient mongoClientRegular = MongoClients.create(clientSettingsRegular);

        // start-client
        MongoClientSettings clientSettings = MongoClientSettings.builder()
            .applyConnectionString(new ConnectionString(connectionString))
            .autoEncryptionSettings(AutoEncryptionSettings.builder()
                .keyVaultNamespace(keyVaultNamespace)
                .kmsProviders(kmsProviders)
                .schemaMap(schemaMap)
                .extraOptions(extraOptions)
                .build())
            .build();

        MongoClient mongoClientSecure = MongoClients.create(clientSettings);
        // end-client
        // start-insert
        ArrayList<Document> medicalRecords = new ArrayList<>();
        medicalRecords.add(new Document().append("weight", "180"));
        medicalRecords.add(new Document().append("bloodPressure", "120/80"));
        
        Document insurance = new Document()
        .append("policyNumber", 123142)
        .append("provider",  "MaestCare");

        Document patient = new Document()
            .append("name", "Jon Doe")
            .append("ssn", 241014209)
            .append("bloodType", "AB+")
            .append("medicalRecords", medicalRecords)
            // :state-start: local-reader aws-reader azure-reader gcp-reader
            // :uncomment-start:
            //.append("insurance", insurance);
            // :uncomment-end:
            // :state-end:
            // :state-start: local-test aws-test azure-test gcp-test
            .append("insurance", insurance)
            .append("key-id", "demo-data-key");
            // :state-end:
        mongoClientSecure.getDatabase(recordsDb).getCollection(recordsColl).insertOne(patient);
        // end-insert
        // start-find
        System.out.println("Finding a document with regular (non-encrypted) client.");
        Document docRegular = mongoClientRegular.getDatabase(recordsDb).getCollection(recordsColl).find(eq("name", "Jon Doe")).first();
        System.out.println(docRegular.toJson());
        System.out.println("Finding a document with encrypted client, searching on an encrypted field");
        // :state-start: local-reader aws-reader azure-reader gcp-reader
        // :uncomment-start:
        //Document docSecure = mongoClientSecure.getDatabase(recordsDb).getCollection(recordsColl).find(eq("ssn", 241014209)).first();
        // :uncomment-end:
        // :state-end:
        // :state-start: local-test aws-test azure-test gcp-test
        Document docSecure = mongoClientSecure.getDatabase(recordsDb).getCollection(recordsColl).find(eq("name", "Jon Doe")).first();
        // :state-end:
        System.out.println(docSecure.toJson());
        // end-find 
        mongoClientSecure.close();
        mongoClientRegular.close();    

    }
}
