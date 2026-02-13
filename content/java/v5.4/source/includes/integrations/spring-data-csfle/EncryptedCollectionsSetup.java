package com.mongodb.quickstart.javaspringbootcsfle.components;

import com.mongodb.MongoNamespace;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.ValidationOptions;
import com.mongodb.quickstart.javaspringbootcsfle.csfleService.SchemaService;
import jakarta.annotation.PostConstruct;
import org.bson.BsonDocument;
import org.bson.Document;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

/**
 * Create or update the encrypted collections with a server side JSON Schema to secure the encrypted field in the MongoDB database.
 * This prevents any other client from inserting or editing the fields without encrypting the fields correctly.
 */
// start-encrypted-collections-setup
@Component
public class EncryptedCollectionsSetup {

    private static final Logger LOGGER = LoggerFactory.getLogger(EncryptedCollectionsSetup.class);
    private final MongoClient mongoClient;
    private final SchemaService schemaService;

    public EncryptedCollectionsSetup(MongoClient mongoClient, SchemaService schemaService) {
        this.mongoClient = mongoClient;
        this.schemaService = schemaService;
    }

    @PostConstruct
    public void postConstruct() {
        LOGGER.info("=> Setup the encrypted collections.");
        schemaService.getSchemasMap()
                     .forEach((namespace, schema) -> createOrUpdateCollection(mongoClient, namespace, schema));
    }

    private void createOrUpdateCollection(MongoClient mongoClient, MongoNamespace ns, BsonDocument schema) {
        MongoDatabase db = mongoClient.getDatabase(ns.getDatabaseName());
        String collStr = ns.getCollectionName();
        if (doesCollectionExist(db, ns)) {
            LOGGER.info("=> Updating {} collection's server side JSON Schema.", ns.getFullName());
            db.runCommand(new Document("collMod", collStr).append("validator", jsonSchemaWrapper(schema)));
        } else {
            LOGGER.info("=> Creating encrypted collection {} with server side JSON Schema.", ns.getFullName());
            db.createCollection(collStr, new CreateCollectionOptions().validationOptions(
                    new ValidationOptions().validator(jsonSchemaWrapper(schema))));
        }
    }

    public BsonDocument jsonSchemaWrapper(BsonDocument schema) {
        return new BsonDocument("$jsonSchema", schema);
    }

    private boolean doesCollectionExist(MongoDatabase db, MongoNamespace ns) {
        return db.listCollectionNames()
                 .into(new ArrayList<>())
                 .stream()
                 .anyMatch(c -> c.equals(ns.getCollectionName()));
    }

}
// end-encrypted-collections-setup