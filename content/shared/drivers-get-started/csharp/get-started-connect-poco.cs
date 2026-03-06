using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
if (connectionString == null)
{
    Console.WriteLine("You must set your 'MONGODB_URI' environment variable. To learn how to set it, see https://www.mongodb.com/docs/drivers/csharp/current/get-started/create-connection-string");
    Environment.Exit(0);
}

var client = new MongoClient(connectionString);

var collection = client.GetDatabase("sample_mflix").GetCollection<Movie>("movies");

var filter = Builders<Movie>.Filter.Eq(m => m.Title, "Back to the Future");

var movie = collection.Find(filter).First();

Console.WriteLine($"Title: {movie.Title}");
Console.WriteLine($"Plot: {movie.Plot}");
Console.WriteLine($"Genres: {string.Join(", ", movie.Genres)}");

[BsonIgnoreExtraElements]
public class Movie
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; }

    [BsonElement("plot")]
    public string Plot { get; set; }

    [BsonElement("genres")]
    public List<string> Genres { get; set; }
}

