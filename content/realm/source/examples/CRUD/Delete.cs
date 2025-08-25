realm.Write(() =>
{
    // Remove the instance from the realm.
    realm.Remove(dog);

    // Discard the reference.
    dog = null;
});
