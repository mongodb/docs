var plants = realm.All<Plant>();

// Use the Where operator to find items
// in the results collection
var pricklyPear = plants
    .Where(plant => plant.Name == "Prickly Pear");

// Or apply a filter to the results collection
var pricklyPears = plants
    .Filter("Name == 'Prickly Pear'");

// You can query collection properties in the same way
var morePlants = realm.All<Inventory>().ElementAt(0).Plants;

// Convert the Ilist<Plant> to an IQueryable and
// use the Where operator
var pricklyPearCacti = morePlants.AsQueryable()
    .Where(plant => plant.Name == "Prickly Pear");

// Or apply a filter to the collection
var greenPlants = realm.All<Inventory>()
    .Filter("Plants.Color CONTAINS[c] 'Green'");
