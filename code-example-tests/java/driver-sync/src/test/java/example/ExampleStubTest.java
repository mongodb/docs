package example;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.assertEquals;

public class ExampleStubTest {
    private final String uri = System.getenv("CONNECTION_STRING");
    private MongoClient mongoClient;
    private MongoDatabase database;

    // The setUp func runs before every test in this file
    @BeforeEach
    public void setUp() {
        mongoClient = MongoClients.create(uri);
        database = mongoClient.getDatabase("your_db_name");

        // You might use this func to load sample data required by this test
        // loadSampleData();
    }

    // The tearDown func runs after every test in this file
    @AfterEach
    void tearDown() {
        database.drop();
        mongoClient.close();
    }

    // Each `@Test` block describes an individual test case that can pass or fail
    @Test
    @DisplayName("Test that the example app produces the expected output")
    void TestExampleStubProducesExpectedOutput() {
        var example = new example.ExampleStub();
        var output = example.runApp();

        // Insert your logic to verify the output matches your expectations - for
        // example:
        var expectedOutputName = "Alice";
        assertEquals(expectedOutputName, output.get("name"));
    }
}
