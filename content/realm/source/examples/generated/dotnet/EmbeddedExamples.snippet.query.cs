// Find All Contacts with an Address of "Los Angeles"
var losAngelesContacts = realm.All<Contact>()
    .Filter("address.city == 'Los Angeles'");

foreach (var contact in losAngelesContacts)
{
    Console.WriteLine("Los Angeles Contact:");
    Console.WriteLine(contact.Name);
    Console.WriteLine(contact.Address.Street);
}
