package com.mongodb.quickstart.javaspringbootcsfle.components;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.quickstart.javaspringbootcsfle.configuration.EncryptedCollectionsConfiguration;
import com.mongodb.quickstart.javaspringbootcsfle.csfleService.DataEncryptionKeyService;
import com.mongodb.quickstart.javaspringbootcsfle.csfleService.KeyVaultService;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

/**
 * This class initialize the Key Vault (collection + keyAltNames unique index) using a dedicated standard connection
 * to MongoDB.
 * Then it creates the Data Encryption Keys (DEKs) required to encrypt the documents in each of the
 * encrypted collections.
 */
// start-key-vault-and-dek-setup
@Component
public class KeyVaultAndDekSetup {

    private static final Logger LOGGER = LoggerFactory.getLogger(KeyVaultAndDekSetup.class);
    private final KeyVaultService keyVaultService;
    private final DataEncryptionKeyService dataEncryptionKeyService;
    @Value("${spring.data.mongodb.vault.uri}")
    private String CONNECTION_STR;

    public KeyVaultAndDekSetup(KeyVaultService keyVaultService, DataEncryptionKeyService dataEncryptionKeyService) {
        this.keyVaultService = keyVaultService;
        this.dataEncryptionKeyService = dataEncryptionKeyService;
    }

    @PostConstruct
    public void postConstruct() {
        LOGGER.info("=> Start Encryption Setup.");
        LOGGER.debug("=> MongoDB Connection String: {}", CONNECTION_STR);
        MongoClientSettings mcs = MongoClientSettings.builder()
                                                     .applyConnectionString(new ConnectionString(CONNECTION_STR))
                                                     .build();
        try (MongoClient client = MongoClients.create(mcs)) {
            LOGGER.info("=> Created the MongoClient instance for the encryption setup.");
            LOGGER.info("=> Creating the encryption key vault collection.");
            keyVaultService.setupKeyVaultCollection(client);
            LOGGER.info("=> Creating the Data Encryption Keys.");
            EncryptedCollectionsConfiguration.encryptedEntities.forEach(dataEncryptionKeyService::createOrRetrieveDEK);
            LOGGER.info("=> Encryption Setup completed.");
        } catch (Exception e) {
            LOGGER.error("=> Encryption Setup failed: {}", e.getMessage(), e);
        }

    }

}
// end-key-vault-and-dek-setup