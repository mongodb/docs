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

import org.bson.BsonArray;
import org.bson.BsonBinary;
import org.bson.BsonDocument;
import org.bson.BsonString;
import org.bson.types.Binary;
import org.bson.BsonBinarySubType;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import org.bson.Document;

// :state-start: local-reader local-test
import java.io.FileInputStream;
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


        String encryptedDbName = "medicalRecords";
        String encryptedCollName = "patients";
        String encryptedNameSpace = encryptedDbName + "." + encryptedCollName;

        // start-key-vault
        String keyVaultDb = "encryption";
        String keyVaultColl = "__keyVault";
        String keyVaultNamespace = keyVaultDb + "." + keyVaultColl;
        // end-key-vault

        // :state-start: aws-test azure-test local-test gcp-test
        String connectionString = System.getenv("MONGODB_URI");
        // :state-end:
        // :state-start: local-reader aws-reader azure-reader gcp-reader
        // :uncomment-start:
        //String connectionString = "<Your MongoDB URI>";
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
        kmsProviders.put(kmsProvider, keyMap);
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
        MongoClient regularClient = MongoClients.create(connectionString);

        MongoCollection<Document> keyVaultClient = regularClient.getDatabase(keyVaultDb).getCollection(keyVaultColl);

        BsonBinary dataKeyId1 = new BsonBinary(BsonBinarySubType.UUID_STANDARD, keyVaultClient.find(eq("keyAltNames", "dataKey1")).first().get("_id", Binary.class).getData());
        BsonBinary dataKeyId2 = new BsonBinary(BsonBinarySubType.UUID_STANDARD, keyVaultClient.find(eq("keyAltNames", "dataKey2")).first().get("_id", Binary.class).getData());
        BsonBinary dataKeyId3 = new BsonBinary(BsonBinarySubType.UUID_STANDARD, keyVaultClient.find(eq("keyAltNames", "dataKey3")).first().get("_id", Binary.class).getData());
        BsonBinary dataKeyId4 = new BsonBinary(BsonBinarySubType.UUID_STANDARD, keyVaultClient.find(eq("keyAltNames", "dataKey4")).first().get("_id", Binary.class).getData());

        BsonDocument encFields = new BsonDocument().append("fields",
                new BsonArray(Arrays.asList(
                        new BsonDocument().append("keyId", dataKeyId1)
                                .append("path", new BsonString("patientId"))
                                .append("bsonType", new BsonString("int"))
                                .append("queries", new BsonDocument().append("queryType", new BsonString("equality"))),
                        new BsonDocument().append("keyId", dataKeyId2)
                                .append("path", new BsonString("medications"))
                                .append("bsonType", new BsonString("array")),
                        new BsonDocument().append("keyId", dataKeyId3)
                                .append("path", new BsonString("patientRecord.ssn"))
                                .append("bsonType", new BsonString("string"))
                                .append("queries", new BsonDocument().append("queryType", new BsonString("equality"))),
                        new BsonDocument().append("keyId", dataKeyId4)
                                .append("path", new BsonString("patientRecord.billing"))
                                .append("bsonType", new BsonString("object")))));
        Map<String, BsonDocument> encryptedFieldsMap = new HashMap<String, BsonDocument>();
        encryptedFieldsMap.put(encryptedNameSpace, encFields);

        // end-schema

        // start-extra-options
        Map<String, Object> extraOptions = new HashMap<String, Object>();
        // :state-start: aws-reader azure-reader local-reader gcp-reader
        // :uncomment-start:
        //extraOptions.put("cryptSharedLibPath", "<path to crypt_shared>");
        // :uncomment-end:
        // :state-end:
        // :state-start: aws-test azure-test local-test gcp-test
        extraOptions.put("cryptSharedLibPath", System.getenv("SHARED_LIB_PATH"));
        // :state-end:
        // end-extra-options

        // start-client
        MongoClientSettings clientSettings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(connectionString))
                .autoEncryptionSettings(AutoEncryptionSettings.builder()
                        .keyVaultNamespace(keyVaultNamespace)
                        .kmsProviders(kmsProviders)
                        .encryptedFieldsMap(encryptedFieldsMap)
                        .extraOptions(extraOptions)
                        .build())
                .build();
        MongoClient mongoClientSecure = MongoClients.create(clientSettings);
        // end-client


        // start-insert
        ArrayList<String> medications = new ArrayList<>();
        medications.add("Atorvastatin");
        medications.add("Levothyroxine");

        Document patientRecord = new Document()
                .append("ssn", "987-65-4320")
                .append("billing", new Document().append("type", "Visa").append("number", "4111111111111111"));

        Document patient = new Document()
                .append("firstName", "Jon")
                .append("lastName", "Doe")
                .append("patientId", 12345678)
                .append("address", "AB+")
                .append("medications", medications)
                .append("patientRecord", patientRecord);
        mongoClientSecure.getDatabase(encryptedDbName).getCollection(encryptedCollName).insertOne(patient);
        // end-insert

        // start-find
        System.out.println("Finding a document with regular (non-encrypted) client.");
        Document docRegular = regularClient.getDatabase(encryptedDbName).getCollection(encryptedCollName).find(eq("firstName", "Jon")).first();
        System.out.println(docRegular.toJson());
        System.out.println("Finding a document with encrypted client, searching on an encrypted field");
        Document docSecure = mongoClientSecure.getDatabase(encryptedDbName).getCollection(encryptedCollName).find(eq("firstName", "Jon")).first();
        System.out.println(docSecure.toJson());
        // end-find 

        mongoClientSecure.close();
        regularClient.close();

    }
}
