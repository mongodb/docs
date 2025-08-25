var oldContact = realm.All<Contact>() // Find the first contact
.OrderBy(c => c.Name)
.FirstOrDefault();


var newAddress = new Address() // Create an Address
{
    Street = "100 Main Street",
    City = "Los Angeles",
    Country = "USA",
    PostalCode = "90210"
};

realm.Write(() =>
{
    oldContact.Address = newAddress;
});
