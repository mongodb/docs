import com.mongodb.client.model.Aggregates;
import java.util.Arrays;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class MaterializedViewSearchQuery {

  public static void main(String[] args) {
    // connect to your MongoDB deployment
    String uri = "<connection-string>";
        
    try (MongoClient mongoClient = MongoClients.create(uri)) {
      // set namespace
      MongoDatabase database = mongoClient.getDatabase("sample_supplies");
      MongoCollection<Document> collection = database.getCollection("monthlyPhoneTransactions");
            
      // define pipeline
      Document searchStage = new Document("$search", 
        new Document("index", "monthlySalesIndex")
          .append("range", 
            new Document("gt", 10000)
              .append("path", Arrays.asList("sales_price"))
          )
      );
      
      Document countStage = new Document("$count", "months_w_over_10000");
      
      // run pipeline and print results
      collection.aggregate(Arrays.asList(searchStage, countStage))
        .forEach(doc -> System.out.println(doc.toJson()));
    }
  }
}
