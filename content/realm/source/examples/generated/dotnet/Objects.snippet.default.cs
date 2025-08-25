public partial class Person : IRealmObject
{
    public string Name { get; set; } = "foo";

    public IList<PhoneNumber> PhoneNumbers { get; } = null!;
}
