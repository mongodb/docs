import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class SearchWithUnionwith {
  public static void main(String[] args) {
  // connect to Atlas cluster
    try (MongoClient mongoClient = MongoClients.create("<connection-string>")) {
      // get database name
      MongoDatabase database = mongoClient.getDatabase("sample_training");
      // define pipeline
      List<Document> pipeline1 = Arrays.asList(
        new Document("$search", new Document("text",
          new Document("query", "Mobile")
            .append("path", "name"))),
        new Document("$project", new Document("score",
          new Document("$meta", "searchScore"))
            .append("_id", 0)
            .append("number_of_employees", 1)
            .append("founded_year", 1)
            .append("name", 1)),
        new Document("$set", new Document("source", "companies")),
        new Document("$limit", 3)
      );

      List<Document> pipeline2 = Arrays.asList(
        new Document("$search", new Document("text",
          new Document("query", "Mobile")
            .append("path", "business_name"))),
        new Document("$set", new Document("source", "inspections")),
        new Document("$project", new Document("score",
          new Document("$meta", "searchScore"))
            .append("source", 1)
            .append("_id", 0)
            .append("business_name", 1)
            .append("address", 1)),
        new Document("$limit", 3),
        new Document("$sort", new Document("score", -1))
      );

      List<Document> unionWithStage = new ArrayList<>();
      Document unionWith = new Document("$unionWith", new Document("coll", "inspections")
        .append("pipeline", pipeline2));
      unionWithStage.add(unionWith);

      List<Document> finalPipeline = new ArrayList<>(pipeline1);
      finalPipeline.addAll(unionWithStage);
      // run pipeline and print results
      database.getCollection("companies").aggregate(finalPipeline)
        .forEach(doc -> System.out.println(doc.toJson()));
    }
  }
}
