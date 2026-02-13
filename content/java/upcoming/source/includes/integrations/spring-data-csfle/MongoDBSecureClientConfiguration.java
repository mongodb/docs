package com.mongodb.quickstart.javaspringbootcsfle.configuration;

import com.mongodb.AutoEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.MongoNamespace;
import com.mongodb.quickstart.javaspringbootcsfle.csfleService.KmsService;
import com.mongodb.quickstart.javaspringbootcsfle.csfleService.SchemaService;
import jakarta.annotation.PostConstruct;
import org.bson.BsonDocument;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.mongo.MongoClientSettingsBuilderCustomizer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
import org.springframework.data.mapping.context.MappingContext;
import org.springframework.data.mongodb.core.MongoJsonSchemaCreator;

import java.util.Map;

import static java.util.stream.Collectors.toMap;

/**
 * Spring Data MongoDB Configuration for the encrypted MongoClient with all the required configuration (jsonSchemas).
 * The big trick in this file is the creation of the JSON Schemas before the creation of the entire configuration as
 * we need the MappingContext to resolve the SpEL expressions in the entities.
 *
 * @see com.mongodb.quickstart.javaspringbootcsfle.components.EntitySpelEvaluationExtension
 */
// start-mongodb-secure-client-configuration
@Configuration
@DependsOn("keyVaultAndDekSetup")
public class MongoDBSecureClientConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(MongoDBSecureClientConfiguration.class);
    private final KmsService kmsService;
    private final SchemaService schemaService;
    @Value("${crypt.shared.lib.path}")
    private String CRYPT_SHARED_LIB_PATH;
    @Value("${spring.data.mongodb.storage.uri}")
    private String CONNECTION_STR_DATA;
    @Value("${spring.data.mongodb.vault.uri}")
    private String CONNECTION_STR_VAULT;
    @Value("${mongodb.key.vault.db}")
    private String KEY_VAULT_DB;
    @Value("${mongodb.key.vault.coll}")
    private String KEY_VAULT_COLL;
    private MongoNamespace KEY_VAULT_NS;

    public MongoDBSecureClientConfiguration(KmsService kmsService, SchemaService schemaService) {
        this.kmsService = kmsService;
        this.schemaService = schemaService;
    }

    @PostConstruct
    public void postConstruct() {
        this.KEY_VAULT_NS = new MongoNamespace(KEY_VAULT_DB, KEY_VAULT_COLL);
    }

    @Bean
    public MongoClientSettings mongoClientSettings() {
        LOGGER.info("=> Creating the MongoClientSettings for the encrypted collections.");
        return MongoClientSettings.builder().applyConnectionString(new ConnectionString(CONNECTION_STR_DATA)).build();
    }

    @Bean
    public MongoClientSettingsBuilderCustomizer customizer(MappingContext mappingContext) {
        LOGGER.info("=> Creating the MongoClientSettingsBuilderCustomizer.");
        return builder -> {
            MongoJsonSchemaCreator schemaCreator = MongoJsonSchemaCreator.create(mappingContext);
            Map<String, BsonDocument> schemaMap = schemaService.generateSchemasMap(schemaCreator)
                                                               .entrySet()
                                                               .stream()
                                                               .collect(toMap(e -> e.getKey().getFullName(),
                                                                              Map.Entry::getValue));
            Map<String, Object> extraOptions = Map.of("cryptSharedLibPath", CRYPT_SHARED_LIB_PATH,
                                                      "cryptSharedLibRequired", true);
            MongoClientSettings mcs = MongoClientSettings.builder()
                                                         .applyConnectionString(
                                                                 new ConnectionString(CONNECTION_STR_VAULT))
                                                         .build();
            AutoEncryptionSettings oes = AutoEncryptionSettings.builder()
                                                               .keyVaultMongoClientSettings(mcs)
                                                               .keyVaultNamespace(KEY_VAULT_NS.getFullName())
                                                               .kmsProviders(kmsService.getKmsProviders())
                                                               .schemaMap(schemaMap)
                                                               .extraOptions(extraOptions)
                                                               .build();
            builder.autoEncryptionSettings(oes);
        };
    }
}
// end-mongodb-secure-client-configuration