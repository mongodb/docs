package com.mongodb.tutorials.qe;

import com.mongodb.AutoEncryptionSettings;
import com.mongodb.ClientEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.CreateEncryptedCollectionParams;
import com.mongodb.client.result.InsertOneResult;
import com.mongodb.client.vault.ClientEncryption;
import com.mongodb.client.vault.ClientEncryptions;
import com.mongodb.queryableencryption.models.Patient;
import com.mongodb.queryableencryption.models.PatientBilling;
import com.mongodb.queryableencryption.models.PatientRecord;
import com.mongodb.tutorials.qe.util.QueryableEncryptionHelpers;
import org.bson.BsonArray;
import org.bson.BsonDocument;
import org.bson.BsonNull;
import org.bson.BsonString;
import org.bson.codecs.configuration.CodecProvider;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

import java.util.Arrays;
import java.util.Map;

import static com.mongodb.MongoClientSettings.getDefaultCodecRegistry;
import static org.bson.codecs.configuration.CodecRegistries.fromProviders;
import static org.bson.codecs.configuration.CodecRegistries.fromRegistries;

public class QueryableEncryptionTutorial {
    public static void main(String[] args) throws Exception {
        // start-setup-application-variables
        String kmsProviderName = "<KMS provider name>";

        String uri = QueryableEncryptionHelpers.getEnv("MONGODB_URI"); // Your connection URI

        String keyVaultDatabaseName = "encryption";
        String keyVaultCollectionName = "__keyVault";
        String keyVaultNamespace = keyVaultDatabaseName + "." + keyVaultCollectionName;
        String encryptedDatabaseName = "medicalRecords";
        String encryptedCollectionName = "patients";
        // end-setup-application-variables

        // start-setup-application-pojo
        CodecProvider pojoCodecProvider = PojoCodecProvider.builder().automatic(true).build();
        CodecRegistry pojoCodecRegistry = fromRegistries(getDefaultCodecRegistry(), fromProviders(pojoCodecProvider));
        // end-setup-application-pojo

        Map<String, Map<String, Object>> kmsProviderCredentials = QueryableEncryptionHelpers.getKmsProviderCredentials(kmsProviderName);
        BsonDocument customerMasterKeyCredentials = QueryableEncryptionHelpers.getCustomerMasterKeyCredentials(kmsProviderName);

        AutoEncryptionSettings autoEncryptionSettings = QueryableEncryptionHelpers.getAutoEncryptionOptions(keyVaultNamespace, kmsProviderCredentials);
        // start-create-client
        MongoClientSettings clientSettings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .autoEncryptionSettings(autoEncryptionSettings)
                .build();

        try (MongoClient encryptedClient = MongoClients.create(clientSettings)) {
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

            try {
                clientEncryption.createEncryptedCollection(
                        encryptedClient.getDatabase(encryptedDatabaseName),
                        encryptedCollectionName,
                        createCollectionOptions,
                        encryptedCollectionParams);
            } 
            // end-create-encrypted-collection
            catch (Exception e) {
                throw new Exception("Unable to create encrypted collection due to the following error: " + e.getMessage());
            }

            // start-insert-document
            MongoDatabase encryptedDb = encryptedClient.getDatabase(encryptedDatabaseName).withCodecRegistry(pojoCodecRegistry);
            MongoCollection<Patient> collection = encryptedDb.getCollection(encryptedCollectionName, Patient.class);

            PatientBilling patientBilling = new PatientBilling("Visa", "4111111111111111");
            PatientRecord patientRecord = new PatientRecord("987-65-4320", patientBilling, 1500);
            Patient patientDocument = new Patient("Jon Doe", patientRecord);

            InsertOneResult result = collection.insertOne(patientDocument);
            // end-insert-document
            if (result.wasAcknowledged()) {
                System.out.println("Successfully inserted the patient document.");
            }

            // start-find-document
            Patient findResult = collection.find(
                new BsonDocument()
                        .append("patientRecord.ssn", new BsonString("987-65-4320")))
                        .first();
             
            System.out.println(findResult);
            // end-find-document
        }
    }
}
