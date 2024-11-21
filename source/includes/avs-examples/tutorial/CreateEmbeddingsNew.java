import com.mongodb.MongoException;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertManyResult;
import org.bson.BsonArray;
import org.bson.Document;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class CreateEmbeddings {

    static List<String> data = Arrays.asList(
            "Titanic: The story of the 1912 sinking of the largest luxury liner ever built",
            "The Lion King: Lion cub and future king Simba searches for his identity",
            "Avatar: A marine is dispatched to the moon Pandora on a unique mission"
    );

    public static void main(String[] args){
        String uri = System.getenv("ATLAS_CONNECTION_STRING");
        if (uri == null || uri.isEmpty()) {
            throw new RuntimeException("ATLAS_CONNECTION_STRING env variable is not set or is empty.");
        }

        // establish connection and set namespace
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_db");
            MongoCollection<Document> collection = database.getCollection("embeddings");

            System.out.println("Creating embeddings for " + data.size() + " documents");
            EmbeddingProvider embeddingProvider = new EmbeddingProvider();

            // generate embeddings for new inputted data
            List<BsonArray> embeddings = embeddingProvider.getEmbeddings(data);

            List<Document> documents = new ArrayList<>();
            int i = 0;
            for (String text : data) {
                Document doc = new Document("text", text).append("embedding", embeddings.get(i));
                documents.add(doc);
                i++;
            }

            // insert the embeddings into the Atlas collection
            List<String> insertedIds = new ArrayList<>();
            try {
                InsertManyResult result = collection.insertMany(documents);
                result.getInsertedIds().values()
                        .forEach(doc -> insertedIds.add(doc.toString()));
                System.out.println("Inserted " + insertedIds.size() + " documents with the following ids to " + collection.getNamespace() + " collection: \n " + insertedIds);
            } catch (MongoException me) {
                throw new RuntimeException("Failed to insert documents", me);
            }
        } catch (MongoException me) {
            throw new RuntimeException("Failed to connect to MongoDB ", me);
        } catch (Exception e) {
            throw new RuntimeException("Operation failed: ", e);
        }
    }
}
