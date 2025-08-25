realm.Write(() =>
{
    realm.Remove(myItem);
});

realm.Write(() =>
{
    realm.RemoveAll<Item>();
});

