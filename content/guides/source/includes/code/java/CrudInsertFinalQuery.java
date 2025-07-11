import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertManyResult;

import org.bson.Document;

import java.util.List;
import java.util.ArrayList;

public class CrudInsert {
    public static void main(String[] args) {
        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // database and collection code goes here
            MongoDatabase db = mongoClient.getDatabase("sample_guides");
            MongoCollection<Document> coll = db.getCollection("comets");

            // insert code goes here
            List<Document> documents = new ArrayList<>();

            Document doc1 = new Document("name", "Halley's Comet").append("officialName", "1P/Halley").append("orbitalPeriod", 75).append("radius", 3.4175).append("mass", 2.2e14);
            Document doc2 = new Document("name", "Wild2").append("officialName", "81P/Wild").append("orbitalPeriod", 6.41).append("radius", 1.5534).append("mass", 2.3e13);
            Document doc3 = new Document("name", "Comet Hyakutake").append("officialName", "C/1996 B2").append("orbitalPeriod", 17000).append("radius", 0.77671).append("mass", 8.8e12);
            
            documents.add(doc1);
            documents.add(doc2);
            documents.add(doc3);
            
            InsertManyResult result = coll.insertMany(documents);
            
            // display the results of your operation
            result.getInsertedIds().values().forEach(doc -> System.out.println(doc.asObjectId().getValue()));
        }
    }
}
