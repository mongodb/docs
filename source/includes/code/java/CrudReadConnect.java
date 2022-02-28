import com.mongodb.client.*;
import org.bson.Document;

public class CrudRead {
    public static void main(String[] args) {
        // String uri =
        // "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";
        String uri = "mongodb+srv://foo:bar@cluster0.7stmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            // database and collection code goes here
            // find code goes here
            // iterate code goes here
        }
    }
}
