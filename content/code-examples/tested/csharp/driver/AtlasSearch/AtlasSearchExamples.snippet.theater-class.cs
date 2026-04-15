[BsonIgnoreExtraElements]
public class Theater
{
    [BsonId]
    public ObjectId Id { get; set; }
    public int TheaterId { get; set; }
    public TheaterLocation Location { get; set; } = null!;
}
