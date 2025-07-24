using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.Aggregation.Pipelines;

public class TemplateApp
{
    public List<MyClass> RunApp()
    {
        var uri = DotNetEnv.Env.GetString("CONNECTION_STRING", "Env variable not found. Verify you have a .env file with a valid connection string.");
        // :snippet-start: example
        // :uncomment-start:
        //using MongoDB.Bson;
        //using MongoDB.Bson.Serialization.Attributes;
        //using MongoDB.Driver;
        // :uncomment-end:

        // Define data model classes.
        // ... public class MyClass { ... }

        // Replace the placeholder with your connection string.
        // :uncomment-start:
        //var uri = "<connection string>";
        // :uncomment-end:
        var client = new MongoClient(uri);
        var aggDB = client.GetDatabase("agg_tutorials_db");

        // Get a reference to relevant collections.
        // ... var someColl = aggDB.GetCollection<MyClass>("someColl");
        var someColl = aggDB.GetCollection<MyClass>("someColl"); // :remove:
        // ... var anotherColl = aggDB.GetCollection<MyClass>("anotherColl");
        var anotherColl = aggDB.GetCollection<MyClass>("anotherColl"); // :remove:

        // Delete any existing documents in collections if needed.
        // ... someColl.DeleteMany(Builders<MyClass>.Filter.Empty);
        someColl.DeleteMany(Builders<MyClass>.Filter.Empty); // :remove:

        // Insert sample data into the collection or collections.
        // ... someColl.InsertMany(new List<MyClass> { ... });
        // :remove-start:
        someColl.InsertMany(new List<MyClass> {
            new MyClass
            {
                StringValue = "sample1",
            },
            new MyClass
            {
                StringValue = "sample2",
            }
        });
        // :remove-end:

        // Add code to chain pipeline stages to the Aggregate() method.
        var results = someColl.Aggregate().Match(c => c.StringValue == "sample2"); // :remove:
        // ... var results = someColl.Aggregate().Match(...);

        // Print the aggregation results.
        foreach (var result in results.ToList())
        {
            Console.WriteLine(result);
        }
        // :snippet-end:
        return results.ToList();
    }
}

public class MyClass
{
    public ObjectId Id { get; set; }
    public string StringValue { get; set; } = "";
}
