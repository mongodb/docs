namespace Examples;

using MongoDB.Bson;
using MongoDB.Driver;
// THIS IS AN EXAMPLE. DO NOT USE ON A PAGE.
// You can copy this to get started on making a new C# code example.
// See https://mongodb-university.github.io/Bluehawk/ for more info on Bluehawk.

public class ExampleStub
{
    // Write your code example inside a function that you can call from a corresponding test.
    // // When you call the function in the test, this executes the code example.
    // The function can return output, which the test can validate to confirm that the code works.

    public List<BsonDocument> RunApp()
    {
        var uri = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        var client = new MongoClient(uri);
        // The text string after the :snippet-start: tag is used in the name of the snippet.
        // It should be a unique identifier within this example file.
        // For this snippet, the filename will be: example-stub.snippet.stub-console-log.js
        // :snippet-start: stub-console-log
        var dbName = client.GetDatabase("your_db_name");
        var collName = dbName.GetCollection<BsonDocument>("your_coll_name");

        Console.WriteLine("Stub example. Do not use in a literalinclude.");
        // :remove-start:
        Console.WriteLine(
            "Unnecessary code for tests. You can use the remove syntax to omit it from output."
        );
        // :remove-end:

        // Be careful of whitespace when using 'remove' There will be 2 newlines above this.

        // :snippet-end:
        // The rest of the file will not be included in the snippet!

        // We can return something to compare expected output to actual output in our test.
        var document = new BsonDocument
        {
            { "name", "Alice" },
            { "age", 30 },
            { "isMember", true }
        };
        collName.InsertOne(document);

        // Find a document  
        var filter = Builders<BsonDocument>.Filter.Eq("name", "Alice");
        return collName.Find(filter).ToList();
    }
}
