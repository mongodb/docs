package fundamentals;

// begin QuickStart
import static com.mongodb.client.model.Filters.eq;

import org.bson.Document;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;

public static void main( String[] args ) {

    // Replace the uri string with your MongoDB deployment's connection string
    String uri = "<connection string uri>";

    try (MongoClient mongoClient = MongoClients.create(uri)) {
        MongoDatabase database = mongoClient.getDatabase("sample_mflix");
        MongoCollection<Document> collection = database.getCollection("movies");

        Document doc = collection.find(eq("title", "Back to the Future")).first();
        System.out.println(doc.toJson());
    }
}
// end QuickStart
