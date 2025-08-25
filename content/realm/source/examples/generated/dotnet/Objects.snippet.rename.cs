public partial class Person : IRealmObject
{
    [MapTo("moniker")]
    public string Name { get; set; }
}
