// Instantiate a class, as normal.
var dog = new Dog { Id = 42, Name = "Max", Age = 5 };
// Open a thread-safe transaction.
realm.Write(() =>
{
    // Add the instance to the realm.
    realm.Add(dog);
});
