import com.mongodb.client.*;
import com.mongodb.client.model.Filters.*;
import org.bson.Document;
import org.bson.conversions.Bson;

public class CrudRead {
    public static void main(String[] args) {
        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {
            MongoCollection<Document> coll = mongoClient.getDatabase("sample_guides")
                    .getCollection("planets");
            // find code goes here
            Bson filter = Filters.empty();
            MongoCursor<Document> cursor = coll.find(filter).iterator();
            try {
                while (cursor.hasNext()) {
                    System.out.println(cursor.next().toJson());
                }
            } finally {
                cursor.close();
            }
        }
    }
}
