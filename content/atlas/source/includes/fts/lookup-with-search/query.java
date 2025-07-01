import static com.mongodb.client.model.Aggregates.limit;
import static com.mongodb.client.model.Aggregates.project;
import static com.mongodb.client.model.Projections.*;
import java.util.Arrays;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class LookupWithSearchQuery {

  public static void main(String[] args) {
    // connect to your Atlas cluster
    String uri = "<connection-string>";
        
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      // set namespace
      MongoDatabase database = mongoClient.getDatabase("sample_analytics");
      MongoCollection<Document> collection = database.getCollection("customers");
            
      // define pipeline
      Document agg = new Document("$lookup", 
        new Document("from", "accounts")
          .append("localField", "accounts")
          .append("foreignField", "account_id")
          .append("as", "purchases")
          .append("pipeline", Arrays.asList(new Document("$search", 
            new Document("index", "lookup-with-search-tutorial")
              .append("compound", 
              new Document("must", Arrays.asList(new Document("queryString", 
                new Document("defaultPath", "products")
                  .append("query", "products: (CurrencyService AND InvestmentStock)"))))
                  .append("should", Arrays.asList(new Document("range", 
                    new Document("path", "limit")
                      .append("gte", 5000L)
                      .append("lte", 10000L)
                  )))
              )
          ), 
          new Document("$limit", 5L),
          new Document("$project", 
          new Document("_id", 0L)
            .append("address", 0L)
            .append("birthdate", 0L)
            .append("username", 0L)
            .append("tier_and_details", 0L)
        )))
      );
      // run pipeline and print results
      collection.aggregate(Arrays.asList(agg,
        limit(5),
        project(fields(excludeId(), include("name", "email", "active", "accounts", "purchases")))
      ))
      .forEach(doc -> System.out.println(doc.toJson()));
    }
  }
}
