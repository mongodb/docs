var sweetBasil = new Plant
{
    Name = "Sweet Basil",
    Sunlight = Sunlight.Partial.ToString(),
    Color = PlantColor.Green.ToString(),
    Type = PlantType.Annual.ToString(),
    Partition = "Store 42"
};
var thaiBasil = new Plant
{
    Name = "Thai Basil",
    Sunlight = Sunlight.Partial.ToString(),
    Color = PlantColor.Green.ToString(),
    Type = PlantType.Perennial.ToString(),
    Partition = "Store 42"
};
var helianthus = new Plant
{
    Name = "Helianthus",
    Sunlight = Sunlight.Full.ToString(),
    Color = PlantColor.Yellow.ToString(),
    Type = PlantType.Annual.ToString(),
    Partition = "Store 42"
};
var petunia = new Plant
{
    Name = "Petunia",
    Sunlight = Sunlight.Full.ToString(),
    Color = PlantColor.Purple.ToString(),
    Type = PlantType.Annual.ToString(),
    Partition = "Store 47"
};

var listofPlants = new List<Plant>
{
    sweetBasil,
    thaiBasil,
    helianthus,
    petunia
};

var insertResult = await plantsCollection.InsertManyAsync(listofPlants);
var newIds = insertResult.InsertedIds;
