using MongoDB.Bson;
using MongoDB.Driver;

namespace Projection;

public class MetaExamples
{
    static string _uri = "<connection URI>";

    static IMongoCollection<Movie> movieCollection = new MongoClient(_uri)
        .GetDatabase("sample_mflix")
        .GetCollection<Movie>("movies");

    public static void CreateIndex()
    {
        // start createIndex
        var indexModel = new CreateIndexModel<Movie>(
            Builders<Movie>.IndexKeys.Text(m => m.Title));
        movieCollection.Indexes.CreateOne(indexModel);
        // end createIndex
    }

    public static BsonDocument MetaTextScoreExample()
    {
        // start metaTextScore
        var filter = Builders<Movie>.Filter.Text("future");
        var projection = Builders<Movie>.Projection
            .Include(m => m.Title)
            .Include(m => m.Plot)
            .MetaTextScore(m => m.Score);

        var result = movieCollection.Find(filter)
            .Sort(Builders<Movie>.Sort.MetaTextScore("score"))
            .Project(projection)
            .FirstOrDefault();
        // end metaTextScore
        
        return result;
    }
}