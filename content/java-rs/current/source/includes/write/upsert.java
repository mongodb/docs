import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.UpdateOptions;
import com.mongodb.client.model.Updates;
import com.mongodb.client.result.UpdateResult;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoCollection;
import com.mongodb.reactivestreams.client.MongoDatabase;
import org.bson.Document;
import org.bson.conversions.Bson;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;

class QueryDatabase {
    public static void main(String[] args) {
        // Replace the placeholder with your Atlas connection string
        String uri = "<connection string>";

        // Construct a ServerApi instance using the ServerApi.builder() method
        ServerApi serverApi = ServerApi.builder()
                .version(ServerApiVersion.V1)
                .build();


        MongoClientSettings settings = MongoClientSettings.builder()
                .applyConnectionString(new ConnectionString(uri))
                .serverApi(serverApi)
                .build();


        // Create a new client and connect to the server
        try (MongoClient mongoClient = MongoClients.create(settings))
        {
           MongoDatabase database = mongoClient.getDatabase("sample_restaurants");
           MongoCollection<Document> restaurants = database.getCollection("restaurants");

        // start-upsert
        Bson filter = Filters.eq("borough", "Manhattan");
        Bson update = Updates.set("borough", "Manhattan (north)");
        UpdateOptions options = new UpdateOptions().upsert(true);

        Publisher<UpdateResult> updateManyPublisher = restaurants.updateMany(filter, update, options);
        UpdateResult result = Mono.from(updateManyPublisher).block();

        System.out.println("Matched: " + result.getMatchedCount()
                + ", Modified: " + result.getModifiedCount()
                + ", Upserted ID: " + result.getUpsertedId());
        // end-upsert

        }
    }
}