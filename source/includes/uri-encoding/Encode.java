import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

import org.bson.Document;
import java.net.URLEncoder;

public class Encoding {

    public static void main(String [] args){

        try{
            String username = URLEncoder.encode("<username>", "UTF-8");
            String password = URLEncoder.encode("<password>", "UTF-8");
            String cluster = "<clusterName>";
            String authSource = "<authSource>";
            String authMechanism = "<authMechanism>";
            
            String uri = "mongodb+srv://" + username + ":" + password + "@" + cluster + 
                         "/?authSource=" + authSource + "&authMechanism=" + authMechanism;

            MongoClient mongoClient = MongoClients.create(uri);
    
            MongoDatabase database = mongoClient.getDatabase("<dbName>");
            MongoCollection<Document> collection = database.getCollection("<collName>");
            
            collection.find().forEach(doc -> System.out.println(doc.toJson()));

        } catch(Exception e){
            System.err.println(e.getCause());

        }
    }
}
