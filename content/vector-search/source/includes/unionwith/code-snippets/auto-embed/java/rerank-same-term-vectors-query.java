import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

import java.util.Arrays;
import java.util.List;

public class AutoEmbedQuery {

    public static void main(String[] args) {

        // Replace the placeholder with your connection string
        String uri = "<connectionString>";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("embedded_movies");

            List<Document> pipeline = Arrays.asList(
                new Document("$rankFusion", new Document()
                    .append("input", new Document("pipelines", new Document()
                        .append("vectorPipeline1", Arrays.asList(
                            new Document("$vectorSearch", new Document()
                                .append("index", "multiple-auto-embed-search")
                                .append("path", "fullplot")
                                .append("query", new Document("text", "battle between good and evil"))
                                .append("numCandidates", 2000)
                                .append("limit", 200))))
                        .append("vectorPipeline2", Arrays.asList(
                            new Document("$vectorSearch", new Document()
                                .append("index", "multiple-auto-embed-search")
                                .append("path", "title")
                                .append("query", new Document("text", "battle between good and evil"))
                                .append("numCandidates", 2000)
                                .append("limit", 200))))))
                    .append("combination", new Document("weights", new Document()
                        .append("vectorPipeline1", 0.5)
                        .append("vectorPipeline2", 0.5)))
                    .append("scoreDetails", true)),
                new Document("$project", new Document()
                    .append("_id", 1)
                    .append("title", 1)
                    .append("fullplot", 1)
                    .append("scoreDetails", new Document("$meta", "scoreDetails"))),
                new Document("$limit", 200),
                new Document("$match", new Document("fullplot",
                    new Document("$exists", true).append("$type", "string"))),
                new Document("$rerank", new Document()
                    .append("model", "rerank-2.5")
                    .append("query", new Document("text", "battle between good and evil"))
                    .append("path", "fullplot")
                    .append("numDocsToRerank", 200)),
                new Document("$addFields", new Document("rerankScore",
                    new Document("$meta", "score"))),
                new Document("$limit", 20),
                new Document("$project", new Document()
                    .append("_id", 0)
                    .append("title", 1)
                    .append("fullplot", 1)
                    .append("scoreDetails", 1)
                    .append("rerankScore", 1))
            );

            collection.aggregate(pipeline).forEach(doc -> System.out.println(doc.toJson()));
        }
    }
}
