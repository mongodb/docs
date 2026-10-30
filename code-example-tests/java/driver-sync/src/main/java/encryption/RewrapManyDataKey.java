// :replace-start: {
//   "terms": {
//     "System.getenv(\"CONNECTION_STRING\")": "\"<connection string uri>\"",
//     "Filters.eq(\"keyAltNames\", \"my-key\")": "Filters.eq(\"<filter field>\", \"<filter value>\")",
//     ".provider(\"local\")": ".provider(\"<KMS provider>\")",
//     "BsonDocument masterKey = new BsonDocument()": "BsonDocument masterKey = new BsonDocument(\"<dataKeyOpts Key>\", new BsonString(\"<dataKeyOpts Value>\"))"
//   }
// }
package encryption;

import com.mongodb.ClientEncryptionSettings;
import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.vault.RewrapManyDataKeyOptions;
import com.mongodb.client.model.vault.RewrapManyDataKeyResult;
import com.mongodb.client.vault.ClientEncryption;
import com.mongodb.client.vault.ClientEncryptions;
import org.bson.BsonDocument;
import org.bson.conversions.Bson;

import java.util.Map;

public class RewrapManyDataKey {

    public RewrapManyDataKeyResult runRewrapManyDataKey(
            Map<String, Map<String, Object>> kmsProviders, String keyVaultNamespace) {
        // :snippet-start: rewrap-data-key
        ClientEncryptionSettings clientEncryptionSettings = ClientEncryptionSettings.builder()
                .keyVaultMongoClientSettings(MongoClientSettings.builder()
                        .applyConnectionString(new ConnectionString(System.getenv("CONNECTION_STRING")))
                        .build())
                .keyVaultNamespace(keyVaultNamespace)
                .kmsProviders(kmsProviders)
                .build();

        try (ClientEncryption clientEncryption = ClientEncryptions.create(clientEncryptionSettings)) {
            Bson filter = Filters.eq("keyAltNames", "my-key");

            BsonDocument masterKey = new BsonDocument();

            RewrapManyDataKeyOptions options =
                    new RewrapManyDataKeyOptions().provider("local").masterKey(masterKey);

            RewrapManyDataKeyResult result = clientEncryption.rewrapManyDataKey(filter, options);
            return result; // :remove:
        }
        // :snippet-end:
    }
}
// :replace-end:
