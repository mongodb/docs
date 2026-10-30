package encryption;

import com.mongodb.ClientEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.vault.DataKeyOptions;
import com.mongodb.client.vault.ClientEncryption;
import com.mongodb.client.vault.ClientEncryptions;
import mongodb.comparison.Expect;
import org.bson.Document;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.security.SecureRandom;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class RewrapManyDataKeyTests {
    private static final String KEY_VAULT_DB = "encryption";
    private static final String KEY_VAULT_COLLECTION = "__keyVault";
    private static final String DATA_KEY_ALT_NAME = "my-key";

    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoDatabase database;
    private MongoCollection<Document> keyVault;
    private String keyVaultNamespace;
    private Map<String, Map<String, Object>> kmsProviders;

    @BeforeEach
    void setUp() {
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase(KEY_VAULT_DB);
        database.drop();
        keyVault = database.getCollection(KEY_VAULT_COLLECTION);
        keyVaultNamespace = KEY_VAULT_DB + "." + KEY_VAULT_COLLECTION;

        byte[] masterKey = new byte[96];
        new SecureRandom().nextBytes(masterKey);
        Map<String, Object> localKms = new HashMap<>();
        localKms.put("key", masterKey);
        kmsProviders = Map.of("local", localKms);
    }

    @AfterEach
    void tearDown() {
        database.drop();
        mongoClient.close();
    }

    @Test
    @DisplayName("Rewrap Many Data Key: should rewrap a matching DEK with new key material while preserving its ID")
    void TestRewrapManyDataKey() {
        createDataKey();
        Document originalDataKey = getDataKey();

        var example = new RewrapManyDataKey();
        var result = example.runRewrapManyDataKey(kmsProviders, keyVaultNamespace);

        Document rewrappedDataKey = getDataKey();

        Expect.that(result.getBulkWriteResult().getMatchedCount()).shouldMatch(1);
        Expect.that(rewrappedDataKey.get("_id").equals(originalDataKey.get("_id")))
                .shouldMatch(true);
        Expect.that(!rewrappedDataKey
                        .get("keyMaterial")
                        .equals(originalDataKey.get("keyMaterial")))
                .shouldMatch(true);
    }

    private void createDataKey() {
        ClientEncryptionSettings settings = ClientEncryptionSettings.builder()
                .keyVaultMongoClientSettings(MongoClientSettings.builder()
                        .applyConnectionString(new ConnectionString(uri))
                        .build())
                .keyVaultNamespace(keyVaultNamespace)
                .kmsProviders(kmsProviders)
                .build();

        try (ClientEncryption clientEncryption = ClientEncryptions.create(settings)) {
            clientEncryption.createDataKey(
                    "local", new DataKeyOptions().keyAltNames(List.of(DATA_KEY_ALT_NAME)));
        }
    }

    private Document getDataKey() {
        return keyVault.find(Filters.eq("keyAltNames", DATA_KEY_ALT_NAME)).first();
    }
}
