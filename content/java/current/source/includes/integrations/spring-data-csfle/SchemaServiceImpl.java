package com.mongodb.quickstart.javaspringbootcsfle.csfleServiceImpl;

import com.mongodb.MongoNamespace;
import com.mongodb.quickstart.javaspringbootcsfle.configuration.EncryptedCollectionsConfiguration;
import com.mongodb.quickstart.javaspringbootcsfle.configuration.EncryptedEntity;
import com.mongodb.quickstart.javaspringbootcsfle.csfleService.SchemaService;
import org.bson.BsonDocument;
import org.bson.json.JsonWriterSettings;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.mongodb.core.MongoJsonSchemaCreator;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import static java.util.stream.Collectors.toMap;

// start-schema-service-impl
@Service
public class SchemaServiceImpl implements SchemaService {

    private static final Logger LOGGER = LoggerFactory.getLogger(SchemaServiceImpl.class);
    private Map<MongoNamespace, BsonDocument> schemasMap;

    @Override
    public Map<MongoNamespace, BsonDocument> generateSchemasMap(MongoJsonSchemaCreator schemaCreator) {
        LOGGER.info("=> Generating schema map.");
        List<EncryptedEntity> encryptedEntities = EncryptedCollectionsConfiguration.encryptedEntities;
        return schemasMap = encryptedEntities.stream()
                                             .collect(toMap(EncryptedEntity::getNamespace,
                                                            e -> generateSchema(schemaCreator, e.getEntityClass())));
    }

    @Override
    public Map<MongoNamespace, BsonDocument> getSchemasMap() {
        return schemasMap;
    }

    private BsonDocument generateSchema(MongoJsonSchemaCreator schemaCreator, Class<?> entityClass) {
        BsonDocument schema = schemaCreator.filter(MongoJsonSchemaCreator.encryptedOnly())
                                           .createSchemaFor(entityClass)
                                           .schemaDocument()
                                           .toBsonDocument();
        LOGGER.info("=> JSON Schema for {}:\n{}", entityClass.getSimpleName(),
                    schema.toJson(JsonWriterSettings.builder().indent(true).build()));
        return schema;
    }

}
// end-schema-service-impl