import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.result.DeleteResult;
import com.mongodb.client.model.Filters;

import org.bson.Document;
import org.bson.conversions.Bson;

public class CrudDelete {
    public static void main(String[] args) {
        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // database and collection code goes here
            MongoDatabase db = mongoClient.getDatabase("sample_guides");
            MongoCollection<Document> coll = db.getCollection("comets");

            // delete code goes here
            Bson filter = Filters.and(Filters.gt("OrbitalPeriod", 5), Filters.lt("OrbitalPeriod", 85));
            DeleteResult result = coll.deleteMany(filter);
            
            // amount deleted code goes here
            System.out.println(result.getDeletedCount());
        }
    }
}
