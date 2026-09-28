package com.mongodb.csfle;

import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.security.SecureRandom;
import java.util.Base64;
import java.util.Map;

import org.bson.BsonBinary;
import org.bson.BsonBoolean;
import org.bson.BsonDocument;
import org.bson.BsonInt32;

import com.mongodb.ClientEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.vault.DataKeyOptions;
import com.mongodb.client.vault.ClientEncryption;
import com.mongodb.client.vault.ClientEncryptions;

public class MakeDataKey {

    public static void main(String[] args) throws Exception {
        // start-generate-cmk
        byte[] localMasterKey = new byte[96];
        new SecureRandom().nextBytes(localMasterKey);
        try (FileOutputStream fos =
                new FileOutputStream(Config.MASTER_KEY_PATH)) {
            fos.write(localMasterKey);
        }
        // end-generate-cmk

        // start-create-index
        try (MongoClient keyVaultClient =
                MongoClients.create(Config.CONNECTION_STRING)) {
            keyVaultClient.getDatabase(Config.KEY_VAULT_DB)
                .getCollection(Config.KEY_VAULT_COLL).drop();
            keyVaultClient.getDatabase("medicalRecords")
                .getCollection("patients").drop();
            IndexOptions indexOpts = new IndexOptions()
                .partialFilterExpression(new BsonDocument("keyAltNames",
                    new BsonDocument("$exists", new BsonBoolean(true))))
                .unique(true);
            keyVaultClient.getDatabase(Config.KEY_VAULT_DB)
                .getCollection(Config.KEY_VAULT_COLL)
                .createIndex(new BsonDocument("keyAltNames",
                    new BsonInt32(1)), indexOpts);
        }
        // end-create-index

        // start-create-data-key
        Map<String, Map<String, Object>> kmsProviders =
            Config.getKmsProviders();
        ClientEncryptionSettings encryptionSettings =
            ClientEncryptionSettings.builder()
                .keyVaultMongoClientSettings(MongoClientSettings.builder()
                    .applyConnectionString(
                        new ConnectionString(Config.CONNECTION_STRING))
                    .build())
                .keyVaultNamespace(Config.KEY_VAULT_NAMESPACE)
                .kmsProviders(kmsProviders)
                .build();
        try (ClientEncryption clientEncryption =
                ClientEncryptions.create(encryptionSettings)) {
            BsonBinary dataKeyId = clientEncryption.createDataKey(
                "local", new DataKeyOptions());
            String base64DataKeyId = Base64.getEncoder()
                .encodeToString(dataKeyId.getData());
            System.out.println("DataKeyId [base64]: " + base64DataKeyId);
            Files.write(Paths.get(Config.DEK_ID_PATH),
                base64DataKeyId.getBytes());
        }
        // end-create-data-key
    }
}
