using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Examples.Aggregation.Builders;

// :snippet-start: movie-class
[BsonIgnoreExtraElements]
public class Movie
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Title { get; set; } = null!;
    [BsonElement("metacritic")]
    public int Metacritic { get; set; }
}
// :snippet-end:
