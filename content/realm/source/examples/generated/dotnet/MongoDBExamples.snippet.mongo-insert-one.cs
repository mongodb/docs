var plant = new Plant
{
    Name = "Venus Flytrap",
    Sunlight = Sunlight.Full.ToString(),
    Color = PlantColor.White.ToString(),
    Type = PlantType.Perennial.ToString(),
    Partition = "Store 42"
};

var insertResult = await plantsCollection.InsertOneAsync(plant);
var newId = insertResult.InsertedId;
