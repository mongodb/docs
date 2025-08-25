// Declare your schema
partial class LoneClass : IRealmObject
{
    public string Name { get; set; }
}

class AnotherClass
{
    private void SetUpMyRealmConfig()
    {
        // Define your config with a single class
        var config = new RealmConfiguration("RealmWithOneClass.realm");
        config.Schema = new[] { typeof(LoneClass) };

        // Or, specify multiple classes to use in the Realm
        config.Schema = new[] { typeof(Dog), typeof(Cat) };
    }
}
