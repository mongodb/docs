import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.InsertManyResult;

import org.bson.Document;
import org.bson.types.ObjectId;

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

            Document doc1 = new Document("Name", "Halley's Comet").append("OfficialName", "1P/Halley").append("OrbitalPeriod", 75).append("Radius", 3.4175).append("Mass", 2.2e14);
            Document doc2 = new Document("Name", "Wild2").append("OfficialName", "81P/Wild").append("OrbitalPeriod", 6.41).append("Radius", 1.5534).append("Mass", 2.3e13);
            Document doc3 = new Document("Name", "Comet Hyakutake").append("OfficialName", "C/1996 B2").append("OrbitalPeriod", 17000).append("Radius", 0.77671).append("Mass", 8.8e12);
        
            documents.add(doc1);
            documents.add(doc2);
            documents.add(doc3);
            
            InsertManyResult result = coll.insertMany(documents);
            
            // display insert ids code goes here
            List<ObjectId> insertedIds = new ArrayList<>();
            result.getInsertedIds().values()
                .forEach(doc -> insertedIds.add(doc.asObjectId().getValue()));
            
            System.out.println(insertedIds);
        }
    }
}
