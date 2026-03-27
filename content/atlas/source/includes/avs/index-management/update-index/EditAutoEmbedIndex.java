import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Arrays;

public class EditVectorIndex {

    public static void main(String[] args) {

        // Replace the placeholder with your connection string
        String uri = "<connectionString>";

        // Connect to your cluster
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            // Set the namespace
            MongoDatabase database = mongoClient.getDatabase("<databaseName>");
            MongoCollection<Document> collection = database.getCollection("<collectionName>");

            // Define the index changes
            String indexName = "<indexName>";
            Bson definition = new Document(
                "fields",
                Arrays.asList(
                    new Document("type", "autoEmbed")
                        .append("modality", "text")
                        .append("model", "<modelName>")
                        .append("path", "<fieldToIndex>"),
                    new Document("type", "filter")
                        .append("path", "<filterField1>"),
                    new Document("type", "filter")
                        .append("path", "<filterField2>")));

            // Update the index
            collection.updateSearchIndex(indexName, definition);
            System.out.println("Successfully updated the index");
        }
    }
}
