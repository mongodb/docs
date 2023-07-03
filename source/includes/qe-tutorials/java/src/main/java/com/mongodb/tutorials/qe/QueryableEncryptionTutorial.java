package com.mongodb.tutorials.qe;

import com.mongodb.AutoEncryptionSettings;
import com.mongodb.ClientEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.*;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.CreateEncryptedCollectionParams;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.vault.ClientEncryption;
import com.mongodb.client.vault.ClientEncryptions;
import com.mongodb.tutorials.qe.util.QueryableEncryptionHelpers;
import org.bson.*;

import java.util.Arrays;
import java.util.Map;

public class QueryableEncryptionTutorial {
    public static void main(String[] args) throws Exception {

        // start-setup-application-variables
        // KMS provider name should be one of the following: "aws", "gcp", "azure", "kmip" or "local"
        String kmsProviderName = "<KMS provider name>";

        String uri = QueryableEncryptionHelpers.getEnv("MONGODB_URI"); // Your connection URI

        String keyVaultDatabaseName = "encryption";
        String keyVaultCollectionName = "__keyVault";
        String keyVaultNamespace = keyVaultDatabaseName + "." + keyVaultCollectionName;
        String encryptedDatabaseName = "medicalRecords";
        String encryptedCollectionName = "patients";
        // end-setup-application-variables

        Map<String, Map<String, Object>> kmsProviderCredentials = QueryableEncryptionHelpers.getKmsProviderCredentials(kmsProviderName);
        BsonDocument customerMasterKeyCredentials = QueryableEncryptionHelpers.getCustomerMasterKeyCredentials(kmsProviderName);

        AutoEncryptionSettings autoEncryptionSettings = QueryableEncryptionHelpers.getAutoEncryptionOptions(keyVaultNamespace, kmsProviderCredentials);
        // start-create-client
        MongoClientSettings clientSettings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .autoEncryptionSettings(autoEncryptionSettings)
                .build();

        try (MongoClient encryptedClient = MongoClients.create(clientSettings)) {
            // ...
            // end-create-client
            encryptedClient.getDatabase(keyVaultDatabaseName).getCollection(keyVaultCollectionName).drop();
            encryptedClient.getDatabase(encryptedDatabaseName).getCollection(encryptedCollectionName).drop();

            // start-encrypted-fields-map
            BsonDocument encryptedFieldsMap = new BsonDocument().append("fields",
                    new BsonArray(Arrays.asList(
                            new BsonDocument()
                                    .append("keyId", new BsonNull())
                                    .append("path", new BsonString("patientRecord.ssn"))
                                    .append("bsonType", new BsonString("string"))
                                    .append("queries", new BsonDocument()
                                            .append("queryType", new BsonString("equality"))),
                            new BsonDocument()
                                    .append("keyId", new BsonNull())
                                    .append("path", new BsonString("patientRecord.billing"))
                                    .append("bsonType", new BsonString("object")))));
            // end-encrypted-fields-map
         
            // start-client-encryption
            ClientEncryptionSettings clientEncryptionSettings = ClientEncryptionSettings.builder()
                    .keyVaultMongoClientSettings(MongoClientSettings.builder()
                            .applyConnectionString(new ConnectionString(uri))
                            .build())
                    .keyVaultNamespace(keyVaultNamespace)
                    .kmsProviders(kmsProviderCredentials)
                    .build();
            ClientEncryption clientEncryption = ClientEncryptions.create(clientEncryptionSettings);
            // end-client-encryption

            // start-create-encrypted-collection
            CreateCollectionOptions createCollectionOptions = new CreateCollectionOptions().encryptedFields(encryptedFieldsMap);

            CreateEncryptedCollectionParams encryptedCollectionParams = new CreateEncryptedCollectionParams(kmsProviderName);
            encryptedCollectionParams.masterKey(customerMasterKeyCredentials);

            clientEncryption.createEncryptedCollection(
                    encryptedClient.getDatabase(encryptedDatabaseName),
                    encryptedCollectionName,
                    createCollectionOptions,
                    encryptedCollectionParams);
            // end-create-encrypted-collection

            // start-insert-document
            MongoDatabase encryptedClientDb = encryptedClient.getDatabase(encryptedDatabaseName);
            MongoCollection<BsonDocument> coll = encryptedClientDb.getCollection(encryptedCollectionName, BsonDocument.class);

            BsonDocument patientDocument = new BsonDocument()
                    .append("patientName", new BsonString("Jon Doe"))
                    .append("patientId", new BsonInt32(12345678))
                    .append("patientRecord", new BsonDocument()
                            .append("ssn", new BsonString("987-65-4320"))
                            .append("billing", new BsonDocument()
                                    .append("type", new BsonString("Visa"))
                                    .append("number", new BsonString("4111111111111111"))));


            InsertOneResult result = coll.insertOne(patientDocument);
            // end-insert-document
            
            if (result.wasAcknowledged()) {
                System.out.println("Successfully inserted the patient document.");
            }

            // start-find-document
            BsonDocument findResult = coll.find(new BsonDocument()
                    .append("patientRecord.ssn", new BsonString("987-65-4320"))
            ).first();

            System.out.println(findResult);
            // end-find-document
        }
    }
}
