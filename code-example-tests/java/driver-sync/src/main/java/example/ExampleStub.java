package example;

import com.mongodb.client.*;
import com.mongodb.client.model.Filters;
import org.bson.conversions.Bson;
import org.bson.Document;

// THIS IS AN EXAMPLE. DO NOT USE ON A PAGE.
// You can copy this to get started on making a new Java Sync Driver code example.
// See https://mongodb-university.github.io/Bluehawk/ for more info on Bluehawk.

public class ExampleStub {
    // Write your code example inside a function that you can call from a
    // corresponding test.
    // When you call the function in the test, this executes the code example.
    // The function can return output, which the test can validate to confirm that
    // the code works.
    public Document runApp() {
        String uri = System.getenv("CONNECTION_STRING");
        MongoClient client = MongoClients.create(uri);
        // The text string after the :snippet-start: tag is used in the name of the
        // snippet.
        // It should be a unique identifier within this example file.
        // For this snippet, the filename will be:
        // ExampleStub.snippet.stub-system-out.java
        // :snippet-start: stub-system-out
        MongoDatabase dbName = client.getDatabase("your_db_name");
        MongoCollection<Document> collection = dbName.getCollection("your_coll_name");

        System.out.println("Stub example. Do not use in a literalinclude.");
        // :remove-start:
        System.out.println("Unnecessary code for tests. You can use the remove syntax to omit it from output.");

        // :remove-end:

        // Be careful of whitespace when using 'remove' There will be 2 newlines above
        // this.

        // :snippet-end:
        // The rest of the file will not be included in the snippet!

        // We can return something to compare expected output to actual output in our
        // test.
        Document document = new Document("name", "Alice").append("age", 30).append("isMember", true);

        collection.insertOne(document);

        // Find a document
        Bson filter = Filters.eq("name", "Alice");
        Document result = collection.find(filter).first();
        client.close();
        return result;
    }
}
