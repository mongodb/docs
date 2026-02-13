package com.mongodb.quickstart.javaspringbootcsfle.components;

import com.mongodb.quickstart.javaspringbootcsfle.csfleService.DataEncryptionKeyService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.spel.spi.EvaluationContextExtension;
import org.springframework.data.spel.spi.Function;
import org.springframework.lang.NonNull;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Map;

/**
 * Will evaluate the SePL expressions in the Entity classes like this: #{mongocrypt.keyId(#target)} and insert
 * the right encryption key for the right collection.
 */
// start-entity-spel-evaluation-extension
@Component
public class EntitySpelEvaluationExtension implements EvaluationContextExtension {

    private static final Logger LOGGER = LoggerFactory.getLogger(EntitySpelEvaluationExtension.class);
    private final DataEncryptionKeyService dataEncryptionKeyService;

    public EntitySpelEvaluationExtension(DataEncryptionKeyService dataEncryptionKeyService) {
        this.dataEncryptionKeyService = dataEncryptionKeyService;
    }

    @Override
    @NonNull
    public String getExtensionId() {
        return "mongocrypt";
    }

    @Override
    @NonNull
    public Map<String, Function> getFunctions() {
        try {
            return Collections.singletonMap("keyId", new Function(
                    EntitySpelEvaluationExtension.class.getMethod("computeKeyId", String.class), this));
        } catch (NoSuchMethodException e) {
            throw new RuntimeException(e);
        }
    }

    public String computeKeyId(String target) {
        String dek = dataEncryptionKeyService.getDataEncryptionKeysB64().get(target);
        LOGGER.info("=> Computing dek for target {} => {}", target, dek);
        return dek;
    }
}
// end-entity-spel-evaluation-extension