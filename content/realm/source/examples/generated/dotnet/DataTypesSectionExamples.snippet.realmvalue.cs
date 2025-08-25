public partial class MyRealmValueObject : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public Guid Id { get; set; }

    public RealmValue MyValue { get; set; }

    // A nullable RealmValue property is *not supported*
    // public RealmValue? NullableRealmValueNotAllowed { get; set; }

    private void TestRealmValue()
    {
        var obj = new MyRealmValueObject();

        // set the value to null:
        obj.MyValue = RealmValue.Null;

        // or an int...
        obj.MyValue = 1;

        // or a string...
        obj.MyValue = "abc";

        // Use RealmValueType to check the type:
        if (obj.MyValue.Type == RealmValueType.String)
        {
            var myString = obj.MyValue.AsString();
        }
    }
