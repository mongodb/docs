[BsonIgnoreExtraElements]
public class Comment
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("movie_id")]
    public ObjectId MovieId { get; set; }

    [BsonElement("text")]
    public string Text { get; set; } = null!;
}
