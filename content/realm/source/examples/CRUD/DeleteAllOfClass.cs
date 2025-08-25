realm.Write(() =>
{
    // Remove all instances of Dog from the realm.
    realm.RemoveAll<Dog>();
});
