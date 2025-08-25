public class Task : RealmObject
{
    [PrimaryKey]
    public int Id {get; set; }
    public string Name { get; set; }
    public string Assignee { get; set; }
    public bool IsComplete { get; set; }
    public int Priority { get; set; }
    public int ProgressMinutes { get; set; }
}

public class Project : RealmObject
{
    public string Name { get; set; }
    public List<Task> Tasks { get; set; }
}
