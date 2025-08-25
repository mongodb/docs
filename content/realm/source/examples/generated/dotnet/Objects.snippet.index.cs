public partial class Person : IRealmObject
{
    [Indexed(IndexType.General)]
    public string Name { get; set; }

    [Indexed(IndexType.FullText)]
    public string Biography { get; set; }
}
