[BsonIgnoreExtraElements]
public class Movie
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Title { get; set; } = null!;
    [BsonElement("metacritic")]
    public int Metacritic { get; set; }
}
