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

import com.mongodb.AutoEncryptionSettings;
import com.mongodb.ClientEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.vault.EncryptOptions;
import com.mongodb.client.vault.ClientEncryption;
import com.mongodb.client.vault.ClientEncryptions;
import org.bson.*;
import org.bson.types.Binary;

import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

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

        // start-key-vault
        String db = "medicalRecords";
        String coll = "patients";
        String keyVaultDb = "encryption";
        String keyVaultColl = "__keyVault";
        String keyVaultNamespace = String.format("%1$s.%2$s", keyVaultDb, keyVaultColl);
        String connectionString = "<Your MongoDB URI>";
        // end-key-vault

        // start-kmsproviders
        String kmsProvider = "local";
        String path = "master-key.txt";
        byte[] localMasterKeyRead = new byte[96];
        try (FileInputStream fis = new FileInputStream(path)) {
            if (fis.read(localMasterKeyRead) < 96)
                throw new Exception("Expected to read 96 bytes from file");
        }
        Map<String, Object> keyMap = new HashMap<>();
        keyMap.put("key", localMasterKeyRead);
        Map<String, Map<String, Object>> kmsProviders = new HashMap<>();
        kmsProviders.put(kmsProvider, keyMap);
        // end-kmsproviders

        // start-retrieve-deks
        MongoClient client = MongoClients.create(connectionString);
        MongoCollection<Document> keyVaultClient = client.getDatabase(keyVaultDb).getCollection(keyVaultColl);
        BsonBinary dataKeyId1 = new BsonBinary(BsonBinarySubType.UUID_STANDARD, keyVaultClient.find(eq("keyAltNames", "dataKey1")).first().get("_id", Binary.class).getData());
        BsonBinary dataKeyId2 = new BsonBinary(BsonBinarySubType.UUID_STANDARD, keyVaultClient.find(eq("keyAltNames", "dataKey2")).first().get("_id", Binary.class).getData());
        // end-retrieve-deks

        // start-extra-options
        Map<String, Object> extraOptions = new HashMap<>();
        extraOptions.put("cryptSharedLibPath", "<path to crypt_shared library>");
        // end-extra-options

        // start-client
        MongoClientSettings clientSettings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(connectionString))
                .autoEncryptionSettings(AutoEncryptionSettings.builder()
                        .keyVaultNamespace(keyVaultNamespace)
                        .kmsProviders(kmsProviders)
                        .extraOptions(extraOptions)
                        .bypassQueryAnalysis(true)
                        .build())
                .build();
        MongoClient mongoClientSecure = MongoClients.create(clientSettings);
        // end-client

        // start-client-enc
        ClientEncryptionSettings clientEncryptionSettings = ClientEncryptionSettings.builder()
                .keyVaultMongoClientSettings(MongoClientSettings.builder()
                        .applyConnectionString(new ConnectionString(connectionString))
                        .build())
                .keyVaultNamespace(keyVaultNamespace)
                .kmsProviders(kmsProviders)
                .build();
        ClientEncryption clientEncryption = ClientEncryptions.create(clientEncryptionSettings);
        // end-client-enc

        // start-insert
        BsonInt32 patientId = new BsonInt32(12345678);
        ArrayList<BsonString> medications = new ArrayList<>();
        medications.add(new BsonString("Atorvastatin"));
        medications.add(new BsonString("Levothyroxine"));
        BsonBinary indexedEncrypted = clientEncryption.encrypt(patientId, new EncryptOptions("Indexed").keyId(dataKeyId1).contentionFactor(1L));
        BsonBinary unindexedEncrypted = clientEncryption.encrypt(new BsonArray(medications), new EncryptOptions("Unindexed").keyId(dataKeyId2));
        MongoCollection<BsonDocument> collection = mongoClientSecure.getDatabase(db).getCollection(coll, BsonDocument.class);
        collection.insertOne(new BsonDocument("firstName", new BsonString("Jon")).append("patientId", indexedEncrypted).append("medications", unindexedEncrypted));
        // end-insert

        // start-find
        BsonBinary findPayloadEncrypted = clientEncryption.encrypt(patientId, new EncryptOptions("Indexed").keyId(dataKeyId1).queryType("equality").contentionFactor(1L));
        BsonDocument result = collection.find(eq("patientId", findPayloadEncrypted)).first();
        System.out.println("Finding a document with manually encrypted field: " + result.toJson());
        // end-find
        client.close();
        clientEncryption.close();
    }
}
