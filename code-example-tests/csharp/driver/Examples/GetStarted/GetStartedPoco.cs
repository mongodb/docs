//	:replace-start: {
//	  "terms":
//	  {
//	  "CONNECTION_STRING": "MONGODB_URI"
//	  }
//	}

// :snippet-start: example
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Examples.GetStarted // :remove:
{ // :remove:
    public class GetStartedPoco // :remove:
    { // :remove:
        // :remove:
        public Movie RunGetStarted() // :remove:
        { // :remove:
            var connectionString = Environment.GetEnvironmentVariable("CONNECTION_STRING");
            if (connectionString == null)
            {
                Console.WriteLine("You must set your 'CONNECTION_STRING' environment variable. To learn how to set it, see https://www.mongodb.com/docs/drivers/csharp/current/get-started/create-connection-string");
                Environment.Exit(0);
            }

            var client = new MongoClient(connectionString);

            var collection = client.GetDatabase("sample_mflix").GetCollection<Movie>("movies");

            var filter = Builders<Movie>.Filter.Eq(m => m.Title, "Back to the Future");

            var movie = collection.Find(filter).First();

            Console.WriteLine($"Title: {movie.Title}");
            Console.WriteLine($"Plot: {movie.Plot}");
            Console.WriteLine($"Genres: {string.Join(", ", movie.Genres ?? [])}");

            return movie; // :remove:
        } // :remove:
    } // :remove:
    // :remove:
    [BsonIgnoreExtraElements]
    public class Movie
    {
        [BsonId]
        public ObjectId Id { get; set; }

        [BsonElement("title")]
        public string? Title { get; set; }

        [BsonElement("plot")]
        public string? Plot { get; set; }

        [BsonElement("genres")]
        public List<string>? Genres { get; set; }
    }
} // :remove:
// :snippet-end:
// :replace-end:
