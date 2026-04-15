[BsonIgnoreExtraElements]
public class Restaurant
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Name { get; set; } = null!;
    public string Cuisine { get; set; } = null!;
    public string Borough { get; set; } = null!;
    public List<GradeEntry> Grades { get; set; } = null!;
}
