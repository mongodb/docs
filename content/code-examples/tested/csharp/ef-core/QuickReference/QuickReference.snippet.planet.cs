public class Planet
{
    public ObjectId _id { get; set; }
    public string name { get; set; } = null!;
    public int orderFromSun { get; set; }
    public bool hasRings { get; set; }
}
