package com.mongodb.csfle;

import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

import static com.mongodb.client.model.Filters.eq;

import com.mongodb.AutoEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import org.bson.BsonDocument;
import org.bson.Document;

public class InsertEncryptedDocument {

    public static void main(String[] args) throws Exception {
        Map<String, Map<String, Object>> kmsProviders =
            Config.getKmsProviders();

        // start-json-schema
        String dekId = new String(
            Files.readAllBytes(Paths.get(Config.DEK_ID_PATH))).trim();
        Document jsonSchema = new Document()
            .append("bsonType", "object")
            .append("encryptMetadata", new Document()
                .append("keyId", new ArrayList<>(Arrays.asList(
                    new Document()
                        .append("$binary", new Document()
                            .append("base64", dekId)
                            .append("subType", "04"))))))
            .append("properties", new Document()
                .append("ssn", new Document()
                    .append("encrypt", new Document()
                        .append("bsonType", "int")
                        .append("algorithm",
                            "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic")))
                .append("bloodType", new Document()
                    .append("encrypt", new Document()
                        .append("bsonType", "string")
                        .append("algorithm",
                            "AEAD_AES_256_CBC_HMAC_SHA_512-Random")))
                .append("medicalRecords", new Document()
                    .append("encrypt", new Document()
                        .append("bsonType", "array")
                        .append("algorithm",
                            "AEAD_AES_256_CBC_HMAC_SHA_512-Random")))
                .append("insurance", new Document()
                    .append("bsonType", "object")
                    .append("properties", new Document()
                        .append("policyNumber", new Document()
                            .append("encrypt", new Document()
                                .append("bsonType", "int")
                                .append("algorithm",
                                    "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"))))));
        Map<String, BsonDocument> schemaMap = new HashMap<>();
        schemaMap.put("medicalRecords.patients",
            BsonDocument.parse(jsonSchema.toJson()));
        // end-json-schema

        // start-create-client
        Map<String, Object> extraOptions = new HashMap<>();
        extraOptions.put("cryptSharedLibPath", Config.CRYPT_SHARED_LIB_PATH);
        MongoClientSettings clientSettings = MongoClientSettings.builder()
            .applyConnectionString(
                new ConnectionString(Config.CONNECTION_STRING))
            .autoEncryptionSettings(AutoEncryptionSettings.builder()
                .keyVaultNamespace(Config.KEY_VAULT_NAMESPACE)
                .kmsProviders(kmsProviders)
                .schemaMap(schemaMap)
                .extraOptions(extraOptions)
                .build())
            .build();
        MongoClient mongoClientRegular = MongoClients.create(Config.CONNECTION_STRING);
        MongoClient mongoClientSecure = MongoClients.create(clientSettings);
        // end-create-client

        // start-insert-document
        ArrayList<Document> medicalRecords = new ArrayList<>();
        medicalRecords.add(new Document().append("weight", 180));
        medicalRecords.add(
            new Document().append("bloodPressure", "120/80"));
        Document insurance = new Document()
            .append("policyNumber", 123142)
            .append("provider", "MaestCare");
        Document patient = new Document()
            .append("name", "Jon Doe")
            .append("ssn", 241014209)
            .append("bloodType", "AB+")
            .append("medicalRecords", medicalRecords)
            .append("insurance", insurance);
        mongoClientSecure.getDatabase("medicalRecords")
            .getCollection("patients").insertOne(patient);
        // end-insert-document

        // start-find-document
        System.out.println(
            "Finding a document with the regular (non-encrypted) client:");
        Document docRegular = mongoClientRegular
            .getDatabase("medicalRecords").getCollection("patients")
            .find(eq("name", "Jon Doe")).first();
        System.out.println(docRegular.toJson());
        System.out.println(
            "Finding a document with the encrypted client:");
        Document docSecure = mongoClientSecure
            .getDatabase("medicalRecords").getCollection("patients")
            .find(eq("name", "Jon Doe")).first();
        System.out.println(docSecure.toJson());
        // end-find-document

        mongoClientSecure.close();
        mongoClientRegular.close();
    }
}
