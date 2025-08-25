realm.Write(() =>
{
    // Find dogs younger than 2 years old.
    var puppies = realm.All<Dog>().Where(dog => dog.Age < 2);

    // Remove the collection from the realm.
    realm.RemoveRange(puppies);
});
