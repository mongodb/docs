package fundamentals;

// begin imports
import com.mongodb.client.*;
import com.mongodb.client.MongoClient;
import com.mongodb.client.model.WriteConcern;
import org.bson.Document;

import java.util.Arrays;
// end imports

public class Transaction {
    public static void main(String[] args) {
        // start transaction
        String connectionString = "<connection string>"; // Replace with your connection string
        try (MongoClient mongoClient = MongoClients.create(connectionString)) {
            MongoDatabase database = mongoClient.getDatabase("transaction_db");
            MongoCollection<Document> collection = database.getCollection("books");

            // Sets transaction options
            TransactionOptions transactionOptions = TransactionOptions.builder()
                    .writeConcern(WriteConcern.MAJORITY)
                    .build();

            try (ClientSession session = mongoClient.startSession()) {

                // Uses withTransaction and lambda for transaction operations
                session.withTransaction(() -> {
                    collection.insertMany(session, Arrays.asList(
                            new Document("title", "The Bluest Eye").append("author", "Toni Morrison"),
                            new Document("title", "Sula").append("author", "Toni Morrison"),
                            new Document("title", "Song of Solomon").append("author", "Toni Morrison")
                    ));
                    return null; // Return value as expected by the lambda
                }, transactionOptions);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // end transaction
    }
}
