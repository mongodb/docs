import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoClient;
import org.bson.Document;

public class SearchWithUnionwith {
  public static void main(String[] args) {
    // connect to Atlas cluster
    try (MongoClient mongoClient = MongoClients.create("<connection-string>")) {
      // define namespace
      MongoCollection<Document> collection = mongoClient.getDatabase("sample_training").getCollection("companies");
      // define pipeline
      Document searchStage = new Document("$search", new Document("text",
        new Document("query", "mobile")
          .append("path", "name")
          .append("score", new Document("boost", new Document("value", 1.6)))
        )
      );

      Document projectStage = new Document("$project", new Document("score", new Document("$meta", "searchScore"))
        .append("_id", 0)
        .append("number_of_employees", 1)
        .append("founded_year", 1)
        .append("name", 1)
      );

      Document addFieldsStage = new Document("$addFields", new Document("source", "companies")
        .append("source_count", "$$SEARCH_META.count.lowerBound")
      );

      Document limitStage = new Document("$limit", 3);

      Document unionWithStage = new Document("$unionWith", new Document("coll", "inspections")
        .append("pipeline", java.util.Arrays.asList(
          new Document("$search", new Document("text",
            new Document("query", "mobile")
              .append("path", "business_name")
          )),
          new Document("$project", new Document("score", new Document("$meta", "searchScore"))
            .append("business_name", 1)
            .append("address", 1)
            .append("_id", 0)
          ),
          new Document("$limit", 3),
          new Document("$set", new Document("source", "inspections")
            .append("source_count", "$$SEARCH_META.count.lowerBound")
          ),
          new Document("$sort", new Document("score", -1))
        ))
      );

      Document facetStage = new Document("$facet", new Document("allDocs", java.util.Arrays.asList())
        .append("totalCount", java.util.Arrays.asList(
          new Document("$group", new Document("_id", "$source")
            .append("firstCount", new Document("$first", "$source_count"))
          ),
          new Document("$project", new Document("totalCount",
            new Document("$sum", "$firstCount")
          ))
        ))
      );
      // run pipeline and print results
      collection.aggregate(java.util.Arrays.asList(
        searchStage, projectStage, addFieldsStage, limitStage, unionWithStage, facetStage
      )).forEach(doc -> System.out.println(doc.toJson()));
    }
  }
}
