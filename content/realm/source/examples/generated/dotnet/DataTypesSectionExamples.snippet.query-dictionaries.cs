var storeInventory = new Inventory()
{
    Id = ObjectId.GenerateNewId().ToString()
};

storeInventory.Plants.Add("Petunia", new Plant());
storeInventory.NullableIntDictionary.Add("random things", 7);
storeInventory.RequiredStringsDictionary.Add("foo", "bar");

var storeInventory2 = new Inventory()
{
    Id = ObjectId.GenerateNewId().ToString()
};

storeInventory2.RequiredStringsDictionary.Add("foo", "Bar");

realm.Write(() =>
{
    realm.Add(storeInventory);
    realm.Add(storeInventory2);
});

// Find all Inventory items that have "Petunia"
// as a key in their Plants dictionary.
var petunias = realm.All<Inventory>()
    .Filter("Plants.@keys == 'Petunia'");

// Find all Inventory items that have at least one value in their
// IntDictionary that is larger than 5 using RQL
var matchesMoreThanFive = realm.All<Inventory>()
    .Filter("NullableIntDictionary.@values > 5");

// Find all Inventory items where the RequiredStringsDictionary has a key
// "Foo", and the value of that key contains the phrase "bar"
// (case insensitive)
var matches = realm.All<Inventory>()
    .Filter("RequiredStringsDictionary['foo'] CONTAINS[c] 'bar'");
// matches.Count() == 2

// Query the Plants dictionary of an Inventory object
// for a specific plant
var myStoreInventory = realm
    .All<Inventory>().FirstOrDefault();

var petunia = myStoreInventory.Plants.AsRealmQueryable()
    .Where(p => p.Name == "Petunia");
