var inventory = new Inventory();
inventory.PlantSet.Add(new Plant() { Name = "Prickly Pear" });
inventory.DoubleSet.Add(123.45);

realm.Write(() =>
{
    realm.Add<Inventory>(inventory);
});

// convert the Plant Set to an IQueryable and apply a filter
var pricklyPear = inventory.PlantSet.AsRealmQueryable()
    .Where(p => p.Name == "Prickly Pear");
// Alternatively, apply a filter directly on the Plant Set
var pricklyPearPlants = inventory.PlantSet
    .Filter("Name == 'Prickly Pear'");

// Find all Inventory items that have at least one value in their
// DoubleSet that is larger than 5
var moreThan100 = realm.All<Inventory>()
    .Filter("DoubleSet.@values > 100");
