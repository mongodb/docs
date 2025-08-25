var address = new Address() // Create an Address
{
    Street = "123 Fake St.",
    City = "Springfield",
    Country = "USA",
    PostalCode = "90710"
};

var contact = new Contact() // Create a Contact
{
    Name = "Nick Riviera",
    Address = address // Embed the Address Object
};

realm.Write(() =>
{
    realm.Add(contact);
});
