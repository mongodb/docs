[BsonIgnoreExtraElements]
public class ProjectedMovie
{
    [BsonId]
    public ObjectId Id { get; set; }

    public string Title { get; set; } = null!;

    public string? LeadActor { get; set; }

    public List<string>? Crew { get; set; }
}
