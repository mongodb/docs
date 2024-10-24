import com.mongodb.client.ListSearchIndexesIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.SearchIndexModel;
import com.mongodb.client.model.SearchIndexType;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class VectorIndex {

    public static void main(String[] args) {

        // Replace the placeholder with your Atlas connection string
        String uri = "<connectionString>";

        // Connect to your Atlas cluster
        try (MongoClient mongoClient = MongoClients.create(uri)) {

            // Set the namespace
            MongoDatabase database = mongoClient.getDatabase("<databaseName>");
            MongoCollection<Document> collection = database.getCollection("<collectionName>");

            // Define the index details
            String indexName = "<indexName>";
            Bson definition = new Document(
                "fields",
                Arrays.asList(
                    new Document("type", "vector")
                        .append("path", "<fieldToIndex>")
                        .append("numDimensions", <numberOfDimensions>)
                        .append("similarity", "euclidean | cosine | dotProduct"),
                    new Document("type", "filter")
                        .append("path", "<fieldToIndex>"),
                    ...
                )
            );

            // Define the index model
            SearchIndexModel indexModel = new SearchIndexModel(
                indexName,
                definition,
                SearchIndexType.vectorSearch()
            );

            // Create the index
            try {
                List<String> result = collection.createSearchIndexes(Collections.singletonList(indexModel));
                System.out.println("Successfully created a vector index named: " + result);
                System.out.println("It may take up to a minute for the index to build before you can query using it.");
            } catch (Exception e) {
                throw new RuntimeException("Error creating index: " + e);
            }


            // Wait for Atlas to build the index
            System.out.println("Polling to confirm the index has completed building.");

            ListSearchIndexesIterable<Document> searchIndexes = collection.listSearchIndexes();
            Document doc = null;
            while (doc == null) {
                try (MongoCursor<Document> cursor = searchIndexes.iterator()) {
                    if (!cursor.hasNext()) {
                        break;
                    }
                    Document current = cursor.next();
                    String name = current.getString("name");
                    // When the index completes building, it becomes `queryable`
                    boolean queryable = current.getBoolean("queryable");
                    if (name.equals(indexName) && queryable) {
                        doc = current;
                    } else {
                        Thread.sleep(500);
                    }
                } catch (Exception e) {
                    throw new RuntimeException("Failed to list search indexes: " + e);
                    mongoClient.close();
                }
            }
            System.out.println(indexName + " index is ready to query");

        } catch (Exception e) {
            throw new RuntimeException("Error connecting to MongoDB: " + e);
        }
    }
}
