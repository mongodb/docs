public partial class Inventory : IRealmObject
{
    // A Set can contain any Realm-supported type, including
    // objects that inherit from RealmObject
    public ISet<Plant> PlantSet { get; }

    public ISet<double> DoubleSet { get; }

    // Nullable types are supported in local-only
    // Realms, but not with Sync
    public ISet<int?> NullableIntsSet { get; }

    public ISet<string> RequiredStrings { get; }
}
