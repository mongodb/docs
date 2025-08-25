var resultContact = realm.All<Contact>() // Find the First Contact (Sorted By Name)
    .OrderBy(c => c.Name)
    .FirstOrDefault();

// Update the Result Contact's Embedded Address Object's Properties
realm.Write(() =>
{
    resultContact.Address.Street = "Hollywood Upstairs Medical College";
    resultContact.Address.City = "Los Angeles";
    resultContact.Address.PostalCode = "90210";
});
