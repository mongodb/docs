//	:replace-start: {
//	  "terms":
//	  {
//	  "CONNECTION_STRING": "MONGODB_URI"
//	  }
//	}

// :snippet-start: example
using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Driver;

namespace Examples.GetStarted // :remove:
{ // :remove:
    public class GetStartedBsonDocument // :remove:
    { // :remove:
        // :remove:
        public BsonDocument RunGetStarted() // :remove:
        { // :remove:
            var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
            if (connectionString == null)
            {
                Console.WriteLine("You must set your 'CONNECTION_STRING' environment variable. To learn how to set it, see https://www.mongodb.com/docs/drivers/csharp/current/get-started/create-connection-string");
                Environment.Exit(0);
            }

            var client = new MongoClient(connectionString);

            var collection = client.GetDatabase("sample_mflix").GetCollection<BsonDocument>("movies");

            var filter = Builders<BsonDocument>.Filter.Eq("title", "Back to the Future");

            var document = collection.Find(filter).First();

            Console.WriteLine(document.ToJson(new JsonWriterSettings { Indent = true }));
            return document; // :remove:
        } // :remove:
    } // :remove:
} // :remove:
// :snippet-end:
// :replace-end:
