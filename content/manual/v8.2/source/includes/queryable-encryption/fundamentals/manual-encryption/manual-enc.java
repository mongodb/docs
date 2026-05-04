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

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.model.vault.EncryptOptions;
import org.bson.*;

import static com.mongodb.client.model.Filters.eq;

import com.mongodb.ClientEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.model.vault.DataKeyOptions;
import com.mongodb.client.vault.ClientEncryption;
import com.mongodb.client.vault.ClientEncryptions;
import org.bson.types.Binary;

/*
 * - Reads master key from AWS KMS
 * - Locates existing data encryption key in AWS KMS
 * - Prints base 64-encoded value of the data encryption key
 */
public class makeDataKey {

    public static void main(String[] args) throws Exception {
        String db = "medicalRecords";
        String coll = "patients";
        String keyVaultNamespace = "encryption.__keyVault";
        String connectionString = System.getenv("MONGODB_URI");

        // start-specify-credentials
        Map<String, Map<String, Object>> kmsProviders = new HashMap<String, Map<String, Object>>();
        String kmsProvider = "aws";
        Map<String, Object> providerDetails = new HashMap<>();
        providerDetails.put("accessKeyId", System.getenv("AWS_ACCESS_KEY_ID"));
        providerDetails.put("secretAccessKey", System.getenv("AWS_SECRET_ACCESS_KEY"));
        kmsProviders.put(kmsProvider, providerDetails);

        BsonDocument masterKeyProperties = new BsonDocument();
        masterKeyProperties.put("provider", new BsonString(kmsProvider));
        masterKeyProperties.put("key", new BsonString(System.getenv("AWS_KEY_ARN")));
        masterKeyProperties.put("region", new BsonString(System.getenv("AWS_KEY_REGION")));
        // end-specify-credentials

        // start_mongoclient
        MongoClient client = MongoClients.create(connectionString);
        // end_mongoclient
        // start_client_enc
        MongoCollection<Document> collection = client.getDatabase(db).getCollection(coll);
        ClientEncryptionSettings clientEncryptionSettings = ClientEncryptionSettings.builder()
                        .keyVaultMongoClientSettings(MongoClientSettings.builder()
                                        .applyConnectionString(new ConnectionString(connectionString))
                                        .build())
                        .keyVaultNamespace(keyVaultNamespace)
                        .kmsProviders(kmsProviders)
                        .build();
        ClientEncryption clientEncryption = ClientEncryptions.create(clientEncryptionSettings);
        // end_client_enc
        List keyAltNames = new ArrayList<String>();
        keyAltNames.add("demo-data-key");
        BsonBinary dataKeyId = clientEncryption.createDataKey(kmsProvider,
                        new DataKeyOptions().masterKey(masterKeyProperties).keyAltNames(keyAltNames));

        // start_enc_and_insert
        BsonBinary encryptedName = clientEncryption.encrypt(new BsonString("Greg"),
                        new EncryptOptions("AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic").keyId(dataKeyId));
        BsonBinary encryptedFoods = clientEncryption.encrypt(new BsonArray().parse("[\"Grapes\", \"Foods\"]"),
                        new EncryptOptions("AEAD_AES_256_CBC_HMAC_SHA_512-Random").keyId(dataKeyId));
        collection.insertOne(
                        new Document("name", encryptedName).append("foods", encryptedFoods).append("age", 83));
        // end_enc_and_insert
        // start_find_decrypt
        BsonBinary encryptedNameQuery = clientEncryption.encrypt(new BsonString("Greg"),
                        new EncryptOptions("AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic").keyId(dataKeyId));
        Document result = collection.find(eq("name", encryptedNameQuery)).first();
        System.out.println("Encrypted Document: " + result.toJson());
        result.replace("name",
                        clientEncryption.decrypt(new BsonBinary(result.get("name", Binary.class).getData())));
        result.replace("foods",
                        clientEncryption.decrypt(new BsonBinary(result.get("foods", Binary.class).getData())));
        System.out.println("Decrypted Document: " + result.toJson());
        // end_find_decrypt
        client.close();
        clientEncryption.close();
    }
}