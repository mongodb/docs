import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ReadConcern;
import com.mongodb.ReadPreference;
import com.mongodb.Tag;
import com.mongodb.TagSet;
import com.mongodb.TransactionOptions;
import com.mongodb.WriteConcern;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import com.mongodb.client.ClientSession;

import java.util.Arrays;
import java.util.concurrent.TimeUnit;

public class ReplicaSets {

    public static void main(String[] args) {

        // Uses the settings builder methods to set read and write settings for the client
        // start-client-settings
        MongoClient mongoClient = MongoClients.create(MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("mongodb://localhost:27017/"))
                .readPreference(ReadPreference.secondary())
                .readConcern(ReadConcern.LOCAL)
                .writeConcern(WriteConcern.W2)
                .build());
        // end-client-settings

        // Uses connection URI parameters to set read and write settings for the client
        // start-client-settings-uri
        MongoClient uriClient = MongoClients.create("mongodb://localhost:27017/?readPreference=secondary&w=2&readConcernLevel=local");
        // end-client-settings-uri

        // Sets read and write settings for the transaction
        // start-transaction-settings
        TransactionOptions tOptions = TransactionOptions.builder()
                .readPreference(ReadPreference.primary())
                .readConcern(ReadConcern.MAJORITY)
                .writeConcern(WriteConcern.W1)
                .build();
                
        try (ClientSession clientSession = client.startSession()) {
            clientSession.startTransaction(tOptions);

            // Specify transaction operations here
        }
        // end-transaction-settings

        // Sets read and write settings for the "test_database" database
        // start-database-settings
        MongoDatabase database = mongoClient.getDatabase("test_database")
                .withReadPreference(ReadPreference.primaryPreferred())
                .withReadConcern(ReadConcern.AVAILABLE)
                .withWriteConcern(WriteConcern.MAJORITY);
        // end-database-settings

        // Sets read and write settings for the "test_collection" collection
        // start-collection-settings
        MongoCollection<Document> collection = database.getCollection("test_collection")
                .withReadPreference(ReadPreference.secondaryPreferred())
                .withReadConcern(ReadConcern.AVAILABLE)
                .withWriteConcern(WriteConcern.UNACKNOWLEDGED);
        // end-collection-settings

        // Uses connection URI parameters to set a sharded cluster read preference
        // start-sharded-cluster-uri
        MongoClient uriClient = MongoClients.create("mongodb://user:password@mongos1.example.com,mongos2.example.com/?readPreference=secondary");
        // end-sharded-cluster-uri

        // Instructs the driver to prefer reads from secondary replica set members
        // located in New York, followed by a secondary in San Francisco, and
        // lastly fall back to any secondary.
        // start-tag-set
        TagSet tag1 = new TagSet(new Tag("dc", "ny"));
        TagSet tag2 = new TagSet(new Tag("dc", "sf"));
        TagSet tag3 = new TagSet();

        ReadPreference readPref= ReadPreference.secondary(Arrays.asList(tag1, tag2, tag3));

        MongoDatabase database = mongoClient.getDatabase("test_database")
                              .withReadPreference(readPref);
        // end-tag-set

        // Instructs the library to distribute reads between members within 35 milliseconds
        // of the closest member's ping time using client settings
        // start-local-threshold-uri
        String connectionString = "mongodb://localhost:27017/?replicaSet=repl0&localThresholdMS=35";
        MongoClient client = MongoClients.create(connectionString);
        // end-local-threshold-uri

        // Instructs the library to distribute reads between members within 35 milliseconds
        // of the closest member's ping time using a URI option
        // start-local-threshold-settings
        MongoClient client = MongoClients.create(MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString("mongodb://localhost:27017/"))
                .applyToClusterSettings(builder -> builder.localThreshold(35, TimeUnit.MILLISECONDS))
                .build());
        // end-local-threshold-settings

        // Close the MongoClient connection
        mongoClient.close();
    }
}