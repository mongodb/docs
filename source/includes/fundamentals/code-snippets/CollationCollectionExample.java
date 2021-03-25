package fundamentals;

import java.util.ArrayList;
import java.util.List;

import org.bson.Document;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Collation;
import com.mongodb.client.model.CollationAlternate;
import com.mongodb.client.model.CollationCaseFirst;
import com.mongodb.client.model.CollationMaxVariable;
import com.mongodb.client.model.CollationStrength;
import com.mongodb.client.model.CreateCollectionOptions;
import com.mongodb.client.model.IndexOptions;
import com.mongodb.client.model.Indexes;
import com.mongodb.client.model.Sorts;

public class CollationCollectionExample {
    
    private void collationBuilder() {
        // start collationBuilder
        Collation.builder()
            .caseLevel(true)
            .collationAlternate(CollationAlternate.SHIFTED)
            .collationCaseFirst(CollationCaseFirst.UPPER)
            .collationMaxVariable(CollationMaxVariable.SPACE)
            .collationStrength(CollationStrength.SECONDARY)
            .locale("en_US")
            .normalization(false)
            .numericOrdering(true)
            .build();
        // end collationBuilder
    }
    
    private static void createCollectionOptions(MongoDatabase database) {
        // start createCollectionOptions
        database.createCollection(
              "items",
              new CreateCollectionOptions().collation(
                      Collation.builder().locale("en_US").build()));
        // end createCollectionOptions
    }
    
    private static void listIndexes(MongoDatabase database) {
     // start listIndexes
        MongoCollection<Document> collection = database.getCollection("items"); 
        
        List<Document> indexes = new ArrayList<>();
        collection.listIndexes().into(indexes);
        indexes.forEach(idx -> System.out.println(idx.toJson()));
        // end listIndexes
    }
    
    private static void createIndex(MongoDatabase database) {
        // start createIndex
        MongoCollection<Document> collection = database.getCollection("items"); 
        IndexOptions idxOptions = new IndexOptions();
        idxOptions.collation(Collation.builder().locale("en_US").build());
        collection.createIndex(Indexes.ascending("name"), idxOptions);
        // end createIndex
    
    }
    
    private static void indexOperation(MongoCollection collection) {
        // start indexOperation
        FindIterable<Document> cursor = collection.find()
                .collation(Collation.builder().locale("en_US").build())
                .sort(Sorts.ascending("name"));
        // end indexOperation
        cursor.forEach(doc -> System.out.println(doc.toJson()));
    }
    
    private static void customCollationOperation(MongoCollection collection) {
        // start customCollationOperation
        FindIterable<Document> cursor = collection.find()
                .collation(Collation.builder().locale("is").build())
                .sort(Sorts.ascending("name"));
        // end customCollationOperation
    }
    
    private static void operationCollation(MongoCollection collection) {
        // start operationCollation
        FindIterable<Document> cursor = collection.find(new Document("name", "cote"))
                .collation(Collation.builder().locale("en_US").build())
                .sort(Sorts.ascending("name"));
        // end operationCollation
        cursor.forEach(doc -> System.out.println(doc.toJson()));
    }

    public static void main(String[] args) {

        //String uri = "<MongoDB connection URI>";
        String uri = "mongodb://localhost:27017";
        

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            
            MongoDatabase database = mongoClient.getDatabase("fundamentals_example");
            
            // cleanup
            //MongoCollection<Document> collection = database.getCollection("items"); 
            //collection.drop();
            
            // insert test data
//          List<Document> docs = new ArrayList<>();
//          docs.add(new Document("name", "snow globe"));
//          docs.add(new Document("name", "mug"));
//          docs.add(new Document("name", "magnet"));
//          docs.add(new Document("name", "postcard"));
//          docs.add(new Document("name", "cote"));
//          docs.add(new Document("name", "côte"));
//          docs.add(new Document("name", "coté"));
//          docs.add(new Document("name", "côté"));
//          collection.insertMany(docs);
            
            
        } 
    }

}
