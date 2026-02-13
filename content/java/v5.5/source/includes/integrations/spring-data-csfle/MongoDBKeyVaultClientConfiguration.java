package com.mongodb.quickstart.javaspringbootcsfle.configuration;

import com.mongodb.ClientEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoNamespace;
import com.mongodb.client.vault.ClientEncryption;
import com.mongodb.client.vault.ClientEncryptions;
import com.mongodb.quickstart.javaspringbootcsfle.csfleService.KmsService;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * ClientEncryption used by the DataEncryptionKeyService to create the DEKs.
 */
// start-mongodb-key-vault-client-configuration
@Configuration
public class MongoDBKeyVaultClientConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(MongoDBKeyVaultClientConfiguration.class);
    private final KmsService kmsService;
    @Value("${spring.data.mongodb.vault.uri}")
    private String CONNECTION_STR;
    @Value("${mongodb.key.vault.db}")
    private String KEY_VAULT_DB;
    @Value("${mongodb.key.vault.coll}")
    private String KEY_VAULT_COLL;
    private MongoNamespace KEY_VAULT_NS;

    public MongoDBKeyVaultClientConfiguration(KmsService kmsService) {
        this.kmsService = kmsService;
    }

    @PostConstruct
    public void postConstructor() {
        this.KEY_VAULT_NS = new MongoNamespace(KEY_VAULT_DB, KEY_VAULT_COLL);
    }

    /**
     * MongoDB Encryption Client that can manage Data Encryption Keys (DEKs).
     *
     * @return ClientEncryption MongoDB connection that can create or delete DEKs.
     */
    @Bean
    public ClientEncryption clientEncryption() {
        LOGGER.info("=> Creating the MongoDB Key Vault Client.");
        MongoClientSettings mcs = MongoClientSettings.builder()
                                                     .applyConnectionString(new ConnectionString(CONNECTION_STR))
                                                     .build();
        ClientEncryptionSettings ces = ClientEncryptionSettings.builder()
                                                               .keyVaultMongoClientSettings(mcs)
                                                               .keyVaultNamespace(KEY_VAULT_NS.getFullName())
                                                               .kmsProviders(kmsService.getKmsProviders())
                                                               .build();
        return ClientEncryptions.create(ces);
    }
}
// end-mongodb-key-vault-client-configuration