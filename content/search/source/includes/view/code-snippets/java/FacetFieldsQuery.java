import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.AggregateIterable;
import org.bson.Document;

import java.util.Arrays;
import java.util.List;

public class FacetFieldsQuery {
    public static void main(String[] args) {
        // Connect to your Atlas deployment
        String uri = "<connectionString>";
        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoDatabase database =
                mongoClient.getDatabase("sample_airbnb");
            MongoCollection<Document> collection =
                database.getCollection("listings_SearchableTypes");

            // Run the aggregation query on the View
            List<Document> pipeline = Arrays.asList(
                new Document("$searchMeta",
                    new Document("index", "listingsSearchableTypes")
                        .append("facet",
                            new Document("operator",
                                new Document("text",
                                    new Document("path", "summary")
                                        .append("query",
                                            "ocean view")))
                                .append("facets",
                                    new Document("idFacet",
                                        new Document("type", "string")
                                            .append("path", "idString")
                                            .append("numBuckets", 10))
                                        .append("hostFacet",
                                            new Document("type",
                                                "string")
                                                .append("path",
                                                    "superHostString")))))
            );

            AggregateIterable<Document> results =
                collection.aggregate(pipeline);
            for (Document doc : results) {
                System.out.println(doc.toJson());
            }
        }
    }
}
