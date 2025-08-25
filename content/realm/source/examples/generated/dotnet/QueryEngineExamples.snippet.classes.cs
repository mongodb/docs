public partial class Items : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();
    public string Name { get; set; }
    public string Assignee { get; set; }
    public bool IsComplete { get; set; }
    public int Priority { get; set; }
    public int ProgressMinutes { get; set; }
}

public partial class Project : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId ID { get; set; } = ObjectId.GenerateNewId();
    public string Name { get; set; }
    public IList<Items> Items { get; }
}
