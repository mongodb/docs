using MongoDB.Bson;
using MongoDB.Driver;

namespace Projection;

public class SliceExamples
{
    static string _uri = "<connection URI>";
    
    static IMongoCollection<Movie> movieCollection = new MongoClient(_uri)
        .GetDatabase("sample_mflix")
        .GetCollection<Movie>("movies");

    public static List<BsonDocument> FirstThreeExample()
    {
        // start first three
        var filter = Builders<Movie>.Filter.Text("future");
        var projection = Builders<Movie>
            .Projection
            .Slice(m => m.Cast, 3)
            .Include(m => m.Cast);

        var results = movieCollection.Find(filter)
            .Project(projection)
            .Limit(1)
            .ToList();
        // end first three
        
        return results; 
    }
    
    public static List<BsonDocument> LastThreeExample()
    {
        // start last three
        var filter = Builders<Movie>.Filter.Text("future");
        var projection = Builders<Movie>
            .Projection
            .Slice(m => m.Cast, -3)
            .Include(m => m.Title);

        var results = movieCollection.Find(filter)
            .Project(projection)
            .Limit(1)
            .ToList();
        // end last three
        
        return results; 
    }
    
    public static List<BsonDocument> SkipFirstLimitThreeExample()
    {
        // start skip first limit three
        var filter = Builders<Movie>.Filter.Text("future");
        var projection = Builders<Movie>
            .Projection
            .Slice(m => m.Cast, 1, 3) 
            .Include(m => m.Title);

        var results = movieCollection.Find(filter)
            .Project(projection)
            .Limit(1)
            .ToList();
        // end skip first limit three
        
        return results; 
    }
}