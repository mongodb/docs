package crud;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import mongodb.comparison.Expect;
import org.bson.Document;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import sampledatautil.RequiresSampleData;

import java.util.Arrays;

public class TransactionsTests {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoDatabase database;

    @BeforeEach
    void setUp() {
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("sample_mflix");
    }

    @AfterEach
    void tearDown() {
        database.getCollection("movies").deleteMany(
                new Document("title", new Document("$in", Arrays.asList("test", "test 2"))));
        database.getCollection("comments").deleteMany(
                new Document("text", new Document("$in", Arrays.asList("test", "test 2"))));
        mongoClient.close();
    }

    @Test
    @DisplayName("Test that WithTransaction inserts documents in a transaction")
    @RequiresSampleData(value = "sample_mflix", collections = {"movies", "comments"})
    void TestWithTransaction() {
        var example = new crud.transactions.WithTransaction();
        var result = example.runWithTransaction();

        Expect.that(result).shouldMatch("Inserted into collections in the same database");
    }
}
