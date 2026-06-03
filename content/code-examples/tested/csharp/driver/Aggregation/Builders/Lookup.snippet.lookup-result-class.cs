[BsonIgnoreExtraElements]
public class LookupResult
{
    [BsonId]
    public ObjectId Id { get; set; }

    [BsonElement("title")]
    public string Title { get; set; } = null!;

    public List<Comment> Comments { get; set; } = [];
}
