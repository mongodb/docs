import static com.mongodb.client.model.Aggregates.*;
import static com.mongodb.client.model.Filters.*;
import static com.mongodb.client.model.Projections.*;
import static com.mongodb.client.model.search.SearchPath.fieldPath;
import static com.mongodb.client.model.search.VectorSearchOptions.approximateVectorSearchOptions;
import static com.mongodb.client.model.search.VectorSearchQuery.textQuery;
import static java.util.Arrays.asList;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;

import java.util.ArrayList;
import java.util.List;

public class Query {
    public static void main(String[] args) {
        // Replace the placeholder with your connection string
        String uri = "<connectionString>";
        
        try (MongoClient client = MongoClients.create(uri)) {
            MongoDatabase database = client.getDatabase("sample_airbnb");
            MongoCollection<Document> collection = database.getCollection("listingsAndReviews");
            
            List<Bson> pipeline = asList(
                vectorSearch(
                    fieldPath("summary"),
                    textQuery("close to amusement parks"),
                    "vectorIndex",
                    10L,
                    approximateVectorSearchOptions(100L)
                        .filter(and(
                            gte("bedrooms", 3),
                            in("address.country", "United States")
                        ))
                ),
                project(
                    fields(
                        excludeId(),
                        include("name", "summary", "address", "price", "bedrooms"),
                        computed("score", new Document("$meta", "vectorSearchScore"))
                    )
                )
            );
            
            List<Document> results = collection.aggregate(pipeline).into(new ArrayList<>());
            for (Document doc : results) {
                System.out.println(doc.toJson());
            }
        }
    }
}