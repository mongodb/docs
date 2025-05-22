package com.mongodb.qe;
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



/*
 * - Reads master key from file "master-key.txt" in root directory of project
 * - Creates a JSON schema for a specified collection to enable automatic encryption
 * - Creates an encrypted client and upserts a single document
 * - Finds the upserted document with the encrypted client using an encrypted field
 * - Attempts to find the upserted document with the normal client using an encrypted field
 * - Finds the upserted document with the normal client using a non-encrypted field
 */
public class InsertEncryptedDocument {

    public static void main(String[] args) throws Exception {

        String encryptedDbName = "medicalRecords";
        String encryptedCollName = "patients";
        String encryptedNameSpace = encryptedDbName + "." + encryptedCollName;

        // start-key-vault
        String keyVaultDb = "encryption";
        String keyVaultColl = "__keyVault";
        String keyVaultNamespace = keyVaultDb + "." + keyVaultColl;
        // end-key-vault

        String connectionString = "<Your MongoDB URI>";

        // start-kmsproviders
        String kmsProvider = "kmip";
        Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
        Map<String, Object> providerDetails = new HashMap<>();
        providerDetails.put("endpoint", "<endpoint for your KMIP-compliant key provider>");
        kmsProviders.put(kmsProvider, providerDetails);
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
        extraOptions.put("cryptSharedLibPath", "<path to crypt_shared>");
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
        Document docSecure = mongoClientSecure.getDatabase(encryptedDbName).getCollection(encryptedCollName).find(eq("patientRecord.ssn", "987-65-4320")).first();
        System.out.println(docSecure.toJson());
        // end-find 

        mongoClientSecure.close();
        regularClient.close();

    }
}
