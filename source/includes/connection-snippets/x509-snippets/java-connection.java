
// begin x509 connection
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.MongoCollection;
import org.bson.Document;
import org.bson.BsonDocument;

public class X509Connection {

    public static void main(String args[]) {
        // Set system properties via commandline or programmatically
        System.setProperty("javax.net.ssl.keyStore", "/etc/certs/mongodb/v3/client.keystore");
        System.setProperty("javax.net.ssl.keyStorePassword", "<your_password>");

        String uri = "mongodb+srv://<cluster-url>/test?authMechanism=MONGODB-X509&authSource=$external&retryWrites=true&w=majority";
        MongoClient client = MongoClients.create(uri);
        MongoDatabase database = mongoClient.getDatabase("testDB");
        MongoCollection<Document> collection = database.getCollection("testCol");
        BsonDocument filter = new BsonDocument();
        collection.countDocuments(filter);

        client.close();
    }
}
// end x509 connection