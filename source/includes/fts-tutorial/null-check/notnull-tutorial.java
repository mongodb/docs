import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.Arrays;

public class NotNullQuery {

    public static void main(String[] args) {
        // connect to your Atlas cluster
        String uri = "<connection-string>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // set namespace
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("users");

            // define pipeline
            Document agg = new Document("$search",
                new Document ("index", "null-check-tutorial")
                .append("compound",
                    new Document("should", Arrays.asList(
                        new Document("wildcard",
                                new Document("path", "password")
                                .append("query", "*")
                                .append("allowAnalyzedField", true)),
                                    new Document("compound",
                                            new Document("mustNot",
                                                    new Document("exists",
                                                            new Document("path", "password")))
                                                    .append("score",
                                                            new Document("constant",
                                                                    new Document("value", 2L))))))));

            // run pipeline and print results
            collection.aggregate(Arrays.asList(agg,
                            limit(5),
                            project(fields(
                                    excludeId(),
                                    include("name", "password"),
                                    computed("score", new Document("$meta", "searchScore"))))))
                    .forEach(doc -> System.out.println(doc.toJson()));
        }
    }
}
