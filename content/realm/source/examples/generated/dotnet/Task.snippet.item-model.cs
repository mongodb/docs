public partial class Item : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("assignee")]
    public string Assignee { get; set; }

    [MapTo("name")]
    public string? Name { get; set; }

    [MapTo("status")]
    public string? Status { get; set; }
}
