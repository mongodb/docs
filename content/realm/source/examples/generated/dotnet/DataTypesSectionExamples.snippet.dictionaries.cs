
public partial class Inventory : IRealmObject
{
    [PrimaryKey]
    [MapTo("_id")]
    public string Id { get; set; }
    // The key must be of type string; the value can be
    // of any Realm-supported type, including objects
    // that inherit from RealmObject or EmbeddedObject
    public IDictionary<string, Plant?> Plants { get; }

    public IDictionary<string, bool> BooleansDictionary { get; }

    // Nullable types are supported in local-only
    // Realms, but not with Sync
    public IDictionary<string, int?> NullableIntDictionary { get; }

    public IDictionary<string, string> RequiredStringsDictionary { get; }
}
