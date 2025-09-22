import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.ServerApi;
import com.mongodb.ServerApiVersion;

import com.mongodb.bulk.BulkWriteResult;
import com.mongodb.client.model.InsertOneModel;
import com.mongodb.client.model.UpdateOneModel;
import com.mongodb.client.model.UpdateManyModel;
import com.mongodb.client.model.ReplaceOneModel;
import com.mongodb.client.model.DeleteOneModel;
import com.mongodb.client.model.DeleteManyModel;
import com.mongodb.client.model.BulkWriteOptions;
import com.mongodb.reactivestreams.client.MongoCollection;

import org.bson.Document;

import com.mongodb.reactivestreams.client.MongoClient;
import com.mongodb.reactivestreams.client.MongoClients;
import com.mongodb.reactivestreams.client.MongoDatabase;
import org.reactivestreams.Publisher;
import reactor.core.publisher.Mono;

import java.util.Arrays;

import static com.mongodb.client.model.Filters.eq;
import static com.mongodb.client.model.Updates.set;

class BulkWrite {
    public static void main(String[] args) throws InterruptedException {
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
        try (MongoClient mongoClient = MongoClients.create(settings)) {
            MongoDatabase sample_restaurants = mongoClient.getDatabase("sample_restaurants");
            MongoCollection<Document> restaurants = sample_restaurants.getCollection("restaurants");


            // start-bulk-insert-one
            InsertOneModel<Document> operation = new InsertOneModel<>(
                    new Document("name", "Mongo's Deli")
                            .append("cuisine", "Sandwiches"));
            // end-bulk-insert-one

            // start-bulk-update-one
            UpdateOneModel<Document> operation = new UpdateOneModel<>(
                    eq("name", "Mongo's Deli"),
                    set("cuisine", "Sandwiches and Salads"));
            // end-bulk-update-one

            // start-bulk-update-many
            UpdateManyModel<Document> operation = new UpdateManyModel<>(
                    eq("name", "Mongo's Deli"),
                    set("cuisine", "Sandwiches and Salads"));
            // end-bulk-update-many

            // start-bulk-replace-one
            ReplaceOneModel<Document> operation = new ReplaceOneModel<>(
                    eq("name", "Original Pizza"),
                    new Document("name", "Mongo's Pizza")
                            .append("borough", "Manhattan"));
            // end-bulk-replace-one

            // start-bulk-delete-one
            DeleteOneModel<Document> operation = new DeleteOneModel<>(
                    eq("restaurant_id", "5678"));
            // end-bulk-delete-one

            // start-bulk-delete-many
            DeleteManyModel<Document> operation = new DeleteManyModel<>(
                    eq("name", "Mongo's Deli"));
            // end-bulk-delete-many

            // start-bulk-write-mixed
            Publisher<BulkWriteResult> bulkWritePublisher = restaurants.bulkWrite(
                    Arrays.asList(new InsertOneModel<>(
                                    new Document("name", "Mongo's Deli")
                                            .append("cuisine", "Sandwiches")
                                            .append("borough", "Manhattan")
                                            .append("restaurant_id", "1234")),
                            new InsertOneModel<>(new Document("name", "Mongo's Deli")
                                            .append("cuisine", "Sandwiches")
                                            .append("borough", "Brooklyn")
                                            .append("restaurant_id", "5678")),
                            new UpdateManyModel<>(eq("name", "Mongo's Deli"),
                                    set("cuisine", "Sandwiches and Salads")),
                            new DeleteOneModel<>(eq("restaurant_id", "1234"))));

            BulkWriteResult bulkResult = Mono.from(bulkWritePublisher).block();

            System.out.println(bulkResult.toString());
            // end-bulk-write-mixed

            // start-bulk-write-unordered
            Publisher<BulkWriteResult> bulkWritePublisher = restaurants.bulkWrite(
                    Arrays.asList(new InsertOneModel<>(
                                    new Document("name", "Mongo's Deli")
                                            .append("cuisine", "Sandwiches")
                                            .append("borough", "Manhattan")
                                            .append("restaurant_id", "1234")),
                            new InsertOneModel<>(new Document("name", "Mongo's Deli")
                                            .append("cuisine", "Sandwiches")
                                            .append("borough", "Brooklyn")
                                            .append("restaurant_id", "5678")),
                            new UpdateManyModel<>(eq("name", "Mongo's Deli"),
                                    set("cuisine", "Sandwiches and Salads")),
                            new DeleteOneModel<>(eq("restaurant_id", "1234"))), 
                            new BulkWriteOptions().ordered(false));

            BulkWriteResult bulkResult = Mono.from(bulkWritePublisher).block();

            System.out.println(bulkResult.toString());
            // end-bulk-write-unordered

            }
    }

}