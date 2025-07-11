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
            // insert code goes here
            // display the results of your operation
        }
    }
}
