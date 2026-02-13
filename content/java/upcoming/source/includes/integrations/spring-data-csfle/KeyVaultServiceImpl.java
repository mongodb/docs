package com.mongodb.quickstart.javaspringbootcsfle.csfleServiceImpl;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.quickstart.javaspringbootcsfle.csfleService.KeyVaultService;
import org.bson.BsonDocument;
import org.bson.BsonInt32;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

import static com.mongodb.client.model.Filters.exists;

/**
 * Initialization of the Key Vault collection and keyAltNames unique index.
 */
// start-key-vault-service-impl
@Service
public class KeyVaultServiceImpl implements KeyVaultService {

    private static final Logger LOGGER = LoggerFactory.getLogger(KeyVaultServiceImpl.class);
    private static final String INDEX_NAME = "uniqueKeyAltNames";
    @Value("${mongodb.key.vault.db}")
    private String KEY_VAULT_DB;
    @Value("${mongodb.key.vault.coll}")
    private String KEY_VAULT_COLL;

    public void setupKeyVaultCollection(MongoClient mongoClient) {
        LOGGER.info("=> Setup the key vault collection {}.{}", KEY_VAULT_DB, KEY_VAULT_COLL);
        MongoDatabase db = mongoClient.getDatabase(KEY_VAULT_DB);
        MongoCollection<Document> vault = db.getCollection(KEY_VAULT_COLL);
        boolean vaultExists = doesCollectionExist(db, KEY_VAULT_COLL);
        if (vaultExists) {
            LOGGER.info("=> Vault collection already exists.");
            if (!doesIndexExist(vault)) {
                LOGGER.info("=> Unique index created on the keyAltNames");
                createKeyVaultIndex(vault);
            }
        } else {
            LOGGER.info("=> Creating a new vault collection & index on keyAltNames.");
            createKeyVaultIndex(vault);
        }
    }

    private void createKeyVaultIndex(MongoCollection<Document> vault) {
        Bson keyAltNamesExists = exists("keyAltNames");
        IndexOptions indexOpts = new IndexOptions().name(INDEX_NAME)
                                                   .partialFilterExpression(keyAltNamesExists)
                                                   .unique(true);
        vault.createIndex(new BsonDocument("keyAltNames", new BsonInt32(1)), indexOpts);
    }

    private boolean doesCollectionExist(MongoDatabase db, String coll) {
        return db.listCollectionNames().into(new ArrayList<>()).stream().anyMatch(c -> c.equals(coll));
    }

    private boolean doesIndexExist(MongoCollection<Document> coll) {
        return coll.listIndexes()
                   .into(new ArrayList<>())
                   .stream()
                   .map(i -> i.get("name"))
                   .anyMatch(n -> n.equals(INDEX_NAME));
    }
}
// end-key-vault-service-impl