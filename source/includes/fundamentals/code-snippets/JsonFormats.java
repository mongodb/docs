package fundamentals;

import java.util.Arrays;
import java.util.Date;
import java.util.List;

import org.bson.Document;
import org.bson.json.JsonMode;
import org.bson.json.JsonWriterSettings;
import org.bson.types.ObjectId;

import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

// Demonstrate each JSON format
public class JsonFormats {

    public static void main(String[] args) {

        List<JsonMode> modes = Arrays.asList(JsonMode.EXTENDED, JsonMode.RELAXED, JsonMode.SHELL, JsonMode.STRICT);

        try (MongoClient mongoClient = MongoClients.create("mongodb://localhost:27017")) {

            MongoDatabase database = mongoClient.getDatabase("sample_data");
            MongoCollection<Document> collection = database.getCollection("testData");

            try {
                ObjectId testId = new ObjectId("507f1f77bcf86cd799439013");

                // Creates a document that has a specified "_id" value
                Document idDocument = new Document().append("_id", testId);

                // Deletes a document that has a specified "_id" value and inserts a document with the same "_id" value
                collection.deleteOne(idDocument);
                collection.insertOne(new Document()
                            .append("_id", testId)
                            .append("createdAt", new Date())
                            .append("myNumber", 36520312L));

                // Retrieves the first document that has the specified "_id" value
                Document doc = collection.find(idDocument)
                        .first();

                // Prints the result of the find operation in multiple JSON formats
                for (JsonMode mode : modes) {
                    JsonWriterSettings settings = JsonWriterSettings.builder().outputMode(mode).build();
                    System.out.println(mode.name() + ":" + doc.toJson(settings));
                }

            // Prints exception details if any exceptions occur during the find operation
            } catch (MongoException me) {
                System.err.println(me);
            }

        // Prints exception details if any exceptions occur during the client and dataset setup
        } catch (Exception e) {
            System.err.println(e);
        }

    }
}
