public partial class Person : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public ObjectId Id { get; set; }

    public string FullName { get; set; }
    public int Age { get; set; }
}
