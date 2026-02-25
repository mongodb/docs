// :replace-start: {
//	  "terms": {
//	    "collectionName": "\"weather24h\""
//	  }
//	}

package timeseries;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class AutoRemoval {
    private static final String uri = System.getenv("CONNECTION_STRING") != null
            ? System.getenv("CONNECTION_STRING")
            : "Env variable not found. Verify you have a .env file with a valid connection string.";

    private static final String collectionName = "weather24h";
    private static final String databaseName = "timeseries";

    private static MongoClient client;
    private static MongoDatabase database;

    public static void createTimeSeriesCollection() {
        client = MongoClients.create(uri);
        database = client.getDatabase(databaseName);
        database.getCollection(collectionName).drop();
        // :snippet-start: create-timeseries-collection-for-removal
        Document createCommand = new Document("create", collectionName)
                .append("timeseries", new Document()
                        .append("timeField", "timestamp")
                        .append("metaField", "sensorId")
                        .append("granularity", "seconds"))
                .append("expireAfterSeconds", 86400);

        // Execute the command to create the collection
        database.runCommand(createCommand);
        // :snippet-end:
    }

    public static Document updateCollectionOptions() {
        createTimeSeriesCollection();
        // :snippet-start: modify-timeseries-collection-for-removal
        Document command = new Document("collMod", collectionName)
                .append("expireAfterSeconds", 7200); // Set expiration to 2 hours (7200 seconds)

        Document result = database.runCommand(command);
        // :snippet-end:
        return result;
    }

    public static Long getCollectionInfo() {
        createTimeSeriesCollection();
        // :snippet-start: get-timeseries-collection-expiry
        Document filter = new Document("name", collectionName);
        Document collectionInfo = database.listCollections().filter(filter).first();
        if (collectionInfo != null) {
            Document options = collectionInfo.get("options", Document.class);
            if (options != null) {
                return options.getLong("expireAfterSeconds");
            }
        }
        // :snippet-end:
        return null;
    }

    public static boolean removeRemoval() {
        createTimeSeriesCollection();
        // :snippet-start: remove-expireAfterSeconds
        Document command = new Document("collMod", collectionName)
                .append("expireAfterSeconds", "off");

        database.runCommand(command);
        // :snippet-end:

        // Make sure the property was actually removed
        Document filter = new Document("name", collectionName);
        Document collectionInfo = database.listCollections().filter(filter).first();
        if (collectionInfo != null) {
            Document options = collectionInfo.get("options", Document.class);
            if (options != null && !options.containsKey("expireAfterSeconds")) {
                return true;
            }
        }

        return false;
    }

    public static void cleanup() {
        if (database != null) {
            database.getCollection(collectionName).drop();
        }
        if (client != null) {
            client.close();
        }
    }
}

// :replace-end:
