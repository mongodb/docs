public partial class Employee : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("employee_id")]
    public string EmployeeId { get; set; }

    [MapTo("name")]
    public string Name { get; set; }

    [MapTo("items")]
    public IList<Item> Items { get; }
}

public partial class Item : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("owner_id")]
    public string OwnerId { get; set; }

    [MapTo("summary")]
    public string Summary { get; set; }

    [MapTo("isComplete")]
    public bool IsComplete { get; set; }
}
