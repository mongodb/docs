public partial class MyRealmClass : IRealmObject
{
    [PrimaryKey]
    public int _id { get; set; }
    public RealmInteger<int> Counter { get; set; }
}
