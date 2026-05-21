[BsonIgnoreExtraElements]
public class Employee
{
    [BsonId]
    public int Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = null!;

    [BsonElement("reportsTo")]
    public string? ReportsTo { get; set; }

    [BsonElement("hobbies")]
    public List<string> Hobbies { get; set; } = new();

    [BsonElement("reportingHierarchy")]
    public List<Employee> ReportingHierarchy { get; set; } = new();
}
