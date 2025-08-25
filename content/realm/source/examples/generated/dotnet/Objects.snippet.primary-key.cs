public partial class Dog : IRealmObject
{
    [PrimaryKey]
    public string Name { get; set; }
    public int Age { get; set; }
    public Person? Owner { get; set; }
}
