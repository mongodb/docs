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

public class AutoEmbedQuery {
    public static void main(String[] args) {
        // Replace the placeholder with your connection string
        String uri = "<connection-string>";
        
        try (MongoClient client = MongoClients.create(uri)) {
            MongoDatabase database = client.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");
            
            List<Bson> pipeline = asList(
                vectorSearch(
                    fieldPath("fullplot"),
                    textQuery("epic fantasy journey with reluctant heroes"),
                    "vector_index",
                    10L,
                    approximateVectorSearchOptions(100L)
                        .filter(and(
                            gte("year", 1980),
                            lte("year", 2020),
                            in("genres", asList("Action", "Adventure", "Family"))
                        ))
                ),
                project(
                    fields(
                        excludeId(),
                        include("title", "fullplot"),
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