using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Examples.Aggregation.Builders;

// :snippet-start: movie-class
[BsonIgnoreExtraElements]
public class Movie
{
    [BsonId]
    public ObjectId Id { get; set; }
    [BsonElement("title")]
    public string Title { get; set; } = null!;
    [BsonElement("runtime")]
    public int? Runtime { get; set; }
    [BsonElement("rated")]
    public string? Rated { get; set; }
    [BsonElement("metacritic")]
    public int Metacritic { get; set; }
    [BsonElement("imdb")]
    public ImdbData? Imdb { get; set; }
}
// :snippet-end:

// :snippet-start: imdb-data-class
[BsonIgnoreExtraElements]
public class ImdbData
{
    [BsonElement("rating")]
    public double? Rating { get; set; }
    [BsonElement("votes")]
    public int? Votes { get; set; }
}
// :snippet-end:
