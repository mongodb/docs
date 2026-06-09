import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.SearchIndexModel;
import org.bson.Document;
import java.util.Arrays;

public class CreateIndex {
    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("<databaseName>");
            MongoCollection<Document> collection = database.getCollection("<collectionName>");

            SearchIndexModel indexOne = new SearchIndexModel("<first-index-name>",
                    new Document( 
                        // search index definition fields
                    ));

            SearchIndexModel indexTwo = new SearchIndexModel("<second-index-name>",
                    new Document( 
                        // search index definition fields
                    ));

            collection.createSearchIndexes(Arrays.asList(indexOne, indexTwo));
        }
    }
}
