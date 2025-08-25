realm.Write(() =>
{
    // Remove all of Ali's dogs.
    realm.RemoveRange(ali.Dogs);

    // Remove Ali.
    realm.Remove(ali);
});
