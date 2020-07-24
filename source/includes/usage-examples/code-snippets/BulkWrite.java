package usage.examples;

import java.util.Arrays;

import org.bson.Document;

import com.mongodb.MongoException;
import com.mongodb.bulk.BulkWriteResult;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.DeleteOneModel;
import com.mongodb.client.model.InsertOneModel;
import com.mongodb.client.model.ReplaceOneModel;
import com.mongodb.client.model.UpdateOneModel;
import com.mongodb.client.model.UpdateOptions;

public class BulkWrite {
    public static void main(String[] args) {
        // Replace the uri string with your MongoDB deployment's connection string
        String uri = "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority";

        try (MongoClient mongoClient = MongoClients.create(uri)) {

            MongoDatabase database = mongoClient.getDatabase("sample_mflix");
            MongoCollection<Document> collection = database.getCollection("movies");

            try {
                BulkWriteResult result = collection.bulkWrite(
                        Arrays.asList(
                                new InsertOneModel<>(new Document("name", "A Sample Movie")),
                                new InsertOneModel<>(new Document("name", "Another Sample Movie")),
                                new InsertOneModel<>(new Document("name", "Yet Another Sample Movie")),
                                new UpdateOneModel<>(new Document("name", "A Sample Movie"),
                                        new Document("$set", new Document("name", "An Old Sample Movie")),
                                        new UpdateOptions().upsert(true)),
                                new DeleteOneModel<>(new Document("name", "Yet Another Sample Movie")),
                                new ReplaceOneModel<>(new Document("name", "Yet Another Sample Movie"),
                                        new Document("name", "The Other Sample Movie").append("runtime",  "42"))
                                ));

                System.out.println("Result statistics:" +
                        "\ninserted: " + result.getInsertedCount() +
                        "\nupdated: " + result.getModifiedCount() +
                        "\ndeleted: " + result.getDeletedCount());

            } catch (MongoException me) {
                System.err.println("The bulk write operation failed due to an error: " + me);
            }
        }
    }
}

