public class Item : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("name")]
    [Indexed(IndexType.FullText)]
    public string Name { get; set; }

    [MapTo("isComplete")]
    public bool IsComplete { get; set; } = false;

    [MapTo("assignee")]
    public string Assignee { get; set; }

    [MapTo("priority")]
    public int Priority { get; set; } = 0;

    [MapTo("progressMinutes")]
    public int ProgressMinutes { get; set; } = 0;

    [MapTo("projects")]
    [Backlink(nameof(Project.Items))]
    public IQueryable<Project> Projects { get; }
}

public class Project : RealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; } = ObjectId.GenerateNewId();

    [MapTo("name")]
    public string Name { get; set; }

    [MapTo("items")]
    public IList<Item> Items { get; }

    [MapTo("quota")]
    public int Quota { get; set; }
}
