config = new PartitionSyncConfiguration("myPart", user);
using (var realm = Realm.GetInstance(config))
{
    var allItems = realm.All<Item>();
}
