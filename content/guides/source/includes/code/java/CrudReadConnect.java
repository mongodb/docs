import com.mongodb.client.*;
import com.mongodb.client.model.Filters.*;
import org.bson.Document;
import org.bson.conversions.Bson;

public class CrudRead {
    public static void main(String[] args) {
        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // database and collection code goes here
            // find code goes here
            // iterate code goes here
        }
    }
}
