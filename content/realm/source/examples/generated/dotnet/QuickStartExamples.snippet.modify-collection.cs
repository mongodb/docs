realm.Write(() =>
{
    // Create someone to take care of some dogs.
    var ali = new Person { Id = id, Name = "Ali" };
    realm.Add(ali);
    // Find dogs younger than 2.
    var puppies = realm.All<Dog>().Where(dog => dog.Age < 2);
    // Loop through one by one to update.
    foreach (var puppy in puppies)
    {
        // Add Ali to the list of Owners for each puppy
        puppy.Owners.Add(ali);
    }
});
