import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.SearchIndexModel;
import com.mongodb.client.model.SearchIndexType;
import org.bson.Document;

import java.util.Arrays;
import java.util.Collections;

public class CreateIndex {
    public static void main(String[] args) throws InterruptedException {
        // connect to your deployment
        String uri = "<connectionString>";
        
        try (MongoClient client = MongoClients.create(uri)) {
            MongoDatabase database = client.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");
            
            // define your MongoDB Vector Search index
            SearchIndexModel indexModel = new SearchIndexModel(
                "vectorIndex",
                new Document("fields",
                    Arrays.asList(
                        new Document("type", "autoEmbed")
                            .append("modality", "text")
                            .append("path", "summary")
                            .append("model", "voyage-4"),
                        new Document("type", "filter")
                            .append("path", "address.country"),
                        new Document("type", "filter")
                            .append("path", "bedrooms")
                    )
                ),
                SearchIndexType.vectorSearch()
            );
            
            // run the helper method
            String result = collection.createSearchIndexes(Collections.singletonList(indexModel)).get(0);
            System.out.println("New search index named " + result + " is building.");
            
            System.out.println("Polling to check if the index is ready. This may take up to a minute.");
            boolean isQueryable = false;
            while (!isQueryable) {
                for (Document index : collection.listSearchIndexes()) {
                    if (result.equals(index.getString("name"))) {
                        String status = index.getString("status");
                        if ("READY".equals(status) || status == null) {
                            System.out.println(result + " is ready for querying.");
                            isQueryable = true;
                        }
                        break;
                    }
                }

                // wait for the index to be ready to query
                if (!isQueryable) {
                    Thread.sleep(5000);
                }
            }
        }
    }
}