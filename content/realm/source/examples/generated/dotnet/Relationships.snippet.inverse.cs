public partial class User : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    public string Name { get; set; }

    [Backlink(nameof(Item.Assignee))]
    public IQueryable<Item> Items { get; }
}

public partial class Item : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    public string Text { get; set; }

    public User? Assignee { get; set; }
}
